# Import Dữ Liệu Cào Vào Supabase — Phân Tích & Kế Hoạch

## Tổng Quan Vấn Đề

Dự án có **~1.49 triệu rows** dữ liệu cào từ Long Châu cần import vào Supabase Cloud PostgreSQL (100-table schema). Dữ liệu tồn tại ở 3 dạng:

| Dạng dữ liệu | Vị trí | Dung lượng | Ghi chú |
|---|---|---|---|
| CSV optimized (đã loại metadata) | `database/optimized/` | **~90 MB** (15 files) | Đã bỏ 5 trường tracing + `content_html` |
| CSV normalized (nguyên bản) | `database/normalized/` | **~199 MB** (15 files) | Có đầy đủ metadata tracing |
| SQL batch files | `database/output/sql/` | **~238 MB** (32 files) | INSERT + ON CONFLICT, gồm metadata |

---

## 🔴 Gap Nghiêm Trọng: Schema Mismatch

Trước khi import, cần hiểu rõ **schema hiện tại trên Supabase** (từ `database/schema/*.sql` và `backend/prisma/schema.prisma`) **KHÔNG khớp** 100% với cấu trúc CSV:

### Bảng so sánh Schema Gap

| Vấn đề | Chi tiết | Mức độ |
|---|---|---|
| **`product_documents` cấu trúc khác hoàn toàn** | Schema hiện tại: `file_url`, `file_type`, `title` (lưu file đính kèm). CSV: `document_type`, `content`, `content_html` (lưu nội dung text). | 🔴 **NGHIÊM TRỌNG** |
| **`medicines` thiếu `shelf_life_months`** | CSV có `shelf_life_months` (36, 24, 48...) nhưng schema thiếu cột này | 🟡 **CẦN THÊM** |
| **`medicines` thiếu 3 trường condition** | CSV có `temperature_condition`, `light_condition`, `humidity_condition` — schema thiếu | 🟢 OPTIONAL (hầu hết NULL) |
| **`product_variants` cấu trúc khác** | Schema: `variant_name`, `selling_price`. CSV: `variant_code`, `sku`, `packaging_size`, `is_default` | 🟡 **CẦN MAP** |
| **`product_prices` là bảng riêng** | Schema đã có `product_prices` nhưng CSV có cấu trúc riêng với `currency`, `is_contact_price` | 🟡 **CẦN MAP** |
| **FK mapping: code → ID** | CSV dùng `product_code`, `brand_code`... nhưng schema dùng `product_id`, `brand_id` (bigserial) | 🟡 **CẦN RESOLVE** |
| **SQL batch files INSERT vào cột không tồn tại** | SQL files INSERT các cột metadata (`source_name`, `source_url`, `is_demo_data`...) mà schema KHÔNG có | 🔴 **KHÔNG CHẠY ĐƯỢC** |

> [!CAUTION]
> **Các file SQL trong `database/output/sql/` KHÔNG THỂ chạy trực tiếp** trên schema hiện tại vì:
> 1. Chúng INSERT vào các cột metadata (`source_name`, `source_url`, `source_note`, `is_demo_data`, `collected_at`) mà schema **không có**.
> 2. Cấu trúc `product_documents` trong SQL (lưu content text) khác hoàn toàn với schema (lưu file attachment).
> 3. Cần ALTER TABLE hoặc tạo migration mới trước khi dùng.

---

## So Sánh 3 Phương Án Import

### Phương án 1: CSV + `\COPY` qua Supabase CLI ⚡ Nhanh nhất

```
Tốc độ: ⭐⭐⭐⭐⭐ (Nhanh nhất, native PostgreSQL bulk-load)
Độ phức tạp: ⭐⭐⭐ (Cần viết script mapping FK)
Rủi ro: ⭐⭐ (Thấp — dùng CSV optimized đã clean)
```

**Cách thực hiện:**
```bash
# 1. Kết nối Supabase CLI
supabase db connect

# 2. ALTER TABLE nếu cần (thêm shelf_life_months, sửa product_documents)
# 3. Import theo thứ tự FK dependency:
psql $DATABASE_URL -c "\COPY countries(code, name) FROM 'optimized/countries.csv' WITH CSV HEADER"
psql $DATABASE_URL -c "\COPY brands(code, name) FROM 'optimized/brands.csv' WITH CSV HEADER"
# ... tiếp theo 13 bảng còn lại
```

**Ưu điểm:**
- Nhanh gấp 5-10x so với INSERT (native PostgreSQL COPY)
- Dùng CSV optimized (~90 MB, đã loại metadata thừa)
- Dễ rollback (TRUNCATE + re-import)

**Nhược điểm:**
- ❌ Cần giải quyết FK mapping thủ công (code → ID). COPY không hỗ trợ subquery.
- ❌ Phải viết SQL staging table hoặc script trung gian để map code sang auto-increment ID.
- ❌ Cần sửa schema trước (ALTER TABLE `product_documents` và `medicines`).

---

### Phương án 2: SQL Batch Files qua Supabase SQL Editor ❌ Không khả thi hiện tại

```
Tốc độ: ⭐⭐ (Chậm, INSERT từng row)
Độ phức tạp: ⭐ (Chạy copy-paste 32 lần)
Rủi ro: ⭐⭐⭐⭐⭐ (CAO — schema mismatch, sẽ fail hàng loạt)
```

> [!WARNING]
> **KHÔNG KHUYẾN NGHỊ** ở trạng thái hiện tại. Các file SQL trong `database/output/sql/` được sinh ra theo cấu trúc cột của bước cào dữ liệu (có metadata tracing), **KHÔNG khớp** với schema 100 bảng hiện tại trên Supabase.

**Nếu vẫn muốn dùng,** cần:
1. ALTER TABLE thêm các cột metadata vào tất cả 15 bảng (không khuyến nghị — làm bẩn schema)
2. HOẶC viết lại toàn bộ script `05_generate_seed_sql.ts` để sinh SQL khớp schema hiện tại

---

### Phương án 3: Prisma Seed Script đọc CSV ⭐ **KHUYẾN NGHỊ** {#recommended}

```
Tốc độ: ⭐⭐⭐ (Trung bình, batch upsert)
Độ phức tạp: ⭐⭐ (Đã có cấu trúc script sẵn)
Rủi ro: ⭐ (Thấp nhất — type-safe, tự resolve FK)
```

**Đây là phương án đã được chốt trong** [WORKING-CONTEXT.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/WORKING-CONTEXT.md) (entry ngày 2026-05-27).

**Cách thực hiện:**
```bash
# 1. Cập nhật schema.prisma (thêm shelf_life_months, sửa product_documents)
# 2. Chạy migration
npx prisma migrate dev --name add_crawled_data_fields

# 3. Viết/chạy seed script
npx prisma db seed
```

**Ưu điểm:**
- ✅ **Tự động resolve FK**: Script đọc CSV, tìm record theo `code`, lấy `id` auto-increment → insert FK chính xác.
- ✅ **Type-safe**: Prisma Client kiểm tra kiểu dữ liệu compile-time.
- ✅ **Batch upsert**: `createMany` + `skipDuplicates` hoặc transaction batch.
- ✅ **Đã có trong quy trình**: WORKING-CONTEXT.md đã chốt phương án này.
- ✅ **Dùng CSV optimized**: Nhẹ hơn ~55% so với normalized.

**Nhược điểm:**
- Chậm hơn native `\COPY` (nhưng vẫn chấp nhận được cho ~1.5M rows)
- Cần viết script ~300-500 dòng TypeScript

---

## 🎯 Khuyến Nghị Tối Ưu: Phương Án 3 (Prisma Seed Script)

### Lý do chọn:
1. **Đã được chốt** trong WORKING-CONTEXT.md
2. **Tự giải quyết gap lớn nhất**: FK code → ID mapping
3. **Tương thích hoàn toàn** với stack hiện tại (NestJS + Prisma + Supabase)
4. **Dùng CSV optimized** (~90 MB) — đã loại bỏ metadata thừa, tiết kiệm ~55%

### Cần xử lý trước khi import:

#### Bước 1: Cập nhật `schema.prisma`

```diff
 model Medicine {
   ...
   requiresPrescription Boolean  @default(false) @map("requires_prescription")
+  shelfLifeMonths     Int?     @map("shelf_life_months")
   usageNote           String?  @map("usage_note")
   ...
 }
 
 model ProductDocument {
   id        Int      @id @default(autoincrement())
   productId Int      @map("product_id")
-  fileUrl   String   @map("file_url")
-  fileType  String   @map("file_type")
+  documentType String @map("document_type") // OVERVIEW, INDICATIONS, DOSAGE, PRECAUTIONS, STORAGE, SIDE_EFFECTS
+  content   String?  // Plain text content
   title     String?
   createdAt DateTime @default(now()) @map("created_at")
   ...
 }
```

#### Bước 2: Chạy migration
```bash
cd backend
npx prisma migrate dev --name add_shelf_life_and_fix_product_documents
```

#### Bước 3: Viết `seed_crawled_data.ts`

Script đọc 15 CSV từ `database/optimized/`, import theo thứ tự FK dependency:

```
1. countries → 58 rows
2. medicine_units → 24 rows
3. dosage_forms → 176 rows
4. brands → 1,064 rows
5. manufacturers → 2,106 rows (FK: country)
6. product_categories → 257 rows
7. category_closures → 710 rows (FK: product_categories)
8. active_ingredients → 5,296 rows
9. products → 7,609 rows (FK: category, brand, manufacturer)
10. product_variants → 15,982 rows (FK: product, unit)
11. product_prices → 15,982 rows (FK: variant, unit)
12. product_images → 41,524 rows (FK: product)
13. medicines → 5,657 rows (FK: product, dosage_form)
14. medicine_ingredients → 25,982 rows (FK: product→medicine, ingredient)
15. product_documents → 1,370,192 rows (FK: product) ⚠️ Bảng lớn nhất!
```

#### Bước 4: Chạy seed
```bash
npx prisma db seed
```

---

## Open Questions

> [!IMPORTANT]
> **Q1**: Bảng `product_documents` hiện tại được thiết kế lưu **file đính kèm** (`file_url`, `file_type`), nhưng CSV chứa **nội dung text** (`document_type`, `content`). Bạn muốn:
> - **A)** Đổi hoàn toàn sang lưu text content (phù hợp cho AI search/chatbot)
> - **B)** Giữ cấu trúc file cũ và tạo bảng mới `product_contents` cho text
> - **C)** Mở rộng bảng hiện tại để hỗ trợ cả hai

> [!IMPORTANT]
> **Q2**: Bạn muốn dùng **CSV optimized** (~90 MB, đã bỏ metadata + content_html) hay **CSV normalized** (~199 MB, đầy đủ)? Khuyến nghị dùng optimized.

> [!IMPORTANT]
> **Q3**: Có muốn thêm `shelf_life_months` vào model `Medicine` trong Prisma schema không? CSV có dữ liệu này (~95% records có giá trị).

---

## Verification Plan

### Automated Tests
```bash
# Sau khi seed xong, kiểm tra số lượng:
npx prisma studio  # Mở Prisma Studio xem trực tiếp data

# Hoặc chạy SQL trên Supabase SQL Editor:
SELECT 'products' as tbl, count(*) FROM products
UNION ALL SELECT 'medicines', count(*) FROM medicines
UNION ALL SELECT 'product_documents', count(*) FROM product_documents
UNION ALL SELECT 'product_images', count(*) FROM product_images;
```

### Manual Verification
- Kiểm tra FK integrity: không có orphan records
- Kiểm tra `product_documents` có đầy đủ 6 document types
- Spot-check 5-10 sản phẩm có đúng ảnh, giá, mô tả
