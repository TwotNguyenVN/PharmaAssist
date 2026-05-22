# PROJECT_OVERVIEW_AND_CURRENT_STATUS

**Mã tài liệu:** 01_Project_Overview_Current_Status  
**Tên tài liệu:** Project Overview and Current Status  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu tổng quan dự án và trạng thái hiện tại  
**Phiên bản:** v0.1 Planning  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, tester, người viết báo cáo, người thiết kế hệ thống, người chuẩn bị demo  

---

## 1. Ý nghĩa của tài liệu

Tài liệu **PROJECT_OVERVIEW_AND_CURRENT_STATUS** là tài liệu tổng quan đầu tiên trong bộ hồ sơ dự án **PharmaAssist AI Intelligence**. Tài liệu này đóng vai trò như một “bản đồ định hướng” giúp tất cả thành viên trong nhóm hiểu nhanh dự án đang làm gì, mục tiêu là gì, phạm vi đến đâu, hiện tại đã chốt những phần nào, còn phần nào cần quyết định và bước tiếp theo cần thực hiện là gì.

Trong một đồ án Công Nghệ Phần Mềm, nếu nhóm chỉ bắt đầu code mà không có tài liệu tổng quan, dự án rất dễ bị lệch phạm vi, thiếu chức năng quan trọng, trùng lặp công việc hoặc không thể giải thích rõ với giảng viên vì sao hệ thống được thiết kế như vậy. Vì vậy, tài liệu này cần được đặt ở đầu bộ tài liệu dự án để làm cơ sở cho các tài liệu sau như SRS, BRD, ERD, UML, API Specification, Sprint Plan, Test Plan và Demo Script.

Tài liệu này đặc biệt quan trọng với dự án PharmaAssist AI Intelligence vì hệ thống không chỉ là một website CRUD quản lý nhà thuốc thông thường, mà còn có các hướng nâng cao như cảnh báo tương tác thuốc, AI Pharmacist Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail, AI Audit Log và Forecast tồn kho. Nếu không có tài liệu tổng quan, nhóm rất dễ mở rộng quá nhiều và vượt quá khả năng triển khai trong thời gian đồ án.

---

## 2. Mục đích tài liệu

Tài liệu này dùng để cung cấp cái nhìn tổng quan nhanh nhất về dự án **PharmaAssist AI Intelligence**, bao gồm:

- Mục tiêu tổng quát của hệ thống.
- Lý do hệ thống được xây dựng.
- Phạm vi MVP cần ưu tiên triển khai.
- Phạm vi nâng cao giúp đề tài đạt mức Khó hoặc Rất Khó.
- Đối tượng sử dụng chính của hệ thống.
- Các module chức năng cốt lõi.
- Trạng thái hiện tại của dự án.
- Những quyết định đã chốt.
- Những vấn đề chưa chốt.
- Các công việc cần ưu tiên tiếp theo.

Ngoài ra, tài liệu này còn giúp nhóm:

- Thống nhất cách hiểu về đề tài giữa các thành viên.
- Có cơ sở trình bày với giảng viên khi hỏi về phạm vi và độ khó.
- Làm đầu vào cho tài liệu phân tích nghiệp vụ và yêu cầu hệ thống.
- Tránh việc thêm quá nhiều chức năng ngoài phạm vi MVP.
- Xác định rõ phần nào bắt buộc phải làm, phần nào là nâng cao.
- Theo dõi tiến độ dự án qua từng giai đoạn Planning, Analysis, Design, Development, Testing và Demo.

---

## 3. Thông tin tổng quan

| Mục | Nội dung |
|---|---|
| Tên dự án | PharmaAssist AI Intelligence |
| Tên đầy đủ | Website quản lý nhà thuốc thông minh tích hợp cảnh báo tương tác thuốc, AI Copilot và Knowledge Graph |
| Loại dự án | Đồ án môn Công Nghệ Phần Mềm |
| Lĩnh vực | Quản lý nhà thuốc, bán hàng, tồn kho, hỗ trợ tư vấn tham khảo, AI ứng dụng trong nghiệp vụ |
| Đối tượng sử dụng | Admin/Chủ nhà thuốc, Nhân viên nhà thuốc, Nhân viên kho, Khách hàng |
| Mục tiêu chính | Quản lý thuốc, quản lý tồn kho, bán thuốc, thanh toán, hóa đơn, cảnh báo tương tác thuốc, báo cáo vận hành |
| Điểm nổi bật | Rule-based Drug Interaction Alert, AI Pharmacist Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail, AI Audit Log, Forecast tồn kho |
| Trạng thái hiện tại | Planning / Analysis / Design |
| Phiên bản hiện tại | v0.1 Planning |
| Phiên bản mục tiêu MVP | v1.0 MVP |
| Dữ liệu y khoa | Dữ liệu mẫu phục vụ đồ án, không sử dụng như dữ liệu y khoa thật |
| Mức độ kỳ vọng | Từ Trung Bình lên Khó/Rất Khó nhờ tích hợp rule engine, AI, graph, audit và forecast |
| Hình thức triển khai đề xuất | Website chạy local hoặc Docker, có thể demo bằng dữ liệu mẫu |

---

## 4. Mô tả ngắn dự án

**PharmaAssist AI Intelligence** là website hỗ trợ nhà thuốc quản lý các hoạt động vận hành hằng ngày như quản lý thuốc, nhập kho, tồn kho, khách hàng, bán thuốc, thanh toán, hóa đơn và báo cáo. Hệ thống hướng đến việc số hóa các nghiệp vụ thường gặp tại nhà thuốc nhỏ hoặc vừa, giúp nhân viên thao tác nhanh hơn, giảm sai sót khi bán hàng và hỗ trợ chủ nhà thuốc theo dõi tình hình kinh doanh.

Điểm nổi bật của hệ thống là chức năng **cảnh báo tương tác thuốc**. Khi nhân viên nhà thuốc thêm nhiều thuốc vào cùng một đơn hàng, hệ thống sẽ kiểm tra dữ liệu tương tác thuốc được lưu sẵn. Nếu phát hiện một cặp thuốc có nguy cơ tương tác, hệ thống hiển thị cảnh báo gồm tên hai thuốc, mức độ cảnh báo, mô tả nguy cơ, khuyến nghị xử lý mẫu và khu vực ghi chú tư vấn. Chức năng này được thiết kế theo hướng **rule-based**, sử dụng dữ liệu mẫu để phù hợp với phạm vi đồ án Công Nghệ Phần Mềm.

Ở mức nâng cao, hệ thống có thể tích hợp **AI Pharmacist Copilot**, **Neo4j Knowledge Graph** và **Graph-RAG**. AI Copilot hỗ trợ nhân viên nhà thuốc tạo câu hỏi bổ sung, giải thích cảnh báo theo ngôn ngữ dễ hiểu và tạo ghi chú tư vấn tham khảo. Knowledge Graph lưu các quan hệ giữa thuốc, hoạt chất, nhóm thuốc, triệu chứng, bệnh nền, red flag và tương tác. Graph-RAG truy xuất dữ liệu từ graph để tạo context cho AI trước khi AI sinh nội dung trả lời.

Để đảm bảo an toàn, hệ thống cần có **AI Guardrail** nhằm kiểm soát việc AI không chẩn đoán bệnh, không kê đơn thuốc và không đưa ra khẳng định y tế vượt phạm vi. Đồng thời, **AI Audit Log** được sử dụng để lưu lại lịch sử request/response, provider, prompt version, thời điểm gọi AI và trạng thái xử lý. Điều này giúp dự án thể hiện được tư duy quản trị AI và truy vết trong hệ thống phần mềm.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 5. Bối cảnh nghiệp vụ

Trong thực tế, một nhà thuốc nhỏ hoặc vừa thường phải xử lý nhiều nghiệp vụ trong ngày. Nhân viên cần tìm thuốc, kiểm tra tồn kho, tư vấn khách hàng, tạo đơn hàng, nhận thanh toán và in hóa đơn. Nhân viên kho cần nhập thuốc, cập nhật số lượng tồn, theo dõi hạn dùng và phát hiện thuốc sắp hết. Chủ nhà thuốc cần theo dõi doanh thu, thuốc bán chạy, tình hình tồn kho và hiệu quả vận hành.

Nếu các công việc này được thực hiện bằng sổ sách, Excel hoặc phần mềm đơn giản, nhà thuốc có thể gặp nhiều vấn đề như:

- Không biết chính xác số lượng thuốc còn lại.
- Không phát hiện sớm thuốc sắp hết hàng.
- Không theo dõi tốt thuốc gần hết hạn.
- Bán thuốc nhưng quên trừ kho.
- Sai giá bán hoặc sai số lượng trong đơn hàng.
- Khó lưu lại lịch sử mua hàng của khách.
- Khó phát hiện các cặp thuốc có nguy cơ tương tác khi khách mua nhiều thuốc cùng lúc.
- Chủ nhà thuốc mất nhiều thời gian tổng hợp báo cáo.

PharmaAssist AI Intelligence được xây dựng để giải quyết các vấn đề trên bằng một hệ thống website có phân quyền, quản lý dữ liệu tập trung, cảnh báo nghiệp vụ và hỗ trợ ra quyết định ở mức tham khảo.

---

## 6. Mục tiêu dự án

### 6.1. Mục tiêu tổng quát

Xây dựng một website quản lý nhà thuốc thông minh, hỗ trợ các nghiệp vụ quản lý thuốc, tồn kho, nhập thuốc, bán thuốc, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành, đồng thời có định hướng tích hợp AI và Knowledge Graph để nâng cao giá trị đồ án.

### 6.2. Mục tiêu nghiệp vụ

| Mục tiêu | Mô tả |
|---|---|
| Quản lý thuốc tập trung | Lưu trữ thông tin thuốc, danh mục, đơn vị, giá bán, trạng thái kinh doanh |
| Kiểm soát tồn kho | Theo dõi số lượng tồn, nhập thuốc, thuốc sắp hết, thuốc gần hết hạn |
| Hỗ trợ bán hàng tại quầy | Tạo đơn hàng, thêm thuốc, tính tiền, thanh toán và in hóa đơn |
| Cảnh báo tương tác thuốc | Phát hiện các cặp thuốc có tương tác dựa trên dữ liệu mẫu rule-based |
| Quản lý khách hàng | Lưu thông tin khách hàng cơ bản và lịch sử mua hàng |
| Báo cáo vận hành | Theo dõi doanh thu, thuốc bán chạy, tồn kho và cảnh báo quan trọng |
| Hỗ trợ tư vấn tham khảo | AI hỗ trợ tạo câu hỏi, ghi chú và giải thích cảnh báo ở mức tham khảo |

### 6.3. Mục tiêu kỹ thuật

| Mục tiêu | Mô tả |
|---|---|
| Thiết kế kiến trúc rõ ràng | Tách frontend, backend, database, graph database và AI provider |
| Thiết kế database chuẩn | Có ERD, Data Dictionary, khóa chính, khóa ngoại và dữ liệu mẫu |
| API rõ ràng | Có danh sách endpoint, actor được phép gọi, request/response chính |
| Rule Engine | Có module kiểm tra tương tác thuốc, red flag và risk score ở mức mô phỏng |
| AI Provider Adapter | Có khả năng dùng MockAI hoặc provider thật như Gemini/OpenRouter/Ollama |
| Guardrail | Kiểm soát input/output AI để tránh nội dung vượt phạm vi |
| Audit Log | Lưu lịch sử các tác vụ AI quan trọng |
| Graph-RAG | Truy xuất dữ liệu graph làm context cho AI ở mức nâng cao |

### 6.4. Mục tiêu học tập

Dự án giúp nhóm thể hiện đầy đủ các kỹ năng trong môn Công Nghệ Phần Mềm:

- Phân tích bài toán thực tế.
- Xác định stakeholder và actor.
- Viết yêu cầu chức năng và phi chức năng.
- Viết user story và acceptance criteria.
- Thiết kế UML.
- Thiết kế ERD và database schema.
- Thiết kế kiến trúc hệ thống.
- Thiết kế API.
- Thiết kế giao diện.
- Lập kế hoạch Agile/Scrum.
- Quản lý backlog và sprint.
- Kiểm thử hệ thống.
- Chuẩn bị demo và báo cáo bảo vệ.

---

## 7. Actor và đối tượng sử dụng

| Actor | Vai trò | Chức năng chính |
|---|---|---|
| Admin / Chủ nhà thuốc | Người quản trị cao nhất của hệ thống | Quản lý tài khoản, phân quyền, quản lý thuốc, xem báo cáo, xem AI Audit Log, cấu hình hệ thống |
| Nhân viên nhà thuốc | Người bán thuốc, tư vấn khách hàng và tạo đơn hàng | Tìm kiếm thuốc, kiểm tra tồn kho, tạo đơn bán, xem cảnh báo tương tác, ghi chú tư vấn, thanh toán, in hóa đơn |
| Nhân viên kho | Người phụ trách nhập kho và theo dõi tồn kho | Nhập thuốc, cập nhật tồn kho, xem thuốc sắp hết, xem thuốc gần hết hạn, quản lý nhà cung cấp |
| Khách hàng | Người mua thuốc tại nhà thuốc | Cung cấp thông tin cơ bản, mua thuốc, có thể được lưu lịch sử mua hàng |
| AI Provider | Dịch vụ sinh nội dung AI | Tạo câu hỏi bổ sung, giải thích cảnh báo, tạo ghi chú tư vấn, tạo báo cáo |
| Neo4j Graph Database | Thành phần lưu trữ dữ liệu graph | Lưu và truy vấn quan hệ thuốc, hoạt chất, triệu chứng, bệnh nền, red flag, tương tác |

Lưu ý: Trong phạm vi MVP, khách hàng không bắt buộc có tài khoản đăng nhập. Khách hàng chỉ là đối tượng được lưu thông tin cơ bản như tên, số điện thoại và lịch sử mua hàng.

---

## 8. Phạm vi MVP

MVP là phiên bản tối thiểu có thể demo được và phản ánh đầy đủ bài toán chính của hệ thống. Với PharmaAssist AI Intelligence, MVP nên tập trung vào các nghiệp vụ cốt lõi của nhà thuốc và chức năng nổi bật là cảnh báo tương tác thuốc rule-based.

| Nhóm chức năng | Nội dung | Ghi chú |
|---|---|---|
| Tài khoản | Đăng nhập, đăng xuất, phân quyền | Tối thiểu có 3 vai trò: Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Thuốc | Quản lý thuốc, danh mục thuốc, tìm kiếm thuốc | Bao gồm thêm, sửa, xem, tìm kiếm, lọc theo danh mục/trạng thái |
| Kho | Nhập thuốc, cập nhật tồn kho, cảnh báo sắp hết/gần hết hạn | Có thể quản lý theo số lượng và hạn dùng ở mức đơn giản |
| Bán hàng | Tạo đơn bán thuốc, thêm thuốc, kiểm tra tồn kho, tính tiền | Không cho bán vượt số lượng tồn |
| Tương tác thuốc | Kiểm tra tương tác rule-based bằng dữ liệu mẫu | Khi đơn có từ 2 thuốc trở lên, hệ thống kiểm tra các cặp thuốc |
| Thanh toán | Ghi nhận thanh toán, tạo hóa đơn | Mô phỏng tiền mặt/chuyển khoản, không tích hợp cổng thanh toán thật |
| Khách hàng | Lưu thông tin khách hàng cơ bản | Tên, số điện thoại, ghi chú, lịch sử mua hàng |
| Báo cáo | Doanh thu, thuốc bán chạy, tồn kho | Dùng dữ liệu đơn hàng và tồn kho để thống kê |

### 8.1. Luồng MVP quan trọng nhất

Luồng nghiệp vụ quan trọng nhất cần demo trong MVP là **bán thuốc có cảnh báo tương tác**:

1. Nhân viên nhà thuốc đăng nhập.
2. Nhân viên mở màn hình bán hàng/POS.
3. Nhân viên tìm kiếm thuốc.
4. Nhân viên thêm thuốc thứ nhất vào đơn hàng.
5. Hệ thống kiểm tra tồn kho.
6. Nhân viên thêm thuốc thứ hai vào đơn hàng.
7. Hệ thống kiểm tra các cặp thuốc trong đơn.
8. Nếu có tương tác, hệ thống hiển thị cảnh báo.
9. Nhân viên đọc cảnh báo và ghi chú tư vấn nếu cần.
10. Nhân viên chọn hoặc tạo khách hàng.
11. Hệ thống tính tổng tiền.
12. Nhân viên xác nhận thanh toán.
13. Hệ thống tạo hóa đơn.
14. Hệ thống trừ tồn kho.
15. Nhân viên in hoặc xem hóa đơn.

### 8.2. Kết quả đầu ra của MVP

Sau khi hoàn thành MVP, hệ thống cần có thể chứng minh các điểm sau:

- Có đăng nhập và phân quyền cơ bản.
- Có dữ liệu thuốc và danh mục thuốc.
- Có quản lý tồn kho.
- Có tạo đơn bán thuốc.
- Có kiểm tra tồn kho khi bán.
- Có cảnh báo tương tác thuốc bằng dữ liệu mẫu.
- Có ghi nhận thanh toán.
- Có hóa đơn.
- Có báo cáo cơ bản.
- Có giao diện đủ rõ để demo.

---

## 9. Phạm vi nâng cao

Phạm vi nâng cao là phần giúp đề tài vượt khỏi mức CRUD thông thường và đạt mức Khó hoặc Rất Khó. Tuy nhiên, các chức năng nâng cao cần được triển khai có kiểm soát, ưu tiên mô phỏng hợp lý nếu thời gian không đủ.

| Chức năng nâng cao | Mô tả | Mức ưu tiên | Cách triển khai đề xuất |
|---|---|---|---|
| AI Pharmacist Copilot | AI hỗ trợ tạo câu hỏi bổ sung, ghi chú tư vấn, giải thích cảnh báo | Cao | Có thể dùng MockAI trước, sau đó tích hợp provider thật nếu kịp |
| Neo4j Knowledge Graph | Lưu quan hệ thuốc, hoạt chất, triệu chứng, bệnh nền, tương tác | Cao | Dùng dữ liệu mẫu và graph nhỏ để demo |
| Graph-RAG | Truy xuất graph làm context cho AI | Trung bình/Cao | Backend query Neo4j, tạo context ngắn, gửi cho AI |
| AI Guardrail | Kiểm soát AI không chẩn đoán, không kê đơn | Cao | Rule kiểm tra input/output và prompt ràng buộc |
| AI Audit Log | Lưu lịch sử request/response AI | Cao | Lưu provider, prompt, input, output, trạng thái, thời gian |
| Forecast tồn kho | Dự báo thuốc sắp hết dựa trên lịch sử bán hàng | Trung bình | Dùng trung bình bán/ngày để ước lượng ngày hết hàng |
| AI Business Report | AI tạo báo cáo vận hành từ dữ liệu doanh thu/tồn kho | Trung bình | Backend tổng hợp số liệu, AI viết diễn giải |
| Graph Explorer UI | Giao diện xem node-edge thuốc và tương tác | Trung bình | Có thể dùng thư viện graph hoặc mô phỏng bằng sơ đồ đơn giản |
| Prompt Management | Quản lý prompt template cho AI | Thấp/Trung bình | Admin xem/sửa prompt mẫu |
| AI Cost Monitoring | Theo dõi số lần gọi AI và chi phí ước tính | Thấp | Mô phỏng token/cost nếu dùng provider thật |

### 9.1. Nguyên tắc chọn phần nâng cao

Không nên cố triển khai tất cả phần nâng cao cùng lúc. Nhóm nên chọn theo thứ tự ưu tiên:

1. Rule-based Drug Interaction Alert.
2. AI Guardrail.
3. AI Audit Log.
4. MockAI Pharmacist Copilot.
5. Neo4j Knowledge Graph.
6. Graph-RAG.
7. Forecast tồn kho.
8. AI Business Report.

Nếu thời gian hạn chế, nhóm chỉ cần demo tốt các phần 1 đến 5 là đã đủ tạo điểm nhấn mạnh cho đồ án.

---

## 10. Trạng thái hiện tại

Bảng dưới đây dùng để theo dõi trạng thái hiện tại của từng hạng mục trong dự án. Trạng thái có thể được cập nhật theo tiến độ thực tế của nhóm.

| Hạng mục | Trạng thái hiện tại | Ghi chú |
|---|---|---|
| Ý tưởng đề tài | Đã chốt | Chọn hướng PharmaAssist AI Intelligence, website quản lý nhà thuốc thông minh |
| Tên dự án | Đã chốt | PharmaAssist AI Intelligence |
| Phạm vi MVP | Đã chốt ở mức định hướng | Cần tiếp tục chi tiết hóa trong SRS và Product Backlog |
| Phạm vi nâng cao | Đã định hướng | AI Copilot, Neo4j, Graph-RAG, Guardrail, Audit Log, Forecast |
| Actor chính | Đã chốt | Admin, Nhân viên nhà thuốc, Nhân viên kho, Khách hàng |
| Công nghệ backend | Chưa chốt | Cần chọn Node.js/NestJS hoặc Spring Boot |
| Công nghệ frontend | Chưa chốt hoàn toàn | Đề xuất React hoặc Next.js |
| Database quan hệ | Đã chốt | Sử dụng Supabase (Cloud PostgreSQL) làm CSDL quan hệ chính |
| Graph Database | Chưa chốt mức triển khai | Có thể dùng Neo4j thật hoặc mô phỏng graph nếu thiếu thời gian |
| AI Provider | Chưa chốt | Nên có MockAI bắt buộc, provider thật là tùy chọn |
| Database schema | Đang thiết kế | Đã có nhóm bảng đề xuất, cần hoàn thiện ERD |
| UI/UX | Đang thiết kế | Cần hoàn thiện danh sách màn hình và wireframe |
| Backend | Chưa làm | Cần setup source code và module cơ bản |
| Frontend | Chưa làm | Cần setup layout, routing, màn hình login/dashboard/POS |
| AI/Graph | Chưa làm / đang mô phỏng ý tưởng | Nên thiết kế trước interface để dễ thay provider |
| Test | Chưa làm | Cần viết Test Plan và Test Case sau khi chốt SRS |
| Demo | Chưa chuẩn bị | Cần tạo dữ liệu demo sau khi có database schema |
| Báo cáo | Đang chuẩn bị tài liệu nền | Cần hợp nhất các tài liệu thành báo cáo cuối |
| Slide bảo vệ | Chưa làm | Nên làm sau khi chốt kiến trúc và demo script |

---

## 11. Những điểm đã chốt

| Nội dung | Quyết định | Lý do |
|---|---|---|
| Tên dự án | PharmaAssist AI Intelligence | Thể hiện rõ hệ thống không chỉ quản lý nhà thuốc mà còn có AI/Graph |
| Actor chính | Admin, Nhân viên nhà thuốc, Nhân viên kho, Khách hàng | Phù hợp nghiệp vụ nhà thuốc và phạm vi đồ án |
| Chức năng lõi | Quản lý thuốc, kho, bán hàng, thanh toán, hóa đơn, báo cáo | Đây là nền tảng bắt buộc của hệ thống |
| Cảnh báo tương tác thuốc | Làm theo rule-based bằng dữ liệu mẫu | Phù hợp đồ án, tránh phụ thuộc dữ liệu y khoa thật |
| Thanh toán | Mô phỏng tiền mặt/chuyển khoản, không tích hợp cổng thật | Giảm độ phức tạp, tập trung vào nghiệp vụ chính |
| Dữ liệu y khoa | Dữ liệu mẫu phục vụ đồ án | Tránh rủi ro y tế và phù hợp phạm vi học tập |
| AI | Chỉ hỗ trợ tham khảo, không chẩn đoán, không kê đơn | Đảm bảo an toàn và đúng phạm vi phần mềm hỗ trợ |
| Khách hàng | Không bắt buộc đăng nhập trong MVP | Giảm phức tạp, phù hợp mô hình nhà thuốc bán tại quầy |
| AI Guardrail | Cần có nếu tích hợp AI | Kiểm soát nội dung AI và tạo điểm cộng kỹ thuật |
| AI Audit Log | Nên có | Giúp truy vết và chứng minh hệ thống AI có quản trị |

---

## 12. Những điểm chưa chốt

| Vấn đề | Các lựa chọn | Cần quyết định | Gợi ý đề xuất |
|---|---|---|---|
| Backend | Node.js / NestJS / Spring Boot | Chọn framework chính | NestJS nếu muốn kiến trúc module rõ, Spring Boot nếu nhóm mạnh Java |
| Frontend | React / Next.js / Vue | Chọn framework UI | React hoặc Next.js để làm dashboard và POS nhanh |
| Database | Supabase (Cloud PostgreSQL) | Chọn database quan hệ | Supabase cung cấp Cloud PostgreSQL, giảm tải quản lý database local |
| ORM | Prisma / TypeORM / Sequelize / JPA | Chọn công cụ thao tác DB | Prisma cho Node.js, TypeORM cho NestJS, JPA cho Spring Boot |
| AI Provider | MockAI / Gemini / OpenRouter / Ollama | Có dùng AI thật không | Bắt buộc có MockAI, provider thật là tùy chọn |
| Graph | Neo4j thật / mô phỏng bằng bảng / chỉ vẽ graph UI | Mức độ triển khai graph | Nếu muốn đạt Khó/Rất Khó nên dùng Neo4j thật ở mức nhỏ |
| Deployment | Local / Docker / Cloud | Cách chạy demo | Docker Compose là đẹp nhất nếu nhóm làm được |
| Authentication | Session / JWT | Cách đăng nhập | JWT phù hợp REST API |
| Phân quyền | Role-based đơn giản / Permission chi tiết | Mức phân quyền | Role-based là đủ cho MVP |
| Forecast | Không làm / công thức đơn giản / model ML | Mức độ dự báo | Dùng công thức trung bình bán/ngày là phù hợp đồ án |
| Báo cáo AI | Không làm / MockAI / Provider thật | Có demo AI báo cáo không | Có thể làm bằng MockAI hoặc provider thật nếu còn thời gian |

---

## 13. Kiến trúc định hướng

Kiến trúc định hướng của hệ thống gồm nhiều tầng:

| Tầng | Thành phần | Vai trò |
|---|---|---|
| Presentation Layer | Frontend Web | Cung cấp giao diện cho Admin, nhân viên nhà thuốc, nhân viên kho |
| Application Layer | Backend API | Xử lý request, authentication, authorization, nghiệp vụ chính |
| Business Services | Auth, Medicine, Inventory, Sales, Rule Engine, AI, Graph, Analytics | Tách module theo nghiệp vụ |
| Data Layer | Supabase (PostgreSQL) | Lưu dữ liệu người dùng, thuốc, kho, đơn hàng, hóa đơn, AI log |
| Graph Layer | Neo4j | Lưu quan hệ thuốc, hoạt chất, triệu chứng, tương tác |
| AI Layer | MockAI/Gemini/OpenRouter/Ollama | Sinh nội dung hỗ trợ tham khảo |
| Governance Layer | Guardrail, Audit Log, Prompt Management | Kiểm soát và truy vết AI |

Sơ đồ kiến trúc tổng quát:

```text
User Browser
    |
    v
Frontend Web
    |
    | REST API / JSON
    v
Backend API
    |
    +-- Auth Service
    +-- User Service
    +-- Medicine Service
    +-- Inventory Service
    +-- Sales Service
    +-- Payment Service
    +-- Invoice Service
    +-- Rule Engine
    +-- Consultation Service
    +-- Graph-RAG Service
    +-- AI Orchestrator
    +-- Analytics Service
    |
    +--------------------+
    |                    |
    v                    v
PostgreSQL/MySQL        Neo4j
    |                    |
    v                    v
Business Data           Knowledge Graph
    |
    v
AI Provider Adapter
    |
    +-- MockAI
    +-- Gemini
    +-- OpenRouter
    +-- Ollama
```

---

## 14. Module chức năng định hướng

| Module | Mô tả | Mức ưu tiên |
|---|---|---|
| Auth & Authorization | Đăng nhập, đăng xuất, kiểm tra vai trò | Rất cao |
| User Management | Quản lý tài khoản và vai trò | Cao |
| Medicine Management | Quản lý thuốc, danh mục, thông tin thuốc | Rất cao |
| Inventory Management | Quản lý tồn kho, cảnh báo sắp hết/gần hết hạn | Rất cao |
| Stock Import | Nhập thuốc từ nhà cung cấp | Cao |
| Supplier Management | Quản lý nhà cung cấp | Trung bình |
| Customer Management | Lưu thông tin khách hàng | Cao |
| Sales/POS | Tạo đơn bán thuốc tại quầy | Rất cao |
| Drug Interaction Alert | Kiểm tra tương tác thuốc rule-based | Rất cao |
| Payment | Ghi nhận thanh toán | Cao |
| Invoice | Tạo và in hóa đơn | Cao |
| Dashboard & Report | Thống kê doanh thu, tồn kho, thuốc bán chạy | Cao |
| AI Copilot | Hỗ trợ tư vấn tham khảo bằng AI | Cao nếu làm nâng cao |
| Knowledge Graph | Lưu và truy vấn graph thuốc/hoạt chất/tương tác | Cao nếu làm nâng cao |
| AI Guardrail | Kiểm soát nội dung AI | Cao nếu dùng AI |
| AI Audit Log | Lưu lịch sử gọi AI | Cao nếu dùng AI |
| Forecast | Dự báo thuốc sắp hết | Trung bình |

---

## 15. Database định hướng

Các bảng dữ liệu quan hệ chính:

| Nhóm | Bảng đề xuất | Mục đích |
|---|---|---|
| User | users, roles, user_roles | Quản lý tài khoản và phân quyền |
| Medicine | medicines, medicine_categories, active_ingredients | Quản lý thuốc, danh mục, hoạt chất mẫu |
| Inventory | inventories, stock_imports, stock_import_details | Quản lý tồn kho và nhập thuốc |
| Sales | orders, order_details, payments, invoices | Quản lý bán hàng, thanh toán, hóa đơn |
| Customer | customers | Lưu thông tin khách hàng |
| Interaction | drug_interactions, interaction_alerts | Lưu luật tương tác thuốc và lịch sử cảnh báo |
| Consultation | consultation_sessions, consultation_notes, consultation_followup_questions | Lưu phiên tư vấn và ghi chú tư vấn |
| AI | ai_logs, ai_prompt_templates, ai_feedback, ai_response_cache | Lưu lịch sử AI và prompt |
| Analytics | sales_daily_summary, inventory_forecasts, reorder_suggestions | Phục vụ báo cáo và dự báo |

Các node/relationship graph đề xuất cho Neo4j:

| Loại | Thành phần |
|---|---|
| Node | Medicine, ActiveIngredient, DrugGroup, Symptom, Condition, RedFlag, Interaction, Recommendation |
| Relationship | CONTAINS, BELONGS_TO, INTERACTS_WITH, TREATS_SYMPTOM, CAUTION_WITH, MAY_INDICATE, HAS_REDFLAG, HAS_RECOMMENDATION |

---

## 16. Dữ liệu mẫu cần chuẩn bị

Để demo hệ thống ổn định, nhóm cần chuẩn bị dữ liệu mẫu trước khi code hoặc trước khi demo.

| Nhóm dữ liệu | Số lượng đề xuất | Ghi chú |
|---|---:|---|
| Tài khoản demo | 3 | admin01, pharmacist01, warehouse01 |
| Vai trò | 3 | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Danh mục thuốc | 5-8 | Ví dụ: giảm đau, kháng dị ứng, tiêu hóa, vitamin, hô hấp |
| Thuốc | 20-30 | Dữ liệu mẫu, không dùng làm tư vấn thật |
| Nhà cung cấp | 3-5 | Dùng cho nhập kho |
| Khách hàng | 5-10 | Dữ liệu demo |
| Phiếu nhập | 5-10 | Có ngày nhập, nhà cung cấp, chi tiết thuốc |
| Đơn hàng | 10-20 | Phục vụ báo cáo doanh thu |
| Tương tác thuốc | 5-10 cặp | Có mức độ nhẹ/trung bình/cao |
| Graph node | 30-50 node | Medicine, ActiveIngredient, Symptom, Condition, RedFlag |
| AI prompt template | 3-5 | Prompt tạo câu hỏi, giải thích cảnh báo, tạo ghi chú |

Lưu ý: Tất cả dữ liệu thuốc, tương tác, triệu chứng, bệnh nền, khuyến nghị và cảnh báo trong đồ án phải được ghi rõ là dữ liệu mẫu phục vụ mục đích học tập và demo.

---

## 17. Ưu tiên tiếp theo

| Ưu tiên | Công việc | Kết quả mong đợi |
|---:|---|---|
| 1 | Chốt phạm vi MVP | Danh sách chức năng bắt buộc cho v1.0 MVP |
| 2 | Hoàn thiện SRS | Có tài liệu yêu cầu hệ thống đầy đủ |
| 3 | Thiết kế ERD | Có sơ đồ database và data dictionary |
| 4 | Thiết kế API | Có danh sách endpoint cho backend/frontend |
| 5 | Chia backlog và sprint | Có Product Backlog, Sprint Backlog và phân công nhóm |
| 6 | Setup source code | Có repository, cấu trúc thư mục, cấu hình chạy local |
| 7 | Chuẩn bị dữ liệu demo | Có seed data cho thuốc, kho, đơn hàng, tương tác, AI |
| 8 | Thiết kế UI wireframe | Có layout màn hình Login, Dashboard, Medicine, POS, Alert, Report |
| 9 | Xây dựng module cốt lõi | Auth, Medicine, Inventory, Sales, Interaction Alert |
| 10 | Kiểm thử và chuẩn bị demo | Có test case, demo script và slide bảo vệ |

---

## 18. Roadmap phát triển đề xuất

| Giai đoạn | Mục tiêu | Công việc chính | Sản phẩm đầu ra |
|---|---|---|---|
| Phase 1: Planning | Chốt đề tài và phạm vi | Project overview, scope, actor, mục tiêu | Tài liệu tổng quan, đề cương |
| Phase 2: Analysis | Phân tích yêu cầu | BRD, SRS, user story, use case | Tài liệu yêu cầu hệ thống |
| Phase 3: Design | Thiết kế hệ thống | UML, ERD, API, architecture, UI wireframe | Bộ tài liệu thiết kế |
| Phase 4: MVP Development | Xây dựng chức năng lõi | Auth, thuốc, kho, bán hàng, thanh toán, hóa đơn | Website MVP |
| Phase 5: Advanced Features | Bổ sung điểm khó | AI Copilot, Neo4j, Graph-RAG, Guardrail, Audit Log | Module nâng cao |
| Phase 6: Testing | Kiểm thử hệ thống | Test plan, test case, fix bug | Báo cáo kiểm thử |
| Phase 7: Demo & Defense | Chuẩn bị bảo vệ | Demo script, slide, dữ liệu demo | Bộ hồ sơ bảo vệ |

---

## 19. Rủi ro hiện tại và hướng xử lý

| Rủi ro | Mức độ | Tác động | Hướng xử lý |
|---|---|---|---|
| Phạm vi quá rộng | Cao | Không hoàn thành kịp MVP | Chốt MVP trước, phần AI/Graph đưa vào nâng cao |
| Dữ liệu y khoa nhạy cảm | Cao | Dễ bị hiểu nhầm là tư vấn y tế thật | Dùng dữ liệu mẫu và luôn có disclaimer |
| AI provider lỗi hoặc hết quota | Trung bình/Cao | Demo AI không chạy | Luôn có MockAI fallback |
| Neo4j khó triển khai | Trung bình | Mất thời gian setup graph | Chuẩn bị phương án mô phỏng nếu không kịp |
| Thiết kế database chưa ổn | Cao | Backend phải sửa nhiều | Hoàn thiện ERD trước khi code |
| UI quá phức tạp | Trung bình | Demo khó hiểu | Ưu tiên màn hình chính: Dashboard, POS, Alert, Graph, Report |
| Thiếu dữ liệu demo | Cao | Demo không thể hiện được điểm nổi bật | Chuẩn bị seed data sớm |
| Nhóm phân công chưa rõ | Trung bình | Trùng việc hoặc bỏ sót việc | Dùng backlog, sprint và assignee rõ ràng |
| Test muộn | Trung bình | Lỗi phát hiện sát ngày bảo vệ | Viết test case từ đầu theo use case |

---

## 20. Tiêu chí thành công của dự án

Dự án được xem là thành công nếu đạt các tiêu chí sau:

| Nhóm tiêu chí | Tiêu chí cụ thể |
|---|---|
| Nghiệp vụ | Hệ thống hỗ trợ đầy đủ luồng quản lý thuốc, tồn kho, bán hàng, thanh toán, hóa đơn |
| Cảnh báo | Hệ thống phát hiện và hiển thị cảnh báo tương tác thuốc bằng dữ liệu mẫu |
| Phân quyền | Mỗi actor chỉ truy cập được chức năng phù hợp |
| Dữ liệu | Database có thiết kế rõ, có khóa chính/khóa ngoại và dữ liệu demo |
| Giao diện | Các màn hình chính dễ thao tác và phù hợp demo |
| AI/Graph | Có ít nhất một phần nâng cao được demo rõ: AI Copilot, Guardrail, Audit Log hoặc Knowledge Graph |
| Kiểm thử | Có test case cho các luồng chính và kết quả pass/fail |
| Quản lý dự án | Có backlog, sprint plan và phân công công việc |
| Báo cáo | Báo cáo thể hiện đầy đủ phân tích, thiết kế, triển khai và kiểm thử |
| Demo | Demo mạch lạc, thể hiện được điểm khác biệt so với CRUD thông thường |

---

## 21. Kết luận

Tài liệu **PROJECT_OVERVIEW_AND_CURRENT_STATUS** cung cấp cái nhìn tổng quan về dự án PharmaAssist AI Intelligence tại giai đoạn lập kế hoạch và phân tích ban đầu. Dự án được định hướng là một website quản lý nhà thuốc thông minh, có nền tảng nghiệp vụ rõ ràng và có khả năng mở rộng lên mức Khó/Rất Khó thông qua các thành phần như rule-based interaction alert, AI Pharmacist Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail, AI Audit Log và Forecast tồn kho.

Trong giai đoạn tiếp theo, nhóm cần ưu tiên chốt phạm vi MVP, hoàn thiện SRS, thiết kế ERD, thiết kế API, chia backlog/sprint và chuẩn bị dữ liệu demo. Việc kiểm soát phạm vi là rất quan trọng để đảm bảo nhóm có thể hoàn thành sản phẩm chạy được, đồng thời vẫn thể hiện được điểm nổi bật kỹ thuật trong đồ án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

