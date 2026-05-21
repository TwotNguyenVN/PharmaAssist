# 06_SRS_SOFTWARE_REQUIREMENT

**Mã tài liệu:** 06_SRS_Software_Requirement  
**Tên tài liệu:** Software Requirement Specification  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Đặc tả yêu cầu phần mềm  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Database Designer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Software Requirement Specification**, viết tắt là **SRS**, đặc tả chi tiết các yêu cầu phần mềm của hệ thống **PharmaAssist AI Intelligence**. Tài liệu này là cơ sở chính cho quá trình thiết kế hệ thống, thiết kế cơ sở dữ liệu, thiết kế API, lập trình, kiểm thử, nghiệm thu và demo sản phẩm.

SRS chuyển đổi các nhu cầu nghiệp vụ đã được mô tả trong BRD thành các yêu cầu phần mềm cụ thể, có thể thiết kế, triển khai và kiểm thử. Mỗi yêu cầu trong tài liệu cần đủ rõ để nhóm phát triển hiểu phải xây dựng gì, tester hiểu cần kiểm thử gì và giảng viên có thể đánh giá phạm vi hệ thống.

Tài liệu này giúp đảm bảo:

- Nhóm phát triển hiểu đúng hệ thống cần xây dựng.
- Các chức năng được xác định rõ trước khi code.
- Các actor và quyền hạn được mô tả thống nhất.
- Các yêu cầu chức năng có mã định danh để theo dõi.
- Các yêu cầu phi chức năng có tiêu chí đánh giá.
- Tester có cơ sở viết test case.
- Backend và frontend có cơ sở thiết kế API và giao diện.
- Database designer có cơ sở thiết kế bảng dữ liệu.
- Nhóm có tài liệu để đối chiếu khi nghiệm thu MVP.

---

## 2. Phạm vi tài liệu

Tài liệu SRS này mô tả yêu cầu phần mềm cho hệ thống **PharmaAssist AI Intelligence**, bao gồm các nhóm chức năng chính:

- Quản lý người dùng và phân quyền.
- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Quản lý khách hàng.
- Quản lý nhà cung cấp ở mức cơ bản nếu cần.
- Nhập thuốc.
- Quản lý tồn kho.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Bán thuốc tại quầy.
- Tạo đơn bán thuốc.
- Kiểm tra tồn kho khi bán.
- Kiểm tra tương tác thuốc bằng dữ liệu mẫu.
- Ghi chú tư vấn.
- Thanh toán mô phỏng.
- Tạo và in/xem hóa đơn.
- Báo cáo doanh thu.
- Báo cáo thuốc bán chạy.
- Báo cáo tồn kho.
- AI Copilot ở mức nâng cao hoặc mô phỏng.
- Neo4j Knowledge Graph ở mức nâng cao hoặc mô phỏng.
- Graph-RAG ở mức nâng cao hoặc mô phỏng.
- AI Guardrail và AI Audit Log nếu triển khai AI.

Tài liệu này không mô tả chi tiết source code, thuật toán triển khai cụ thể, cấu trúc thư mục dự án hoặc thiết kế giao diện chi tiết từng pixel. Những nội dung đó sẽ được trình bày trong các tài liệu thiết kế hệ thống, API Specification, UI/UX Requirement và Technical Design.

---

## 3. Tổng quan hệ thống

**PharmaAssist AI Intelligence** là một website hỗ trợ nhà thuốc quản lý hoạt động bán thuốc, tồn kho, nhập thuốc, khách hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành. Hệ thống được xây dựng trong phạm vi đồ án môn **Công Nghệ Phần Mềm**, tập trung vào việc thể hiện quy trình phân tích, thiết kế, triển khai và kiểm thử phần mềm.

Ở mức MVP, hệ thống cần hỗ trợ các nghiệp vụ cốt lõi của nhà thuốc:

- Admin quản lý người dùng, thuốc, danh mục, báo cáo.
- Nhân viên kho nhập thuốc, theo dõi tồn kho, xem thuốc sắp hết/gần hết hạn.
- Nhân viên nhà thuốc tìm thuốc, tạo đơn bán, kiểm tra tồn kho, xem cảnh báo tương tác, thanh toán và tạo hóa đơn.
- Khách hàng không bắt buộc đăng nhập nhưng có thể được lưu thông tin cơ bản khi mua hàng.

Điểm nổi bật của hệ thống là chức năng **Rule-based Drug Interaction Alert**. Khi nhân viên thêm nhiều thuốc vào cùng một đơn hàng, hệ thống kiểm tra các cặp thuốc trong đơn dựa trên dữ liệu tương tác mẫu. Nếu phát hiện tương tác, hệ thống hiển thị cảnh báo gồm tên hai thuốc, mức độ, mô tả nguy cơ mẫu, khuyến nghị xử lý mẫu và ghi chú tư vấn.

Ở mức nâng cao, hệ thống có thể tích hợp AI Copilot, Neo4j Knowledge Graph, Graph-RAG, AI Guardrail và AI Audit Log. Các chức năng này giúp đề tài đạt mức Khó hoặc Rất Khó nhưng không được làm thay đổi nguyên tắc an toàn: hệ thống không chẩn đoán bệnh, không kê đơn thuốc và không thay thế chuyên gia y tế.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 4. Phạm vi hệ thống

Hệ thống hỗ trợ các nhóm chức năng sau:

| Nhóm chức năng | Nội dung |
|---|---|
| User & Role | Quản lý người dùng, đăng nhập, đăng xuất, phân quyền |
| Medicine | Quản lý thuốc, danh mục thuốc, tìm kiếm thuốc |
| Inventory | Nhập thuốc, cập nhật tồn kho, kiểm tra tồn kho |
| Inventory Alert | Cảnh báo thuốc sắp hết, cảnh báo thuốc gần hết hạn |
| Customer | Quản lý thông tin khách hàng cơ bản |
| Sales | Tạo đơn bán thuốc, thêm thuốc vào đơn, kiểm tra tồn kho |
| Drug Interaction | Kiểm tra tương tác thuốc bằng rule-based data |
| Consultation Note | Ghi chú tư vấn khi có cảnh báo hoặc khi cần lưu ý |
| Payment | Ghi nhận thanh toán mô phỏng |
| Invoice | Tạo và xem/in hóa đơn |
| Report | Báo cáo doanh thu, thuốc bán chạy, tồn kho |
| AI/Graph Advanced | AI Copilot, Neo4j Graph, Graph-RAG, Guardrail, Audit Log nếu trong phạm vi triển khai |

---

## 5. Định nghĩa, thuật ngữ và viết tắt

| Thuật ngữ | Ý nghĩa |
|---|---|
| Admin | Chủ nhà thuốc hoặc người quản trị hệ thống |
| Staff | Nhân viên nhà thuốc, người bán thuốc tại quầy |
| Warehouse Staff | Nhân viên kho, người nhập thuốc và theo dõi tồn kho |
| Customer | Khách hàng mua thuốc tại nhà thuốc |
| Medicine | Thuốc được quản lý trong hệ thống |
| Medicine Category | Danh mục thuốc |
| Inventory | Tồn kho thuốc |
| Stock Import | Phiếu nhập thuốc |
| Order | Đơn bán thuốc |
| Payment | Thanh toán cho đơn hàng |
| Invoice | Hóa đơn sau thanh toán |
| Drug Interaction | Dữ liệu tương tác thuốc mẫu |
| Interaction Alert | Cảnh báo tương tác thuốc hiển thị trong đơn hàng |
| Consultation Note | Ghi chú tư vấn của nhân viên |
| AI Copilot | Thành phần AI hỗ trợ tạo câu hỏi, giải thích cảnh báo, tạo ghi chú tham khảo |
| Knowledge Graph | Đồ thị tri thức lưu quan hệ thuốc, hoạt chất, triệu chứng, tương tác |
| Neo4j | Cơ sở dữ liệu graph dùng cho Knowledge Graph |
| Graph-RAG | Cơ chế truy xuất graph làm context cho AI |
| Guardrail | Cơ chế kiểm soát input/output AI để tránh nội dung không an toàn |
| Audit Log | Nhật ký lưu lại thao tác quan trọng hoặc request/response AI |
| MVP | Minimum Viable Product, phiên bản tối thiểu có thể demo |
| FR | Functional Requirement, yêu cầu chức năng |
| NFR | Non-functional Requirement, yêu cầu phi chức năng |

---

## 6. Actor hệ thống

| Actor | Mô tả | Mức truy cập tổng quát |
|---|---|---|
| Admin | Quản lý toàn hệ thống | Quản lý user, thuốc, danh mục, báo cáo, cấu hình, xem log |
| Nhân viên nhà thuốc | Bán thuốc, xem cảnh báo, thanh toán | Tìm thuốc, tạo đơn, xem tồn kho, xem cảnh báo, thanh toán, hóa đơn, khách hàng |
| Nhân viên kho | Nhập thuốc, theo dõi tồn kho | Nhập thuốc, xem tồn kho, xem cảnh báo sắp hết/gần hết hạn, nhà cung cấp nếu có |
| Khách hàng | Người mua thuốc, không bắt buộc đăng nhập | Không truy cập hệ thống trong MVP; thông tin được nhân viên lưu khi bán hàng |
| AI System | Sinh nội dung hỗ trợ nếu có | Tạo câu hỏi, giải thích cảnh báo, tạo ghi chú, báo cáo tham khảo |
| Neo4j | Cung cấp dữ liệu graph nếu có | Truy vấn quan hệ thuốc, hoạt chất, triệu chứng, tương tác |

---

## 7. Giả định và phụ thuộc

### 7.1. Giả định

| Mã | Giả định |
|---|---|
| ASM-01 | Hệ thống được triển khai dưới dạng website phục vụ demo đồ án |
| ASM-02 | Người dùng nội bộ được cấp tài khoản trước khi sử dụng |
| ASM-03 | Khách hàng không cần đăng nhập trong MVP |
| ASM-04 | Dữ liệu thuốc, tương tác, triệu chứng, bệnh nền và khuyến nghị là dữ liệu mẫu |
| ASM-05 | Thanh toán chỉ được mô phỏng, không tích hợp cổng thanh toán thật |
| ASM-06 | AI có thể được mô phỏng bằng MockAI nếu không dùng provider thật |
| ASM-07 | Neo4j có thể triển khai thật hoặc mô phỏng tùy phạm vi nhóm |
| ASM-08 | Hệ thống chạy trong môi trường local/demo, không yêu cầu production |

### 7.2. Phụ thuộc

| Mã | Phụ thuộc | Ảnh hưởng |
|---|---|---|
| DEP-01 | Thiết kế database | Backend API và dữ liệu demo phụ thuộc vào schema |
| DEP-02 | Dữ liệu thuốc mẫu | Chức năng bán hàng, tồn kho, tương tác và báo cáo cần dữ liệu mẫu |
| DEP-03 | Dữ liệu tương tác mẫu | Chức năng cảnh báo tương tác cần bảng DrugInteraction |
| DEP-04 | API backend | Frontend phụ thuộc vào endpoint và response format |
| DEP-05 | AI Provider hoặc MockAI | AI Copilot phụ thuộc vào provider hoặc mô phỏng |
| DEP-06 | Neo4j hoặc graph mock | Graph-RAG và Graph Explorer phụ thuộc vào dữ liệu graph |

---

## 8. Yêu cầu chức năng tổng quát

| Mã yêu cầu | Tên chức năng | Mô tả | Actor | Độ ưu tiên |
|---|---|---|---|---|
| FR-01 | Đăng nhập | Người dùng đăng nhập bằng tài khoản nội bộ | Admin, Nhân viên nhà thuốc, Nhân viên kho | High |
| FR-02 | Đăng xuất | Người dùng thoát khỏi hệ thống | Admin, Nhân viên nhà thuốc, Nhân viên kho | High |
| FR-03 | Phân quyền | Hệ thống giới hạn chức năng theo vai trò | Admin, Hệ thống | High |
| FR-04 | Quản lý thuốc | Thêm, sửa, xóa/ẩn, tìm kiếm thuốc | Admin | High |
| FR-05 | Quản lý danh mục | Thêm, sửa, xóa/ẩn danh mục thuốc | Admin | High |
| FR-06 | Nhập thuốc | Tạo phiếu nhập thuốc | Nhân viên kho | High |
| FR-07 | Quản lý tồn kho | Xem và cập nhật tồn kho | Admin, Nhân viên kho | High |
| FR-08 | Cảnh báo sắp hết | Hiển thị thuốc dưới ngưỡng tồn | Hệ thống, Admin, Nhân viên kho | High |
| FR-09 | Cảnh báo gần hết hạn | Hiển thị thuốc gần hết hạn | Hệ thống, Admin, Nhân viên kho | High |
| FR-10 | Tạo đơn bán thuốc | Nhân viên tạo đơn cho khách | Nhân viên nhà thuốc | High |
| FR-11 | Kiểm tra tồn kho | Không cho bán vượt tồn | Hệ thống | High |
| FR-12 | Kiểm tra tương tác thuốc | Kiểm tra cặp thuốc trong đơn | Hệ thống | High |
| FR-13 | Thanh toán | Ghi nhận thanh toán | Nhân viên nhà thuốc | High |
| FR-14 | Hóa đơn | Tạo và in/xem hóa đơn | Hệ thống, Nhân viên nhà thuốc | High |
| FR-15 | Quản lý khách hàng | Lưu thông tin cơ bản khách hàng | Nhân viên nhà thuốc, Admin | Medium |
| FR-16 | Báo cáo doanh thu | Thống kê doanh thu | Admin | Medium |
| FR-17 | AI Copilot | Tạo câu hỏi/ghi chú tham khảo | Nhân viên nhà thuốc, AI System | Medium |
| FR-18 | Graph Explorer | Xem quan hệ thuốc/tương tác | Admin, Nhân viên nhà thuốc, Neo4j | Medium |

---

## 9. Yêu cầu chức năng chi tiết

## 9.1. FR-01 - Đăng nhập

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-01 |
| Tên chức năng | Đăng nhập |
| Actor | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Người dùng nội bộ đăng nhập vào hệ thống bằng username và password. |
| Tiền điều kiện | Người dùng đã có tài khoản trong hệ thống và tài khoản đang hoạt động. |
| Hậu điều kiện | Người dùng đăng nhập thành công và được chuyển đến màn hình phù hợp với vai trò. |

### Luồng chính

1. Người dùng mở trang đăng nhập.
2. Người dùng nhập username và password.
3. Người dùng bấm nút đăng nhập.
4. Hệ thống kiểm tra thông tin tài khoản.
5. Nếu hợp lệ, hệ thống tạo phiên đăng nhập hoặc token.
6. Hệ thống xác định vai trò của người dùng.
7. Hệ thống điều hướng đến dashboard hoặc màn hình phù hợp.

### Luồng thay thế

| Mã | Tình huống | Xử lý |
|---|---|---|
| A1 | Username hoặc password sai | Hệ thống hiển thị thông báo đăng nhập thất bại |
| A2 | Tài khoản bị khóa | Hệ thống thông báo tài khoản không được phép truy cập |
| A3 | Thiếu username hoặc password | Hệ thống yêu cầu nhập đầy đủ thông tin |

### Acceptance Criteria

- Người dùng đăng nhập thành công với tài khoản hợp lệ.
- Người dùng không đăng nhập được với thông tin sai.
- Mật khẩu không hiển thị rõ trên giao diện.
- Sau khi đăng nhập, người dùng chỉ thấy chức năng phù hợp với vai trò.

---

## 9.2. FR-02 - Đăng xuất

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-02 |
| Tên chức năng | Đăng xuất |
| Actor | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Người dùng thoát khỏi phiên làm việc hiện tại. |
| Tiền điều kiện | Người dùng đã đăng nhập. |
| Hậu điều kiện | Phiên đăng nhập bị hủy, người dùng quay về trang đăng nhập. |

### Luồng chính

1. Người dùng bấm nút đăng xuất.
2. Hệ thống hủy token hoặc phiên đăng nhập.
3. Hệ thống chuyển người dùng về trang đăng nhập.

### Acceptance Criteria

- Người dùng đăng xuất thành công.
- Sau khi đăng xuất, người dùng không thể truy cập trang nội bộ nếu chưa đăng nhập lại.

---

## 9.3. FR-03 - Phân quyền

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-03 |
| Tên chức năng | Phân quyền |
| Actor | Admin, Hệ thống |
| Độ ưu tiên | High |
| Mô tả | Hệ thống giới hạn chức năng và API theo vai trò người dùng. |
| Tiền điều kiện | Người dùng đã đăng nhập. |
| Hậu điều kiện | Người dùng chỉ truy cập được chức năng phù hợp với vai trò. |

### Vai trò đề xuất

| Vai trò | Quyền chính |
|---|---|
| Admin | Quản lý user, thuốc, danh mục, báo cáo, xem toàn bộ dữ liệu |
| Nhân viên nhà thuốc | Tìm thuốc, tạo đơn bán, xem cảnh báo, thanh toán, hóa đơn, khách hàng |
| Nhân viên kho | Nhập thuốc, quản lý tồn kho, xem cảnh báo sắp hết/gần hết hạn |

### Acceptance Criteria

- Admin truy cập được các chức năng quản trị.
- Nhân viên nhà thuốc không truy cập được chức năng quản lý user.
- Nhân viên kho không truy cập được chức năng thanh toán nếu không được cấp quyền.
- API phải kiểm tra role, không chỉ ẩn menu trên frontend.

---

## 9.4. FR-04 - Quản lý thuốc

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-04 |
| Tên chức năng | Quản lý thuốc |
| Actor | Admin |
| Độ ưu tiên | High |
| Mô tả | Admin có thể thêm, sửa, xóa/ẩn và tìm kiếm thuốc. |
| Tiền điều kiện | Admin đã đăng nhập. |
| Hậu điều kiện | Thông tin thuốc được lưu và có thể dùng trong kho, bán hàng, báo cáo. |

### Dữ liệu thuốc tối thiểu

| Trường | Bắt buộc | Mô tả |
|---|---|---|
| Mã thuốc | Có | Mã duy nhất trong hệ thống |
| Tên thuốc | Có | Tên hiển thị của thuốc |
| Danh mục | Có | Nhóm thuốc |
| Đơn vị tính | Có | Viên, hộp, chai, tuýp... |
| Giá bán | Có | Giá bán hiện tại |
| Mô tả | Không | Mô tả ngắn |
| Trạng thái | Có | Đang bán / Ngừng bán |

### Luồng chính thêm thuốc

1. Admin mở màn hình quản lý thuốc.
2. Admin chọn thêm thuốc.
3. Admin nhập thông tin thuốc.
4. Hệ thống kiểm tra dữ liệu bắt buộc.
5. Hệ thống lưu thuốc.
6. Thuốc xuất hiện trong danh sách.

### Acceptance Criteria

- Admin thêm được thuốc hợp lệ.
- Không cho trùng mã thuốc.
- Không cho lưu thuốc thiếu tên hoặc giá bán.
- Có thể tìm kiếm thuốc theo tên hoặc mã.
- Thuốc ngừng bán không nên xuất hiện trong POS bán hàng.

---

## 9.5. FR-05 - Quản lý danh mục thuốc

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-05 |
| Tên chức năng | Quản lý danh mục thuốc |
| Actor | Admin |
| Độ ưu tiên | High |
| Mô tả | Admin quản lý danh mục để phân loại thuốc. |

### Acceptance Criteria

- Admin tạo được danh mục thuốc.
- Admin sửa được tên danh mục.
- Không cho xóa cứng danh mục đang có thuốc nếu gây mất dữ liệu.
- Có thể lọc thuốc theo danh mục.

---

## 9.6. FR-06 - Nhập thuốc

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-06 |
| Tên chức năng | Nhập thuốc |
| Actor | Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Nhân viên kho tạo phiếu nhập thuốc và cập nhật tồn kho. |

### Luồng chính

1. Nhân viên kho mở màn hình nhập thuốc.
2. Chọn nhà cung cấp nếu có.
3. Thêm thuốc vào phiếu nhập.
4. Nhập số lượng, giá nhập, hạn dùng nếu có.
5. Xác nhận phiếu nhập.
6. Hệ thống lưu phiếu nhập.
7. Hệ thống tăng tồn kho tương ứng.

### Acceptance Criteria

- Tạo được phiếu nhập có ít nhất một thuốc.
- Không cho nhập số lượng nhỏ hơn hoặc bằng 0.
- Sau khi xác nhận nhập, tồn kho tăng đúng.
- Lịch sử nhập thuốc được lưu.

---

## 9.7. FR-07 - Quản lý tồn kho

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-07 |
| Tên chức năng | Quản lý tồn kho |
| Actor | Admin, Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Người dùng có quyền xem số lượng tồn kho của từng thuốc. |

### Acceptance Criteria

- Hiển thị danh sách thuốc và số lượng tồn.
- Có thể tìm kiếm thuốc trong tồn kho.
- Tồn kho cập nhật sau nhập thuốc.
- Tồn kho cập nhật sau bán hàng thành công.

---

## 9.8. FR-08 - Cảnh báo thuốc sắp hết

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-08 |
| Tên chức năng | Cảnh báo thuốc sắp hết |
| Actor | Hệ thống, Admin, Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Hệ thống hiển thị thuốc có số lượng tồn thấp hơn hoặc bằng ngưỡng tối thiểu. |

### Acceptance Criteria

- Thuốc có tồn kho thấp hơn hoặc bằng ngưỡng được hiển thị trong danh sách cảnh báo.
- Thuốc có tồn kho lớn hơn ngưỡng không hiển thị trong cảnh báo sắp hết.
- Admin và nhân viên kho xem được danh sách cảnh báo.

---

## 9.9. FR-09 - Cảnh báo thuốc gần hết hạn

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-09 |
| Tên chức năng | Cảnh báo thuốc gần hết hạn |
| Actor | Hệ thống, Admin, Nhân viên kho |
| Độ ưu tiên | High |
| Mô tả | Hệ thống hiển thị thuốc có hạn dùng nằm trong khoảng cảnh báo cấu hình. |

### Acceptance Criteria

- Thuốc gần hết hạn xuất hiện trong danh sách cảnh báo.
- Có thể cấu hình hoặc quy ước số ngày cảnh báo, ví dụ 30/60/90 ngày.
- Admin và nhân viên kho xem được danh sách này.

---

## 9.10. FR-10 - Tạo đơn bán thuốc

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-10 |
| Tên chức năng | Tạo đơn bán thuốc |
| Actor | Nhân viên nhà thuốc |
| Độ ưu tiên | High |
| Mô tả | Nhân viên nhà thuốc tạo đơn bán thuốc cho khách hàng tại quầy. |

### Luồng chính

1. Nhân viên mở màn hình bán hàng.
2. Tìm kiếm thuốc.
3. Chọn thuốc và nhập số lượng.
4. Hệ thống kiểm tra tồn kho.
5. Thuốc được thêm vào đơn nếu đủ tồn.
6. Hệ thống tính tổng tiền.
7. Nhân viên xác nhận đơn để thanh toán.

### Acceptance Criteria

- Tạo được đơn hàng mới.
- Thêm được thuốc vào đơn.
- Cập nhật được số lượng thuốc trong đơn.
- Xóa được thuốc khỏi đơn trước khi thanh toán.
- Tổng tiền được tính đúng theo số lượng và đơn giá.

---

## 9.11. FR-11 - Kiểm tra tồn kho khi bán

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-11 |
| Tên chức năng | Kiểm tra tồn kho khi bán |
| Actor | Hệ thống |
| Độ ưu tiên | High |
| Mô tả | Hệ thống không cho bán thuốc vượt quá số lượng tồn kho. |

### Acceptance Criteria

- Nếu số lượng bán nhỏ hơn hoặc bằng tồn kho, hệ thống cho thêm vào đơn.
- Nếu số lượng bán lớn hơn tồn kho, hệ thống hiển thị lỗi.
- Không cho thanh toán nếu đơn có thuốc vượt tồn.
- Sau thanh toán, tồn kho giảm đúng số lượng bán.

---

## 9.12. FR-12 - Kiểm tra tương tác thuốc

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-12 |
| Tên chức năng | Kiểm tra tương tác thuốc |
| Actor | Hệ thống, Nhân viên nhà thuốc |
| Độ ưu tiên | High |
| Mô tả | Hệ thống kiểm tra các cặp thuốc trong đơn hàng dựa trên dữ liệu tương tác mẫu. |

### Luồng chính

1. Nhân viên thêm thuốc vào đơn hàng.
2. Hệ thống kiểm tra số lượng thuốc trong đơn.
3. Nếu đơn có từ hai thuốc trở lên, hệ thống sinh các cặp thuốc.
4. Hệ thống so khớp các cặp với bảng DrugInteraction.
5. Nếu có tương tác, hệ thống hiển thị cảnh báo.
6. Nhân viên đọc cảnh báo và ghi chú tư vấn nếu cần.

### Nội dung cảnh báo

| Thành phần | Mô tả |
|---|---|
| Thuốc A | Tên thuốc thứ nhất |
| Thuốc B | Tên thuốc thứ hai |
| Mức độ | Nhẹ, trung bình, cao |
| Mô tả | Mô tả nguy cơ mẫu |
| Khuyến nghị | Khuyến nghị xử lý mẫu |
| Ghi chú tư vấn | Ghi chú do nhân viên nhập |
| Disclaimer | Thông tin cảnh báo chỉ mang tính tham khảo |

### Acceptance Criteria

- Hệ thống kiểm tra tương tác khi đơn có từ hai thuốc trở lên.
- Hệ thống hiển thị đúng cảnh báo với cặp thuốc có trong dữ liệu mẫu.
- Hệ thống không hiển thị cảnh báo nếu không có tương tác trong dữ liệu mẫu.
- Cảnh báo phải có disclaimer.
- Nhân viên có thể ghi chú tư vấn nếu cần.

---

## 9.13. FR-13 - Thanh toán

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-13 |
| Tên chức năng | Thanh toán |
| Actor | Nhân viên nhà thuốc |
| Độ ưu tiên | High |
| Mô tả | Nhân viên ghi nhận thanh toán cho đơn hàng. |

### Acceptance Criteria

- Chọn được phương thức thanh toán tiền mặt hoặc chuyển khoản mô phỏng.
- Không cho thanh toán đơn hàng rỗng.
- Không cho thanh toán nếu có thuốc vượt tồn.
- Sau thanh toán, đơn hàng chuyển sang trạng thái đã thanh toán.
- Sau thanh toán, hệ thống trừ tồn kho.

---

## 9.14. FR-14 - Hóa đơn

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-14 |
| Tên chức năng | Hóa đơn |
| Actor | Hệ thống, Nhân viên nhà thuốc |
| Độ ưu tiên | High |
| Mô tả | Hệ thống tạo hóa đơn sau khi đơn hàng thanh toán thành công. |

### Acceptance Criteria

- Hóa đơn được tạo sau thanh toán.
- Hóa đơn hiển thị mã hóa đơn, ngày tạo, nhân viên, khách hàng nếu có.
- Hóa đơn hiển thị danh sách thuốc, số lượng, đơn giá, thành tiền.
- Hóa đơn hiển thị tổng tiền và phương thức thanh toán.
- Nhân viên có thể xem hoặc in hóa đơn.

---

## 9.15. FR-15 - Quản lý khách hàng

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-15 |
| Tên chức năng | Quản lý khách hàng |
| Actor | Nhân viên nhà thuốc, Admin |
| Độ ưu tiên | Medium |
| Mô tả | Hệ thống lưu thông tin cơ bản của khách hàng và lịch sử mua hàng. |

### Acceptance Criteria

- Tạo được khách hàng với tên và số điện thoại.
- Tìm được khách hàng theo tên hoặc số điện thoại.
- Gắn được khách hàng vào đơn hàng.
- Xem được lịch sử mua hàng cơ bản.
- Không dùng dữ liệu cá nhân thật trong demo.

---

## 9.16. FR-16 - Báo cáo doanh thu

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-16 |
| Tên chức năng | Báo cáo doanh thu |
| Actor | Admin |
| Độ ưu tiên | Medium |
| Mô tả | Admin xem doanh thu và thống kê vận hành cơ bản. |

### Acceptance Criteria

- Hiển thị tổng doanh thu từ đơn đã thanh toán.
- Có thể xem doanh thu theo ngày hoặc tháng.
- Hiển thị số lượng đơn hàng.
- Có thể hiển thị thuốc bán chạy nếu có dữ liệu.

---

## 9.17. FR-17 - AI Copilot

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-17 |
| Tên chức năng | AI Copilot |
| Actor | Nhân viên nhà thuốc, AI System |
| Độ ưu tiên | Medium |
| Loại | Advanced / Mocked |
| Mô tả | AI hỗ trợ tạo câu hỏi bổ sung, giải thích cảnh báo và tạo ghi chú tư vấn tham khảo. |

### Phạm vi AI Copilot

- Tạo câu hỏi bổ sung trong phiên tư vấn tham khảo.
- Giải thích cảnh báo tương tác bằng ngôn ngữ dễ hiểu.
- Tạo ghi chú tư vấn mẫu.
- Tóm tắt phiên tư vấn nếu có dữ liệu.

### Ràng buộc AI

- AI không được chẩn đoán bệnh.
- AI không được kê đơn thuốc.
- AI không được khẳng định thuốc chắc chắn an toàn.
- AI không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- Nội dung AI phải có disclaimer.
- Người dùng phải xác nhận trước khi lưu nội dung AI.

### Acceptance Criteria

- AI Copilot có thể trả về nội dung hỗ trợ tham khảo bằng MockAI hoặc provider thật.
- Nội dung AI có disclaimer.
- Nội dung AI không chứa chẩn đoán hoặc kê đơn.
- Nếu có lỗi provider, hệ thống có thể hiển thị lỗi thân thiện hoặc dùng MockAI fallback.

---

## 9.18. FR-18 - Graph Explorer

| Mục | Nội dung |
|---|---|
| Mã yêu cầu | FR-18 |
| Tên chức năng | Graph Explorer |
| Actor | Admin, Nhân viên nhà thuốc, Neo4j |
| Độ ưu tiên | Medium |
| Loại | Advanced / Mocked |
| Mô tả | Người dùng xem quan hệ thuốc, hoạt chất, nhóm thuốc, triệu chứng hoặc tương tác dưới dạng graph. |

### Acceptance Criteria

- Hiển thị được node và relationship mẫu.
- Có thể xem quan hệ giữa hai thuốc hoặc thuốc và hoạt chất.
- Nếu không dùng Neo4j thật, có thể mô phỏng graph bằng dữ liệu mẫu.
- Graph chỉ phục vụ demo và tham khảo, không thay thế dữ liệu y khoa thật.

---

## 10. Yêu cầu phi chức năng

| Mã yêu cầu | Nhóm yêu cầu | Mô tả | Tiêu chí đánh giá |
|---|---|---|---|
| NFR-01 | Bảo mật | Mật khẩu phải được hash | Không lưu plain text trong database |
| NFR-02 | Phân quyền | API kiểm tra role | User sai quyền bị chặn khi gọi API |
| NFR-03 | Hiệu năng | Tìm kiếm thuốc nhanh | Dưới 2 giây với dữ liệu demo |
| NFR-04 | Khả dụng | Demo chạy ổn định local | Không lỗi luồng chính từ đăng nhập đến hóa đơn |
| NFR-05 | Dễ dùng | UI rõ ràng | Người demo thao tác được mà không cần hướng dẫn phức tạp |
| NFR-06 | An toàn AI | AI không chẩn đoán/kê đơn | Có guardrail/disclaimer nếu triển khai AI |
| NFR-07 | Truy vết | Lưu log thao tác quan trọng | Có audit log cho đăng nhập, đơn hàng, thanh toán hoặc AI nếu có |

---

## 11. Yêu cầu phi chức năng chi tiết

### 11.1. NFR-01 - Bảo mật mật khẩu

| Mục | Nội dung |
|---|---|
| Mã | NFR-01 |
| Nhóm | Bảo mật |
| Mô tả | Mật khẩu người dùng phải được hash trước khi lưu vào database. |
| Tiêu chí đánh giá | Database không lưu mật khẩu dạng plain text. |

### 11.2. NFR-02 - Phân quyền API

| Mục | Nội dung |
|---|---|
| Mã | NFR-02 |
| Nhóm | Phân quyền |
| Mô tả | Backend API phải kiểm tra quyền truy cập dựa trên vai trò. |
| Tiêu chí đánh giá | Người dùng sai quyền bị từ chối khi gọi API. |

### 11.3. NFR-03 - Hiệu năng tìm kiếm

| Mục | Nội dung |
|---|---|
| Mã | NFR-03 |
| Nhóm | Hiệu năng |
| Mô tả | Tìm kiếm thuốc phải đủ nhanh trong môi trường demo. |
| Tiêu chí đánh giá | Trả kết quả dưới 2 giây với dữ liệu demo. |

### 11.4. NFR-04 - Khả dụng khi demo

| Mục | Nội dung |
|---|---|
| Mã | NFR-04 |
| Nhóm | Khả dụng |
| Mô tả | Hệ thống phải chạy ổn định trong môi trường local hoặc demo. |
| Tiêu chí đánh giá | Luồng chính không lỗi nghiêm trọng: đăng nhập, bán hàng, cảnh báo, thanh toán, hóa đơn. |

### 11.5. NFR-05 - Dễ dùng

| Mục | Nội dung |
|---|---|
| Mã | NFR-05 |
| Nhóm | Usability |
| Mô tả | Giao diện cần rõ ràng, dễ thao tác cho người demo. |
| Tiêu chí đánh giá | Người demo có thể thực hiện luồng bán thuốc trong vài phút. |

### 11.6. NFR-06 - An toàn AI

| Mục | Nội dung |
|---|---|
| Mã | NFR-06 |
| Nhóm | AI Safety |
| Mô tả | AI không được chẩn đoán, kê đơn hoặc thay thế chuyên gia y tế. |
| Tiêu chí đánh giá | Prompt, output và UI có guardrail/disclaimer. |

### 11.7. NFR-07 - Truy vết

| Mục | Nội dung |
|---|---|
| Mã | NFR-07 |
| Nhóm | Auditability |
| Mô tả | Hệ thống lưu log các thao tác quan trọng. |
| Tiêu chí đánh giá | Có log cho đơn hàng, thanh toán và AI request/response nếu có AI. |

---

## 12. Business Rules

| Mã rule | Quy tắc | Mô tả |
|---|---|---|
| BR-01 | Bắt buộc đăng nhập | Người dùng nội bộ phải đăng nhập trước khi sử dụng hệ thống |
| BR-02 | Phân quyền theo vai trò | Người dùng chỉ được truy cập chức năng phù hợp vai trò |
| BR-03 | Không bán vượt tồn | Số lượng bán không được lớn hơn số lượng tồn |
| BR-04 | Phiếu nhập làm tăng tồn kho | Sau khi xác nhận nhập, tồn kho tăng |
| BR-05 | Thanh toán làm giảm tồn kho | Sau khi thanh toán thành công, tồn kho giảm |
| BR-06 | Đơn hàng phải có thuốc | Không cho thanh toán đơn hàng rỗng |
| BR-07 | Có từ hai thuốc thì kiểm tra tương tác | Hệ thống kiểm tra tương tác khi đơn có ít nhất hai thuốc |
| BR-08 | Cảnh báo phải có disclaimer | Cảnh báo tương tác phải hiển thị thông tin chỉ mang tính tham khảo |
| BR-09 | Hóa đơn tạo sau thanh toán | Không tạo hóa đơn cho đơn chưa thanh toán |
| BR-10 | AI không thay chuyên gia y tế | AI chỉ hỗ trợ tham khảo, không chẩn đoán/kê đơn |
| BR-11 | Không lưu secret trong source code | API key, token, password thật không được commit |
| BR-12 | Dữ liệu demo là dữ liệu giả lập | Không dùng dữ liệu cá nhân thật hoặc dữ liệu y khoa chưa kiểm định |

---

## 13. Ma trận phân quyền chức năng

| Chức năng | Admin | Nhân viên nhà thuốc | Nhân viên kho | Khách hàng |
|---|---:|---:|---:|---:|
| Đăng nhập/đăng xuất | Có | Có | Có | Không |
| Quản lý user | Có | Không | Không | Không |
| Quản lý thuốc | Có | Xem | Xem | Không |
| Quản lý danh mục | Có | Xem | Xem | Không |
| Quản lý tồn kho | Có | Xem | Có | Không |
| Nhập thuốc | Có | Không | Có | Không |
| Cảnh báo sắp hết | Có | Xem | Có | Không |
| Cảnh báo gần hết hạn | Có | Xem | Có | Không |
| Tạo đơn bán thuốc | Có | Có | Không | Không |
| Kiểm tra tương tác | Có | Có | Không | Không |
| Thanh toán | Có | Có | Không | Không |
| Hóa đơn | Có | Có | Không | Không |
| Quản lý khách hàng | Có | Có | Không | Không |
| Báo cáo | Có | Không/Xem hạn chế | Không/Xem hạn chế | Không |
| AI Copilot | Có | Có | Không | Không |
| Graph Explorer | Có | Có | Không/Xem hạn chế | Không |
| AI Audit Log | Có | Không | Không | Không |

---

## 14. Yêu cầu dữ liệu mức cao

| Thực thể | Mô tả | Dữ liệu chính |
|---|---|---|
| User | Người dùng hệ thống | id, full_name, username, password_hash, status |
| Role | Vai trò | id, code, name |
| Medicine | Thuốc | id, code, name, category_id, unit, price, status |
| MedicineCategory | Danh mục thuốc | id, name, description |
| Customer | Khách hàng | id, full_name, phone, note |
| Supplier | Nhà cung cấp | id, name, phone, address |
| Inventory | Tồn kho | id, medicine_id, quantity, min_stock, expiry_date |
| StockImport | Phiếu nhập | id, supplier_id, created_by, import_date, status |
| StockImportDetail | Chi tiết nhập | id, stock_import_id, medicine_id, quantity, expiry_date |
| Order | Đơn hàng | id, customer_id, staff_id, total_amount, status |
| OrderDetail | Chi tiết đơn hàng | id, order_id, medicine_id, quantity, unit_price |
| Payment | Thanh toán | id, order_id, method, amount, status |
| Invoice | Hóa đơn | id, order_id, invoice_code, issued_at |
| DrugInteraction | Tương tác thuốc mẫu | id, medicine_a_id, medicine_b_id, severity, description, recommendation |
| InteractionAlert | Lịch sử cảnh báo | id, order_id, interaction_id, note |
| ConsultationNote | Ghi chú tư vấn | id, order_id, staff_id, note |
| AILog | Log AI nếu có | id, user_id, action_type, provider, input_summary, output_summary, status |

---

## 15. Use case tổng quan

| Mã use case | Tên use case | Actor chính | Mô tả ngắn |
|---|---|---|---|
| UC-01 | Đăng nhập | Admin, Staff, Warehouse | Người dùng đăng nhập hệ thống |
| UC-02 | Quản lý thuốc | Admin | Admin quản lý thông tin thuốc |
| UC-03 | Quản lý tồn kho | Admin, Warehouse | Xem tồn kho và cảnh báo kho |
| UC-04 | Nhập thuốc | Warehouse | Tạo phiếu nhập và cập nhật tồn kho |
| UC-05 | Bán thuốc | Staff | Tạo đơn bán thuốc tại quầy |
| UC-06 | Kiểm tra tương tác thuốc | Hệ thống | Kiểm tra tương tác trong đơn hàng |
| UC-07 | Thanh toán và hóa đơn | Staff | Ghi nhận thanh toán và tạo hóa đơn |
| UC-08 | Quản lý khách hàng | Staff, Admin | Lưu thông tin khách hàng cơ bản |
| UC-09 | Xem báo cáo | Admin | Xem doanh thu, thuốc bán chạy, tồn kho |
| UC-10 | Sử dụng AI Copilot | Staff | AI hỗ trợ nội dung tham khảo nếu có |
| UC-11 | Xem Graph Explorer | Admin, Staff | Xem quan hệ thuốc/tương tác nếu có graph |

---

## 16. Luồng nghiệp vụ chính cần hỗ trợ

### 16.1. Luồng bán thuốc tại quầy có cảnh báo tương tác

1. Nhân viên nhà thuốc đăng nhập.
2. Mở màn hình bán thuốc/POS.
3. Tìm kiếm thuốc.
4. Thêm thuốc vào đơn hàng.
5. Hệ thống kiểm tra tồn kho.
6. Nếu đủ tồn, thuốc được thêm vào đơn.
7. Nếu thiếu tồn, hệ thống hiển thị lỗi.
8. Nhân viên thêm thuốc thứ hai vào đơn.
9. Hệ thống kiểm tra tương tác thuốc.
10. Nếu có tương tác, hệ thống hiển thị cảnh báo.
11. Nhân viên ghi chú tư vấn nếu cần.
12. Nhân viên chọn hoặc tạo khách hàng.
13. Hệ thống tính tổng tiền.
14. Nhân viên xác nhận thanh toán.
15. Hệ thống tạo hóa đơn.
16. Hệ thống trừ tồn kho.
17. Nhân viên xem hoặc in hóa đơn.

### 16.2. Luồng nhập thuốc

1. Nhân viên kho đăng nhập.
2. Mở màn hình nhập thuốc.
3. Chọn nhà cung cấp nếu có.
4. Thêm thuốc vào phiếu nhập.
5. Nhập số lượng và hạn dùng.
6. Xác nhận phiếu nhập.
7. Hệ thống lưu phiếu nhập.
8. Hệ thống cập nhật tồn kho.

### 16.3. Luồng báo cáo

1. Admin đăng nhập.
2. Mở dashboard hoặc màn hình báo cáo.
3. Chọn thời gian cần xem.
4. Hệ thống tổng hợp dữ liệu đơn hàng và tồn kho.
5. Hiển thị doanh thu, số đơn, thuốc bán chạy, thuốc sắp hết, thuốc gần hết hạn.

---

## 17. Yêu cầu giao diện mức cao

| Màn hình | Actor | Mục tiêu | Thành phần chính |
|---|---|---|---|
| Login | Admin, Staff, Warehouse | Đăng nhập hệ thống | Username, password, nút đăng nhập, thông báo lỗi |
| Dashboard | Admin | Xem tổng quan | Doanh thu, số đơn, tồn kho thấp, gần hết hạn |
| Medicine Management | Admin | Quản lý thuốc | Bảng thuốc, tìm kiếm, thêm/sửa thuốc |
| Category Management | Admin | Quản lý danh mục | Bảng danh mục, thêm/sửa danh mục |
| Inventory | Admin, Warehouse | Xem tồn kho | Bảng tồn kho, cảnh báo sắp hết/gần hết hạn |
| Stock Import | Warehouse | Nhập thuốc | Form phiếu nhập, chi tiết thuốc nhập |
| Sales POS | Staff | Bán thuốc | Tìm thuốc, giỏ hàng, tổng tiền, cảnh báo tương tác |
| Interaction Alert | Staff | Xem cảnh báo | Thuốc A, thuốc B, severity, mô tả, khuyến nghị, disclaimer |
| Payment | Staff | Thanh toán | Tổng tiền, phương thức, xác nhận |
| Invoice | Staff | Xem/in hóa đơn | Thông tin đơn hàng và danh sách thuốc |
| Customer | Staff, Admin | Quản lý khách hàng | Danh sách khách, tìm kiếm, lịch sử mua |
| Report | Admin | Xem báo cáo | Doanh thu, thuốc bán chạy, tồn kho |
| AI Copilot | Staff | Hỗ trợ tham khảo | Câu hỏi, ghi chú, giải thích cảnh báo, disclaimer |
| Graph Explorer | Admin, Staff | Xem graph | Node, edge, quan hệ thuốc/tương tác |

---

## 18. Ràng buộc hệ thống

| Mã | Ràng buộc | Mô tả |
|---|---|---|
| CON-01 | Dữ liệu mẫu | Dữ liệu thuốc, tương tác, bệnh nền, triệu chứng và khuyến nghị là dữ liệu mẫu |
| CON-02 | Không tư vấn y tế thật | Hệ thống không được dùng để thay thế tư vấn y tế thật |
| CON-03 | AI không thay chuyên gia | AI không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế |
| CON-04 | Không kê đơn bằng AI | AI không được kê đơn thuốc hoặc đưa ra chỉ định điều trị |
| CON-05 | Thanh toán mô phỏng | Không tích hợp cổng thanh toán thật trong MVP |
| CON-06 | Không lưu secret | Không lưu API key thật trong source code hoặc commit lên repository |
| CON-07 | Khách hàng không bắt buộc đăng nhập | MVP chỉ lưu thông tin khách hàng cơ bản |
| CON-08 | Demo local | Hệ thống ưu tiên chạy ổn định trên môi trường local/demo |

---

## 19. Yêu cầu an toàn AI và cảnh báo thuốc

Nếu hệ thống có AI Copilot hoặc cảnh báo tương tác thuốc, bắt buộc tuân thủ các yêu cầu sau:

| Mã | Yêu cầu | Mô tả |
|---|---|---|
| SAFE-01 | Có disclaimer | Các màn hình cảnh báo/AI phải hiển thị thông tin chỉ mang tính tham khảo |
| SAFE-02 | Không chẩn đoán | AI không được kết luận người dùng mắc bệnh |
| SAFE-03 | Không kê đơn | AI không được chỉ định thuốc điều trị |
| SAFE-04 | Human-in-the-loop | Nhân viên phải xác nhận trước khi lưu nội dung AI |
| SAFE-05 | Dữ liệu mẫu | Cảnh báo tương tác thuốc dựa trên dữ liệu mẫu, không phải dữ liệu y khoa thật |
| SAFE-06 | Audit nếu có AI | Request/response AI quan trọng nên được lưu vào AI Audit Log |
| SAFE-07 | Guardrail output | Output AI cần được kiểm tra để tránh nội dung vượt phạm vi |

Câu disclaimer chuẩn:

> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 20. Tiêu chí nghiệm thu MVP

MVP được xem là đạt yêu cầu nếu đáp ứng các tiêu chí sau:

| Mã | Tiêu chí nghiệm thu | Điều kiện đạt |
|---|---|---|
| AC-MVP-01 | Đăng nhập hoạt động | Người dùng đăng nhập được bằng tài khoản mẫu |
| AC-MVP-02 | Phân quyền hoạt động | Mỗi role thấy đúng chức năng |
| AC-MVP-03 | Quản lý thuốc hoạt động | Thêm/sửa/tìm kiếm thuốc thành công |
| AC-MVP-04 | Quản lý kho hoạt động | Nhập thuốc làm tăng tồn kho |
| AC-MVP-05 | Cảnh báo kho hoạt động | Thuốc sắp hết/gần hết hạn hiển thị đúng |
| AC-MVP-06 | Bán thuốc hoạt động | Tạo đơn và thêm thuốc vào đơn thành công |
| AC-MVP-07 | Kiểm tra tồn kho hoạt động | Không bán vượt số lượng tồn |
| AC-MVP-08 | Cảnh báo tương tác hoạt động | Thêm hai thuốc tương tác thì hiển thị cảnh báo |
| AC-MVP-09 | Thanh toán hoạt động | Đơn hàng chuyển trạng thái sau thanh toán |
| AC-MVP-10 | Hóa đơn hoạt động | Hóa đơn được tạo sau thanh toán |
| AC-MVP-11 | Báo cáo cơ bản hoạt động | Admin xem được doanh thu hoặc thuốc bán chạy |
| AC-MVP-12 | Disclaimer hiển thị | Màn hình cảnh báo/AI có disclaimer |

---

## 21. Traceability sơ bộ giữa mục tiêu nghiệp vụ và yêu cầu chức năng

| Mục tiêu nghiệp vụ | Yêu cầu chức năng liên quan |
|---|---|
| BO-01 Quản lý thuốc tập trung | FR-04, FR-05 |
| BO-02 Kiểm soát tồn kho | FR-06, FR-07, FR-08, FR-09, FR-11 |
| BO-03 Hỗ trợ bán hàng | FR-10, FR-13, FR-14, FR-15 |
| BO-04 Cảnh báo tương tác | FR-12, FR-17, FR-18 |
| BO-05 Báo cáo vận hành | FR-16 |
| BO-06 Hỗ trợ thông minh | FR-17, FR-18, NFR-06, NFR-07 |

---

## 22. Ngoài phạm vi của SRS phiên bản này

Các chức năng sau không thuộc phạm vi triển khai bắt buộc của phiên bản MVP:

| Chức năng | Lý do |
|---|---|
| Thanh toán online thật | Vượt phạm vi đồ án, cần tích hợp cổng thanh toán |
| Chẩn đoán bệnh | Không thuộc phạm vi hệ thống và không an toàn |
| Kê đơn thuốc bằng AI | Không phù hợp mục tiêu hỗ trợ tham khảo |
| Mobile app | Dự án tập trung website |
| Quản lý nhiều chi nhánh | Làm tăng độ phức tạp, để phát triển sau |
| Tích hợp bảo hiểm y tế | Không phù hợp MVP |
| Sử dụng dữ liệu bệnh nhân thật | Rủi ro bảo mật và quyền riêng tư |
| Dữ liệu y khoa thật chưa kiểm định | Cần chuyên gia kiểm chứng |

---

## 23. Kết luận

Tài liệu **SRS - Software Requirement Specification** đã đặc tả các yêu cầu phần mềm chính của hệ thống **PharmaAssist AI Intelligence**. Hệ thống được định hướng là website quản lý nhà thuốc thông minh, hỗ trợ quản lý người dùng, thuốc, danh mục, tồn kho, nhập thuốc, bán thuốc, thanh toán, hóa đơn, cảnh báo tương tác thuốc, khách hàng và báo cáo.

Phiên bản MVP cần ưu tiên hoàn thành các chức năng có độ ưu tiên High như đăng nhập, phân quyền, quản lý thuốc, nhập thuốc, quản lý tồn kho, cảnh báo tồn kho, tạo đơn bán thuốc, kiểm tra tồn kho, kiểm tra tương tác thuốc, thanh toán và hóa đơn. Các chức năng AI Copilot, Graph Explorer, Graph-RAG và AI Audit Log là phần nâng cao, có thể triển khai thật hoặc mô phỏng tùy theo thời gian.

Tài liệu này sẽ là cơ sở cho thiết kế hệ thống, thiết kế database, thiết kế API, thiết kế giao diện, lập trình, kiểm thử và nghiệm thu dự án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

