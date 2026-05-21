# 11_MODULE_DESIGN

**Mã tài liệu:** 11_Module_Design  
**Tên tài liệu:** Module Design Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu thiết kế module hệ thống  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, System Analyst, Backend Developer, Frontend Developer, Database Designer, AI/Graph Developer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Module Design Document** mô tả chi tiết từng module của hệ thống **PharmaAssist AI Intelligence**, bao gồm mục tiêu, trách nhiệm, actor sử dụng, chức năng chính, input, output, bảng dữ liệu liên quan, API chính, business rules và mối liên hệ với các module khác.

Trong đồ án môn **Công Nghệ Phần Mềm**, tài liệu thiết kế module giúp chuyển từ kiến trúc tổng thể sang thiết kế chi tiết hơn để nhóm có thể lập trình, chia task, thiết kế API, thiết kế database và viết test case. Nếu tài liệu kiến trúc trả lời câu hỏi “hệ thống gồm những tầng nào?”, thì tài liệu module trả lời câu hỏi “mỗi phần trong hệ thống làm gì?”.

Tài liệu này giúp nhóm:

- Chia hệ thống thành các module rõ ràng.
- Tránh chồng chéo trách nhiệm giữa các module.
- Xác định input/output của từng module.
- Xác định bảng dữ liệu mà mỗi module thao tác.
- Xác định API chính cần xây dựng.
- Làm cơ sở chia backlog và sprint.
- Làm cơ sở viết test case theo module.
- Làm cơ sở trình bày thiết kế trong báo cáo và slide.

---

## 2. Phạm vi tài liệu

Tài liệu này mô tả thiết kế module cho các nhóm chức năng chính của PharmaAssist AI Intelligence:

- Auth Module.
- User Module.
- Medicine Module.
- Inventory Module.
- Customer Module.
- Sales Module.
- Payment Module.
- Invoice Module.
- Rule Engine Module.
- Report Module.
- AI Module.
- Graph Module.
- Audit Module.

Các module thuộc MVP như Auth, Medicine, Inventory, Sales, Payment, Invoice và Rule Engine cần được ưu tiên thiết kế chi tiết để triển khai trước. Các module AI, Graph và Audit là phần nâng cao, có thể triển khai thật hoặc mô phỏng tùy thời gian.

---

## 3. Nguyên tắc thiết kế module

| Nguyên tắc | Mô tả |
|---|---|
| Tách trách nhiệm rõ ràng | Mỗi module phụ trách một nhóm nghiệp vụ cụ thể |
| Ưu tiên MVP | Module lõi được triển khai trước module nâng cao |
| Dễ kiểm thử | Mỗi module có input/output rõ ràng để viết test case |
| Dễ mở rộng | AI/Graph có thể thêm sau mà không phá vỡ module bán hàng |
| Không phụ thuộc vòng tròn | Tránh các module gọi nhau chồng chéo khó kiểm soát |
| Bảo mật theo tầng | Module API phải kết hợp Auth/Role Guard |
| Có truy vết | Module quan trọng có thể gọi Audit Module để ghi log |
| An toàn AI | AI Module phải đi qua Guardrail và không tự động quyết định nghiệp vụ |

---

## 4. Danh sách module tổng quan

| Module | Trách nhiệm | Loại | Ưu tiên |
|---|---|---|---|
| Auth Module | Đăng nhập, JWT/session, phân quyền | MVP | High |
| User Module | Quản lý tài khoản, vai trò | MVP | High |
| Medicine Module | Quản lý thuốc, danh mục thuốc | MVP | High |
| Inventory Module | Nhập kho, tồn kho, cảnh báo kho | MVP | High |
| Customer Module | Quản lý khách hàng | MVP | Medium |
| Sales Module | Tạo đơn, chi tiết đơn, tính tiền | MVP | High |
| Payment Module | Thanh toán mô phỏng | MVP | High |
| Invoice Module | Tạo và xem/in hóa đơn | MVP | High |
| Rule Engine Module | Kiểm tra tồn kho, tương tác thuốc, red flag nếu có | MVP/Nâng cao | High |
| Report Module | Báo cáo doanh thu, thuốc bán chạy, tồn kho | MVP | Medium |
| AI Module | AI Copilot, prompt, provider, guardrail | Advanced | Medium |
| Graph Module | Neo4j, graph query, Graph-RAG | Advanced | Medium |
| Audit Module | Log hệ thống và AI | MVP/Nâng cao | Medium |

---

## 5. Sơ đồ phụ thuộc module dạng text

```text
Frontend UI
   |
   v
Backend API
   |
   +-- Auth Module
   +-- User Module
   +-- Medicine Module
   +-- Inventory Module
   +-- Customer Module
   +-- Sales Module
   |      +-- Inventory Module
   |      +-- Rule Engine Module
   |      +-- Customer Module
   |
   +-- Payment Module
   |      +-- Sales Module
   |      +-- Inventory Module
   |      +-- Invoice Module
   |
   +-- Invoice Module
   +-- Report Module
   |      +-- Sales Module / Database
   |      +-- Inventory Module / Database
   |
   +-- Rule Engine Module
   |      +-- Inventory Module
   |      +-- DrugInteraction Data
   |
   +-- AI Module
   |      +-- Guardrail
   |      +-- Audit Module
   |      +-- Graph Module
   |
   +-- Graph Module
   |      +-- Neo4j
   |
   +-- Audit Module
```

---

## 6. Module 01 - Auth Module

### 6.1. Mục tiêu

Auth Module chịu trách nhiệm xác thực người dùng và hỗ trợ phân quyền truy cập hệ thống. Đây là module nền tảng vì mọi người dùng nội bộ cần đăng nhập trước khi sử dụng các chức năng như quản lý thuốc, nhập kho, bán hàng, thanh toán hoặc xem báo cáo.

### 6.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Auth Module |
| Mục tiêu | Đăng nhập, đăng xuất, xác thực token, hỗ trợ phân quyền |
| Actor | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Chức năng | Đăng nhập, đăng xuất, kiểm tra token, lấy thông tin người dùng hiện tại |
| Input | username, password, token |
| Output | access_token/session, user_info, role, thông báo lỗi nếu đăng nhập thất bại |
| Bảng liên quan | users, roles, user_roles |
| API | POST /auth/login, POST /auth/logout, GET /auth/me |
| Ưu tiên | High |
| Loại | MVP |

### 6.3. Chức năng chính

| Chức năng | Mô tả |
|---|---|
| Đăng nhập | Người dùng nhập username/password để vào hệ thống |
| Đăng xuất | Người dùng thoát khỏi phiên làm việc |
| Kiểm tra token | Backend xác thực request có token hợp lệ |
| Lấy thông tin user | Trả về thông tin user hiện tại và role |
| Role guard | Hỗ trợ kiểm tra quyền truy cập API |

### 6.4. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-01 | Người dùng phải đăng nhập trước khi sử dụng hệ thống |
| BR-02 | Người dùng chỉ được truy cập chức năng theo vai trò |
| NFR-01 | Mật khẩu phải được hash |
| NFR-02 | API phải kiểm tra role |

### 6.5. Input/Output chi tiết

| Use case | Input | Output |
|---|---|---|
| Login | username, password | access_token, user_info, roles |
| Logout | access_token/session | Thông báo đăng xuất thành công |
| Get current user | access_token | user profile, role list |

### 6.6. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /auth/login | Đăng nhập | Public |
| POST | /auth/logout | Đăng xuất | Admin, Staff, Warehouse |
| GET | /auth/me | Lấy thông tin người dùng hiện tại | Admin, Staff, Warehouse |

### 6.7. Rủi ro và lưu ý

| Rủi ro | Cách xử lý |
|---|---|
| Lưu mật khẩu plain text | Bắt buộc hash mật khẩu |
| Chỉ kiểm tra quyền ở frontend | Backend phải có middleware/guard |
| Token không hết hạn | Cấu hình thời gian hết hạn token |
| Tài khoản demo sai role | Chuẩn bị seed user rõ ràng |

---

## 7. Module 02 - User Module

### 7.1. Mục tiêu

User Module quản lý tài khoản người dùng và vai trò trong hệ thống. Module này chủ yếu do Admin sử dụng để tạo tài khoản, cập nhật trạng thái tài khoản và gán quyền cho người dùng.

### 7.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | User Module |
| Mục tiêu | Quản lý tài khoản và vai trò người dùng |
| Actor | Admin |
| Chức năng | Tạo user, sửa user, khóa/mở user, gán role |
| Input | full_name, username, password, role, status |
| Output | Danh sách user, chi tiết user, trạng thái cập nhật |
| Bảng liên quan | users, roles, user_roles |
| API | GET /users, POST /users, PUT /users/{id}, PATCH /users/{id}/status |
| Ưu tiên | High |
| Loại | MVP |

### 7.3. Chức năng chính

| Chức năng | Mô tả |
|---|---|
| Xem danh sách user | Admin xem tài khoản trong hệ thống |
| Tạo user | Admin tạo tài khoản cho nhân viên |
| Cập nhật user | Admin cập nhật thông tin cơ bản |
| Khóa/mở tài khoản | Admin thay đổi trạng thái user |
| Gán role | Admin cấp vai trò cho user |

### 7.4. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /users | Xem danh sách user | Admin |
| POST | /users | Tạo user | Admin |
| GET | /users/{id} | Xem chi tiết user | Admin |
| PUT | /users/{id} | Cập nhật user | Admin |
| PATCH | /users/{id}/status | Khóa/mở user | Admin |
| POST | /users/{id}/roles | Gán role | Admin |

### 7.5. Lưu ý thiết kế

- Không nên xóa cứng user đã có lịch sử đơn hàng.
- Nên dùng trạng thái active/inactive/locked.
- Role cơ bản gồm ADMIN, STAFF, WAREHOUSE.

---

## 8. Module 03 - Medicine Module

### 8.1. Mục tiêu

Medicine Module quản lý thông tin thuốc và danh mục thuốc. Đây là module nền tảng vì dữ liệu thuốc được sử dụng bởi Inventory, Sales, Rule Engine, Report và Graph Module.

### 8.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Medicine Module |
| Mục tiêu | Quản lý thông tin thuốc và danh mục thuốc |
| Actor | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Chức năng | Thêm, sửa, xóa/ẩn, tìm kiếm thuốc, quản lý danh mục |
| Input | Tên thuốc, mã thuốc, danh mục, đơn vị, giá, mô tả, trạng thái |
| Output | Danh sách thuốc, chi tiết thuốc, kết quả tìm kiếm |
| Bảng liên quan | medicines, medicine_categories |
| API | GET /medicines, POST /medicines, PUT /medicines/{id}, DELETE /medicines/{id} |
| Ưu tiên | High |
| Loại | MVP |

### 8.3. Chức năng chính

| Chức năng | Mô tả | Actor |
|---|---|---|
| Xem danh sách thuốc | Hiển thị danh sách thuốc | Admin, Staff, Warehouse |
| Tìm kiếm thuốc | Tìm theo tên, mã, danh mục | Admin, Staff, Warehouse |
| Xem chi tiết thuốc | Xem thông tin chi tiết thuốc | Admin, Staff, Warehouse |
| Thêm thuốc | Tạo thuốc mới | Admin |
| Sửa thuốc | Cập nhật thông tin thuốc | Admin |
| Xóa/ẩn thuốc | Ngừng hiển thị thuốc không còn bán | Admin |
| Quản lý danh mục | Thêm/sửa/xóa danh mục thuốc | Admin |

### 8.4. Input/Output chi tiết

| Chức năng | Input | Output |
|---|---|---|
| Tạo thuốc | code, name, category_id, unit, selling_price, description | medicine record |
| Sửa thuốc | medicine_id và dữ liệu cập nhật | medicine record đã cập nhật |
| Tìm thuốc | keyword, category_id, status | danh sách thuốc phù hợp |
| Xem chi tiết | medicine_id | chi tiết thuốc |

### 8.5. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /medicines | Lấy danh sách thuốc | Admin, Staff, Warehouse |
| GET | /medicines/{id} | Xem chi tiết thuốc | Admin, Staff, Warehouse |
| POST | /medicines | Thêm thuốc | Admin |
| PUT | /medicines/{id} | Sửa thuốc | Admin |
| DELETE | /medicines/{id} | Xóa/ẩn thuốc | Admin |
| GET | /categories | Xem danh mục | Admin, Staff, Warehouse |
| POST | /categories | Thêm danh mục | Admin |
| PUT | /categories/{id} | Sửa danh mục | Admin |
| DELETE | /categories/{id} | Xóa/ẩn danh mục | Admin |

### 8.6. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-03 | Mã thuốc không được trùng |
| BR-04 | Giá bán phải lớn hơn hoặc bằng 0 |
| RP | Chỉ Admin được thêm/sửa/xóa thuốc |

### 8.7. Rủi ro và lưu ý

| Rủi ro | Cách xử lý |
|---|---|
| Trùng mã thuốc | Unique constraint + backend validation |
| Xóa thuốc đã có đơn hàng | Dùng trạng thái inactive thay vì xóa cứng |
| Giá bán âm | Validate frontend và backend |
| Staff sửa sai dữ liệu thuốc | Chỉ Admin có quyền sửa |

---

## 9. Module 04 - Inventory Module

### 9.1. Mục tiêu

Inventory Module quản lý tồn kho, nhập thuốc, cảnh báo thuốc sắp hết và thuốc gần hết hạn. Module này đảm bảo hệ thống không bán vượt tồn và hỗ trợ nhân viên kho theo dõi tình trạng kho.

### 9.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Inventory Module |
| Mục tiêu | Quản lý tồn kho, nhập kho, cảnh báo kho |
| Actor | Admin, Nhân viên kho, Nhân viên nhà thuốc |
| Chức năng | Nhập thuốc, xem tồn kho, cảnh báo sắp hết, cảnh báo gần hết hạn |
| Input | medicine_id, quantity, min_stock, expiry_date, supplier_id |
| Output | Danh sách tồn kho, phiếu nhập, cảnh báo kho |
| Bảng liên quan | inventories, stock_imports, stock_import_details, medicines, suppliers |
| API | /inventories, /stock-imports, /inventories/low-stock, /inventories/near-expiry |
| Ưu tiên | High |
| Loại | MVP |

### 9.3. Chức năng chính

| Chức năng | Mô tả | Actor |
|---|---|---|
| Xem tồn kho | Xem số lượng tồn của từng thuốc | Admin, Warehouse, Staff |
| Tạo phiếu nhập | Nhập thuốc từ nhà cung cấp | Admin, Warehouse |
| Xác nhận nhập | Cập nhật tồn kho sau nhập | Admin, Warehouse |
| Cảnh báo sắp hết | Hiển thị thuốc dưới ngưỡng tối thiểu | Admin, Warehouse, Staff |
| Cảnh báo gần hết hạn | Hiển thị thuốc gần hết hạn | Admin, Warehouse, Staff |
| Điều chỉnh tồn kho | Điều chỉnh số lượng nếu kiểm kê | Admin, Warehouse giới hạn |

### 9.4. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /inventories | Xem tồn kho | Admin, Staff, Warehouse |
| GET | /inventories/low-stock | Xem thuốc sắp hết | Admin, Staff, Warehouse |
| GET | /inventories/near-expiry | Xem thuốc gần hết hạn | Admin, Staff, Warehouse |
| POST | /stock-imports | Tạo phiếu nhập | Admin, Warehouse |
| GET | /stock-imports | Xem lịch sử nhập | Admin, Warehouse |
| POST | /stock-imports/{id}/confirm | Xác nhận phiếu nhập | Admin, Warehouse |

### 9.5. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-05 | Số lượng tồn không được âm |
| BR-06 | Không cho bán thuốc vượt số lượng tồn |
| BR-07 | Thuốc dưới ngưỡng tối thiểu phải hiện cảnh báo sắp hết |
| BR-08 | Thuốc gần hết hạn trong X ngày phải hiện cảnh báo |
| BR-10 | Thanh toán thành công mới được trừ tồn kho |

### 9.6. Rủi ro và lưu ý

| Rủi ro | Cách xử lý |
|---|---|
| Tồn kho sai do cập nhật thủ công | Ưu tiên cập nhật qua nhập kho và bán hàng |
| Bán vượt tồn | Kiểm tra ở Sales và Payment trước khi thanh toán |
| Không phát hiện thuốc gần hết hạn | Có API/màn hình cảnh báo gần hết hạn |
| Phiếu nhập bị sửa sau khi xác nhận | Chặn sửa hoặc tạo phiếu điều chỉnh |

---

## 10. Module 05 - Customer Module

### 10.1. Mục tiêu

Customer Module quản lý thông tin khách hàng ở mức cơ bản. Trong MVP, khách hàng không cần đăng nhập. Nhân viên nhà thuốc có thể tạo hoặc tìm khách hàng để gắn vào đơn hàng.

### 10.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Customer Module |
| Mục tiêu | Quản lý thông tin khách hàng cơ bản |
| Actor | Admin, Nhân viên nhà thuốc |
| Chức năng | Thêm, sửa, tìm kiếm khách hàng, xem lịch sử mua |
| Input | full_name, phone, note |
| Output | Danh sách khách hàng, chi tiết khách hàng, lịch sử mua |
| Bảng liên quan | customers, orders |
| API | GET /customers, POST /customers, PUT /customers/{id}, GET /customers/{id}/orders |
| Ưu tiên | Medium |
| Loại | MVP |

### 10.3. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /customers | Tìm/xem khách hàng | Admin, Staff |
| POST | /customers | Tạo khách hàng | Admin, Staff |
| PUT | /customers/{id} | Cập nhật khách hàng | Admin, Staff giới hạn |
| GET | /customers/{id}/orders | Xem lịch sử mua | Admin, Staff |

### 10.4. Lưu ý an toàn dữ liệu

- Không dùng dữ liệu cá nhân thật trong demo.
- Chỉ lưu thông tin cần thiết: tên, số điện thoại, ghi chú cơ bản.
- Không lưu dữ liệu bệnh án thật.

---

## 11. Module 06 - Sales Module

### 11.1. Mục tiêu

Sales Module hỗ trợ bán thuốc tại quầy. Đây là module trung tâm của MVP, cho phép nhân viên tạo đơn, thêm thuốc, tính tiền, kiểm tra tồn kho và kích hoạt kiểm tra tương tác thuốc.

### 11.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Sales Module |
| Mục tiêu | Hỗ trợ bán thuốc tại quầy |
| Actor | Nhân viên nhà thuốc, Admin |
| Chức năng | Tạo đơn, thêm thuốc, cập nhật số lượng, tính tiền, hủy đơn nháp |
| Input | customer_id, medicine_id, quantity |
| Output | Đơn hàng, tổng tiền, cảnh báo tồn kho, cảnh báo tương tác |
| Bảng liên quan | orders, order_details, inventories, medicines, customers |
| API | POST /orders, POST /orders/{id}/items, PUT /orders/{id}/items/{itemId}, DELETE /orders/{id}/items/{itemId} |
| Ưu tiên | High |
| Loại | MVP |

### 11.3. Chức năng chính

| Chức năng | Mô tả |
|---|---|
| Tạo đơn | Tạo đơn bán thuốc trạng thái nháp |
| Thêm thuốc | Thêm thuốc vào đơn sau khi kiểm tra tồn kho |
| Cập nhật số lượng | Thay đổi số lượng thuốc trong đơn |
| Xóa thuốc khỏi đơn | Xóa dòng thuốc khỏi đơn nháp |
| Tính tổng tiền | Tính tổng tiền theo số lượng và đơn giá |
| Kiểm tra tương tác | Gọi Rule Engine khi đơn có nhiều thuốc |
| Gắn khách hàng | Chọn hoặc tạo khách hàng cho đơn |

### 11.4. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /orders | Tạo đơn bán thuốc | Admin, Staff |
| GET | /orders/{id} | Xem chi tiết đơn | Admin, Staff |
| POST | /orders/{id}/items | Thêm thuốc vào đơn | Admin, Staff |
| PUT | /orders/{id}/items/{itemId} | Cập nhật số lượng | Admin, Staff |
| DELETE | /orders/{id}/items/{itemId} | Xóa thuốc khỏi đơn | Admin, Staff |
| POST | /orders/{id}/confirm | Xác nhận đơn trước thanh toán | Admin, Staff |

### 11.5. Phụ thuộc module

| Module phụ thuộc | Lý do |
|---|---|
| Medicine Module | Lấy thông tin thuốc và giá bán |
| Inventory Module | Kiểm tra số lượng tồn |
| Rule Engine Module | Kiểm tra tương tác thuốc |
| Customer Module | Gắn khách hàng vào đơn |
| Payment Module | Thanh toán đơn hàng |

### 11.6. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-06 | Không cho bán thuốc vượt số lượng tồn |
| BR-09 | Đơn hàng phải có ít nhất một thuốc |
| BR-13 | Khi đơn có từ 2 thuốc trở lên, hệ thống kiểm tra tương tác |

---

## 12. Module 07 - Payment Module

### 12.1. Mục tiêu

Payment Module ghi nhận thanh toán cho đơn hàng. Trong MVP, thanh toán được mô phỏng bằng tiền mặt hoặc chuyển khoản, không tích hợp cổng thanh toán thật.

### 12.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Payment Module |
| Mục tiêu | Ghi nhận thanh toán đơn hàng |
| Actor | Nhân viên nhà thuốc, Admin |
| Chức năng | Tạo thanh toán, xác nhận thanh toán, cập nhật trạng thái đơn |
| Input | order_id, payment_method, amount_paid |
| Output | Payment record, trạng thái đơn hàng đã thanh toán |
| Bảng liên quan | payments, orders, inventories |
| API | POST /payments, GET /payments/{id} |
| Ưu tiên | High |
| Loại | MVP |

### 12.3. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /payments | Tạo thanh toán | Admin, Staff |
| GET | /payments/{id} | Xem thanh toán | Admin, Staff |
| GET | /orders/{id}/payment | Xem thanh toán của đơn | Admin, Staff |

### 12.4. Phụ thuộc module

| Module phụ thuộc | Lý do |
|---|---|
| Sales Module | Lấy thông tin đơn hàng |
| Inventory Module | Trừ tồn kho sau thanh toán |
| Invoice Module | Tạo hóa đơn sau thanh toán |
| Audit Module | Ghi log thanh toán nếu cần |

### 12.5. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-09 | Đơn hàng phải có ít nhất một thuốc |
| BR-10 | Thanh toán thành công mới được trừ tồn kho |
| BR-11 | Mỗi đơn hàng có một bản ghi thanh toán chính |
| BR-12 | Hóa đơn chỉ được tạo sau khi thanh toán thành công |

---

## 13. Module 08 - Invoice Module

### 13.1. Mục tiêu

Invoice Module tạo và hiển thị hóa đơn sau khi đơn hàng đã được thanh toán thành công.

### 13.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Invoice Module |
| Mục tiêu | Tạo và xem/in hóa đơn |
| Actor | Nhân viên nhà thuốc, Admin |
| Chức năng | Tạo hóa đơn, xem hóa đơn, in hóa đơn |
| Input | order_id |
| Output | Hóa đơn gồm thông tin đơn hàng, thuốc, tổng tiền |
| Bảng liên quan | invoices, orders, order_details, payments, customers |
| API | POST /invoices, GET /invoices/{id}, GET /orders/{id}/invoice |
| Ưu tiên | High |
| Loại | MVP |

### 13.3. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /invoices | Tạo hóa đơn | Admin, Staff |
| GET | /invoices/{id} | Xem hóa đơn | Admin, Staff |
| GET | /orders/{id}/invoice | Xem hóa đơn theo đơn | Admin, Staff |

### 13.4. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-12 | Hóa đơn chỉ được tạo sau khi thanh toán thành công |

### 13.5. Nội dung hóa đơn

| Thành phần | Mô tả |
|---|---|
| Mã hóa đơn | Mã định danh hóa đơn |
| Ngày tạo | Thời điểm tạo hóa đơn |
| Nhân viên bán | Người xử lý đơn |
| Khách hàng | Tên/SĐT nếu có |
| Danh sách thuốc | Tên thuốc, số lượng, đơn giá, thành tiền |
| Tổng tiền | Tổng giá trị đơn |
| Phương thức thanh toán | Tiền mặt/chuyển khoản mô phỏng |

---

## 14. Module 09 - Rule Engine Module

### 14.1. Mục tiêu

Rule Engine Module kiểm tra các luật nghiệp vụ quan trọng, đặc biệt là kiểm tra tồn kho và kiểm tra tương tác thuốc. Đây là module tạo điểm nổi bật cho hệ thống PharmaAssist AI Intelligence.

### 14.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Rule Engine Module |
| Mục tiêu | Kiểm tra luật nghiệp vụ |
| Actor | Hệ thống |
| Chức năng | Kiểm tra tồn kho, kiểm tra tương tác thuốc, red flag nếu có |
| Input | Danh sách thuốc trong đơn, số lượng, customer/consultation context nếu có |
| Output | Danh sách cảnh báo, validation result |
| Bảng liên quan | inventories, drug_interactions, interaction_alerts |
| API | POST /interactions/check, POST /orders/check-stock |
| Ưu tiên | High |
| Loại | MVP/Nâng cao |

### 14.3. Chức năng chính

| Chức năng | Mô tả |
|---|---|
| Kiểm tra tồn kho | Xác định số lượng bán có vượt tồn hay không |
| Kiểm tra tương tác thuốc | Sinh cặp thuốc và kiểm tra bảng DrugInteraction |
| Tạo cảnh báo | Trả về cảnh báo gồm thuốc, mức độ, mô tả, khuyến nghị |
| Nhắc ghi chú | Nếu tương tác mức cao, nhắc nhân viên nhập ghi chú |
| Kiểm tra red flag | Nếu có AI/Graph, kiểm tra dấu hiệu nguy hiểm mẫu |

### 14.4. Input/Output chi tiết

| Use case | Input | Output |
|---|---|---|
| Check stock | medicine_id, requested_quantity | is_available, message |
| Check interaction | medicine_ids[] | alert list |
| Check red flag | symptoms[] nếu có | red flag list |

### 14.5. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /orders/check-stock | Kiểm tra tồn kho | Admin, Staff |
| POST | /interactions/check | Kiểm tra tương tác thuốc | Admin, Staff |
| GET | /interactions | Xem rule tương tác | Admin |
| POST | /interactions | Thêm rule tương tác | Admin |
| PUT | /interactions/{id} | Sửa rule tương tác | Admin |

### 14.6. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-06 | Không cho bán thuốc vượt số lượng tồn |
| BR-13 | Khi đơn có từ 2 thuốc trở lên, hệ thống kiểm tra tương tác |
| BR-14 | Nếu có tương tác, hiển thị tên thuốc, mức độ, mô tả, khuyến nghị |
| BR-15 | Nếu tương tác mức cao, nhân viên nên nhập ghi chú tư vấn |
| SR-03 | Cảnh báo chỉ mang tính tham khảo |

### 14.7. Pseudo-flow kiểm tra tương tác

```text
Input: medicineIds

if medicineIds.length < 2:
    return []

pairs = generatePairs(medicineIds)
alerts = []

for pair in pairs:
    interaction = findInteraction(pair.a, pair.b)
    if interaction exists:
        alerts.add(formatAlert(interaction))

return alerts
```

---

## 15. Module 10 - Report Module

### 15.1. Mục tiêu

Report Module cung cấp các báo cáo cơ bản cho Admin như doanh thu, thuốc bán chạy, tồn kho thấp và thuốc gần hết hạn.

### 15.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Report Module |
| Mục tiêu | Báo cáo doanh thu và vận hành |
| Actor | Admin, Nhân viên kho giới hạn |
| Chức năng | Doanh thu, thuốc bán chạy, tồn kho, gần hết hạn |
| Input | date_from, date_to, filter |
| Output | Bảng/bộ số liệu báo cáo |
| Bảng liên quan | orders, order_details, payments, medicines, inventories |
| API | GET /reports/revenue, GET /reports/top-medicines, GET /reports/inventory |
| Ưu tiên | Medium |
| Loại | MVP |

### 15.3. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /reports/revenue | Báo cáo doanh thu | Admin |
| GET | /reports/top-medicines | Thuốc bán chạy | Admin |
| GET | /reports/inventory | Báo cáo tồn kho | Admin, Warehouse giới hạn |
| GET | /reports/dashboard | Dashboard tổng quan | Admin |

### 15.4. Business rules liên quan

| Rule | Nội dung |
|---|---|
| BR-16 | Báo cáo doanh thu chỉ tính đơn đã thanh toán |

---

## 16. Module 11 - AI Module

### 16.1. Mục tiêu

AI Module cung cấp các chức năng AI nâng cao như AI Pharmacist Copilot, tạo câu hỏi bổ sung, giải thích cảnh báo, tạo ghi chú tư vấn tham khảo và tạo báo cáo vận hành bằng AI nếu có.

### 16.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | AI Module |
| Mục tiêu | Điều phối AI Copilot, prompt, provider và guardrail |
| Actor | Admin, Nhân viên nhà thuốc, AI System |
| Chức năng | Tạo câu hỏi, giải thích cảnh báo, tạo ghi chú, gọi provider, fallback MockAI |
| Input | consultation context, alert context, prompt template |
| Output | AI response dạng tham khảo |
| Bảng liên quan | ai_logs, ai_prompt_templates, consultation_sessions, consultation_notes |
| API | POST /ai/consultation, POST /ai/explain-alert, POST /ai/generate-note |
| Ưu tiên | Medium |
| Loại | Advanced |

### 16.3. Thành phần nội bộ

| Thành phần | Vai trò |
|---|---|
| AI Orchestrator | Điều phối toàn bộ luồng AI |
| Prompt Builder | Ghép prompt template và context |
| Provider Adapter | Gọi MockAI/Gemini/OpenRouter/Ollama |
| Guardrail Service | Kiểm tra input/output AI |
| AI Audit Service | Lưu request/response AI |

### 16.4. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| POST | /ai/consultation | Tạo câu hỏi tư vấn tham khảo | Admin, Staff |
| POST | /ai/explain-alert | Giải thích cảnh báo tương tác | Admin, Staff |
| POST | /ai/generate-note | Tạo ghi chú tư vấn mẫu | Admin, Staff |
| GET | /ai/logs | Xem AI Audit Log | Admin |
| GET | /ai/prompts | Xem prompt template | Admin |
| PUT | /ai/prompts/{id} | Cập nhật prompt | Admin |

### 16.5. Safety rules liên quan

| Rule | Nội dung |
|---|---|
| SR-01 | Hệ thống không chẩn đoán bệnh |
| SR-02 | Hệ thống không kê đơn thuốc |
| SR-04 | AI không được đưa hướng dẫn điều trị cụ thể |
| SR-05 | AI phải nhắc người dùng hỏi chuyên gia khi có rủi ro |
| SR-06 | Nội dung AI phải được người dùng xác nhận trước khi lưu |
| SR-09 | Các tác vụ AI quan trọng phải được ghi log |

### 16.6. Lưu ý triển khai

- Bắt buộc có MockAI để demo ổn định.
- Không commit API key thật.
- Output AI cần có disclaimer.
- Người dùng phải xác nhận trước khi lưu nội dung AI.

---

## 17. Module 12 - Graph Module

### 17.1. Mục tiêu

Graph Module quản lý việc truy vấn dữ liệu Knowledge Graph từ Neo4j và cung cấp dữ liệu graph cho Graph Explorer hoặc Graph-RAG Service.

### 17.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Graph Module |
| Mục tiêu | Neo4j, graph query, Graph-RAG |
| Actor | Admin, Nhân viên nhà thuốc, Neo4j Graph |
| Chức năng | Truy vấn node-edge, lấy quan hệ thuốc/tương tác, build graph context |
| Input | medicine_id, active_ingredient_id, symptom, query params |
| Output | Node list, relationship list, graph context |
| Bảng/Nguồn liên quan | Neo4j, medicines nếu cần map dữ liệu quan hệ |
| API | GET /graph/medicine/{id}, GET /graph/interactions, POST /graph/context |
| Ưu tiên | Medium |
| Loại | Advanced |

### 17.3. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /graph/medicine/{id} | Lấy graph liên quan thuốc | Admin, Staff |
| GET | /graph/interactions | Lấy graph tương tác | Admin, Staff |
| POST | /graph/context | Tạo graph context cho AI | Admin, Staff |
| GET | /graph/search | Tìm node graph | Admin, Staff |

### 17.4. Node/Relationship chính

| Loại | Thành phần |
|---|---|
| Node | Medicine, ActiveIngredient, DrugGroup, Symptom, Condition, RedFlag, Interaction, Recommendation |
| Relationship | CONTAINS, BELONGS_TO, INTERACTS_WITH, TREATS_SYMPTOM, CAUTION_WITH, HAS_REDFLAG, HAS_RECOMMENDATION |

### 17.5. Lưu ý triển khai

- Graph có thể triển khai thật bằng Neo4j hoặc mô phỏng bằng JSON mẫu.
- Dữ liệu graph là dữ liệu mẫu cho đồ án.
- Người dùng không truy cập trực tiếp Neo4j; backend kiểm soát query.

---

## 18. Module 13 - Audit Module

### 18.1. Mục tiêu

Audit Module ghi lại các thao tác quan trọng trong hệ thống, đặc biệt là các tác vụ AI nếu có triển khai AI Copilot hoặc Graph-RAG.

### 18.2. Mô tả module

| Mục | Nội dung |
|---|---|
| Tên module | Audit Module |
| Mục tiêu | Lưu log hệ thống và AI |
| Actor | Hệ thống, Admin |
| Chức năng | Log đăng nhập, nhập kho, thanh toán, hóa đơn, AI request/response |
| Input | user_id, action_type, entity_type, entity_id, status, metadata |
| Output | Audit log record |
| Bảng liên quan | audit_logs, ai_logs |
| API | GET /audit-logs, GET /ai/logs |
| Ưu tiên | Medium |
| Loại | MVP/Nâng cao |

### 18.3. Log đề xuất

| Loại log | Mô tả |
|---|---|
| Auth log | Đăng nhập thành công/thất bại nếu cần |
| Stock import log | Tạo hoặc xác nhận phiếu nhập |
| Payment log | Ghi nhận thanh toán |
| Invoice log | Tạo hóa đơn |
| Interaction alert log | Lưu cảnh báo phát sinh nếu cần |
| AI log | Request/response AI, provider, prompt version, status |

### 18.4. API đề xuất

| Method | Endpoint | Mô tả | Actor được phép |
|---|---|---|---|
| GET | /audit-logs | Xem audit log hệ thống | Admin |
| GET | /ai/logs | Xem AI log | Admin |
| GET | /ai/logs/{id} | Xem chi tiết AI log | Admin |

---

## 19. Mapping module với database

| Module | Bảng dữ liệu chính |
|---|---|
| Auth Module | users, roles, user_roles |
| User Module | users, roles, user_roles |
| Medicine Module | medicines, medicine_categories |
| Inventory Module | inventories, stock_imports, stock_import_details, suppliers |
| Customer Module | customers, orders |
| Sales Module | orders, order_details, medicines, inventories |
| Payment Module | payments, orders |
| Invoice Module | invoices, orders, order_details, payments |
| Rule Engine Module | inventories, drug_interactions, interaction_alerts |
| Report Module | orders, order_details, payments, medicines, inventories |
| AI Module | ai_logs, ai_prompt_templates, consultation_sessions, consultation_notes |
| Graph Module | Neo4j node/relationship, medicines mapping nếu cần |
| Audit Module | audit_logs, ai_logs |

---

## 20. Mapping module với actor

| Module | Admin | Nhân viên nhà thuốc | Nhân viên kho | AI System | Neo4j |
|---|---|---|---|---|---|
| Auth Module | Có | Có | Có | Không | Không |
| User Module | Có | Không | Không | Không | Không |
| Medicine Module | Quản lý | Xem/tìm kiếm | Xem/tìm kiếm | Không | Không |
| Inventory Module | Có | Xem | Có | Không | Không |
| Customer Module | Có | Có | Không | Không | Không |
| Sales Module | Có | Có | Không | Không | Không |
| Payment Module | Có | Có | Không | Không | Không |
| Invoice Module | Có | Có | Không | Không | Không |
| Rule Engine Module | Gián tiếp | Gián tiếp | Không | Không | Có thể cung cấp context nếu graph |
| Report Module | Có | Không | Giới hạn | Không | Không |
| AI Module | Có | Có | Không | Có | Có thể nhận context |
| Graph Module | Có | Có | Giới hạn | Không | Có |
| Audit Module | Xem | Không | Không | Ghi log | Không |

---

## 21. Mapping module với Sprint đề xuất

| Sprint | Module ưu tiên | Mục tiêu |
|---|---|---|
| Sprint 1 | Auth, User, Medicine | Nền tảng đăng nhập và dữ liệu thuốc |
| Sprint 2 | Inventory, Stock Import | Nhập kho, tồn kho, cảnh báo kho |
| Sprint 3 | Sales, Payment, Invoice | Luồng bán thuốc hoàn chỉnh |
| Sprint 4 | Rule Engine, Report, Customer | Cảnh báo tương tác và báo cáo cơ bản |
| Sprint 5 | AI, Graph, Audit | Chức năng nâng cao hoặc mock |
| Sprint 6 | Tất cả module | Kiểm thử, fix bug, demo |

---

## 22. Rủi ro thiết kế module

| Rủi ro | Ảnh hưởng | Cách xử lý |
|---|---|---|
| Module Sales ôm quá nhiều logic | Code khó bảo trì | Tách Rule Engine, Payment, Inventory rõ ràng |
| Inventory cập nhật ở nhiều nơi | Dễ sai tồn kho | Chỉ cho Inventory Service cập nhật tồn kho |
| AI phụ thuộc provider thật | Demo lỗi nếu API hỏng | Có MockAI fallback |
| Graph làm quá rộng | Chậm tiến độ MVP | Graph chỉ dùng dữ liệu mẫu nhỏ |
| Không có Audit | Khó truy vết AI | Tối thiểu log AI request/response nếu có AI |
| Phân quyền không rõ module | Người dùng gọi sai chức năng | Dùng Role Guard ở API |
| Database chưa chốt | Module code phải sửa nhiều | Hoàn thiện ERD trước khi code |

---

## 23. Tiêu chí hoàn thành module

Một module được xem là hoàn thành khi:

1. Có API chính hoạt động.
2. Có validation input cơ bản.
3. Có kiểm tra quyền truy cập.
4. Có thao tác database đúng.
5. Có response rõ ràng cho frontend.
6. Có xử lý lỗi cơ bản.
7. Có test case cho luồng chính.
8. Có dữ liệu demo nếu cần.
9. Có thể demo chức năng chính.
10. Tài liệu liên quan được cập nhật.

---

## 24. Kết luận

Tài liệu **Module Design Document** đã mô tả chi tiết các module chính của hệ thống **PharmaAssist AI Intelligence**, bao gồm Auth, User, Medicine, Inventory, Customer, Sales, Payment, Invoice, Rule Engine, Report, AI, Graph và Audit. Mỗi module được xác định rõ mục tiêu, actor, chức năng, input, output, bảng dữ liệu liên quan, API chính, rule nghiệp vụ và các lưu ý triển khai.

Trong MVP, nhóm cần ưu tiên các module cốt lõi như Auth, Medicine, Inventory, Sales, Rule Engine, Payment, Invoice và Report. Các module AI, Graph và Audit có thể triển khai sau hoặc mô phỏng để tăng điểm kỹ thuật cho đồ án. Việc tách module rõ ràng sẽ giúp nhóm dễ chia việc, dễ code, dễ kiểm thử và dễ trình bày trong báo cáo bảo vệ.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

