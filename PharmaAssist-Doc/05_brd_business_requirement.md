# 05_BRD_BUSINESS_REQUIREMENT

**Mã tài liệu:** 05_BRD_Business_Requirement  
**Tên tài liệu:** Business Requirement Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu yêu cầu nghiệp vụ  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Database Designer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Business Requirement Document**, viết tắt là **BRD**, mô tả các nhu cầu nghiệp vụ, bối cảnh thực tế, vấn đề hiện tại, stakeholder, mục tiêu nghiệp vụ và quy trình nghiệp vụ đề xuất của hệ thống **PharmaAssist AI Intelligence**.

BRD tập trung trả lời các câu hỏi ở mức nghiệp vụ:

- Nhà thuốc đang gặp những vấn đề gì trong quá trình vận hành?
- Vì sao cần xây dựng hệ thống PharmaAssist AI Intelligence?
- Hệ thống cần hỗ trợ những nghiệp vụ nào?
- Những bên liên quan đến dự án là ai?
- Mỗi stakeholder có nhu cầu gì?
- Mục tiêu nghiệp vụ của hệ thống là gì?
- Quy trình nghiệp vụ hiện tại có điểm yếu nào?
- Quy trình nghiệp vụ sau khi áp dụng hệ thống sẽ cải thiện ra sao?
- Đâu là phạm vi nghiệp vụ cần ưu tiên trong MVP?
- Đâu là phần nâng cao có thể phát triển nếu đủ thời gian?

Trong đồ án môn **Công Nghệ Phần Mềm**, tài liệu BRD là cầu nối giữa ý tưởng đề tài và tài liệu đặc tả yêu cầu phần mềm SRS. BRD mô tả vấn đề và nhu cầu ở góc nhìn nghiệp vụ, còn SRS sẽ chuyển các nhu cầu đó thành yêu cầu chức năng, phi chức năng, use case, API, dữ liệu và tiêu chí kiểm thử.

---

## 2. Phạm vi tài liệu

Tài liệu này tập trung vào phân tích nghiệp vụ cho hệ thống PharmaAssist AI Intelligence, bao gồm:

- Bối cảnh nhà thuốc nhỏ và vừa.
- Các nghiệp vụ chính của nhà thuốc.
- Các vấn đề hiện tại khi quản lý thủ công hoặc bán thủ công.
- Các stakeholder và nhu cầu của từng stakeholder.
- Mục tiêu nghiệp vụ của hệ thống.
- Quy trình nghiệp vụ hiện tại.
- Quy trình nghiệp vụ đề xuất.
- Business rules ở mức nghiệp vụ.
- Giá trị kỳ vọng của hệ thống.
- Phạm vi nghiệp vụ trong MVP và phần nâng cao.

Tài liệu này **không đi sâu vào thiết kế kỹ thuật**, ví dụ như thiết kế database chi tiết, API endpoint, cấu trúc source code hoặc thuật toán triển khai cụ thể. Các nội dung đó sẽ được mô tả trong các tài liệu thiết kế hệ thống, ERD, API Specification và Technical Design.

---

## 3. Tổng quan hệ thống

**PharmaAssist AI Intelligence** là hệ thống website hỗ trợ nhà thuốc quản lý hoạt động bán thuốc, nhập thuốc, tồn kho, khách hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành.

Hệ thống hướng đến đối tượng là các nhà thuốc nhỏ hoặc vừa, nơi các nghiệp vụ thường diễn ra liên tục nhưng có thể vẫn được quản lý bằng sổ sách, Excel hoặc các phần mềm bán hàng đơn giản. PharmaAssist AI Intelligence giúp tập trung dữ liệu vào một hệ thống duy nhất, giảm thao tác thủ công, giảm sai sót trong bán hàng và hỗ trợ chủ nhà thuốc theo dõi tình hình hoạt động.

Điểm nổi bật của hệ thống là chức năng **cảnh báo tương tác thuốc bằng rule-based data**. Khi nhân viên nhà thuốc thêm nhiều thuốc vào cùng một đơn hàng, hệ thống kiểm tra dữ liệu tương tác mẫu. Nếu phát hiện cặp thuốc cần lưu ý, hệ thống hiển thị cảnh báo gồm mức độ, mô tả nguy cơ, khuyến nghị mẫu và khu vực ghi chú tư vấn.

Ở mức nâng cao, hệ thống có thể mở rộng thêm:

- **AI Pharmacist Copilot**: hỗ trợ tạo câu hỏi, giải thích cảnh báo, tạo ghi chú tư vấn tham khảo.
- **Neo4j Knowledge Graph**: biểu diễn quan hệ giữa thuốc, hoạt chất, nhóm thuốc, triệu chứng, bệnh nền, red flag và tương tác.
- **Graph-RAG**: truy xuất dữ liệu graph để làm context cho AI.
- **AI Guardrail**: kiểm soát AI không chẩn đoán, không kê đơn.
- **AI Audit Log**: lưu lại lịch sử request/response AI để truy vết.
- **Forecast tồn kho**: dự báo nguy cơ hết hàng dựa trên lịch sử bán.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 4. Bối cảnh nghiệp vụ

Nhà thuốc là môi trường có nhiều nghiệp vụ diễn ra liên tục như bán thuốc, nhập thuốc, kiểm tra tồn kho, theo dõi hạn dùng, tư vấn khách hàng, thanh toán và báo cáo doanh thu. Các nghiệp vụ này tuy quen thuộc nhưng có tính đặc thù cao vì thuốc là mặt hàng liên quan đến sức khỏe, có hạn sử dụng, có nhóm thuốc, có hoạt chất, có đơn vị tính, có tồn kho và có thể phát sinh cảnh báo tương tác khi nhiều thuốc được bán cùng lúc.

Trong một ngày hoạt động, nhà thuốc thường thực hiện các công việc sau:

1. Nhân viên nhà thuốc tiếp nhận nhu cầu mua thuốc của khách hàng.
2. Nhân viên tìm kiếm thuốc trong kho hoặc trên hệ thống.
3. Nhân viên kiểm tra số lượng tồn.
4. Nhân viên thêm thuốc vào đơn hàng.
5. Nếu khách mua nhiều thuốc, nhân viên cần lưu ý các cặp thuốc có thể tương tác.
6. Nhân viên tính tiền và nhận thanh toán.
7. Hệ thống hoặc nhân viên tạo hóa đơn.
8. Tồn kho cần được cập nhật sau khi bán.
9. Nhân viên kho nhập thêm thuốc khi hàng sắp hết.
10. Chủ nhà thuốc xem báo cáo doanh thu, tồn kho và thuốc bán chạy.

Nếu các công việc này được quản lý thủ công bằng sổ sách hoặc Excel, nhà thuốc dễ gặp sai sót về số lượng tồn kho, hạn sử dụng, giá bán, lịch sử giao dịch và báo cáo doanh thu. Đặc biệt, khi khách hàng mua nhiều thuốc cùng lúc, nhân viên có thể bỏ sót các cặp thuốc có nguy cơ tương tác nếu không có hệ thống hỗ trợ cảnh báo.

---

## 5. Mô tả nghiệp vụ nhà thuốc

### 5.1. Nghiệp vụ bán thuốc

Bán thuốc là nghiệp vụ diễn ra thường xuyên nhất. Nhân viên nhà thuốc cần tìm thuốc, kiểm tra tồn kho, thêm thuốc vào đơn, tính tiền, thanh toán và tạo hóa đơn. Nếu thao tác thủ công, nhân viên dễ tính sai giá, nhập sai số lượng hoặc quên cập nhật tồn kho sau khi bán.

Hệ thống cần hỗ trợ nghiệp vụ này bằng màn hình bán hàng/POS, cho phép:

- Tìm thuốc nhanh theo tên hoặc mã thuốc.
- Xem số lượng tồn hiện tại.
- Thêm thuốc vào đơn hàng.
- Tự động tính tổng tiền.
- Kiểm tra không bán vượt tồn.
- Kiểm tra tương tác thuốc nếu đơn có nhiều thuốc.
- Ghi nhận thanh toán.
- Tạo hóa đơn.
- Trừ tồn kho sau khi thanh toán thành công.

### 5.2. Nghiệp vụ quản lý thuốc

Nhà thuốc cần quản lý danh sách thuốc với các thông tin cơ bản như tên thuốc, mã thuốc, danh mục, đơn vị tính, giá bán, trạng thái và mô tả. Dữ liệu thuốc phải có cấu trúc để phục vụ tìm kiếm, bán hàng, tồn kho, nhập hàng và báo cáo.

Hệ thống cần hỗ trợ:

- Thêm thuốc mới.
- Sửa thông tin thuốc.
- Xem danh sách thuốc.
- Tìm kiếm thuốc.
- Phân loại thuốc theo danh mục.
- Cập nhật trạng thái thuốc còn bán hoặc ngừng bán.

### 5.3. Nghiệp vụ quản lý tồn kho

Tồn kho là nghiệp vụ quan trọng vì ảnh hưởng trực tiếp đến bán hàng. Nếu số lượng tồn không chính xác, nhà thuốc có thể bán vượt tồn hoặc tưởng còn hàng trong khi thực tế đã hết.

Hệ thống cần hỗ trợ:

- Theo dõi số lượng tồn của từng thuốc.
- Cập nhật tồn kho khi nhập thuốc.
- Trừ tồn kho khi bán hàng thành công.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Xem lịch sử nhập thuốc.

### 5.4. Nghiệp vụ nhập thuốc

Nhân viên kho cần nhập thuốc từ nhà cung cấp. Mỗi lần nhập thuốc cần có phiếu nhập ghi nhận thông tin nhà cung cấp, ngày nhập, danh sách thuốc, số lượng, giá nhập và hạn dùng nếu có.

Hệ thống cần hỗ trợ:

- Tạo phiếu nhập thuốc.
- Chọn nhà cung cấp.
- Thêm thuốc vào phiếu nhập.
- Nhập số lượng và hạn dùng.
- Xác nhận phiếu nhập.
- Cập nhật tồn kho sau khi nhập.

### 5.5. Nghiệp vụ cảnh báo tương tác thuốc

Khi khách hàng mua nhiều thuốc trong cùng một đơn hàng, nhân viên nhà thuốc cần lưu ý các cặp thuốc có thể có tương tác. Trong phạm vi đồ án, chức năng này được triển khai theo hướng **rule-based** bằng dữ liệu mẫu, không sử dụng dữ liệu y khoa thật chưa kiểm định.

Hệ thống cần hỗ trợ:

- Lưu dữ liệu mẫu về các cặp thuốc có tương tác.
- Kiểm tra các cặp thuốc trong đơn hàng.
- Hiển thị cảnh báo nếu có tương tác.
- Hiển thị mức độ cảnh báo.
- Hiển thị mô tả nguy cơ mẫu.
- Hiển thị khuyến nghị xử lý mẫu.
- Cho phép nhân viên ghi chú tư vấn.
- Lưu lịch sử cảnh báo nếu cần.

### 5.6. Nghiệp vụ quản lý khách hàng

Nhà thuốc có thể lưu thông tin khách hàng cơ bản để phục vụ lịch sử mua hàng và chăm sóc khách hàng. Trong MVP, khách hàng không cần đăng nhập.

Thông tin khách hàng gồm:

- Họ tên.
- Số điện thoại.
- Ghi chú cơ bản.
- Lịch sử mua hàng.

### 5.7. Nghiệp vụ báo cáo

Chủ nhà thuốc cần theo dõi tình hình kinh doanh và vận hành. Các báo cáo cơ bản giúp chủ nhà thuốc biết doanh thu, số đơn hàng, thuốc bán chạy, thuốc sắp hết và thuốc gần hết hạn.

Hệ thống cần hỗ trợ:

- Báo cáo doanh thu theo ngày.
- Báo cáo doanh thu theo tháng.
- Danh sách thuốc bán chạy.
- Danh sách thuốc tồn kho thấp.
- Danh sách thuốc gần hết hạn.

---

## 6. Vấn đề hiện tại

| Vấn đề | Mô tả | Tác động |
|---|---|---|
| Sai lệch tồn kho | Không cập nhật kịp sau nhập hoặc sau bán | Dẫn đến thiếu hàng, tồn kho ảo hoặc bán vượt số lượng thực tế |
| Khó theo dõi hạn dùng | Không có cảnh báo tự động về thuốc gần hết hạn | Thuốc gần hết hạn bị bỏ sót, gây lãng phí và khó kiểm soát |
| Bán hàng thủ công | Tính tiền, tạo hóa đơn và trừ kho thủ công | Dễ sai giá, sai số lượng, sai tổng tiền hoặc quên cập nhật kho |
| Khó phát hiện tương tác thuốc | Khách mua nhiều thuốc cùng lúc, nhân viên phải tự nhớ hoặc tự kiểm tra | Nhân viên có thể bỏ sót cảnh báo cần lưu ý |
| Khó thống kê | Doanh thu, thuốc bán chạy và tồn kho phải tổng hợp thủ công | Mất thời gian, dễ sai số liệu và khó ra quyết định |
| Không có lịch sử khách hàng | Không biết khách đã mua gì trong các lần trước | Hạn chế chăm sóc khách hàng và khó xem lại lịch sử mua |

### 6.1. Phân tích chi tiết vấn đề sai lệch tồn kho

Sai lệch tồn kho xảy ra khi số lượng thuốc trên sổ sách hoặc file Excel không khớp với số lượng thực tế. Nguyên nhân có thể do nhân viên quên cập nhật sau khi bán, nhập sai số lượng khi nhập hàng hoặc không trừ kho kịp thời.

Tác động nghiệp vụ:

- Khách hỏi mua nhưng hệ thống báo còn, thực tế đã hết.
- Nhân viên bán vượt tồn.
- Chủ nhà thuốc không biết khi nào cần nhập thêm.
- Báo cáo tồn kho không đáng tin cậy.

Yêu cầu nghiệp vụ tương ứng:

- Hệ thống phải cập nhật tồn kho sau khi nhập và bán.
- Hệ thống phải không cho bán vượt số lượng tồn.
- Hệ thống phải có cảnh báo thuốc sắp hết.

### 6.2. Phân tích chi tiết vấn đề hạn dùng

Thuốc là mặt hàng có hạn sử dụng. Nếu không theo dõi hạn dùng hiệu quả, nhà thuốc có thể bỏ sót các thuốc gần hết hạn.

Tác động nghiệp vụ:

- Tăng nguy cơ tồn hàng không bán được.
- Gây lãng phí chi phí nhập hàng.
- Làm giảm hiệu quả quản lý kho.

Yêu cầu nghiệp vụ tương ứng:

- Hệ thống cần lưu thông tin hạn dùng ở mức phù hợp.
- Hệ thống cần cảnh báo thuốc gần hết hạn.
- Nhân viên kho cần xem danh sách thuốc cần xử lý sớm.

### 6.3. Phân tích chi tiết vấn đề bán hàng thủ công

Nếu nhân viên tính tiền và tạo hóa đơn thủ công, sai sót có thể xảy ra ở nhiều bước: chọn sai thuốc, nhập sai số lượng, tính sai tổng tiền hoặc quên cập nhật tồn kho.

Tác động nghiệp vụ:

- Sai doanh thu.
- Khách hàng nhận hóa đơn không chính xác.
- Tồn kho không còn đúng.
- Mất thời gian xử lý lại.

Yêu cầu nghiệp vụ tương ứng:

- Hệ thống cần hỗ trợ tạo đơn hàng.
- Hệ thống tự động tính tổng tiền.
- Hệ thống tạo hóa đơn sau thanh toán.
- Hệ thống trừ tồn kho sau khi đơn hoàn tất.

### 6.4. Phân tích chi tiết vấn đề tương tác thuốc

Khi khách hàng mua nhiều thuốc trong một đơn, có thể tồn tại các cặp thuốc cần lưu ý. Nếu không có hệ thống hỗ trợ, nhân viên có thể bỏ sót do phải xử lý nhiều khách, nhiều thuốc và nhiều thao tác cùng lúc.

Tác động nghiệp vụ:

- Nhân viên thiếu công cụ hỗ trợ nhắc nhở.
- Khó ghi nhận cảnh báo đã hiển thị và tư vấn đã thực hiện.
- Hệ thống bán hàng thông thường không thể hiện được nghiệp vụ đặc thù của nhà thuốc.

Yêu cầu nghiệp vụ tương ứng:

- Hệ thống cần kiểm tra tương tác thuốc bằng dữ liệu mẫu.
- Cảnh báo cần hiển thị rõ mức độ và khuyến nghị mẫu.
- Nhân viên có thể ghi chú tư vấn.
- Cảnh báo phải có disclaimer an toàn.

---

## 7. Stakeholder

| Stakeholder | Vai trò | Nhu cầu |
|---|---|---|
| Giảng viên | Đánh giá đồ án | Quy trình Công Nghệ Phần Mềm rõ ràng, sản phẩm demo được, tài liệu đầy đủ |
| Nhóm phát triển | Xây dựng hệ thống | Yêu cầu rõ, thiết kế rõ, phạm vi kiểm soát được |
| Admin / Chủ nhà thuốc | Quản lý nhà thuốc | Theo dõi báo cáo, tồn kho, nhân viên, doanh thu và cảnh báo quan trọng |
| Nhân viên nhà thuốc | Bán thuốc tại quầy | Tìm thuốc nhanh, tạo đơn, kiểm tra tồn kho, xem cảnh báo, thanh toán, hóa đơn |
| Nhân viên kho | Nhập kho và theo dõi tồn | Nhập thuốc, theo dõi số lượng tồn, hạn dùng, thuốc sắp hết |
| Khách hàng | Người mua thuốc | Mua nhanh, nhận hóa đơn, có thể lưu lịch sử mua cơ bản |

### 7.1. Phân tích stakeholder chi tiết

#### 7.1.1. Giảng viên

Giảng viên là stakeholder quan trọng trong bối cảnh đồ án. Giảng viên quan tâm đến việc đề tài có phù hợp môn học không, nhóm có thể hiện đúng quy trình Công Nghệ Phần Mềm không và sản phẩm có thể demo được không.

Nhu cầu của giảng viên:

- Đề tài có lý do chọn rõ ràng.
- Phạm vi không quá chung chung.
- Có phân tích nghiệp vụ.
- Có yêu cầu hệ thống.
- Có UML, ERD, kiến trúc, API.
- Có kế hoạch quản lý dự án.
- Có kiểm thử.
- Có demo ổn định.
- Có điểm mới so với CRUD thông thường.

#### 7.1.2. Nhóm phát triển

Nhóm phát triển cần tài liệu rõ ràng để biết phải xây dựng chức năng nào, ưu tiên ra sao và phần nào không thuộc phạm vi.

Nhu cầu của nhóm phát triển:

- Danh sách chức năng rõ ràng.
- Actor và quyền hạn rõ ràng.
- Luồng nghiệp vụ rõ ràng.
- Database và API thống nhất.
- Phân công công việc hợp lý.
- Dữ liệu demo chuẩn bị sẵn.
- Tiêu chí Done và test case rõ ràng.

#### 7.1.3. Admin / Chủ nhà thuốc

Admin là người quản lý nhà thuốc và cần xem tình hình tổng quan.

Nhu cầu của Admin:

- Quản lý tài khoản nhân viên.
- Quản lý thuốc và danh mục.
- Xem số lượng tồn kho.
- Xem thuốc sắp hết và gần hết hạn.
- Xem doanh thu.
- Xem thuốc bán chạy.
- Xem lịch sử đơn hàng.
- Xem AI Audit Log nếu có AI.

#### 7.1.4. Nhân viên nhà thuốc

Nhân viên nhà thuốc là người trực tiếp bán thuốc. Họ cần giao diện thao tác nhanh và ít lỗi.

Nhu cầu của nhân viên nhà thuốc:

- Tìm thuốc nhanh.
- Biết thuốc còn hay hết.
- Tạo đơn hàng dễ dàng.
- Không phải tự tính tiền thủ công.
- Được nhắc khi có tương tác thuốc mẫu.
- Ghi chú tư vấn nếu cần.
- Thanh toán và tạo hóa đơn nhanh.

#### 7.1.5. Nhân viên kho

Nhân viên kho phụ trách nhập thuốc và theo dõi tồn kho.

Nhu cầu của nhân viên kho:

- Tạo phiếu nhập thuốc.
- Cập nhật số lượng tồn.
- Xem thuốc sắp hết.
- Xem thuốc gần hết hạn.
- Xem lịch sử nhập thuốc.
- Quản lý nhà cung cấp nếu cần.

#### 7.1.6. Khách hàng

Khách hàng là người mua thuốc tại nhà thuốc. Trong MVP, khách hàng không trực tiếp dùng hệ thống nhưng thông tin của khách có thể được lưu lại khi mua hàng.

Nhu cầu của khách hàng:

- Được phục vụ nhanh.
- Nhận hóa đơn rõ ràng.
- Thông tin cá nhân được bảo mật.
- Có thể được lưu lịch sử mua hàng cơ bản nếu đồng ý trong bối cảnh demo.

---

## 8. Mục tiêu nghiệp vụ

| ID | Mục tiêu | Mô tả | Giá trị mang lại |
|---|---|---|---|
| BO-01 | Quản lý thuốc tập trung | Lưu thông tin thuốc có cấu trúc | Giúp tra cứu, cập nhật và sử dụng dữ liệu thuốc nhất quán |
| BO-02 | Kiểm soát tồn kho | Theo dõi số lượng và hạn dùng | Giảm sai lệch tồn kho, phát hiện thuốc sắp hết hoặc gần hết hạn |
| BO-03 | Hỗ trợ bán hàng | Tạo đơn, thanh toán, hóa đơn | Giảm thao tác thủ công và tăng tốc độ bán hàng |
| BO-04 | Cảnh báo tương tác | Hỗ trợ nhân viên phát hiện cặp thuốc cần lưu ý | Tạo điểm khác biệt và hỗ trợ an toàn ở mức tham khảo |
| BO-05 | Báo cáo vận hành | Doanh thu, thuốc bán chạy, tồn kho | Hỗ trợ chủ nhà thuốc theo dõi và ra quyết định |
| BO-06 | Hỗ trợ thông minh | AI/Graph hỗ trợ tham khảo nếu làm nâng cao | Tăng giá trị kỹ thuật và độ khó của đồ án |

### 8.1. Chi tiết BO-01: Quản lý thuốc tập trung

Mục tiêu này nhằm đảm bảo dữ liệu thuốc được lưu trữ trong hệ thống thay vì nằm rải rác ở nhiều file hoặc sổ sách khác nhau.

Kết quả mong đợi:

- Mỗi thuốc có mã và thông tin rõ ràng.
- Thuốc được phân loại theo danh mục.
- Nhân viên có thể tìm kiếm thuốc nhanh.
- Dữ liệu thuốc được dùng chung cho bán hàng, tồn kho và báo cáo.

### 8.2. Chi tiết BO-02: Kiểm soát tồn kho

Mục tiêu này nhằm giúp nhà thuốc biết chính xác số lượng thuốc còn lại và phát hiện các tình huống cần xử lý sớm.

Kết quả mong đợi:

- Tồn kho tăng khi nhập thuốc.
- Tồn kho giảm khi bán hàng thành công.
- Không cho bán vượt tồn.
- Có cảnh báo thuốc sắp hết.
- Có cảnh báo thuốc gần hết hạn.

### 8.3. Chi tiết BO-03: Hỗ trợ bán hàng

Mục tiêu này nhằm số hóa quy trình bán thuốc tại quầy.

Kết quả mong đợi:

- Nhân viên tạo đơn hàng nhanh.
- Hệ thống tự tính tổng tiền.
- Hệ thống kiểm tra tồn kho.
- Hệ thống tạo thanh toán và hóa đơn.
- Lịch sử đơn hàng được lưu lại.

### 8.4. Chi tiết BO-04: Cảnh báo tương tác

Mục tiêu này là điểm nổi bật của dự án. Hệ thống không thay thế chuyên gia y tế, nhưng hỗ trợ nhắc nhở nhân viên khi có cặp thuốc nằm trong dữ liệu tương tác mẫu.

Kết quả mong đợi:

- Hệ thống phát hiện cặp thuốc tương tác trong đơn hàng.
- Hiển thị mức độ cảnh báo.
- Hiển thị mô tả và khuyến nghị mẫu.
- Cho phép ghi chú tư vấn.
- Có disclaimer rõ ràng.

### 8.5. Chi tiết BO-05: Báo cáo vận hành

Mục tiêu này nhằm giúp Admin/Chủ nhà thuốc theo dõi tình hình hoạt động.

Kết quả mong đợi:

- Xem doanh thu theo ngày hoặc tháng.
- Xem thuốc bán chạy.
- Xem thuốc tồn kho thấp.
- Xem thuốc gần hết hạn.

### 8.6. Chi tiết BO-06: Hỗ trợ thông minh

Mục tiêu này thuộc phạm vi nâng cao. Nếu nhóm đủ thời gian, hệ thống có thể tích hợp AI và graph để tăng điểm kỹ thuật.

Kết quả mong đợi:

- AI Copilot hỗ trợ tạo câu hỏi hoặc ghi chú tham khảo.
- Graph biểu diễn quan hệ thuốc, hoạt chất và tương tác.
- Graph-RAG truy xuất graph làm context cho AI.
- AI Guardrail kiểm soát nội dung AI.
- AI Audit Log lưu lịch sử gọi AI.

---

## 9. Quy trình nghiệp vụ hiện tại

### 9.1. Quy trình bán thuốc thủ công

Quy trình hiện tại nếu nhà thuốc quản lý thủ công có thể diễn ra như sau:

1. Khách hàng đến nhà thuốc và yêu cầu mua thuốc.
2. Nhân viên hỏi nhu cầu hoặc tìm thuốc theo yêu cầu của khách.
3. Nhân viên kiểm tra thuốc trên kệ hoặc trong kho.
4. Nhân viên ghi lại thuốc và số lượng bằng tay hoặc nhập vào file Excel.
5. Nhân viên tự tính tổng tiền.
6. Nhân viên nhận tiền từ khách.
7. Nhân viên viết hóa đơn thủ công hoặc không có hóa đơn chi tiết.
8. Nhân viên cập nhật tồn kho sau, hoặc quên cập nhật.
9. Chủ nhà thuốc tổng hợp doanh thu cuối ngày bằng tay.

### 9.2. Vấn đề trong quy trình hiện tại

| Bước | Vấn đề có thể xảy ra |
|---|---|
| Tìm thuốc | Mất thời gian nếu không có công cụ tìm kiếm |
| Kiểm tra tồn | Không biết chính xác còn bao nhiêu thuốc |
| Ghi đơn | Dễ ghi sai tên thuốc hoặc số lượng |
| Tính tiền | Dễ tính sai tổng tiền |
| Kiểm tra tương tác | Phụ thuộc hoàn toàn vào kinh nghiệm nhân viên |
| Thanh toán | Không lưu đầy đủ thông tin giao dịch |
| Hóa đơn | Hóa đơn có thể thiếu thông tin |
| Cập nhật tồn kho | Dễ quên cập nhật sau bán |
| Báo cáo | Mất thời gian tổng hợp thủ công |

---

## 10. Quy trình nghiệp vụ đề xuất

### 10.1. Luồng bán thuốc tại quầy

Quy trình bán thuốc tại quầy sau khi áp dụng hệ thống:

1. Nhân viên đăng nhập vào hệ thống.
2. Nhân viên mở màn hình bán thuốc/POS.
3. Nhân viên tìm kiếm thuốc theo tên, mã hoặc danh mục.
4. Nhân viên thêm thuốc vào đơn hàng.
5. Hệ thống kiểm tra tồn kho.
6. Nếu đủ tồn, thuốc được thêm vào đơn.
7. Nếu không đủ tồn, hệ thống hiển thị thông báo không thể bán vượt tồn.
8. Nếu đơn có nhiều thuốc, hệ thống kiểm tra tương tác thuốc.
9. Nếu có cảnh báo, hệ thống hiển thị mức độ và khuyến nghị mẫu.
10. Nhân viên đọc cảnh báo và ghi chú tư vấn nếu cần.
11. Nhân viên chọn khách hàng có sẵn hoặc tạo khách hàng mới.
12. Hệ thống tính tổng tiền đơn hàng.
13. Nhân viên chọn phương thức thanh toán.
14. Nhân viên xác nhận thanh toán.
15. Hệ thống tạo hóa đơn.
16. Hệ thống trừ tồn kho.
17. Nhân viên in hoặc xem hóa đơn.

### 10.2. Luồng nhập thuốc

1. Nhân viên kho đăng nhập vào hệ thống.
2. Nhân viên kho mở màn hình nhập thuốc.
3. Chọn nhà cung cấp.
4. Thêm thuốc vào phiếu nhập.
5. Nhập số lượng, giá nhập và hạn dùng nếu có.
6. Kiểm tra thông tin phiếu nhập.
7. Xác nhận nhập thuốc.
8. Hệ thống cập nhật tồn kho.
9. Hệ thống lưu lịch sử nhập thuốc.

### 10.3. Luồng cảnh báo thuốc sắp hết

1. Hệ thống lưu ngưỡng tồn kho tối thiểu cho từng thuốc hoặc cấu hình chung.
2. Khi Admin hoặc nhân viên kho mở dashboard/tồn kho, hệ thống kiểm tra số lượng tồn.
3. Thuốc có số lượng tồn nhỏ hơn hoặc bằng ngưỡng được đưa vào danh sách cảnh báo.
4. Nhân viên kho xem danh sách và lập kế hoạch nhập thêm.

### 10.4. Luồng cảnh báo thuốc gần hết hạn

1. Hệ thống lưu hạn dùng của thuốc hoặc lô thuốc.
2. Hệ thống so sánh hạn dùng với ngày hiện tại.
3. Nếu thuốc nằm trong khoảng cảnh báo cấu hình, ví dụ 30/60/90 ngày, hệ thống hiển thị cảnh báo.
4. Nhân viên kho xem danh sách thuốc cần xử lý sớm.

### 10.5. Luồng báo cáo vận hành

1. Admin đăng nhập vào hệ thống.
2. Admin mở màn hình Dashboard hoặc Report.
3. Chọn khoảng thời gian cần xem.
4. Hệ thống tổng hợp dữ liệu đơn hàng, thanh toán và tồn kho.
5. Hệ thống hiển thị doanh thu, số đơn hàng, thuốc bán chạy, thuốc sắp hết và thuốc gần hết hạn.

### 10.6. Luồng AI/Graph nâng cao nếu triển khai

1. Nhân viên tạo phiên tư vấn hoặc mở cảnh báo tương tác.
2. Hệ thống lấy dữ liệu liên quan từ database hoặc graph.
3. Graph Service truy vấn quan hệ thuốc, hoạt chất, tương tác nếu có Neo4j.
4. Backend tạo context cho AI.
5. Guardrail kiểm tra input.
6. AI Copilot sinh nội dung hỗ trợ tham khảo.
7. Guardrail kiểm tra output.
8. Hệ thống hiển thị kết quả cho nhân viên.
9. Nhân viên xác nhận hoặc chỉnh sửa trước khi lưu.
10. Hệ thống lưu AI Audit Log.

---

## 11. Business Rules

Business Rules là các quy tắc nghiệp vụ mà hệ thống cần tuân thủ.

| Mã rule | Quy tắc nghiệp vụ | Mô tả |
|---|---|---|
| BR-01 | Người dùng phải đăng nhập | Chỉ người dùng có tài khoản hợp lệ mới được truy cập hệ thống |
| BR-02 | Phân quyền theo vai trò | Admin, Nhân viên nhà thuốc và Nhân viên kho có quyền khác nhau |
| BR-03 | Không bán vượt tồn kho | Số lượng bán không được lớn hơn số lượng tồn hiện tại |
| BR-04 | Tồn kho tăng sau nhập | Khi phiếu nhập được xác nhận, tồn kho phải tăng |
| BR-05 | Tồn kho giảm sau thanh toán | Tồn kho chỉ giảm khi đơn hàng thanh toán thành công |
| BR-06 | Đơn hàng phải có ít nhất một thuốc | Không cho thanh toán đơn hàng rỗng |
| BR-07 | Kiểm tra tương tác khi có từ hai thuốc | Nếu đơn có từ hai thuốc trở lên, hệ thống kiểm tra tương tác |
| BR-08 | Cảnh báo phải hiển thị disclaimer | Mọi cảnh báo tương tác phải có câu thông tin chỉ mang tính tham khảo |
| BR-09 | Hóa đơn chỉ tạo sau thanh toán | Không tạo hóa đơn cho đơn chưa thanh toán |
| BR-10 | Khách hàng không bắt buộc đăng nhập | MVP chỉ lưu thông tin khách hàng cơ bản |
| BR-11 | AI không chẩn đoán, không kê đơn | Nếu có AI, AI chỉ hỗ trợ tham khảo |
| BR-12 | Nội dung AI cần được xác nhận | Người dùng phải xác nhận trước khi lưu nội dung AI |

---

## 12. Phạm vi nghiệp vụ

### 12.1. Trong phạm vi nghiệp vụ

| Nhóm nghiệp vụ | Nội dung |
|---|---|
| Tài khoản | Đăng nhập, đăng xuất, phân quyền |
| Thuốc | Quản lý thuốc và danh mục thuốc |
| Kho | Nhập thuốc, theo dõi tồn kho, cảnh báo sắp hết/gần hết hạn |
| Bán hàng | Tạo đơn bán thuốc, thêm thuốc, tính tiền |
| Tương tác thuốc | Kiểm tra tương tác rule-based bằng dữ liệu mẫu |
| Khách hàng | Lưu thông tin khách hàng cơ bản |
| Thanh toán | Ghi nhận thanh toán tiền mặt/chuyển khoản mô phỏng |
| Hóa đơn | Tạo và xem/in hóa đơn |
| Báo cáo | Doanh thu, thuốc bán chạy, tồn kho |
| AI/Graph | Hỗ trợ tham khảo ở mức nâng cao hoặc mô phỏng |

### 12.2. Ngoài phạm vi nghiệp vụ

| Ngoài phạm vi | Lý do |
|---|---|
| Thanh toán online thật | Cần tích hợp cổng thanh toán và bảo mật giao dịch |
| Chẩn đoán bệnh | Không thuộc phạm vi hệ thống quản lý nhà thuốc |
| Kê đơn thuốc bằng AI | Không an toàn và vượt phạm vi đồ án |
| Dữ liệu y khoa thật chưa kiểm định | Cần chuyên gia y tế kiểm chứng |
| Mobile app | Tập trung vào website |
| Quản lý nhiều chi nhánh | Tăng độ phức tạp, để phát triển sau |
| Tích hợp bảo hiểm y tế | Không phù hợp MVP |
| Sử dụng dữ liệu bệnh nhân thật | Có rủi ro bảo mật và quyền riêng tư |

---

## 13. Yêu cầu nghiệp vụ mức cao

| ID | Yêu cầu nghiệp vụ | Mô tả | Stakeholder liên quan | Ưu tiên |
|---|---|---|---|---|
| BREQ-01 | Hệ thống quản lý người dùng nội bộ | Người dùng đăng nhập và sử dụng chức năng theo vai trò | Admin, Nhân viên | High |
| BREQ-02 | Hệ thống quản lý dữ liệu thuốc | Thuốc được lưu trữ, cập nhật và tìm kiếm tập trung | Admin, Staff | High |
| BREQ-03 | Hệ thống quản lý tồn kho | Theo dõi số lượng, nhập thuốc và cảnh báo tồn kho | Admin, Warehouse | High |
| BREQ-04 | Hệ thống hỗ trợ bán thuốc | Tạo đơn, thêm thuốc, tính tiền, thanh toán | Staff | High |
| BREQ-05 | Hệ thống kiểm tra tương tác thuốc | Cảnh báo cặp thuốc theo dữ liệu mẫu | Staff, Admin | High |
| BREQ-06 | Hệ thống quản lý khách hàng | Lưu thông tin khách hàng và lịch sử mua cơ bản | Staff, Admin | Medium |
| BREQ-07 | Hệ thống tạo hóa đơn | Tạo hóa đơn sau khi thanh toán | Staff, Customer | High |
| BREQ-08 | Hệ thống báo cáo vận hành | Báo cáo doanh thu, tồn kho, thuốc bán chạy | Admin | Medium |
| BREQ-09 | Hệ thống hỗ trợ AI/Graph nâng cao | AI/Graph hỗ trợ tham khảo nếu triển khai | Staff, Admin | Medium |
| BREQ-10 | Hệ thống đảm bảo an toàn thông tin cảnh báo | Có disclaimer và không thay thế chuyên gia y tế | Tất cả stakeholder | High |

---

## 14. Giá trị nghiệp vụ kỳ vọng

| Giá trị | Mô tả | Người hưởng lợi |
|---|---|---|
| Giảm sai sót tồn kho | Cập nhật tồn kho tự động sau nhập/bán | Admin, Warehouse, Staff |
| Tăng tốc độ bán hàng | Tìm thuốc, tạo đơn, tính tiền nhanh hơn | Staff, Customer |
| Hỗ trợ cảnh báo | Hệ thống nhắc nhở tương tác thuốc mẫu | Staff |
| Dễ theo dõi doanh thu | Báo cáo doanh thu tự động | Admin |
| Dễ kiểm soát thuốc gần hết hạn | Có cảnh báo theo ngày cấu hình | Warehouse, Admin |
| Tăng tính chuyên nghiệp | Có hóa đơn và lịch sử mua hàng | Customer, Admin |
| Tạo điểm mới kỹ thuật | AI/Graph/Guardrail/Audit Log | Nhóm phát triển, Giảng viên |

---

## 15. Chỉ số đánh giá thành công nghiệp vụ

| Mã KPI | Chỉ số | Cách đo | Mục tiêu trong demo |
|---|---|---|---|
| KPI-01 | Thời gian tạo đơn | Thời gian từ tìm thuốc đến thanh toán | Demo hoàn tất một đơn trong vài phút |
| KPI-02 | Độ chính xác tồn kho | Tồn kho sau nhập/bán được cập nhật đúng | Tồn kho thay đổi đúng sau demo |
| KPI-03 | Cảnh báo tương tác | Hệ thống phát hiện đúng cặp thuốc mẫu | Thêm hai thuốc tương tác và thấy cảnh báo |
| KPI-04 | Báo cáo doanh thu | Báo cáo lấy từ đơn đã thanh toán | Dashboard/report hiển thị số liệu đúng |
| KPI-05 | Tính ổn định demo | Luồng demo chính không lỗi nghiêm trọng | Demo chạy được từ đăng nhập đến hóa đơn |
| KPI-06 | An toàn AI/cảnh báo | Có disclaimer và không chẩn đoán/kê đơn | Màn hình AI/cảnh báo hiển thị đúng ràng buộc |

---

## 16. Dữ liệu nghiệp vụ chính

| Dữ liệu | Mô tả | Dùng trong nghiệp vụ |
|---|---|---|
| User | Tài khoản người dùng nội bộ | Đăng nhập, phân quyền, ghi nhận nhân viên bán hàng |
| Role | Vai trò người dùng | Phân quyền chức năng |
| Medicine | Thông tin thuốc | Quản lý thuốc, bán hàng, tồn kho |
| MedicineCategory | Danh mục thuốc | Phân loại và tìm kiếm thuốc |
| Inventory | Số lượng tồn | Kiểm tra tồn kho, cảnh báo sắp hết |
| StockImport | Phiếu nhập thuốc | Nhập kho |
| StockImportDetail | Chi tiết phiếu nhập | Cập nhật số lượng thuốc nhập |
| Customer | Thông tin khách hàng | Bán hàng, lịch sử mua |
| Order | Đơn bán thuốc | Bán hàng, báo cáo doanh thu |
| OrderDetail | Chi tiết đơn hàng | Danh sách thuốc trong đơn |
| Payment | Thông tin thanh toán | Xác nhận thanh toán |
| Invoice | Hóa đơn | In/xem hóa đơn |
| DrugInteraction | Dữ liệu tương tác mẫu | Kiểm tra tương tác thuốc |
| InteractionAlert | Lịch sử cảnh báo | Ghi nhận cảnh báo đã xuất hiện |
| ConsultationNote | Ghi chú tư vấn | Lưu ghi chú của nhân viên |
| AILog | Lịch sử gọi AI nếu có | Audit và truy vết AI |

---

## 17. Ràng buộc nghiệp vụ

| Ràng buộc | Mô tả |
|---|---|
| Dữ liệu thuốc là dữ liệu mẫu | Không sử dụng như dữ liệu y khoa thật |
| Cảnh báo chỉ mang tính tham khảo | Không thay thế tư vấn chuyên gia y tế |
| AI không được chẩn đoán | Nếu có AI, AI không đưa ra chẩn đoán bệnh |
| AI không được kê đơn | AI không chỉ định thuốc điều trị cho khách hàng |
| Thanh toán là mô phỏng | Không tích hợp cổng thanh toán thật |
| Khách hàng không bắt buộc đăng nhập | MVP chỉ lưu thông tin cơ bản |
| Phân quyền cần rõ ràng | Người dùng chỉ dùng chức năng phù hợp vai trò |
| Dữ liệu demo không dùng thông tin thật | Tránh rủi ro bảo mật thông tin cá nhân |

---

## 18. Rủi ro nghiệp vụ

| Rủi ro | Mô tả | Mức độ | Biện pháp xử lý |
|---|---|---|---|
| Phạm vi quá rộng | Thêm quá nhiều AI/Graph trước khi MVP hoàn thành | Cao | Ưu tiên MVP, đưa nâng cao vào Could-have |
| Hiểu nhầm AI là tư vấn y tế | Người xem nghĩ hệ thống chẩn đoán/kê đơn | Cao | Luôn có disclaimer và guardrail |
| Dữ liệu tương tác không chính xác | Dữ liệu mẫu bị hiểu nhầm là dữ liệu thật | Cao | Ghi rõ dữ liệu mẫu phục vụ đồ án |
| Luồng bán hàng chưa ổn định | Demo bị lỗi ở luồng chính | Cao | Test kỹ luồng từ tạo đơn đến hóa đơn |
| Báo cáo không có dữ liệu | Thiếu seed data cho doanh thu | Trung bình | Chuẩn bị dữ liệu mẫu trước demo |
| Phân quyền chưa rõ | Actor dùng sai chức năng | Trung bình | Thiết kế role và test theo từng vai trò |
| Giao diện quá phức tạp | Nhân viên khó thao tác trong demo | Trung bình | Ưu tiên giao diện đơn giản, rõ ràng |

---

## 19. Mapping vấn đề với mục tiêu nghiệp vụ

| Vấn đề hiện tại | Mục tiêu nghiệp vụ liên quan | Chức năng giải quyết |
|---|---|---|
| Sai lệch tồn kho | BO-02 | Quản lý tồn kho, nhập thuốc, trừ kho sau bán |
| Khó theo dõi hạn dùng | BO-02 | Cảnh báo thuốc gần hết hạn |
| Bán hàng thủ công | BO-03 | POS, tạo đơn, thanh toán, hóa đơn |
| Khó phát hiện tương tác | BO-04 | Rule-based Drug Interaction Alert |
| Khó thống kê | BO-05 | Báo cáo doanh thu, thuốc bán chạy |
| Không có lịch sử khách hàng | BO-03, BO-05 | Quản lý khách hàng, lịch sử mua hàng |
| Cần điểm mới kỹ thuật | BO-06 | AI Copilot, Graph, Graph-RAG, Audit Log |

---

## 20. Kết luận

Tài liệu **BRD - Business Requirement Document** đã mô tả bối cảnh nghiệp vụ, vấn đề hiện tại, stakeholder, mục tiêu nghiệp vụ và quy trình đề xuất cho hệ thống **PharmaAssist AI Intelligence**. Qua phân tích, có thể thấy nhà thuốc cần một hệ thống hỗ trợ quản lý thuốc, tồn kho, nhập thuốc, bán hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành.

Phiên bản MVP nên tập trung vào các chức năng cốt lõi như đăng nhập, phân quyền, quản lý thuốc, quản lý tồn kho, nhập thuốc, bán hàng, kiểm tra tồn kho, kiểm tra tương tác thuốc rule-based, thanh toán, hóa đơn và báo cáo cơ bản. Đây là các chức năng đủ để chứng minh giá trị nghiệp vụ của hệ thống.

Các chức năng AI Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail, AI Audit Log và Forecast tồn kho được xem là phần nâng cao. Nếu triển khai được, chúng sẽ giúp đề tài đạt mức Khó hoặc Rất Khó, đồng thời tạo điểm nhấn kỹ thuật khi demo và bảo vệ.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

