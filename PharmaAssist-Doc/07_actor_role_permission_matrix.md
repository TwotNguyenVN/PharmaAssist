# 07_ACTOR_ROLE_PERMISSION_MATRIX

**Mã tài liệu:** 07_Actor_Role_Permission_Matrix  
**Tên tài liệu:** Actor, Role and Permission Matrix  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu actor, vai trò và ma trận phân quyền  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Actor, Role and Permission Matrix** mô tả các actor, vai trò, quyền hạn và chức năng được phép sử dụng trong hệ thống **PharmaAssist AI Intelligence**.

Trong hệ thống quản lý nhà thuốc, không phải người dùng nào cũng được phép thao tác toàn bộ chức năng. Ví dụ, Admin có thể quản lý tài khoản và xem báo cáo doanh thu, trong khi nhân viên nhà thuốc chủ yếu thao tác bán thuốc, thanh toán và hóa đơn. Nhân viên kho chỉ cần nhập thuốc, cập nhật tồn kho và theo dõi cảnh báo kho. Việc phân quyền rõ ràng giúp hệ thống an toàn hơn, dễ kiểm soát hơn và phù hợp với nghiệp vụ thực tế.

Tài liệu này dùng để:

- Xác định danh sách actor của hệ thống.
- Mô tả vai trò và trách nhiệm của từng actor.
- Xác định chức năng nào actor được phép sử dụng.
- Làm cơ sở thiết kế menu, sidebar và giao diện theo vai trò.
- Làm cơ sở thiết kế API authorization ở backend.
- Làm cơ sở viết test case phân quyền.
- Làm cơ sở giải thích với giảng viên về kiểm soát truy cập.
- Tránh việc người dùng không đúng vai trò truy cập nhầm chức năng.

Tài liệu này là đầu vào quan trọng cho:

- SRS - Software Requirement Specification.
- Use Case Specification.
- API Specification.
- UI/UX Requirement Document.
- Test Case Document.
- Security Requirement.
- Backend Authorization Middleware.

---

## 2. Phạm vi tài liệu

Tài liệu này tập trung vào phân quyền người dùng trong phạm vi hệ thống PharmaAssist AI Intelligence, bao gồm:

- Actor chính của hệ thống.
- Role nội bộ của hệ thống.
- Permission theo từng chức năng.
- Quy tắc phân quyền.
- Quyền truy cập giao diện.
- Quyền gọi API.
- Quyền xem dữ liệu.
- Quyền thao tác dữ liệu.
- Quyền với các chức năng AI/Graph nâng cao.
- Tình huống từ chối truy cập.

Tài liệu này không đi sâu vào cách triển khai code cụ thể như middleware, decorator, guard, policy engine hoặc cấu trúc database chi tiết. Những phần đó sẽ được mô tả trong tài liệu thiết kế kỹ thuật hoặc API Specification.

---

## 3. Nguyên tắc phân quyền tổng quát

Hệ thống PharmaAssist AI Intelligence áp dụng nguyên tắc **Role-Based Access Control**, viết tắt là **RBAC**. Theo nguyên tắc này, mỗi người dùng được gán một hoặc nhiều vai trò. Mỗi vai trò có một tập quyền nhất định. Khi người dùng thực hiện thao tác, hệ thống kiểm tra vai trò của người dùng trước khi cho phép truy cập chức năng.

Các nguyên tắc chính:

1. Người dùng nội bộ phải đăng nhập trước khi sử dụng hệ thống.
2. Mỗi người dùng phải có ít nhất một vai trò.
3. Mỗi vai trò chỉ được truy cập các chức năng phù hợp với nghiệp vụ.
4. Frontend có thể ẩn menu theo vai trò, nhưng backend vẫn phải kiểm tra quyền.
5. API phải từ chối request nếu người dùng không đủ quyền.
6. Người dùng không đủ quyền nhận lỗi 403 Forbidden.
7. Người chưa đăng nhập nhận lỗi 401 Unauthorized.
8. Admin có quyền cao nhất nhưng vẫn cần đăng nhập hợp lệ.
9. Các chức năng AI/Graph cần giới hạn quyền để tránh lạm dụng.
10. Dữ liệu khách hàng, hóa đơn và lịch sử mua hàng cần được bảo vệ.

---

## 4. Danh sách actor

| Actor | Mô tả | Loại actor |
|---|---|---|
| Admin / Chủ nhà thuốc | Người có quyền cao nhất, quản lý toàn bộ hệ thống | Human actor |
| Nhân viên nhà thuốc | Người bán thuốc, tư vấn tham khảo, xem cảnh báo, thanh toán | Human actor |
| Nhân viên kho | Người nhập thuốc, cập nhật tồn kho, theo dõi tồn kho và hạn dùng | Human actor |
| Khách hàng | Người mua thuốc tại nhà thuốc | External human actor |
| AI System | Thành phần sinh nội dung tham khảo nếu hệ thống có AI Copilot | System actor |
| Neo4j Graph | Thành phần cung cấp dữ liệu graph nếu triển khai Knowledge Graph | External system actor |

---

## 5. Mô tả chi tiết actor

## 5.1. Admin / Chủ nhà thuốc

### 5.1.1. Mô tả

Admin hoặc Chủ nhà thuốc là người có quyền cao nhất trong hệ thống. Actor này chịu trách nhiệm quản lý dữ liệu chính, quản lý tài khoản, phân quyền, theo dõi báo cáo và kiểm soát các chức năng nâng cao như AI Audit Log hoặc Prompt Management nếu có triển khai.

### 5.1.2. Nhiệm vụ chính

- Quản lý tài khoản người dùng.
- Phân quyền người dùng.
- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Quản lý tồn kho ở mức giám sát.
- Xem cảnh báo thuốc sắp hết.
- Xem cảnh báo thuốc gần hết hạn.
- Xem doanh thu.
- Xem thuốc bán chạy.
- Xem lịch sử đơn hàng.
- Xem báo cáo tổng quan.
- Xem AI Audit Log nếu có AI.
- Quản lý prompt AI nếu có chức năng này.
- Xem Knowledge Graph nếu có graph.

### 5.1.3. Giới hạn

Admin có quyền cao nhất nhưng vẫn không được sử dụng hệ thống để chẩn đoán bệnh, kê đơn thuốc hoặc thay thế chuyên gia y tế. Các chức năng AI và cảnh báo thuốc chỉ mang tính tham khảo.

---

## 5.2. Nhân viên nhà thuốc

### 5.2.1. Mô tả

Nhân viên nhà thuốc là người trực tiếp thao tác với khách hàng trong quá trình bán thuốc tại quầy. Actor này cần tìm thuốc nhanh, kiểm tra tồn kho, tạo đơn bán thuốc, xem cảnh báo tương tác, ghi chú tư vấn, thanh toán và in hóa đơn.

### 5.2.2. Nhiệm vụ chính

- Đăng nhập hệ thống.
- Tìm kiếm thuốc.
- Xem thông tin thuốc.
- Xem tồn kho khi bán.
- Tạo đơn bán thuốc.
- Thêm thuốc vào đơn hàng.
- Cập nhật số lượng thuốc trong đơn.
- Xem cảnh báo tương tác thuốc.
- Ghi chú tư vấn khi cần.
- Quản lý thông tin khách hàng cơ bản.
- Thanh toán.
- Tạo hoặc in hóa đơn.
- Sử dụng AI Copilot nếu được cấp quyền.
- Xem Knowledge Graph ở mức tham khảo nếu được cấp quyền.

### 5.2.3. Giới hạn

Nhân viên nhà thuốc không được:

- Quản lý tài khoản người dùng.
- Phân quyền.
- Xem toàn bộ báo cáo quản trị nếu không được cấp quyền.
- Quản lý prompt AI.
- Xem AI Audit Log.
- Tự ý sửa dữ liệu thuốc nếu không được Admin cấp quyền.
- Tự ý sửa dữ liệu tồn kho ngoài luồng bán hàng.

---

## 5.3. Nhân viên kho

### 5.3.1. Mô tả

Nhân viên kho là người phụ trách nghiệp vụ nhập thuốc, cập nhật tồn kho, theo dõi số lượng thuốc, theo dõi thuốc sắp hết và thuốc gần hết hạn. Actor này không trực tiếp thao tác bán hàng và thanh toán trong phạm vi MVP.

### 5.3.2. Nhiệm vụ chính

- Đăng nhập hệ thống.
- Xem danh sách thuốc.
- Xem tồn kho.
- Tạo phiếu nhập thuốc.
- Cập nhật tồn kho thông qua nhập thuốc.
- Xem cảnh báo thuốc sắp hết.
- Xem cảnh báo thuốc gần hết hạn.
- Xem lịch sử nhập thuốc.
- Quản lý nhà cung cấp nếu được cấp quyền.

### 5.3.3. Giới hạn

Nhân viên kho không được:

- Quản lý tài khoản người dùng.
- Phân quyền.
- Tạo đơn bán thuốc.
- Thanh toán.
- In hóa đơn bán hàng.
- Xem doanh thu chi tiết nếu không được cấp quyền.
- Quản lý prompt AI.
- Xem AI Audit Log.

---

## 5.4. Khách hàng

### 5.4.1. Mô tả

Khách hàng là người mua thuốc tại nhà thuốc. Trong phạm vi MVP, khách hàng không cần đăng nhập vào hệ thống. Thông tin khách hàng có thể được nhân viên nhà thuốc lưu lại ở mức cơ bản như họ tên, số điện thoại và lịch sử mua hàng.

### 5.4.2. Nhu cầu chính

- Mua thuốc nhanh.
- Nhận hóa đơn rõ ràng.
- Có thể được lưu thông tin mua hàng cơ bản.
- Thông tin cá nhân được bảo mật.

### 5.4.3. Giới hạn

Khách hàng không có tài khoản nội bộ và không truy cập vào hệ thống trong MVP. Nếu sau này phát triển cổng khách hàng, cần tài liệu phân quyền riêng.

---

## 5.5. AI System

### 5.5.1. Mô tả

AI System là thành phần hệ thống có nhiệm vụ sinh nội dung hỗ trợ tham khảo, ví dụ tạo câu hỏi bổ sung, giải thích cảnh báo tương tác hoặc tạo ghi chú tư vấn mẫu. AI System có thể là MockAI, Gemini, OpenRouter, Ollama hoặc provider khác tùy phạm vi triển khai.

### 5.5.2. Nhiệm vụ chính

- Nhận prompt và context từ backend.
- Sinh nội dung hỗ trợ tham khảo.
- Trả kết quả về backend.
- Không tự động lưu nội dung nếu chưa có xác nhận của người dùng.

### 5.5.3. Giới hạn

AI System không được:

- Chẩn đoán bệnh.
- Kê đơn thuốc.
- Khẳng định thuốc chắc chắn an toàn.
- Thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- Truy cập trực tiếp database nếu không thông qua backend.
- Tự ý thực hiện thao tác thay đổi dữ liệu nghiệp vụ.

---

## 5.6. Neo4j Graph

### 5.6.1. Mô tả

Neo4j Graph là thành phần cung cấp dữ liệu graph nếu hệ thống triển khai Knowledge Graph. Graph lưu các node và relationship mẫu như Medicine, ActiveIngredient, DrugGroup, Symptom, Condition, Interaction, RedFlag và Recommendation.

### 5.6.2. Nhiệm vụ chính

- Lưu dữ liệu graph mẫu.
- Trả kết quả truy vấn quan hệ thuốc, hoạt chất, tương tác.
- Cung cấp context cho Graph-RAG nếu có.
- Hỗ trợ Graph Explorer hiển thị node-edge.

### 5.6.3. Giới hạn

Neo4j Graph chỉ cung cấp dữ liệu mẫu phục vụ đồ án. Dữ liệu graph không được xem là dữ liệu y khoa thật và không dùng để thay thế tư vấn chuyên môn.

---

## 6. Danh sách role trong hệ thống

| Role code | Tên role | Mô tả | Actor tương ứng |
|---|---|---|---|
| ADMIN | Admin / Chủ nhà thuốc | Vai trò quản trị toàn hệ thống | Admin / Chủ nhà thuốc |
| STAFF | Nhân viên nhà thuốc | Vai trò bán thuốc, thanh toán, hóa đơn, khách hàng | Nhân viên nhà thuốc |
| WAREHOUSE | Nhân viên kho | Vai trò nhập thuốc và theo dõi tồn kho | Nhân viên kho |
| AI_SYSTEM | AI System | Vai trò nội bộ cho thành phần AI nếu cần log hoặc kiểm soát | AI System |
| GRAPH_SYSTEM | Neo4j Graph | Vai trò hệ thống cung cấp dữ liệu graph | Neo4j Graph |

Ghi chú: Khách hàng trong MVP không có role đăng nhập. Nếu phát triển cổng khách hàng trong tương lai, có thể bổ sung role CUSTOMER.

---

## 7. Permission Matrix tổng quát

| Chức năng | Admin | Nhân viên nhà thuốc | Nhân viên kho | Khách hàng |
|---|---|---|---|---|
| Đăng nhập | Có | Có | Có | Không |
| Đăng xuất | Có | Có | Có | Không |
| Quản lý user | Có | Không | Không | Không |
| Phân quyền | Có | Không | Không | Không |
| Xem thuốc | Có | Có | Có | Không |
| Thêm/sửa/xóa thuốc | Có | Không | Không/Có giới hạn | Không |
| Quản lý danh mục | Có | Không | Không | Không |
| Xem tồn kho | Có | Có | Có | Không |
| Nhập thuốc | Có | Không | Có | Không |
| Xem lịch sử nhập thuốc | Có | Không | Có | Không |
| Cảnh báo sắp hết | Có | Có | Có | Không |
| Cảnh báo gần hết hạn | Có | Có | Có | Không |
| Tạo đơn bán thuốc | Có | Có | Không | Không |
| Kiểm tra tồn kho khi bán | Có | Có | Không | Không |
| Kiểm tra tương tác thuốc | Có | Có | Không | Không |
| Ghi chú tư vấn | Có | Có | Không | Không |
| Thanh toán | Có | Có | Không | Không |
| In hóa đơn | Có | Có | Không | Không |
| Quản lý khách hàng | Có | Có | Không | Không |
| Xem báo cáo | Có | Không | Không/Có giới hạn | Không |
| AI Copilot | Có | Có | Không | Không |
| Xem AI Audit Log | Có | Không | Không | Không |
| Quản lý prompt AI | Có | Không | Không | Không |
| Xem Knowledge Graph | Có | Có | Không/Có giới hạn | Không |
| Forecast tồn kho | Có | Không | Có giới hạn | Không |

---

## 8. Permission Matrix chi tiết theo module

## 8.1. Module Auth

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| AUTH_LOGIN | Đăng nhập | Có | Có | Có | Người dùng nội bộ |
| AUTH_LOGOUT | Đăng xuất | Có | Có | Có | Hủy session/token |
| AUTH_VIEW_PROFILE | Xem thông tin cá nhân | Có | Có | Có | Xem profile của chính mình |
| AUTH_CHANGE_PASSWORD | Đổi mật khẩu | Có | Có | Có | Nếu hệ thống hỗ trợ |

### Quy định module Auth

- Người dùng phải đăng nhập trước khi truy cập dashboard.
- Mật khẩu phải được lưu dưới dạng hash.
- Nếu đăng nhập sai, hệ thống hiển thị thông báo lỗi.
- Nếu token hết hạn, người dùng cần đăng nhập lại.

---

## 8.2. Module User & Role Management

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| USER_VIEW | Xem danh sách user | Có | Không | Không | Chỉ Admin |
| USER_CREATE | Tạo user | Có | Không | Không | Chỉ Admin |
| USER_UPDATE | Cập nhật user | Có | Không | Không | Chỉ Admin |
| USER_DISABLE | Khóa/mở tài khoản | Có | Không | Không | Ưu tiên khóa thay vì xóa cứng |
| ROLE_VIEW | Xem vai trò | Có | Không | Không | Chỉ Admin |
| ROLE_ASSIGN | Gán vai trò | Có | Không | Không | Chỉ Admin |
| ROLE_UPDATE | Cập nhật vai trò | Có | Không | Không | Chỉ Admin |

### Quy định module User & Role

- Chỉ Admin được tạo hoặc khóa tài khoản.
- Chỉ Admin được phân quyền.
- Nhân viên không được tự nâng quyền cho mình.
- Không nên xóa cứng user đã có lịch sử đơn hàng.

---

## 8.3. Module Medicine

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| MEDICINE_VIEW | Xem danh sách thuốc | Có | Có | Có | Tất cả người dùng nội bộ cần xem |
| MEDICINE_DETAIL | Xem chi tiết thuốc | Có | Có | Có | Phục vụ bán hàng và kho |
| MEDICINE_CREATE | Thêm thuốc | Có | Không | Không/Có giới hạn | MVP nên để Admin |
| MEDICINE_UPDATE | Sửa thuốc | Có | Không | Không/Có giới hạn | Warehouse có thể đề xuất sửa nếu cần |
| MEDICINE_DELETE | Xóa/ẩn thuốc | Có | Không | Không | Ưu tiên inactive thay vì xóa cứng |
| MEDICINE_SEARCH | Tìm kiếm thuốc | Có | Có | Có | Cần cho POS và tồn kho |

### Quy định module Medicine

- Admin quản lý dữ liệu thuốc chính.
- Staff chỉ xem và tìm kiếm thuốc để bán hàng.
- Warehouse chỉ xem thuốc để nhập và theo dõi tồn kho.
- Nếu muốn cho Warehouse sửa thông tin thuốc, chỉ nên giới hạn ở dữ liệu kho như hạn dùng hoặc vị trí kho, không sửa giá bán.

---

## 8.4. Module Medicine Category

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| CATEGORY_VIEW | Xem danh mục | Có | Có | Có | Dùng để lọc thuốc |
| CATEGORY_CREATE | Thêm danh mục | Có | Không | Không | Chỉ Admin |
| CATEGORY_UPDATE | Sửa danh mục | Có | Không | Không | Chỉ Admin |
| CATEGORY_DELETE | Xóa/ẩn danh mục | Có | Không | Không | Không xóa nếu đang có thuốc |

### Quy định module Category

- Danh mục thuốc dùng để phân loại và tìm kiếm.
- Chỉ Admin được thay đổi danh mục.
- Không cho xóa danh mục nếu còn thuốc liên kết, trừ khi chuyển thuốc sang danh mục khác hoặc dùng trạng thái inactive.

---

## 8.5. Module Inventory

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| INVENTORY_VIEW | Xem tồn kho | Có | Có | Có | Staff chỉ cần xem khi bán |
| INVENTORY_UPDATE | Cập nhật tồn kho trực tiếp | Có | Không | Có giới hạn | Nên thông qua phiếu nhập/xuất |
| INVENTORY_LOW_STOCK_VIEW | Xem cảnh báo sắp hết | Có | Có | Có | Staff biết để tư vấn tình trạng hàng |
| INVENTORY_EXPIRY_VIEW | Xem cảnh báo gần hết hạn | Có | Có | Có | Warehouse xử lý chính |
| INVENTORY_ADJUST | Điều chỉnh tồn kho | Có | Không | Có giới hạn | Nếu có kiểm kê, cần log |

### Quy định module Inventory

- Staff được xem tồn kho nhưng không tự sửa tồn kho.
- Warehouse được nhập thuốc và theo dõi tồn kho.
- Admin có quyền giám sát và điều chỉnh khi cần.
- Mọi thay đổi tồn kho quan trọng nên có lịch sử hoặc lý do.

---

## 8.6. Module Stock Import

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| STOCK_IMPORT_VIEW | Xem phiếu nhập | Có | Không | Có | Warehouse xem phiếu nhập của kho |
| STOCK_IMPORT_CREATE | Tạo phiếu nhập | Có | Không | Có | Warehouse thực hiện chính |
| STOCK_IMPORT_UPDATE | Sửa phiếu nhập | Có | Không | Có giới hạn | Chỉ khi phiếu chưa xác nhận |
| STOCK_IMPORT_CONFIRM | Xác nhận nhập | Có | Không | Có | Sau xác nhận thì tăng tồn kho |
| STOCK_IMPORT_CANCEL | Hủy phiếu nhập | Có | Không | Có giới hạn | Cần lý do hủy |

### Quy định module Stock Import

- Phiếu nhập chỉ làm tăng tồn kho khi được xác nhận.
- Không cho sửa phiếu nhập đã xác nhận nếu không có cơ chế điều chỉnh.
- Nhân viên bán hàng không được tạo phiếu nhập.

---

## 8.7. Module Supplier

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| SUPPLIER_VIEW | Xem nhà cung cấp | Có | Không | Có | Dùng khi nhập thuốc |
| SUPPLIER_CREATE | Thêm nhà cung cấp | Có | Không | Có giới hạn | Tùy phạm vi MVP |
| SUPPLIER_UPDATE | Sửa nhà cung cấp | Có | Không | Có giới hạn | Có thể để Admin duyệt |
| SUPPLIER_DELETE | Xóa/ẩn nhà cung cấp | Có | Không | Không | Ưu tiên inactive |

---

## 8.8. Module Sales / POS

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| ORDER_VIEW | Xem đơn hàng | Có | Có giới hạn | Không | Staff xem đơn mình tạo hoặc trong ngày |
| ORDER_CREATE | Tạo đơn bán thuốc | Có | Có | Không | Chức năng chính của Staff |
| ORDER_UPDATE_DRAFT | Sửa đơn nháp | Có | Có | Không | Trước thanh toán |
| ORDER_CANCEL | Hủy đơn | Có | Có giới hạn | Không | Cần lý do nếu đã tạo |
| ORDER_ADD_ITEM | Thêm thuốc vào đơn | Có | Có | Không | Có kiểm tra tồn kho |
| ORDER_REMOVE_ITEM | Xóa thuốc khỏi đơn | Có | Có | Không | Trước thanh toán |
| ORDER_CHECK_STOCK | Kiểm tra tồn kho khi bán | Có | Có | Không | Hệ thống tự kiểm tra |
| ORDER_CHECK_INTERACTION | Kiểm tra tương tác thuốc | Có | Có | Không | Hệ thống tự kiểm tra khi có nhiều thuốc |

### Quy định module Sales

- Staff là vai trò chính sử dụng POS.
- Warehouse không được tạo đơn bán thuốc.
- Đơn đã thanh toán không được sửa trực tiếp.
- Nếu cần hủy đơn đã thanh toán, phải có quy trình hoàn/hủy riêng, có thể để ngoài MVP.

---

## 8.9. Module Drug Interaction Alert

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| INTERACTION_RULE_VIEW | Xem rule tương tác | Có | Không/Có giới hạn | Không | Dữ liệu mẫu |
| INTERACTION_RULE_CREATE | Thêm rule tương tác | Có | Không | Không | Chỉ Admin |
| INTERACTION_RULE_UPDATE | Sửa rule tương tác | Có | Không | Không | Chỉ Admin |
| INTERACTION_RULE_DELETE | Xóa/ẩn rule tương tác | Có | Không | Không | Chỉ Admin |
| INTERACTION_ALERT_VIEW | Xem cảnh báo trong đơn | Có | Có | Không | Staff xem khi bán |
| INTERACTION_ALERT_NOTE | Ghi chú tư vấn | Có | Có | Không | Gắn với đơn/cảnh báo |

### Quy định module Drug Interaction

- Hệ thống tự kiểm tra tương tác khi đơn có từ hai thuốc trở lên.
- Staff không được sửa rule tương tác.
- Admin có thể quản lý dữ liệu tương tác mẫu.
- Cảnh báo phải có disclaimer.
- Dữ liệu tương tác chỉ phục vụ đồ án, không thay thế dữ liệu y khoa thật.

---

## 8.10. Module Payment

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| PAYMENT_VIEW | Xem thanh toán | Có | Có giới hạn | Không | Staff xem thanh toán đơn mình xử lý |
| PAYMENT_CREATE | Ghi nhận thanh toán | Có | Có | Không | Thanh toán mô phỏng |
| PAYMENT_CANCEL | Hủy thanh toán | Có | Không/Có giới hạn | Không | Không bắt buộc trong MVP |
| PAYMENT_REFUND | Hoàn tiền | Có giới hạn | Không | Không | Out-of-scope hoặc phát triển sau |

### Quy định module Payment

- MVP chỉ hỗ trợ tiền mặt và chuyển khoản mô phỏng.
- Không tích hợp cổng thanh toán thật.
- Chỉ thanh toán đơn có ít nhất một thuốc.
- Không thanh toán nếu có thuốc vượt tồn.

---

## 8.11. Module Invoice

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| INVOICE_VIEW | Xem hóa đơn | Có | Có | Không | Staff xem hóa đơn đơn đã bán |
| INVOICE_CREATE | Tạo hóa đơn | Có | Có | Không | Hệ thống tạo sau thanh toán |
| INVOICE_PRINT | In hóa đơn | Có | Có | Không | In hoặc xuất giao diện hóa đơn |
| INVOICE_CANCEL | Hủy hóa đơn | Có | Không | Không | Không bắt buộc trong MVP |

### Quy định module Invoice

- Hóa đơn chỉ được tạo sau khi thanh toán thành công.
- Hóa đơn không được tạo cho đơn hàng rỗng.
- Hóa đơn cần hiển thị thông tin thuốc, số lượng, đơn giá và tổng tiền.

---

## 8.12. Module Customer

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| CUSTOMER_VIEW | Xem khách hàng | Có | Có | Không | Staff xem để gắn vào đơn |
| CUSTOMER_CREATE | Thêm khách hàng | Có | Có | Không | Lưu tên, số điện thoại |
| CUSTOMER_UPDATE | Sửa khách hàng | Có | Có giới hạn | Không | Staff sửa thông tin cơ bản |
| CUSTOMER_DELETE | Xóa/ẩn khách hàng | Có | Không | Không | Ưu tiên inactive |
| CUSTOMER_HISTORY_VIEW | Xem lịch sử mua | Có | Có giới hạn | Không | Staff xem khi cần bán hàng |

### Quy định module Customer

- Khách hàng không đăng nhập trong MVP.
- Không dùng dữ liệu cá nhân thật trong demo.
- Staff chỉ nên xem dữ liệu cần thiết cho bán hàng.

---

## 8.13. Module Report

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| REPORT_REVENUE_VIEW | Xem doanh thu | Có | Không | Không | Chỉ Admin |
| REPORT_TOP_MEDICINE_VIEW | Xem thuốc bán chạy | Có | Không | Không/Có giới hạn | Warehouse có thể xem để nhập hàng nếu được cấp quyền |
| REPORT_INVENTORY_VIEW | Xem báo cáo tồn kho | Có | Không | Có | Warehouse xem phần kho |
| REPORT_EXPORT | Xuất báo cáo | Có | Không | Không | Không bắt buộc MVP |

### Quy định module Report

- Doanh thu là dữ liệu quản trị, mặc định chỉ Admin xem.
- Warehouse có thể xem báo cáo tồn kho nhưng không xem doanh thu.
- Staff không cần xem báo cáo tổng hợp trong MVP.

---

## 8.14. Module AI Copilot

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| AI_COPILOT_USE | Sử dụng AI Copilot | Có | Có | Không | Staff dùng trong tư vấn tham khảo |
| AI_GENERATE_QUESTION | AI tạo câu hỏi | Có | Có | Không | MockAI hoặc provider thật |
| AI_EXPLAIN_ALERT | AI giải thích cảnh báo | Có | Có | Không | Có guardrail |
| AI_GENERATE_NOTE | AI tạo ghi chú tư vấn | Có | Có | Không | Người dùng phải xác nhận |
| AI_BUSINESS_REPORT | AI tạo báo cáo kinh doanh | Có | Không | Không | Nếu có triển khai |

### Quy định module AI Copilot

- AI chỉ hỗ trợ tham khảo.
- AI không chẩn đoán bệnh.
- AI không kê đơn thuốc.
- AI không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- Nội dung AI phải được người dùng xác nhận trước khi lưu.
- Nội dung AI nên được lưu audit log nếu có triển khai AI Audit Log.

---

## 8.15. Module AI Governance

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| AI_LOG_VIEW | Xem AI Audit Log | Có | Không | Không | Chỉ Admin |
| AI_LOG_DETAIL | Xem chi tiết AI log | Có | Không | Không | Chỉ Admin |
| AI_PROMPT_VIEW | Xem prompt AI | Có | Không | Không | Chỉ Admin |
| AI_PROMPT_UPDATE | Cập nhật prompt AI | Có | Không | Không | Chỉ Admin |
| AI_PROVIDER_CONFIG | Cấu hình provider AI | Có | Không | Không | Không lưu secret thật trong source |
| AI_COST_VIEW | Xem chi phí AI | Có | Không | Không | Nếu có cost monitoring |

### Quy định module AI Governance

- Chỉ Admin được xem log AI.
- Prompt AI cần được quản lý cẩn thận để tránh nội dung không an toàn.
- API key thật không được lưu trong source code.
- Nếu demo không có provider thật, dùng MockAI.

---

## 8.16. Module Knowledge Graph

| Permission code | Chức năng | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|---|
| GRAPH_VIEW | Xem Knowledge Graph | Có | Có | Có giới hạn | Staff xem graph liên quan thuốc/tương tác |
| GRAPH_QUERY | Truy vấn graph | Có | Có giới hạn | Không/Có giới hạn | Qua backend, không trực tiếp Neo4j |
| GRAPH_MANAGE_NODE | Quản lý node graph | Có | Không | Không | Chỉ Admin hoặc dữ liệu seed |
| GRAPH_MANAGE_RELATIONSHIP | Quản lý relationship graph | Có | Không | Không | Chỉ Admin hoặc dữ liệu seed |
| GRAPH_RAG_USE | Dùng graph làm context AI | Có | Có | Không | Nếu có Graph-RAG |

### Quy định module Knowledge Graph

- Người dùng không truy cập trực tiếp Neo4j.
- Backend kiểm soát query graph.
- Dữ liệu graph là dữ liệu mẫu phục vụ đồ án.
- Graph chỉ hỗ trợ tham khảo, không thay thế dữ liệu y khoa thật.

---

## 9. Quy tắc phân quyền

| Mã | Quy tắc |
|---|---|
| RP-01 | Người dùng phải đăng nhập trước khi truy cập hệ thống |
| RP-02 | Admin có quyền quản lý toàn bộ hệ thống |
| RP-03 | Nhân viên nhà thuốc chỉ được thao tác nghiệp vụ bán hàng, khách hàng, thanh toán, hóa đơn và cảnh báo trong đơn hàng |
| RP-04 | Nhân viên kho chỉ được thao tác nghiệp vụ nhập kho, tồn kho và cảnh báo kho |
| RP-05 | API phải kiểm tra quyền trước khi xử lý |
| RP-06 | Người dùng không đủ quyền nhận lỗi 403 Forbidden |
| RP-07 | Người dùng chưa đăng nhập nhận lỗi 401 Unauthorized |
| RP-08 | Frontend chỉ ẩn menu không đủ an toàn, backend vẫn phải kiểm tra role |
| RP-09 | Các thao tác quan trọng như thanh toán, nhập kho, cập nhật tồn kho nên được ghi log |
| RP-10 | Các thao tác AI quan trọng nên được lưu AI Audit Log |
| RP-11 | Staff không được sửa rule tương tác thuốc |
| RP-12 | Warehouse không được thanh toán hoặc tạo hóa đơn bán hàng |
| RP-13 | Chỉ Admin được xem báo cáo doanh thu tổng hợp |
| RP-14 | Chỉ Admin được quản lý prompt AI và cấu hình AI provider |
| RP-15 | Không role nào được dùng AI để chẩn đoán bệnh hoặc kê đơn thuốc |

---

## 10. Quy định lỗi phân quyền

| Mã lỗi | Tình huống | HTTP Status đề xuất | Thông báo gợi ý |
|---|---|---:|---|
| AUTH-401 | Người dùng chưa đăng nhập | 401 | Bạn cần đăng nhập để sử dụng chức năng này. |
| AUTH-403 | Người dùng không đủ quyền | 403 | Bạn không có quyền thực hiện thao tác này. |
| AUTH-404 | Tài nguyên không tồn tại hoặc không được phép xem | 404 | Không tìm thấy dữ liệu phù hợp. |
| AUTH-409 | Thao tác xung đột trạng thái | 409 | Không thể thực hiện do trạng thái hiện tại không hợp lệ. |
| AUTH-423 | Tài khoản bị khóa | 423 | Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin. |

### 10.1. Ví dụ tình huống bị từ chối

| Tình huống | Kết quả mong đợi |
|---|---|
| Staff gọi API tạo user | 403 Forbidden |
| Warehouse gọi API thanh toán | 403 Forbidden |
| Người chưa đăng nhập mở dashboard | 401 Unauthorized hoặc chuyển về login |
| Staff mở trang AI Audit Log | 403 Forbidden hoặc không hiển thị menu |
| Customer truy cập hệ thống nội bộ | Không có tài khoản, không được truy cập |
| Staff sửa rule tương tác thuốc | 403 Forbidden |

---

## 11. Phân quyền menu giao diện

| Menu / Màn hình | Admin | Staff | Warehouse | Ghi chú |
|---|---|---|---|---|
| Dashboard | Có | Có giới hạn | Có giới hạn | Admin xem đầy đủ hơn |
| User Management | Có | Không | Không | Chỉ Admin |
| Role Management | Có | Không | Không | Chỉ Admin |
| Medicine Management | Có | Xem/Tìm kiếm | Xem/Tìm kiếm | Admin sửa dữ liệu |
| Category Management | Có | Không | Không | Chỉ Admin |
| Inventory | Có | Xem | Có | Warehouse thao tác kho |
| Stock Import | Có | Không | Có | Warehouse chính |
| Supplier | Có | Không | Có giới hạn | Tùy phạm vi |
| Sales POS | Có | Có | Không | Staff chính |
| Interaction Alert | Có | Có | Không | Trong luồng bán hàng |
| Payment | Có | Có | Không | Staff chính |
| Invoice | Có | Có | Không | Staff chính |
| Customer | Có | Có | Không | Staff quản lý khi bán |
| Report | Có | Không | Có giới hạn | Warehouse có thể xem tồn kho |
| AI Copilot | Có | Có | Không | Nếu triển khai AI |
| AI Audit Log | Có | Không | Không | Chỉ Admin |
| Prompt Management | Có | Không | Không | Chỉ Admin |
| Knowledge Graph | Có | Có | Có giới hạn | Nếu triển khai graph |

---

## 12. Phân quyền dữ liệu

Phân quyền không chỉ nằm ở chức năng, mà còn liên quan đến phạm vi dữ liệu người dùng được xem hoặc sửa.

| Dữ liệu | Admin | Staff | Warehouse |
|---|---|---|---|
| User | Xem/sửa toàn bộ | Chỉ xem profile cá nhân | Chỉ xem profile cá nhân |
| Medicine | Xem/sửa toàn bộ | Xem | Xem |
| Inventory | Xem/sửa/điều chỉnh | Xem khi bán | Xem/cập nhật qua nhập kho |
| Stock Import | Xem toàn bộ | Không | Xem/tạo phiếu nhập |
| Order | Xem toàn bộ | Xem/tạo đơn bán | Không |
| Payment | Xem toàn bộ | Tạo/xem thanh toán đơn liên quan | Không |
| Invoice | Xem toàn bộ | Tạo/xem hóa đơn đơn liên quan | Không |
| Customer | Xem toàn bộ | Tạo/xem/sửa cơ bản | Không |
| Report | Xem toàn bộ | Không hoặc giới hạn | Xem báo cáo kho nếu có |
| DrugInteraction | Quản lý rule | Xem cảnh báo khi bán | Không |
| AI Log | Xem toàn bộ | Không | Không |
| Prompt AI | Quản lý | Không | Không |
| Graph Data | Xem/quản lý | Xem tham khảo | Xem giới hạn nếu cần |

---

## 13. Mapping actor với use case

| Use case | Admin | Staff | Warehouse | AI System | Neo4j |
|---|---|---|---|---|---|
| UC-01 Đăng nhập | Có | Có | Có | Không | Không |
| UC-02 Quản lý user | Có | Không | Không | Không | Không |
| UC-03 Quản lý thuốc | Có | Xem | Xem | Không | Không |
| UC-04 Quản lý tồn kho | Có | Xem | Có | Không | Không |
| UC-05 Nhập thuốc | Có | Không | Có | Không | Không |
| UC-06 Tạo đơn bán thuốc | Có | Có | Không | Không | Không |
| UC-07 Kiểm tra tương tác | Có | Có | Không | Không | Có thể cung cấp dữ liệu nếu dùng graph |
| UC-08 Thanh toán | Có | Có | Không | Không | Không |
| UC-09 Tạo hóa đơn | Có | Có | Không | Không | Không |
| UC-10 Quản lý khách hàng | Có | Có | Không | Không | Không |
| UC-11 Xem báo cáo | Có | Không | Có giới hạn | Không | Không |
| UC-12 Sử dụng AI Copilot | Có | Có | Không | Có | Có thể cung cấp context |
| UC-13 Xem AI Audit Log | Có | Không | Không | Không | Không |
| UC-14 Xem Knowledge Graph | Có | Có | Có giới hạn | Không | Có |

---

## 14. Yêu cầu kiểm thử phân quyền

| Mã test | Tình huống kiểm thử | Kết quả mong đợi |
|---|---|---|
| T-RBAC-01 | Admin đăng nhập và mở User Management | Truy cập thành công |
| T-RBAC-02 | Staff mở User Management | Bị chặn hoặc không thấy menu |
| T-RBAC-03 | Warehouse mở Sales POS | Bị chặn hoặc không thấy menu |
| T-RBAC-04 | Staff tạo đơn bán thuốc | Thành công |
| T-RBAC-05 | Warehouse tạo phiếu nhập thuốc | Thành công |
| T-RBAC-06 | Staff tạo phiếu nhập thuốc | Bị chặn |
| T-RBAC-07 | Staff thanh toán đơn hàng | Thành công |
| T-RBAC-08 | Warehouse thanh toán đơn hàng | Bị chặn |
| T-RBAC-09 | Admin xem báo cáo doanh thu | Thành công |
| T-RBAC-10 | Staff xem báo cáo doanh thu tổng hợp | Bị chặn hoặc không thấy menu |
| T-RBAC-11 | Admin xem AI Audit Log | Thành công nếu có AI |
| T-RBAC-12 | Staff xem AI Audit Log | Bị chặn |
| T-RBAC-13 | Người chưa đăng nhập gọi API nội bộ | 401 Unauthorized |
| T-RBAC-14 | Người sai quyền gọi API | 403 Forbidden |

---

## 15. Gợi ý thiết kế database phân quyền

Các bảng dữ liệu phân quyền có thể gồm:

| Bảng | Mục đích |
|---|---|
| users | Lưu thông tin tài khoản người dùng |
| roles | Lưu danh sách vai trò |
| user_roles | Gán vai trò cho người dùng |
| permissions | Lưu danh sách quyền chi tiết nếu làm permission-based |
| role_permissions | Gán permission cho role nếu cần mở rộng |
| audit_logs | Lưu thao tác quan trọng |

### 15.1. Mô hình tối giản cho MVP

Trong MVP, nhóm có thể dùng mô hình đơn giản:

```text
users
  id
  full_name
  username
  password_hash
  role_code
  status
```

Cách này đơn giản nhưng khó mở rộng nếu một user có nhiều role.

### 15.2. Mô hình khuyến nghị

Mô hình khuyến nghị nên dùng:

```text
users
  id
  full_name
  username
  password_hash
  status

roles
  id
  code
  name

user_roles
  user_id
  role_id
```

Nếu muốn chi tiết hơn:

```text
permissions
  id
  code
  name

role_permissions
  role_id
  permission_id
```

Với đồ án, nhóm có thể dùng role-based đơn giản và mô tả permission matrix trong tài liệu để chứng minh thiết kế.

---

## 16. Gợi ý thiết kế API authorization

| API nhóm | Role được phép |
|---|---|
| /auth/login | Public |
| /auth/logout | ADMIN, STAFF, WAREHOUSE |
| /users | ADMIN |
| /roles | ADMIN |
| /medicines | ADMIN, STAFF, WAREHOUSE tùy method |
| /categories | ADMIN, STAFF, WAREHOUSE tùy method |
| /inventory | ADMIN, STAFF, WAREHOUSE tùy method |
| /stock-imports | ADMIN, WAREHOUSE |
| /orders | ADMIN, STAFF |
| /payments | ADMIN, STAFF |
| /invoices | ADMIN, STAFF |
| /customers | ADMIN, STAFF |
| /reports | ADMIN, WAREHOUSE giới hạn nếu có |
| /interactions | ADMIN quản lý, STAFF xem cảnh báo |
| /ai/copilot | ADMIN, STAFF |
| /ai/logs | ADMIN |
| /ai/prompts | ADMIN |
| /graph | ADMIN, STAFF, WAREHOUSE giới hạn |

### 16.1. Nguyên tắc API

- API public chỉ nên gồm login hoặc health check.
- API nghiệp vụ bắt buộc cần token hợp lệ.
- API nhạy cảm cần kiểm tra role.
- Không dựa vào frontend để bảo vệ quyền.
- Trả lỗi rõ ràng nhưng không tiết lộ thông tin nhạy cảm.

---

## 17. Quy định an toàn với AI và dữ liệu nhạy cảm

Vì hệ thống liên quan đến thuốc, AI và thông tin khách hàng, quyền truy cập cần kiểm soát chặt hơn ở các phần sau:

| Khu vực | Quy định |
|---|---|
| AI Copilot | Chỉ Admin và Staff được sử dụng trong phạm vi tham khảo |
| AI Audit Log | Chỉ Admin xem |
| Prompt Management | Chỉ Admin quản lý |
| Customer Data | Admin và Staff được xem theo nghiệp vụ, không dùng dữ liệu thật trong demo |
| Interaction Rule | Chỉ Admin quản lý rule, Staff chỉ xem cảnh báo phát sinh |
| Graph Data | Dữ liệu mẫu, không dùng thay thế dữ liệu y khoa thật |
| Report Revenue | Chỉ Admin xem doanh thu tổng hợp |

Câu disclaimer chuẩn cần có ở màn hình cảnh báo/AI:

> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 18. Rủi ro phân quyền và biện pháp xử lý

| Rủi ro | Mô tả | Mức độ | Biện pháp xử lý |
|---|---|---|---|
| Chỉ ẩn menu nhưng không chặn API | Người dùng có thể gọi API trái quyền | Cao | Backend bắt buộc kiểm tra role |
| Staff xem báo cáo doanh thu | Lộ dữ liệu quản trị | Trung bình | Giới hạn report cho Admin |
| Warehouse thanh toán nhầm | Sai phạm vi nghiệp vụ | Trung bình | Chặn POS/Payment với Warehouse |
| Staff sửa dữ liệu thuốc | Dữ liệu thuốc bị thay đổi sai | Cao | Chỉ Admin được sửa thuốc |
| Không log thao tác quan trọng | Khó truy vết khi có lỗi | Trung bình | Lưu audit log cho nhập kho, thanh toán, AI |
| AI bị dùng sai mục đích | AI trả lời vượt phạm vi | Cao | Guardrail, prompt an toàn, giới hạn role |
| Dữ liệu khách hàng bị truy cập rộng | Rủi ro quyền riêng tư | Trung bình | Staff chỉ xem dữ liệu cần thiết |

---

## 19. Tiêu chí hoàn thành phân quyền

Phân quyền được xem là đạt yêu cầu khi:

1. Người dùng nội bộ đăng nhập được bằng tài khoản mẫu.
2. Mỗi tài khoản có vai trò rõ ràng.
3. Menu giao diện thay đổi theo vai trò.
4. API backend kiểm tra role trước khi xử lý.
5. Người chưa đăng nhập không truy cập được API nội bộ.
6. Người sai quyền nhận lỗi 403 Forbidden.
7. Admin truy cập được chức năng quản trị.
8. Staff truy cập được chức năng bán hàng.
9. Warehouse truy cập được chức năng kho.
10. Customer không có quyền truy cập hệ thống nội bộ trong MVP.
11. AI Audit Log và Prompt Management chỉ Admin xem/quản lý.
12. Có test case kiểm tra phân quyền.

---

## 20. Kết luận

Tài liệu **Actor, Role and Permission Matrix** đã xác định rõ các actor, role và quyền hạn trong hệ thống **PharmaAssist AI Intelligence**. Hệ thống sử dụng mô hình phân quyền theo vai trò, trong đó Admin có quyền quản trị cao nhất, Nhân viên nhà thuốc tập trung vào nghiệp vụ bán hàng, Nhân viên kho tập trung vào nghiệp vụ nhập kho và tồn kho, Khách hàng không đăng nhập trong MVP, còn AI System và Neo4j Graph là các actor hệ thống phục vụ chức năng nâng cao.

Ma trận phân quyền giúp nhóm phát triển thiết kế giao diện, backend API, database và test case một cách thống nhất. Đặc biệt, các chức năng nhạy cảm như quản lý user, báo cáo doanh thu, AI Audit Log, Prompt Management và quản lý rule tương tác thuốc cần được giới hạn cho Admin.

Việc kiểm soát quyền không chỉ thực hiện ở frontend bằng cách ẩn menu, mà phải được kiểm tra ở backend trước khi xử lý API. Đây là yêu cầu quan trọng để đảm bảo hệ thống an toàn, đúng nghiệp vụ và có thể giải thích rõ trong báo cáo đồ án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

