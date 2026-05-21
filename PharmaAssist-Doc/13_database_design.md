# 13_DATABASE_DESIGN

**Mã tài liệu:** 13_Database_Design  
**Tên tài liệu:** Database Design Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu thiết kế cơ sở dữ liệu quan hệ  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Database Designer, Backend Developer, Frontend Developer, Tester, System Analyst, AI/Graph Developer, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Database Design Document** mô tả thiết kế dữ liệu quan hệ của hệ thống **PharmaAssist AI Intelligence**, bao gồm danh sách bảng, mô tả bảng, khóa chính, khóa ngoại, quan hệ giữa các bảng, ràng buộc dữ liệu và dữ liệu mẫu phục vụ demo.

Cơ sở dữ liệu là phần lõi của hệ thống vì hầu hết các nghiệp vụ như quản lý thuốc, nhập kho, tồn kho, bán hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc, khách hàng, báo cáo và AI Audit Log đều cần lưu trữ dữ liệu có cấu trúc. Nếu thiết kế database không rõ ràng, backend sẽ khó triển khai, API dễ không thống nhất và báo cáo dễ sai dữ liệu.

Tài liệu này dùng để:

- Làm cơ sở thiết kế ERD.
- Làm cơ sở tạo migration/database schema.
- Làm cơ sở lập trình backend entity/model.
- Làm cơ sở viết API truy vấn dữ liệu.
- Làm cơ sở chuẩn bị seed data demo.
- Làm cơ sở viết test case database và integration test.
- Làm cơ sở trình bày phần thiết kế dữ liệu trong báo cáo.

---

## 2. Phạm vi thiết kế dữ liệu

Thiết kế dữ liệu trong tài liệu này tập trung vào database quan hệ cho MVP và phần nâng cao của PharmaAssist AI Intelligence.

Các nhóm dữ liệu chính gồm:

- User và phân quyền.
- Thuốc và danh mục thuốc.
- Hoạt chất nếu cần mở rộng.
- Kho thuốc, nhập thuốc và tồn kho.
- Khách hàng.
- Đơn hàng và chi tiết đơn hàng.
- Thanh toán và hóa đơn.
- Cảnh báo tương tác thuốc.
- Phiên tư vấn và ghi chú tư vấn.
- AI log và prompt template.
- Báo cáo, analytics và forecast tồn kho nếu làm nâng cao.

Tài liệu này tập trung vào database quan hệ như PostgreSQL hoặc MySQL. Nếu triển khai Neo4j Knowledge Graph, phần graph sẽ được mô tả chi tiết hơn trong tài liệu Graph Design riêng. Tuy nhiên, tài liệu này vẫn có thể lưu dữ liệu tham chiếu cần thiết để kết nối với graph.

---

## 3. Công nghệ database đề xuất

| Thành phần | Lựa chọn đề xuất | Ghi chú |
|---|---|---|
| Database chính | PostgreSQL hoặc MySQL | Lưu dữ liệu nghiệp vụ quan hệ |
| Database graph | Neo4j | Dùng cho Knowledge Graph nếu triển khai |
| ORM | Prisma, TypeORM, Sequelize, JPA hoặc Entity Framework | Tùy công nghệ backend |
| Migration | Prisma Migration, TypeORM Migration, Flyway hoặc Liquibase | Giúp quản lý thay đổi schema |
| Seed data | SQL script hoặc seed script | Chuẩn bị dữ liệu demo |

Khuyến nghị cho đồ án:

- Nếu backend dùng Node.js/NestJS: PostgreSQL + Prisma hoặc TypeORM.
- Nếu backend dùng Spring Boot: PostgreSQL/MySQL + JPA/Hibernate.
- Nếu muốn demo AI/Graph: thêm Neo4j ở phần nâng cao.

---

## 4. Quy ước đặt tên database

| Thành phần | Quy ước | Ví dụ |
|---|---|---|
| Tên bảng | snake_case, số nhiều | users, medicines, order_details |
| Khóa chính | id | id bigint primary key |
| Khóa ngoại | <table_singular>_id | user_id, medicine_id |
| Ngày tạo | created_at | timestamp |
| Ngày cập nhật | updated_at | timestamp |
| Trạng thái | status | active/inactive, draft/paid |
| Cờ boolean | is_<meaning> | is_active |
| Mã nghiệp vụ | code | medicine code, invoice code |

---

## 5. Danh sách bảng tổng quan

| Nhóm | Bảng |
|---|---|
| User | users, roles, user_roles |
| Medicine | medicines, medicine_categories, active_ingredients, medicine_active_ingredients |
| Inventory | inventories, stock_imports, stock_import_details, suppliers |
| Customer | customers |
| Sales | orders, order_details |
| Payment | payments, invoices |
| Interaction | drug_interactions, interaction_alerts |
| Consultation | consultation_sessions, consultation_notes |
| AI | ai_logs, ai_prompt_templates |
| Analytics | sales_daily_summary, inventory_forecasts, reorder_suggestions |

---

## 6. Mô hình ERD tổng quan dạng text

```text
users --< user_roles >-- roles

medicine_categories --< medicines
medicines --< inventories
medicines --< order_details
medicines --< stock_import_details
medicines --< medicine_active_ingredients >-- active_ingredients

suppliers --< stock_imports --< stock_import_details

customers --< orders --< order_details
orders -- payments
orders -- invoices
orders --< interaction_alerts
orders --< consultation_notes

medicines --< drug_interactions >-- medicines

drug_interactions --< interaction_alerts

users --< orders
users --< stock_imports
users --< consultation_notes
users --< ai_logs

consultation_sessions --< consultation_notes
consultation_sessions --< ai_logs

ai_prompt_templates --< ai_logs
```

---

## 7. Data Dictionary chi tiết

## 7.1. Bảng users

### 7.1.1. Mục đích

Bảng `users` lưu thông tin tài khoản người dùng nội bộ của hệ thống, bao gồm Admin, Nhân viên nhà thuốc và Nhân viên kho.

### 7.1.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã user |
| full_name | varchar(255) |  | Họ tên người dùng |
| username | varchar(100) | unique | Tên đăng nhập |
| password_hash | varchar(255) |  | Mật khẩu đã hash |
| email | varchar(255) | nullable | Email |
| phone | varchar(20) | nullable | Số điện thoại |
| status | varchar(30) |  | active/inactive/locked |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.1.3. Ràng buộc

- `username` không được trùng.
- `password_hash` không được lưu mật khẩu plain text.
- `status` nên có các giá trị: ACTIVE, INACTIVE, LOCKED.

---

## 7.2. Bảng roles

### 7.2.1. Mục đích

Bảng `roles` lưu danh sách vai trò trong hệ thống.

### 7.2.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã role |
| code | varchar(50) | unique | Mã vai trò: ADMIN, STAFF, WAREHOUSE |
| name | varchar(100) |  | Tên vai trò |
| description | text | nullable | Mô tả vai trò |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.2.3. Dữ liệu mẫu

| code | name |
|---|---|
| ADMIN | Admin / Chủ nhà thuốc |
| STAFF | Nhân viên nhà thuốc |
| WAREHOUSE | Nhân viên kho |

---

## 7.3. Bảng user_roles

### 7.3.1. Mục đích

Bảng `user_roles` thể hiện quan hệ nhiều-nhiều giữa users và roles.

### 7.3.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| user_id | bigint | PK, FK | Tham chiếu users.id |
| role_id | bigint | PK, FK | Tham chiếu roles.id |
| created_at | timestamp |  | Ngày gán vai trò |

### 7.3.3. Quan hệ

- Một user có thể có nhiều role.
- Một role có thể được gán cho nhiều user.

---

## 7.4. Bảng medicine_categories

### 7.4.1. Mục đích

Bảng `medicine_categories` lưu danh mục thuốc để phân loại thuốc.

### 7.4.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã danh mục |
| name | varchar(255) | unique | Tên danh mục |
| description | text | nullable | Mô tả danh mục |
| status | varchar(30) |  | active/inactive |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

---

## 7.5. Bảng medicines

### 7.5.1. Mục đích

Bảng `medicines` lưu thông tin thuốc trong hệ thống. Đây là bảng dữ liệu trung tâm được sử dụng bởi quản lý thuốc, tồn kho, nhập thuốc, bán hàng, tương tác thuốc và báo cáo.

### 7.5.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã thuốc |
| category_id | bigint | FK | Danh mục thuốc |
| code | varchar(100) | unique | Mã thuốc |
| name | varchar(255) |  | Tên thuốc |
| unit | varchar(50) |  | Đơn vị tính |
| selling_price | decimal(12,2) |  | Giá bán |
| description | text | nullable | Mô tả |
| status | varchar(30) |  | active/inactive |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.5.3. Ràng buộc

- `code` không được trùng.
- `selling_price` phải lớn hơn hoặc bằng 0.
- `category_id` phải tồn tại trong `medicine_categories`.
- Không nên xóa cứng thuốc đã có trong đơn hàng hoặc phiếu nhập.

---

## 7.6. Bảng active_ingredients

### 7.6.1. Mục đích

Bảng `active_ingredients` lưu thông tin hoạt chất mẫu. Bảng này phục vụ phần nâng cao AI/Graph hoặc tra cứu thông tin thuốc ở mức cơ bản.

### 7.6.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã hoạt chất |
| name | varchar(255) | unique | Tên hoạt chất mẫu |
| description | text | nullable | Mô tả mẫu |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.6.3. Ghi chú

Dữ liệu hoạt chất trong đồ án là dữ liệu mẫu, không dùng làm dữ liệu y khoa thật.

---

## 7.7. Bảng medicine_active_ingredients

### 7.7.1. Mục đích

Bảng `medicine_active_ingredients` thể hiện quan hệ nhiều-nhiều giữa thuốc và hoạt chất mẫu.

### 7.7.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| medicine_id | bigint | PK, FK | Tham chiếu medicines.id |
| active_ingredient_id | bigint | PK, FK | Tham chiếu active_ingredients.id |
| amount_text | varchar(100) | nullable | Hàm lượng dạng mô tả mẫu |
| created_at | timestamp |  | Ngày tạo |

---

## 7.8. Bảng suppliers

### 7.8.1. Mục đích

Bảng `suppliers` lưu thông tin nhà cung cấp thuốc ở mức cơ bản.

### 7.8.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã nhà cung cấp |
| name | varchar(255) |  | Tên nhà cung cấp |
| phone | varchar(20) | nullable | Số điện thoại |
| email | varchar(255) | nullable | Email |
| address | text | nullable | Địa chỉ |
| status | varchar(30) |  | active/inactive |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

---

## 7.9. Bảng inventories

### 7.9.1. Mục đích

Bảng `inventories` lưu thông tin tồn kho của từng thuốc. Tùy mức chi tiết, hệ thống có thể quản lý tồn kho theo thuốc hoặc theo lô. MVP có thể đơn giản hóa theo thuốc và hạn dùng gần nhất.

### 7.9.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã tồn kho |
| medicine_id | bigint | FK | Thuốc liên quan |
| quantity | int |  | Số lượng tồn |
| min_stock | int |  | Ngưỡng cảnh báo sắp hết |
| batch_number | varchar(100) | nullable | Số lô nếu có |
| expiry_date | date | nullable | Hạn dùng |
| location | varchar(255) | nullable | Vị trí lưu kho nếu cần |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.9.3. Ràng buộc

- `quantity` không được âm.
- `min_stock` không được âm.
- `medicine_id` phải tồn tại trong bảng `medicines`.

### 7.9.4. Ghi chú thiết kế

Có hai cách thiết kế tồn kho:

| Cách | Mô tả | Phù hợp |
|---|---|---|
| Theo thuốc | Mỗi thuốc có một dòng tồn kho | MVP đơn giản |
| Theo lô | Mỗi thuốc có nhiều lô với hạn dùng khác nhau | Nâng cao, chính xác hơn |

Khuyến nghị: MVP có thể dùng theo thuốc. Nếu muốn thể hiện nghiệp vụ thuốc gần hết hạn tốt hơn, có thể dùng theo lô.

---

## 7.10. Bảng stock_imports

### 7.10.1. Mục đích

Bảng `stock_imports` lưu thông tin phiếu nhập thuốc.

### 7.10.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã phiếu nhập |
| import_code | varchar(100) | unique | Mã phiếu nhập |
| supplier_id | bigint | FK, nullable | Nhà cung cấp |
| created_by | bigint | FK | Người tạo phiếu nhập |
| import_date | date |  | Ngày nhập |
| status | varchar(30) |  | draft/confirmed/cancelled |
| note | text | nullable | Ghi chú |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.10.3. Ràng buộc

- Phiếu nhập phải có người tạo.
- Chỉ phiếu nhập `confirmed` mới làm tăng tồn kho.

---

## 7.11. Bảng stock_import_details

### 7.11.1. Mục đích

Bảng `stock_import_details` lưu chi tiết từng thuốc trong phiếu nhập.

### 7.11.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã chi tiết phiếu nhập |
| stock_import_id | bigint | FK | Phiếu nhập |
| medicine_id | bigint | FK | Thuốc nhập |
| quantity | int |  | Số lượng nhập |
| import_price | decimal(12,2) | nullable | Giá nhập |
| batch_number | varchar(100) | nullable | Số lô |
| expiry_date | date | nullable | Hạn dùng |
| created_at | timestamp |  | Ngày tạo |

### 7.11.3. Ràng buộc

- `quantity` phải lớn hơn 0.
- `import_price` nếu có phải lớn hơn hoặc bằng 0.

---

## 7.12. Bảng customers

### 7.12.1. Mục đích

Bảng `customers` lưu thông tin khách hàng cơ bản. Trong MVP, khách hàng không đăng nhập.

### 7.12.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã khách hàng |
| full_name | varchar(255) |  | Họ tên khách hàng |
| phone | varchar(20) | nullable | Số điện thoại |
| note | text | nullable | Ghi chú cơ bản |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.12.3. Ghi chú an toàn dữ liệu

- Không dùng dữ liệu khách hàng thật trong demo.
- Không lưu thông tin nhạy cảm không cần thiết.

---

## 7.13. Bảng orders

### 7.13.1. Mục đích

Bảng `orders` lưu thông tin đơn bán thuốc.

### 7.13.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã đơn hàng |
| order_code | varchar(100) | unique | Mã đơn hàng |
| customer_id | bigint | FK, nullable | Khách hàng nếu có |
| staff_id | bigint | FK | Nhân viên bán hàng |
| status | varchar(30) |  | draft/paid/cancelled |
| total_amount | decimal(12,2) |  | Tổng tiền |
| note | text | nullable | Ghi chú đơn hàng |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.13.3. Ràng buộc

- Đơn hàng phải có `staff_id`.
- Đơn hàng phải có ít nhất một dòng `order_details` trước khi thanh toán.
- Doanh thu chỉ tính đơn có trạng thái `paid`.

---

## 7.14. Bảng order_details

### 7.14.1. Mục đích

Bảng `order_details` lưu danh sách thuốc trong đơn hàng.

### 7.14.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã chi tiết đơn hàng |
| order_id | bigint | FK | Đơn hàng |
| medicine_id | bigint | FK | Thuốc bán |
| quantity | int |  | Số lượng bán |
| unit_price | decimal(12,2) |  | Đơn giá tại thời điểm bán |
| line_total | decimal(12,2) |  | Thành tiền |
| created_at | timestamp |  | Ngày tạo |

### 7.14.3. Ràng buộc

- `quantity` phải lớn hơn 0.
- `unit_price` phải lớn hơn hoặc bằng 0.
- `line_total = quantity * unit_price`.

---

## 7.15. Bảng payments

### 7.15.1. Mục đích

Bảng `payments` lưu thông tin thanh toán của đơn hàng.

### 7.15.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã thanh toán |
| order_id | bigint | FK, unique | Đơn hàng được thanh toán |
| method | varchar(30) |  | cash/bank_transfer/mock |
| amount | decimal(12,2) |  | Số tiền thanh toán |
| status | varchar(30) |  | paid/failed/cancelled |
| paid_at | timestamp | nullable | Thời điểm thanh toán |
| created_at | timestamp |  | Ngày tạo |

### 7.15.3. Ràng buộc

- MVP quy định mỗi đơn hàng có một bản ghi thanh toán chính.
- Thanh toán thành công mới được trừ tồn kho.
- Thanh toán là mô phỏng, không tích hợp cổng thật.

---

## 7.16. Bảng invoices

### 7.16.1. Mục đích

Bảng `invoices` lưu thông tin hóa đơn sau khi đơn hàng thanh toán thành công.

### 7.16.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã hóa đơn |
| invoice_code | varchar(100) | unique | Mã hóa đơn |
| order_id | bigint | FK, unique | Đơn hàng liên quan |
| issued_at | timestamp |  | Thời điểm tạo hóa đơn |
| created_at | timestamp |  | Ngày tạo |

### 7.16.3. Ràng buộc

- Hóa đơn chỉ được tạo sau khi thanh toán thành công.
- MVP quy định một đơn hàng có một hóa đơn.

---

## 7.17. Bảng drug_interactions

### 7.17.1. Mục đích

Bảng `drug_interactions` lưu dữ liệu mẫu về các cặp thuốc có nguy cơ tương tác. Đây là bảng quan trọng cho chức năng cảnh báo tương tác thuốc rule-based.

### 7.17.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã tương tác |
| medicine_a_id | bigint | FK | Thuốc A |
| medicine_b_id | bigint | FK | Thuốc B |
| severity | varchar(30) |  | LOW/MEDIUM/HIGH |
| description | text |  | Mô tả rủi ro mẫu |
| recommendation | text |  | Khuyến nghị tham khảo |
| is_active | boolean |  | Trạng thái |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

### 7.17.3. Ràng buộc

- `medicine_a_id` và `medicine_b_id` phải khác nhau.
- Cặp thuốc không nên bị trùng theo hai chiều A-B và B-A.
- `severity` nên giới hạn ở LOW, MEDIUM, HIGH.
- Dữ liệu chỉ là dữ liệu mẫu phục vụ đồ án.

### 7.17.4. Ghi chú xử lý cặp thuốc

Để tránh trùng cặp A-B và B-A, có thể quy ước:

```text
medicine_a_id < medicine_b_id
```

Hoặc backend normalize cặp thuốc trước khi lưu/truy vấn.

---

## 7.18. Bảng interaction_alerts

### 7.18.1. Mục đích

Bảng `interaction_alerts` lưu lịch sử cảnh báo tương tác đã phát sinh trong đơn hàng.

### 7.18.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã cảnh báo |
| order_id | bigint | FK | Đơn hàng phát sinh cảnh báo |
| interaction_id | bigint | FK | Rule tương tác liên quan |
| severity | varchar(30) |  | Mức độ tại thời điểm cảnh báo |
| alert_message | text | nullable | Nội dung cảnh báo được hiển thị |
| created_at | timestamp |  | Thời điểm phát sinh |

### 7.18.3. Ghi chú

Bảng này giúp truy vết cảnh báo đã từng hiển thị cho đơn hàng. Trong MVP có thể không bắt buộc lưu alert, nhưng nên có để báo cáo và demo tốt hơn.

---

## 7.19. Bảng consultation_sessions

### 7.19.1. Mục đích

Bảng `consultation_sessions` lưu phiên tư vấn tham khảo nếu hệ thống có chức năng AI Copilot hoặc ghi chú tư vấn nâng cao.

### 7.19.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã phiên tư vấn |
| order_id | bigint | FK, nullable | Đơn hàng liên quan |
| customer_id | bigint | FK, nullable | Khách hàng liên quan |
| staff_id | bigint | FK | Nhân viên tạo phiên |
| status | varchar(30) |  | draft/completed/cancelled |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

---

## 7.20. Bảng consultation_notes

### 7.20.1. Mục đích

Bảng `consultation_notes` lưu ghi chú tư vấn do nhân viên nhập hoặc do AI gợi ý rồi được nhân viên xác nhận.

### 7.20.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã ghi chú |
| consultation_session_id | bigint | FK, nullable | Phiên tư vấn liên quan |
| order_id | bigint | FK, nullable | Đơn hàng liên quan |
| staff_id | bigint | FK | Nhân viên ghi chú |
| note_text | text |  | Nội dung ghi chú |
| source | varchar(30) |  | manual/ai_draft/ai_confirmed |
| created_at | timestamp |  | Ngày tạo |

### 7.20.3. Ràng buộc an toàn

- Nội dung AI không được tự động lưu là ghi chú chính thức nếu chưa có xác nhận của người dùng.
- Ghi chú không được chứa chẩn đoán hoặc kê đơn do AI tạo.

---

## 7.21. Bảng ai_prompt_templates

### 7.21.1. Mục đích

Bảng `ai_prompt_templates` lưu prompt template dùng cho AI Copilot.

### 7.21.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã prompt template |
| code | varchar(100) | unique | Mã prompt |
| name | varchar(255) |  | Tên prompt |
| template_text | text |  | Nội dung prompt template |
| version | varchar(50) |  | Phiên bản prompt |
| is_active | boolean |  | Có đang dùng không |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

---

## 7.22. Bảng ai_logs

### 7.22.1. Mục đích

Bảng `ai_logs` lưu lịch sử request/response AI để phục vụ truy vết, kiểm tra guardrail và demo AI Governance.

### 7.22.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã AI log |
| user_id | bigint | FK | Người gọi AI |
| consultation_session_id | bigint | FK, nullable | Phiên tư vấn nếu có |
| prompt_template_id | bigint | FK, nullable | Prompt template dùng |
| action_type | varchar(100) |  | Loại tác vụ AI |
| provider | varchar(100) |  | MockAI/Gemini/OpenRouter/Ollama |
| model | varchar(100) | nullable | Model nếu có |
| input_summary | text | nullable | Tóm tắt input |
| output_summary | text | nullable | Tóm tắt output |
| status | varchar(30) |  | success/failed/blocked |
| guardrail_result | text | nullable | Kết quả guardrail nếu có |
| created_at | timestamp |  | Thời điểm gọi AI |

### 7.22.3. Ràng buộc

- Không lưu thông tin nhạy cảm không cần thiết.
- Không lưu API key trong bảng này.
- Nếu output bị guardrail chặn, status nên là BLOCKED.

---

## 7.23. Bảng sales_daily_summary

### 7.23.1. Mục đích

Bảng `sales_daily_summary` lưu dữ liệu tổng hợp doanh thu theo ngày nếu nhóm muốn tối ưu báo cáo. Trong MVP, bảng này có thể không bắt buộc vì có thể query trực tiếp từ orders/payments.

### 7.23.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã summary |
| summary_date | date | unique | Ngày tổng hợp |
| total_revenue | decimal(12,2) |  | Tổng doanh thu |
| total_orders | int |  | Tổng số đơn |
| created_at | timestamp |  | Ngày tạo |
| updated_at | timestamp |  | Ngày cập nhật |

---

## 7.24. Bảng inventory_forecasts

### 7.24.1. Mục đích

Bảng `inventory_forecasts` lưu kết quả dự báo tồn kho nếu nhóm triển khai chức năng forecast.

### 7.24.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã dự báo |
| medicine_id | bigint | FK | Thuốc được dự báo |
| average_daily_sales | decimal(10,2) |  | Lượng bán trung bình/ngày |
| current_quantity | int |  | Số lượng tồn hiện tại |
| estimated_days_left | decimal(10,2) |  | Số ngày dự kiến còn bán được |
| forecast_status | varchar(30) |  | normal/warning/critical |
| calculated_at | timestamp |  | Thời điểm tính |

---

## 7.25. Bảng reorder_suggestions

### 7.25.1. Mục đích

Bảng `reorder_suggestions` lưu gợi ý nhập thêm thuốc nếu nhóm triển khai forecast hoặc analytics nâng cao.

### 7.25.2. Data Dictionary

| Field | Type | Key | Mô tả |
|---|---|---|---|
| id | bigint | PK | Mã gợi ý nhập hàng |
| medicine_id | bigint | FK | Thuốc cần nhập |
| suggested_quantity | int |  | Số lượng gợi ý nhập |
| reason | text | nullable | Lý do gợi ý |
| status | varchar(30) |  | pending/accepted/rejected |
| created_at | timestamp |  | Ngày tạo |

---

## 8. Quan hệ chính

| Quan hệ | Mô tả | Loại quan hệ |
|---|---|---|
| users - roles | User có nhiều role, role có nhiều user thông qua user_roles | N-N |
| medicine_categories - medicines | Một danh mục có nhiều thuốc | 1-N |
| medicines - active_ingredients | Một thuốc có nhiều hoạt chất mẫu, một hoạt chất có thể thuộc nhiều thuốc | N-N |
| medicines - inventories | Một thuốc có thể có một hoặc nhiều dòng tồn kho | 1-N |
| suppliers - stock_imports | Một nhà cung cấp có nhiều phiếu nhập | 1-N |
| stock_imports - stock_import_details | Một phiếu nhập có nhiều dòng chi tiết | 1-N |
| medicines - stock_import_details | Một thuốc có thể xuất hiện trong nhiều chi tiết nhập | 1-N |
| customers - orders | Một khách hàng có nhiều đơn hàng | 1-N |
| users - orders | Một nhân viên có thể tạo nhiều đơn hàng | 1-N |
| orders - order_details | Một đơn hàng có nhiều dòng thuốc | 1-N |
| medicines - order_details | Một thuốc có thể xuất hiện trong nhiều đơn hàng | 1-N |
| orders - payments | Một đơn hàng có một bản ghi thanh toán chính | 1-1 |
| orders - invoices | Một đơn hàng có một hóa đơn | 1-1 |
| medicines - drug_interactions | Thuốc liên kết với tương tác dạng cặp medicine_a_id/medicine_b_id | N-N dạng cặp thuốc |
| drug_interactions - interaction_alerts | Một rule tương tác có thể sinh nhiều cảnh báo | 1-N |
| orders - interaction_alerts | Một đơn hàng có thể có nhiều cảnh báo tương tác | 1-N |
| orders - consultation_notes | Một đơn hàng có thể có nhiều ghi chú tư vấn | 1-N |
| users - ai_logs | Một user có thể tạo nhiều log AI | 1-N |

---

## 9. Ràng buộc dữ liệu quan trọng

| Mã | Ràng buộc | Áp dụng |
|---|---|---|
| DB-01 | username phải unique | users.username |
| DB-02 | role code phải unique | roles.code |
| DB-03 | medicine code phải unique | medicines.code |
| DB-04 | selling_price >= 0 | medicines.selling_price |
| DB-05 | quantity >= 0 | inventories.quantity |
| DB-06 | stock import detail quantity > 0 | stock_import_details.quantity |
| DB-07 | order detail quantity > 0 | order_details.quantity |
| DB-08 | payment amount >= 0 | payments.amount |
| DB-09 | medicine_a_id != medicine_b_id | drug_interactions |
| DB-10 | severity chỉ thuộc LOW/MEDIUM/HIGH | drug_interactions.severity |
| DB-11 | order_id unique trong payments | payments.order_id |
| DB-12 | order_id unique trong invoices | invoices.order_id |

---

## 10. Trạng thái dữ liệu đề xuất

| Bảng | Field | Giá trị đề xuất |
|---|---|---|
| users | status | ACTIVE, INACTIVE, LOCKED |
| roles | code | ADMIN, STAFF, WAREHOUSE |
| medicines | status | ACTIVE, INACTIVE |
| medicine_categories | status | ACTIVE, INACTIVE |
| suppliers | status | ACTIVE, INACTIVE |
| stock_imports | status | DRAFT, CONFIRMED, CANCELLED |
| orders | status | DRAFT, PAID, CANCELLED |
| payments | status | PAID, FAILED, CANCELLED |
| drug_interactions | severity | LOW, MEDIUM, HIGH |
| consultation_sessions | status | DRAFT, COMPLETED, CANCELLED |
| ai_logs | status | SUCCESS, FAILED, BLOCKED |
| inventory_forecasts | forecast_status | NORMAL, WARNING, CRITICAL |

---

## 11. Dữ liệu mẫu phục vụ demo

## 11.1. Tài khoản mẫu

| Username | Role | Mục đích |
|---|---|---|
| admin01 | ADMIN | Demo quản trị, báo cáo, quản lý dữ liệu |
| staff01 | STAFF | Demo bán thuốc, cảnh báo tương tác, thanh toán |
| warehouse01 | WAREHOUSE | Demo nhập thuốc, tồn kho, cảnh báo kho |

## 11.2. Danh mục thuốc mẫu

| code/tên | Mô tả |
|---|---|
| Giảm đau | Danh mục thuốc mẫu |
| Cảm cúm | Danh mục thuốc mẫu |
| Tiêu hóa | Danh mục thuốc mẫu |
| Vitamin | Danh mục thuốc mẫu |

## 11.3. Thuốc mẫu

| code | name | category | unit | selling_price |
|---|---|---|---|---:|
| MED001 | Thuốc mẫu A | Giảm đau | Hộp | 50000 |
| MED002 | Thuốc mẫu B | Cảm cúm | Hộp | 45000 |
| MED003 | Thuốc mẫu C | Tiêu hóa | Chai | 60000 |
| MED004 | Thuốc mẫu D | Vitamin | Hộp | 80000 |

## 11.4. Tồn kho mẫu

| medicine | quantity | min_stock | expiry_date | Ghi chú |
|---|---:|---:|---|---|
| Thuốc mẫu A | 100 | 10 | 2027-05-17 | Bình thường |
| Thuốc mẫu B | 5 | 10 | 2027-01-01 | Sắp hết |
| Thuốc mẫu C | 30 | 10 | 2026-06-20 | Gần hết hạn |
| Thuốc mẫu D | 80 | 20 | 2027-12-31 | Bình thường |

## 11.5. Tương tác thuốc mẫu

| Medicine A | Medicine B | Severity | Description | Recommendation |
|---|---|---|---|---|
| Thuốc mẫu A | Thuốc mẫu B | HIGH | Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu. | Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế. |
| Thuốc mẫu C | Thuốc mẫu D | MEDIUM | Có thể cần lưu ý khi sử dụng cùng lúc theo dữ liệu mẫu. | Nhân viên nên xem cảnh báo và ghi chú tư vấn nếu cần. |

Ghi chú: Dữ liệu tương tác thuốc là dữ liệu mẫu phục vụ đồ án, không phải dữ liệu y khoa thật.

---

## 12. Gợi ý SQL DDL rút gọn

Phần này là gợi ý để nhóm có thể chuyển thành migration. Có thể điều chỉnh theo PostgreSQL/MySQL hoặc ORM đang dùng.

```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id BIGINT NOT NULL REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE medicine_categories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicines (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id BIGINT NOT NULL REFERENCES medicine_categories(id),
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    selling_price DECIMAL(12,2) NOT NULL CHECK (selling_price >= 0),
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    medicine_id BIGINT NOT NULL REFERENCES medicines(id),
    quantity INT NOT NULL CHECK (quantity >= 0),
    min_stock INT NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
    batch_number VARCHAR(100),
    expiry_date DATE,
    location VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_code VARCHAR(100) UNIQUE NOT NULL,
    customer_id BIGINT REFERENCES customers(id),
    staff_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_details (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    medicine_id BIGINT NOT NULL REFERENCES medicines(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12,2) NOT NULL CHECK (unit_price >= 0),
    line_total DECIMAL(12,2) NOT NULL CHECK (line_total >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drug_interactions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    medicine_a_id BIGINT NOT NULL REFERENCES medicines(id),
    medicine_b_id BIGINT NOT NULL REFERENCES medicines(id),
    severity VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (medicine_a_id <> medicine_b_id)
);
```

---

## 13. Gợi ý dbdiagram.io

Nhóm có thể dùng đoạn sau để vẽ ERD nhanh trên dbdiagram.io.

```text
Table users {
  id bigint [pk]
  full_name varchar
  username varchar [unique]
  password_hash varchar
  email varchar
  phone varchar
  status varchar
  created_at timestamp
  updated_at timestamp
}

Table roles {
  id bigint [pk]
  code varchar [unique]
  name varchar
  description text
}

Table user_roles {
  user_id bigint [pk]
  role_id bigint [pk]
}

Table medicine_categories {
  id bigint [pk]
  name varchar [unique]
  description text
  status varchar
}

Table medicines {
  id bigint [pk]
  category_id bigint [ref: > medicine_categories.id]
  code varchar [unique]
  name varchar
  unit varchar
  selling_price decimal
  description text
  status varchar
}

Table inventories {
  id bigint [pk]
  medicine_id bigint [ref: > medicines.id]
  quantity int
  min_stock int
  batch_number varchar
  expiry_date date
}

Table customers {
  id bigint [pk]
  full_name varchar
  phone varchar
  note text
}

Table orders {
  id bigint [pk]
  order_code varchar [unique]
  customer_id bigint [ref: > customers.id]
  staff_id bigint [ref: > users.id]
  status varchar
  total_amount decimal
}

Table order_details {
  id bigint [pk]
  order_id bigint [ref: > orders.id]
  medicine_id bigint [ref: > medicines.id]
  quantity int
  unit_price decimal
  line_total decimal
}

Table payments {
  id bigint [pk]
  order_id bigint [unique, ref: > orders.id]
  method varchar
  amount decimal
  status varchar
  paid_at timestamp
}

Table invoices {
  id bigint [pk]
  invoice_code varchar [unique]
  order_id bigint [unique, ref: > orders.id]
  issued_at timestamp
}

Table drug_interactions {
  id bigint [pk]
  medicine_a_id bigint [ref: > medicines.id]
  medicine_b_id bigint [ref: > medicines.id]
  severity varchar
  description text
  recommendation text
  is_active boolean
}

Table interaction_alerts {
  id bigint [pk]
  order_id bigint [ref: > orders.id]
  interaction_id bigint [ref: > drug_interactions.id]
  severity varchar
  alert_message text
}

Ref: users.id < user_roles.user_id
Ref: roles.id < user_roles.role_id
```

---

## 14. Mapping bảng với module

| Module | Bảng liên quan |
|---|---|
| Auth Module | users, roles, user_roles |
| User Module | users, roles, user_roles |
| Medicine Module | medicines, medicine_categories, active_ingredients, medicine_active_ingredients |
| Inventory Module | inventories, stock_imports, stock_import_details, suppliers |
| Customer Module | customers |
| Sales Module | orders, order_details |
| Payment Module | payments |
| Invoice Module | invoices |
| Rule Engine Module | inventories, drug_interactions, interaction_alerts |
| Report Module | orders, order_details, payments, medicines, inventories |
| AI Module | ai_logs, ai_prompt_templates, consultation_sessions, consultation_notes |
| Graph Module | Neo4j, medicines, active_ingredients |
| Audit Module | ai_logs, audit_logs nếu bổ sung |

---

## 15. Mapping bảng với API chính

| API | Bảng liên quan |
|---|---|
| POST /auth/login | users, roles, user_roles |
| GET /medicines | medicines, medicine_categories |
| POST /medicines | medicines |
| GET /inventories | inventories, medicines |
| POST /stock-imports | stock_imports, stock_import_details |
| POST /orders | orders |
| POST /orders/{id}/items | orders, order_details, medicines, inventories |
| POST /interactions/check | drug_interactions, medicines |
| POST /orders/{id}/pay | orders, payments, inventories, invoices |
| GET /orders/{id}/invoice | invoices, orders, order_details, payments |
| GET /reports/revenue | orders, payments |
| POST /ai/consultation/note | ai_logs, consultation_notes |

---

## 16. Rủi ro thiết kế database

| Rủi ro | Tác động | Cách xử lý |
|---|---|---|
| Không chuẩn hóa dữ liệu thuốc | Dữ liệu trùng lặp, khó báo cáo | Tách medicines và medicine_categories |
| Không lưu đơn giá tại thời điểm bán | Báo cáo sai nếu giá thuốc thay đổi | Lưu unit_price trong order_details |
| Không lưu cảnh báo tương tác | Khó truy vết cảnh báo đã hiển thị | Bổ sung interaction_alerts |
| Không quản lý status | Xóa dữ liệu gây mất lịch sử | Dùng status/inactive thay vì xóa cứng |
| Không có constraint tồn kho | Tồn kho âm | Thêm check quantity >= 0 |
| Không chuẩn hóa cặp tương tác | Trùng A-B và B-A | Quy ước medicine_a_id < medicine_b_id hoặc xử lý backend |
| Thiếu seed data | Demo không có dữ liệu | Chuẩn bị script seed trước |
| Lưu dữ liệu nhạy cảm | Rủi ro bảo mật | Chỉ dùng dữ liệu mẫu, không lưu thông tin thật |

---

## 17. Checklist thiết kế database

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Có bảng users, roles, user_roles chưa? |  |
| Có bảng medicines và medicine_categories chưa? |  |
| Mã thuốc đã unique chưa? |  |
| Giá bán có check >= 0 chưa? |  |
| Tồn kho có check >= 0 chưa? |  |
| Có bảng orders và order_details chưa? |  |
| order_details có lưu unit_price tại thời điểm bán chưa? |  |
| Có bảng payments và invoices chưa? |  |
| payments.order_id có unique để đảm bảo 1-1 chưa? |  |
| invoices.order_id có unique để đảm bảo 1-1 chưa? |  |
| Có bảng drug_interactions chưa? |  |
| Có rule tránh cặp tương tác trùng chưa? |  |
| Có seed data cho tương tác thuốc chưa? |  |
| Có bảng ai_logs nếu làm AI chưa? |  |
| Có dữ liệu demo tài khoản Admin/Staff/Warehouse chưa? |  |

---

## 18. Kết luận

Tài liệu **Database Design Document** đã mô tả thiết kế cơ sở dữ liệu quan hệ cho hệ thống **PharmaAssist AI Intelligence**. Thiết kế dữ liệu bao gồm các nhóm bảng chính cho user, thuốc, tồn kho, nhập thuốc, khách hàng, đơn hàng, thanh toán, hóa đơn, tương tác thuốc, tư vấn, AI log và analytics.

Trong MVP, nhóm cần ưu tiên triển khai các bảng cốt lõi như users, roles, medicines, medicine_categories, inventories, stock_imports, orders, order_details, payments, invoices, drug_interactions và interaction_alerts. Các bảng AI và analytics có thể triển khai sau hoặc mô phỏng tùy phạm vi.

Thiết kế database cần đảm bảo các rule nghiệp vụ quan trọng như không trùng mã thuốc, không tồn kho âm, không bán vượt tồn, hóa đơn chỉ tạo sau thanh toán và cảnh báo tương tác thuốc dựa trên dữ liệu mẫu. Seed data cần được chuẩn bị kỹ để demo luồng bán thuốc, cảnh báo tương tác, thanh toán, hóa đơn và báo cáo.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

