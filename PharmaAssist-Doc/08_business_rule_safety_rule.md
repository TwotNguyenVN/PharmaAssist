# 08_BUSINESS_RULE_SAFETY_RULE

**Mã tài liệu:** 08_Business_Rule_Safety_Rule  
**Tên tài liệu:** Business Rule and Safety Rule Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu quy tắc nghiệp vụ và quy tắc an toàn  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Business Rule and Safety Rule Document** dùng để gom các quy tắc nghiệp vụ và quy tắc an toàn của hệ thống **PharmaAssist AI Intelligence**.

Trong hệ thống quản lý nhà thuốc, quy tắc nghiệp vụ đóng vai trò rất quan trọng vì hệ thống không chỉ lưu dữ liệu mà còn phải đảm bảo các thao tác như nhập thuốc, bán thuốc, thanh toán, hóa đơn, cảnh báo tồn kho và cảnh báo tương tác thuốc được xử lý đúng. Ví dụ, hệ thống không được cho bán thuốc vượt số lượng tồn, không được tạo hóa đơn khi đơn hàng chưa thanh toán và phải kiểm tra tương tác khi đơn hàng có từ hai thuốc trở lên.

Bên cạnh đó, vì hệ thống có liên quan đến thuốc, cảnh báo tương tác và có thể tích hợp AI Copilot, tài liệu này cũng cần mô tả rõ các quy tắc an toàn. Các quy tắc an toàn giúp đảm bảo hệ thống không bị hiểu nhầm là công cụ chẩn đoán, kê đơn hoặc thay thế chuyên gia y tế. AI nếu được sử dụng chỉ đóng vai trò hỗ trợ tham khảo và phải có guardrail, disclaimer, human-in-the-loop và audit log phù hợp.

Tài liệu này được sử dụng để:

- Làm rõ các quy tắc nghiệp vụ bắt buộc của hệ thống.
- Làm rõ các quy tắc an toàn liên quan đến thuốc, AI và dữ liệu.
- Làm cơ sở thiết kế backend validation.
- Làm cơ sở thiết kế rule engine.
- Làm cơ sở viết test case.
- Làm cơ sở kiểm thử luồng nghiệp vụ.
- Làm cơ sở trình bày với giảng viên về tính đúng đắn và an toàn của hệ thống.
- Đảm bảo các thành viên trong nhóm hiểu thống nhất về cách hệ thống phải xử lý các tình huống quan trọng.

---

## 2. Phạm vi tài liệu

Tài liệu này áp dụng cho các nhóm chức năng chính của PharmaAssist AI Intelligence:

- Authentication và Authorization.
- Quản lý người dùng và vai trò.
- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Quản lý tồn kho.
- Nhập thuốc.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Bán thuốc.
- Thanh toán.
- Hóa đơn.
- Cảnh báo tương tác thuốc.
- Ghi chú tư vấn.
- Báo cáo.
- AI Copilot nếu triển khai.
- Neo4j Knowledge Graph nếu triển khai.
- AI Audit Log nếu triển khai.
- Bảo mật dữ liệu và secret.

Tài liệu này không mô tả chi tiết source code hoặc thuật toán triển khai cụ thể ở mức kỹ thuật thấp. Tuy nhiên, tài liệu có mô tả trigger, input, xử lý, output và tiêu chí kiểm thử cho các rule quan trọng để hỗ trợ lập trình và kiểm thử.

---

## 3. Phân loại rule

Các rule trong tài liệu được chia thành hai nhóm chính:

| Loại rule | Ý nghĩa | Ví dụ |
|---|---|---|
| Business Rule | Quy tắc nghiệp vụ bắt buộc hệ thống phải tuân thủ khi xử lý chức năng | Không bán vượt tồn kho, hóa đơn chỉ tạo sau thanh toán |
| Safety Rule | Quy tắc an toàn liên quan đến thuốc, AI, dữ liệu và bảo mật | AI không chẩn đoán, không kê đơn, không commit API key |

Ngoài ra, mỗi rule có thể được gắn với:

| Thuộc tính | Ý nghĩa |
|---|---|
| Mã rule | Mã định danh duy nhất của rule |
| Nhóm | Module hoặc nhóm nghiệp vụ liên quan |
| Nội dung | Quy định chính của rule |
| Mức ưu tiên | High, Medium, Low |
| Cách áp dụng | Backend, frontend, database, AI guardrail hoặc quy trình demo |
| Cách kiểm thử | Test case hoặc tình huống kiểm tra rule |

---

## 4. Business Rules tổng quát

| Mã rule | Nhóm | Nội dung | Mức ưu tiên |
|---|---|---|---|
| BR-01 | Auth | Người dùng phải đăng nhập trước khi sử dụng hệ thống | High |
| BR-02 | Role | Người dùng chỉ được truy cập chức năng theo vai trò | High |
| BR-03 | Medicine | Mã thuốc không được trùng | High |
| BR-04 | Medicine | Giá bán phải lớn hơn hoặc bằng 0 | High |
| BR-05 | Inventory | Số lượng tồn không được âm | High |
| BR-06 | Inventory | Không cho bán thuốc vượt số lượng tồn | High |
| BR-07 | Inventory | Thuốc dưới ngưỡng tối thiểu phải hiện cảnh báo sắp hết | High |
| BR-08 | Expiry | Thuốc gần hết hạn trong X ngày phải hiện cảnh báo | High |
| BR-09 | Sales | Đơn hàng phải có ít nhất một thuốc | High |
| BR-10 | Sales | Thanh toán thành công mới được trừ tồn kho | High |
| BR-11 | Payment | Mỗi đơn hàng có một bản ghi thanh toán chính | Medium |
| BR-12 | Invoice | Hóa đơn chỉ được tạo sau khi thanh toán thành công | High |
| BR-13 | Interaction | Khi đơn có từ 2 thuốc trở lên, hệ thống kiểm tra tương tác | High |
| BR-14 | Interaction | Nếu có tương tác, hệ thống hiển thị tên thuốc, mức độ, mô tả, khuyến nghị | High |
| BR-15 | Interaction | Nếu tương tác mức cao, nhân viên nên nhập ghi chú tư vấn | Medium |
| BR-16 | Report | Báo cáo doanh thu chỉ tính đơn đã thanh toán | High |

---

## 5. Safety Rules tổng quát

| Mã rule | Nhóm | Nội dung | Mức ưu tiên |
|---|---|---|---|
| SR-01 | Medical Safety | Hệ thống không chẩn đoán bệnh | High |
| SR-02 | Medical Safety | Hệ thống không kê đơn thuốc | High |
| SR-03 | Medical Safety | Cảnh báo chỉ mang tính tham khảo | High |
| SR-04 | AI Safety | AI không được đưa hướng dẫn điều trị cụ thể | High |
| SR-05 | AI Safety | AI phải nhắc người dùng hỏi dược sĩ/bác sĩ khi có rủi ro | High |
| SR-06 | AI Safety | Nội dung AI phải được người dùng xác nhận trước khi lưu | High |
| SR-07 | Data Safety | Không lưu thông tin nhạy cảm không cần thiết | High |
| SR-08 | Secret Safety | Không commit API key, token, mật khẩu thật | High |
| SR-09 | Audit | Các tác vụ AI quan trọng phải được ghi log | Medium/High |

---

## 6. Disclaimer bắt buộc

Câu disclaimer sau bắt buộc phải xuất hiện trong các màn hình có liên quan đến cảnh báo thuốc, AI Copilot, ghi chú tư vấn, Graph-RAG hoặc báo cáo AI:

> **Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

### 6.1. Vị trí nên hiển thị disclaimer

| Màn hình / Chức năng | Có disclaimer? | Ghi chú |
|---|---|---|
| Interaction Alert Modal | Có | Bắt buộc |
| Sales POS khi có cảnh báo | Có | Hiển thị trong vùng cảnh báo |
| AI Pharmacist Copilot | Có | Bắt buộc nếu dùng AI |
| AI-generated Consultation Note | Có | Trước khi người dùng lưu ghi chú |
| Graph-RAG Result | Có | Nếu AI sinh giải thích từ graph |
| AI Business Report | Có | Nếu AI tạo diễn giải báo cáo |
| Knowledge Graph Explorer | Nên có | Vì dữ liệu graph là dữ liệu mẫu |
| Invoice | Không bắt buộc | Trừ khi hóa đơn hiển thị cảnh báo tư vấn |

---

## 7. Mô tả chi tiết Business Rules

## 7.1. BR-01 - Người dùng phải đăng nhập trước khi sử dụng hệ thống

| Mục | Nội dung |
|---|---|
| Mã rule | BR-01 |
| Nhóm | Auth |
| Tên rule | Bắt buộc đăng nhập |
| Nội dung | Người dùng nội bộ phải đăng nhập trước khi truy cập các chức năng hệ thống. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Người dùng truy cập màn hình hoặc API nội bộ |
| Input | Token/session hoặc thông tin đăng nhập |
| Xử lý | Hệ thống kiểm tra người dùng đã xác thực hay chưa |
| Output | Cho phép truy cập nếu hợp lệ, từ chối nếu chưa đăng nhập |
| Mã lỗi đề xuất | 401 Unauthorized |

### Ví dụ

- Admin muốn xem dashboard: phải đăng nhập.
- Nhân viên muốn tạo đơn bán thuốc: phải đăng nhập.
- Người chưa đăng nhập gọi API `/orders`: bị từ chối.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Truy cập dashboard khi chưa đăng nhập | Bị chuyển về login hoặc nhận 401 |
| Đăng nhập hợp lệ rồi truy cập dashboard | Thành công |

---

## 7.2. BR-02 - Người dùng chỉ được truy cập chức năng theo vai trò

| Mục | Nội dung |
|---|---|
| Mã rule | BR-02 |
| Nhóm | Role |
| Tên rule | Phân quyền theo vai trò |
| Nội dung | Người dùng chỉ được sử dụng chức năng phù hợp với vai trò được cấp. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Người dùng truy cập menu hoặc gọi API |
| Input | User role, requested action |
| Xử lý | Hệ thống kiểm tra role có quyền thực hiện action hay không |
| Output | Cho phép hoặc từ chối truy cập |
| Mã lỗi đề xuất | 403 Forbidden |

### Ví dụ

- Admin được quản lý user.
- Nhân viên nhà thuốc không được quản lý user.
- Nhân viên kho không được thanh toán đơn hàng.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Staff gọi API tạo user | 403 Forbidden |
| Warehouse gọi API tạo phiếu nhập | Thành công |
| Warehouse gọi API thanh toán | 403 Forbidden |

---

## 7.3. BR-03 - Mã thuốc không được trùng

| Mục | Nội dung |
|---|---|
| Mã rule | BR-03 |
| Nhóm | Medicine |
| Tên rule | Mã thuốc duy nhất |
| Nội dung | Mỗi thuốc phải có mã thuốc duy nhất trong hệ thống. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Admin thêm hoặc sửa mã thuốc |
| Input | medicine_code |
| Xử lý | Hệ thống kiểm tra mã thuốc đã tồn tại hay chưa |
| Output | Lưu thuốc nếu mã chưa tồn tại, báo lỗi nếu mã đã tồn tại |

### Lý do

Mã thuốc là định danh quan trọng để tìm kiếm, quản lý tồn kho, nhập thuốc và bán hàng. Nếu mã thuốc bị trùng, hệ thống có thể ghi nhận sai tồn kho hoặc bán nhầm thuốc.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Thêm thuốc với mã mới | Thành công |
| Thêm thuốc với mã đã tồn tại | Báo lỗi mã thuốc đã tồn tại |

---

## 7.4. BR-04 - Giá bán phải lớn hơn hoặc bằng 0

| Mục | Nội dung |
|---|---|
| Mã rule | BR-04 |
| Nhóm | Medicine |
| Tên rule | Giá bán hợp lệ |
| Nội dung | Giá bán của thuốc không được nhỏ hơn 0. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Admin thêm hoặc sửa thuốc |
| Input | selling_price |
| Xử lý | Hệ thống kiểm tra giá bán |
| Output | Cho phép lưu nếu giá >= 0, báo lỗi nếu giá âm |

### Ghi chú

Trong thực tế, giá bán bằng 0 không phổ biến nhưng có thể dùng cho dữ liệu demo hoặc khuyến mãi mô phỏng. Nếu muốn chặt chẽ hơn, nhóm có thể quy định giá bán phải lớn hơn 0.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Nhập giá bán 10000 | Thành công |
| Nhập giá bán -1000 | Báo lỗi |

---

## 7.5. BR-05 - Số lượng tồn không được âm

| Mục | Nội dung |
|---|---|
| Mã rule | BR-05 |
| Nhóm | Inventory |
| Tên rule | Tồn kho không âm |
| Nội dung | Số lượng tồn của thuốc không được nhỏ hơn 0. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Nhập kho, bán hàng, điều chỉnh tồn kho |
| Input | current_quantity, changed_quantity |
| Xử lý | Hệ thống tính số lượng tồn mới và kiểm tra >= 0 |
| Output | Cho phép cập nhật nếu hợp lệ, báo lỗi nếu tồn kho âm |

### Lý do

Tồn kho âm gây sai lệch dữ liệu, ảnh hưởng trực tiếp đến bán hàng và báo cáo.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Tồn 10, bán 5 | Tồn mới = 5 |
| Tồn 10, bán 15 | Bị chặn |

---

## 7.6. BR-06 - Không cho bán thuốc vượt số lượng tồn

| Mục | Nội dung |
|---|---|
| Mã rule | BR-06 |
| Nhóm | Inventory |
| Tên rule | Không bán vượt tồn |
| Nội dung | Hệ thống không cho bán thuốc với số lượng lớn hơn số lượng tồn hiện tại. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Nhân viên thêm thuốc vào đơn hoặc xác nhận thanh toán |
| Input | medicine_id, requested_quantity, available_quantity |
| Xử lý | So sánh requested_quantity với available_quantity |
| Output | Cho thêm vào đơn nếu đủ tồn, báo lỗi nếu thiếu tồn |

### Ví dụ

- Thuốc A còn 20 viên, nhân viên bán 5 viên: hợp lệ.
- Thuốc A còn 20 viên, nhân viên bán 25 viên: không hợp lệ.

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Bán số lượng nhỏ hơn tồn | Thành công |
| Bán số lượng bằng tồn | Thành công |
| Bán số lượng lớn hơn tồn | Bị chặn |

---

## 7.7. BR-07 - Thuốc dưới ngưỡng tối thiểu phải hiện cảnh báo sắp hết

| Mục | Nội dung |
|---|---|
| Mã rule | BR-07 |
| Nhóm | Inventory |
| Tên rule | Cảnh báo thuốc sắp hết |
| Nội dung | Thuốc có số lượng tồn nhỏ hơn hoặc bằng ngưỡng tối thiểu phải được hiển thị trong danh sách cảnh báo sắp hết. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Mở dashboard, inventory hoặc chạy kiểm tra cảnh báo |
| Input | current_quantity, min_stock |
| Xử lý | Nếu current_quantity <= min_stock thì đánh dấu cảnh báo |
| Output | Danh sách thuốc sắp hết |

### Test case gợi ý

| Tồn kho | Min stock | Kết quả |
|---:|---:|---|
| 5 | 10 | Cảnh báo |
| 10 | 10 | Cảnh báo |
| 15 | 10 | Không cảnh báo |

---

## 7.8. BR-08 - Thuốc gần hết hạn trong X ngày phải hiện cảnh báo

| Mục | Nội dung |
|---|---|
| Mã rule | BR-08 |
| Nhóm | Expiry |
| Tên rule | Cảnh báo thuốc gần hết hạn |
| Nội dung | Thuốc có hạn dùng nằm trong khoảng X ngày tính từ ngày hiện tại phải được hiển thị cảnh báo. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Mở dashboard, inventory hoặc chạy kiểm tra cảnh báo |
| Input | expiry_date, current_date, warning_days |
| Xử lý | Tính số ngày còn lại đến hạn dùng |
| Output | Danh sách thuốc gần hết hạn |

### Giá trị cấu hình đề xuất

| Cấu hình | Giá trị gợi ý |
|---|---|
| warning_days | 30, 60 hoặc 90 ngày |
| MVP đề xuất | 60 ngày |

### Test case gợi ý

| Ngày còn lại | Warning days | Kết quả |
|---:|---:|---|
| 10 | 60 | Cảnh báo |
| 60 | 60 | Cảnh báo |
| 90 | 60 | Không cảnh báo |

---

## 7.9. BR-09 - Đơn hàng phải có ít nhất một thuốc

| Mục | Nội dung |
|---|---|
| Mã rule | BR-09 |
| Nhóm | Sales |
| Tên rule | Đơn hàng không được rỗng |
| Nội dung | Không cho thanh toán hoặc tạo hóa đơn đối với đơn hàng không có thuốc. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Nhân viên xác nhận thanh toán |
| Input | order_items |
| Xử lý | Kiểm tra danh sách thuốc trong đơn |
| Output | Cho thanh toán nếu có ít nhất một thuốc, báo lỗi nếu đơn rỗng |

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Thanh toán đơn rỗng | Bị chặn |
| Thanh toán đơn có thuốc | Cho tiếp tục |

---

## 7.10. BR-10 - Thanh toán thành công mới được trừ tồn kho

| Mục | Nội dung |
|---|---|
| Mã rule | BR-10 |
| Nhóm | Sales |
| Tên rule | Trừ kho sau thanh toán |
| Nội dung | Hệ thống chỉ trừ tồn kho sau khi đơn hàng thanh toán thành công. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Xác nhận thanh toán thành công |
| Input | order_id, payment_status |
| Xử lý | Nếu payment_status = PAID thì trừ tồn kho theo order details |
| Output | Tồn kho được cập nhật sau thanh toán |

### Lý do

Nếu trừ kho ngay khi thêm thuốc vào đơn, nhưng khách không mua nữa, tồn kho sẽ bị sai. Vì vậy, MVP nên trừ kho khi thanh toán thành công.

### Test case gợi ý

| Tình huống | Kết quả mong đợi |
|---|---|
| Thêm thuốc vào đơn nhưng chưa thanh toán | Chưa trừ kho |
| Thanh toán thành công | Tồn kho giảm |
| Thanh toán thất bại/hủy | Không trừ kho |

---

## 7.11. BR-11 - Mỗi đơn hàng có một bản ghi thanh toán chính

| Mục | Nội dung |
|---|---|
| Mã rule | BR-11 |
| Nhóm | Payment |
| Tên rule | Một thanh toán chính cho một đơn hàng |
| Nội dung | Mỗi đơn hàng trong MVP chỉ có một bản ghi thanh toán chính. |
| Mức ưu tiên | Medium |
| Điều kiện kích hoạt | Nhân viên xác nhận thanh toán |
| Input | order_id, payment_method, amount |
| Xử lý | Kiểm tra đơn hàng đã có payment chính hay chưa |
| Output | Tạo payment nếu chưa có, từ chối nếu đã thanh toán |

### Ghi chú

Trong hệ thống thực tế có thể có nhiều lần thanh toán, hoàn tiền hoặc thanh toán một phần. Tuy nhiên, MVP chỉ cần một payment chính để đơn giản.

---

## 7.12. BR-12 - Hóa đơn chỉ được tạo sau khi thanh toán thành công

| Mục | Nội dung |
|---|---|
| Mã rule | BR-12 |
| Nhóm | Invoice |
| Tên rule | Tạo hóa đơn sau thanh toán |
| Nội dung | Hóa đơn chỉ được tạo khi đơn hàng đã thanh toán thành công. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Hệ thống tạo hóa đơn |
| Input | order_id, order_status, payment_status |
| Xử lý | Kiểm tra trạng thái đơn hàng và thanh toán |
| Output | Tạo hóa đơn nếu đã thanh toán, từ chối nếu chưa thanh toán |

### Test case gợi ý

| Tình huống | Kết quả mong đợi |
|---|---|
| Tạo hóa đơn cho đơn chưa thanh toán | Bị chặn |
| Tạo hóa đơn sau thanh toán | Thành công |

---

## 7.13. BR-13 - Kiểm tra tương tác thuốc trong đơn hàng

| Mục | Nội dung |
|---|---|
| Mã rule | BR-13 |
| Nhóm | Interaction |
| Tên rule | Kiểm tra tương tác thuốc trong đơn hàng |
| Nội dung | Khi đơn hàng có từ 2 thuốc trở lên, hệ thống phải kiểm tra tương tác thuốc dựa trên dữ liệu mẫu. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Nhân viên thêm thuốc vào đơn hoặc cập nhật số lượng thuốc trong đơn |
| Input | Danh sách medicine_id trong đơn |
| Xử lý | Tạo tất cả các cặp thuốc, kiểm tra bảng DrugInteraction |
| Output | Danh sách cảnh báo nếu có |
| Ghi chú | Dữ liệu tương tác là dữ liệu mẫu cho đồ án |

### Mô tả xử lý

Khi đơn hàng có nhiều thuốc, hệ thống cần tạo tất cả các cặp thuốc có thể có. Ví dụ đơn có 3 thuốc A, B, C thì hệ thống cần kiểm tra các cặp:

- A - B.
- A - C.
- B - C.

Sau đó hệ thống kiểm tra các cặp này trong bảng DrugInteraction. Nếu bảng có cấu hình tương tác cho cặp thuốc, hệ thống tạo cảnh báo.

### Pseudo-flow

```text
Input: medicineIds = [A, B, C]

pairs = generatePairs(medicineIds)
alerts = []

for each pair in pairs:
    interaction = findInteraction(pair.medicineA, pair.medicineB)
    if interaction exists:
        alerts.add(interaction)

return alerts
```

### Test case gợi ý

| Test case | Kết quả mong đợi |
|---|---|
| Đơn có 1 thuốc | Không kiểm tra hoặc không có cảnh báo |
| Đơn có 2 thuốc không tương tác | Không hiển thị cảnh báo |
| Đơn có 2 thuốc có tương tác | Hiển thị cảnh báo |
| Đơn có 3 thuốc, có 2 cặp tương tác | Hiển thị 2 cảnh báo |

---

## 7.14. BR-14 - Hiển thị thông tin cảnh báo tương tác

| Mục | Nội dung |
|---|---|
| Mã rule | BR-14 |
| Nhóm | Interaction |
| Tên rule | Hiển thị cảnh báo tương tác thuốc |
| Nội dung | Nếu có tương tác, hệ thống phải hiển thị tên thuốc, mức độ, mô tả và khuyến nghị mẫu. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | BR-13 phát hiện tương tác |
| Input | interaction record |
| Xử lý | Format thông tin cảnh báo để hiển thị trên UI |
| Output | Cảnh báo tương tác trên màn hình bán hàng |

### Nội dung bắt buộc của cảnh báo

| Thành phần | Bắt buộc | Mô tả |
|---|---|---|
| Tên thuốc A | Có | Thuốc thứ nhất trong cặp tương tác |
| Tên thuốc B | Có | Thuốc thứ hai trong cặp tương tác |
| Mức độ | Có | Nhẹ, trung bình, cao |
| Mô tả | Có | Mô tả nguy cơ mẫu |
| Khuyến nghị | Có | Khuyến nghị xử lý mẫu |
| Disclaimer | Có | Thông tin cảnh báo chỉ mang tính tham khảo |

---

## 7.15. BR-15 - Tương tác mức cao nên có ghi chú tư vấn

| Mục | Nội dung |
|---|---|
| Mã rule | BR-15 |
| Nhóm | Interaction |
| Tên rule | Ghi chú tư vấn cho tương tác mức cao |
| Nội dung | Nếu tương tác có mức độ cao, nhân viên nên nhập ghi chú tư vấn trước khi hoàn tất đơn hàng. |
| Mức ưu tiên | Medium |
| Điều kiện kích hoạt | Cảnh báo tương tác có severity = HIGH |
| Input | interaction severity, consultation_note |
| Xử lý | Hệ thống nhắc nhân viên nhập ghi chú tư vấn |
| Output | Ghi chú tư vấn được lưu nếu nhân viên nhập |

### Ghi chú triển khai

Trong MVP, rule này có thể triển khai theo hai cách:

| Cách | Mô tả |
|---|---|
| Bắt buộc mềm | Hệ thống nhắc nhưng vẫn cho tiếp tục nếu nhân viên bỏ qua |
| Bắt buộc cứng | Hệ thống yêu cầu nhập ghi chú trước khi thanh toán |

Khuyến nghị cho đồ án: dùng **bắt buộc mềm** để tránh làm luồng demo bị chặn quá nhiều.

---

## 7.16. BR-16 - Báo cáo doanh thu chỉ tính đơn đã thanh toán

| Mục | Nội dung |
|---|---|
| Mã rule | BR-16 |
| Nhóm | Report |
| Tên rule | Doanh thu chỉ tính đơn đã thanh toán |
| Nội dung | Báo cáo doanh thu chỉ tính các đơn hàng có trạng thái đã thanh toán. |
| Mức ưu tiên | High |
| Điều kiện kích hoạt | Admin xem báo cáo doanh thu |
| Input | orders, payments |
| Xử lý | Lọc các đơn có payment_status = PAID |
| Output | Doanh thu tổng hợp |

### Test case gợi ý

| Dữ liệu | Kết quả |
|---|---|
| 1 đơn đã thanh toán 100.000, 1 đơn nháp 50.000 | Doanh thu = 100.000 |
| 2 đơn đã thanh toán 100.000 và 200.000 | Doanh thu = 300.000 |

---

## 8. Mô tả chi tiết Safety Rules

## 8.1. SR-01 - Hệ thống không chẩn đoán bệnh

| Mục | Nội dung |
|---|---|
| Mã rule | SR-01 |
| Nhóm | Medical Safety |
| Tên rule | Không chẩn đoán bệnh |
| Nội dung | Hệ thống không được đưa ra kết luận người dùng mắc bệnh hoặc tình trạng y tế cụ thể. |
| Mức ưu tiên | High |
| Áp dụng cho | AI Copilot, Graph-RAG, cảnh báo, ghi chú tư vấn |

### Ví dụ không được phép

- “Khách hàng chắc chắn bị bệnh X.”
- “Triệu chứng này là bệnh Y.”
- “Bạn đang mắc bệnh Z.”

### Cách diễn đạt an toàn hơn

- “Thông tin này chỉ mang tính tham khảo.”
- “Khách hàng nên được tư vấn bởi dược sĩ, bác sĩ hoặc chuyên gia y tế.”
- “Hệ thống không đưa ra chẩn đoán.”

---

## 8.2. SR-02 - Hệ thống không kê đơn thuốc

| Mục | Nội dung |
|---|---|
| Mã rule | SR-02 |
| Nhóm | Medical Safety |
| Tên rule | Không kê đơn thuốc |
| Nội dung | Hệ thống không được chỉ định thuốc điều trị hoặc đưa ra đơn thuốc thay cho chuyên gia y tế. |
| Mức ưu tiên | High |
| Áp dụng cho | AI Copilot, Graph-RAG, cảnh báo, ghi chú tư vấn |

### Ví dụ không được phép

- “Hãy uống thuốc A ngày 3 lần.”
- “Nên dùng thuốc B để điều trị bệnh này.”
- “Đơn thuốc phù hợp là thuốc A + thuốc B.”

### Cách diễn đạt an toàn hơn

- “Nhân viên cần kiểm tra kỹ thông tin trước khi bán.”
- “Khuyến nghị khách hàng hỏi ý kiến dược sĩ, bác sĩ hoặc chuyên gia y tế.”
- “Không sử dụng nội dung này như chỉ định điều trị.”

---

## 8.3. SR-03 - Cảnh báo chỉ mang tính tham khảo

| Mục | Nội dung |
|---|---|
| Mã rule | SR-03 |
| Nhóm | Medical Safety |
| Tên rule | Cảnh báo tham khảo |
| Nội dung | Các cảnh báo tương tác thuốc chỉ mang tính tham khảo và dựa trên dữ liệu mẫu trong đồ án. |
| Mức ưu tiên | High |
| Áp dụng cho | Interaction Alert, Graph, AI explanation |

### Yêu cầu hiển thị

- Cảnh báo phải có disclaimer.
- Không khẳng định cảnh báo là kết luận y tế chính thức.
- Không sử dụng dữ liệu mẫu để đưa ra quyết định điều trị thực tế.

---

## 8.4. SR-04 - AI không được đưa hướng dẫn điều trị cụ thể

| Mục | Nội dung |
|---|---|
| Mã rule | SR-04 |
| Nhóm | AI Safety |
| Tên rule | Không hướng dẫn điều trị cụ thể |
| Nội dung | AI không được đưa ra hướng dẫn điều trị cụ thể, liều dùng hoặc phác đồ điều trị. |
| Mức ưu tiên | High |
| Áp dụng cho | AI Copilot, Graph-RAG, AI Business Report nếu có nội dung thuốc |

### Cách kiểm soát

- Prompt phải yêu cầu AI không chẩn đoán, không kê đơn.
- Output phải được kiểm tra guardrail.
- Nếu output vi phạm, hệ thống hiển thị thông báo an toàn thay vì kết quả gốc.

---

## 8.5. SR-05 - AI phải nhắc hỏi chuyên gia khi có rủi ro

| Mục | Nội dung |
|---|---|
| Mã rule | SR-05 |
| Nhóm | AI Safety |
| Tên rule | Nhắc hỏi chuyên gia |
| Nội dung | Khi có rủi ro hoặc cảnh báo mức cao, AI phải nhắc người dùng hỏi dược sĩ, bác sĩ hoặc chuyên gia y tế. |
| Mức ưu tiên | High |
| Áp dụng cho | AI explanation, interaction alert explanation |

### Ví dụ diễn đạt

- “Với cảnh báo mức cao, cần kiểm tra kỹ và tham khảo ý kiến chuyên gia y tế.”
- “Nội dung này chỉ hỗ trợ tham khảo, không thay thế tư vấn chuyên môn.”

---

## 8.6. SR-06 - Nội dung AI phải được người dùng xác nhận trước khi lưu

| Mục | Nội dung |
|---|---|
| Mã rule | SR-06 |
| Nhóm | AI Safety |
| Tên rule | Human-in-the-loop |
| Nội dung | Nội dung do AI sinh ra không được tự động lưu hoặc sử dụng như quyết định cuối cùng nếu chưa có xác nhận của người dùng. |
| Mức ưu tiên | High |
| Áp dụng cho | AI-generated questions, AI notes, AI explanation |

### Luồng đề xuất

1. AI sinh nội dung.
2. Hệ thống hiển thị nội dung ở trạng thái nháp.
3. Người dùng xem và chỉnh sửa nếu cần.
4. Người dùng bấm xác nhận/lưu.
5. Hệ thống mới lưu nội dung chính thức.

---

## 8.7. SR-07 - Không lưu thông tin nhạy cảm không cần thiết

| Mục | Nội dung |
|---|---|
| Mã rule | SR-07 |
| Nhóm | Data Safety |
| Tên rule | Giảm thiểu dữ liệu nhạy cảm |
| Nội dung | Hệ thống không lưu thông tin nhạy cảm nếu không cần thiết cho phạm vi đồ án. |
| Mức ưu tiên | High |
| Áp dụng cho | Customer, Consultation, AI Log |

### Dữ liệu nên tránh trong demo

- Số căn cước công dân thật.
- Địa chỉ thật chi tiết.
- Hồ sơ bệnh án thật.
- Dữ liệu bệnh nhân thật.
- Số điện thoại thật của người dùng thật.
- API key hoặc token thật.

---

## 8.8. SR-08 - Không commit API key, token, mật khẩu thật

| Mục | Nội dung |
|---|---|
| Mã rule | SR-08 |
| Nhóm | Secret Safety |
| Tên rule | Không commit secret |
| Nội dung | Không được commit API key, token, mật khẩu thật hoặc thông tin nhạy cảm vào source code. |
| Mức ưu tiên | High |
| Áp dụng cho | GitHub repository, environment config, AI provider |

### Cách xử lý đề xuất

- Dùng file `.env` cho biến môi trường.
- Thêm `.env` vào `.gitignore`.
- Chỉ commit file `.env.example` không chứa secret thật.
- Không chụp màn hình API key trong báo cáo hoặc slide.
- Nếu lỡ commit secret, cần thu hồi key và tạo key mới.

---

## 8.9. SR-09 - Các tác vụ AI quan trọng phải được ghi log

| Mục | Nội dung |
|---|---|
| Mã rule | SR-09 |
| Nhóm | Audit |
| Tên rule | AI Audit Log |
| Nội dung | Các tác vụ AI quan trọng phải được ghi log để có thể truy vết. |
| Mức ưu tiên | Medium/High |
| Áp dụng cho | AI Copilot, Graph-RAG, AI-generated note, AI report |

### Dữ liệu log đề xuất

| Trường | Mô tả |
|---|---|
| user_id | Người gọi AI |
| action_type | Loại tác vụ AI |
| provider | MockAI/Gemini/OpenRouter/Ollama |
| prompt_version | Phiên bản prompt |
| input_summary | Tóm tắt input |
| output_summary | Tóm tắt output |
| status | Success/Failed/Blocked |
| created_at | Thời điểm gọi AI |

---

## 9. Rule theo module

## 9.1. Auth & Role

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-01 | Người dùng phải đăng nhập | Frontend route guard, Backend middleware |
| BR-02 | Người dùng chỉ được truy cập chức năng theo vai trò | Backend authorization guard |

## 9.2. Medicine

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-03 | Mã thuốc không được trùng | Database unique constraint, Backend validation |
| BR-04 | Giá bán phải >= 0 | Backend validation, Frontend form validation |

## 9.3. Inventory

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-05 | Số lượng tồn không được âm | Backend service, Database constraint nếu có |
| BR-06 | Không cho bán vượt tồn | Sales service, Payment service |
| BR-07 | Thuốc dưới ngưỡng hiện cảnh báo | Dashboard, Inventory service |
| BR-08 | Thuốc gần hết hạn hiện cảnh báo | Inventory service, Dashboard |

## 9.4. Sales, Payment, Invoice

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-09 | Đơn hàng phải có ít nhất một thuốc | Sales service, Payment service |
| BR-10 | Thanh toán thành công mới trừ kho | Payment service, Inventory service |
| BR-11 | Mỗi đơn hàng có một payment chính | Payment service |
| BR-12 | Hóa đơn chỉ tạo sau thanh toán | Invoice service |

## 9.5. Interaction

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-13 | Có từ 2 thuốc thì kiểm tra tương tác | Rule Engine, Sales service |
| BR-14 | Cảnh báo hiển thị đầy đủ thông tin | Frontend alert modal, Rule Engine response |
| BR-15 | Tương tác mức cao nên có ghi chú | Frontend POS, Consultation note service |

## 9.6. Report

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| BR-16 | Doanh thu chỉ tính đơn đã thanh toán | Report service |

## 9.7. AI Safety

| Rule | Nội dung | Áp dụng tại |
|---|---|---|
| SR-01 | Không chẩn đoán bệnh | Prompt, Guardrail, UI disclaimer |
| SR-02 | Không kê đơn thuốc | Prompt, Guardrail, UI disclaimer |
| SR-04 | Không hướng dẫn điều trị cụ thể | Output validation |
| SR-06 | Người dùng xác nhận trước khi lưu | UI workflow, Backend status |
| SR-09 | Tác vụ AI quan trọng phải ghi log | AI Audit service |

---

## 10. Mapping rule với test case

| Rule | Test case cần có |
|---|---|
| BR-01 | Truy cập dashboard khi chưa đăng nhập bị chặn |
| BR-02 | Staff gọi API Admin bị 403 |
| BR-03 | Thêm thuốc trùng mã bị báo lỗi |
| BR-04 | Nhập giá bán âm bị báo lỗi |
| BR-05 | Điều chỉnh tồn kho âm bị chặn |
| BR-06 | Bán vượt tồn bị chặn |
| BR-07 | Thuốc dưới min stock hiển thị cảnh báo |
| BR-08 | Thuốc gần hết hạn hiển thị cảnh báo |
| BR-09 | Thanh toán đơn rỗng bị chặn |
| BR-10 | Chưa thanh toán thì chưa trừ tồn |
| BR-11 | Đơn đã thanh toán không tạo payment chính thứ hai |
| BR-12 | Không tạo hóa đơn khi đơn chưa thanh toán |
| BR-13 | Đơn có nhiều thuốc thì kiểm tra tương tác |
| BR-14 | Cảnh báo hiển thị đủ thuốc, mức độ, mô tả, khuyến nghị |
| BR-15 | Tương tác mức cao nhắc nhập ghi chú |
| BR-16 | Báo cáo chỉ tính đơn đã thanh toán |
| SR-01 | AI không đưa ra chẩn đoán |
| SR-02 | AI không kê đơn thuốc |
| SR-03 | Cảnh báo có disclaimer |
| SR-06 | Nội dung AI không tự động lưu |
| SR-08 | Repository không có `.env` chứa secret thật |
| SR-09 | Gọi AI tạo log nếu có AI |

---

## 11. Rule Engine đề xuất

Để xử lý các rule nghiệp vụ, hệ thống có thể có một module **Rule Engine**. Trong MVP, Rule Engine có thể triển khai đơn giản bằng service backend.

### 11.1. Nhiệm vụ của Rule Engine

| Nhiệm vụ | Mô tả |
|---|---|
| Kiểm tra tồn kho | Không cho bán vượt tồn |
| Kiểm tra tương tác thuốc | Sinh cặp thuốc và tra bảng DrugInteraction |
| Tính severity | Lấy mức độ cảnh báo từ rule tương tác |
| Tạo cảnh báo | Trả danh sách cảnh báo cho frontend |
| Kiểm tra ghi chú | Nhắc nhập ghi chú nếu severity cao |
| Kiểm tra safety text | Nếu có AI, kiểm tra output không vượt phạm vi |

### 11.2. Input/Output của Rule Engine

| Thành phần | Mô tả |
|---|---|
| Input | Order items, medicine_id, quantity, customer info nếu có, consultation context nếu có |
| Output | Validation result, warning list, interaction alert list, required actions |

### 11.3. Ví dụ output cảnh báo tương tác

```json
{
  "hasAlert": true,
  "alerts": [
    {
      "medicineA": "Thuốc A mẫu",
      "medicineB": "Thuốc B mẫu",
      "severity": "HIGH",
      "description": "Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu.",
      "recommendation": "Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế.",
      "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
    }
  ]
}
```

---

## 12. Mức độ bắt buộc của rule

| Mức độ | Ý nghĩa | Ví dụ |
|---|---|---|
| Mandatory | Bắt buộc, không được bỏ qua | Không bán vượt tồn, không tạo hóa đơn trước thanh toán |
| Recommended | Nên thực hiện, có thể cảnh báo mềm | Nhập ghi chú khi tương tác mức cao |
| Optional | Có thể làm nếu đủ thời gian | AI Audit Log nếu AI chỉ mô phỏng đơn giản |

### 12.1. Rule Mandatory

Các rule bắt buộc:

- BR-01.
- BR-02.
- BR-03.
- BR-04.
- BR-05.
- BR-06.
- BR-07.
- BR-08.
- BR-09.
- BR-10.
- BR-12.
- BR-13.
- BR-14.
- BR-16.
- SR-01.
- SR-02.
- SR-03.
- SR-04.
- SR-07.
- SR-08.

### 12.2. Rule Recommended

Các rule nên có:

- BR-11.
- BR-15.
- SR-05.
- SR-06.
- SR-09.

---

## 13. Rủi ro nếu vi phạm rule

| Rule | Rủi ro nếu vi phạm |
|---|---|
| BR-01 | Người lạ truy cập hệ thống |
| BR-02 | Người dùng thao tác sai chức năng |
| BR-03 | Dữ liệu thuốc bị trùng, sai tồn kho/bán hàng |
| BR-05 | Tồn kho âm, báo cáo sai |
| BR-06 | Bán vượt tồn, demo sai nghiệp vụ |
| BR-10 | Trừ kho sai khi đơn chưa thanh toán |
| BR-12 | Hóa đơn không hợp lệ |
| BR-13 | Không phát hiện tương tác, mất điểm nổi bật |
| BR-14 | Cảnh báo không rõ, khó demo |
| SR-01 | Hệ thống bị hiểu nhầm là chẩn đoán y tế |
| SR-02 | Hệ thống bị hiểu nhầm là kê đơn thuốc |
| SR-08 | Lộ API key hoặc thông tin nhạy cảm |
| SR-09 | Không truy vết được tác vụ AI |

---

## 14. Checklist áp dụng rule khi phát triển

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| API nội bộ đã yêu cầu đăng nhập chưa? |  |
| API nhạy cảm đã kiểm tra role chưa? |  |
| Mã thuốc có unique constraint chưa? |  |
| Form thuốc có chặn giá âm chưa? |  |
| Bán hàng có chặn vượt tồn chưa? |  |
| Thanh toán xong mới trừ kho chưa? |  |
| Hóa đơn chỉ tạo sau thanh toán chưa? |  |
| Đơn có từ 2 thuốc đã kiểm tra tương tác chưa? |  |
| Cảnh báo tương tác có đủ tên thuốc, mức độ, mô tả, khuyến nghị chưa? |  |
| Cảnh báo/AI có disclaimer chưa? |  |
| AI có bị chặn chẩn đoán/kê đơn chưa? |  |
| Nội dung AI có cần người dùng xác nhận trước khi lưu không? |  |
| `.env` đã được thêm vào `.gitignore` chưa? |  |
| Có file `.env.example` không chứa secret thật chưa? |  |
| AI request/response quan trọng có log chưa? |  |

---

## 15. Kết luận

Tài liệu **Business Rule and Safety Rule Document** đã tổng hợp các quy tắc nghiệp vụ và quy tắc an toàn quan trọng của hệ thống **PharmaAssist AI Intelligence**. Các business rules giúp hệ thống xử lý đúng nghiệp vụ nhà thuốc như đăng nhập, phân quyền, quản lý thuốc, kiểm soát tồn kho, bán hàng, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo. Các safety rules giúp đảm bảo hệ thống không bị hiểu nhầm là công cụ chẩn đoán, kê đơn hoặc thay thế chuyên gia y tế.

Trong MVP, nhóm cần ưu tiên triển khai đầy đủ các rule bắt buộc như không bán vượt tồn kho, thanh toán thành công mới trừ kho, hóa đơn chỉ tạo sau thanh toán và kiểm tra tương tác khi đơn có từ hai thuốc trở lên. Nếu triển khai AI Copilot hoặc Graph-RAG, nhóm cần đặc biệt chú ý đến các quy tắc an toàn AI như không chẩn đoán, không kê đơn, có disclaimer, có xác nhận của người dùng và có audit log nếu cần.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

