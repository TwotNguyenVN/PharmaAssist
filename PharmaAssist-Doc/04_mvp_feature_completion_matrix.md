# 04_MVP_FEATURE_COMPLETION_MATRIX

**Mã tài liệu:** 04_MVP_Feature_Completion_Matrix  
**Tên tài liệu:** MVP Feature Completion Matrix  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu ma trận chức năng và trạng thái hoàn thành MVP  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, Scrum Master/Leader, giảng viên hướng dẫn, tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **MVP Feature Completion Matrix** được sử dụng để xác định rõ các chức năng của hệ thống **PharmaAssist AI Intelligence** theo từng nhóm, từng mức độ ưu tiên và từng trạng thái hoàn thành. Tài liệu này giúp nhóm biết chức năng nào thuộc phạm vi MVP, chức năng nào là nâng cao, chức năng nào đã làm, đang làm, chỉ mới mô phỏng hoặc chưa thực hiện.

Trong một dự án đồ án Công Nghệ Phần Mềm, việc xác định phạm vi MVP rất quan trọng vì nhóm thường có nhiều ý tưởng nhưng thời gian triển khai có giới hạn. Nếu không có ma trận chức năng, nhóm dễ gặp các vấn đề như:

- Làm chức năng nâng cao trước khi hoàn thành chức năng lõi.
- Không biết chức năng nào bắt buộc phải demo.
- Không theo dõi được tiến độ từng module.
- Trùng lặp công việc giữa các thành viên.
- Thiếu bằng chứng quản lý phạm vi trong báo cáo.
- Không giải thích rõ với giảng viên phần nào đã làm thật, phần nào mô phỏng.

Vì vậy, tài liệu này đóng vai trò như một bảng kiểm soát phạm vi và tiến độ, giúp nhóm:

- Xác định danh sách chức năng cần có trong MVP.
- Phân biệt MVP và chức năng nâng cao.
- Theo dõi trạng thái triển khai của từng chức năng.
- Làm cơ sở chia backlog, sprint và task.
- Làm cơ sở viết test case.
- Làm cơ sở chuẩn bị demo.
- Làm cơ sở trình bày tiến độ trong báo cáo.

---

## 2. Ý nghĩa của MVP trong dự án

MVP là viết tắt của **Minimum Viable Product**, nghĩa là phiên bản sản phẩm tối thiểu có thể hoạt động và thể hiện được giá trị chính của hệ thống. Với dự án **PharmaAssist AI Intelligence**, MVP không cần bao gồm toàn bộ các tính năng nâng cao như AI Copilot, Neo4j Knowledge Graph, Graph-RAG hay Forecast tồn kho. Tuy nhiên, MVP cần chứng minh được hệ thống giải quyết bài toán cốt lõi của nhà thuốc.

MVP của PharmaAssist AI Intelligence cần tập trung vào các nghiệp vụ chính sau:

1. Người dùng đăng nhập vào hệ thống.
2. Hệ thống phân quyền theo vai trò.
3. Admin hoặc nhân viên quản lý thuốc.
4. Nhân viên kho quản lý tồn kho và nhập thuốc.
5. Nhân viên nhà thuốc tạo đơn bán thuốc.
6. Hệ thống kiểm tra tồn kho khi bán.
7. Hệ thống kiểm tra tương tác thuốc bằng dữ liệu mẫu.
8. Nhân viên ghi nhận thanh toán.
9. Hệ thống tạo hóa đơn.
10. Admin xem báo cáo cơ bản.

Điểm nổi bật bắt buộc nên có trong MVP là **cảnh báo tương tác thuốc rule-based**. Đây là chức năng giúp đề tài khác với một website quản lý bán hàng thông thường.

---

## 3. Phân loại chức năng

Để dễ theo dõi, các chức năng trong tài liệu được chia thành ba loại chính: **MVP**, **Advanced** và **Out-of-scope**.

| Loại | Ý nghĩa | Cách xử lý trong dự án |
|---|---|---|
| MVP | Chức năng cốt lõi cần có để hệ thống demo được | Ưu tiên làm trước, bắt buộc kiểm thử |
| MVP/Nâng cao | Chức năng nằm trong MVP nhưng có thể mở rộng nâng cao | Làm bản rule-based hoặc đơn giản trước, mở rộng sau |
| Advanced | Chức năng nâng cao giúp tăng độ khó và điểm kỹ thuật | Làm sau MVP, có thể mô phỏng nếu thiếu thời gian |
| Out-of-scope | Chức năng không thực hiện trong đồ án | Không đưa vào backlog triển khai |

---

## 4. Quy ước trạng thái

| Trạng thái | Ý nghĩa | Khi nào sử dụng |
|---|---|---|
| Planned | Dự kiến làm | Chức năng đã được đưa vào kế hoạch nhưng chưa bắt đầu triển khai |
| In Progress | Đang làm | Chức năng đang được phân tích, thiết kế, lập trình hoặc kiểm thử |
| Done | Đã hoàn thành | Chức năng đã lập trình xong, kiểm thử cơ bản đạt và có thể demo |
| Mocked | Có mô phỏng, chưa làm thật đầy đủ | Chức năng có giao diện hoặc dữ liệu giả lập để demo luồng, nhưng chưa triển khai đầy đủ logic thật |
| Deferred | Để sau | Chức năng được ghi nhận nhưng chưa triển khai trong giai đoạn hiện tại |
| Out-of-scope | Không làm trong đồ án | Chức năng không thuộc phạm vi đồ án hoặc vượt quá phạm vi MVP |

### 4.1. Ví dụ áp dụng trạng thái

| Ví dụ | Trạng thái phù hợp | Giải thích |
|---|---|---|
| Đăng nhập đã chạy được bằng username/password | Done | Chức năng hoạt động thật |
| Màn hình AI Copilot có giao diện và trả lời bằng dữ liệu mẫu | Mocked | Có thể demo nhưng chưa gọi AI provider thật |
| Neo4j đã thiết kế nhưng chưa cài đặt | Planned | Đã có kế hoạch nhưng chưa triển khai |
| Forecast tồn kho để sau khi MVP ổn định | Deferred | Chưa làm trong sprint hiện tại |
| Thanh toán online thật | Out-of-scope | Không thuộc phạm vi đồ án |

---

## 5. Quy ước mức ưu tiên

| Ưu tiên | Ý nghĩa | Hướng xử lý |
|---|---|---|
| High | Rất quan trọng, ảnh hưởng trực tiếp đến MVP | Cần làm sớm, có test case và demo |
| Medium | Quan trọng nhưng không chặn luồng MVP chính | Làm sau nhóm High nếu còn thời gian |
| Low | Có giá trị bổ sung nhưng không bắt buộc | Có thể để sau hoặc mô phỏng |

### 5.1. Nguyên tắc ưu tiên

Nhóm cần ưu tiên theo thứ tự:

1. Chức năng High thuộc MVP.
2. Chức năng Medium thuộc MVP.
3. Chức năng High thuộc Advanced nếu giúp tăng điểm demo.
4. Chức năng Low hoặc Deferred.
5. Không làm chức năng Out-of-scope.

---

## 6. Ma trận chức năng tổng quát

| ID | Chức năng | Nhóm | Loại | Trạng thái | Ưu tiên | Ghi chú |
|---|---|---|---|---|---|---|
| F-01 | Đăng nhập | Auth | MVP | Planned | High | Đăng nhập bằng username/password |
| F-02 | Phân quyền | Auth | MVP | Planned | High | Admin, Staff, Warehouse |
| F-03 | Quản lý thuốc | Medicine | MVP | Planned | High | CRUD thuốc |
| F-04 | Quản lý danh mục | Medicine | MVP | Planned | High | CRUD danh mục thuốc |
| F-05 | Tìm kiếm thuốc | Medicine | MVP | Planned | High | Tìm theo tên, mã, danh mục |
| F-06 | Quản lý tồn kho | Inventory | MVP | Planned | High | Xem số lượng tồn của từng thuốc |
| F-07 | Nhập thuốc | Inventory | MVP | Planned | High | Tạo phiếu nhập thuốc |
| F-08 | Cảnh báo sắp hết | Inventory | MVP | Planned | High | Theo ngưỡng tồn kho tối thiểu |
| F-09 | Cảnh báo gần hết hạn | Inventory | MVP | Planned | High | Theo số ngày cấu hình |
| F-10 | Quản lý khách hàng | Customer | MVP | Planned | Medium | Lưu tên, số điện thoại, ghi chú |
| F-11 | Tạo đơn bán thuốc | Sales | MVP | Planned | High | Màn hình POS bán thuốc |
| F-12 | Kiểm tra tồn kho khi bán | Sales | MVP | Planned | High | Không cho bán vượt tồn |
| F-13 | Kiểm tra tương tác thuốc | Rule Engine | MVP/Nâng cao | Planned | High | Rule-based bằng dữ liệu mẫu |
| F-14 | Ghi chú tư vấn | Sales | MVP | Planned | Medium | Nhân viên ghi chú khi có cảnh báo |
| F-15 | Thanh toán | Payment | MVP | Planned | High | Thanh toán mô phỏng tiền mặt/chuyển khoản |
| F-16 | Tạo hóa đơn | Invoice | MVP | Planned | High | Tạo hóa đơn sau thanh toán |
| F-17 | Báo cáo doanh thu | Report | MVP | Planned | Medium | Doanh thu theo ngày/tháng |
| F-18 | Thuốc bán chạy | Report | MVP | Planned | Medium | Top medicines theo số lượng bán |
| F-19 | AI Copilot | AI | Advanced | Mocked/Planned | Medium | Có thể dùng MockAI |
| F-20 | Neo4j Graph | Graph | Advanced | Mocked/Planned | Medium | Node-edge dữ liệu mẫu |
| F-21 | Graph-RAG | AI/Graph | Advanced | Mocked/Deferred | Medium | Có thể mô phỏng luồng truy xuất context |
| F-22 | AI Audit Log | AI Governance | Advanced | Planned | Medium | Lưu request/response AI |
| F-23 | Forecast tồn kho | Analytics | Advanced | Deferred | Low | Nếu còn thời gian |

---

## 7. Ma trận chức năng chi tiết theo nhóm

## 7.1. Nhóm Auth

Nhóm Auth chịu trách nhiệm xác thực người dùng và phân quyền truy cập hệ thống. Đây là nhóm chức năng bắt buộc trong MVP vì hệ thống có nhiều vai trò người dùng khác nhau.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-01 | Đăng nhập | MVP | Planned | High | Admin, Staff, Warehouse | Cho phép người dùng nội bộ đăng nhập bằng username và password | Người dùng nhập đúng tài khoản thì vào hệ thống, nhập sai thì báo lỗi |
| F-02 | Phân quyền | MVP | Planned | High | Admin, Staff, Warehouse | Hệ thống hiển thị chức năng theo vai trò | Admin, Staff, Warehouse nhìn thấy menu và API phù hợp |

### 7.1.1. Ghi chú triển khai Auth

- Có thể sử dụng JWT hoặc session.
- Mật khẩu cần lưu dưới dạng hash, không lưu plain text.
- Mỗi user có một hoặc nhiều role.
- Role tối thiểu gồm: Admin, Staff, Warehouse.
- Trong demo nên có tài khoản mẫu:
  - admin01.
  - pharmacist01 hoặc staff01.
  - warehouse01.

### 7.1.2. Rủi ro nhóm Auth

| Rủi ro | Ảnh hưởng | Cách xử lý |
|---|---|---|
| Phân quyền không rõ | Người dùng thấy sai chức năng | Thiết kế role-based access ngay từ đầu |
| Mật khẩu lưu không an toàn | Không phù hợp yêu cầu bảo mật | Dùng password hash |
| Quên kiểm tra quyền API | Người dùng có thể gọi API ngoài quyền | Tạo middleware kiểm tra role |

---

## 7.2. Nhóm Medicine

Nhóm Medicine quản lý dữ liệu thuốc và danh mục thuốc. Đây là nền tảng cho các chức năng tồn kho, bán hàng, cảnh báo tương tác và báo cáo.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-03 | Quản lý thuốc | MVP | Planned | High | Admin | Thêm, sửa, xem, tìm kiếm, cập nhật trạng thái thuốc | CRUD thuốc hoạt động và dữ liệu hiển thị đúng |
| F-04 | Quản lý danh mục | MVP | Planned | High | Admin | Quản lý nhóm/danh mục thuốc | Có thể tạo danh mục và gán thuốc vào danh mục |
| F-05 | Tìm kiếm thuốc | MVP | Planned | High | Admin, Staff, Warehouse | Tìm thuốc theo tên, mã hoặc danh mục | Kết quả tìm kiếm đúng với từ khóa |

### 7.2.1. Thông tin thuốc đề xuất

| Trường | Ý nghĩa |
|---|---|
| medicine_id | Mã định danh thuốc |
| code | Mã thuốc dùng trong hệ thống |
| name | Tên thuốc |
| category_id | Danh mục thuốc |
| unit | Đơn vị tính |
| selling_price | Giá bán |
| description | Mô tả ngắn |
| status | Trạng thái kinh doanh |
| created_at | Ngày tạo |
| updated_at | Ngày cập nhật |

### 7.2.2. Ghi chú triển khai Medicine

- Dữ liệu thuốc dùng trong đồ án là dữ liệu mẫu.
- Không cần mô tả công dụng điều trị chi tiết như phần mềm y tế thật.
- Nên có danh mục thuốc để tìm kiếm và lọc dễ hơn.
- Nên có trạng thái active/inactive để ẩn thuốc không còn bán.

---

## 7.3. Nhóm Inventory

Nhóm Inventory quản lý số lượng tồn kho, nhập thuốc, thuốc sắp hết và thuốc gần hết hạn. Đây là nhóm chức năng quan trọng vì ảnh hưởng trực tiếp đến nghiệp vụ bán hàng.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-06 | Quản lý tồn kho | MVP | Planned | High | Admin, Warehouse, Staff | Xem số lượng tồn của từng thuốc | Danh sách tồn kho hiển thị đúng số lượng |
| F-07 | Nhập thuốc | MVP | Planned | High | Warehouse | Tạo phiếu nhập và cập nhật tồn kho | Sau khi nhập, tồn kho tăng đúng |
| F-08 | Cảnh báo sắp hết | MVP | Planned | High | Admin, Warehouse | Cảnh báo thuốc có tồn kho dưới ngưỡng tối thiểu | Thuốc dưới min_stock xuất hiện trong danh sách cảnh báo |
| F-09 | Cảnh báo gần hết hạn | MVP | Planned | High | Admin, Warehouse | Cảnh báo thuốc có hạn dùng gần tới ngày cấu hình | Thuốc gần hết hạn xuất hiện trong danh sách cảnh báo |

### 7.3.1. Quy tắc tồn kho

| Quy tắc | Mô tả |
|---|---|
| Không bán vượt tồn | Nếu số lượng bán lớn hơn số lượng tồn, hệ thống không cho thêm hoặc không cho thanh toán |
| Tăng tồn khi nhập | Khi phiếu nhập được xác nhận, số lượng tồn tăng tương ứng |
| Giảm tồn khi bán | Khi thanh toán thành công, số lượng tồn giảm tương ứng |
| Cảnh báo sắp hết | Nếu tồn kho nhỏ hơn hoặc bằng ngưỡng tối thiểu, thuốc được cảnh báo |
| Cảnh báo gần hết hạn | Nếu hạn dùng nằm trong khoảng ngày cấu hình, thuốc được cảnh báo |

### 7.3.2. Ghi chú triển khai Inventory

- MVP có thể quản lý tồn kho theo từng thuốc, chưa cần quản lý nhiều lô phức tạp.
- Nếu muốn chi tiết hơn, có thể thêm batch_number và expiry_date.
- Nên có min_stock để cấu hình ngưỡng cảnh báo.
- Thuốc gần hết hạn có thể tính theo số ngày còn lại, ví dụ 30, 60 hoặc 90 ngày.

---

## 7.4. Nhóm Customer

Nhóm Customer lưu thông tin khách hàng cơ bản. Trong MVP, khách hàng không cần đăng nhập vào hệ thống.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-10 | Quản lý khách hàng | MVP | Planned | Medium | Staff, Admin | Lưu tên, số điện thoại, ghi chú và lịch sử mua hàng | Có thể tạo khách hàng và gắn khách hàng vào đơn hàng |

### 7.4.1. Thông tin khách hàng đề xuất

| Trường | Ý nghĩa |
|---|---|
| customer_id | Mã khách hàng |
| full_name | Họ tên khách hàng |
| phone | Số điện thoại |
| note | Ghi chú cơ bản |
| created_at | Ngày tạo |

### 7.4.2. Ghi chú triển khai Customer

- Không dùng dữ liệu cá nhân thật trong demo.
- Chỉ lưu thông tin cơ bản.
- Không bắt buộc khách hàng có tài khoản đăng nhập.
- Lịch sử mua hàng có thể lấy từ bảng orders.

---

## 7.5. Nhóm Sales

Nhóm Sales là nhóm chức năng trung tâm trong luồng bán thuốc tại quầy. Nhân viên nhà thuốc sử dụng nhóm chức năng này thường xuyên nhất.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-11 | Tạo đơn bán thuốc | MVP | Planned | High | Staff | Tạo đơn bán thuốc trên màn hình POS | Nhân viên tạo được đơn và thêm thuốc vào đơn |
| F-12 | Kiểm tra tồn kho khi bán | MVP | Planned | High | Staff | Kiểm tra số lượng tồn trước khi bán | Không cho bán vượt tồn |
| F-14 | Ghi chú tư vấn | MVP | Planned | Medium | Staff | Nhân viên ghi chú tư vấn khi có cảnh báo | Ghi chú được lưu cùng đơn hoặc cảnh báo |

### 7.5.1. Luồng bán thuốc cơ bản

1. Nhân viên mở màn hình bán thuốc.
2. Tìm kiếm thuốc theo tên hoặc mã.
3. Chọn thuốc và nhập số lượng.
4. Hệ thống kiểm tra tồn kho.
5. Nếu đủ tồn, thuốc được thêm vào đơn.
6. Nếu thiếu tồn, hệ thống hiển thị cảnh báo.
7. Nếu đơn có từ hai thuốc trở lên, hệ thống kiểm tra tương tác.
8. Nhân viên xem cảnh báo nếu có.
9. Nhân viên chọn khách hàng nếu cần.
10. Hệ thống tính tổng tiền.
11. Nhân viên chuyển sang thanh toán.

### 7.5.2. Ghi chú triển khai Sales

- Màn hình POS cần thao tác nhanh.
- Cần hiển thị tổng tiền rõ ràng.
- Cần hiển thị cảnh báo tương tác ngay trong luồng bán hàng.
- Ghi chú tư vấn nên gắn với đơn hàng hoặc interaction_alert.

---

## 7.6. Nhóm Rule Engine

Nhóm Rule Engine chịu trách nhiệm kiểm tra tương tác thuốc và các luật nghiệp vụ liên quan. Đây là điểm nổi bật của MVP và cũng là nền tảng để mở rộng AI/Graph sau này.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-13 | Kiểm tra tương tác thuốc | MVP/Nâng cao | Planned | High | Staff | Kiểm tra các cặp thuốc trong đơn hàng dựa trên dữ liệu mẫu | Khi đơn có cặp thuốc tương tác, hệ thống hiển thị cảnh báo |

### 7.6.1. Cách kiểm tra tương tác thuốc

Quy trình kiểm tra tương tác thuốc:

1. Lấy danh sách thuốc trong đơn hàng.
2. Nếu đơn hàng có ít hơn hai thuốc, không cần kiểm tra.
3. Nếu đơn hàng có từ hai thuốc trở lên, sinh tất cả các cặp thuốc có thể có.
4. Với mỗi cặp thuốc, kiểm tra trong bảng DrugInteraction.
5. Nếu tìm thấy tương tác, tạo cảnh báo.
6. Hiển thị cảnh báo cho nhân viên.
7. Cho phép nhân viên ghi chú tư vấn.
8. Lưu lịch sử cảnh báo nếu cần.

### 7.6.2. Dữ liệu cảnh báo đề xuất

| Trường | Ý nghĩa |
|---|---|
| interaction_id | Mã tương tác |
| medicine_a_id | Thuốc thứ nhất |
| medicine_b_id | Thuốc thứ hai |
| severity | Mức độ cảnh báo: nhẹ, trung bình, cao |
| description | Mô tả nguy cơ mẫu |
| recommendation | Khuyến nghị xử lý mẫu |
| is_active | Trạng thái áp dụng |

### 7.6.3. Nội dung cảnh báo hiển thị

Một cảnh báo tương tác thuốc nên hiển thị:

- Tên thuốc A.
- Tên thuốc B.
- Mức độ cảnh báo.
- Mô tả nguy cơ mẫu.
- Khuyến nghị xử lý mẫu.
- Ô ghi chú tư vấn.
- Disclaimer an toàn.

Câu disclaimer chuẩn:

> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 7.7. Nhóm Payment

Nhóm Payment ghi nhận thanh toán của đơn hàng. Trong phạm vi MVP, thanh toán chỉ được mô phỏng.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-15 | Thanh toán | MVP | Planned | High | Staff | Ghi nhận thanh toán tiền mặt hoặc chuyển khoản mô phỏng | Đơn hàng chuyển sang trạng thái đã thanh toán |

### 7.7.1. Quy tắc thanh toán

| Quy tắc | Mô tả |
|---|---|
| Không thanh toán đơn rỗng | Đơn hàng phải có ít nhất một thuốc |
| Không thanh toán nếu thiếu tồn | Hệ thống phải kiểm tra tồn kho trước khi thanh toán |
| Trừ kho sau thanh toán | Tồn kho chỉ giảm khi thanh toán thành công |
| Tạo hóa đơn sau thanh toán | Hóa đơn được tạo sau khi đơn đã thanh toán |

### 7.7.2. Phương thức thanh toán MVP

- Tiền mặt.
- Chuyển khoản mô phỏng.

Không tích hợp cổng thanh toán thật như VNPay, Momo, ZaloPay hoặc thẻ ngân hàng trong phạm vi đồ án.

---

## 7.8. Nhóm Invoice

Nhóm Invoice tạo hóa đơn sau khi đơn hàng được thanh toán.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-16 | Tạo hóa đơn | MVP | Planned | High | Staff, Admin | Tạo hóa đơn từ đơn hàng đã thanh toán | Hóa đơn hiển thị đúng thông tin thuốc, số lượng, tổng tiền |

### 7.8.1. Thông tin hóa đơn

| Trường | Ý nghĩa |
|---|---|
| invoice_code | Mã hóa đơn |
| order_id | Đơn hàng liên quan |
| customer_name | Tên khách hàng nếu có |
| staff_name | Nhân viên bán hàng |
| items | Danh sách thuốc trong đơn |
| total_amount | Tổng tiền |
| payment_method | Phương thức thanh toán |
| created_at | Ngày tạo hóa đơn |

### 7.8.2. Ghi chú triển khai Invoice

- MVP chỉ cần xem hoặc in hóa đơn đơn giản.
- Có thể xuất PDF nếu nhóm đủ thời gian, nhưng không bắt buộc.
- Hóa đơn cần hiển thị rõ tên thuốc, số lượng, đơn giá và tổng tiền.

---

## 7.9. Nhóm Report

Nhóm Report hỗ trợ Admin theo dõi hoạt động của nhà thuốc. Đây là nhóm chức năng MVP nhưng có thể triển khai ở mức cơ bản trước.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-17 | Báo cáo doanh thu | MVP | Planned | Medium | Admin | Thống kê doanh thu theo ngày/tháng | Hiển thị tổng doanh thu từ đơn hàng đã thanh toán |
| F-18 | Thuốc bán chạy | MVP | Planned | Medium | Admin | Thống kê thuốc bán chạy theo số lượng bán | Hiển thị danh sách top medicines |

### 7.9.1. Báo cáo MVP đề xuất

| Báo cáo | Mô tả |
|---|---|
| Doanh thu theo ngày | Tổng tiền các đơn đã thanh toán trong ngày |
| Doanh thu theo tháng | Tổng tiền các đơn đã thanh toán trong tháng |
| Thuốc bán chạy | Xếp hạng thuốc theo số lượng bán |
| Tồn kho thấp | Danh sách thuốc dưới ngưỡng tối thiểu |
| Thuốc gần hết hạn | Danh sách thuốc sắp đến hạn dùng |

---

## 7.10. Nhóm AI

Nhóm AI là phần nâng cao giúp hệ thống nổi bật hơn. Tuy nhiên, AI không nên làm trước khi MVP ổn định.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-19 | AI Copilot | Advanced | Mocked/Planned | Medium | Staff | AI hỗ trợ tạo câu hỏi, giải thích cảnh báo, tạo ghi chú tư vấn | Có thể demo bằng MockAI hoặc provider thật |

### 7.10.1. Phạm vi AI Copilot

AI Copilot có thể hỗ trợ:

- Tạo câu hỏi bổ sung cho phiên tư vấn.
- Giải thích cảnh báo tương tác bằng ngôn ngữ dễ hiểu.
- Tạo ghi chú tư vấn tham khảo.
- Tóm tắt phiên tư vấn.
- Tạo báo cáo vận hành nếu có dữ liệu.

### 7.10.2. Ràng buộc AI

AI bắt buộc phải tuân thủ:

- Không chẩn đoán bệnh.
- Không kê đơn thuốc.
- Không khẳng định thuốc chắc chắn an toàn.
- Không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- Nội dung AI phải có disclaimer.
- Người dùng phải xác nhận nội dung AI trước khi lưu.

---

## 7.11. Nhóm Graph

Nhóm Graph là phần nâng cao dùng Neo4j hoặc mô phỏng node-edge để biểu diễn quan hệ thuốc, hoạt chất, triệu chứng, bệnh nền và tương tác.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-20 | Neo4j Graph | Advanced | Mocked/Planned | Medium | Admin, Staff | Lưu và hiển thị node-edge mẫu | Có graph dữ liệu mẫu và truy vấn được quan hệ cơ bản |

### 7.11.1. Node đề xuất

| Node | Ý nghĩa |
|---|---|
| Medicine | Thuốc |
| ActiveIngredient | Hoạt chất |
| DrugGroup | Nhóm thuốc |
| Symptom | Triệu chứng mẫu |
| Condition | Bệnh nền/tình trạng mẫu |
| Interaction | Tương tác |
| RedFlag | Dấu hiệu nguy hiểm |
| Recommendation | Khuyến nghị tham khảo |

### 7.11.2. Relationship đề xuất

| Relationship | Ý nghĩa |
|---|---|
| CONTAINS | Thuốc chứa hoạt chất |
| BELONGS_TO | Thuốc thuộc nhóm |
| INTERACTS_WITH | Thuốc/hoạt chất tương tác với nhau |
| TREATS_SYMPTOM | Nhóm thuốc hỗ trợ triệu chứng mẫu |
| CAUTION_WITH | Cần thận trọng với bệnh nền mẫu |
| HAS_REDFLAG | Triệu chứng có dấu hiệu cần lưu ý |
| HAS_RECOMMENDATION | Tương tác có khuyến nghị tham khảo |

---

## 7.12. Nhóm AI/Graph

Nhóm AI/Graph kết hợp dữ liệu graph với AI để tạo luồng Graph-RAG. Đây là phần nâng cao và có thể mô phỏng nếu không đủ thời gian.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-21 | Graph-RAG | Advanced | Mocked/Deferred | Medium | Staff | Truy xuất graph làm context cho AI | Có mô phỏng hoặc triển khai luồng query graph rồi gọi AI |

### 7.12.1. Luồng Graph-RAG đề xuất

1. Nhân viên nhập thông tin tư vấn hoặc chọn thuốc trong đơn.
2. Backend xác định thuốc, hoạt chất hoặc triệu chứng liên quan.
3. Graph Service truy vấn Neo4j để lấy quan hệ liên quan.
4. Backend tạo context ngắn từ kết quả graph.
5. AI Orchestrator đưa context vào prompt.
6. Guardrail kiểm tra input.
7. AI sinh nội dung hỗ trợ tham khảo.
8. Guardrail kiểm tra output.
9. Hệ thống lưu AI Audit Log.
10. Người dùng xem và xác nhận nội dung.

---

## 7.13. Nhóm AI Governance

Nhóm AI Governance giúp kiểm soát và truy vết các tác vụ AI.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-22 | AI Audit Log | Advanced | Planned | Medium | Admin | Lưu request/response AI, provider, prompt version, trạng thái | Admin xem được danh sách log AI |

### 7.13.1. Thông tin AI Audit Log đề xuất

| Trường | Ý nghĩa |
|---|---|
| log_id | Mã log |
| user_id | Người gọi AI |
| action_type | Loại tác vụ AI |
| provider | Nhà cung cấp AI hoặc MockAI |
| model | Model sử dụng nếu có |
| prompt_version | Phiên bản prompt |
| input_summary | Tóm tắt input |
| output_summary | Tóm tắt output |
| status | Thành công/thất bại/bị guardrail chặn |
| created_at | Thời điểm gọi AI |

---

## 7.14. Nhóm Analytics

Nhóm Analytics là phần nâng cao dùng để dự báo tồn kho hoặc phân tích vận hành.

| ID | Chức năng | Loại | Trạng thái | Ưu tiên | Actor | Mô tả chi tiết | Điều kiện hoàn thành |
|---|---|---|---|---|---|---|---|
| F-23 | Forecast tồn kho | Advanced | Deferred | Low | Admin, Warehouse | Dự báo nguy cơ hết hàng dựa trên lịch sử bán | Có bảng dự báo hoặc gợi ý nhập hàng nếu còn thời gian |

### 7.14.1. Cách forecast đơn giản đề xuất

Công thức MVP có thể dùng:

```text
Số ngày còn bán được = Số lượng tồn hiện tại / Số lượng bán trung bình mỗi ngày
```

Ví dụ:

- Thuốc A còn 100 viên.
- Trung bình bán 10 viên/ngày.
- Số ngày còn bán được = 100 / 10 = 10 ngày.
- Nếu nhỏ hơn ngưỡng cảnh báo, hệ thống đề xuất nhập thêm.

---

## 8. Ma trận Must-have / Should-have / Could-have

| Mức | Chức năng | ID liên quan | Ghi chú |
|---|---|---|---|
| Must-have | Đăng nhập | F-01 | Bắt buộc để vào hệ thống |
| Must-have | Phân quyền | F-02 | Bắt buộc vì có nhiều actor |
| Must-have | Quản lý thuốc | F-03 | Nền tảng cho kho và bán hàng |
| Must-have | Quản lý danh mục | F-04 | Hỗ trợ phân loại thuốc |
| Must-have | Tìm kiếm thuốc | F-05 | Cần cho bán hàng tại quầy |
| Must-have | Quản lý tồn kho | F-06 | Cần để biết số lượng còn lại |
| Must-have | Nhập thuốc | F-07 | Cần để tăng tồn kho |
| Must-have | Cảnh báo sắp hết | F-08 | Nghiệp vụ kho quan trọng |
| Must-have | Cảnh báo gần hết hạn | F-09 | Nghiệp vụ đặc thù của thuốc |
| Must-have | Tạo đơn bán thuốc | F-11 | Luồng chính của hệ thống |
| Must-have | Kiểm tra tồn kho khi bán | F-12 | Tránh bán vượt tồn |
| Must-have | Kiểm tra tương tác thuốc | F-13 | Điểm nổi bật của đề tài |
| Must-have | Thanh toán | F-15 | Hoàn tất đơn hàng |
| Must-have | Tạo hóa đơn | F-16 | Kết quả sau thanh toán |
| Should-have | Quản lý khách hàng | F-10 | Hỗ trợ lịch sử mua hàng |
| Should-have | Ghi chú tư vấn | F-14 | Hữu ích khi có cảnh báo |
| Should-have | Báo cáo doanh thu | F-17 | Hỗ trợ Admin |
| Should-have | Thuốc bán chạy | F-18 | Hỗ trợ quyết định nhập hàng |
| Could-have | AI Copilot | F-19 | Nâng cao điểm kỹ thuật |
| Could-have | Neo4j Graph | F-20 | Nâng cao độ khó |
| Could-have | Graph-RAG | F-21 | Rất khó, có thể mô phỏng |
| Could-have | AI Audit Log | F-22 | Tăng tính quản trị AI |
| Could-have | Forecast tồn kho | F-23 | Nếu còn thời gian |

---

## 9. Mức độ sẵn sàng cho demo

Bảng này dùng để xác định chức năng nào cần có trong kịch bản demo chính.

| ID | Chức năng | Có trong demo chính? | Mức độ cần ổn định | Ghi chú demo |
|---|---|---|---|---|
| F-01 | Đăng nhập | Có | Rất cao | Dùng tài khoản mẫu |
| F-02 | Phân quyền | Có | Cao | Có thể demo bằng menu khác nhau |
| F-03 | Quản lý thuốc | Có | Cao | Demo danh sách và tìm kiếm thuốc |
| F-04 | Quản lý danh mục | Có thể | Trung bình | Không cần demo sâu |
| F-05 | Tìm kiếm thuốc | Có | Rất cao | Cần cho POS |
| F-06 | Quản lý tồn kho | Có | Cao | Xem số lượng tồn |
| F-07 | Nhập thuốc | Có thể | Trung bình | Demo nếu còn thời gian |
| F-08 | Cảnh báo sắp hết | Có | Cao | Nên có dữ liệu mẫu |
| F-09 | Cảnh báo gần hết hạn | Có | Cao | Nên có dữ liệu mẫu |
| F-10 | Quản lý khách hàng | Có thể | Trung bình | Tạo khách hàng trong đơn bán |
| F-11 | Tạo đơn bán thuốc | Có | Rất cao | Luồng demo chính |
| F-12 | Kiểm tra tồn kho khi bán | Có | Rất cao | Test bán vượt tồn |
| F-13 | Kiểm tra tương tác thuốc | Có | Rất cao | Điểm nhấn demo |
| F-14 | Ghi chú tư vấn | Có | Trung bình | Ghi chú sau cảnh báo |
| F-15 | Thanh toán | Có | Rất cao | Hoàn tất đơn |
| F-16 | Tạo hóa đơn | Có | Rất cao | Kết quả cuối luồng bán hàng |
| F-17 | Báo cáo doanh thu | Có | Trung bình | Demo dashboard/report |
| F-18 | Thuốc bán chạy | Có thể | Trung bình | Demo nếu có dữ liệu đủ |
| F-19 | AI Copilot | Có thể | Trung bình | Demo bằng MockAI nếu chưa tích hợp thật |
| F-20 | Neo4j Graph | Có thể | Trung bình | Demo graph mẫu |
| F-21 | Graph-RAG | Có thể | Thấp/Trung bình | Có thể mô phỏng luồng |
| F-22 | AI Audit Log | Có thể | Trung bình | Demo nếu có AI |
| F-23 | Forecast tồn kho | Không bắt buộc | Thấp | Để sau nếu thiếu thời gian |

---

## 10. Thống kê chức năng theo loại

| Loại chức năng | Số lượng | Danh sách ID |
|---|---:|---|
| MVP | 18 | F-01 đến F-18, trong đó F-13 là MVP/Nâng cao |
| Advanced | 5 | F-19, F-20, F-21, F-22, F-23 |
| High priority | 14 | F-01, F-02, F-03, F-04, F-05, F-06, F-07, F-08, F-09, F-11, F-12, F-13, F-15, F-16 |
| Medium priority | 8 | F-10, F-14, F-17, F-18, F-19, F-20, F-21, F-22 |
| Low priority | 1 | F-23 |

---

## 11. Thống kê chức năng theo trạng thái ban đầu

Tại thời điểm lập kế hoạch ban đầu, trạng thái chức năng được ghi nhận như sau:

| Trạng thái | Số lượng | Chức năng |
|---|---:|---|
| Planned | 20 | F-01 đến F-18, F-22, một phần F-19/F-20 |
| Mocked/Planned | 2 | F-19, F-20 |
| Mocked/Deferred | 1 | F-21 |
| Deferred | 1 | F-23 |
| Done | 0 | Chưa có chức năng hoàn thành tại giai đoạn lập kế hoạch |
| In Progress | 0 | Sẽ cập nhật khi bắt đầu sprint |
| Out-of-scope | 0 trong ma trận này | Các chức năng ngoài phạm vi được quản lý ở tài liệu Vision/Scope |

---

## 12. Mapping chức năng với Sprint đề xuất

| Sprint | Mục tiêu | Chức năng liên quan | Kết quả mong đợi |
|---|---|---|---|
| Sprint 1 | Nền tảng hệ thống | F-01, F-02, F-03, F-04 | Đăng nhập, phân quyền, quản lý thuốc/danh mục cơ bản |
| Sprint 2 | Kho thuốc | F-05, F-06, F-07, F-08, F-09 | Tìm kiếm thuốc, nhập thuốc, tồn kho, cảnh báo kho |
| Sprint 3 | Bán hàng | F-10, F-11, F-12, F-15, F-16 | Tạo đơn, kiểm tra tồn, thanh toán, hóa đơn |
| Sprint 4 | Cảnh báo và báo cáo | F-13, F-14, F-17, F-18 | Cảnh báo tương tác, ghi chú tư vấn, báo cáo cơ bản |
| Sprint 5 | AI/Graph nâng cao | F-19, F-20, F-21, F-22 | AI Copilot, Graph, Audit Log hoặc mô phỏng |
| Sprint 6 | Hoàn thiện và demo | Tất cả chức năng demo | Fix bug, test, chuẩn bị dữ liệu và kịch bản demo |

---

## 13. Mapping chức năng với tài liệu liên quan

| Chức năng | Tài liệu liên quan |
|---|---|
| Auth, phân quyền | SRS, Use Case, API Specification, Test Case |
| Quản lý thuốc | SRS, ERD, API Specification, UI Wireframe |
| Quản lý tồn kho | BRD, SRS, ERD, Activity Diagram, Test Case |
| Bán thuốc | Use Case, Activity Diagram, Sequence Diagram, API Specification |
| Tương tác thuốc | SRS, Rule Engine Design, Sequence Diagram, Test Case |
| Thanh toán, hóa đơn | SRS, ERD, API Specification, UI Wireframe |
| Báo cáo | Report Requirement, Database Query, Test Case |
| AI Copilot | AI Architecture, Prompt Document, Guardrail Document |
| Neo4j Graph | Knowledge Graph Design, Cypher Query Document |
| Graph-RAG | AI Architecture, Graph-RAG Flow, Sequence Diagram |
| AI Audit Log | AI Governance Document, ERD, API Specification |
| Forecast | Analytics Design, Report Document |

---

## 14. Tiêu chí chuyển trạng thái sang Done

Một chức năng chỉ được đánh dấu **Done** khi đáp ứng đầy đủ các tiêu chí sau:

| Tiêu chí | Mô tả |
|---|---|
| Có giao diện hoặc API hoạt động | Người dùng có thể thao tác hoặc frontend có thể gọi API |
| Logic nghiệp vụ đúng | Chức năng xử lý đúng theo yêu cầu đã mô tả |
| Có dữ liệu test | Có dữ liệu mẫu để kiểm tra chức năng |
| Đã test luồng chính | Tester hoặc thành viên khác kiểm tra thành công |
| Không lỗi nghiêm trọng | Không có lỗi chặn demo |
| Có thể demo | Chức năng có thể trình bày trong buổi bảo vệ nếu cần |
| Tài liệu liên quan đã cập nhật | SRS/API/Test Case được cập nhật nếu có thay đổi |

---

## 15. Tiêu chí chấp nhận MVP hoàn thành

MVP được xem là hoàn thành khi các điều kiện sau được đáp ứng:

1. Người dùng đăng nhập được bằng tài khoản mẫu.
2. Hệ thống phân quyền được theo vai trò.
3. Admin quản lý được thuốc và danh mục thuốc.
4. Nhân viên kho nhập thuốc và xem tồn kho được.
5. Hệ thống hiển thị cảnh báo thuốc sắp hết.
6. Hệ thống hiển thị cảnh báo thuốc gần hết hạn.
7. Nhân viên nhà thuốc tạo được đơn bán thuốc.
8. Hệ thống không cho bán vượt tồn kho.
9. Hệ thống kiểm tra tương tác thuốc bằng dữ liệu mẫu.
10. Cảnh báo tương tác hiển thị đúng thông tin cần thiết.
11. Nhân viên ghi nhận thanh toán được.
12. Hệ thống tạo hóa đơn sau thanh toán.
13. Admin xem được báo cáo cơ bản.
14. Dữ liệu demo đã được chuẩn bị.
15. Các màn hình chính không lỗi nghiêm trọng khi demo.

---

## 16. Các chức năng không đưa vào ma trận MVP

Một số chức năng không đưa vào ma trận triển khai vì không thuộc phạm vi đồ án hoặc không phù hợp MVP.

| Chức năng | Trạng thái | Lý do |
|---|---|---|
| Thanh toán online thật | Out-of-scope | Cần tích hợp cổng thanh toán thật và xử lý bảo mật phức tạp |
| Kê đơn bằng AI | Out-of-scope | Không an toàn và vượt phạm vi đồ án |
| Chẩn đoán bệnh | Out-of-scope | Không thuộc phạm vi hệ thống quản lý nhà thuốc |
| Mobile app | Out-of-scope | Tập trung vào website |
| Quản lý nhiều chi nhánh | Deferred/Out-of-scope | Có thể phát triển sau MVP |
| Tích hợp bảo hiểm y tế | Out-of-scope | Phức tạp, không phù hợp đồ án |
| Dữ liệu y khoa thật | Out-of-scope | Cần chuyên gia kiểm định |

---

## 17. Rủi ro liên quan đến phạm vi chức năng

| Rủi ro | Mô tả | Ảnh hưởng | Cách xử lý |
|---|---|---|---|
| Làm AI trước MVP | Nhóm tập trung vào AI nhưng chức năng lõi chưa xong | Không demo được luồng chính | Ưu tiên Must-have trước |
| Chức năng quá nhiều | Phạm vi vượt khả năng triển khai | Trễ deadline | Dùng trạng thái Deferred cho chức năng chưa cần |
| Không phân biệt Mocked và Done | Demo gây hiểu nhầm là đã làm thật | Bị hỏi khó khi bảo vệ | Ghi rõ chức năng nào là mô phỏng |
| Thiếu cảnh báo tương tác | Mất điểm nổi bật của đề tài | Đồ án giống CRUD thông thường | Đưa F-13 vào High priority |
| Không có dữ liệu demo | Chức năng có code nhưng không demo được | Demo kém thuyết phục | Chuẩn bị seed data sớm |
| Không cập nhật trạng thái | Nhóm không biết tiến độ thật | Quản lý dự án kém | Cập nhật ma trận sau mỗi sprint |

---

## 18. Cách sử dụng tài liệu trong quá trình phát triển

Tài liệu này nên được sử dụng xuyên suốt dự án theo cách sau:

| Thời điểm | Cách sử dụng |
|---|---|
| Trước khi code | Dùng để chốt chức năng MVP và chia backlog |
| Khi lập sprint | Chọn chức năng High priority đưa vào sprint sớm |
| Khi phát triển | Cập nhật trạng thái Planned, In Progress, Done |
| Khi kiểm thử | Dựa vào danh sách chức năng để viết test case |
| Khi chuẩn bị demo | Chọn các chức năng có trong demo chính |
| Khi viết báo cáo | Dùng làm bằng chứng quản lý phạm vi và tiến độ |
| Khi bảo vệ | Giải thích rõ phần nào đã làm thật, phần nào mô phỏng, phần nào để sau |

---

## 19. Kết luận phạm vi

Phiên bản MVP của **PharmaAssist AI Intelligence** tập trung vào các chức năng quản lý nhà thuốc, bao gồm đăng nhập, phân quyền, quản lý thuốc, quản lý danh mục, quản lý tồn kho, nhập thuốc, cảnh báo thuốc sắp hết, cảnh báo thuốc gần hết hạn, tạo đơn bán thuốc, kiểm tra tồn kho khi bán, kiểm tra tương tác thuốc rule-based, thanh toán, hóa đơn và báo cáo cơ bản.

Trong đó, chức năng **kiểm tra tương tác thuốc bằng rule-based data** là điểm nổi bật quan trọng nhất của MVP. Chức năng này giúp hệ thống khác với một website CRUD thông thường và thể hiện rõ xử lý nghiệp vụ đặc thù của nhà thuốc.

Các chức năng như **AI Copilot**, **Neo4j Knowledge Graph**, **Graph-RAG**, **AI Audit Log** và **Forecast tồn kho** được xem là phần nâng cao. Nhóm có thể triển khai thật, mô phỏng hoặc để sau tùy vào thời gian và năng lực kỹ thuật. Nếu triển khai được các phần này, đồ án sẽ có khả năng đạt mức Khó hoặc Rất Khó.

Tuy nhiên, nhóm cần ưu tiên hoàn thành MVP trước khi mở rộng AI/Graph. Việc kiểm soát phạm vi rõ ràng sẽ giúp dự án có sản phẩm chạy được, tài liệu đầy đủ, demo ổn định và thể hiện tốt quy trình Công Nghệ Phần Mềm.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

