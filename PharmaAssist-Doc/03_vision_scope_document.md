# 03_VISION_SCOPE_DOCUMENT

**Mã tài liệu:** 03_Vision_Scope_Document  
**Tên tài liệu:** Vision and Scope Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu tầm nhìn sản phẩm và phạm vi dự án  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, người phân tích nghiệp vụ, thiết kế hệ thống, tester, người chuẩn bị báo cáo và demo  

---

## 1. Mục đích tài liệu

Tài liệu **Vision and Scope Document** mô tả tầm nhìn sản phẩm và phạm vi thực hiện của hệ thống **PharmaAssist AI Intelligence**. Đây là tài liệu giúp nhóm xác định rõ hệ thống cần hướng tới điều gì, phục vụ ai, tạo ra giá trị gì và giới hạn triển khai trong phạm vi đồ án ra sao.

Trong đồ án môn **Công Nghệ Phần Mềm**, tài liệu này có vai trò rất quan trọng vì nó giúp nhóm tránh tình trạng mở rộng chức năng quá mức, đồng thời giữ cho các tài liệu phân tích, thiết kế, lập trình, kiểm thử và demo thống nhất với nhau.

Tài liệu này được sử dụng để:

- Xác định tầm nhìn dài hạn của sản phẩm.
- Làm rõ bài toán mà hệ thống cần giải quyết.
- Xác định người dùng mục tiêu và nhu cầu của từng nhóm người dùng.
- Nêu rõ giá trị sản phẩm mang lại cho nhà thuốc.
- Phân định chức năng trong phạm vi và ngoài phạm vi.
- Chốt phạm vi MVP để nhóm ưu tiên triển khai trước.
- Xác định các chức năng nâng cao có thể triển khai nếu đủ thời gian.
- Ghi nhận các ràng buộc về an toàn, dữ liệu và AI.

Tài liệu này là cơ sở đầu vào cho các tài liệu tiếp theo như:

- Business Requirement Document.
- Software Requirement Specification.
- Use Case Specification.
- Product Backlog.
- Sprint Plan.
- System Architecture Document.
- ERD/Data Dictionary.
- UI/UX Requirement Document.
- Test Plan.
- Demo Script.

---

## 2. Bối cảnh sản phẩm

Nhà thuốc là một môi trường nghiệp vụ có nhiều hoạt động diễn ra liên tục, bao gồm bán thuốc, tư vấn khách hàng, nhập hàng, kiểm tra tồn kho, theo dõi hạn dùng, thanh toán, in hóa đơn và lập báo cáo. Với các nhà thuốc nhỏ và vừa, những công việc này thường được thực hiện bằng sổ sách, Excel hoặc phần mềm bán hàng đơn giản.

Tuy nhiên, thuốc là loại hàng hóa đặc thù vì có các yếu tố cần kiểm soát như:

- Tên thuốc.
- Hoạt chất.
- Nhóm thuốc.
- Đơn vị tính.
- Giá bán.
- Số lượng tồn.
- Hạn sử dụng.
- Nhà cung cấp.
- Lịch sử nhập thuốc.
- Lịch sử bán thuốc.
- Cảnh báo tương tác thuốc.
- Ghi chú tư vấn.

Nếu hệ thống quản lý không tốt, nhà thuốc có thể gặp nhiều vấn đề như bán vượt tồn kho, không phát hiện thuốc sắp hết, bỏ sót thuốc gần hết hạn, sai lệch doanh thu, khó tra cứu lịch sử khách hàng hoặc không phát hiện các cặp thuốc có nguy cơ tương tác khi bán nhiều thuốc cùng lúc.

**PharmaAssist AI Intelligence** được định hướng là một website hỗ trợ nhà thuốc giải quyết các vấn đề trên bằng cách số hóa quy trình quản lý, hỗ trợ bán hàng, cảnh báo nghiệp vụ và cung cấp báo cáo. Điểm nổi bật của hệ thống là có thể phát triển theo hướng thông minh hơn thông qua AI Copilot, Knowledge Graph, Graph-RAG, Guardrail và Audit Log.

---

## 3. Vision Statement

**PharmaAssist AI Intelligence hướng tới trở thành một hệ thống website hỗ trợ nhà thuốc quản lý hoạt động bán thuốc, tồn kho, khách hàng, hóa đơn và báo cáo một cách hiệu quả. Hệ thống có điểm nổi bật là cảnh báo tương tác thuốc bằng dữ liệu mẫu và có thể mở rộng với AI Copilot, Knowledge Graph và Graph-RAG để hỗ trợ dược sĩ/nhân viên nhà thuốc trong quá trình tư vấn tham khảo.**

Tầm nhìn của sản phẩm không chỉ dừng lại ở một website CRUD quản lý thuốc thông thường. Hệ thống được định hướng trở thành một nền tảng hỗ trợ vận hành nhà thuốc có khả năng:

- Quản lý dữ liệu thuốc tập trung.
- Hỗ trợ nhân viên bán thuốc nhanh và chính xác hơn.
- Kiểm soát tồn kho và hạn dùng tốt hơn.
- Cảnh báo các tình huống cần lưu ý trong quá trình bán hàng.
- Hỗ trợ chủ nhà thuốc theo dõi doanh thu và tồn kho.
- Tạo nền tảng để tích hợp AI có kiểm soát.
- Biểu diễn quan hệ thuốc và tương tác bằng Knowledge Graph.
- Lưu vết các thao tác AI để tăng tính minh bạch.

Trong phạm vi đồ án, hệ thống không được định hướng trở thành phần mềm y tế thực tế hay hệ thống tư vấn điều trị. Các chức năng liên quan đến cảnh báo thuốc và AI chỉ đóng vai trò hỗ trợ tham khảo, dùng dữ liệu mẫu và cần có xác nhận của con người.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 4. Product Positioning Statement

Đối với các nhà thuốc nhỏ và vừa cần một công cụ hỗ trợ quản lý bán hàng, tồn kho và cảnh báo nghiệp vụ, **PharmaAssist AI Intelligence** là một website quản lý nhà thuốc thông minh giúp tập trung dữ liệu thuốc, hỗ trợ bán thuốc tại quầy, kiểm tra tồn kho, tạo hóa đơn, báo cáo doanh thu và cảnh báo tương tác thuốc bằng rule-based data.

Khác với các phần mềm quản lý bán hàng thông thường chỉ tập trung vào CRUD và hóa đơn, PharmaAssist AI Intelligence bổ sung các thành phần nâng cao như AI Pharmacist Copilot, Neo4j Knowledge Graph, Graph-RAG, Guardrail và Audit Log để tạo điểm mới kỹ thuật và thể hiện mức độ phân tích, thiết kế hệ thống sâu hơn trong đồ án Công Nghệ Phần Mềm.

---

## 5. Mục tiêu sản phẩm

### 5.1. Mục tiêu nghiệp vụ

| Mục tiêu | Mô tả | Ý nghĩa |
|---|---|---|
| Quản lý thuốc tập trung | Lưu thông tin thuốc, danh mục, giá bán, đơn vị tính, trạng thái | Giúp nhà thuốc tra cứu và cập nhật thuốc dễ dàng |
| Quản lý tồn kho | Theo dõi số lượng tồn, nhập thuốc, cảnh báo sắp hết/gần hết hạn | Giảm rủi ro thiếu hàng hoặc tồn thuốc hết hạn |
| Hỗ trợ bán hàng | Tạo đơn, thêm thuốc, tính tiền, thanh toán, hóa đơn | Tăng tốc độ bán hàng và giảm sai sót |
| Cảnh báo tương tác thuốc | Kiểm tra các cặp thuốc trong đơn bằng dữ liệu mẫu | Hỗ trợ nhân viên lưu ý khi bán nhiều thuốc cùng lúc |
| Quản lý khách hàng | Lưu thông tin khách hàng cơ bản và lịch sử mua | Hỗ trợ chăm sóc khách hàng quay lại |
| Báo cáo vận hành | Thống kê doanh thu, tồn kho, thuốc bán chạy | Hỗ trợ chủ nhà thuốc ra quyết định |
| Hỗ trợ tư vấn tham khảo | AI hỗ trợ tạo câu hỏi, ghi chú, giải thích cảnh báo | Tăng giá trị nâng cao của hệ thống |

### 5.2. Mục tiêu kỹ thuật

| Mục tiêu | Mô tả | Ý nghĩa |
|---|---|---|
| Kiến trúc module rõ ràng | Tách các module Auth, Medicine, Inventory, Sales, AI, Graph | Dễ phát triển, bảo trì và kiểm thử |
| Database quan hệ chuẩn | Thiết kế ERD, khóa chính, khóa ngoại, data dictionary | Đảm bảo dữ liệu nghiệp vụ nhất quán |
| Rule Engine | Kiểm tra tương tác thuốc và cảnh báo theo luật | Tạo điểm xử lý nghiệp vụ rõ ràng |
| AI Provider Adapter | Cho phép dùng MockAI hoặc provider thật | Giảm phụ thuộc vào một nhà cung cấp AI |
| Knowledge Graph | Biểu diễn quan hệ thuốc, hoạt chất, triệu chứng, tương tác | Tăng chiều sâu kỹ thuật của đồ án |
| Graph-RAG | Truy xuất graph để tạo context cho AI | Hỗ trợ AI trả lời dựa trên dữ liệu hệ thống |
| Guardrail | Kiểm soát AI không chẩn đoán, không kê đơn | Đảm bảo an toàn trong bối cảnh liên quan đến thuốc |
| Audit Log | Lưu lịch sử request/response AI | Tăng khả năng truy vết và minh bạch |

### 5.3. Mục tiêu học tập

| Mục tiêu | Mô tả |
|---|---|
| Thể hiện quy trình Công Nghệ Phần Mềm | Có đầy đủ phân tích, thiết kế, lập trình, kiểm thử, demo |
| Xây dựng tài liệu bài bản | Có BRD, SRS, Use Case, UML, ERD, API, Test Plan, Demo Script |
| Quản lý dự án theo Agile/Scrum | Có backlog, sprint, task, phân công và theo dõi tiến độ |
| Làm sản phẩm có thể demo | Website chạy được với dữ liệu mẫu và tài khoản demo |
| Có điểm mới kỹ thuật | AI, Graph, Guardrail, Audit Log hoặc Forecast |

---

## 6. Người dùng mục tiêu

| Người dùng | Nhu cầu | Vấn đề hiện tại | Giá trị hệ thống mang lại |
|---|---|---|---|
| Admin / Chủ nhà thuốc | Quản lý thuốc, nhân viên, doanh thu, báo cáo | Khó theo dõi toàn bộ hoạt động nhà thuốc nếu dữ liệu rời rạc | Có dashboard, báo cáo, quản lý user, thuốc, kho và doanh thu |
| Nhân viên nhà thuốc | Tìm thuốc, bán thuốc, xem cảnh báo, thanh toán | Dễ sai số lượng, sai giá, quên kiểm tra tồn hoặc bỏ sót cảnh báo | Có màn hình POS, tìm thuốc nhanh, tự tính tiền, cảnh báo tương tác |
| Nhân viên kho | Nhập thuốc, cập nhật tồn kho, theo dõi hạn dùng | Khó biết thuốc nào sắp hết hoặc gần hết hạn | Có quản lý nhập kho, tồn kho, cảnh báo sắp hết/gần hết hạn |
| Khách hàng | Mua thuốc, nhận hóa đơn, lưu lịch sử mua cơ bản | Không có lịch sử mua hàng khi quay lại | Có hóa đơn, thông tin mua hàng được lưu ở mức cơ bản |

### 6.1. Admin / Chủ nhà thuốc

Admin là người có quyền cao nhất trong hệ thống. Admin cần theo dõi tình hình kinh doanh, quản lý tài khoản nhân viên, quản lý dữ liệu thuốc, xem báo cáo doanh thu và kiểm tra các cảnh báo quan trọng.

Nhu cầu chính của Admin gồm:

- Quản lý tài khoản người dùng.
- Phân quyền cho nhân viên.
- Quản lý thuốc và danh mục thuốc.
- Xem tình hình tồn kho.
- Xem thuốc sắp hết và gần hết hạn.
- Xem doanh thu theo ngày/tháng.
- Xem thuốc bán chạy.
- Xem lịch sử bán hàng.
- Xem AI Audit Log nếu hệ thống có tích hợp AI.

### 6.2. Nhân viên nhà thuốc

Nhân viên nhà thuốc là người trực tiếp sử dụng hệ thống trong quá trình bán hàng tại quầy. Đây là nhóm người dùng cần giao diện nhanh, dễ thao tác và ít bước.

Nhu cầu chính của Nhân viên nhà thuốc gồm:

- Tìm kiếm thuốc nhanh.
- Xem thông tin thuốc và tồn kho.
- Thêm thuốc vào đơn hàng.
- Kiểm tra tồn kho tự động.
- Xem cảnh báo tương tác thuốc.
- Ghi chú tư vấn nếu cần.
- Chọn hoặc tạo khách hàng.
- Xác nhận thanh toán.
- Tạo và in hóa đơn.

### 6.3. Nhân viên kho

Nhân viên kho phụ trách nhập thuốc và kiểm soát số lượng tồn kho. Người dùng này cần hệ thống hỗ trợ theo dõi số lượng tồn, hạn dùng và lịch sử nhập thuốc.

Nhu cầu chính của Nhân viên kho gồm:

- Tạo phiếu nhập thuốc.
- Cập nhật số lượng tồn.
- Theo dõi thuốc sắp hết.
- Theo dõi thuốc gần hết hạn.
- Xem lịch sử nhập thuốc.
- Quản lý thông tin nhà cung cấp nếu cần.

### 6.4. Khách hàng

Khách hàng là người mua thuốc tại nhà thuốc. Trong phạm vi MVP, khách hàng không cần đăng nhập vào hệ thống. Thông tin khách hàng có thể được nhân viên lưu lại để phục vụ lịch sử mua hàng và chăm sóc cơ bản.

Thông tin khách hàng có thể lưu:

- Họ tên.
- Số điện thoại.
- Ghi chú cơ bản.
- Lịch sử đơn hàng.

Hệ thống cần bảo mật thông tin khách hàng và không sử dụng dữ liệu cá nhân thật trong demo.

---

## 7. Giá trị sản phẩm

| Giá trị | Mô tả | Ví dụ trong hệ thống |
|---|---|---|
| Tăng hiệu quả quản lý | Tập trung dữ liệu thuốc, kho, đơn hàng | Admin xem toàn bộ thuốc, tồn kho, doanh thu trên dashboard |
| Giảm sai sót bán hàng | Kiểm tra tồn kho, tính tiền tự động | Không cho thêm thuốc nếu số lượng bán vượt tồn kho |
| Hỗ trợ an toàn | Cảnh báo tương tác thuốc bằng rule mẫu | Khi thêm Thuốc A và Thuốc B có tương tác, hệ thống hiển thị cảnh báo |
| Hỗ trợ quyết định | Báo cáo doanh thu, tồn kho, thuốc bán chạy | Admin biết thuốc nào bán chạy để nhập thêm |
| Tạo điểm mới kỹ thuật | AI, Neo4j, Graph-RAG, Guardrail | Demo AI Copilot giải thích cảnh báo dựa trên graph context |
| Tăng khả năng truy vết | Lưu lịch sử đơn hàng, thanh toán, AI log | Có thể xem lại cảnh báo và nội dung AI đã sinh |
| Tăng tính chuyên nghiệp | Có quy trình bán hàng, hóa đơn, báo cáo rõ ràng | Nhân viên thao tác theo luồng chuẩn từ tạo đơn đến hóa đơn |

---

## 8. In-scope

Các chức năng sau nằm trong phạm vi thực hiện của dự án. Phạm vi này bao gồm cả phần MVP bắt buộc và phần nâng cao có thể triển khai nếu đủ thời gian.

| Nhóm | Chức năng | Mô tả | Mức ưu tiên |
|---|---|---|---|
| Account | Đăng nhập, đăng xuất, phân quyền | Người dùng nội bộ đăng nhập và sử dụng chức năng theo vai trò | Must-have |
| Medicine | Quản lý thuốc, danh mục thuốc | Thêm, sửa, xem, tìm kiếm, lọc thuốc theo danh mục | Must-have |
| Inventory | Nhập thuốc, tồn kho, cảnh báo sắp hết/gần hết hạn | Theo dõi số lượng tồn và hạn dùng | Must-have |
| Sales | Tạo đơn, thêm thuốc, kiểm tra tồn kho | Nhân viên tạo đơn bán thuốc tại quầy | Must-have |
| Interaction | Kiểm tra tương tác thuốc bằng rule-based | So khớp các cặp thuốc trong đơn với dữ liệu mẫu | Must-have |
| Payment | Thanh toán mô phỏng | Ghi nhận tiền mặt hoặc chuyển khoản mô phỏng | Must-have |
| Invoice | Tạo/in hóa đơn | Tạo hóa đơn sau khi thanh toán thành công | Must-have |
| Customer | Quản lý khách hàng cơ bản | Lưu tên, số điện thoại, lịch sử mua hàng | Should-have |
| Report | Doanh thu, tồn kho, thuốc bán chạy | Cung cấp báo cáo cơ bản cho Admin | Should-have |
| AI/Graph | Mô phỏng hoặc triển khai nâng cao | AI Copilot, Neo4j, Graph-RAG, Guardrail, Audit Log | Could-have / Advanced |

### 8.1. Mô tả chi tiết các nhóm in-scope

#### 8.1.1. Account

Nhóm chức năng Account giúp đảm bảo chỉ người dùng được cấp tài khoản mới có thể truy cập hệ thống. Mỗi người dùng có vai trò khác nhau và được phân quyền phù hợp.

Chức năng chính:

- Đăng nhập.
- Đăng xuất.
- Kiểm tra quyền truy cập.
- Phân quyền theo vai trò.
- Quản lý tài khoản ở mức Admin.

Vai trò sử dụng:

- Admin.
- Nhân viên nhà thuốc.
- Nhân viên kho.

#### 8.1.2. Medicine

Nhóm chức năng Medicine dùng để quản lý dữ liệu thuốc trong hệ thống.

Chức năng chính:

- Thêm thuốc.
- Sửa thông tin thuốc.
- Xem danh sách thuốc.
- Xem chi tiết thuốc.
- Tìm kiếm thuốc theo tên hoặc mã.
- Lọc thuốc theo danh mục.
- Cập nhật trạng thái kinh doanh.

Thông tin thuốc dự kiến:

- Mã thuốc.
- Tên thuốc.
- Danh mục.
- Đơn vị tính.
- Giá bán.
- Mô tả.
- Trạng thái.
- Ghi chú.

#### 8.1.3. Inventory

Nhóm chức năng Inventory giúp quản lý số lượng tồn kho và hạn dùng của thuốc.

Chức năng chính:

- Xem danh sách tồn kho.
- Cập nhật tồn kho sau khi nhập thuốc.
- Trừ tồn kho sau khi bán hàng.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Xem lịch sử nhập thuốc.

Quy tắc cơ bản:

- Không cho bán thuốc vượt số lượng tồn.
- Sau khi thanh toán thành công, hệ thống trừ tồn kho.
- Thuốc dưới ngưỡng tồn kho tối thiểu được đưa vào danh sách cảnh báo.
- Thuốc gần hết hạn được đưa vào danh sách cảnh báo.

#### 8.1.4. Sales

Nhóm chức năng Sales hỗ trợ nhân viên nhà thuốc tạo đơn bán thuốc tại quầy.

Chức năng chính:

- Tạo đơn hàng mới.
- Tìm kiếm thuốc.
- Thêm thuốc vào đơn.
- Cập nhật số lượng thuốc trong đơn.
- Xóa thuốc khỏi đơn.
- Tính tổng tiền.
- Kiểm tra tồn kho.
- Kích hoạt kiểm tra tương tác thuốc.

Luồng chính:

1. Nhân viên mở màn hình bán hàng.
2. Tìm kiếm thuốc.
3. Thêm thuốc vào đơn.
4. Hệ thống kiểm tra tồn kho.
5. Hệ thống kiểm tra tương tác nếu có từ hai thuốc trở lên.
6. Nhân viên xác nhận thông tin đơn hàng.
7. Nhân viên chuyển sang thanh toán.

#### 8.1.5. Interaction

Nhóm chức năng Interaction là điểm nổi bật của MVP. Hệ thống kiểm tra tương tác thuốc bằng dữ liệu mẫu theo hướng rule-based.

Cách hoạt động:

- Hệ thống lưu danh sách cặp thuốc có tương tác trong bảng DrugInteraction.
- Khi đơn hàng có từ hai thuốc trở lên, hệ thống sinh tất cả các cặp thuốc trong đơn.
- Hệ thống kiểm tra từng cặp với dữ liệu tương tác.
- Nếu có tương tác, hệ thống hiển thị cảnh báo.

Thông tin cảnh báo gồm:

- Tên thuốc thứ nhất.
- Tên thuốc thứ hai.
- Mức độ: nhẹ, trung bình, cao.
- Mô tả nguy cơ mẫu.
- Khuyến nghị xử lý mẫu.
- Ghi chú tư vấn.
- Disclaimer an toàn.

Lưu ý: Dữ liệu tương tác thuốc là dữ liệu mẫu phục vụ đồ án, không dùng để đưa ra quyết định y tế thực tế.

#### 8.1.6. Payment

Nhóm chức năng Payment ghi nhận việc thanh toán của đơn hàng.

Chức năng chính:

- Chọn phương thức thanh toán.
- Ghi nhận số tiền khách trả.
- Tính tiền thừa nếu thanh toán tiền mặt.
- Xác nhận thanh toán.
- Cập nhật trạng thái đơn hàng.

Phương thức thanh toán trong MVP:

- Tiền mặt.
- Chuyển khoản mô phỏng.

Không tích hợp cổng thanh toán thật trong phạm vi đồ án.

#### 8.1.7. Invoice

Nhóm chức năng Invoice tạo hóa đơn sau khi thanh toán thành công.

Thông tin hóa đơn gồm:

- Mã hóa đơn.
- Ngày tạo.
- Nhân viên bán hàng.
- Thông tin khách hàng nếu có.
- Danh sách thuốc.
- Số lượng.
- Đơn giá.
- Thành tiền.
- Tổng tiền.
- Phương thức thanh toán.

#### 8.1.8. Customer

Nhóm chức năng Customer lưu thông tin khách hàng ở mức cơ bản.

Chức năng chính:

- Thêm khách hàng.
- Cập nhật thông tin khách hàng.
- Tìm khách hàng theo tên hoặc số điện thoại.
- Xem lịch sử mua hàng.

Trong MVP, khách hàng không cần đăng nhập.

#### 8.1.9. Report

Nhóm chức năng Report hỗ trợ Admin theo dõi hoạt động nhà thuốc.

Báo cáo cơ bản:

- Doanh thu theo ngày.
- Doanh thu theo tháng.
- Thuốc bán chạy.
- Danh sách thuốc sắp hết.
- Danh sách thuốc gần hết hạn.
- Tổng số đơn hàng.

#### 8.1.10. AI/Graph

Nhóm chức năng AI/Graph là phạm vi nâng cao. Nhóm này có thể triển khai thật hoặc mô phỏng tùy thời gian.

Chức năng có thể có:

- AI Pharmacist Copilot.
- AI tạo câu hỏi bổ sung.
- AI giải thích cảnh báo.
- AI tạo ghi chú tư vấn.
- AI Business Report.
- AI Guardrail.
- AI Audit Log.
- Neo4j Knowledge Graph.
- Graph-RAG.
- Graph Explorer UI.

---

## 9. Out-of-scope

Các chức năng sau không nằm trong phạm vi của phiên bản hiện tại.

| Chức năng | Lý do |
|---|---|
| Thanh toán online thật | Vượt phạm vi đồ án, cần tích hợp cổng thanh toán, bảo mật giao dịch và xử lý callback |
| Kê đơn bằng AI | Không an toàn, vượt phạm vi hệ thống hỗ trợ nhà thuốc |
| Chẩn đoán bệnh | Không thuộc phạm vi hệ thống và cần chuyên môn y tế |
| Dữ liệu y khoa thật | Cần chuyên gia kiểm định, không phù hợp phạm vi đồ án sinh viên |
| Mobile app | Tập trung website để đảm bảo hoàn thành MVP |
| Quản lý nhiều chi nhánh | Làm tăng độ phức tạp về kho, doanh thu, nhân sự và phân quyền |
| Tích hợp bảo hiểm | Phức tạp, cần quy trình và dữ liệu chuyên ngành |
| Kết nối đơn thuốc điện tử thật | Cần hệ thống bên ngoài và quy định chuyên môn |
| Tư vấn điều trị cá nhân hóa | Không phù hợp với mục tiêu an toàn của đồ án |
| Sử dụng dữ liệu bệnh nhân thật | Có rủi ro bảo mật và quyền riêng tư |
| Hệ thống y tế production | Dự án chỉ phục vụ học tập, phân tích và demo |

---

## 10. MVP Scope

MVP Scope được chia theo mô hình **Must-have**, **Should-have** và **Could-have** để nhóm biết chức năng nào bắt buộc, chức năng nào nên có và chức năng nào có thể bổ sung nếu đủ thời gian.

| Must-have | Should-have | Could-have |
|---|---|---|
| Đăng nhập | Báo cáo doanh thu | AI Copilot |
| Đăng xuất | Quản lý khách hàng | Neo4j Graph |
| Phân quyền | Hóa đơn đẹp | Forecast tồn kho |
| Quản lý thuốc | Thuốc bán chạy | Graph-RAG |
| Quản lý danh mục thuốc | Lịch sử mua hàng | AI Business Report |
| Quản lý kho | Dashboard tổng quan | AI Prompt Management |
| Nhập thuốc | Cảnh báo gần hết hạn nâng cao | AI Cost Monitoring |
| Bán thuốc | Tìm kiếm/lọc nâng cao | Graph Explorer UI |
| Kiểm tra tồn kho | Xuất báo cáo đơn giản | Provider fallback |
| Thanh toán | Ghi chú tư vấn | Consultation Readiness Score |
| Cảnh báo tương tác |  |  |
| Tạo hóa đơn |  |  |

### 10.1. Must-have

Must-have là các chức năng bắt buộc cần hoàn thành để hệ thống được xem là có MVP.

Danh sách Must-have:

1. Đăng nhập.
2. Đăng xuất.
3. Phân quyền cơ bản.
4. Quản lý thuốc.
5. Quản lý danh mục thuốc.
6. Quản lý tồn kho.
7. Nhập thuốc.
8. Bán thuốc.
9. Kiểm tra tồn kho.
10. Cảnh báo tương tác thuốc rule-based.
11. Thanh toán mô phỏng.
12. Tạo hóa đơn.

Nếu thiếu một trong các chức năng này, demo MVP sẽ chưa thể hiện đầy đủ bài toán chính của hệ thống.

### 10.2. Should-have

Should-have là các chức năng nên có để hệ thống hoàn chỉnh hơn và dễ thuyết phục khi demo.

Danh sách Should-have:

1. Báo cáo doanh thu.
2. Quản lý khách hàng.
3. Hóa đơn có giao diện rõ ràng.
4. Thống kê thuốc bán chạy.
5. Lịch sử mua hàng.
6. Dashboard tổng quan.
7. Cảnh báo thuốc gần hết hạn.
8. Tìm kiếm và lọc nâng cao.
9. Ghi chú tư vấn.

### 10.3. Could-have

Could-have là các chức năng nâng cao giúp tăng điểm kỹ thuật nhưng không nên làm trước khi MVP ổn định.

Danh sách Could-have:

1. AI Pharmacist Copilot.
2. Neo4j Knowledge Graph.
3. Forecast tồn kho.
4. Graph-RAG.
5. AI Business Report.
6. AI Prompt Management.
7. AI Cost Monitoring.
8. Graph Explorer UI.
9. AI Provider fallback.
10. Consultation Readiness Score.

---

## 11. Phạm vi nâng cao đề xuất

Để đề tài đạt mức Khó hoặc Rất Khó, nhóm có thể chọn một số chức năng nâng cao sau:

| Chức năng nâng cao | Mục tiêu | Giá trị khi demo | Độ khó |
|---|---|---|---|
| Rule Engine mở rộng | Kiểm tra tương tác, red flag, risk score | Thể hiện xử lý nghiệp vụ thông minh | Khó |
| AI Pharmacist Copilot | Sinh câu hỏi, giải thích cảnh báo, tạo ghi chú | Tạo điểm nhấn AI | Khó/Rất Khó |
| Neo4j Knowledge Graph | Lưu quan hệ thuốc, hoạt chất, triệu chứng | Thể hiện mô hình graph | Khó |
| Graph-RAG | Truy xuất graph làm context cho AI | AI có căn cứ từ dữ liệu hệ thống | Rất Khó |
| AI Guardrail | Kiểm soát AI không chẩn đoán/kê đơn | Thể hiện an toàn AI | Khó |
| AI Audit Log | Lưu request/response AI | Thể hiện governance và truy vết | Khó |
| Forecast tồn kho | Dự báo nguy cơ hết hàng | Thể hiện phân tích dữ liệu | Khó |
| AI Business Report | AI diễn giải báo cáo vận hành | Tăng tính trình bày sản phẩm | Khó |

### 11.1. Khuyến nghị chọn nâng cao

Nếu nhóm có thời gian hạn chế, nên ưu tiên:

1. Rule Engine cảnh báo tương tác.
2. AI Guardrail.
3. AI Audit Log.
4. MockAI Pharmacist Copilot.
5. Neo4j Knowledge Graph ở mức dữ liệu mẫu nhỏ.

Nếu nhóm có thời gian nhiều hơn, có thể bổ sung:

1. Graph-RAG.
2. Forecast tồn kho.
3. AI Business Report.
4. Graph Explorer UI.

---

## 12. Luồng nghiệp vụ nằm trong phạm vi

### 12.1. Luồng đăng nhập

1. Người dùng mở trang đăng nhập.
2. Nhập username và password.
3. Hệ thống kiểm tra thông tin đăng nhập.
4. Nếu hợp lệ, hệ thống tạo phiên đăng nhập hoặc token.
5. Hệ thống điều hướng người dùng đến màn hình phù hợp theo vai trò.
6. Nếu không hợp lệ, hệ thống hiển thị thông báo lỗi.

### 12.2. Luồng quản lý thuốc

1. Admin mở màn hình quản lý thuốc.
2. Admin xem danh sách thuốc.
3. Admin thêm hoặc sửa thông tin thuốc.
4. Hệ thống kiểm tra dữ liệu bắt buộc.
5. Hệ thống lưu thông tin thuốc.
6. Thuốc mới xuất hiện trong danh sách và có thể dùng khi bán hàng.

### 12.3. Luồng nhập thuốc

1. Nhân viên kho mở màn hình nhập thuốc.
2. Chọn nhà cung cấp.
3. Thêm thuốc vào phiếu nhập.
4. Nhập số lượng, giá nhập, hạn dùng nếu có.
5. Xác nhận phiếu nhập.
6. Hệ thống cập nhật tồn kho.
7. Hệ thống lưu lịch sử nhập thuốc.

### 12.4. Luồng bán thuốc có cảnh báo tương tác

1. Nhân viên nhà thuốc đăng nhập.
2. Mở màn hình bán hàng.
3. Tìm kiếm thuốc.
4. Thêm thuốc vào đơn.
5. Hệ thống kiểm tra tồn kho.
6. Nhân viên thêm thuốc thứ hai hoặc nhiều thuốc khác.
7. Hệ thống kiểm tra các cặp thuốc trong đơn hàng.
8. Nếu phát hiện tương tác, hệ thống hiển thị cảnh báo.
9. Nhân viên đọc cảnh báo và ghi chú tư vấn nếu cần.
10. Nhân viên chọn khách hàng hoặc tạo khách hàng mới.
11. Hệ thống tính tổng tiền.
12. Nhân viên xác nhận thanh toán.
13. Hệ thống tạo hóa đơn.
14. Hệ thống trừ tồn kho.
15. Nhân viên in hoặc xem hóa đơn.

### 12.5. Luồng báo cáo

1. Admin mở màn hình báo cáo.
2. Chọn khoảng thời gian cần xem.
3. Hệ thống tổng hợp dữ liệu đơn hàng.
4. Hệ thống hiển thị doanh thu, số đơn, thuốc bán chạy.
5. Admin có thể xem thêm danh sách thuốc sắp hết hoặc gần hết hạn.

---

## 13. Ràng buộc

Các ràng buộc sau cần được tuân thủ trong toàn bộ quá trình phân tích, thiết kế, phát triển, kiểm thử và demo hệ thống.

| Ràng buộc | Mô tả | Ảnh hưởng đến thiết kế |
|---|---|---|
| Hệ thống phục vụ đồ án | Không dùng thay thế phần mềm y tế thật | Cần ghi rõ phạm vi học tập/demo |
| Dữ liệu thuốc là dữ liệu mẫu | Thuốc, tương tác, bệnh nền, khuyến nghị không phải dữ liệu y khoa kiểm định | Database và UI cần có ghi chú dữ liệu mẫu |
| AI chỉ hỗ trợ tham khảo | AI không chẩn đoán, không kê đơn | Prompt và Guardrail phải giới hạn nội dung AI |
| Người dùng xác nhận nội dung AI | Nội dung AI không tự động trở thành quyết định cuối cùng | UI cần có nút xác nhận/lưu thủ công |
| Thanh toán là mô phỏng | Không tích hợp cổng thanh toán thật | Payment chỉ lưu trạng thái và phương thức mô phỏng |
| Bảo mật dữ liệu khách hàng | Không dùng dữ liệu cá nhân thật trong demo | Seed data phải là dữ liệu giả lập |
| Ưu tiên MVP | Chức năng nâng cao chỉ làm sau khi MVP ổn định | Backlog cần chia Must/Should/Could |
| Demo phải ổn định | Hệ thống cần chạy được với dữ liệu mẫu | Cần chuẩn bị seed data, tài khoản demo, kịch bản demo |

### 13.1. Ràng buộc an toàn AI

Nếu hệ thống có tích hợp AI, bắt buộc tuân thủ các ràng buộc sau:

- AI không được chẩn đoán bệnh.
- AI không được kê đơn thuốc.
- AI không được khẳng định thuốc chắc chắn an toàn.
- AI không được thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- AI chỉ được sinh nội dung hỗ trợ tham khảo.
- Nội dung AI cần có disclaimer.
- Nội dung AI cần được người dùng xác nhận trước khi lưu.
- Các request/response AI quan trọng nên được lưu vào AI Audit Log.

### 13.2. Disclaimer chuẩn

Câu disclaimer chuẩn cần xuất hiện trong các màn hình cảnh báo tương tác thuốc, AI Copilot, ghi chú tư vấn và báo cáo AI:

> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 14. Giả định

| Giả định | Mô tả |
|---|---|
| Người dùng hệ thống là nhân sự nội bộ nhà thuốc | Admin, Nhân viên nhà thuốc và Nhân viên kho được cấp tài khoản |
| Khách hàng không cần đăng nhập | MVP chỉ lưu thông tin khách hàng cơ bản khi bán hàng |
| Dữ liệu demo được chuẩn bị trước | Nhóm tạo seed data để đảm bảo demo ổn định |
| AI có thể được mô phỏng | Nếu không có API thật, MockAI vẫn giúp demo luồng AI |
| Neo4j có thể triển khai ở quy mô nhỏ | Graph chỉ cần đủ dữ liệu để chứng minh ý tưởng |
| Forecast không cần ML phức tạp | Có thể dùng công thức trung bình bán/ngày |
| Hệ thống chạy trong môi trường demo | Không yêu cầu triển khai production thực tế |

---

## 15. Phụ thuộc

| Phụ thuộc | Mô tả | Rủi ro nếu không đáp ứng |
|---|---|---|
| Database schema | Backend phụ thuộc vào thiết kế bảng | Code phải sửa nhiều nếu schema thay đổi liên tục |
| Dữ liệu mẫu | Demo phụ thuộc vào seed data | Demo không thể hiện được cảnh báo và báo cáo |
| API specification | Frontend phụ thuộc vào API backend | Frontend/backend dễ lệch dữ liệu |
| Phân quyền | UI và API phụ thuộc vào role | Người dùng có thể thấy sai chức năng |
| AI Provider | AI Copilot phụ thuộc provider hoặc MockAI | AI không chạy nếu provider lỗi và không có fallback |
| Neo4j | Graph-RAG phụ thuộc dữ liệu graph | Không demo được graph nếu chưa có node/edge |
| Test case | Demo phụ thuộc kiểm thử trước | Dễ lỗi sát ngày bảo vệ |

---

## 16. Tiêu chí chấp nhận phạm vi MVP

MVP được xem là đạt nếu thỏa các tiêu chí sau:

| Tiêu chí | Điều kiện chấp nhận |
|---|---|
| Đăng nhập | Người dùng đăng nhập được bằng tài khoản mẫu |
| Phân quyền | Mỗi vai trò nhìn thấy chức năng phù hợp |
| Quản lý thuốc | Thêm, sửa, xem, tìm kiếm thuốc hoạt động |
| Quản lý kho | Hiển thị tồn kho và cập nhật sau nhập/bán |
| Bán thuốc | Tạo đơn, thêm thuốc, tính tổng tiền được |
| Kiểm tra tồn kho | Không cho bán vượt tồn kho |
| Cảnh báo tương tác | Hiển thị cảnh báo khi đơn có cặp thuốc tương tác mẫu |
| Thanh toán | Ghi nhận thanh toán mô phỏng thành công |
| Hóa đơn | Tạo hóa đơn sau khi thanh toán |
| Báo cáo cơ bản | Hiển thị doanh thu hoặc thuốc bán chạy từ dữ liệu mẫu |
| An toàn | Màn hình cảnh báo/AI có disclaimer |

---

## 17. Định hướng phát triển sau MVP

Sau khi MVP hoàn thành, hệ thống có thể phát triển tiếp theo các hướng sau:

| Hướng phát triển | Mô tả | Lợi ích |
|---|---|---|
| AI Copilot nâng cao | AI hỗ trợ tạo câu hỏi và ghi chú tư vấn | Tăng điểm mới kỹ thuật |
| Knowledge Graph mở rộng | Thêm nhiều node/relationship về thuốc, hoạt chất, triệu chứng | Tăng khả năng giải thích và truy vấn |
| Graph-RAG hoàn chỉnh | Kết hợp query graph và AI generation | AI trả lời dựa trên context hệ thống |
| Forecast tồn kho | Dự báo ngày hết hàng và gợi ý nhập | Hỗ trợ quyết định nhập hàng |
| AI Business Report | AI tạo báo cáo vận hành dễ đọc | Hỗ trợ Admin hiểu dữ liệu nhanh |
| Prompt Management | Quản lý prompt template | Dễ kiểm soát hành vi AI |
| Cost Monitoring | Theo dõi số lần gọi AI và chi phí | Hỗ trợ quản trị AI |
| Multi-branch | Quản lý nhiều chi nhánh | Phù hợp phát triển thực tế sau đồ án |

---

## 18. Kết luận

Tài liệu **Vision and Scope Document** xác định tầm nhìn và phạm vi thực hiện của hệ thống **PharmaAssist AI Intelligence**. Sản phẩm được định hướng là một website quản lý nhà thuốc thông minh, hỗ trợ các nghiệp vụ cốt lõi như quản lý thuốc, tồn kho, bán hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo. Đồng thời, hệ thống có khả năng mở rộng với các thành phần nâng cao như AI Pharmacist Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail, AI Audit Log và Forecast tồn kho.

Phạm vi MVP cần được ưu tiên hoàn thành trước, đặc biệt là các chức năng đăng nhập, phân quyền, quản lý thuốc, quản lý kho, bán thuốc, thanh toán, hóa đơn và cảnh báo tương tác thuốc rule-based. Các chức năng AI/Graph nên được triển khai sau khi MVP ổn định hoặc mô phỏng ở mức phù hợp để đảm bảo tiến độ đồ án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

