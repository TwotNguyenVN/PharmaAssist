Dưới đây là bộ **Prompt tách riêng từng bước** để bạn đưa vào Cursor/AI Agent. Bạn nên chạy theo đúng thứ tự, không đưa tất cả một lần.

---

# Prompt 1 — Tạo cấu trúc thư mục, package.json, README

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

BỐI CẢNH
Dự án PharmaAssist là website bán thuốc, thanh toán, quản lý tồn kho và cảnh báo tương tác thuốc cho nhà thuốc.

Stack chính:
- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- Database: Supabase PostgreSQL
- ORM: Prisma

Hiện tại cần tạo một tool riêng để thu thập dữ liệu sản phẩm tham khảo từ website Nhà thuốc Long Châu. Tool này chỉ dùng để tạo seed data/demo data, không phải runtime của hệ thống.

YÊU CẦU
Tạo thư mục:

tools/
└── data-collector/
    ├── README.md
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    ├── category_urls.json
    ├── src/
    │   ├── 01_collect_categories.ts
    │   ├── 02_collect_product_links.ts
    │   ├── 03_collect_product_details.ts
    │   ├── 04_normalize_data.ts
    │   ├── 05_generate_seed_sql.ts
    │   ├── 06_retry_failed.ts
    │   ├── 07_validate_data.ts
    │   ├── types/
    │   │   └── product-raw.type.ts
    │   └── utils/
    │       ├── delay.ts
    │       ├── file.ts
    │       ├── logger.ts
    │       ├── slug.ts
    │       ├── text-cleaner.ts
    │       ├── price-parser.ts
    │       ├── ingredient-parser.ts
    │       ├── section-extractor.ts
    │       ├── checkpoint.ts
    │       └── batch-writer.ts
    ├── data/
    │   ├── raw/
    │   │   ├── categories.raw.json
    │   │   ├── product_links.raw.json
    │   │   └── products/
    │   ├── normalized/
    │   ├── state/
    │   │   ├── crawl_state.json
    │   │   ├── completed_urls.json
    │   │   ├── failed_urls.json
    │   │   └── duplicate_urls.json
    │   └── output/
    │       └── sql/
    └── logs/
        ├── collect.log
        └── errors.log

PACKAGE.JSON
Tạo package.json với scripts:

{
  "name": "pharmaassist-data-collector",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "install:browser": "playwright install chromium",
    "collect:categories": "tsx src/01_collect_categories.ts",
    "collect:links": "tsx src/02_collect_product_links.ts",
    "collect:details:sample": "cross-env CRAWL_MODE=sample tsx src/03_collect_product_details.ts",
    "collect:details:full": "cross-env CRAWL_MODE=full tsx src/03_collect_product_details.ts",
    "retry:failed": "tsx src/06_retry_failed.ts",
    "normalize": "tsx src/04_normalize_data.ts",
    "validate:data": "tsx src/07_validate_data.ts",
    "generate:sql": "tsx src/05_generate_seed_sql.ts",
    "collect:all:sample": "npm run collect:links && npm run collect:details:sample && npm run normalize && npm run validate:data && npm run generate:sql",
    "collect:all:full": "npm run collect:links && npm run collect:details:full && npm run retry:failed && npm run normalize && npm run validate:data && npm run generate:sql"
  },
  "dependencies": {
    "playwright": "^1.49.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "zod": "^3.24.0",
    "csv-stringify": "^6.5.0",
    "slugify": "^1.6.6",
    "cross-env": "^7.0.3"
  },
  "devDependencies": {
    "@types/node": "^22.10.0"
  }
}

.ENV.EXAMPLE
Tạo file .env.example:

CRAWL_MODE=sample
MAX_PRODUCTS=200
REQUEST_DELAY_RANDOM_MIN_MS=2000
REQUEST_DELAY_RANDOM_MAX_MS=5000
BATCH_SIZE=100
HEADLESS=true
RESUME=true
SAVE_HTML=false
SAVE_SCREENSHOT_ON_ERROR=false
RETRY_FAILED_LIMIT=3
SOURCE_NAME="Nhà thuốc Long Châu"
SOURCE_NOTE="Dữ liệu tham khảo phục vụ đồ án PharmaAssist"
OUTPUT_SQL_FILE="./data/output/seed_longchau_demo.sql"

CATEGORY_URLS.JSON
Tạo category_urls.json:

[
  {
    "categoryCode": "CAT_THUOC",
    "categoryName": "Thuốc",
    "url": "https://nhathuoclongchau.com.vn/thuoc",
    "priority": 1,
    "estimatedProducts": 5058,
    "maxProducts": 5058,
    "enabled": true
  },
  {
    "categoryCode": "CAT_TPCN",
    "categoryName": "Thực phẩm chức năng",
    "url": "https://nhathuoclongchau.com.vn/thuc-pham-chuc-nang",
    "priority": 2,
    "estimatedProducts": 550,
    "maxProducts": 550,
    "enabled": true
  },
  {
    "categoryCode": "CAT_TBYT",
    "categoryName": "Trang thiết bị y tế",
    "url": "https://nhathuoclongchau.com.vn/trang-thiet-bi-y-te",
    "priority": 3,
    "estimatedProducts": 650,
    "maxProducts": 650,
    "enabled": true
  },
  {
    "categoryCode": "CAT_DUOC_MY_PHAM",
    "categoryName": "Dược mỹ phẩm",
    "url": "https://nhathuoclongchau.com.vn/duoc-my-pham",
    "priority": 4,
    "estimatedProducts": 500,
    "maxProducts": 500,
    "enabled": true
  },
  {
    "categoryCode": "CAT_CHAM_SOC_CA_NHAN",
    "categoryName": "Chăm sóc cá nhân",
    "url": "https://nhathuoclongchau.com.vn/cham-soc-ca-nhan",
    "priority": 5,
    "estimatedProducts": 300,
    "maxProducts": 300,
    "enabled": true
  }
]

README
Tạo README.md ghi:
- Mục đích tool
- Cách cài đặt
- Cách chạy sample
- Cách chạy full
- Cách retry failed
- Cách validate data
- Cấu trúc output
- Quy tắc an toàn:
  - Không crawl quá nhanh
  - Không lấy dữ liệu cá nhân
  - Không lấy nội dung review/Q&A
  - Không tải ảnh hàng loạt
  - Chỉ dùng dữ liệu cho đồ án
- Disclaimer:
  “Thông tin thuốc, cách dùng, liều dùng, tương tác thuốc và khuyến nghị chỉ là dữ liệu tham khảo phục vụ đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.”

GITIGNORE
Cập nhật .gitignore ở root project:

tools/data-collector/.env
tools/data-collector/data/raw/
tools/data-collector/data/output/
tools/data-collector/data/state/
tools/data-collector/logs/

RÀNG BUỘC
- Không tạo API key thật.
- Không xóa file quan trọng.
- Không chạy command nguy hiểm.
- Không commit raw data, output SQL, logs.
- Chỉ tạo skeleton và file cấu hình, chưa cần viết logic crawler phức tạp.
```

---

# Prompt 2 — Tạo type ProductRaw và các utility cơ bản

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Trong thư mục `tools/data-collector`, hãy tạo type dữ liệu raw cho sản phẩm và các utility cơ bản để dùng cho crawler.

CẦN TẠO / CẬP NHẬT

1. `src/types/product-raw.type.ts`

Tạo type `ProductRaw` với cấu trúc sau:

- source:
  - source_name
  - source_url
  - source_category_url
  - collected_at
  - is_demo_data
  - source_note
  - crawl_version
  - raw_html_file
  - data_quality_status

- category:
  - breadcrumb_text
  - breadcrumb_items
  - main_category_name
  - level_2_category_name
  - level_3_category_name
  - level_4_category_name
  - category_path
  - category_url
  - category_slug

- basic:
  - product_code
  - product_name
  - product_slug
  - product_type
  - short_description
  - brand_name
  - brand_country_name
  - display_country_name
  - label_text
  - availability_text
  - product_status
  - rating_average
  - review_count
  - comment_count
  - reviews_collected
  - qna_collected

- pricing:
  - selling_price
  - selling_price_text
  - original_price
  - discount_amount
  - discount_percent
  - currency
  - default_unit
  - unit_price_text
  - available_units
  - unit_conversion_text
  - min_order_quantity
  - max_order_quantity

- media:
  - primary_image_url
  - image_urls
  - thumbnail_urls
  - image_alt_texts
  - image_count
  - product_video_url
  - image_source_note

- medicine:
  - registration_number
  - registration_lookup_url
  - package_specification
  - dosage_form_name
  - requires_prescription_text
  - requires_prescription
  - manufacturer_name
  - manufacturer_address
  - manufacturing_country
  - shelf_life_text
  - shelf_life_months
  - storage_instruction_short
  - medicine_type
  - is_medicine

- ingredients:
  - ingredients_text
  - ingredients_html
  - ingredient_unit_context
  - ingredient_table_available
  - ingredient_note
  - ingredients_parsed

- content:
  - overview_title
  - overview_content
  - description_html
  - description_text
  - uses_section_title
  - indications
  - therapeutic_uses
  - pharmacodynamics
  - pharmacokinetics
  - atc_code
  - therapeutic_group
  - uses_html
  - uses_text
  - usage_instruction
  - administration_route
  - dosage_text
  - dosage_adult
  - dosage_children
  - dosage_elderly
  - dosage_frequency
  - dosage_duration
  - overdose_instruction
  - missed_dose_instruction
  - emergency_instruction
  - usage_html
  - usage_text
  - side_effects
  - side_effects_html
  - adverse_reactions
  - common_side_effects
  - rare_side_effects
  - serious_side_effects
  - side_effects_note
  - warning_intro
  - contraindications
  - precautions
  - pregnancy_lactation_note
  - driving_machine_note
  - drug_interaction_note
  - allergy_warning
  - special_population_note
  - general_warning_note
  - warning_html
  - warning_text
  - storage_instruction
  - storage_temperature
  - storage_light_condition
  - storage_humidity_condition
  - storage_html
  - storage_text

- content_reviewer:
  - content_reviewer_name
  - content_reviewer_title
  - content_reviewed_text
  - content_reviewed_at
  - content_source_references

- seo:
  - meta_title
  - meta_description
  - canonical_url
  - og_title
  - og_description
  - og_image
  - structured_data_product
  - structured_data_breadcrumb

2. `src/utils/delay.ts`
Tạo:
- delay(ms)
- randomDelay(minMs, maxMs)

3. `src/utils/file.ts`
Tạo:
- ensureDir(path)
- readJson(path, fallback)
- writeJson(path, data)
- appendJsonArray(path, items)
- writeCsv(path, rows)
- appendLog(path, message)
- listFilesRecursive(path, extension)

4. `src/utils/logger.ts`
Tạo:
- logInfo(message)
- logWarn(message)
- logError(message, error?)
Ghi log ra console và file `logs/collect.log`, `logs/errors.log`.

5. `src/utils/slug.ts`
Tạo hàm:
- toSlug(input: string): string
Hỗ trợ tiếng Việt, loại dấu, lowercase, thay khoảng trắng bằng dấu `-`.

6. `src/utils/text-cleaner.ts`
Tạo:
- removeExtraSpaces
- normalizeVietnameseText
- stripHtml
- cleanPriceText
- cleanSectionText
- truncateLongText

7. `src/utils/price-parser.ts`
Tạo:
- parseVietnamesePrice(text)
Ví dụ:
- “99.000đ” => 99000
- “1.100đ / Viên” => 1100
- null/empty => null

8. `src/utils/ingredient-parser.ts`
Tạo:
- parseIngredients(text)
Cố gắng tách pattern:
- “Paracetamol (500mg)”
- “Phòng phong (400mg)”
- “Ngưu tất (Rễ) (400mg)”
Nếu không parse được thì trả về raw_text.

9. `src/utils/section-extractor.ts`
Tạo:
- extractSectionByHeading(fullText, heading)
- extractMultipleSections(fullText, headingList)
- normalizeHeading(text)
Phải bỏ qua các heading:
- Đánh giá sản phẩm
- Hỏi đáp
- Bình luận
- Câu hỏi thường gặp nếu được xem là Q&A

10. `src/utils/checkpoint.ts`
Tạo:
- loadCrawlState()
- saveCrawlState()
- markCompleted(url)
- markFailed(url, error)
- isCompleted(url)

11. `src/utils/batch-writer.ts`
Tạo:
- writeProductToBatch(categoryCode, product, batchSize)
- flushBatch()
- getNextBatchIndex(categoryCode)

RÀNG BUỘC
- TypeScript strict.
- Không tạo API key.
- Không crawl trong bước này.
- Không xóa file quan trọng.
- Không viết dữ liệu thật ngoài file mẫu rỗng.
- Code phải có xử lý lỗi cơ bản.
```

---

# Prompt 3 — Viết collect categories

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/01_collect_categories.ts` để lấy danh mục cha và danh mục con từ các URL trong `category_urls.json`.

BỐI CẢNH
Các danh mục gốc:
- Thuốc
- Thực phẩm chức năng
- Dược mỹ phẩm
- Chăm sóc cá nhân
- Trang thiết bị y tế

YÊU CẦU SCRIPT
1. Đọc `category_urls.json`.
2. Chỉ xử lý các category có `enabled=true`.
3. Mở từng URL bằng Playwright Chromium.
4. Dùng `HEADLESS` từ env.
5. Có delay random 2–5 giây giữa các trang.
6. Cố gắng trích xuất:
   - category_code
   - category_name
   - category_url
   - parent_category_code
   - parent_category_name
   - slug
   - level
   - product_count nếu hiển thị
   - image_url nếu có
   - source_url
   - source_name
   - source_note
   - is_demo_data=true
   - collected_at
7. Với trang Thuốc, cần cố gắng lấy các nhóm con như:
   - Thuốc dị ứng
   - Thuốc da liễu
   - Cơ - xương - khớp
   - Thuốc bổ & vitamin
   - Thuốc giảm đau, hạ sốt, kháng viêm
   - Thuốc hô hấp
   - Thuốc kháng sinh, kháng nấm
   - Thuốc tiêu hoá & gan mật
   - Thuốc tim mạch & máu
   - Thuốc trị tiểu đường
   - và các nhóm khác nếu có
8. Không cần lấy sản phẩm ở script này.
9. Xuất kết quả ra:
   - `data/raw/categories.raw.json`
10. Nếu không lấy được danh mục con, vẫn lưu danh mục gốc.
11. Ghi log vào:
   - `logs/collect.log`
   - `logs/errors.log`

YÊU CẦU CHẤT LƯỢNG
- Không phụ thuộc selector quá cứng.
- Ưu tiên tìm theo text, link, card category.
- Có try/catch từng category URL.
- Một category lỗi không làm crash toàn bộ.
- Có summary cuối script:
  - tổng category root
  - tổng category con
  - tổng lỗi

RÀNG BUỘC
- Không lấy dữ liệu cá nhân.
- Không lấy review/Q&A.
- Không tải ảnh về máy, chỉ lưu URL.
- Không xóa file quan trọng.
```

---

# Prompt 4 — Viết collect product links

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/02_collect_product_links.ts` để lấy link sản phẩm từ các danh mục.

INPUT
- `category_urls.json`
- `data/raw/categories.raw.json` nếu tồn tại

OUTPUT
- `data/raw/product_links.raw.json`
- `data/state/duplicate_urls.json`

YÊU CẦU SCRIPT
1. Đọc danh sách danh mục:
   - ưu tiên `data/raw/categories.raw.json`
   - nếu chưa có thì dùng `category_urls.json`
2. Chỉ crawl category có `enabled=true` hoặc có URL hợp lệ.
3. Mở từng trang danh mục bằng Playwright.
4. Hỗ trợ:
   - scroll xuống cuối trang
   - click/load more nếu có
   - pagination nếu có
5. Lấy danh sách link sản phẩm:
   - category_code
   - category_name
   - category_url
   - product_name
   - product_url
   - image_url nếu có
   - price_text nếu có
   - collected_at
6. Chuẩn hóa URL:
   - URL tương đối thành absolute URL
   - loại trùng product_url
7. Nếu `CRAWL_MODE=sample`:
   - giới hạn tổng số sản phẩm theo `MAX_PRODUCTS`
8. Nếu `CRAWL_MODE=full`:
   - lấy toàn bộ link tìm được từ các danh mục enabled
9. Ghi duplicate URL vào:
   - `data/state/duplicate_urls.json`
10. Ghi kết quả chính vào:
   - `data/raw/product_links.raw.json`
11. Có delay random 2–5 giây giữa các trang.
12. Có log tiến độ:
   - đang crawl category nào
   - số link tìm được
   - tổng link hiện tại
   - số duplicate

YÊU CẦU ĐẶC BIỆT
- Với danh mục Thuốc, nếu có danh mục con thì ưu tiên crawl link từ danh mục con.
- Với danh mục có nhiều sản phẩm, cần scroll/load more đủ lâu nhưng không vô hạn.
- Tạo biến an toàn:
  - MAX_SCROLL_ROUNDS mặc định 30
  - MAX_LOAD_MORE_CLICKS mặc định 30

KHÔNG LẤY
- Nội dung review
- Nội dung hỏi đáp
- Dữ liệu cá nhân
- Ảnh tải về máy

RÀNG BUỘC
- Một category lỗi không làm crash toàn bộ.
- Nếu thiếu product_name vẫn lưu product_url.
- Không xóa file quan trọng.
```

---

# Prompt 5 — Test crawler với 5 sản phẩm

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Thiết lập chế độ test để crawler chỉ chạy với 5 sản phẩm đầu tiên, nhằm kiểm tra logic trước khi crawl số lượng lớn.

YÊU CẦU
1. Cập nhật `.env.example` hoặc hướng dẫn README để có cấu hình test:

CRAWL_MODE=sample
MAX_PRODUCTS=5
REQUEST_DELAY_RANDOM_MIN_MS=2000
REQUEST_DELAY_RANDOM_MAX_MS=5000
BATCH_SIZE=5
HEADLESS=false
RESUME=true

2. Cập nhật `README.md` thêm mục:

## Test nhanh với 5 sản phẩm

Các lệnh:
npm install
npm run install:browser
npm run collect:links
npm run collect:details:sample

3. Đảm bảo script `02_collect_product_links.ts` khi `MAX_PRODUCTS=5` chỉ lấy tối đa 5 link nếu CRAWL_MODE=sample.

4. Chuẩn bị output kỳ vọng:
- `data/raw/product_links.raw.json` có tối đa 5 sản phẩm
- sau khi collect details sẽ có batch chứa tối đa 5 sản phẩm
- log hiển thị rõ 5 sản phẩm đã được xử lý

5. Không crawl full.
6. Không tạo dữ liệu lớn.
7. Không xóa file quan trọng.

MỤC TIÊU
Sau bước này, nhóm có thể test crawler với 5 sản phẩm trước khi viết/cải tiến collect details đầy đủ.
```

---

# Prompt 6 — Viết collect product details chi tiết nhất

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/03_collect_product_details.ts` để vào từng trang sản phẩm và lấy thông tin chi tiết nhất có thể.

INPUT
- `data/raw/product_links.raw.json`

OUTPUT
- `data/raw/products/<category_code>/batch_001.json`
- `data/raw/products/<category_code>/batch_002.json`
- `data/state/crawl_state.json`
- `data/state/completed_urls.json`
- `data/state/failed_urls.json`

YÊU CẦU CRAWL MODE
1. Nếu `CRAWL_MODE=sample`:
   - crawl tối đa `MAX_PRODUCTS`
2. Nếu `CRAWL_MODE=full`:
   - crawl toàn bộ product links
3. Chia batch theo `BATCH_SIZE`, mặc định 100 sản phẩm/batch.
4. Nếu `RESUME=true`, bỏ qua URL đã có trong completed_urls.
5. Nếu sản phẩm lỗi, ghi vào failed_urls:
   - product_url
   - category_code
   - error_message
   - failed_at
   - retry_count

YÊU CẦU EXTRACT DỮ LIỆU
Với mỗi sản phẩm, tạo object theo type `ProductRaw`.

Cần cố gắng lấy các nhóm thông tin:

1. Source:
- source_name
- source_url
- source_category_url
- collected_at
- is_demo_data=true
- source_note
- crawl_version
- data_quality_status

2. Category:
- breadcrumb_text
- breadcrumb_items
- main_category_name
- level_2_category_name
- level_3_category_name
- level_4_category_name
- category_path
- category_url
- category_slug

3. Basic:
- product_code
- product_name
- product_slug
- product_type
- short_description
- brand_name
- brand_country_name
- display_country_name
- label_text
- availability_text
- product_status
- rating_average
- review_count
- comment_count
- reviews_collected=false
- qna_collected=false

4. Pricing:
- selling_price
- selling_price_text
- original_price
- discount_amount
- discount_percent
- currency=VND
- default_unit
- unit_price_text
- available_units
- unit_conversion_text
- min_order_quantity
- max_order_quantity

5. Media:
- primary_image_url
- image_urls
- thumbnail_urls
- image_alt_texts
- image_count
- product_video_url
- image_source_note

6. Medicine:
- registration_number
- registration_lookup_url
- package_specification
- dosage_form_name
- requires_prescription_text
- requires_prescription
- manufacturer_name
- manufacturer_address
- manufacturing_country
- shelf_life_text
- shelf_life_months
- storage_instruction_short
- medicine_type
- is_medicine

7. Ingredients:
- ingredients_text
- ingredients_html
- ingredient_unit_context
- ingredient_table_available
- ingredient_note
- ingredients_parsed

8. Content:
- overview_title
- overview_content
- description_html
- description_text
- uses_section_title
- indications
- therapeutic_uses
- pharmacodynamics
- pharmacokinetics
- atc_code
- therapeutic_group
- uses_html
- uses_text
- usage_instruction
- administration_route
- dosage_text
- dosage_adult
- dosage_children
- dosage_elderly
- dosage_frequency
- dosage_duration
- overdose_instruction
- missed_dose_instruction
- emergency_instruction
- usage_html
- usage_text
- side_effects
- side_effects_html
- adverse_reactions
- common_side_effects
- rare_side_effects
- serious_side_effects
- side_effects_note
- warning_intro
- contraindications
- precautions
- pregnancy_lactation_note
- driving_machine_note
- drug_interaction_note
- allergy_warning
- special_population_note
- general_warning_note
- warning_html
- warning_text
- storage_instruction
- storage_temperature
- storage_light_condition
- storage_humidity_condition
- storage_html
- storage_text

9. Content reviewer:
- content_reviewer_name
- content_reviewer_title
- content_reviewed_text
- content_reviewed_at
- content_source_references

10. SEO:
- meta_title
- meta_description
- canonical_url
- og_title
- og_description
- og_image
- structured_data_product
- structured_data_breadcrumb

CHIẾN LƯỢC EXTRACT
Dùng nhiều chiến lược:
1. DOM visible text
2. JSON-LD structured data
3. Meta tags
4. Heading/section text

Cần nhận diện các heading như:
- Số đăng ký
- Quy cách
- Thành phần
- Dạng bào chế
- Thuốc cần kê toa
- Nhà sản xuất
- Nước sản xuất
- Hạn sử dụng
- Công dụng
- Chỉ định
- Dược lực học
- Dược động học
- Cách dùng
- Liều dùng
- Làm gì khi dùng quá liều?
- Làm gì khi quên 1 liều?
- Tác dụng phụ
- Lưu ý
- Chống chỉ định
- Thận trọng khi sử dụng
- Sử dụng thuốc cho phụ nữ trong thời kỳ mang thai và cho con bú
- Ảnh hưởng của thuốc lên khả năng lái xe và vận hành máy móc
- Tương tác thuốc
- Bảo quản

KHÔNG ĐƯỢC LẤY
- Nội dung đánh giá sản phẩm
- Tên người đánh giá
- Avatar người đánh giá
- Ảnh đánh giá
- Nội dung bình luận
- Nội dung hỏi đáp người dùng
- Câu trả lời hỏi đáp người dùng
- Dữ liệu cá nhân

CÓ THỂ LẤY
- rating_average
- review_count
- comment_count
Nhưng luôn set:
- reviews_collected=false
- qna_collected=false

RÀNG BUỘC
- Delay random 2–5 giây giữa mỗi request.
- Một sản phẩm lỗi không crash toàn bộ.
- Không tải ảnh về máy, chỉ lưu URL.
- Không xóa file quan trọng.
- Không tạo secret.
- Ghi log đầy đủ.
```

---

# Prompt 7 — Thêm checkpoint, batch, resume và retry failed

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Hoàn thiện cơ chế batch, checkpoint, resume và retry failed cho data crawler.

CẦN CẬP NHẬT

1. `src/utils/checkpoint.ts`
Triển khai đầy đủ:
- loadCrawlState()
- saveCrawlState()
- markCompleted(url, metadata?)
- markFailed(url, error, metadata?)
- isCompleted(url)
- getFailedUrls()
- removeFromFailed(url)
- updateProgress()

File state:
- `data/state/crawl_state.json`
- `data/state/completed_urls.json`
- `data/state/failed_urls.json`

`crawl_state.json` cần có:
- total_links
- completed
- failed
- skipped
- current_category
- current_batch
- started_at
- last_run_at
- crawl_mode

2. `src/utils/batch-writer.ts`
Triển khai:
- writeProductToBatch(categoryCode, product, batchSize)
- flushBatch()
- getNextBatchIndex(categoryCode)
- create batch file theo dạng:
  `data/raw/products/<categoryCode>/batch_001.json`

3. Cập nhật `03_collect_product_details.ts`
- Khi bắt đầu, load checkpoint.
- Nếu RESUME=true và URL đã completed, skip.
- Sau mỗi sản phẩm thành công, markCompleted.
- Sau mỗi sản phẩm lỗi, markFailed.
- Ghi product vào batch tương ứng.
- Flush batch an toàn sau mỗi batch.
- Khi script dừng giữa chừng, dữ liệu đã crawl không bị mất.

4. Viết `06_retry_failed.ts`
- Đọc `data/state/failed_urls.json`.
- Retry tối đa `RETRY_FAILED_LIMIT`.
- Nếu thành công:
  - ghi product vào batch
  - markCompleted
  - removeFromFailed
- Nếu vẫn lỗi:
  - tăng retry_count
  - giữ trong failed_urls
- Không retry vô hạn.

YÊU CẦU
- Không làm mất dữ liệu cũ.
- Không ghi đè batch cũ nếu chưa cần.
- Có log rõ:
  - skipped completed URL
  - completed URL
  - failed URL
  - retry success
  - retry failed
- Một lỗi không crash toàn bộ.

RÀNG BUỘC
- Không crawl full trong lúc implement nếu không được yêu cầu.
- Không xóa file raw.
- Không xóa state file nếu không có lệnh rõ ràng.
```

---

# Prompt 8 — Viết normalize data

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/04_normalize_data.ts` để đọc raw product batch và chuẩn hóa thành CSV theo các bảng database.

INPUT
- `data/raw/products/**/batch_*.json`

OUTPUT
Trong `data/normalized/` tạo các file:

- product_categories.csv
- category_closures.csv
- brands.csv
- manufacturers.csv
- countries.csv
- products.csv
- product_variants.csv
- product_images.csv
- product_prices.csv
- medicines.csv
- medicine_units.csv
- dosage_forms.csv
- active_ingredients.csv
- medicine_ingredients.csv
- product_documents.csv

YÊU CẦU CHUẨN HÓA

1. Unique master data:
- Tên trùng thì chỉ tạo một record:
  - brand
  - manufacturer
  - country
  - dosage_form
  - medicine_unit
  - active_ingredient
  - category

2. Sinh code ổn định:
- product: P000001
- brand: BR000001
- manufacturer: MFR000001
- category: CAT000001
- ingredient: ING000001
- dosage_form: DF000001
- unit: UNIT000001

3. Slug:
- Tạo slug từ tên tiếng Việt, bỏ dấu, lowercase.

4. Price:
- Chuyển:
  - “99.000đ” => 99000
  - “1.100đ / Viên” => 1100

5. requires_prescription:
- “Có” => true
- “Không” => false
- không rõ => null

6. shelf_life_months:
- “36 tháng” => 36
- không rõ => null

7. Product type:
- Thuốc => MEDICINE
- Thực phẩm chức năng => SUPPLEMENT
- Dược mỹ phẩm => COSMETIC
- Trang thiết bị y tế => DEVICE
- Chăm sóc cá nhân => PERSONAL_CARE
- không rõ => OTHER

8. Ingredients:
- Nếu parse được:
  - tạo active_ingredients
  - tạo medicine_ingredients
- Nếu không parse được:
  - lưu raw ingredients_text vào product_documents.

9. Product documents:
Tạo record document cho các phần:
- overview
- indications
- pharmacodynamics
- pharmacokinetics
- usage
- dosage
- overdose
- missed_dose
- side_effects
- contraindications
- precautions
- pregnancy_lactation
- driving_machine
- drug_interaction_note
- storage
- raw_ingredients nếu cần

10. Source fields:
Mọi record quan trọng cần có:
- source_name
- source_url
- source_note
- is_demo_data=true
- collected_at

YÊU CẦU CSV
- CSV có header.
- Escape text đúng.
- Không làm vỡ CSV nếu text có dấu phẩy, xuống dòng, dấu ngoặc kép.
- Nếu field quá dài, vẫn lưu được hoặc truncate có kiểm soát.
- Không chứa HTML rác nếu đã có plain text.

RÀNG BUỘC
- Không xóa raw data.
- Không gọi web.
- Không crawl.
- Không tạo SQL ở bước này.
```

---

# Prompt 9 — Viết validate data

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/07_validate_data.ts` để kiểm tra chất lượng dữ liệu sau khi normalize.

INPUT
- `data/raw/product_links.raw.json`
- `data/raw/products/**/batch_*.json`
- `data/state/completed_urls.json`
- `data/state/failed_urls.json`
- `data/state/duplicate_urls.json`
- `data/normalized/*.csv`

OUTPUT
- `data/output/data_quality_report.md`

NỘI DUNG REPORT CẦN CÓ

1. Tổng quan:
- tổng product links
- tổng sản phẩm crawl thành công
- tổng sản phẩm lỗi
- tổng duplicate URLs
- tổng sản phẩm normalized
- thời điểm tạo report

2. Thống kê theo danh mục:
- category_code
- category_name
- total_links
- completed
- failed
- normalized_products

3. Field completeness:
- số sản phẩm có product_name
- số sản phẩm có product_code
- số sản phẩm có price
- số sản phẩm có image
- số sản phẩm có brand
- số sản phẩm có manufacturer
- số sản phẩm có category
- số thuốc có registration_number
- số thuốc có ingredients_text
- số thuốc có dosage_form
- số thuốc có requires_prescription
- số thuốc có shelf_life
- số thuốc có usage/dosage
- số thuốc có side_effects
- số thuốc có contraindications
- số thuốc có storage_instruction

4. Master data:
- số countries unique
- số brands unique
- số manufacturers unique
- số categories unique
- số dosage_forms unique
- số medicine_units unique
- số active_ingredients unique

5. Lỗi:
- 20 failed URLs đầu tiên
- 20 sản phẩm thiếu product_name nếu có
- 20 sản phẩm thiếu price nếu có
- 20 sản phẩm thiếu category nếu có

6. Cảnh báo:
- duplicate product_code
- duplicate product_url
- text quá dài
- product không có category
- medicine không có ingredients

YÊU CẦU
- Không crash nếu thiếu file.
- Nếu file không tồn tại thì ghi warning vào report.
- Report phải dễ copy vào báo cáo đồ án.
- Không crawl.
- Không xóa file.
```

---

# Prompt 10 — Viết generate SQL seed

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Viết script `tools/data-collector/src/05_generate_seed_sql.ts` để đọc CSV normalized và sinh SQL seed cho Supabase PostgreSQL.

INPUT
Các file trong:
- `data/normalized/*.csv`

OUTPUT
- `data/output/seed_longchau_demo.sql`
- `data/output/sql/001_master_data.sql`
- `data/output/sql/002_products_batch_001.sql`
- `data/output/sql/003_products_batch_002.sql`
- các batch tiếp theo nếu cần

YÊU CẦU SQL
1. Không drop table.
2. Không delete dữ liệu cũ.
3. Chỉ insert seed data.
4. Dùng `insert ... on conflict do nothing` nếu có unique key phù hợp.
5. Escape string đúng cho PostgreSQL.
6. Text dài vẫn phải insert an toàn.
7. JSON field nếu có phải hợp lệ.
8. Chia batch để tránh file SQL quá lớn.

THỨ TỰ INSERT
1. countries
2. brands
3. manufacturers
4. medicine_units
5. dosage_forms
6. product_categories
7. category_closures
8. products
9. product_variants
10. product_images
11. product_prices
12. medicines
13. active_ingredients
14. medicine_ingredients
15. product_documents

YÊU CẦU BATCH
- Master data cho vào `001_master_data.sql`.
- Product data chia theo batch, ví dụ 500 sản phẩm/file.
- File tổng `seed_longchau_demo.sql` có thể include toàn bộ SQL hoặc ghi chú thứ tự chạy.
- Tạo comment đầu file:
  - dữ liệu tham khảo phục vụ đồ án
  - không dùng tư vấn y tế
  - không thay thế dược sĩ/bác sĩ/chuyên gia y tế

YÊU CẦU KIỂM TRA
- Nếu thiếu CSV, ghi warning và bỏ qua.
- Nếu row thiếu field bắt buộc, ghi log và skip row đó.
- Không crash toàn bộ script vì một row lỗi.
- Có summary:
  - số record SQL generated cho từng bảng
  - số row bị skip
  - output path

RÀNG BUỘC
- Không chạy SQL trực tiếp vào Supabase.
- Không cần DATABASE_URL.
- Không tạo secret.
- Không xóa file quan trọng.
```

---

# Prompt 11 — Cập nhật README và quy trình chạy sample/full

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Cập nhật `tools/data-collector/README.md` để hướng dẫn đầy đủ quy trình sử dụng crawler.

README CẦN CÓ CÁC PHẦN

1. Giới thiệu
- Tool dùng để thu thập dữ liệu sản phẩm tham khảo phục vụ đồ án PharmaAssist.
- Tool không phải runtime của hệ thống.
- Dữ liệu không dùng tư vấn y tế thật.

2. Cài đặt
Lệnh:
npm install
npm run install:browser

3. Cấu hình môi trường
Hướng dẫn copy:
cp .env.example .env

Giải thích các biến:
- CRAWL_MODE
- MAX_PRODUCTS
- REQUEST_DELAY_RANDOM_MIN_MS
- REQUEST_DELAY_RANDOM_MAX_MS
- BATCH_SIZE
- HEADLESS
- RESUME
- RETRY_FAILED_LIMIT
- SOURCE_NAME
- SOURCE_NOTE

4. Chạy sample
Lệnh:
npm run collect:all:sample

Mục đích:
- test với số lượng nhỏ
- kiểm tra selector
- kiểm tra output
- không dùng để lấy full dataset

5. Chạy full
Lệnh:
npm run collect:all:full

Lưu ý:
- có thể mất nhiều giờ
- cần batch/checkpoint/resume
- không nên chạy nếu sample chưa ổn

6. Retry failed
Lệnh:
npm run retry:failed

7. Validate data
Lệnh:
npm run validate:data

Output:
data/output/data_quality_report.md

8. Generate SQL
Lệnh:
npm run generate:sql

Output:
- data/output/seed_longchau_demo.sql
- data/output/sql/*.sql

9. Cấu trúc output
Mô tả:
- data/raw
- data/normalized
- data/state
- data/output
- logs

10. Quy tắc an toàn
Ghi rõ:
- Không crawl quá nhanh.
- Không lấy dữ liệu cá nhân.
- Không lấy nội dung review/Q&A.
- Chỉ lấy rating_average, review_count, comment_count nếu có.
- Không tải ảnh hàng loạt về repo.
- Không commit raw data, output SQL, logs.
- Không dùng dữ liệu để tư vấn y tế thật.

11. Disclaimer y tế
Ghi nguyên văn:
“Thông tin thuốc, cách dùng, liều dùng, tương tác thuốc và khuyến nghị chỉ là dữ liệu tham khảo phục vụ đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.”

12. Troubleshooting
Gồm:
- Playwright chưa cài browser
- Không lấy được link sản phẩm
- Website thay đổi layout
- Crawler bị timeout
- Dữ liệu thiếu field
- File SQL quá lớn

RÀNG BUỘC
- Không thay đổi logic code.
- Chỉ cập nhật README.
```

---

# Prompt 12 — Review toàn bộ code crawler trước khi chạy full

```text
Bạn là AI Coding Agent hỗ trợ dự án PharmaAssist.

NHIỆM VỤ
Review toàn bộ code trong `tools/data-collector` trước khi chạy full dataset.

HÃY KIỂM TRA

1. Cấu trúc thư mục
- Đủ file src
- Đủ utils
- Đủ data folder
- Đủ logs folder

2. package.json
- Các script chạy đúng
- Có collect sample
- Có collect full
- Có retry failed
- Có validate data
- Có generate SQL

3. Safety
- Có delay random 2–5 giây
- Có MAX_PRODUCTS
- Có CRAWL_MODE sample/full
- Có BATCH_SIZE
- Có RESUME
- Không tải ảnh về repo
- Không lấy nội dung review/Q&A
- Không lấy dữ liệu cá nhân

4. Checkpoint
- completed_urls hoạt động
- failed_urls hoạt động
- crawl_state cập nhật
- chạy lại không crawl trùng nếu RESUME=true

5. Batch
- ghi batch theo category
- không ghi một file JSON khổng lồ
- không mất dữ liệu nếu script dừng giữa chừng

6. Extract product detail
- Có lấy product_name
- Có lấy price
- Có lấy category
- Có lấy brand
- Có lấy image URL
- Có lấy registration_number nếu là thuốc
- Có lấy ingredients_text nếu có
- Có lấy dosage_form nếu có
- Có lấy manufacturer nếu có
- Có lấy usage/dosage nếu có
- Có lấy side_effects nếu có
- Có lấy contraindications/precautions nếu có
- Có lấy storage nếu có

7. Normalize
- Có unique master data
- Có code ổn định
- Có slug
- Có parse price
- Có parse ingredient
- Có product_documents

8. Validate
- Có data_quality_report.md
- Có thống kê field completeness
- Có failed URLs
- Có duplicate warning

9. Generate SQL
- Không drop table
- Không delete data
- Có insert on conflict do nothing
- Có chia batch SQL
- Có comment disclaimer

SAU KHI REVIEW
- Nếu thấy lỗi, sửa lỗi.
- Nếu thấy rủi ro, ghi rõ trong README.
- Không chạy full dataset.
- Không xóa file quan trọng.
- Không tạo secret.
```

---

## Cách dùng các prompt này

Bạn nên dùng theo thứ tự:

```text
Prompt 1 → tạo cấu trúc
Prompt 2 → tạo type + utils
Prompt 3 → collect categories
Prompt 4 → collect product links
Prompt 5 → test 5 sản phẩm
Prompt 6 → collect product details
Prompt 7 → checkpoint/batch/retry
Prompt 8 → normalize
Prompt 9 → validate
Prompt 10 → generate SQL
Prompt 11 → README
Prompt 12 → review trước khi chạy full
```

Sau khi chạy ổn với 5 sản phẩm, tăng lên:

```text
MAX_PRODUCTS=50
```

Rồi:

```text
MAX_PRODUCTS=200
```

Sau đó mới cân nhắc chạy full khoảng 7.000+ sản phẩm.
