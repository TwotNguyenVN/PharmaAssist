# 15_UI_UX_SCREEN_SPECIFICATION

**Mã tài liệu:** 15_UI_UX_Screen_Specification  
**Tên tài liệu:** UI/UX Screen Specification  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu đặc tả giao diện và trải nghiệm người dùng  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** UI/UX Designer, Frontend Developer, Backend Developer, Tester, Business Analyst, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **UI/UX Screen Specification** mô tả danh sách màn hình, mục tiêu, actor sử dụng, thành phần chính, dữ liệu hiển thị, hành động người dùng, kết quả mong đợi và các nguyên tắc thiết kế giao diện của hệ thống **PharmaAssist AI Intelligence**.

Trong hệ thống quản lý nhà thuốc, giao diện cần rõ ràng, thao tác nhanh và dễ dùng vì người dùng như nhân viên nhà thuốc hoặc nhân viên kho cần xử lý nghiệp vụ liên tục. Đặc biệt, màn hình bán thuốc tại quầy cần hỗ trợ tìm thuốc nhanh, thêm thuốc vào đơn, kiểm tra tồn kho, hiển thị cảnh báo tương tác thuốc và chuyển sang thanh toán thuận tiện.

Tài liệu này dùng để:

- Xác định các màn hình chính của hệ thống.
- Mô tả mục tiêu của từng màn hình.
- Xác định actor được phép sử dụng từng màn hình.
- Mô tả thành phần UI cần có.
- Mô tả hành động người dùng trên từng màn hình.
- Mô tả dữ liệu cần hiển thị và API liên quan.
- Làm cơ sở thiết kế wireframe trên Figma hoặc vẽ trong báo cáo.
- Làm cơ sở cho frontend developer triển khai giao diện.
- Làm cơ sở cho tester viết test case UI.
- Làm cơ sở chuẩn bị kịch bản demo.

---

## 2. Phạm vi tài liệu

Tài liệu này mô tả các màn hình chính của hệ thống PharmaAssist AI Intelligence, bao gồm:

- Login.
- Dashboard.
- Medicine Management.
- Category Management.
- Inventory.
- Stock Import.
- Sales POS.
- Interaction Alert.
- Payment.
- Invoice.
- Customer.
- Reports.
- AI Copilot.
- Graph Explorer.
- AI Audit Log.
- User Management.
- Profile/User Menu.

Các màn hình thuộc MVP như Login, Medicine Management, Inventory, Stock Import, Sales POS, Interaction Alert, Payment, Invoice và Reports cần được ưu tiên thiết kế trước. Các màn hình AI Copilot, Graph Explorer và AI Audit Log có thể thiết kế ở mức mock nếu chưa triển khai backend đầy đủ.

---

## 3. Nguyên tắc UI/UX chung

| Nguyên tắc | Mô tả |
|---|---|
| Rõ ràng | Giao diện phải dễ hiểu, nhãn nút và tiêu đề dễ đọc |
| Thao tác nhanh | Màn hình bán hàng cần tối ưu tìm kiếm và thêm thuốc nhanh |
| Phân quyền rõ | Người dùng chỉ thấy menu phù hợp với vai trò |
| Cảnh báo nổi bật | Cảnh báo tồn kho và tương tác thuốc phải dễ nhận biết |
| Không nhồi quá nhiều chức năng | Mỗi màn hình nên tập trung vào một nghiệp vụ chính |
| Dữ liệu demo dễ thấy | Dữ liệu mẫu cần đủ rõ để trình bày khi bảo vệ |
| An toàn AI | AI output phải có disclaimer và nút xác nhận trước khi lưu |
| Phản hồi tức thì | Sau mỗi thao tác cần có thông báo thành công/lỗi |
| Dễ kiểm thử | Các trạng thái rỗng, lỗi, loading cần có thiết kế |
| Responsive cơ bản | Giao diện nên hiển thị tốt trên laptop/màn hình demo |

---

## 4. Danh sách màn hình tổng quan

| Màn hình | Actor | Mục tiêu | Độ ưu tiên |
|---|---|---|---|
| Login | Tất cả user nội bộ | Đăng nhập hệ thống | High |
| Dashboard | Admin | Xem tổng quan hoạt động | High |
| User Management | Admin | Quản lý tài khoản và phân quyền | Medium |
| Medicine Management | Admin | Quản lý thuốc | High |
| Category Management | Admin | Quản lý danh mục thuốc | Medium |
| Inventory | Admin, Nhân viên kho, Staff | Xem tồn kho | High |
| Stock Import | Nhân viên kho | Nhập thuốc | High |
| Sales POS | Nhân viên nhà thuốc | Bán thuốc tại quầy | High |
| Interaction Alert | Nhân viên nhà thuốc | Xem cảnh báo tương tác | High |
| Payment | Nhân viên nhà thuốc | Thanh toán | High |
| Invoice | Nhân viên nhà thuốc | In/xem hóa đơn | High |
| Customer | Admin, Staff | Quản lý khách hàng | Medium |
| Reports | Admin | Xem báo cáo | Medium |
| AI Copilot | Staff | Hỗ trợ tư vấn tham khảo | Medium |
| Graph Explorer | Admin, Staff | Xem quan hệ graph | Medium |
| AI Audit Log | Admin | Xem lịch sử AI | Medium |
| Profile/User Menu | Tất cả user nội bộ | Xem profile, đăng xuất | High |

---

## 5. Bố cục tổng thể hệ thống

### 5.1. Layout sau đăng nhập

Giao diện chính sau khi đăng nhập nên gồm:

| Khu vực | Nội dung |
|---|---|
| Sidebar | Menu theo vai trò người dùng |
| Header | Tên hệ thống, thông tin user, nút đăng xuất |
| Main Content | Nội dung màn hình hiện tại |
| Notification Area | Thông báo thành công/lỗi/cảnh báo |
| Modal Area | Modal cảnh báo, xác nhận, form nhanh |

### 5.2. Menu theo vai trò

| Menu | Admin | Staff | Warehouse |
|---|---:|---:|---:|
| Dashboard | Có | Có giới hạn | Có giới hạn |
| User Management | Có | Không | Không |
| Medicine | Có | Xem | Xem |
| Category | Có | Không | Không |
| Inventory | Có | Xem | Có |
| Stock Import | Có | Không | Có |
| Sales POS | Có | Có | Không |
| Customer | Có | Có | Không |
| Reports | Có | Không | Giới hạn nếu có |
| AI Copilot | Có | Có | Không |
| Graph Explorer | Có | Có | Giới hạn nếu có |
| AI Audit Log | Có | Không | Không |

---

## 6. Màn hình Login

### 6.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Login |
| Mục tiêu | Cho phép người dùng nội bộ đăng nhập hệ thống |
| Actor | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| API liên quan | POST /auth/login |
| Độ ưu tiên | High |

### 6.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Logo/Tên hệ thống | PharmaAssist AI Intelligence |
| Ô username | Nhập tên đăng nhập |
| Ô password | Nhập mật khẩu, dạng ẩn |
| Nút đăng nhập | Gửi thông tin đăng nhập |
| Thông báo lỗi | Hiển thị khi đăng nhập sai |
| Gợi ý tài khoản demo | Có thể hiển thị trong môi trường demo |

### 6.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Nhập username/password hợp lệ | Đăng nhập thành công, chuyển dashboard |
| Nhập sai thông tin | Hiển thị lỗi đăng nhập |
| Bỏ trống username/password | Hiển thị lỗi bắt buộc nhập |

### 6.4. Trạng thái giao diện

| Trạng thái | Mô tả |
|---|---|
| Default | Form đăng nhập trống |
| Loading | Nút đăng nhập bị disable, hiển thị đang xử lý |
| Error | Hiển thị thông báo sai tài khoản/mật khẩu |
| Success | Chuyển sang dashboard theo role |

---

## 7. Màn hình Dashboard

### 7.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Dashboard |
| Mục tiêu | Hiển thị tổng quan hoạt động nhà thuốc |
| Actor | Admin, Staff giới hạn, Warehouse giới hạn |
| API liên quan | GET /reports/dashboard, GET /inventory/low-stock, GET /inventory/near-expiry |
| Độ ưu tiên | High |

### 7.2. Thành phần chính cho Admin

| Thành phần | Mô tả |
|---|---|
| Card doanh thu hôm nay | Tổng doanh thu từ đơn đã thanh toán |
| Card số đơn hàng | Số đơn đã tạo/thanh toán |
| Card thuốc sắp hết | Số lượng thuốc dưới ngưỡng tồn |
| Card thuốc gần hết hạn | Số lượng thuốc gần hết hạn |
| Bảng thuốc bán chạy | Top thuốc theo số lượng bán |
| Biểu đồ doanh thu | Doanh thu theo ngày/tháng |
| Danh sách cảnh báo | Thuốc sắp hết/gần hết hạn |

### 7.3. Thành phần cho Staff

| Thành phần | Mô tả |
|---|---|
| Lối tắt Sales POS | Nút mở nhanh màn hình bán hàng |
| Cảnh báo tồn kho cần biết | Danh sách thuốc sắp hết để tránh bán nhầm |
| Đơn gần đây | Các đơn do nhân viên xử lý nếu cần |

### 7.4. Thành phần cho Warehouse

| Thành phần | Mô tả |
|---|---|
| Thuốc sắp hết | Danh sách cần nhập thêm |
| Thuốc gần hết hạn | Danh sách cần xử lý sớm |
| Phiếu nhập gần đây | Lịch sử nhập thuốc gần nhất |

---

## 8. Màn hình User Management

### 8.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | User Management |
| Mục tiêu | Quản lý tài khoản và vai trò người dùng |
| Actor | Admin |
| API liên quan | GET /users, POST /users, PUT /users/{id}, PATCH /users/{id}/status |
| Độ ưu tiên | Medium |

### 8.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Bảng user | Hiển thị họ tên, username, role, status |
| Bộ lọc role | Lọc theo Admin/Staff/Warehouse |
| Tìm kiếm user | Tìm theo tên hoặc username |
| Nút thêm user | Mở form tạo user |
| Nút sửa | Cập nhật thông tin user |
| Nút khóa/mở | Thay đổi trạng thái tài khoản |

### 8.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Tạo user | User mới được tạo |
| Gán role | User có quyền tương ứng |
| Khóa tài khoản | User không thể đăng nhập |
| Mở khóa tài khoản | User có thể đăng nhập lại |

---

## 9. Màn hình Medicine Management

### 9.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Medicine Management |
| Mục tiêu | Quản lý thông tin thuốc |
| Actor | Admin; Staff/Warehouse xem nếu được quyền |
| API liên quan | GET /medicines, POST /medicines, PUT /medicines/{id}, DELETE /medicines/{id} |
| Độ ưu tiên | High |

### 9.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Ô tìm kiếm | Tìm theo tên thuốc hoặc mã thuốc |
| Bộ lọc danh mục | Lọc thuốc theo category |
| Bộ lọc trạng thái | Active/Inactive |
| Bảng thuốc | Mã thuốc, tên thuốc, danh mục, đơn vị, giá bán, trạng thái |
| Nút thêm thuốc | Admin mở form thêm thuốc |
| Nút sửa thuốc | Admin chỉnh sửa thuốc |
| Nút xóa/ẩn thuốc | Admin chuyển thuốc sang inactive |

### 9.3. Form thêm/sửa thuốc

| Field | Kiểu nhập | Bắt buộc | Ghi chú |
|---|---|---|---|
| Mã thuốc | Text | Có | Không được trùng |
| Tên thuốc | Text | Có | Tên hiển thị |
| Danh mục | Select | Có | Lấy từ medicine_categories |
| Đơn vị | Select/Text | Có | Hộp, viên, chai, tuýp... |
| Giá bán | Number | Có | >= 0 |
| Mô tả | Textarea | Không | Dữ liệu mẫu |
| Trạng thái | Select | Có | Active/Inactive |

### 9.4. Trạng thái lỗi

| Lỗi | Thông báo gợi ý |
|---|---|
| Mã thuốc trùng | Mã thuốc đã tồn tại |
| Giá bán âm | Giá bán phải lớn hơn hoặc bằng 0 |
| Thiếu tên thuốc | Vui lòng nhập tên thuốc |
| Không đủ quyền | Bạn không có quyền thực hiện thao tác này |

---

## 10. Màn hình Category Management

### 10.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Category Management |
| Mục tiêu | Quản lý danh mục thuốc |
| Actor | Admin |
| API liên quan | GET /categories, POST /categories, PUT /categories/{id}, DELETE /categories/{id} |
| Độ ưu tiên | Medium |

### 10.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Bảng danh mục | Tên, mô tả, trạng thái |
| Nút thêm danh mục | Mở form tạo danh mục |
| Nút sửa | Cập nhật danh mục |
| Nút xóa/ẩn | Ẩn danh mục nếu không dùng |

### 10.3. Lưu ý

- Không xóa cứng danh mục đang có thuốc.
- Có thể dùng status inactive.

---

## 11. Màn hình Inventory

### 11.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Inventory |
| Mục tiêu | Xem tồn kho, thuốc sắp hết, thuốc gần hết hạn |
| Actor | Admin, Nhân viên kho, Staff xem giới hạn |
| API liên quan | GET /inventories, GET /inventory/low-stock, GET /inventory/near-expiry |
| Độ ưu tiên | High |

### 11.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Ô tìm kiếm thuốc | Tìm theo tên/mã thuốc |
| Bộ lọc trạng thái | Tất cả, sắp hết, gần hết hạn |
| Bảng tồn kho | Tên thuốc, số lượng, min stock, hạn dùng, trạng thái cảnh báo |
| Badge cảnh báo | Low stock, Near expiry |
| Nút xem chi tiết | Xem lịch sử nhập/bán nếu có |
| Nút nhập thuốc nhanh | Warehouse/Admin chuyển đến Stock Import |

### 11.3. Dữ liệu hiển thị

| Cột | Mô tả |
|---|---|
| Mã thuốc | medicine.code |
| Tên thuốc | medicine.name |
| Số lượng tồn | inventory.quantity |
| Ngưỡng tối thiểu | inventory.min_stock |
| Hạn dùng | inventory.expiry_date |
| Trạng thái | Bình thường / Sắp hết / Gần hết hạn |

### 11.4. Trạng thái cảnh báo

| Điều kiện | Hiển thị |
|---|---|
| quantity <= min_stock | Cảnh báo sắp hết |
| expiry_date còn trong X ngày | Cảnh báo gần hết hạn |
| Cả hai điều kiện | Hiển thị cả hai cảnh báo |

---

## 12. Màn hình Stock Import

### 12.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Stock Import |
| Mục tiêu | Tạo phiếu nhập thuốc và cập nhật tồn kho |
| Actor | Nhân viên kho, Admin |
| API liên quan | POST /stock-imports, GET /stock-imports, POST /stock-imports/{id}/confirm |
| Độ ưu tiên | High |

### 12.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Chọn nhà cung cấp | Select supplier |
| Ngày nhập | Date picker |
| Ô tìm thuốc | Tìm thuốc để thêm vào phiếu nhập |
| Bảng chi tiết nhập | Thuốc, số lượng, giá nhập, hạn dùng, số lô |
| Nút thêm dòng | Thêm thuốc vào phiếu |
| Nút lưu nháp | Lưu phiếu chưa xác nhận |
| Nút xác nhận nhập | Cập nhật tồn kho |
| Lịch sử nhập | Danh sách phiếu nhập gần đây |

### 12.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Thêm thuốc vào phiếu nhập | Thuốc xuất hiện trong bảng chi tiết |
| Nhập số lượng > 0 | Dòng nhập hợp lệ |
| Xác nhận phiếu nhập | Tồn kho tăng |
| Hủy phiếu nháp | Phiếu không cập nhật tồn kho |

### 12.4. Lỗi cần xử lý

| Lỗi | Thông báo gợi ý |
|---|---|
| Phiếu không có thuốc | Vui lòng thêm ít nhất một thuốc |
| Số lượng <= 0 | Số lượng nhập phải lớn hơn 0 |
| Thiếu hạn dùng nếu bắt buộc | Vui lòng nhập hạn dùng |
| Sai quyền | Bạn không có quyền nhập thuốc |

---

## 13. Màn hình Sales POS

### 13.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Sales POS |
| Mục tiêu | Tạo đơn bán thuốc tại quầy |
| Actor | Nhân viên nhà thuốc, Admin |
| API liên quan | POST /orders, POST /orders/{id}/items, POST /orders/{id}/check-interactions, POST /orders/{id}/pay |
| Độ ưu tiên | High |

### 13.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Ô tìm thuốc | Tìm theo tên/mã thuốc |
| Danh sách kết quả thuốc | Hiển thị thuốc phù hợp, giá bán, tồn kho |
| Giỏ hàng/đơn hàng | Danh sách thuốc đã thêm vào đơn |
| Ô nhập số lượng | Nhập số lượng cần bán |
| Tổng tiền | Tổng giá trị đơn hàng |
| Khu vực cảnh báo | Hiển thị cảnh báo tồn kho/tương tác thuốc |
| Chọn khách hàng | Tìm hoặc tạo khách hàng |
| Nút kiểm tra tương tác | Kiểm tra thủ công nếu cần |
| Nút thanh toán | Chuyển sang payment |
| Nút hủy đơn | Hủy đơn nháp |

### 13.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Tìm thuốc | Hiển thị danh sách thuốc phù hợp |
| Thêm thuốc vào đơn | Hệ thống kiểm tra tồn kho và thêm vào giỏ |
| Thay đổi số lượng | Cập nhật thành tiền và kiểm tra tồn kho |
| Xóa thuốc khỏi đơn | Thuốc bị xóa khỏi giỏ, tổng tiền cập nhật |
| Thêm từ 2 thuốc trở lên | Hệ thống kiểm tra tương tác |
| Xem cảnh báo | Modal hoặc panel cảnh báo hiển thị |
| Chọn khách hàng | Gắn khách hàng vào đơn |
| Bấm thanh toán | Chuyển đến màn hình Payment |

### 13.4. Kết quả mong đợi

- Đơn hàng được tạo.
- Tồn kho được kiểm tra trước khi thêm thuốc hoặc thanh toán.
- Cảnh báo tương tác được hiển thị nếu có dữ liệu mẫu phù hợp.
- Tổng tiền được tính đúng.
- Người dùng có thể chuyển sang thanh toán.

### 13.5. Bố cục gợi ý

```text
+--------------------------------------------------------------+
| Sales POS                                                    |
+-----------------------------+--------------------------------+
| Tìm thuốc                   | Giỏ hàng / Đơn hàng             |
| [Search input]              | Thuốc | SL | Giá | Thành tiền   |
|                             |                                |
| Kết quả tìm kiếm thuốc      | Tổng tiền: xxx                 |
| - Thuốc A | Giá | Tồn      | [Kiểm tra tương tác]            |
| - Thuốc B | Giá | Tồn      | [Thanh toán]                    |
+-----------------------------+--------------------------------+
| Cảnh báo tương tác / tồn kho nếu có                          |
+--------------------------------------------------------------+
```

---

## 14. Interaction Alert Modal

### 14.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Interaction Alert Modal |
| Mục tiêu | Hiển thị cảnh báo tương tác thuốc |
| Actor | Nhân viên nhà thuốc, Admin |
| API liên quan | POST /interactions/check, POST /orders/{id}/check-interactions |
| Độ ưu tiên | High |

### 14.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Tiêu đề cảnh báo | “Cảnh báo tương tác thuốc” |
| Tên thuốc A | Thuốc thứ nhất |
| Tên thuốc B | Thuốc thứ hai |
| Mức độ | LOW/MEDIUM/HIGH hoặc Nhẹ/Trung bình/Cao |
| Mô tả | Mô tả nguy cơ mẫu |
| Khuyến nghị | Khuyến nghị xử lý mẫu |
| Ghi chú tư vấn | Ô nhập ghi chú của nhân viên |
| Checkbox xác nhận | “Đã xem cảnh báo” hoặc “Đã ghi chú tư vấn” |
| Nút đóng | Đóng modal |
| Nút lưu ghi chú | Lưu ghi chú tư vấn |
| Disclaimer | Bắt buộc hiển thị |

### 14.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Đọc cảnh báo | Người dùng nắm được thông tin cảnh báo mẫu |
| Nhập ghi chú | Ghi chú được lưu vào đơn/cảnh báo |
| Xác nhận đã xem | Hệ thống ghi nhận người dùng đã xem cảnh báo nếu có |
| Đóng modal | Quay lại Sales POS |

### 14.4. Ghi chú an toàn

Modal này bắt buộc hiển thị câu:

> **Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 15. Màn hình Payment

### 15.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Payment |
| Mục tiêu | Ghi nhận thanh toán đơn hàng |
| Actor | Nhân viên nhà thuốc, Admin |
| API liên quan | POST /orders/{id}/pay, POST /payments |
| Độ ưu tiên | High |

### 15.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Tóm tắt đơn hàng | Mã đơn, danh sách thuốc, tổng tiền |
| Khách hàng | Thông tin khách nếu có |
| Phương thức thanh toán | Tiền mặt, chuyển khoản mô phỏng |
| Số tiền khách trả | Input nếu cần |
| Tiền thừa | Tính nếu thanh toán tiền mặt |
| Cảnh báo còn tồn tại | Hiển thị nếu có tương tác chưa xác nhận |
| Nút xác nhận thanh toán | Hoàn tất thanh toán |
| Nút quay lại | Quay lại Sales POS |

### 15.3. Business rules UI cần thể hiện

| Rule | Cách thể hiện trên UI |
|---|---|
| Đơn hàng phải có ít nhất một thuốc | Disable nút thanh toán nếu giỏ rỗng |
| Không bán vượt tồn | Hiển thị lỗi và không cho thanh toán |
| Thanh toán thành công mới trừ kho | Sau xác nhận mới cập nhật trạng thái đơn |
| Hóa đơn tạo sau thanh toán | Sau thanh toán chuyển sang Invoice |

---

## 16. Màn hình Invoice

### 16.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Invoice |
| Mục tiêu | Hiển thị và in hóa đơn |
| Actor | Nhân viên nhà thuốc, Admin, Khách hàng nhận hóa đơn |
| API liên quan | GET /orders/{id}/invoice, GET /invoices/{id} |
| Độ ưu tiên | High |

### 16.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Tên nhà thuốc | PharmaAssist Demo Pharmacy |
| Mã hóa đơn | invoice_code |
| Ngày tạo | issued_at |
| Nhân viên bán | staff_name |
| Khách hàng | customer_name/phone nếu có |
| Danh sách thuốc | Tên, số lượng, đơn giá, thành tiền |
| Tổng tiền | total_amount |
| Phương thức thanh toán | Cash/Bank transfer mock |
| Nút in | Gọi chức năng in trình duyệt |
| Nút quay lại | Quay lại Sales POS hoặc danh sách đơn |

### 16.3. Bố cục gợi ý

```text
PHARMAASSIST DEMO PHARMACY
HÓA ĐƠN BÁN HÀNG
Mã hóa đơn: INV-0001
Ngày: ...
Nhân viên: ...
Khách hàng: ...

STT | Tên thuốc | SL | Đơn giá | Thành tiền
1   | Thuốc A   | 2  | 50.000  | 100.000

Tổng tiền: 100.000
Phương thức: Tiền mặt
```

---

## 17. Màn hình Customer

### 17.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Customer |
| Mục tiêu | Quản lý thông tin khách hàng cơ bản |
| Actor | Admin, Staff |
| API liên quan | GET /customers, POST /customers, PUT /customers/{id}, GET /customers/{id}/orders |
| Độ ưu tiên | Medium |

### 17.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Ô tìm kiếm | Tìm theo tên hoặc số điện thoại |
| Bảng khách hàng | Tên, số điện thoại, ghi chú, ngày tạo |
| Nút thêm khách hàng | Mở form tạo khách hàng |
| Nút sửa | Cập nhật thông tin cơ bản |
| Nút xem lịch sử | Xem các đơn đã mua |

### 17.3. Lưu ý dữ liệu

- Không dùng thông tin khách hàng thật trong demo.
- Không lưu thông tin nhạy cảm không cần thiết.

---

## 18. Màn hình Reports

### 18.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Reports |
| Mục tiêu | Xem báo cáo doanh thu, thuốc bán chạy, tồn kho |
| Actor | Admin |
| API liên quan | GET /reports/revenue, GET /reports/top-medicines, GET /reports/inventory |
| Độ ưu tiên | Medium |

### 18.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Bộ lọc thời gian | fromDate, toDate, groupBy |
| Card tổng doanh thu | Tổng doanh thu đơn đã thanh toán |
| Card số đơn | Tổng số đơn đã thanh toán |
| Biểu đồ doanh thu | Doanh thu theo ngày/tháng |
| Bảng thuốc bán chạy | Top thuốc theo số lượng bán |
| Bảng tồn kho thấp | Thuốc dưới min stock |
| Bảng gần hết hạn | Thuốc gần hết hạn |

### 18.3. Business rules UI cần thể hiện

- Doanh thu chỉ tính đơn đã thanh toán.
- Chỉ Admin xem báo cáo doanh thu tổng hợp.
- Warehouse nếu có quyền chỉ xem báo cáo tồn kho, không xem doanh thu.

---

## 19. Màn hình AI Copilot

### 19.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | AI Copilot |
| Mục tiêu | Hỗ trợ tư vấn tham khảo bằng AI |
| Actor | Staff, Admin |
| API liên quan | POST /ai/consultation/questions, POST /ai/consultation/note, POST /ai/explain-alert |
| Độ ưu tiên | Medium |
| Loại | Advanced/Mocked |

### 19.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Context input | Nhập thông tin tư vấn hoặc chọn đơn/cảnh báo |
| Nút tạo câu hỏi | AI tạo câu hỏi bổ sung |
| Nút tạo ghi chú | AI tạo ghi chú tư vấn nháp |
| Khu vực kết quả AI | Hiển thị output AI |
| Nút chỉnh sửa | Cho phép nhân viên sửa output |
| Nút xác nhận lưu | Chỉ lưu khi người dùng xác nhận |
| Disclaimer | Bắt buộc hiển thị |

### 19.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Nhập context | Hệ thống nhận dữ liệu đầu vào |
| Bấm tạo câu hỏi | AI/MockAI trả danh sách câu hỏi tham khảo |
| Bấm tạo ghi chú | AI/MockAI tạo ghi chú nháp |
| Chỉnh sửa output | Người dùng chỉnh nội dung trước khi lưu |
| Xác nhận lưu | Nội dung được lưu vào ConsultationNote |
| Hủy | Không lưu output AI |

### 19.4. Nguyên tắc an toàn UI

- AI output không tự động lưu.
- Phải có nút xác nhận.
- Phải có disclaimer.
- Không hiển thị nội dung AI như kết luận y tế.
- Nếu output bị guardrail chặn, hiển thị thông báo an toàn.

---

## 20. Màn hình Graph Explorer

### 20.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Graph Explorer |
| Mục tiêu | Xem quan hệ thuốc, hoạt chất, tương tác dưới dạng graph |
| Actor | Admin, Staff |
| API liên quan | GET /graph/medicine/{id}, POST /graph/interactions/query |
| Độ ưu tiên | Medium |
| Loại | Advanced/Mocked |

### 20.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Ô tìm thuốc | Chọn thuốc cần xem graph |
| Khu vực graph | Hiển thị node và relationship |
| Panel chi tiết node | Hiển thị thông tin node được chọn |
| Bộ lọc relationship | CONTAINS, INTERACTS_WITH, BELONGS_TO... |
| Nút truy vấn tương tác | Kiểm tra quan hệ tương tác trong graph |
| Disclaimer | Dữ liệu graph là dữ liệu mẫu |

### 20.3. Dữ liệu hiển thị

| Thành phần graph | Ví dụ |
|---|---|
| Node Medicine | Thuốc mẫu A |
| Node ActiveIngredient | Hoạt chất mẫu X |
| Node Interaction | Tương tác mẫu |
| Relationship CONTAINS | Thuốc chứa hoạt chất |
| Relationship INTERACTS_WITH | Thuốc tương tác với thuốc khác |

---

## 21. Màn hình AI Audit Log

### 21.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | AI Audit Log |
| Mục tiêu | Xem lịch sử request/response AI |
| Actor | Admin |
| API liên quan | GET /ai/logs, GET /ai/logs/{id} |
| Độ ưu tiên | Medium |
| Loại | Advanced |

### 21.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Bảng log AI | action_type, provider, status, created_at |
| Bộ lọc status | SUCCESS, FAILED, BLOCKED |
| Bộ lọc action type | Generate question, note, explain alert |
| Chi tiết log | Input summary, output summary, guardrail result |
| Nút xem chi tiết | Mở modal chi tiết log |

### 21.3. Lưu ý bảo mật

- Chỉ Admin được xem.
- Không hiển thị API key hoặc secret.
- Không lưu hoặc hiển thị dữ liệu nhạy cảm không cần thiết.

---

## 22. Màn hình Profile/User Menu

### 22.1. Mô tả màn hình

| Mục | Nội dung |
|---|---|
| Tên màn hình | Profile/User Menu |
| Mục tiêu | Hiển thị thông tin user và thao tác đăng xuất |
| Actor | Tất cả user nội bộ |
| API liên quan | GET /auth/me, POST /auth/logout |
| Độ ưu tiên | High |

### 22.2. Thành phần chính

| Thành phần | Mô tả |
|---|---|
| Tên user | full_name |
| Vai trò | role hiện tại |
| Nút profile | Xem thông tin cá nhân |
| Nút đăng xuất | Thoát hệ thống |

---

## 23. Quy tắc hiển thị cảnh báo

| Loại cảnh báo | Vị trí | Cách hiển thị |
|---|---|---|
| Đăng nhập sai | Login | Alert message dưới form |
| Không đủ quyền | Toàn hệ thống | Toast hoặc trang 403 |
| Thuốc sắp hết | Dashboard/Inventory/Sales POS | Badge hoặc warning panel |
| Thuốc gần hết hạn | Dashboard/Inventory | Badge hoặc warning panel |
| Bán vượt tồn | Sales POS | Error message nổi bật |
| Tương tác thuốc | Sales POS/Modal | Modal hoặc panel cảnh báo nổi bật |
| AI bị chặn | AI Copilot | Safe error message |
| Lưu thành công | Toàn hệ thống | Success toast |

---

## 24. Trạng thái UI cần thiết kế

| Trạng thái | Mô tả | Ví dụ |
|---|---|---|
| Loading | Đang gọi API | Spinner khi tải danh sách thuốc |
| Empty | Không có dữ liệu | Không có thuốc phù hợp |
| Error | Gọi API lỗi hoặc validation lỗi | Không đủ tồn kho |
| Success | Thao tác thành công | Tạo đơn thành công |
| Disabled | Không được thao tác | Nút thanh toán khi giỏ rỗng |
| Warning | Có cảnh báo nghiệp vụ | Tương tác thuốc mức cao |
| Confirm | Cần xác nhận | Xác nhận thanh toán, xác nhận lưu AI note |

---

## 25. Mapping màn hình với API

| Màn hình | API chính |
|---|---|
| Login | POST /auth/login |
| Dashboard | GET /reports/dashboard, GET /inventory/low-stock, GET /inventory/near-expiry |
| User Management | GET/POST/PUT /users |
| Medicine Management | GET/POST/PUT/DELETE /medicines |
| Category Management | GET/POST/PUT/DELETE /categories |
| Inventory | GET /inventories, GET /inventory/low-stock, GET /inventory/near-expiry |
| Stock Import | POST /stock-imports, POST /stock-imports/{id}/confirm |
| Sales POS | POST /orders, POST /orders/{id}/items, POST /orders/{id}/check-interactions |
| Interaction Alert | POST /interactions/check |
| Payment | POST /orders/{id}/pay, POST /payments |
| Invoice | GET /orders/{id}/invoice |
| Customer | GET/POST/PUT /customers |
| Reports | GET /reports/revenue, GET /reports/top-medicines |
| AI Copilot | POST /ai/consultation/questions, POST /ai/consultation/note |
| Graph Explorer | GET /graph/medicine/{id}, POST /graph/interactions/query |
| AI Audit Log | GET /ai/logs |

---

## 26. Mapping màn hình với test case UI

| Màn hình | Test case gợi ý |
|---|---|
| Login | TC-UI-LOGIN-01 |
| Dashboard | TC-UI-DASH-01 |
| Medicine Management | TC-UI-MED-01 |
| Inventory | TC-UI-INV-01 |
| Stock Import | TC-UI-STOCK-01 |
| Sales POS | TC-UI-SALES-01 |
| Interaction Alert | TC-UI-INT-01 |
| Payment | TC-UI-PAY-01 |
| Invoice | TC-UI-INVC-01 |
| Customer | TC-UI-CUS-01 |
| Reports | TC-UI-REP-01 |
| AI Copilot | TC-UI-AI-01 |
| Graph Explorer | TC-UI-GRAPH-01 |
| AI Audit Log | TC-UI-AILOG-01 |

---

## 27. Rủi ro UI/UX và cách xử lý

| Rủi ro | Tác động | Cách xử lý |
|---|---|---|
| Sales POS quá rối | Người demo thao tác chậm | Tách rõ khu tìm thuốc và giỏ hàng |
| Cảnh báo tương tác không nổi bật | Mất điểm nhấn đề tài | Dùng modal/panel nổi bật và severity rõ |
| AI output bị hiểu nhầm là tư vấn y tế | Rủi ro an toàn | Hiển thị disclaimer và nút xác nhận |
| Menu không theo role | Người dùng thấy sai chức năng | Áp dụng role-based sidebar |
| Thiếu trạng thái loading/error | Demo dễ gây hiểu nhầm khi API chậm/lỗi | Thiết kế loading/error/empty state |
| Giao diện quá nhiều dữ liệu thật | Rủi ro quyền riêng tư | Chỉ dùng dữ liệu demo giả lập |

---

## 28. Checklist hoàn thành UI/UX

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Có màn hình Login chưa? |  |
| Sidebar có hiển thị theo role chưa? |  |
| Sales POS có tìm thuốc nhanh chưa? |  |
| Sales POS có giỏ hàng và tổng tiền chưa? |  |
| Có kiểm tra tồn kho khi thêm thuốc chưa? |  |
| Có modal/panel cảnh báo tương tác chưa? |  |
| Cảnh báo có hiển thị tên thuốc A/B, severity, mô tả, khuyến nghị chưa? |  |
| Cảnh báo có disclaimer chưa? |  |
| Payment có xác nhận thanh toán chưa? |  |
| Invoice có hiển thị đầy đủ thông tin đơn hàng chưa? |  |
| Inventory có cảnh báo sắp hết/gần hết hạn chưa? |  |
| AI output có nút xác nhận trước khi lưu chưa? |  |
| AI/Cảnh báo có disclaimer chưa? |  |
| Có trạng thái loading/error/empty chưa? |  |
| Giao diện có dữ liệu demo dễ trình bày chưa? |  |

---

## 29. Kết luận

Tài liệu **UI/UX Screen Specification** đã mô tả các màn hình chính của hệ thống **PharmaAssist AI Intelligence**, bao gồm mục tiêu, actor, thành phần giao diện, hành động người dùng, kết quả mong đợi, API liên quan và các nguyên tắc thiết kế UI/UX.

Trong MVP, nhóm cần ưu tiên các màn hình Login, Medicine Management, Inventory, Stock Import, Sales POS, Interaction Alert, Payment, Invoice và Reports. Trong đó, **Sales POS** và **Interaction Alert Modal** là hai màn hình quan trọng nhất khi demo vì thể hiện rõ nghiệp vụ bán thuốc và điểm nổi bật cảnh báo tương tác thuốc.

Các màn hình AI Copilot, Graph Explorer và AI Audit Log có thể được triển khai ở mức mock hoặc nâng cao, nhưng nếu có hiển thị AI/cảnh báo thì bắt buộc phải có disclaimer và cơ chế xác nhận của người dùng trước khi lưu nội dung AI.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

