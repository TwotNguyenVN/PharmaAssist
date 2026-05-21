# 02_PROJECT_CHARTER

**Mã tài liệu:** 02_Project_Charter  
**Tên tài liệu:** Project Charter  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu khởi động dự án  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, người quản lý dự án, tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

**Project Charter** là tài liệu khởi động dự án, được sử dụng để xác nhận sự tồn tại chính thức của dự án **PharmaAssist AI Intelligence**. Tài liệu này mô tả lý do thực hiện dự án, mục tiêu chính, phạm vi tổng quát, thành viên tham gia, vai trò, thời gian thực hiện, sản phẩm bàn giao và tiêu chí đánh giá thành công.

Trong đồ án môn **Công Nghệ Phần Mềm**, Project Charter đóng vai trò như một văn bản định hướng ban đầu giúp nhóm thống nhất:

- Dự án được thực hiện để giải quyết vấn đề gì.
- Dự án hướng đến đối tượng sử dụng nào.
- Hệ thống cần đạt được những mục tiêu nào.
- Phạm vi nào được thực hiện trong đồ án.
- Phạm vi nào không thực hiện để tránh mở rộng quá mức.
- Thành viên nào phụ trách công việc nào.
- Các sản phẩm đầu ra cần bàn giao cuối kỳ.
- Tiêu chí nào dùng để đánh giá dự án thành công.

Tài liệu này là cơ sở để nhóm tiếp tục xây dựng các tài liệu chi tiết hơn như **Business Requirement Document**, **Software Requirement Specification**, **Use Case Specification**, **UML Diagram**, **ERD**, **API Specification**, **Product Backlog**, **Sprint Plan**, **Test Plan** và **Demo Script**.

---

## 2. Thông tin dự án

| Mục | Nội dung |
|---|---|
| Tên dự án | PharmaAssist AI Intelligence |
| Tên đầy đủ | Website quản lý nhà thuốc thông minh tích hợp cảnh báo tương tác thuốc, AI Copilot và Knowledge Graph |
| Môn học | Công Nghệ Phần Mềm |
| Loại dự án | Đồ án môn học |
| Nhóm thực hiện | Nhóm ... |
| Giảng viên hướng dẫn | ... |
| Thời gian bắt đầu | ... |
| Thời gian kết thúc | ... |
| Phiên bản tài liệu | v1.0 |
| Trạng thái tài liệu | Draft / Review / Approved |
| Trạng thái dự án | Planning / Analysis / Design |
| Phiên bản sản phẩm mục tiêu | v1.0 MVP |
| Hình thức triển khai | Website chạy local, Docker hoặc môi trường demo |
| Đối tượng sử dụng | Admin/Chủ nhà thuốc, Nhân viên nhà thuốc, Nhân viên kho, Khách hàng |
| Định hướng độ khó | Trung Bình đến Khó/Rất Khó nếu triển khai AI, Graph, Guardrail và Audit Log |

---

## 3. Tổng quan dự án

**PharmaAssist AI Intelligence** là một hệ thống website hỗ trợ nhà thuốc quản lý hoạt động bán thuốc, nhập kho, tồn kho, khách hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành. Hệ thống được xây dựng trong phạm vi đồ án môn Công Nghệ Phần Mềm, tập trung vào việc thể hiện đầy đủ quy trình phân tích, thiết kế, phát triển, kiểm thử và demo phần mềm.

Ở mức cơ bản, hệ thống hỗ trợ các nghiệp vụ thường gặp của nhà thuốc như:

- Quản lý danh sách thuốc.
- Quản lý danh mục thuốc.
- Theo dõi tồn kho.
- Nhập thuốc từ nhà cung cấp.
- Bán thuốc tại quầy.
- Tạo đơn hàng.
- Ghi nhận thanh toán.
- Tạo và in hóa đơn.
- Quản lý khách hàng cơ bản.
- Thống kê doanh thu và thuốc bán chạy.

Điểm nổi bật của hệ thống là chức năng **cảnh báo tương tác thuốc rule-based**. Khi nhân viên thêm nhiều thuốc vào cùng một đơn hàng, hệ thống kiểm tra các cặp thuốc trong đơn dựa trên bảng dữ liệu mẫu. Nếu phát hiện tương tác, hệ thống hiển thị cảnh báo để nhân viên lưu ý trong quá trình tư vấn.

Ở mức nâng cao, hệ thống có thể tích hợp:

- **AI Pharmacist Copilot** để hỗ trợ tạo câu hỏi, giải thích cảnh báo và tạo ghi chú tư vấn tham khảo.
- **Neo4j Knowledge Graph** để lưu quan hệ thuốc, hoạt chất, triệu chứng, bệnh nền, red flag và tương tác.
- **Graph-RAG** để truy xuất dữ liệu graph làm context cho AI.
- **AI Guardrail** để kiểm soát AI không chẩn đoán bệnh, không kê đơn thuốc.
- **AI Audit Log** để lưu lại lịch sử request/response AI phục vụ truy vết.
- **Forecast tồn kho** để dự báo nguy cơ hết hàng dựa trên lịch sử bán hàng.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 4. Lý do chọn đề tài

Nhà thuốc nhỏ và vừa thường phải xử lý nhiều nghiệp vụ cùng lúc như bán thuốc, nhập hàng, kiểm tra tồn kho, theo dõi hạn dùng, tư vấn khách hàng, thanh toán, in hóa đơn và lập báo cáo. Nếu các nghiệp vụ này được thực hiện bằng sổ sách, Excel hoặc phần mềm đơn giản, nhà thuốc có thể gặp nhiều khó khăn trong quá trình vận hành.

Một số vấn đề thực tế thường gặp gồm:

| Vấn đề | Mô tả | Ảnh hưởng |
|---|---|---|
| Khó quản lý thuốc | Thông tin thuốc nằm rải rác hoặc cập nhật thủ công | Dễ sai thông tin, khó tìm kiếm |
| Sai lệch tồn kho | Nhập bán không được cập nhật kịp thời | Dễ bán vượt tồn hoặc thiếu hàng |
| Thuốc sắp hết không được phát hiện | Không có cảnh báo tồn kho thấp | Nhà thuốc không kịp nhập hàng |
| Thuốc gần hết hạn bị bỏ sót | Không theo dõi hạn dùng hiệu quả | Tăng rủi ro tồn thuốc hết hạn |
| Bán hàng thủ công dễ sai | Tính tiền, tạo hóa đơn, trừ kho thủ công | Dễ sai giá, sai số lượng, sai doanh thu |
| Khó lưu lịch sử khách hàng | Không có dữ liệu mua hàng trước đó | Khó chăm sóc khách hàng quay lại |
| Khó phát hiện tương tác thuốc | Khi khách mua nhiều thuốc, nhân viên có thể bỏ sót cảnh báo | Cần hệ thống hỗ trợ nhắc nhở tham khảo |
| Báo cáo mất thời gian | Chủ nhà thuốc phải tổng hợp thủ công | Khó ra quyết định nhập hàng hoặc điều chỉnh kinh doanh |

Vì vậy, nhóm chọn đề tài **PharmaAssist AI Intelligence** nhằm xây dựng một website hỗ trợ quản lý nhà thuốc thông minh, có khả năng cảnh báo tương tác thuốc bằng dữ liệu mẫu, hỗ trợ nghiệp vụ bán hàng, quản lý tồn kho và cung cấp báo cáo cơ bản.

Đề tài này phù hợp với môn Công Nghệ Phần Mềm vì có thể thể hiện đầy đủ các nội dung quan trọng:

- Phân tích bài toán thực tế.
- Xác định actor và stakeholder.
- Viết yêu cầu chức năng và phi chức năng.
- Thiết kế use case, activity, sequence, class diagram.
- Thiết kế database và ERD.
- Thiết kế API.
- Thiết kế giao diện.
- Quản lý dự án theo Agile/Scrum.
- Kiểm thử hệ thống.
- Chuẩn bị demo và bảo vệ.

Ngoài ra, đề tài có khả năng mở rộng lên mức **Khó** hoặc **Rất Khó** nhờ tích hợp AI Copilot, Knowledge Graph, Graph-RAG, Guardrail, Audit Log và Forecast tồn kho.

---

## 5. Mục tiêu dự án

### 5.1. Mục tiêu tổng quát

Mục tiêu tổng quát của dự án là xây dựng một website quản lý nhà thuốc thông minh, hỗ trợ nhà thuốc trong các nghiệp vụ quản lý thuốc, quản lý tồn kho, nhập thuốc, bán thuốc, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành. Hệ thống hướng đến việc giảm thao tác thủ công, giảm sai sót trong bán hàng, hỗ trợ kiểm soát tồn kho và tạo điểm nhấn kỹ thuật bằng các thành phần AI/Graph ở mức phù hợp với đồ án.

### 5.2. Mục tiêu cụ thể

| Mục tiêu | Mô tả | Kết quả mong đợi |
|---|---|---|
| Quản lý thuốc | Lưu trữ, cập nhật, tìm kiếm thông tin thuốc | Có danh sách thuốc, thêm/sửa/xem/tìm kiếm thuốc |
| Quản lý danh mục thuốc | Phân loại thuốc theo nhóm | Thuốc được tổ chức theo danh mục rõ ràng |
| Quản lý tồn kho | Theo dõi số lượng thuốc, cảnh báo sắp hết/gần hết hạn | Không bán vượt tồn, phát hiện thuốc cần nhập thêm |
| Nhập thuốc | Ghi nhận phiếu nhập từ nhà cung cấp | Tồn kho được cập nhật sau khi nhập |
| Hỗ trợ bán hàng | Tạo đơn, thêm thuốc, tính tiền, thanh toán, hóa đơn | Nhân viên có thể hoàn tất một đơn bán thuốc |
| Cảnh báo tương tác thuốc | Kiểm tra cặp thuốc trong đơn hàng bằng rule-based | Hiển thị cảnh báo nếu có cặp thuốc tương tác trong dữ liệu mẫu |
| Quản lý khách hàng | Lưu thông tin khách hàng cơ bản | Có thể xem lịch sử mua hàng của khách |
| Báo cáo | Thống kê doanh thu, thuốc bán chạy, tồn kho | Admin có dữ liệu tổng quan để theo dõi vận hành |
| Nâng cao | AI Copilot, Knowledge Graph, Graph-RAG, Guardrail nếu đủ thời gian | Tăng độ khó và điểm nổi bật của đồ án |

### 5.3. Mục tiêu về học thuật

Dự án không chỉ nhằm tạo ra một website chạy được, mà còn nhằm chứng minh năng lực áp dụng quy trình Công Nghệ Phần Mềm. Vì vậy, nhóm cần đảm bảo có đầy đủ tài liệu và bằng chứng cho các hoạt động:

- Khảo sát và phân tích nghiệp vụ.
- Xác định yêu cầu hệ thống.
- Thiết kế hệ thống trước khi lập trình.
- Phân chia công việc và quản lý tiến độ.
- Kiểm thử dựa trên yêu cầu.
- Demo theo kịch bản rõ ràng.
- Báo cáo kết quả và đánh giá hạn chế.

---

## 6. Phạm vi tổng quát

Phạm vi dự án được chia thành hai nhóm: **trong phạm vi** và **ngoài phạm vi**. Việc xác định rõ phạm vi giúp nhóm kiểm soát khối lượng công việc, tránh mở rộng quá mức và tập trung hoàn thành sản phẩm MVP trước.

---

## 6.1. Trong phạm vi

Các chức năng sau nằm trong phạm vi thực hiện của dự án:

| Nhóm chức năng | Chức năng | Mô tả |
|---|---|---|
| Tài khoản | Đăng nhập, đăng xuất | Người dùng nội bộ đăng nhập bằng tài khoản được cấp |
| Phân quyền | Phân quyền người dùng | Hệ thống phân quyền theo vai trò Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Quản lý thuốc | Thêm, sửa, xem, tìm kiếm thuốc | Lưu trữ thông tin thuốc phục vụ bán hàng và quản lý kho |
| Quản lý danh mục thuốc | Thêm, sửa, xem danh mục | Phân loại thuốc theo nhóm để dễ tìm kiếm |
| Quản lý tồn kho | Theo dõi số lượng tồn | Kiểm tra số lượng thuốc hiện có |
| Cảnh báo tồn kho | Cảnh báo thuốc sắp hết/gần hết hạn | Hiển thị danh sách thuốc cần chú ý |
| Nhập thuốc | Tạo phiếu nhập thuốc | Ghi nhận thuốc nhập từ nhà cung cấp và cập nhật tồn kho |
| Quản lý khách hàng | Lưu thông tin khách hàng | Lưu tên, số điện thoại và lịch sử mua hàng cơ bản |
| Bán hàng | Tạo đơn bán thuốc | Nhân viên thêm thuốc vào đơn, tính tiền và xác nhận bán |
| Kiểm tra tồn kho | Không cho bán vượt tồn | Hệ thống kiểm tra số lượng trước khi thêm vào đơn hoặc thanh toán |
| Kiểm tra tương tác thuốc | Rule-based Drug Interaction Alert | Kiểm tra cặp thuốc trong đơn hàng bằng dữ liệu mẫu |
| Thanh toán | Ghi nhận thanh toán | Mô phỏng thanh toán tiền mặt hoặc chuyển khoản |
| Hóa đơn | Tạo và xem/in hóa đơn | Tạo hóa đơn sau khi thanh toán thành công |
| Báo cáo cơ bản | Doanh thu, thuốc bán chạy, tồn kho | Admin theo dõi tình hình vận hành |
| AI/Graph nâng cao | AI Copilot, Graph, Graph-RAG ở mức nâng cao hoặc mô phỏng | Triển khai nếu đủ thời gian, không bắt buộc trong MVP lõi |

### 6.1.1. Phạm vi MVP bắt buộc

Trong trường hợp thời gian có hạn, nhóm cần ưu tiên hoàn thành MVP với các module sau:

1. Đăng nhập và phân quyền.
2. Quản lý thuốc.
3. Quản lý danh mục thuốc.
4. Quản lý tồn kho.
5. Nhập thuốc.
6. Bán thuốc tại quầy.
7. Kiểm tra tồn kho khi bán.
8. Cảnh báo tương tác thuốc rule-based.
9. Thanh toán mô phỏng.
10. Tạo hóa đơn.
11. Báo cáo cơ bản.

### 6.1.2. Phạm vi nâng cao có điều kiện

Các chức năng sau chỉ nên triển khai sau khi MVP đã ổn định:

1. AI Pharmacist Copilot.
2. AI Guardrail.
3. AI Audit Log.
4. Neo4j Knowledge Graph.
5. Graph-RAG.
6. Forecast tồn kho.
7. AI Business Report.
8. AI Provider Adapter.
9. Graph Explorer UI.

---

## 6.2. Ngoài phạm vi

Các nội dung sau không nằm trong phạm vi thực hiện của dự án phiên bản hiện tại:

| Nội dung ngoài phạm vi | Lý do loại trừ |
|---|---|
| Thanh toán online thật | Cần tích hợp cổng thanh toán, xác thực giao dịch và xử lý bảo mật phức tạp |
| Kê đơn thuốc bằng AI | Có rủi ro y tế, vượt phạm vi đồ án và không phù hợp quy tắc an toàn |
| Chẩn đoán bệnh | Đây là hoạt động y tế chuyên môn, hệ thống không được thực hiện |
| Dữ liệu y khoa thật chưa kiểm định | Dự án chỉ dùng dữ liệu mẫu phục vụ học tập và demo |
| Mobile app | Tập trung vào website để phù hợp thời gian đồ án |
| Quản lý nhiều chi nhánh | Làm tăng độ phức tạp về kho, nhân sự, doanh thu và phân quyền |
| Tích hợp bảo hiểm y tế | Cần dữ liệu, quy trình và quy định chuyên ngành phức tạp |
| Kết nối đơn thuốc điện tử thật | Vượt phạm vi đồ án, cần tích hợp hệ thống bên ngoài |
| Tư vấn điều trị cá nhân hóa | Không phù hợp với mục tiêu phần mềm quản lý nhà thuốc trong đồ án |
| Sử dụng dữ liệu bệnh nhân thật | Có rủi ro bảo mật và quyền riêng tư |

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 7. Stakeholder của dự án

Stakeholder là các bên liên quan đến dự án, có ảnh hưởng hoặc bị ảnh hưởng bởi hệ thống.

| Stakeholder | Vai trò | Mối quan tâm chính |
|---|---|---|
| Giảng viên hướng dẫn | Người đánh giá và góp ý đồ án | Tính hợp lý của đề tài, quy trình phân tích thiết kế, kết quả demo |
| Nhóm phát triển | Người xây dựng hệ thống | Phạm vi rõ ràng, công việc chia hợp lý, sản phẩm chạy được |
| Admin/Chủ nhà thuốc | Người quản lý hệ thống | Theo dõi thuốc, kho, doanh thu, báo cáo và nhân viên |
| Nhân viên nhà thuốc | Người bán thuốc và dùng POS | Thao tác nhanh, tìm thuốc dễ, cảnh báo rõ ràng |
| Nhân viên kho | Người nhập và theo dõi tồn kho | Quản lý số lượng, hạn dùng, phiếu nhập |
| Khách hàng | Người mua thuốc tại nhà thuốc | Mua hàng nhanh, thông tin được bảo mật |
| Tester | Người kiểm thử hệ thống | Có yêu cầu rõ để viết test case |
| Người thuyết trình/demo | Người trình bày sản phẩm | Có kịch bản demo ổn định, dữ liệu mẫu đầy đủ |

---

## 8. Thành viên và vai trò

Bảng dưới đây là phân công vai trò đề xuất. Nhóm có thể thay tên thành viên theo thực tế.

| Thành viên | Vai trò | Nhiệm vụ chính | Sản phẩm phụ trách |
|---|---|---|---|
| Thành viên 1 | Leader / Backend | Quản lý tiến độ, phân công công việc, thiết kế và xây dựng backend API | Project plan, backend core, auth, API chính |
| Thành viên 2 | Frontend | Xây dựng giao diện người dùng, layout, routing, màn hình nghiệp vụ | Login, Dashboard, Medicine, Inventory, POS, Report UI |
| Thành viên 3 | Database | Thiết kế ERD, data dictionary, migration, seed data | ERD, database schema, sample data, script tạo dữ liệu |
| Thành viên 4 | AI/Graph | Phụ trách AI Copilot, Neo4j, Graph-RAG, Guardrail, Audit Log | AI module, graph model, prompt template, AI log |
| Thành viên 5 | Tester/Document | Viết test case, test plan, báo cáo, slide, demo script | Test plan, test case, report, slide, demo script |

### 8.1. Trách nhiệm chung của tất cả thành viên

Ngoài vai trò chính, tất cả thành viên cần tham gia các công việc chung:

- Đọc và thống nhất tài liệu yêu cầu.
- Review thiết kế hệ thống.
- Cập nhật tiến độ công việc.
- Commit code đúng quy định.
- Không tự ý thay đổi phạm vi đã chốt.
- Ghi nhận lỗi và phản hồi khi test.
- Tham gia chuẩn bị demo và bảo vệ.

### 8.2. Quy tắc phối hợp nhóm

| Quy tắc | Mô tả |
|---|---|
| Giao việc rõ ràng | Mỗi task cần có người phụ trách, deadline và trạng thái |
| Quản lý bằng backlog | Tất cả công việc nên được ghi vào Jira, Trello hoặc GitHub Projects |
| Commit có ý nghĩa | Mỗi commit cần mô tả rõ thay đổi |
| Không commit thông tin nhạy cảm | Không đưa API key, password thật, token hoặc dữ liệu cá nhân thật lên repository |
| Review trước khi merge | Code quan trọng cần được ít nhất một thành viên review |
| Ưu tiên MVP | Hoàn thành chức năng lõi trước khi làm AI/Graph nâng cao |
| Cập nhật tài liệu song song | Khi thay đổi chức năng, cần cập nhật tài liệu tương ứng |

---

## 9. Mốc thời gian dự kiến

Bảng thời gian dưới đây là kế hoạch đề xuất, có thể điều chỉnh theo lịch học và deadline thực tế.

| Giai đoạn | Thời gian dự kiến | Mục tiêu | Kết quả đầu ra |
|---|---|---|---|
| Giai đoạn 1: Khởi động | Tuần 1 | Chốt đề tài, Project Charter, phạm vi tổng quát | Project Charter, Project Overview |
| Giai đoạn 2: Phân tích | Tuần 2 | Phân tích nghiệp vụ, yêu cầu hệ thống | BRD, SRS, User Story, Use Case |
| Giai đoạn 3: Thiết kế | Tuần 3 | Thiết kế UML, ERD, API, UI wireframe | UML, ERD, API Spec, Wireframe |
| Giai đoạn 4: Phát triển MVP | Tuần 4-6 | Xây dựng module lõi | Auth, Medicine, Inventory, Sales, Payment, Invoice |
| Giai đoạn 5: Nâng cao | Tuần 7 | Bổ sung AI/Graph/Guardrail/Audit nếu đủ thời gian | AI Copilot, Graph, Audit Log, Forecast |
| Giai đoạn 6: Kiểm thử | Tuần 8 | Kiểm thử chức năng và sửa lỗi | Test Case, Test Report |
| Giai đoạn 7: Demo/Bảo vệ | Tuần 9 | Chuẩn bị demo, slide và báo cáo cuối | Demo Script, Slide, Final Report |

---

## 10. Sản phẩm bàn giao

| Sản phẩm | Mô tả | Người/nhóm phụ trách đề xuất |
|---|---|---|
| Source code | Mã nguồn frontend và backend | Backend + Frontend |
| Database script | Migration, schema, seed data | Database |
| Tài liệu phân tích | BRD, SRS, Use Case, User Story | Document + Leader |
| Tài liệu thiết kế | UML, ERD, Architecture, API Specification | Backend + Database + Document |
| Tài liệu AI/Graph | AI Architecture, Graph Design, Guardrail, Audit Log | AI/Graph |
| Tài liệu giao diện | UI requirement, wireframe, screen list | Frontend |
| Tài liệu quản lý dự án | Product Backlog, Sprint Plan, Risk Management | Leader + Document |
| Tài liệu kiểm thử | Test Plan, Test Case, Test Report | Tester |
| Demo | Demo script, tài khoản mẫu, dữ liệu mẫu | Cả nhóm |
| Báo cáo | Báo cáo đồ án hoàn chỉnh | Document + Cả nhóm |
| Slide | Slide bảo vệ | Document + Presenter |
| Video demo nếu cần | Video quay lại luồng demo chính | Cả nhóm |

### 10.1. Chi tiết sản phẩm phần mềm

Sản phẩm phần mềm cuối kỳ nên bao gồm:

- Giao diện đăng nhập.
- Dashboard tổng quan.
- Màn hình quản lý thuốc.
- Màn hình quản lý danh mục.
- Màn hình quản lý tồn kho.
- Màn hình nhập thuốc.
- Màn hình bán thuốc/POS.
- Modal hoặc panel cảnh báo tương tác thuốc.
- Màn hình thanh toán.
- Màn hình hóa đơn.
- Màn hình khách hàng.
- Màn hình báo cáo.
- Màn hình AI Copilot hoặc Graph nếu làm nâng cao.
- Màn hình AI Audit Log nếu làm AI.

### 10.2. Chi tiết sản phẩm tài liệu

Bộ tài liệu nên có ít nhất:

1. Project Overview and Current Status.
2. Project Charter.
3. Business Requirement Document.
4. Software Requirement Specification.
5. User Story and Acceptance Criteria.
6. Use Case Specification.
7. UML Diagrams.
8. ERD and Data Dictionary.
9. System Architecture Document.
10. API Specification.
11. UI/UX Requirement and Wireframe.
12. Product Backlog and Sprint Plan.
13. Test Plan and Test Case.
14. Demo Script.
15. Slide Outline.
16. Final Report.

---

## 11. Tiêu chí thành công

| Tiêu chí | Mô tả | Cách đánh giá |
|---|---|---|
| Chức năng chính hoạt động | Có thể demo đăng nhập, thuốc, kho, bán hàng, thanh toán | Chạy được luồng demo MVP |
| Cảnh báo tương tác hoạt động | Hệ thống phát hiện tương tác từ dữ liệu mẫu | Thêm hai thuốc có tương tác vào đơn và thấy cảnh báo |
| Kiểm tra tồn kho đúng | Không cho bán vượt số lượng tồn | Test trường hợp số lượng bán lớn hơn tồn kho |
| Thanh toán và hóa đơn hoạt động | Sau khi thanh toán, hệ thống tạo hóa đơn và trừ kho | Kiểm tra đơn hàng, hóa đơn và tồn kho sau bán |
| Báo cáo cơ bản có dữ liệu | Admin xem được doanh thu, thuốc bán chạy, tồn kho | Dashboard/report hiển thị từ dữ liệu mẫu |
| Tài liệu đầy đủ | Có phân tích, thiết kế, kiểm thử, quản lý dự án | Kiểm tra bộ tài liệu nộp kèm |
| Demo ổn định | Có dữ liệu mẫu, tài khoản mẫu, kịch bản demo | Demo không bị lỗi nghiêm trọng |
| An toàn AI | Không chẩn đoán, không kê đơn, có disclaimer | Kiểm tra prompt, guardrail và nội dung AI |
| Phân quyền rõ ràng | Vai trò khác nhau có quyền khác nhau | Test Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Có điểm nâng cao | Có AI/Graph/Audit/Forecast ở mức demo hoặc mô phỏng | Trình bày được phần nâng cao trong demo/báo cáo |

---

## 12. Giả định của dự án

| Giả định | Mô tả |
|---|---|
| Dữ liệu thuốc là dữ liệu mẫu | Hệ thống không sử dụng dữ liệu y khoa thật để đưa ra quyết định thực tế |
| Người dùng là nhân sự nội bộ | Admin, nhân viên nhà thuốc và nhân viên kho dùng tài khoản nội bộ |
| Khách hàng không cần đăng nhập | MVP chỉ lưu thông tin khách hàng cơ bản khi bán hàng |
| Thanh toán được mô phỏng | Hệ thống chỉ ghi nhận tiền mặt/chuyển khoản, không kết nối cổng thật |
| AI có thể dùng MockAI | Nếu không có API key hoặc provider lỗi, hệ thống vẫn demo bằng MockAI |
| Graph có thể triển khai nhỏ | Neo4j chỉ cần dữ liệu mẫu vừa đủ để chứng minh ý tưởng |
| Forecast dùng công thức đơn giản | Không bắt buộc dùng mô hình machine learning thật |
| Demo chạy trên dữ liệu chuẩn bị trước | Nhóm cần seed data trước để demo ổn định |

---

## 13. Ràng buộc của dự án

| Ràng buộc | Mô tả |
|---|---|
| Thời gian | Dự án phải hoàn thành trong thời gian học phần |
| Nhân lực | Số lượng thành viên có hạn, cần chia việc hợp lý |
| Kiến thức chuyên môn y tế | Nhóm không chịu trách nhiệm cung cấp tư vấn y tế thật |
| Công nghệ | Công nghệ phải phù hợp khả năng triển khai của nhóm |
| Dữ liệu | Chỉ dùng dữ liệu mẫu, tránh dữ liệu nhạy cảm hoặc dữ liệu bệnh nhân thật |
| AI | AI không được chẩn đoán, kê đơn hoặc khẳng định điều trị |
| Bảo mật | Không commit API key, mật khẩu thật hoặc thông tin nhạy cảm |
| Demo | Hệ thống cần có chế độ demo ổn định, hạn chế phụ thuộc internet |

---

## 14. Rủi ro ban đầu

| Rủi ro | Mức độ | Tác động | Biện pháp xử lý |
|---|---|---|---|
| Phạm vi quá rộng | Cao | Không hoàn thành đúng hạn | Chốt MVP, đưa AI/Graph vào phần nâng cao |
| Khó triển khai AI thật | Trung bình/Cao | Demo AI có thể lỗi | Dùng MockAI làm fallback |
| Neo4j gây mất thời gian | Trung bình | Chậm tiến độ phát triển MVP | Làm graph nhỏ, chỉ demo các query chính |
| Database thiết kế chưa tốt | Cao | Phải sửa backend nhiều | Hoàn thiện ERD trước khi code |
| Thiếu dữ liệu demo | Cao | Demo không thể hiện được chức năng | Chuẩn bị seed data từ sớm |
| Frontend quá nhiều màn hình | Trung bình | Giao diện chưa hoàn thiện | Ưu tiên màn hình demo chính |
| Thành viên không đồng bộ | Trung bình | Trùng việc hoặc bỏ sót việc | Dùng backlog và họp ngắn định kỳ |
| AI sinh nội dung không an toàn | Cao | Gây hiểu nhầm về tư vấn y tế | Dùng guardrail, prompt ràng buộc, disclaimer |
| Gần deadline mới test | Cao | Nhiều lỗi chưa sửa kịp | Viết test case song song với phát triển |

---

## 15. Phương pháp quản lý dự án

Dự án được đề xuất quản lý theo mô hình **Agile/Scrum rút gọn**, phù hợp với đồ án sinh viên.

### 15.1. Cách tổ chức công việc

- Chia dự án thành các Epic lớn.
- Mỗi Epic được chia thành Story và Task.
- Mỗi Task có người phụ trách, độ ưu tiên và trạng thái.
- Mỗi Sprint tập trung vào một nhóm chức năng cụ thể.
- Cuối mỗi Sprint có sản phẩm đầu ra rõ ràng.

### 15.2. Các Epic đề xuất

| Epic | Tên Epic |
|---|---|
| EPIC-01 | Quản lý người dùng và phân quyền |
| EPIC-02 | Quản lý thuốc |
| EPIC-03 | Quản lý kho thuốc |
| EPIC-04 | Bán thuốc và thanh toán |
| EPIC-05 | Cảnh báo tương tác thuốc |
| EPIC-06 | Quản lý khách hàng |
| EPIC-07 | Báo cáo và thống kê |
| EPIC-08 | AI Pharmacist Copilot |
| EPIC-09 | Neo4j Knowledge Graph và Graph-RAG |
| EPIC-10 | Kiểm thử và tài liệu |

### 15.3. Trạng thái công việc đề xuất

| Trạng thái | Ý nghĩa |
|---|---|
| To Do | Chưa thực hiện |
| In Progress | Đang thực hiện |
| Review | Đang chờ kiểm tra hoặc review |
| Testing | Đang kiểm thử |
| Done | Hoàn thành |
| Blocked | Bị chặn do thiếu thông tin hoặc lỗi phụ thuộc |

---

## 16. Kế hoạch truyền thông trong nhóm

| Hoạt động | Tần suất | Nội dung |
|---|---|---|
| Họp nhóm ngắn | 1-2 lần/tuần | Cập nhật tiến độ, khó khăn, việc cần làm tiếp |
| Cập nhật backlog | Khi có thay đổi | Cập nhật trạng thái task và assignee |
| Review tài liệu | Sau mỗi tài liệu lớn | Kiểm tra tính thống nhất giữa tài liệu |
| Review code | Trước khi merge | Kiểm tra lỗi và quy ước code |
| Chuẩn bị demo | Trước ngày bảo vệ | Chạy thử demo, kiểm tra dữ liệu, phân vai trình bày |

---

## 17. Quy định an toàn và bảo mật

Vì dự án liên quan đến thuốc, dữ liệu khách hàng và AI, nhóm cần tuân thủ các quy định sau:

1. Không sử dụng dữ liệu bệnh nhân thật.
2. Không sử dụng thông tin cá nhân thật của khách hàng trong demo.
3. Không đưa API key, token, mật khẩu thật lên GitHub.
4. Không để AI chẩn đoán bệnh.
5. Không để AI kê đơn thuốc.
6. Không khẳng định cảnh báo tương tác là kết luận y tế chính thức.
7. Luôn hiển thị disclaimer ở các màn hình AI/cảnh báo.
8. Ghi log các tác vụ AI quan trọng nếu triển khai AI.
9. Dữ liệu thuốc, tương tác, triệu chứng và khuyến nghị phải ghi rõ là dữ liệu mẫu.

Câu disclaimer chuẩn nên sử dụng trong hệ thống:

> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 18. Phê duyệt dự án

Bảng này dùng để ghi nhận việc thống nhất Project Charter giữa các bên liên quan.

| Vai trò | Họ tên | Trạng thái phê duyệt | Ngày |
|---|---|---|---|
| Leader nhóm | ... | Chưa phê duyệt / Đã phê duyệt | ... |
| Thành viên đại diện | ... | Chưa phê duyệt / Đã phê duyệt | ... |
| Giảng viên hướng dẫn | ... | Chưa phê duyệt / Đã phê duyệt | ... |

---

## 19. Kết luận

Project Charter xác nhận dự án **PharmaAssist AI Intelligence** được khởi động với mục tiêu xây dựng một website quản lý nhà thuốc thông minh, hỗ trợ quản lý thuốc, tồn kho, bán hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo. Dự án có phạm vi MVP rõ ràng, đồng thời có khả năng mở rộng lên mức Khó hoặc Rất Khó thông qua AI Copilot, Neo4j Knowledge Graph, Graph-RAG, Guardrail, Audit Log và Forecast tồn kho.

Tài liệu này là cơ sở ban đầu để nhóm tiếp tục phân tích chi tiết yêu cầu, thiết kế hệ thống, chia backlog, triển khai sản phẩm, kiểm thử và chuẩn bị demo bảo vệ.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**