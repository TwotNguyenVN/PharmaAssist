# 20_TESTING_DEMO_SETUP_GUIDE

**Mã tài liệu:** 20_Testing_Demo_Setup_Guide  
**Tên tài liệu:** Testing, Demo and Setup Guide  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu hướng dẫn kiểm thử, demo và setup hệ thống  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, Tester, Backend Developer, Frontend Developer, AI/Graph Developer, người chuẩn bị demo, người viết báo cáo, người bảo vệ đồ án  

---

## 1. Mục đích tài liệu

Tài liệu **Testing, Demo and Setup Guide** gom các hướng dẫn kiểm thử, demo và setup project để nhóm có thể chạy hệ thống **PharmaAssist AI Intelligence** ổn định trong quá trình phát triển, kiểm thử và bảo vệ đồ án.

Dự án PharmaAssist AI Intelligence có nhiều module như Auth, Medicine, Inventory, Sales, Interaction Alert, Payment, Invoice, Report, AI Copilot và Knowledge Graph. Nếu không có tài liệu setup và demo rõ ràng, nhóm dễ gặp các vấn đề như không chạy được project trên máy demo, thiếu dữ liệu mẫu, AI provider lỗi, Neo4j không kết nối, phân quyền sai hoặc luồng demo chính bị lỗi.

Tài liệu này dùng để:

- Hướng dẫn kiểm thử chức năng chính.
- Xác định test plan rút gọn cho từng module.
- Cung cấp test case mẫu.
- Hướng dẫn setup môi trường chạy project.
- Mô tả cấu trúc thư mục mẫu.
- Mô tả biến môi trường cần cấu hình.
- Hướng dẫn seed dữ liệu demo.
- Cung cấp demo script cho buổi bảo vệ.
- Chuẩn bị backup plan khi demo gặp sự cố.
- Làm cơ sở đưa vào báo cáo hoặc phụ lục đồ án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 2. Phạm vi tài liệu

Tài liệu này bao gồm:

- Test Plan rút gọn.
- Danh sách nhóm test.
- Test case mẫu.
- Quy trình test trước demo.
- Demo Script chính.
- Demo Script phụ cho AI/Graph.
- Hướng dẫn setup môi trường.
- Cấu trúc thư mục dự án.
- Biến môi trường mẫu.
- Hướng dẫn chạy frontend/backend/database.
- Hướng dẫn seed dữ liệu demo.
- Hướng dẫn chạy bằng Docker nếu có.
- Demo Backup Plan.
- Checklist trước khi bảo vệ.
- Rủi ro demo và cách xử lý.

---

## 3. Test Plan rút gọn

| Nhóm test | Nội dung |
|---|---|
| Auth | Đăng nhập, đăng xuất, phân quyền |
| Medicine | CRUD thuốc, tìm kiếm, lọc danh mục |
| Inventory | Nhập kho, tồn kho, cảnh báo sắp hết/gần hết hạn |
| Sales | Tạo đơn, thêm thuốc, cập nhật số lượng, thanh toán |
| Interaction | Kiểm tra tương tác thuốc bằng rule-based data |
| Payment/Invoice | Thanh toán mô phỏng, tạo và xem/in hóa đơn |
| Customer | Tạo, tìm kiếm, cập nhật khách hàng |
| AI | Guardrail, MockAI, AI output, Audit Log |
| Graph | Truy vấn node-edge mẫu, Graph Explorer, Graph-RAG nếu có |
| Report | Doanh thu, thuốc bán chạy, tồn kho |
| UI | Màn hình hiển thị đúng, loading/error/empty state |
| Security | Token, role guard, không lộ secret |

---

## 4. Mục tiêu kiểm thử

| Mục tiêu | Mô tả |
|---|---|
| Đảm bảo chức năng đúng | Các chức năng MVP hoạt động theo SRS |
| Đảm bảo luồng demo ổn định | Login → POS → Interaction Alert → Payment → Invoice chạy mượt |
| Đảm bảo phân quyền đúng | Admin, Staff, Warehouse chỉ thấy và gọi đúng chức năng |
| Đảm bảo dữ liệu đúng | Tồn kho, đơn hàng, thanh toán, hóa đơn cập nhật đúng |
| Đảm bảo cảnh báo hoạt động | MED001 + MED002 hiển thị cảnh báo HIGH |
| Đảm bảo AI an toàn | AI không chẩn đoán/kê đơn/liều dùng, có disclaimer |
| Đảm bảo Graph hoạt động | Graph hiển thị node-edge mẫu hoặc có mock fallback |
| Đảm bảo báo cáo đúng | Doanh thu chỉ tính đơn đã thanh toán |

---

## 5. Phạm vi kiểm thử theo mức ưu tiên

## 5.1. Must-have test

Các test này bắt buộc phải chạy trước khi demo:

- Đăng nhập bằng `admin01`, `staff01`, `warehouse01`.
- Staff tạo đơn bán thuốc.
- Staff thêm `MED001` và `MED002` vào đơn.
- Hệ thống hiển thị cảnh báo tương tác HIGH.
- Staff nhập ghi chú tư vấn.
- Staff thanh toán.
- Hệ thống tạo hóa đơn.
- Inventory hiển thị `MED003` sắp hết hàng.
- Inventory hiển thị `MED004` gần hết hạn.
- Admin xem dashboard/report.

## 5.2. Should-have test

- Admin quản lý thuốc.
- Warehouse tạo phiếu nhập.
- Customer được gắn vào đơn hàng.
- Staff không truy cập được User Management.
- Warehouse không tạo được đơn bán thuốc.
- Báo cáo thuốc bán chạy hoạt động.

## 5.3. Could-have test

- AI Copilot tạo câu hỏi bổ sung.
- AI Copilot tạo ghi chú tư vấn nháp.
- AI Guardrail chặn yêu cầu kê đơn/chẩn đoán.
- Graph Explorer hiển thị graph MED001.
- Graph-RAG giải thích cảnh báo dựa trên graph context.
- Admin xem AI Audit Log.

---

## 6. Test Case mẫu

| Test Case ID | Chức năng | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-AUTH-01 | Đăng nhập | Nhập đúng username/password | Đăng nhập thành công | Not Run |
| TC-AUTH-02 | Phân quyền | Staff truy cập quản lý user | Bị chặn 403 | Not Run |
| TC-MED-01 | Thêm thuốc | Admin nhập thuốc hợp lệ | Thuốc được tạo | Not Run |
| TC-INV-01 | Cảnh báo sắp hết | Thuốc dưới ngưỡng | Hiển thị cảnh báo | Not Run |
| TC-SALES-01 | Tạo đơn | Thêm thuốc đủ tồn | Đơn được tạo | Not Run |
| TC-SALES-02 | Bán vượt tồn | Nhập số lượng lớn hơn tồn | Hệ thống báo lỗi | Not Run |
| TC-INT-01 | Tương tác thuốc | Thêm MED001 + MED002 | Hiển thị cảnh báo HIGH | Not Run |
| TC-PAY-01 | Thanh toán | Xác nhận thanh toán | Tạo payment và trừ tồn | Not Run |
| TC-AI-01 | AI Guardrail | Yêu cầu AI kê đơn | AI từ chối/nhắc giới hạn | Not Run |
| TC-GRAPH-01 | Graph query | Xem graph MED001 | Hiển thị node liên quan | Not Run |

---

## 7. Test Case chi tiết theo module

## 7.1. Auth Test Cases

| Test Case ID | Mục tiêu | Tiền điều kiện | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|---|
| TC-AUTH-01 | Đăng nhập đúng | Có user active | Nhập `staff01/demo123` | Đăng nhập thành công, nhận token | Not Run |
| TC-AUTH-02 | Sai mật khẩu | Có user active | Nhập `staff01/sai123` | Hiển thị lỗi đăng nhập | Not Run |
| TC-AUTH-03 | Phân quyền Admin | Đăng nhập admin01 | Mở User Management | Truy cập được | Not Run |
| TC-AUTH-04 | Phân quyền Staff | Đăng nhập staff01 | Mở User Management | Bị chặn 403 hoặc không thấy menu | Not Run |
| TC-AUTH-05 | Phân quyền Warehouse | Đăng nhập warehouse01 | Mở Sales POS | Bị chặn hoặc không thấy menu | Not Run |
| TC-AUTH-06 | Đăng xuất | Đăng nhập bất kỳ user | Bấm logout | Token/session bị xóa, quay về Login | Not Run |

---

## 7.2. Medicine Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-MED-01 | Xem danh sách thuốc | Admin/Staff mở Medicine | Hiển thị MED001-MED005 | Not Run |
| TC-MED-02 | Tìm thuốc | Tìm `MED001` | Hiển thị Thuốc A mẫu | Not Run |
| TC-MED-03 | Thêm thuốc hợp lệ | Admin tạo thuốc mới | Thuốc được lưu | Not Run |
| TC-MED-04 | Mã thuốc trùng | Admin tạo thuốc code MED001 | Báo lỗi trùng mã | Not Run |
| TC-MED-05 | Giá bán âm | Admin nhập selling_price = -1 | Báo lỗi validation | Not Run |
| TC-MED-06 | Staff thêm thuốc | Staff gọi POST /medicines | Bị chặn 403 | Not Run |

---

## 7.3. Inventory Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-INV-01 | Xem tồn kho | Mở Inventory | Hiển thị tồn kho thuốc | Not Run |
| TC-INV-02 | Cảnh báo sắp hết | Kiểm tra MED003 | MED003 hiển thị low stock | Not Run |
| TC-INV-03 | Cảnh báo gần hết hạn | Kiểm tra MED004 | MED004 hiển thị near expiry | Not Run |
| TC-INV-04 | Nhập kho hợp lệ | Warehouse tạo phiếu nhập MED003 | Tồn kho MED003 tăng | Not Run |
| TC-INV-05 | Số lượng nhập <= 0 | Tạo phiếu nhập quantity = 0 | Báo lỗi validation | Not Run |
| TC-INV-06 | Staff tạo phiếu nhập | Staff mở Stock Import | Bị chặn hoặc không thấy menu | Not Run |

---

## 7.4. Sales Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-SALES-01 | Tạo đơn | Staff tạo đơn mới | Đơn trạng thái DRAFT | Not Run |
| TC-SALES-02 | Thêm thuốc đủ tồn | Thêm MED001 quantity 1 | Thuốc vào giỏ hàng | Not Run |
| TC-SALES-03 | Bán vượt tồn | Thêm MED003 quantity 999 | Báo lỗi không đủ tồn | Not Run |
| TC-SALES-04 | Cập nhật số lượng | Sửa MED001 từ 1 lên 2 | Tổng tiền cập nhật | Not Run |
| TC-SALES-05 | Xóa thuốc khỏi đơn | Xóa MED001 khỏi giỏ | Giỏ hàng cập nhật | Not Run |
| TC-SALES-06 | Đơn rỗng thanh toán | Bấm thanh toán khi không có thuốc | Nút disabled hoặc báo lỗi | Not Run |

---

## 7.5. Interaction Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-INT-01 | Tương tác HIGH | Thêm MED001 + MED002 | Hiển thị cảnh báo HIGH | Not Run |
| TC-INT-02 | Tương tác MEDIUM | Thêm MED003 + MED005 | Hiển thị cảnh báo MEDIUM | Not Run |
| TC-INT-03 | Tương tác LOW | Thêm MED004 + MED005 | Hiển thị cảnh báo LOW | Not Run |
| TC-INT-04 | Không tương tác | Thêm MED001 + MED005 | Không hiển thị cảnh báo | Not Run |
| TC-INT-05 | Một thuốc | Chỉ thêm MED001 | Không kiểm tra hoặc không cảnh báo | Not Run |
| TC-INT-06 | Ghi chú tư vấn | Cảnh báo HIGH rồi nhập note | Note được lưu | Not Run |
| TC-INT-07 | Disclaimer | Mở modal cảnh báo | Có disclaimer bắt buộc | Not Run |

---

## 7.6. Payment and Invoice Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-PAY-01 | Thanh toán tiền mặt | Thanh toán đơn có thuốc | Payment PAID, order PAID | Not Run |
| TC-PAY-02 | Trừ tồn sau thanh toán | Thanh toán đơn MED001 quantity 1 | Tồn kho MED001 giảm 1 | Not Run |
| TC-PAY-03 | Không tạo hóa đơn trước thanh toán | Mở invoice của đơn DRAFT | Báo chưa thanh toán | Not Run |
| TC-INVC-01 | Tạo hóa đơn | Thanh toán thành công | Invoice được tạo | Not Run |
| TC-INVC-02 | Xem hóa đơn | Mở hóa đơn vừa tạo | Hiển thị thuốc, số lượng, tổng tiền | Not Run |

---

## 7.7. AI Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-AI-01 | MockAI tạo câu hỏi | Gửi context hợp lệ | Trả câu hỏi + disclaimer | Not Run |
| TC-AI-02 | AI tạo note nháp | Chọn cảnh báo HIGH | Trả draftNote, requiresUserConfirmation=true | Not Run |
| TC-AI-03 | AI giải thích cảnh báo | Chọn alert MED001-MED002 | Trả explanation có disclaimer | Not Run |
| TC-AI-04 | Guardrail chẩn đoán | Input “Khách bị bệnh gì?” | Bị chặn | Not Run |
| TC-AI-05 | Guardrail kê đơn | Input “Hãy kê thuốc điều trị” | Bị chặn | Not Run |
| TC-AI-06 | Guardrail liều dùng | Input yêu cầu liều cụ thể | Bị chặn | Not Run |
| TC-AI-07 | AI Audit Log | Gọi AI thành công | Log được lưu | Not Run |
| TC-AI-08 | Staff xem AI Log | Staff mở AI Audit Log | Bị chặn 403 | Not Run |
| TC-AI-09 | Provider lỗi | Tắt API provider thật | Fallback MockAI | Not Run |

---

## 7.8. Graph Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-GRAPH-01 | Xem graph MED001 | Mở Graph Explorer, tìm MED001 | Hiển thị node Medicine, ActiveIngredient, DrugGroup | Not Run |
| TC-GRAPH-02 | Truy vấn tương tác graph | Query MED001 + MED002 | Hiển thị INTERACTS_WITH HIGH | Not Run |
| TC-GRAPH-03 | Graph không có tương tác | Query MED001 + MED005 | Không có interaction | Not Run |
| TC-GRAPH-04 | Graph disclaimer | Mở Graph Explorer | Có disclaimer dữ liệu mẫu | Not Run |
| TC-GRAPH-05 | Neo4j lỗi | Ngắt Neo4j nếu có | Dùng mock graph hoặc báo lỗi thân thiện | Not Run |

---

## 7.9. Report Test Cases

| Test Case ID | Mục tiêu | Bước test | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| TC-REP-01 | Báo cáo doanh thu | Admin mở Reports | Doanh thu chỉ tính đơn PAID | Not Run |
| TC-REP-02 | Thuốc bán chạy | Có đơn đã thanh toán | Hiển thị top medicines | Not Run |
| TC-REP-03 | Báo cáo tồn kho | Admin mở Inventory Report | Hiển thị tồn kho thấp/gần hết hạn | Not Run |
| TC-REP-04 | Staff xem báo cáo doanh thu | Staff mở Reports | Bị chặn hoặc không thấy menu | Not Run |

---

## 8. Quy trình kiểm thử trước demo

### 8.1. Bước 1: Reset môi trường

- Pull code mới nhất từ repository.
- Checkout branch demo/main ổn định.
- Cài dependency frontend/backend nếu cần.
- Reset database nếu cần.
- Chạy migration.
- Chạy seed data demo.
- Khởi động backend.
- Khởi động frontend.
- Khởi động Neo4j hoặc mock graph nếu có.

### 8.2. Bước 2: Test tài khoản

- Đăng nhập admin01.
- Đăng nhập staff01.
- Đăng nhập warehouse01.
- Kiểm tra menu theo role.

### 8.3. Bước 3: Test dữ liệu demo

- Kiểm tra MED001-MED005 tồn tại.
- Kiểm tra MED003 sắp hết.
- Kiểm tra MED004 gần hết hạn.
- Kiểm tra MED001-MED002 có tương tác HIGH.
- Kiểm tra khách Nguyễn Văn A tồn tại.

### 8.4. Bước 4: Test luồng demo chính

- Staff tạo đơn.
- Thêm MED001.
- Thêm MED002.
- Xem cảnh báo HIGH.
- Ghi chú tư vấn.
- Thanh toán.
- Xem hóa đơn.

### 8.5. Bước 5: Test phần nâng cao

- AI Copilot/MockAI.
- AI Audit Log.
- Graph Explorer.
- Graph-RAG nếu có.

---

## 9. Demo Script

## 9.1. Demo chính

1. Đăng nhập Admin.
2. Xem Dashboard.
3. Xem danh sách thuốc.
4. Đăng nhập Nhân viên kho.
5. Xem tồn kho và cảnh báo.
6. Đăng nhập Nhân viên nhà thuốc.
7. Tạo đơn bán thuốc.
8. Thêm hai thuốc có tương tác.
9. Xem cảnh báo tương tác.
10. Ghi chú tư vấn.
11. Thanh toán.
12. In hóa đơn.
13. Admin xem báo cáo.
14. Nếu có: mở AI Copilot.
15. Nếu có: mở Graph Explorer.
16. Nếu có: xem AI Audit Log.

---

## 10. Demo Script chi tiết

## 10.1. Phần 1: Admin Dashboard

| Bước | Hành động | Nội dung thuyết trình |
|---|---|---|
| 1 | Đăng nhập admin01 | Đây là tài khoản Admin/Chủ nhà thuốc |
| 2 | Mở Dashboard | Dashboard hiển thị tổng quan doanh thu, đơn hàng, tồn kho |
| 3 | Mở Medicine Management | Admin có thể quản lý thuốc và danh mục |
| 4 | Mở Reports | Admin xem báo cáo doanh thu và thuốc bán chạy |

### Kết quả cần đạt

- Admin đăng nhập thành công.
- Dashboard có dữ liệu.
- Menu Admin đầy đủ.

---

## 10.2. Phần 2: Nhân viên kho xem tồn kho

| Bước | Hành động | Nội dung thuyết trình |
|---|---|---|
| 1 | Đăng nhập warehouse01 | Đây là tài khoản Nhân viên kho |
| 2 | Mở Inventory | Nhân viên kho theo dõi tồn kho |
| 3 | Xem cảnh báo sắp hết | MED003 có tồn kho dưới ngưỡng |
| 4 | Xem cảnh báo gần hết hạn | MED004 gần hết hạn theo dữ liệu demo |
| 5 | Mở Stock Import | Nhân viên kho có thể tạo phiếu nhập |

### Kết quả cần đạt

- Warehouse thấy Inventory và Stock Import.
- Warehouse không thấy Sales POS nếu phân quyền đúng.
- MED003/MED004 hiển thị cảnh báo.

---

## 10.3. Phần 3: Nhân viên nhà thuốc bán thuốc có cảnh báo tương tác

| Bước | Hành động | Nội dung thuyết trình |
|---|---|---|
| 1 | Đăng nhập staff01 | Đây là tài khoản Nhân viên nhà thuốc |
| 2 | Mở Sales POS | Đây là màn hình bán thuốc tại quầy |
| 3 | Chọn khách Nguyễn Văn A | Gắn khách hàng vào đơn |
| 4 | Tìm và thêm MED001 | Hệ thống kiểm tra tồn kho |
| 5 | Tìm và thêm MED002 | Đơn có 2 thuốc nên kiểm tra tương tác |
| 6 | Xem cảnh báo HIGH | Hệ thống phát hiện cặp tương tác theo dữ liệu mẫu |
| 7 | Nhập ghi chú tư vấn | Nhân viên lưu ghi chú tham khảo |
| 8 | Thanh toán | Thanh toán mô phỏng tiền mặt/chuyển khoản |
| 9 | Xem hóa đơn | Hệ thống tạo hóa đơn sau thanh toán |

### Kết quả cần đạt

- Cảnh báo HIGH xuất hiện.
- Có disclaimer an toàn.
- Ghi chú lưu được.
- Thanh toán thành công.
- Hóa đơn được tạo.

### Câu nói gợi ý khi demo cảnh báo

```text
Ở đây hệ thống đang dùng rule-based bằng dữ liệu mẫu. Khi đơn hàng có từ hai thuốc trở lên, hệ thống tạo các cặp thuốc và kiểm tra bảng DrugInteraction. Với MED001 và MED002, hệ thống phát hiện cảnh báo mức HIGH, hiển thị mô tả và khuyến nghị mẫu. Thông tin này chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
```

---

## 10.4. Phần 4: AI Copilot nếu có

| Bước | Hành động | Nội dung thuyết trình |
|---|---|---|
| 1 | Mở AI Copilot | AI hỗ trợ nhân viên ở mức tham khảo |
| 2 | Chọn context cảnh báo MED001-MED002 | AI nhận dữ liệu cảnh báo mẫu |
| 3 | Bấm tạo câu hỏi bổ sung | MockAI/AI provider sinh câu hỏi |
| 4 | Bấm tạo ghi chú tư vấn | AI tạo ghi chú nháp |
| 5 | Xem disclaimer | AI không chẩn đoán, không kê đơn |
| 6 | Admin xem AI Audit Log | Hệ thống có truy vết AI |

### Kết quả cần đạt

- AI/MockAI trả output.
- Output có disclaimer.
- Có nút xác nhận trước khi lưu.
- AI log được lưu.

---

## 10.5. Phần 5: Graph Explorer nếu có

| Bước | Hành động | Nội dung thuyết trình |
|---|---|---|
| 1 | Mở Graph Explorer | Hệ thống có Knowledge Graph mẫu |
| 2 | Tìm MED001 | Hiển thị node thuốc |
| 3 | Xem quan hệ CONTAINS/BELONGS_TO | Thuốc liên kết với hoạt chất/nhóm thuốc mẫu |
| 4 | Query MED001-MED002 | Hiển thị INTERACTS_WITH mức HIGH |
| 5 | Nếu có Graph-RAG | Dùng graph context cho AI giải thích |

### Kết quả cần đạt

- Graph hiển thị node-edge.
- Có relationship INTERACTS_WITH.
- Có disclaimer dữ liệu graph mẫu.

---

## 11. Setup Guide

## 11.1. Yêu cầu môi trường

| Thành phần | Phiên bản đề xuất | Bắt buộc |
|---|---|---|
| Node.js | 18+ | Có nếu dùng React/Next/NestJS |
| Java | 17+ | Nếu dùng Spring Boot |
| PostgreSQL/MySQL | Theo nhóm chọn | Có |
| Neo4j | 5.x hoặc Neo4j Desktop | Nếu dùng Graph thật |
| Git | Bắt buộc | Có |
| Docker | Nếu dùng container | Không bắt buộc |
| Postman/Insomnia | Test API | Khuyến nghị |

---

## 11.2. Cấu trúc thư mục mẫu

```text
pharmaassist/
  frontend/
    src/
    package.json
    .env.example
  backend/
    src/
    package.json hoặc pom.xml
    .env.example
  database/
    migrations/
    seed/
  docs/
  README.md
  docker-compose.yml
```

### 11.2.1. Ý nghĩa thư mục

| Thư mục/File | Mô tả |
|---|---|
| frontend/ | Source code giao diện web |
| backend/ | Source code API/backend service |
| database/migrations/ | Script tạo bảng hoặc migration ORM |
| database/seed/ | Script dữ liệu demo |
| docs/ | Tài liệu phân tích, thiết kế, test, demo |
| README.md | Hướng dẫn chạy project |
| docker-compose.yml | Cấu hình chạy bằng Docker nếu có |

---

## 11.3. Biến môi trường mẫu

```env
DATABASE_URL=
JWT_SECRET=
AI_PROVIDER=
AI_API_KEY=
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=
```

### 11.3.1. Mô tả biến môi trường

| Biến | Mô tả | Ví dụ |
|---|---|---|
| DATABASE_URL | Chuỗi kết nối database quan hệ | postgresql://user:pass@localhost:5432/pharmaassist |
| JWT_SECRET | Secret ký JWT | demo-secret-change-me |
| AI_PROVIDER | Provider AI đang dùng | MockAI/Gemini/OpenRouter/Ollama |
| AI_API_KEY | API key nếu dùng AI thật | Không commit key thật |
| NEO4J_URI | URI Neo4j | bolt://localhost:7687 |
| NEO4J_USERNAME | Username Neo4j | neo4j |
| NEO4J_PASSWORD | Password Neo4j | password demo |

### 11.3.2. Quy tắc bảo mật biến môi trường

- Không commit file `.env` thật.
- Chỉ commit `.env.example`.
- Không đưa API key thật vào README, slide hoặc báo cáo.
- Không commit log có chứa secret.
- Không dùng JWT_SECRET demo cho hệ thống thật.

---

## 12. Hướng dẫn chạy project local

## 12.1. Clone project

```bash
git clone <repository-url>
cd pharmaassist
```

## 12.2. Chạy backend Node.js/NestJS nếu dùng

```bash
cd backend
npm install
cp .env.example .env
npm run migration:run
npm run seed
npm run start:dev
```

## 12.3. Chạy frontend React/Next.js nếu dùng

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 12.4. Chạy backend Spring Boot nếu dùng

```bash
cd backend
./mvnw spring-boot:run
```

Hoặc nếu dùng Gradle:

```bash
cd backend
./gradlew bootRun
```

## 12.5. Chạy database local

Tùy nhóm chọn PostgreSQL hoặc MySQL.

Ví dụ PostgreSQL:

```bash
createdb pharmaassist
```

Sau đó chạy migration và seed bằng công cụ ORM hoặc script SQL của nhóm.

---

## 13. Hướng dẫn chạy bằng Docker Compose nếu có

### 13.1. File docker-compose.yml gợi ý

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: pharmaassist
      POSTGRES_USER: pharmaassist
      POSTGRES_PASSWORD: pharmaassist
    ports:
      - "5432:5432"

  neo4j:
    image: neo4j:5
    environment:
      NEO4J_AUTH: neo4j/password
    ports:
      - "7474:7474"
      - "7687:7687"

  backend:
    build: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - neo4j

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

### 13.2. Lệnh chạy

```bash
docker compose up -d
```

### 13.3. Lệnh tắt

```bash
docker compose down
```

### 13.4. Lưu ý

- Nếu nhóm chưa quen Docker, có thể chạy local thay vì Docker.
- Nếu Neo4j chưa dùng, có thể bỏ service neo4j hoặc dùng mock graph.

---

## 14. Seed data guide

### 14.1. Dữ liệu cần seed

| Nhóm dữ liệu | Dữ liệu cần có |
|---|---|
| Role | ADMIN, STAFF, WAREHOUSE |
| User | admin01, staff01, warehouse01 |
| Category | Nhóm 1, Nhóm 2, Nhóm 3 |
| Medicine | MED001-MED005 |
| Inventory | Tồn kho MED001-MED005 |
| Customer | Nguyễn Văn A, Trần Thị B, Lê Văn C |
| Interaction | MED001-MED002 HIGH, MED003-MED005 MEDIUM, MED004-MED005 LOW |
| AI | MockAI response, AI prompt template nếu có |
| Graph | Node/relationship demo nếu dùng Neo4j |

### 14.2. Kiểm tra seed thành công

| Kiểm tra | Kết quả mong đợi |
|---|---|
| Login admin01 | Thành công |
| Medicine list | Có MED001-MED005 |
| Inventory MED003 | quantity <= min_stock |
| Inventory MED004 | near expiry |
| Interaction MED001-MED002 | HIGH |
| Customer Nguyễn Văn A | Có dữ liệu |
| AI provider | MockAI hoạt động |
| Graph MED001 | Có node nếu dùng graph |

---

## 15. Postman/API test guide

Nếu UI lỗi hoặc chưa hoàn thiện, nhóm có thể demo một phần bằng Postman.

### 15.1. API cần chuẩn bị trong Postman

| API | Mục đích demo |
|---|---|
| POST /auth/login | Lấy access token |
| GET /medicines | Xem thuốc |
| GET /inventories | Xem tồn kho |
| POST /orders | Tạo đơn |
| POST /orders/{id}/items | Thêm thuốc vào đơn |
| POST /orders/{id}/check-interactions | Kiểm tra tương tác |
| POST /orders/{id}/pay | Thanh toán |
| GET /orders/{id}/invoice | Xem hóa đơn |
| POST /ai/consultation/questions | AI Copilot nếu có |
| GET /graph/medicine/{id} | Graph nếu có |

### 15.2. Lưu ý dùng Postman

- Lưu token vào environment variable.
- Chuẩn bị collection trước buổi bảo vệ.
- Không để API key thật trong collection nộp công khai.

---

## 16. Demo Backup Plan

| Sự cố | Phương án dự phòng |
|---|---|
| AI API lỗi | Dùng MockAI |
| Neo4j lỗi | Dùng ảnh graph hoặc dữ liệu mock |
| Database lỗi | Restore seed data |
| Mạng lỗi | Demo local |
| UI lỗi | Demo bằng Postman API |
| Thiếu dữ liệu | Dùng Demo Data Pack |
| Frontend không chạy | Dùng backend API + ảnh chụp UI |
| Backend không chạy | Dùng video demo dự phòng nếu có |
| Laptop lỗi | Có máy phụ hoặc project clone sẵn |
| Hóa đơn lỗi in | Hiển thị hóa đơn trên màn hình thay vì in thật |

---

## 17. Checklist trước khi demo

| Hạng mục | Có/Không |
|---|---|
| Project đã pull code mới nhất chưa? |  |
| Branch demo/main ổn định chưa? |  |
| Frontend chạy được chưa? |  |
| Backend chạy được chưa? |  |
| Database kết nối được chưa? |  |
| Seed data đã chạy chưa? |  |
| admin01 đăng nhập được chưa? |  |
| staff01 đăng nhập được chưa? |  |
| warehouse01 đăng nhập được chưa? |  |
| MED001-MED005 có trong database chưa? |  |
| MED001 + MED002 hiển thị cảnh báo HIGH chưa? |  |
| MED003 hiển thị sắp hết chưa? |  |
| MED004 hiển thị gần hết hạn chưa? |  |
| Thanh toán tạo hóa đơn được chưa? |  |
| AI Copilot/MockAI chạy được chưa? |  |
| AI Audit Log có dữ liệu chưa? |  |
| Graph Explorer/Mock Graph chạy được chưa? |  |
| Postman backup đã chuẩn bị chưa? |  |
| Demo script đã mở sẵn chưa? |  |
| Slide đã mở sẵn chưa? |  |

---

## 18. Checklist sau khi demo thử

| Câu hỏi | Có/Không |
|---|---|
| Luồng demo có bị lỗi ở bước nào không? |  |
| Cảnh báo tương tác có hiển thị đúng không? |  |
| Disclaimer có xuất hiện ở cảnh báo/AI không? |  |
| Thanh toán có trừ tồn kho không? |  |
| Hóa đơn có đúng tổng tiền không? |  |
| Tài khoản role có đúng quyền không? |  |
| Dữ liệu sau nhiều lần demo có bị cạn tồn kho không? |  |
| Có cần reset seed data trước buổi bảo vệ không? |  |
| Có chuẩn bị phương án dự phòng chưa? |  |

---

## 19. Rủi ro khi setup và demo

| Rủi ro | Mức độ | Cách xử lý |
|---|---|---|
| Sai version Node.js | Trung bình | Dùng Node 18+ hoặc nvm |
| Database chưa chạy | Cao | Kiểm tra service DB trước khi chạy backend |
| Migration lỗi | Cao | Có script reset database |
| Seed data thiếu | Cao | Dùng checklist seed data |
| JWT_SECRET chưa cấu hình | Trung bình | Kiểm tra .env |
| CORS lỗi | Trung bình | Cấu hình backend cho frontend local |
| AI API key thiếu | Trung bình | Dùng AI_PROVIDER=MockAI |
| Neo4j password sai | Trung bình | Kiểm tra NEO4J_URI/USERNAME/PASSWORD |
| Port bị trùng | Trung bình | Đổi port hoặc tắt process cũ |
| Demo nhiều lần làm giảm tồn kho | Trung bình | Reset seed data trước demo chính |

---

## 20. Kịch bản reset dữ liệu demo

### 20.1. Khi nào cần reset?

- Trước buổi bảo vệ.
- Sau khi demo nhiều lần khiến tồn kho bị giảm.
- Sau khi test tạo nhiều đơn hàng rác.
- Sau khi database bị lỗi dữ liệu.

### 20.2. Quy trình reset đề xuất

```text
1. Dừng backend nếu cần.
2. Drop database hoặc truncate các bảng demo.
3. Chạy migration.
4. Chạy seed data.
5. Khởi động backend.
6. Kiểm tra tài khoản demo.
7. Kiểm tra MED001-MED005.
8. Kiểm tra interaction MED001-MED002.
9. Kiểm tra MED003 low stock và MED004 near expiry.
```

---

## 21. Gợi ý README rút gọn

```markdown
# PharmaAssist AI Intelligence

Website quản lý nhà thuốc thông minh tích hợp cảnh báo tương tác thuốc, AI Copilot và Knowledge Graph.

## Chức năng chính
- Đăng nhập, phân quyền
- Quản lý thuốc
- Quản lý tồn kho
- Nhập thuốc
- Bán thuốc tại quầy
- Cảnh báo tương tác thuốc rule-based
- Thanh toán mô phỏng
- Hóa đơn
- Báo cáo
- AI Copilot/MockAI
- Neo4j Knowledge Graph/Mock Graph

## Tài khoản demo
| Role | Username | Password |
|---|---|---|
| Admin | admin01 | demo123 |
| Staff | staff01 | demo123 |
| Warehouse | warehouse01 | demo123 |

## Chạy project
```bash
cd backend
npm install
npm run start:dev

cd frontend
npm install
npm run dev
```

## Lưu ý
Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
```

---

## 22. Tiêu chí demo đạt yêu cầu

| Tiêu chí | Mô tả |
|---|---|
| Login thành công | Đăng nhập được ít nhất 3 role demo |
| Dashboard có dữ liệu | Admin xem được tổng quan |
| Medicine hiển thị | Có MED001-MED005 |
| Inventory cảnh báo | MED003 low stock, MED004 near expiry |
| Sales POS hoạt động | Staff tạo đơn và thêm thuốc |
| Interaction Alert hoạt động | MED001 + MED002 hiển thị HIGH |
| Payment hoạt động | Thanh toán tạo payment và trừ tồn |
| Invoice hoạt động | Hóa đơn hiển thị đúng |
| AI/Graph nếu có | Có MockAI/Graph demo hoặc fallback |
| Tài liệu đầy đủ | Có test case, setup guide, demo script |

---

## 23. Kết luận

Tài liệu **Testing, Demo and Setup Guide** đã tổng hợp hướng dẫn kiểm thử, setup môi trường, seed dữ liệu, demo script và phương án dự phòng cho hệ thống **PharmaAssist AI Intelligence**. Đây là tài liệu giúp nhóm chạy project ổn định, kiểm thử đầy đủ và chuẩn bị tốt cho buổi bảo vệ đồ án.

Trước khi bảo vệ, nhóm cần ưu tiên kiểm tra luồng demo chính: đăng nhập, bán thuốc, cảnh báo tương tác MED001-MED002, ghi chú tư vấn, thanh toán và hóa đơn. Các phần AI Copilot, Neo4j Knowledge Graph và Graph-RAG nên có MockAI/Mock Graph dự phòng để tránh phụ thuộc vào API hoặc môi trường bên ngoài.

Dữ liệu demo cần được reset trước khi trình bày để đảm bảo tồn kho, cảnh báo và báo cáo hiển thị đúng như kịch bản.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

