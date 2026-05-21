# 09_REQUIREMENT_TRACEABILITY_MATRIX

**Mã tài liệu:** 09_Requirement_Traceability_Matrix  
**Tên tài liệu:** Requirement Traceability Matrix  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu ma trận truy vết yêu cầu  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Database Designer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Requirement Traceability Matrix**, viết tắt là **RTM**, dùng để truy vết từ yêu cầu phần mềm đến các thành phần liên quan trong hệ thống như use case, giao diện, API, database và test case. Tài liệu này giúp kiểm tra tính nhất quán giữa các tài liệu phân tích, thiết kế, lập trình và kiểm thử.

Trong dự án **PharmaAssist AI Intelligence**, hệ thống có nhiều nhóm chức năng như đăng nhập, phân quyền, quản lý thuốc, quản lý kho, bán thuốc, cảnh báo tương tác, thanh toán, hóa đơn, báo cáo, AI Copilot và Knowledge Graph. Nếu không có RTM, nhóm rất dễ gặp tình trạng:

- Có yêu cầu nhưng chưa có use case.
- Có use case nhưng chưa có API.
- Có API nhưng chưa có màn hình giao diện.
- Có chức năng nhưng chưa có bảng dữ liệu.
- Có chức năng nhưng chưa có test case.
- Có test case nhưng không rõ kiểm thử yêu cầu nào.
- Có chức năng bị bỏ khỏi MVP nhưng tài liệu khác vẫn giữ lại.

RTM giúp nhóm kiểm soát toàn bộ vòng đời yêu cầu từ lúc đặc tả đến khi kiểm thử và demo. Đây cũng là bằng chứng quan trọng trong báo cáo đồ án để chứng minh nhóm có quy trình Công Nghệ Phần Mềm rõ ràng.

---

## 2. Vai trò của RTM trong dự án

RTM đóng vai trò như một bảng liên kết trung tâm giữa các tài liệu sau:

| Tài liệu / Thành phần | Vai trò trong RTM |
|---|---|
| SRS | Cung cấp Requirement ID và mô tả yêu cầu |
| Use Case Specification | Mô tả hành vi nghiệp vụ tương ứng với yêu cầu |
| UI/UX Requirement | Xác định màn hình nơi người dùng thao tác yêu cầu |
| API Specification | Xác định endpoint xử lý yêu cầu |
| ERD / Database Schema | Xác định bảng dữ liệu liên quan |
| Test Case Document | Xác định test case kiểm thử yêu cầu |
| Product Backlog | Xác định task/story triển khai yêu cầu |
| Demo Script | Xác định yêu cầu nào được trình bày trong demo |

RTM giúp đảm bảo mọi yêu cầu quan trọng trong MVP đều được phân tích, thiết kế, lập trình và kiểm thử đầy đủ.

---

## 3. Phạm vi tài liệu

Tài liệu này truy vết các yêu cầu chính trong phạm vi MVP và phần nâng cao của PharmaAssist AI Intelligence, bao gồm:

- Auth và phân quyền.
- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Nhập thuốc.
- Quản lý tồn kho.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Quản lý khách hàng.
- Tạo đơn bán thuốc.
- Kiểm tra tồn kho khi bán.
- Kiểm tra tương tác thuốc.
- Ghi chú tư vấn.
- Thanh toán.
- Hóa đơn.
- Báo cáo doanh thu.
- Thuốc bán chạy.
- AI Copilot.
- Graph Explorer.
- AI Audit Log.
- Forecast tồn kho nếu triển khai.

---

## 4. Quy ước trong RTM

### 4.1. Quy ước Requirement ID

| Prefix | Ý nghĩa | Ví dụ |
|---|---|---|
| FR | Functional Requirement - Yêu cầu chức năng | FR-01 |
| NFR | Non-functional Requirement - Yêu cầu phi chức năng | NFR-01 |
| BR | Business Rule - Quy tắc nghiệp vụ | BR-06 |
| SR | Safety Rule - Quy tắc an toàn | SR-01 |

### 4.2. Quy ước Use Case ID

| Prefix | Ý nghĩa | Ví dụ |
|---|---|---|
| UC | Use Case | UC-01 |

### 4.3. Quy ước Test Case ID

| Prefix | Nhóm test | Ví dụ |
|---|---|---|
| TC-AUTH | Test Auth/Role | TC-AUTH-01 |
| TC-MED | Test Medicine | TC-MED-01 |
| TC-CAT | Test Category | TC-CAT-01 |
| TC-STOCK | Test Stock Import | TC-STOCK-01 |
| TC-INV | Test Inventory | TC-INV-01 |
| TC-SALES | Test Sales | TC-SALES-01 |
| TC-INT | Test Interaction | TC-INT-01 |
| TC-PAY | Test Payment | TC-PAY-01 |
| TC-INVC | Test Invoice | TC-INVC-01 |
| TC-REP | Test Report | TC-REP-01 |
| TC-AI | Test AI | TC-AI-01 |
| TC-GRAPH | Test Graph | TC-GRAPH-01 |

### 4.4. Quy ước trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| Planned | Đã lên kế hoạch, chưa triển khai |
| In Progress | Đang phân tích, thiết kế, lập trình hoặc kiểm thử |
| Done | Đã hoàn thành và có thể demo |
| Mocked | Đã có mô phỏng, chưa triển khai đầy đủ |
| Deferred | Để sau, chưa làm trong giai đoạn hiện tại |
| Out-of-scope | Không thuộc phạm vi đồ án hoặc MVP |

---

## 5. Bảng RTM tổng quát

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái |
|---|---|---|---|---|---|---|---|
| FR-01 | Đăng nhập | UC-01 | Login | POST /auth/login | users, roles | TC-AUTH-01 | Planned |
| FR-02 | Đăng xuất | UC-01 | Header / User Menu | POST /auth/logout | users | TC-AUTH-03 | Planned |
| FR-03 | Phân quyền | UC-02 | All screens | Middleware / Role Guard | users, roles, user_roles | TC-AUTH-02 | Planned |
| FR-04 | Quản lý thuốc | UC-03 | Medicine Management | /medicines | medicines | TC-MED-01 | Planned |
| FR-05 | Quản lý danh mục | UC-04 | Category Management | /categories | medicine_categories | TC-CAT-01 | Planned |
| FR-06 | Nhập thuốc | UC-05 | Stock Import | /stock-imports | stock_imports, stock_import_details | TC-STOCK-01 | Planned |
| FR-07 | Quản lý tồn kho | UC-06 | Inventory | /inventories | inventories | TC-INV-01 | Planned |
| FR-08 | Cảnh báo thuốc sắp hết | UC-06 | Dashboard / Inventory Alert | /inventories/low-stock | inventories, medicines | TC-INV-02 | Planned |
| FR-09 | Cảnh báo thuốc gần hết hạn | UC-06 | Dashboard / Expiry Alert | /inventories/near-expiry | inventories, medicines | TC-INV-03 | Planned |
| FR-10 | Tạo đơn bán thuốc | UC-07 | Sales POS | /orders | orders, order_details | TC-SALES-01 | Planned |
| FR-11 | Kiểm tra tồn kho | UC-08 | Sales POS | /orders/check-stock | inventories | TC-SALES-02 | Planned |
| FR-12 | Kiểm tra tương tác | UC-09 | Interaction Alert | /interactions/check | drug_interactions, interaction_alerts | TC-INT-01 | Planned |
| FR-13 | Thanh toán | UC-10 | Payment | /payments | payments, orders | TC-PAY-01 | Planned |
| FR-14 | Hóa đơn | UC-11 | Invoice | /invoices | invoices, orders, order_details | TC-INVC-01 | Planned |
| FR-15 | Quản lý khách hàng | UC-12 | Customer Management | /customers | customers | TC-CUS-01 | Planned |
| FR-16 | Báo cáo doanh thu | UC-13 | Reports | /reports/revenue | orders, payments | TC-REP-01 | Planned |
| FR-17 | AI Copilot | UC-14 | AI Copilot | /ai/consultation | ai_logs, consultation_sessions | TC-AI-01 | Planned |
| FR-18 | Graph Explorer | UC-15 | Graph Explorer | /graph/* | Neo4j | TC-GRAPH-01 | Planned |

---

## 6. RTM chi tiết theo nhóm chức năng

## 6.1. Nhóm Auth và Role

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-01 | Đăng nhập | UC-01 | Login | POST /auth/login | users, roles | TC-AUTH-01 | Planned | Đăng nhập bằng username/password |
| FR-02 | Đăng xuất | UC-01 | Header / User Menu | POST /auth/logout | users | TC-AUTH-03 | Planned | Hủy token/session |
| FR-03 | Phân quyền | UC-02 | All screens | Middleware / Role Guard | users, roles, user_roles | TC-AUTH-02 | Planned | Kiểm tra role ở backend |

### 6.1.1. Ghi chú truy vết nhóm Auth

- FR-01 cần được liên kết với màn hình Login và API đăng nhập.
- FR-03 không chỉ liên quan UI mà còn phải liên quan middleware backend.
- Test case phân quyền phải kiểm tra cả 401 Unauthorized và 403 Forbidden.

---

## 6.2. Nhóm Medicine

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-04 | Quản lý thuốc | UC-03 | Medicine Management | GET /medicines, POST /medicines, PUT /medicines/{id}, DELETE /medicines/{id} | medicines | TC-MED-01 | Planned | CRUD thuốc |
| FR-05 | Quản lý danh mục | UC-04 | Category Management | GET /categories, POST /categories, PUT /categories/{id}, DELETE /categories/{id} | medicine_categories | TC-CAT-01 | Planned | CRUD danh mục |

### 6.2.1. Ghi chú truy vết nhóm Medicine

- FR-04 cần liên kết với rule BR-03 và BR-04.
- Mã thuốc không được trùng nên database cần unique constraint.
- Giá bán không được âm nên cần validation ở frontend và backend.

---

## 6.3. Nhóm Inventory và Stock Import

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-06 | Nhập thuốc | UC-05 | Stock Import | POST /stock-imports, GET /stock-imports | stock_imports, stock_import_details, inventories | TC-STOCK-01 | Planned | Xác nhận nhập làm tăng tồn kho |
| FR-07 | Quản lý tồn kho | UC-06 | Inventory | GET /inventories, PUT /inventories/{id} | inventories, medicines | TC-INV-01 | Planned | Xem số lượng tồn |
| FR-08 | Cảnh báo thuốc sắp hết | UC-06 | Dashboard / Inventory Alert | GET /inventories/low-stock | inventories, medicines | TC-INV-02 | Planned | current_quantity <= min_stock |
| FR-09 | Cảnh báo thuốc gần hết hạn | UC-06 | Dashboard / Expiry Alert | GET /inventories/near-expiry | inventories, medicines | TC-INV-03 | Planned | expiry_date trong X ngày |

### 6.3.1. Ghi chú truy vết nhóm Inventory

- FR-06 liên quan trực tiếp đến tồn kho vì nhập thuốc làm tăng số lượng tồn.
- FR-08 cần mapping với BR-07.
- FR-09 cần mapping với BR-08.
- Test case cần kiểm tra thuốc dưới ngưỡng và thuốc gần hết hạn.

---

## 6.4. Nhóm Sales và Interaction

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-10 | Tạo đơn bán thuốc | UC-07 | Sales POS | POST /orders, GET /orders/{id}, PUT /orders/{id} | orders, order_details | TC-SALES-01 | Planned | POS tạo đơn |
| FR-11 | Kiểm tra tồn kho | UC-08 | Sales POS | POST /orders/check-stock | inventories, medicines | TC-SALES-02 | Planned | Không bán vượt tồn |
| FR-12 | Kiểm tra tương tác | UC-09 | Interaction Alert | POST /interactions/check | drug_interactions, interaction_alerts | TC-INT-01 | Planned | Rule-based interaction |
| FR-14 | Ghi chú tư vấn | UC-09 | Interaction Alert / Sales POS | POST /consultation-notes | consultation_notes, interaction_alerts | TC-INT-02 | Planned | Ghi chú khi có cảnh báo |

### 6.4.1. Ghi chú truy vết nhóm Sales và Interaction

- FR-10 là luồng demo chính.
- FR-11 liên quan đến BR-06.
- FR-12 liên quan đến BR-13 và BR-14.
- FR-14 liên quan đến BR-15.
- UI Sales POS cần hiển thị cảnh báo tương tác trong cùng luồng bán hàng.

---

## 6.5. Nhóm Payment và Invoice

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-13 | Thanh toán | UC-10 | Payment | POST /payments | payments, orders | TC-PAY-01 | Planned | Mô phỏng tiền mặt/chuyển khoản |
| FR-14 | Hóa đơn | UC-11 | Invoice | POST /invoices, GET /invoices/{id} | invoices, orders, order_details, payments | TC-INVC-01 | Planned | Tạo sau thanh toán |

### 6.5.1. Ghi chú truy vết nhóm Payment và Invoice

- FR-13 liên quan đến BR-10 và BR-11.
- FR-14 liên quan đến BR-12.
- Test case cần kiểm tra đơn chưa thanh toán không được tạo hóa đơn.

---

## 6.6. Nhóm Customer

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-15 | Quản lý khách hàng | UC-12 | Customer Management | GET /customers, POST /customers, PUT /customers/{id} | customers, orders | TC-CUS-01 | Planned | Khách hàng không đăng nhập trong MVP |

### 6.6.1. Ghi chú truy vết nhóm Customer

- Customer có thể gắn với Order.
- Không dùng dữ liệu cá nhân thật trong demo.
- Test case cần kiểm tra tìm khách hàng theo tên hoặc số điện thoại.

---

## 6.7. Nhóm Report

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-16 | Báo cáo doanh thu | UC-13 | Reports / Dashboard | GET /reports/revenue | orders, payments | TC-REP-01 | Planned | Chỉ tính đơn đã thanh toán |
| FR-18A | Thuốc bán chạy | UC-13 | Reports / Dashboard | GET /reports/top-medicines | orders, order_details, medicines | TC-REP-02 | Planned | Top medicines theo số lượng bán |
| FR-18B | Báo cáo tồn kho | UC-13 | Reports / Inventory | GET /reports/inventory | inventories, medicines | TC-REP-03 | Planned | Tồn kho thấp/gần hết hạn |

### 6.7.1. Ghi chú truy vết nhóm Report

- Báo cáo doanh thu liên quan BR-16.
- Chỉ Admin được xem báo cáo doanh thu tổng hợp.
- Warehouse có thể xem báo cáo tồn kho giới hạn nếu được cấp quyền.

---

## 6.8. Nhóm AI và Graph nâng cao

| Requirement ID | Tên yêu cầu | Use Case | UI Screen | API | Database | Test Case | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| FR-17 | AI Copilot | UC-14 | AI Copilot | POST /ai/consultation | ai_logs, consultation_sessions | TC-AI-01 | Planned / Mocked | Có thể dùng MockAI |
| FR-18 | Graph Explorer | UC-15 | Graph Explorer | GET /graph/* | Neo4j | TC-GRAPH-01 | Planned / Mocked | Node-edge mẫu |
| FR-19 | AI Audit Log | UC-16 | AI Audit Log | GET /ai/logs | ai_logs | TC-AI-02 | Planned | Chỉ Admin xem |
| FR-20 | Graph-RAG | UC-17 | AI Copilot / Graph Result | POST /ai/graph-rag | Neo4j, ai_logs | TC-AI-03 | Deferred / Mocked | Có thể mô phỏng luồng |
| FR-21 | Forecast tồn kho | UC-18 | Forecast / Dashboard | GET /analytics/forecast | inventory_forecasts, orders, order_details | TC-ANL-01 | Deferred | Nếu còn thời gian |

### 6.8.1. Ghi chú truy vết nhóm AI/Graph

- FR-17 phải mapping với safety rules SR-01 đến SR-09.
- FR-18 có thể dùng Neo4j thật hoặc mock graph data.
- FR-20 là chức năng nâng cao, có thể Deferred nếu MVP chưa xong.
- Nếu dùng AI thật, không commit API key thật vào source code.

---

## 7. RTM cho yêu cầu phi chức năng

| NFR ID | Nhóm yêu cầu | Mô tả | Thành phần liên quan | Test Case | Trạng thái |
|---|---|---|---|---|---|
| NFR-01 | Bảo mật | Mật khẩu phải được hash | Auth service, users table | TC-SEC-01 | Planned |
| NFR-02 | Phân quyền | API kiểm tra role | Middleware, Role Guard | TC-RBAC-01 | Planned |
| NFR-03 | Hiệu năng | Tìm kiếm thuốc dưới 2 giây với dữ liệu demo | Medicine API, Search UI | TC-PERF-01 | Planned |
| NFR-04 | Khả dụng | Demo chạy ổn định local | Frontend, Backend, Database | TC-DEMO-01 | Planned |
| NFR-05 | Dễ dùng | UI rõ ràng, dễ thao tác | All main screens | TC-UI-01 | Planned |
| NFR-06 | An toàn AI | AI không chẩn đoán/kê đơn | AI Copilot, Guardrail | TC-AI-SAFE-01 | Planned |
| NFR-07 | Truy vết | Lưu log thao tác quan trọng | Audit Log, AI Log | TC-AUDIT-01 | Planned |

---

## 8. RTM cho Business Rules và Safety Rules

| Rule ID | Nội dung rule | Requirement liên quan | API / Module | Test Case | Trạng thái |
|---|---|---|---|---|---|
| BR-01 | Người dùng phải đăng nhập | FR-01 | Auth Middleware | TC-AUTH-01 | Planned |
| BR-02 | Người dùng chỉ truy cập theo vai trò | FR-03 | Role Guard | TC-AUTH-02 | Planned |
| BR-03 | Mã thuốc không được trùng | FR-04 | Medicine Service | TC-MED-02 | Planned |
| BR-04 | Giá bán phải >= 0 | FR-04 | Medicine Service | TC-MED-03 | Planned |
| BR-05 | Số lượng tồn không âm | FR-07 | Inventory Service | TC-INV-04 | Planned |
| BR-06 | Không bán vượt tồn | FR-11 | Sales Service | TC-SALES-02 | Planned |
| BR-07 | Thuốc dưới ngưỡng hiện cảnh báo | FR-08 | Inventory Alert | TC-INV-02 | Planned |
| BR-08 | Thuốc gần hết hạn hiện cảnh báo | FR-09 | Expiry Alert | TC-INV-03 | Planned |
| BR-09 | Đơn hàng phải có ít nhất một thuốc | FR-10, FR-13 | Sales/Payment | TC-SALES-03 | Planned |
| BR-10 | Thanh toán thành công mới trừ tồn | FR-13 | Payment/Inventory | TC-PAY-02 | Planned |
| BR-12 | Hóa đơn chỉ tạo sau thanh toán | FR-14 | Invoice Service | TC-INVC-02 | Planned |
| BR-13 | Có từ 2 thuốc thì kiểm tra tương tác | FR-12 | Rule Engine | TC-INT-01 | Planned |
| BR-14 | Cảnh báo hiển thị đầy đủ thông tin | FR-12 | Interaction Alert UI | TC-INT-03 | Planned |
| BR-15 | Tương tác mức cao nên có ghi chú | FR-14 | Consultation Note | TC-INT-04 | Planned |
| BR-16 | Doanh thu chỉ tính đơn đã thanh toán | FR-16 | Report Service | TC-REP-01 | Planned |
| SR-01 | Hệ thống không chẩn đoán bệnh | FR-17 | AI Guardrail | TC-AI-SAFE-01 | Planned |
| SR-02 | Hệ thống không kê đơn thuốc | FR-17 | AI Guardrail | TC-AI-SAFE-02 | Planned |
| SR-03 | Cảnh báo chỉ mang tính tham khảo | FR-12, FR-17 | UI Disclaimer | TC-SAFE-01 | Planned |
| SR-08 | Không commit API key, token, mật khẩu thật | NFR-01 | Repo Config | TC-SEC-02 | Planned |
| SR-09 | Tác vụ AI quan trọng phải ghi log | FR-19 | AI Audit Log | TC-AI-02 | Planned |

---

## 9. Coverage Summary

### 9.1. Coverage theo Functional Requirement

| Nhóm | Tổng số requirement | Có Use Case | Có UI | Có API | Có Database | Có Test Case | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Auth/Role | 3 | 3 | 3 | 3 | 3 | 3 | Đủ cho MVP |
| Medicine | 2 | 2 | 2 | 2 | 2 | 2 | Đủ cho MVP |
| Inventory | 4 | 4 | 4 | 4 | 4 | 4 | Đủ cho MVP |
| Sales/Interaction | 4 | 4 | 4 | 4 | 4 | 4 | Cần ưu tiên demo |
| Payment/Invoice | 2 | 2 | 2 | 2 | 2 | 2 | Đủ cho MVP |
| Customer | 1 | 1 | 1 | 1 | 1 | 1 | Medium priority |
| Report | 3 | 3 | 3 | 3 | 3 | 3 | Có thể làm cơ bản |
| AI/Graph | 5 | 5 | 5 | 5 | 5 | 5 | Có thể Mocked/Deferred |

### 9.2. Coverage nhận xét

- Các yêu cầu MVP chính đều đã có mapping đến use case, UI, API, database và test case.
- Các yêu cầu AI/Graph đã có mapping nhưng trạng thái có thể là Planned, Mocked hoặc Deferred tùy tiến độ.
- RTM cần được cập nhật sau mỗi sprint để phản ánh trạng thái thực tế.

---

## 10. Quy tắc cập nhật RTM

| Mã quy tắc | Nội dung |
|---|---|
| RTM-01 | Khi thêm yêu cầu mới, phải thêm dòng vào RTM |
| RTM-02 | Khi thêm API mới, phải mapping với requirement tương ứng |
| RTM-03 | Khi viết test case, phải gắn test case với requirement |
| RTM-04 | Khi bỏ chức năng khỏi MVP, phải cập nhật trạng thái là Deferred hoặc Out-of-scope |
| RTM-05 | Khi đổi tên màn hình UI, phải cập nhật cột UI Screen |
| RTM-06 | Khi đổi tên bảng database, phải cập nhật cột Database |
| RTM-07 | Khi use case thay đổi, phải kiểm tra lại requirement liên quan |
| RTM-08 | Khi test case fail, không được đánh dấu requirement là Done |
| RTM-09 | Khi requirement Done, cần có API/UI/database/test case tương ứng hoàn thành nếu áp dụng |
| RTM-10 | RTM phải được review trước khi nộp báo cáo và trước buổi demo |

---

## 11. Quy trình sử dụng RTM trong dự án

### 11.1. Trước khi code

- Lấy danh sách FR/NFR từ SRS.
- Mapping mỗi requirement với use case.
- Xác định màn hình UI tương ứng.
- Xác định API cần xây dựng.
- Xác định bảng database liên quan.
- Tạo test case ID dự kiến.

### 11.2. Trong quá trình phát triển

- Cập nhật trạng thái từ Planned sang In Progress.
- Nếu API thay đổi, cập nhật cột API.
- Nếu database thay đổi, cập nhật cột Database.
- Nếu chức năng bị giảm phạm vi, cập nhật ghi chú và trạng thái.

### 11.3. Khi kiểm thử

- Tester dựa vào RTM để biết mỗi requirement cần test case nào.
- Nếu test case pass, requirement có thể chuyển sang Done khi code ổn định.
- Nếu test case fail, requirement không được đánh dấu Done.

### 11.4. Trước khi demo

- Lọc các requirement trạng thái Done hoặc Mocked để đưa vào demo.
- Kiểm tra các requirement High priority đã có test case.
- Kiểm tra chức năng nào Deferred để trình bày là phần phát triển sau.

---

## 12. Checklist kiểm tra tính nhất quán

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Mỗi FR trong SRS đã có trong RTM chưa? |  |
| Mỗi FR High priority đã có Use Case chưa? |  |
| Mỗi chức năng MVP đã có UI Screen chưa? |  |
| Mỗi chức năng backend đã có API mapping chưa? |  |
| Mỗi chức năng cần lưu dữ liệu đã có database mapping chưa? |  |
| Mỗi requirement đã có ít nhất một test case chưa? |  |
| Các requirement AI/Graph đã được ghi Planned/Mocked/Deferred rõ chưa? |  |
| Các rule an toàn AI đã mapping với test case chưa? |  |
| Các chức năng ngoài phạm vi đã được đánh dấu Out-of-scope hoặc Deferred chưa? |  |
| RTM đã được cập nhật sau sprint gần nhất chưa? |  |

---

## 13. Rủi ro nếu không duy trì RTM

| Rủi ro | Tác động | Cách xử lý |
|---|---|---|
| Requirement bị bỏ sót | Chức năng quan trọng không được code hoặc test | Review RTM sau mỗi sprint |
| API không khớp UI | Frontend/backend khó tích hợp | Mapping API rõ trong RTM |
| Database thiếu bảng | Backend phải sửa lại nhiều | Mapping requirement với database trước khi code |
| Test case thiếu | Không chứng minh được chức năng đúng | Mỗi FR phải có test case |
| Demo thiếu điểm nổi bật | Không thể hiện được cảnh báo tương tác/AI/Graph | Đánh dấu requirement demo chính |
| Tài liệu không nhất quán | Báo cáo bị rời rạc, khó bảo vệ | Dùng RTM làm bảng đối chiếu trung tâm |

---

## 14. Kết luận

Tài liệu **Requirement Traceability Matrix** giúp truy vết các yêu cầu của hệ thống **PharmaAssist AI Intelligence** từ SRS đến use case, giao diện, API, database và test case. Đây là tài liệu quan trọng để đảm bảo tính nhất quán giữa phân tích, thiết kế, triển khai và kiểm thử.

Trong phạm vi MVP, các yêu cầu quan trọng như đăng nhập, phân quyền, quản lý thuốc, nhập thuốc, tồn kho, bán thuốc, kiểm tra tồn kho, kiểm tra tương tác thuốc, thanh toán, hóa đơn và báo cáo doanh thu cần được mapping đầy đủ và kiểm thử kỹ. Các yêu cầu nâng cao như AI Copilot, Graph Explorer, Graph-RAG, AI Audit Log và Forecast tồn kho có thể được đánh dấu Planned, Mocked hoặc Deferred tùy theo tiến độ triển khai.

RTM cần được cập nhật liên tục trong suốt dự án, đặc biệt sau khi thay đổi SRS, API, database, test case hoặc phạm vi MVP.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

