Tiếp theo là **Sprint Backlog hoàn chỉnh** cho dự án PharmaAssist. Bảng này dùng để đưa vào báo cáo hoặc nhập/đối chiếu trong Jira sau khi đã có **Epic, Story, Task**.

# Sprint Backlog tổng quan

| **Sprint** | **Thời gian** | **Mục tiêu Sprint** | **Epic liên quan** | **Story chính** | **Task chính** | **Sản phẩm đầu ra** |
| --- | --- | --- | --- | --- | --- | --- |
| Sprint 1 | 22/05/2026 - 26/05/2026 | Xây dựng nền tảng đăng nhập, đăng xuất và phân quyền | EPIC-01, EPIC-12 | US-01, US-02, US-03 | T-01 → T-08 | Login, Logout, RBAC cơ bản |
| Sprint 2 | 27/05/2026 - 31/05/2026 | Hoàn thành quản lý người dùng, thuốc và danh mục thuốc | EPIC-02, EPIC-03 | US-04 → US-09 | T-09 → T-25 | User Management, Medicine CRUD, Category Management |
| Sprint 3 | 01/06/2026 - 09/06/2026 | Hoàn thành tồn kho, nhập thuốc, khách hàng và bán thuốc cơ bản | EPIC-04, EPIC-05, EPIC-06, EPIC-07 | US-10 → US-15, US-17, US-18 | T-26 → T-42, T-45 → T-50 | Inventory, Stock Import, Customer, Sales POS cơ bản |
| Sprint 4 | 10/06/2026 - 13/06/2026 | Hoàn thành kiểm tra tồn kho khi bán, cảnh báo tương tác thuốc, thanh toán và hóa đơn | EPIC-06, EPIC-07, EPIC-08, EPIC-09 | US-16, US-19 → US-24 | T-43, T-44, T-51 → T-68 | Interaction Alert, Payment, Invoice |
| Sprint 5 | 14/06/2026 - 17/06/2026 | Hoàn thành báo cáo, kiểm thử, dữ liệu demo, tài liệu và chuẩn bị bảo vệ | EPIC-10, EPIC-11, EPIC-12 | US-25 → US-30 | T-69 → T-78 | Dashboard, Reports, Test Case, README, Slide, Demo Script |

# Sprint 1 Backlog

## Sprint 1 - Auth & Project Setup

| **Field** | **Nội dung** |
| --- | --- |
| Sprint name | Sprint 1 - Auth & Project Setup |
| Start date | 22/05/2026 |
| End date | 26/05/2026 |
| Sprint Goal | Hoàn thành chức năng đăng nhập, đăng xuất, phân quyền cơ bản và chuẩn bị nền tảng truy cập hệ thống PharmaAssist. |

| **Story/Task Key** | **Issue Type** | **Summary** | **Parent / Linked Epic** | **Component** | **Priority** | **Story Point** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-01 | Story | US-01 - Đăng nhập hệ thống | EPIC-01 | Authentication | High | 3 | To Do |
| T-01 | Task | T-01 - Thiết kế giao diện màn hình đăng nhập | US-01 | Frontend | High | - | To Do |
| T-02 | Task | T-02 - Tạo API đăng nhập và trả về access token | US-01 | Backend | High | - | To Do |
| T-03 | Task | T-03 - Thiết kế bảng users và roles phục vụ đăng nhập | US-01 | Database | High | - | To Do |
| T-04 | Task | T-04 - Validate form đăng nhập và hiển thị lỗi | US-01 | Frontend | High | - | To Do |
| US-02 | Story | US-02 - Đăng xuất hệ thống | EPIC-01 | Authentication | Medium | 2 | To Do |
| T-05 | Task | T-05 - Tạo chức năng đăng xuất và xóa token/session | US-02 | Authentication | Medium | - | To Do |
| US-03 | Story | US-03 - Phân quyền theo vai trò | EPIC-01 | Authentication | High | 5 | To Do |
| T-06 | Task | T-06 - Tạo middleware/guard kiểm tra quyền truy cập API | US-03 | Backend | High | - | To Do |
| T-07 | Task | T-07 - Ẩn/hiện menu sidebar theo vai trò người dùng | US-03 | Frontend | High | - | To Do |
| T-08 | Task | T-08 - Viết test case cho đăng nhập, đăng xuất và phân quyền | US-03 | Testing | High | - | To Do |

**Tổng Story Point Sprint 1:** 10
**Kết quả mong đợi:** người dùng có thể đăng nhập, đăng xuất và hệ thống nhận biết vai trò người dùng.

# Sprint 2 Backlog

## Sprint 2 - User & Medicine Management

| **Field** | **Nội dung** |
| --- | --- |
| Sprint name | Sprint 2 - User & Medicine Management |
| Start date | 27/05/2026 |
| End date | 31/05/2026 |
| Sprint Goal | Hoàn thành chức năng quản lý tài khoản người dùng, quản lý thuốc và danh mục thuốc. |

| **Story/Task Key** | **Issue Type** | **Summary** | **Parent / Linked Epic** | **Component** | **Priority** | **Story Point** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-04 | Story | US-04 - Tạo tài khoản nhân viên | EPIC-02 | Admin Management | High | 3 | To Do |
| T-09 | Task | T-09 - Thiết kế màn hình danh sách người dùng | US-04 | Frontend | High | - | To Do |
| T-10 | Task | T-10 - Tạo form thêm tài khoản nhân viên | US-04 | Frontend | High | - | To Do |
| T-11 | Task | T-11 - Tạo API thêm tài khoản người dùng | US-04 | Backend | High | - | To Do |
| T-12 | Task | T-12 - Validate username/email không được trùng | US-04 | Backend | High | - | To Do |
| US-05 | Story | US-05 - Cập nhật vai trò và trạng thái tài khoản | EPIC-02 | Admin Management | High | 3 | To Do |
| T-13 | Task | T-13 - Tạo API cập nhật vai trò và trạng thái tài khoản | US-05 | Backend | High | - | To Do |
| T-14 | Task | T-14 - Thiết kế chức năng khóa/mở tài khoản trên UI | US-05 | Frontend | Medium | - | To Do |
| US-06 | Story | US-06 - Thêm thuốc mới | EPIC-03 | Medicine Management | High | 5 | To Do |
| T-15 | Task | T-15 - Thiết kế bảng medicines và medicine\_categories | US-06 | Database | High | - | To Do |
| T-16 | Task | T-16 - Tạo API thêm thuốc mới | US-06 | Backend | High | - | To Do |
| T-17 | Task | T-17 - Thiết kế form thêm thuốc mới | US-06 | Frontend | High | - | To Do |
| T-18 | Task | T-18 - Validate dữ liệu thuốc bắt buộc và giá bán hợp lệ | US-06 | Backend | High | - | To Do |
| US-07 | Story | US-07 - Tìm kiếm và lọc thuốc | EPIC-03 | Medicine Management | High | 3 | To Do |
| T-19 | Task | T-19 - Tạo API danh sách thuốc có tìm kiếm, lọc và phân trang | US-07 | Backend | High | - | To Do |
| T-20 | Task | T-20 - Thiết kế màn hình danh sách thuốc | US-07 | Frontend | High | - | To Do |
| T-21 | Task | T-21 - Thêm chức năng tìm kiếm thuốc theo tên hoặc mã thuốc | US-07 | Frontend | High | - | To Do |
| US-08 | Story | US-08 - Cập nhật thông tin thuốc | EPIC-03 | Medicine Management | High | 3 | To Do |
| T-22 | Task | T-22 - Tạo API cập nhật thông tin thuốc | US-08 | Backend | High | - | To Do |
| T-23 | Task | T-23 - Thiết kế form chỉnh sửa thông tin thuốc | US-08 | Frontend | High | - | To Do |
| US-09 | Story | US-09 - Quản lý danh mục thuốc | EPIC-03 | Medicine Management | Medium | 3 | To Do |
| T-24 | Task | T-24 - Tạo API quản lý danh mục thuốc | US-09 | Backend | Medium | - | To Do |
| T-25 | Task | T-25 - Thiết kế màn hình quản lý danh mục thuốc | US-09 | Frontend | Medium | - | To Do |

**Tổng Story Point Sprint 2:** 20
**Kết quả mong đợi:** Admin quản lý được tài khoản, thuốc và danh mục thuốc; dữ liệu thuốc sẵn sàng cho tồn kho và bán hàng.

# Sprint 3 Backlog

## Sprint 3 - Inventory, Import & Sales POS

| **Field** | **Nội dung** |
| --- | --- |
| Sprint name | Sprint 3 - Inventory, Import & Sales POS |
| Start date | 01/06/2026 |
| End date | 09/06/2026 |
| Sprint Goal | Hoàn thành quản lý tồn kho, nhập thuốc, khách hàng và bán thuốc tại quầy ở mức cơ bản. |

| **Story/Task Key** | **Issue Type** | **Summary** | **Parent / Linked Epic** | **Component** | **Priority** | **Story Point** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-10 | Story | US-10 - Xem danh sách tồn kho | EPIC-04 | Inventory Management | High | 3 | To Do |
| T-26 | Task | T-26 - Thiết kế bảng inventory hoặc stock\_batches | US-10 | Database | High | - | To Do |
| T-27 | Task | T-27 - Tạo API xem danh sách tồn kho | US-10 | Backend | High | - | To Do |
| T-28 | Task | T-28 - Thiết kế màn hình tồn kho | US-10 | Frontend | High | - | To Do |
| T-29 | Task | T-29 - Thêm tìm kiếm và lọc trạng thái tồn kho | US-10 | Frontend | Medium | - | To Do |
| US-11 | Story | US-11 - Cảnh báo thuốc sắp hết | EPIC-04 | Inventory Management | High | 3 | To Do |
| T-30 | Task | T-30 - Xây dựng rule xác định thuốc sắp hết theo ngưỡng tồn kho | US-11 | Backend | High | - | To Do |
| T-31 | Task | T-31 - Hiển thị nhãn cảnh báo thuốc sắp hết trên giao diện | US-11 | Frontend | High | - | To Do |
| US-12 | Story | US-12 - Cảnh báo thuốc gần hết hạn | EPIC-04 | Inventory Management | High | 3 | To Do |
| T-32 | Task | T-32 - Xây dựng rule xác định thuốc gần hết hạn | US-12 | Backend | High | - | To Do |
| T-33 | Task | T-33 - Thiết kế danh sách thuốc gần hết hạn | US-12 | Frontend | High | - | To Do |
| US-13 | Story | US-13 - Tạo phiếu nhập thuốc | EPIC-05 | Inventory Management | High | 5 | To Do |
| T-34 | Task | T-34 - Thiết kế bảng stock\_imports và stock\_import\_details | US-13 | Database | High | - | To Do |
| T-35 | Task | T-35 - Tạo API tạo phiếu nhập thuốc | US-13 | Backend | High | - | To Do |
| T-36 | Task | T-36 - Thiết kế màn hình tạo phiếu nhập thuốc | US-13 | Frontend | High | - | To Do |
| US-14 | Story | US-14 - Thêm nhiều thuốc vào phiếu nhập | EPIC-05 | Inventory Management | High | 5 | To Do |
| T-37 | Task | T-37 - Tạo chức năng thêm nhiều dòng thuốc vào phiếu nhập | US-14 | Frontend | High | - | To Do |
| T-38 | Task | T-38 - Tạo logic xác nhận phiếu nhập và cập nhật tồn kho | US-14 | Backend | High | - | To Do |
| T-39 | Task | T-39 - Validate số lượng nhập, giá nhập và hạn sử dụng | US-14 | Backend | High | - | To Do |
| US-15 | Story | US-15 - Lưu thông tin khách hàng | EPIC-06 | Customer Management | Medium | 3 | To Do |
| T-40 | Task | T-40 - Thiết kế bảng customers | US-15 | Database | Medium | - | To Do |
| T-41 | Task | T-41 - Tạo API thêm và tìm kiếm khách hàng | US-15 | Backend | Medium | - | To Do |
| T-42 | Task | T-42 - Thiết kế form lưu thông tin khách hàng | US-15 | Frontend | Medium | - | To Do |
| US-17 | Story | US-17 - Tạo đơn bán thuốc | EPIC-07 | Sales POS | High | 5 | To Do |
| T-45 | Task | T-45 - Thiết kế bảng orders và order\_details | US-17 | Database | High | - | To Do |
| T-46 | Task | T-46 - Tạo API tạo đơn bán thuốc | US-17 | Backend | High | - | To Do |
| T-47 | Task | T-47 - Thiết kế màn hình Sales POS | US-17 | Frontend | High | - | To Do |
| US-18 | Story | US-18 - Thêm thuốc vào đơn hàng | EPIC-07 | Sales POS | High | 5 | To Do |
| T-48 | Task | T-48 - Tạo API thêm thuốc vào đơn hàng | US-18 | Backend | High | - | To Do |
| T-49 | Task | T-49 - Xây dựng chức năng giỏ hàng trong màn hình bán thuốc | US-18 | Frontend | High | - | To Do |
| T-50 | Task | T-50 - Tính thành tiền từng dòng và tổng tiền đơn hàng | US-18 | Backend/Frontend | High | - | To Do |

**Tổng Story Point Sprint 3:** 32
**Kết quả mong đợi:** hệ thống có tồn kho, nhập thuốc, khách hàng và luồng bán thuốc cơ bản.

# Sprint 4 Backlog

## Sprint 4 - Interaction, Payment & Invoice

| **Field** | **Nội dung** |
| --- | --- |
| Sprint name | Sprint 4 - Interaction, Payment & Invoice |
| Start date | 10/06/2026 |
| End date | 13/06/2026 |
| Sprint Goal | Hoàn thành kiểm tra tồn kho khi bán, cảnh báo tương tác thuốc, thanh toán và hóa đơn. |

| **Story/Task Key** | **Issue Type** | **Summary** | **Parent / Linked Epic** | **Component** | **Priority** | **Story Point** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-16 | Story | US-16 - Xem lịch sử mua hàng của khách hàng | EPIC-06 | Customer Management | Medium | 3 | To Do |
| T-43 | Task | T-43 - Tạo API xem lịch sử mua hàng của khách hàng | US-16 | Backend | Medium | - | To Do |
| T-44 | Task | T-44 - Thiết kế màn hình lịch sử mua hàng của khách hàng | US-16 | Frontend | Medium | - | To Do |
| US-19 | Story | US-19 - Kiểm tra tồn kho khi bán | EPIC-07 | Sales POS | High | 5 | To Do |
| T-51 | Task | T-51 - Tạo logic kiểm tra tồn kho khi thêm thuốc vào đơn | US-19 | Backend | High | - | To Do |
| T-52 | Task | T-52 - Hiển thị cảnh báo khi số lượng bán vượt tồn kho | US-19 | Frontend | High | - | To Do |
| T-53 | Task | T-53 - Trừ tồn kho sau khi thanh toán thành công | US-19 | Backend | High | - | To Do |
| US-20 | Story | US-20 - Kiểm tra tương tác thuốc | EPIC-08 | Drug Interaction Alert | Highest | 5 | To Do |
| T-54 | Task | T-54 - Thiết kế bảng drug\_interactions | US-20 | Database | Highest | - | To Do |
| T-55 | Task | T-55 - Seed dữ liệu mẫu tương tác thuốc rule-based | US-20 | Database | Highest | - | To Do |
| T-56 | Task | T-56 - Tạo API kiểm tra tương tác thuốc trong đơn hàng | US-20 | Backend | Highest | - | To Do |
| T-57 | Task | T-57 - Tạo logic so sánh các cặp thuốc trong đơn hàng | US-20 | Backend | Highest | - | To Do |
| US-21 | Story | US-21 - Xem chi tiết cảnh báo tương tác thuốc | EPIC-08 | Drug Interaction Alert | Highest | 5 | To Do |
| T-58 | Task | T-58 - Thiết kế popup/card hiển thị cảnh báo tương tác thuốc | US-21 | Frontend | Highest | - | To Do |
| T-59 | Task | T-59 - Hiển thị mức độ cảnh báo nhẹ, trung bình, cao | US-21 | Frontend | Highest | - | To Do |
| T-60 | Task | T-60 - Hiển thị disclaimer cảnh báo chỉ mang tính tham khảo | US-21 | Frontend | High | - | To Do |
| US-22 | Story | US-22 - Ghi chú tư vấn sau cảnh báo | EPIC-08 | Drug Interaction Alert | High | 3 | To Do |
| T-61 | Task | T-61 - Thiết kế bảng consultation\_notes | US-22 | Database | High | - | To Do |
| T-62 | Task | T-62 - Tạo chức năng ghi chú tư vấn sau cảnh báo | US-22 | Backend/Frontend | High | - | To Do |
| US-23 | Story | US-23 - Thanh toán đơn hàng | EPIC-09 | Payment & Invoice | High | 5 | To Do |
| T-63 | Task | T-63 - Thiết kế bảng payments | US-23 | Database | High | - | To Do |
| T-64 | Task | T-64 - Tạo API ghi nhận thanh toán | US-23 | Backend | High | - | To Do |
| T-65 | Task | T-65 - Thiết kế màn hình thanh toán | US-23 | Frontend | High | - | To Do |
| US-24 | Story | US-24 - Tạo và xem/in hóa đơn | EPIC-09 | Payment & Invoice | High | 3 | To Do |
| T-66 | Task | T-66 - Thiết kế bảng invoices | US-24 | Database | High | - | To Do |
| T-67 | Task | T-67 - Tạo API tạo hóa đơn sau thanh toán | US-24 | Backend | High | - | To Do |
| T-68 | Task | T-68 - Thiết kế màn hình xem/in hóa đơn | US-24 | Frontend | High | - | To Do |

**Tổng Story Point Sprint 4:** 34
**Kết quả mong đợi:** luồng bán thuốc hoàn chỉnh từ tạo đơn, kiểm tra tồn kho, cảnh báo tương tác, thanh toán đến hóa đơn.

# Sprint 5 Backlog

## Sprint 5 - Reports, Testing & Demo

| **Field** | **Nội dung** |
| --- | --- |
| Sprint name | Sprint 5 - Reports, Testing & Demo |
| Start date | 14/06/2026 |
| End date | 17/06/2026 |
| Sprint Goal | Hoàn thành báo cáo, kiểm thử, dữ liệu demo, tài liệu hướng dẫn và chuẩn bị bảo vệ đồ án. |

| **Story/Task Key** | **Issue Type** | **Summary** | **Parent / Linked Epic** | **Component** | **Priority** | **Story Point** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-25 | Story | US-25 - Xem dashboard tổng quan | EPIC-10 | Reports & Dashboard | Medium | 3 | To Do |
| T-69 | Task | T-69 - Thiết kế dashboard tổng quan cho Admin | US-25 | Frontend | Medium | - | To Do |
| US-26 | Story | US-26 - Xem báo cáo doanh thu | EPIC-10 | Reports & Dashboard | Medium | 5 | To Do |
| T-70 | Task | T-70 - Tạo API báo cáo doanh thu theo ngày/tháng | US-26 | Backend | Medium | - | To Do |
| US-27 | Story | US-27 - Xem báo cáo thuốc bán chạy | EPIC-10 | Reports & Dashboard | Medium | 3 | To Do |
| T-71 | Task | T-71 - Tạo API báo cáo thuốc bán chạy | US-27 | Backend | Medium | - | To Do |
| US-28 | Story | US-28 - Viết test case cho chức năng MVP | EPIC-11 | Testing | High | 3 | To Do |
| T-72 | Task | T-72 - Viết test case cho luồng bán thuốc và thanh toán | US-28 | Testing | High | - | To Do |
| T-73 | Task | T-73 - Viết test case cho cảnh báo tương tác thuốc | US-28 | Testing | High | - | To Do |
| US-29 | Story | US-29 - Ghi nhận bug trong quá trình kiểm thử | EPIC-11 | Testing | High | 2 | To Do |
| T-74 | Task | T-74 - Ghi nhận bug và phân loại mức độ ưu tiên | US-29 | Testing | High | - | To Do |
| US-30 | Story | US-30 - Chuẩn bị dữ liệu mẫu và kịch bản demo | EPIC-12 | Documentation / Deployment | High | 3 | To Do |
| T-75 | Task | T-75 - Chuẩn bị dữ liệu mẫu cho tài khoản, thuốc, tồn kho và tương tác thuốc | US-30 | Documentation / Deployment | High | - | To Do |
| T-76 | Task | T-76 - Viết README và hướng dẫn setup project | US-30 | Documentation / Deployment | High | - | To Do |
| T-77 | Task | T-77 - Chuẩn bị slide bảo vệ và kịch bản demo | US-30 | Documentation / Deployment | High | - | To Do |
| T-78 | Task | T-78 - Cấu hình môi trường chạy demo local hoặc Docker | US-30 | Documentation / Deployment | High | - | To Do |

**Tổng Story Point Sprint 5:** 19
**Kết quả mong đợi:** hệ thống có báo cáo cơ bản, test case, dữ liệu demo, README, slide và môi trường demo.

# Tổng hợp Story Point theo Sprint

| **Sprint** | **Story Point** | **Nhận xét** |
| --- | --- | --- |
| Sprint 1 | 10 | Nhẹ, phù hợp để khởi động |
| Sprint 2 | 20 | Trung bình, tập trung CRUD nền tảng |
| Sprint 3 | 32 | Nặng nhất, nhiều nghiệp vụ lõi |
| Sprint 4 | 34 | Nặng, chứa chức năng nổi bật và luồng thanh toán |
| Sprint 5 | 19 | Trung bình, tập trung hoàn thiện và demo |

## Nhận xét cho báo cáo

Nhóm chia Product Backlog thành 5 Sprint theo tiến trình phát triển hệ thống. Các Sprint đầu tập trung vào nền tảng đăng nhập, phân quyền và dữ liệu thuốc. Các Sprint giữa tập trung vào nghiệp vụ lõi như tồn kho, nhập thuốc và bán thuốc tại quầy. Sprint 4 tập trung vào điểm nổi bật của đề tài là cảnh báo tương tác thuốc rule-based, kết hợp thanh toán và hóa đơn. Sprint cuối dùng để hoàn thiện báo cáo, dashboard, kiểm thử, dữ liệu demo và chuẩn bị bảo vệ.

Thông tin cảnh báo tương tác thuốc trong hệ thống chỉ mang tính tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.