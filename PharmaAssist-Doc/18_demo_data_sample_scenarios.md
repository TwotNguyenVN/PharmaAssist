# 18_DEMO_DATA_SAMPLE_SCENARIOS

**Mã tài liệu:** 18_Demo_Data_Sample_Scenarios  
**Tên tài liệu:** Demo Data and Sample Scenarios Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu dữ liệu mẫu và kịch bản demo  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, Tester, Backend Developer, Frontend Developer, AI/Graph Developer, người chuẩn bị demo, người viết báo cáo, người làm slide bảo vệ  

---

## 1. Mục đích tài liệu

Tài liệu **Demo Data and Sample Scenarios** chứa bộ dữ liệu mẫu dùng thống nhất cho database, test case, AI Copilot, Knowledge Graph, Graph-RAG và demo bảo vệ của hệ thống **PharmaAssist AI Intelligence**.

Trong đồ án Công Nghệ Phần Mềm, dữ liệu demo rất quan trọng vì sản phẩm cần có kịch bản trình bày rõ ràng, dễ thao tác và thể hiện được các chức năng nổi bật. Nếu dữ liệu mẫu không thống nhất, nhóm có thể gặp các lỗi khi demo như không có thuốc tương tác, không có thuốc sắp hết, không có thuốc gần hết hạn, không có tài khoản đúng vai trò hoặc AI/Graph không có dữ liệu để hiển thị.

Tài liệu này giúp nhóm:

- Chuẩn hóa tài khoản demo cho từng vai trò.
- Chuẩn hóa thuốc mẫu, tồn kho mẫu, khách hàng mẫu.
- Chuẩn hóa dữ liệu tương tác thuốc mẫu.
- Chuẩn hóa dữ liệu nhập kho, đơn hàng, thanh toán và hóa đơn mẫu.
- Chuẩn hóa dữ liệu AI Copilot và AI Audit Log mẫu.
- Chuẩn hóa dữ liệu Neo4j Knowledge Graph mẫu.
- Chuẩn bị kịch bản demo chính.
- Chuẩn bị dữ liệu test cho các test case quan trọng.
- Đảm bảo các thành viên dùng cùng một bộ dữ liệu khi code, test và bảo vệ.

**Lưu ý an toàn:** Tất cả dữ liệu thuốc, tương tác, triệu chứng, hoạt chất, khuyến nghị và AI output trong tài liệu này là dữ liệu mẫu phục vụ đồ án. Không sử dụng như dữ liệu y khoa thật.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 2. Phạm vi dữ liệu mẫu

Dữ liệu mẫu trong tài liệu này bao gồm:

- Tài khoản demo.
- Vai trò demo.
- Danh mục thuốc mẫu.
- Thuốc mẫu.
- Hoạt chất mẫu.
- Tồn kho mẫu.
- Nhà cung cấp mẫu.
- Phiếu nhập mẫu.
- Khách hàng mẫu.
- Đơn hàng mẫu.
- Thanh toán mẫu.
- Hóa đơn mẫu.
- Dữ liệu tương tác thuốc mẫu.
- Dữ liệu cảnh báo tương tác mẫu.
- Dữ liệu AI Copilot mẫu.
- Dữ liệu AI Audit Log mẫu.
- Dữ liệu Knowledge Graph mẫu.
- Kịch bản demo chính.
- Kịch bản demo phụ.
- Dữ liệu test edge case.

---

## 3. Nguyên tắc tạo dữ liệu demo

| Nguyên tắc | Mô tả |
|---|---|
| Dữ liệu dễ nhớ | Mã thuốc, username và tên khách hàng phải dễ nhớ khi demo |
| Có đủ tình huống | Phải có thuốc tương tác, thuốc sắp hết, thuốc gần hết hạn |
| Không dùng dữ liệu thật | Không dùng thông tin bệnh nhân, khách hàng hoặc thuốc thật nhạy cảm |
| Dữ liệu nhất quán | Mã thuốc trong database, API, AI và Neo4j phải khớp nhau |
| Dữ liệu có mục đích | Mỗi record nên phục vụ một màn hình hoặc kịch bản demo |
| Dữ liệu an toàn | Tương tác và khuyến nghị chỉ là mẫu, không dùng cho điều trị thật |
| Dễ reset | Có thể seed lại dữ liệu trước khi demo |

---

## 4. Tài khoản demo

| Role | Username | Password | Mục đích |
|---|---|---|---|
| Admin | admin01 | demo123 | Xem dashboard, quản lý thuốc, báo cáo, AI logs |
| Nhân viên nhà thuốc | staff01 | demo123 | Bán thuốc, xem cảnh báo, thanh toán, hóa đơn, AI Copilot |
| Nhân viên kho | warehouse01 | demo123 | Nhập kho, xem tồn kho, cảnh báo sắp hết/gần hết hạn |

### 4.1. Chi tiết tài khoản demo

| Username | Họ tên | Role | Trạng thái | Ghi chú |
|---|---|---|---|---|
| admin01 | Admin Demo | ADMIN | ACTIVE | Tài khoản quản trị chính |
| staff01 | Staff Demo | STAFF | ACTIVE | Tài khoản demo luồng bán thuốc |
| warehouse01 | Warehouse Demo | WAREHOUSE | ACTIVE | Tài khoản demo nhập kho và tồn kho |

### 4.2. Lưu ý bảo mật

- Password `demo123` chỉ dùng cho môi trường demo.
- Không dùng password demo cho hệ thống thật.
- Trong database, password vẫn phải được hash.
- Không commit secret/API key thật vào repository.

---

## 5. Vai trò demo

| Role Code | Tên vai trò | Mục đích |
|---|---|---|
| ADMIN | Admin / Chủ nhà thuốc | Quản trị toàn hệ thống |
| STAFF | Nhân viên nhà thuốc | Bán thuốc, tư vấn tham khảo, thanh toán |
| WAREHOUSE | Nhân viên kho | Nhập thuốc, theo dõi tồn kho |

---

## 6. Danh mục thuốc mẫu

| Mã danh mục | Tên danh mục | Mô tả | Mục đích demo |
|---|---|---|---|
| CAT001 | Nhóm 1 | Danh mục thuốc mẫu nhóm 1 | Chứa MED001, MED002 để demo tương tác HIGH |
| CAT002 | Nhóm 2 | Danh mục thuốc mẫu nhóm 2 | Chứa MED003, MED004 để demo sắp hết/gần hết hạn |
| CAT003 | Nhóm 3 | Danh mục thuốc mẫu nhóm 3 | Chứa MED005 không tương tác chính |

---

## 7. Thuốc mẫu

| Mã thuốc | Tên thuốc | Danh mục | Tồn kho | Giá | Ghi chú |
|---|---|---|---:|---:|---|
| MED001 | Thuốc A mẫu | Nhóm 1 | 120 | 20000 | Dùng demo tương tác |
| MED002 | Thuốc B mẫu | Nhóm 1 | 80 | 30000 | Tương tác HIGH với MED001 |
| MED003 | Thuốc C mẫu | Nhóm 2 | 15 | 25000 | Sắp hết hàng |
| MED004 | Thuốc D mẫu | Nhóm 2 | 50 | 15000 | Gần hết hạn |
| MED005 | Thuốc E mẫu | Nhóm 3 | 100 | 18000 | Không tương tác với MED001/MED002, có tương tác mẫu với MED003/MED004 |

### 7.1. Chi tiết thuốc mẫu

| Field | MED001 | MED002 | MED003 | MED004 | MED005 |
|---|---|---|---|---|---|
| code | MED001 | MED002 | MED003 | MED004 | MED005 |
| name | Thuốc A mẫu | Thuốc B mẫu | Thuốc C mẫu | Thuốc D mẫu | Thuốc E mẫu |
| category | Nhóm 1 | Nhóm 1 | Nhóm 2 | Nhóm 2 | Nhóm 3 |
| unit | Hộp | Hộp | Hộp | Hộp | Hộp |
| selling_price | 20000 | 30000 | 25000 | 15000 | 18000 |
| status | ACTIVE | ACTIVE | ACTIVE | ACTIVE | ACTIVE |
| description | Dữ liệu thuốc mẫu | Dữ liệu thuốc mẫu | Dữ liệu thuốc mẫu | Dữ liệu thuốc mẫu | Dữ liệu thuốc mẫu |

---

## 8. Hoạt chất mẫu

| Mã hoạt chất | Tên hoạt chất | Mô tả | Thuốc liên quan |
|---|---|---|---|
| AI001 | Hoạt chất X mẫu | Hoạt chất mẫu phục vụ demo | MED001 |
| AI002 | Hoạt chất Y mẫu | Hoạt chất mẫu phục vụ demo | MED002 |
| AI003 | Hoạt chất Z mẫu | Hoạt chất mẫu phục vụ demo | MED003 |
| AI004 | Hoạt chất W mẫu | Hoạt chất mẫu phục vụ demo | MED004 |
| AI005 | Hoạt chất V mẫu | Hoạt chất mẫu phục vụ demo | MED005 |

Ghi chú: Hoạt chất trong tài liệu là dữ liệu mẫu, không dùng thay thế thông tin y khoa thật.

---

## 9. Tồn kho mẫu

| Mã thuốc | Tên thuốc | Tồn kho | Ngưỡng tối thiểu | Hạn dùng | Trạng thái demo |
|---|---|---:|---:|---|---|
| MED001 | Thuốc A mẫu | 120 | 20 | 2027-12-31 | Bình thường |
| MED002 | Thuốc B mẫu | 80 | 20 | 2027-12-31 | Bình thường |
| MED003 | Thuốc C mẫu | 15 | 20 | 2027-06-30 | Sắp hết hàng |
| MED004 | Thuốc D mẫu | 50 | 20 | 2026-06-20 | Gần hết hạn |
| MED005 | Thuốc E mẫu | 100 | 20 | 2027-09-30 | Bình thường |

### 9.1. Ý nghĩa dữ liệu tồn kho

| Mã thuốc | Ý nghĩa |
|---|---|
| MED001 | Đủ tồn để demo bán hàng |
| MED002 | Đủ tồn để demo bán hàng và tương tác HIGH |
| MED003 | Tồn kho 15 <= min_stock 20 nên xuất hiện trong cảnh báo sắp hết |
| MED004 | Hạn dùng gần ngày demo nên xuất hiện trong cảnh báo gần hết hạn |
| MED005 | Thuốc bình thường, dùng để demo không cảnh báo hoặc tương tác mức thấp/trung bình |

---

## 10. Nhà cung cấp mẫu

| Mã NCC | Tên nhà cung cấp | Số điện thoại | Email | Ghi chú |
|---|---|---|---|---|
| SUP001 | Nhà cung cấp Demo 1 | 0911111111 | supplier1.demo@example.com | Dữ liệu mẫu |
| SUP002 | Nhà cung cấp Demo 2 | 0922222222 | supplier2.demo@example.com | Dữ liệu mẫu |

---

## 11. Phiếu nhập mẫu

| Mã phiếu nhập | Nhà cung cấp | Người nhập | Ngày nhập | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| SI0001 | Nhà cung cấp Demo 1 | warehouse01 | 2026-05-17 | CONFIRMED | Phiếu nhập demo đã xác nhận |
| SI0002 | Nhà cung cấp Demo 2 | warehouse01 | 2026-05-17 | DRAFT | Phiếu nhập nháp demo |

### 11.1. Chi tiết phiếu nhập SI0001

| Mã thuốc | Số lượng nhập | Giá nhập mẫu | Hạn dùng | Số lô |
|---|---:|---:|---|---|
| MED001 | 100 | 12000 | 2027-12-31 | LOT-A-001 |
| MED002 | 80 | 18000 | 2027-12-31 | LOT-B-001 |
| MED003 | 15 | 15000 | 2027-06-30 | LOT-C-001 |
| MED004 | 50 | 9000 | 2026-06-20 | LOT-D-001 |
| MED005 | 100 | 10000 | 2027-09-30 | LOT-E-001 |

---

## 12. Tương tác thuốc mẫu

| Thuốc A | Thuốc B | Mức độ | Mô tả mẫu | Khuyến nghị mẫu |
|---|---|---|---|---|
| MED001 | MED002 | HIGH | Có nguy cơ tương tác đáng chú ý trong dữ liệu mẫu | Cần kiểm tra kỹ và ghi chú tư vấn |
| MED003 | MED005 | MEDIUM | Có thể cần lưu ý khi dùng cùng nhau | Nhắc khách hỏi chuyên gia y tế nếu cần |
| MED004 | MED005 | LOW | Có thể gây khó chịu nhẹ ở một số trường hợp mẫu | Tư vấn cách sử dụng phù hợp |

### 12.1. Chi tiết tương tác mẫu

| ID | Medicine A | Medicine B | Severity | Risk Score | Description | Recommendation | Active |
|---:|---|---|---|---:|---|---|---|
| INT001 | MED001 | MED002 | HIGH | 90 | Có nguy cơ tương tác đáng chú ý trong dữ liệu mẫu | Cần kiểm tra kỹ, hiển thị cảnh báo nổi bật và ghi chú tư vấn | Yes |
| INT002 | MED003 | MED005 | MEDIUM | 60 | Có thể cần lưu ý khi dùng cùng nhau theo dữ liệu mẫu | Nhân viên nên nhắc khách hỏi chuyên gia y tế nếu cần | Yes |
| INT003 | MED004 | MED005 | LOW | 30 | Có thể gây khó chịu nhẹ trong một số tình huống mẫu | Tư vấn khách đọc kỹ hướng dẫn và hỏi chuyên gia khi có thắc mắc | Yes |

### 12.2. Lưu ý an toàn

Dữ liệu tương tác trong bảng này là dữ liệu giả lập để demo rule-based interaction alert. Không dùng làm căn cứ tư vấn hoặc điều trị thật.

---

## 13. Khách hàng mẫu

| Tên | Số điện thoại | Ghi chú |
|---|---|---|
| Nguyễn Văn A | 0900000001 | Khách demo |
| Trần Thị B | 0900000002 | Có lịch sử mua |
| Lê Văn C | 0900000003 | Khách mới |

### 13.1. Lưu ý dữ liệu khách hàng

- Số điện thoại là dữ liệu giả lập.
- Không dùng thông tin khách hàng thật.
- Không lưu bệnh án hoặc thông tin nhạy cảm trong demo.

---

## 14. Đơn hàng mẫu

| Mã đơn | Khách hàng | Nhân viên | Trạng thái | Tổng tiền | Mục đích |
|---|---|---|---|---:|---|
| ORD0001 | Trần Thị B | staff01 | PAID | 50000 | Đơn đã thanh toán để demo báo cáo |
| ORD0002 | Nguyễn Văn A | staff01 | DRAFT | 0 | Đơn nháp nếu cần demo |

### 14.1. Chi tiết đơn ORD0001

| Mã thuốc | Tên thuốc | Số lượng | Đơn giá | Thành tiền |
|---|---|---:|---:|---:|
| MED001 | Thuốc A mẫu | 1 | 20000 | 20000 |
| MED002 | Thuốc B mẫu | 1 | 30000 | 30000 |

### 14.2. Thanh toán ORD0001

| Mã thanh toán | Phương thức | Số tiền | Trạng thái |
|---|---|---:|---|
| PAY0001 | CASH | 50000 | PAID |

### 14.3. Hóa đơn ORD0001

| Mã hóa đơn | Mã đơn | Ngày tạo | Tổng tiền |
|---|---|---|---:|
| INV0001 | ORD0001 | 2026-05-17 | 50000 |

---

## 15. Dữ liệu cảnh báo tương tác mẫu

| Mã alert | Mã đơn | Interaction | Severity | Nội dung |
|---|---|---|---|---|
| ALERT001 | ORD0001 | INT001 | HIGH | MED001 và MED002 có cảnh báo tương tác HIGH theo dữ liệu mẫu |

### 15.1. Ghi chú tư vấn mẫu

| Mã note | Mã đơn | Nhân viên | Nội dung | Source |
|---|---|---|---|---|
| NOTE001 | ORD0001 | staff01 | Đã hiển thị cảnh báo tương tác HIGH theo dữ liệu mẫu. Nhân viên đã ghi chú tư vấn tham khảo. | manual |

---

## 16. AI Copilot dữ liệu mẫu

## 16.1. Context mẫu cho AI tạo câu hỏi bổ sung

```text
Khách hàng đang mua Thuốc A mẫu và Thuốc B mẫu trong cùng một đơn hàng.
Hệ thống phát hiện cảnh báo tương tác mức HIGH theo dữ liệu mẫu.
Nhân viên cần một số câu hỏi bổ sung để tham khảo trước khi hoàn tất đơn hàng.
```

## 16.2. Output mẫu cho Generate follow-up questions

```json
{
  "questions": [
    "Khách hàng có đang sử dụng thêm thuốc nào khác không?",
    "Khách hàng có tiền sử dị ứng với thuốc hoặc thành phần nào không?",
    "Khách hàng có đang mang thai, cho con bú hoặc có tình trạng sức khỏe cần lưu ý không?",
    "Khách hàng đã từng gặp phản ứng bất thường khi dùng thuốc tương tự chưa?"
  ],
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

## 16.3. Output mẫu cho Explain interaction alert

```json
{
  "explanation": "Theo dữ liệu mẫu của hệ thống, Thuốc A mẫu và Thuốc B mẫu có cảnh báo tương tác ở mức HIGH. Nhân viên nên kiểm tra kỹ thông tin, ghi chú tư vấn và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế nếu có rủi ro.",
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

## 16.4. Output mẫu cho Generate consultation note

```json
{
  "draftNote": "Đã phát hiện cảnh báo tương tác mức HIGH giữa Thuốc A mẫu và Thuốc B mẫu theo dữ liệu mẫu. Nhân viên đã hiển thị cảnh báo cho khách và ghi chú tư vấn tham khảo. Nội dung này cần được kiểm tra trước khi lưu chính thức.",
  "requiresUserConfirmation": true,
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

---

## 17. AI Audit Log mẫu

| ID | User | Action Type | Provider | Status | Ghi chú |
|---:|---|---|---|---|---|
| 1 | staff01 | GENERATE_FOLLOW_UP_QUESTIONS | MockAI | SUCCESS | Tạo câu hỏi bổ sung demo |
| 2 | staff01 | EXPLAIN_INTERACTION_ALERT | MockAI | SUCCESS | Giải thích cảnh báo INT001 |
| 3 | staff01 | GENERATE_CONSULTATION_NOTE | MockAI | SUCCESS | Tạo ghi chú tư vấn nháp |
| 4 | staff01 | UNSAFE_MEDICAL_REQUEST | MockAI | BLOCKED | Guardrail chặn yêu cầu chẩn đoán/kê đơn |

### 17.1. Chi tiết AI log mẫu

| Field | Giá trị mẫu |
|---|---|
| action_type | GENERATE_CONSULTATION_NOTE |
| provider | MockAI |
| model | mock-pharma-assist |
| input_summary | Order ORD0001 có cảnh báo HIGH giữa MED001 và MED002 |
| output_summary | AI tạo ghi chú tư vấn nháp có disclaimer |
| status | SUCCESS |
| guardrail_result | PASS |

---

## 18. Knowledge Graph dữ liệu mẫu

## 18.1. Node mẫu

| Label | ID/Code | Name | Mục đích |
|---|---|---|---|
| Medicine | MED001 | Thuốc A mẫu | Thuốc demo tương tác |
| Medicine | MED002 | Thuốc B mẫu | Tương tác HIGH với MED001 |
| Medicine | MED003 | Thuốc C mẫu | Tương tác MEDIUM với MED005 |
| Medicine | MED004 | Thuốc D mẫu | Tương tác LOW với MED005 |
| Medicine | MED005 | Thuốc E mẫu | Thuốc dùng demo tương tác phụ |
| ActiveIngredient | AI001 | Hoạt chất X mẫu | Hoạt chất của MED001 |
| ActiveIngredient | AI002 | Hoạt chất Y mẫu | Hoạt chất của MED002 |
| DrugGroup | DG001 | Nhóm 1 | Nhóm của MED001/MED002 |
| DrugGroup | DG002 | Nhóm 2 | Nhóm của MED003/MED004 |
| Symptom | SYM001 | Triệu chứng mẫu A | Dùng demo red flag |
| RedFlag | RF001 | Dấu hiệu nguy hiểm mẫu | Dùng demo guardrail |
| Recommendation | REC001 | Khuyến nghị hỏi chuyên gia y tế | Dùng demo recommendation |

## 18.2. Relationship mẫu

| From | Relationship | To | Thuộc tính |
|---|---|---|---|
| MED001 | CONTAINS | AI001 | amountText = Hàm lượng mẫu |
| MED002 | CONTAINS | AI002 | amountText = Hàm lượng mẫu |
| MED001 | BELONGS_TO | DG001 |  |
| MED002 | BELONGS_TO | DG001 |  |
| MED003 | BELONGS_TO | DG002 |  |
| MED004 | BELONGS_TO | DG002 |  |
| MED001 | INTERACTS_WITH | MED002 | severity = HIGH, riskScore = 90 |
| MED003 | INTERACTS_WITH | MED005 | severity = MEDIUM, riskScore = 60 |
| MED004 | INTERACTS_WITH | MED005 | severity = LOW, riskScore = 30 |
| SYM001 | HAS_REDFLAG | RF001 | urgency = HIGH |
| RF001 | HAS_RECOMMENDATION | REC001 | priority = HIGH |

---

## 19. Cypher seed mẫu rút gọn

```cypher
MERGE (:Medicine {id: 1, code: 'MED001', name: 'Thuốc A mẫu', source: 'demo'});
MERGE (:Medicine {id: 2, code: 'MED002', name: 'Thuốc B mẫu', source: 'demo'});
MERGE (:Medicine {id: 3, code: 'MED003', name: 'Thuốc C mẫu', source: 'demo'});
MERGE (:Medicine {id: 4, code: 'MED004', name: 'Thuốc D mẫu', source: 'demo'});
MERGE (:Medicine {id: 5, code: 'MED005', name: 'Thuốc E mẫu', source: 'demo'});

MERGE (:ActiveIngredient {id: 1, name: 'Hoạt chất X mẫu', source: 'demo'});
MERGE (:ActiveIngredient {id: 2, name: 'Hoạt chất Y mẫu', source: 'demo'});

MERGE (:DrugGroup {id: 1, name: 'Nhóm 1', description: 'Nhóm thuốc mẫu'});
MERGE (:DrugGroup {id: 2, name: 'Nhóm 2', description: 'Nhóm thuốc mẫu'});

MATCH (m:Medicine {code: 'MED001'}), (a:ActiveIngredient {name: 'Hoạt chất X mẫu'})
MERGE (m)-[:CONTAINS {amountText: 'Hàm lượng mẫu'}]->(a);

MATCH (m:Medicine {code: 'MED002'}), (a:ActiveIngredient {name: 'Hoạt chất Y mẫu'})
MERGE (m)-[:CONTAINS {amountText: 'Hàm lượng mẫu'}]->(a);

MATCH (m:Medicine {code: 'MED001'}), (g:DrugGroup {name: 'Nhóm 1'})
MERGE (m)-[:BELONGS_TO]->(g);

MATCH (m:Medicine {code: 'MED002'}), (g:DrugGroup {name: 'Nhóm 1'})
MERGE (m)-[:BELONGS_TO]->(g);

MATCH (m1:Medicine {code: 'MED001'}), (m2:Medicine {code: 'MED002'})
MERGE (m1)-[r:INTERACTS_WITH]-(m2)
SET r.severity = 'HIGH',
    r.riskScore = 90,
    r.description = 'Có nguy cơ tương tác đáng chú ý trong dữ liệu mẫu',
    r.recommendation = 'Cần kiểm tra kỹ và ghi chú tư vấn',
    r.source = 'demo';
```

---

## 20. Kịch bản demo chính

## 20.1. Scenario 1: Bán thuốc có cảnh báo tương tác

### Mục tiêu

Demo luồng quan trọng nhất của hệ thống: nhân viên bán thuốc, thêm hai thuốc có tương tác, hệ thống cảnh báo, nhân viên ghi chú, thanh toán và in hóa đơn.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| staff01 | demo123 | STAFF |

### Dữ liệu sử dụng

| Loại dữ liệu | Giá trị |
|---|---|
| Khách hàng | Nguyễn Văn A |
| Thuốc 1 | MED001 - Thuốc A mẫu |
| Thuốc 2 | MED002 - Thuốc B mẫu |
| Cảnh báo | HIGH |
| Tổng tiền dự kiến | 50.000 nếu mỗi thuốc số lượng 1 |

### Các bước demo

1. Đăng nhập bằng tài khoản `staff01`.
2. Mở màn hình **Sales POS**.
3. Tạo đơn cho khách **Nguyễn Văn A**.
4. Tìm thuốc `MED001`.
5. Thêm `MED001` vào đơn với số lượng 1.
6. Tìm thuốc `MED002`.
7. Thêm `MED002` vào đơn với số lượng 1.
8. Hệ thống tự kiểm tra tương tác thuốc.
9. Hệ thống hiển thị cảnh báo **HIGH** giữa `MED001` và `MED002`.
10. Nhân viên đọc cảnh báo.
11. Nhân viên nhập ghi chú tư vấn.
12. Nhân viên xác nhận thanh toán.
13. Hệ thống trừ tồn kho.
14. Hệ thống tạo hóa đơn.
15. Nhân viên xem/in hóa đơn.

### Kết quả mong đợi

| Hạng mục | Kết quả |
|---|---|
| Đăng nhập | Thành công |
| Thêm MED001 | Thành công |
| Thêm MED002 | Thành công |
| Kiểm tra tồn kho | Đủ tồn |
| Kiểm tra tương tác | Có cảnh báo HIGH |
| Ghi chú tư vấn | Lưu được |
| Thanh toán | Thành công |
| Hóa đơn | Được tạo |

### Nội dung cần nhấn mạnh khi thuyết trình

- Hệ thống không bán vượt tồn kho.
- Hệ thống tự kiểm tra tương tác khi đơn có từ 2 thuốc.
- Cảnh báo gồm tên thuốc, mức độ, mô tả và khuyến nghị.
- Cảnh báo chỉ là dữ liệu mẫu cho đồ án.
- Nhân viên có thể ghi chú tư vấn.
- Thanh toán thành công mới trừ tồn kho và tạo hóa đơn.

---

## 20.2. Scenario 2: Thuốc sắp hết

### Mục tiêu

Demo chức năng cảnh báo tồn kho thấp cho nhân viên kho.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| warehouse01 | demo123 | WAREHOUSE |

### Dữ liệu sử dụng

| Mã thuốc | Tên thuốc | Tồn kho | Min stock |
|---|---|---:|---:|
| MED003 | Thuốc C mẫu | 15 | 20 |

### Các bước demo

1. Đăng nhập bằng tài khoản `warehouse01`.
2. Mở màn hình **Inventory**.
3. Chọn bộ lọc **Thuốc sắp hết** hoặc xem cảnh báo trên dashboard kho.
4. Hệ thống hiển thị `MED003` trong danh sách thuốc sắp hết.
5. Nhân viên kho có thể chuyển sang màn hình **Stock Import** nếu cần nhập thêm.

### Kết quả mong đợi

- `MED003` xuất hiện trong danh sách thuốc sắp hết.
- Badge hoặc cảnh báo hiển thị rõ ràng.
- Warehouse không thấy các chức năng bán hàng/thanh toán nếu phân quyền đúng.

---

## 20.3. Scenario 3: Thuốc gần hết hạn

### Mục tiêu

Demo cảnh báo thuốc gần hết hạn.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| warehouse01 | demo123 | WAREHOUSE |

### Dữ liệu sử dụng

| Mã thuốc | Tên thuốc | Hạn dùng | Ghi chú |
|---|---|---|---|
| MED004 | Thuốc D mẫu | 2026-06-20 | Gần hết hạn theo cấu hình demo |

### Các bước demo

1. Đăng nhập bằng `warehouse01`.
2. Mở màn hình **Inventory**.
3. Chọn bộ lọc **Thuốc gần hết hạn**.
4. Hệ thống hiển thị `MED004` trong danh sách cảnh báo.

### Kết quả mong đợi

- `MED004` hiển thị cảnh báo gần hết hạn.
- Người demo giải thích hệ thống dựa trên `expiry_date` và số ngày cấu hình.

---

## 20.4. Scenario 4: AI Copilot

### Mục tiêu

Demo AI Copilot hoặc MockAI hỗ trợ tạo câu hỏi bổ sung và ghi chú tư vấn tham khảo.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| staff01 | demo123 | STAFF |

### Dữ liệu sử dụng

| Loại dữ liệu | Giá trị |
|---|---|
| Context | Đơn hàng có MED001 và MED002 |
| Alert | HIGH interaction alert |
| AI Provider | MockAI hoặc provider thật nếu có |

### Các bước demo

1. Đăng nhập bằng `staff01`.
2. Mở **AI Copilot** hoặc mở cảnh báo tương tác rồi bấm **AI giải thích**.
3. Nhập thông tin mẫu hoặc chọn cảnh báo `MED001 - MED002`.
4. Bấm **Tạo câu hỏi bổ sung**.
5. AI/MockAI trả danh sách câu hỏi.
6. Hệ thống hiển thị disclaimer.
7. Bấm **Tạo ghi chú tư vấn**.
8. AI tạo ghi chú ở trạng thái nháp.
9. Nhân viên xác nhận trước khi lưu.
10. Hệ thống lưu AI Audit Log.

### Kết quả mong đợi

- AI tạo nội dung tham khảo.
- Có disclaimer.
- Output không tự động lưu nếu chưa xác nhận.
- AI Audit Log ghi nhận tác vụ.

---

## 20.5. Scenario 5: Graph Explorer

### Mục tiêu

Demo Knowledge Graph/Neo4j hoặc mock graph.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| admin01 hoặc staff01 | demo123 | ADMIN/STAFF |

### Dữ liệu sử dụng

| Node/Relationship | Giá trị |
|---|---|
| Medicine | MED001, MED002 |
| ActiveIngredient | Hoạt chất X mẫu, Hoạt chất Y mẫu |
| Relationship | CONTAINS, BELONGS_TO, INTERACTS_WITH |

### Các bước demo

1. Đăng nhập bằng `admin01` hoặc `staff01`.
2. Mở màn hình **Graph Explorer**.
3. Tìm thuốc `MED001`.
4. Hệ thống hiển thị subgraph gồm Medicine, ActiveIngredient, DrugGroup.
5. Chọn truy vấn tương tác giữa `MED001` và `MED002`.
6. Hệ thống hiển thị relationship `INTERACTS_WITH` mức HIGH.
7. Nếu có Graph-RAG, bấm **Giải thích bằng AI**.

### Kết quả mong đợi

- Graph hiển thị node và relationship mẫu.
- Có disclaimer về dữ liệu graph mẫu.
- Nếu dùng AI, output đi qua guardrail.

---

## 20.6. Scenario 6: Admin xem báo cáo và AI Audit Log

### Mục tiêu

Demo chức năng quản trị, báo cáo và truy vết AI.

### Tài khoản sử dụng

| Username | Password | Role |
|---|---|---|
| admin01 | demo123 | ADMIN |

### Các bước demo

1. Đăng nhập bằng `admin01`.
2. Mở **Dashboard**.
3. Xem card doanh thu, đơn hàng, thuốc sắp hết, thuốc gần hết hạn.
4. Mở **Reports**.
5. Xem báo cáo doanh thu và thuốc bán chạy.
6. Mở **AI Audit Log**.
7. Xem các log MockAI đã tạo ở Scenario 4.

### Kết quả mong đợi

- Admin xem được báo cáo.
- Admin xem được AI log.
- Staff/Warehouse không xem được AI Audit Log.

---

## 21. Dữ liệu test edge case

| Edge Case | Dữ liệu | Kết quả mong đợi |
|---|---|---|
| Bán vượt tồn | MED003, quantity = 999 | Hệ thống chặn bán |
| Đơn chỉ có 1 thuốc | MED001 | Không cần kiểm tra tương tác hoặc không có cảnh báo |
| Đơn có 2 thuốc không tương tác | MED001 + MED005 | Không cảnh báo |
| Đơn có tương tác HIGH | MED001 + MED002 | Cảnh báo HIGH |
| Đơn có tương tác MEDIUM | MED003 + MED005 | Cảnh báo MEDIUM |
| Đơn có tương tác LOW | MED004 + MED005 | Cảnh báo LOW |
| Thuốc sắp hết | MED003 | Hiển thị low stock |
| Thuốc gần hết hạn | MED004 | Hiển thị near expiry |
| Staff xem AI Audit Log | staff01 | 403 Forbidden |
| Warehouse tạo đơn bán thuốc | warehouse01 | 403 Forbidden |
| AI input yêu cầu chẩn đoán | “Khách bị bệnh gì?” | Guardrail chặn |
| AI input yêu cầu kê đơn | “Hãy kê thuốc điều trị” | Guardrail chặn |

---

## 22. Seed data SQL gợi ý rút gọn

Ghi chú: Đây là dữ liệu gợi ý. Nhóm cần điều chỉnh theo schema/ORM thực tế.

```sql
-- Roles
INSERT INTO roles (code, name) VALUES
('ADMIN', 'Admin / Chủ nhà thuốc'),
('STAFF', 'Nhân viên nhà thuốc'),
('WAREHOUSE', 'Nhân viên kho');

-- Users: password_hash cần được tạo bằng thuật toán hash trong backend
INSERT INTO users (full_name, username, password_hash, status) VALUES
('Admin Demo', 'admin01', '<hashed_demo123>', 'ACTIVE'),
('Staff Demo', 'staff01', '<hashed_demo123>', 'ACTIVE'),
('Warehouse Demo', 'warehouse01', '<hashed_demo123>', 'ACTIVE');

-- Categories
INSERT INTO medicine_categories (name, description, status) VALUES
('Nhóm 1', 'Danh mục thuốc mẫu nhóm 1', 'ACTIVE'),
('Nhóm 2', 'Danh mục thuốc mẫu nhóm 2', 'ACTIVE'),
('Nhóm 3', 'Danh mục thuốc mẫu nhóm 3', 'ACTIVE');

-- Medicines
INSERT INTO medicines (category_id, code, name, unit, selling_price, description, status) VALUES
(1, 'MED001', 'Thuốc A mẫu', 'Hộp', 20000, 'Dữ liệu thuốc mẫu', 'ACTIVE'),
(1, 'MED002', 'Thuốc B mẫu', 'Hộp', 30000, 'Dữ liệu thuốc mẫu', 'ACTIVE'),
(2, 'MED003', 'Thuốc C mẫu', 'Hộp', 25000, 'Dữ liệu thuốc mẫu', 'ACTIVE'),
(2, 'MED004', 'Thuốc D mẫu', 'Hộp', 15000, 'Dữ liệu thuốc mẫu', 'ACTIVE'),
(3, 'MED005', 'Thuốc E mẫu', 'Hộp', 18000, 'Dữ liệu thuốc mẫu', 'ACTIVE');

-- Customers
INSERT INTO customers (full_name, phone, note) VALUES
('Nguyễn Văn A', '0900000001', 'Khách demo'),
('Trần Thị B', '0900000002', 'Có lịch sử mua'),
('Lê Văn C', '0900000003', 'Khách mới');
```

---

## 23. Seed data interaction SQL gợi ý

```sql
INSERT INTO drug_interactions
(medicine_a_id, medicine_b_id, severity, description, recommendation, is_active)
VALUES
(1, 2, 'HIGH',
 'Có nguy cơ tương tác đáng chú ý trong dữ liệu mẫu',
 'Cần kiểm tra kỹ và ghi chú tư vấn',
 true),
(3, 5, 'MEDIUM',
 'Có thể cần lưu ý khi dùng cùng nhau',
 'Nhắc khách hỏi chuyên gia y tế nếu cần',
 true),
(4, 5, 'LOW',
 'Có thể gây khó chịu nhẹ ở một số trường hợp mẫu',
 'Tư vấn cách sử dụng phù hợp',
 true);
```

---

## 24. Checklist chuẩn bị dữ liệu trước demo

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Có tài khoản admin01/staff01/warehouse01 chưa? |  |
| Password demo đã hash trong database chưa? |  |
| Có đủ 3 role ADMIN/STAFF/WAREHOUSE chưa? |  |
| Có đủ 5 thuốc MED001 đến MED005 chưa? |  |
| MED001 và MED002 có tồn kho đủ để bán chưa? |  |
| MED003 có tồn kho <= min_stock chưa? |  |
| MED004 có hạn dùng gần hết hạn chưa? |  |
| Có khách hàng Nguyễn Văn A chưa? |  |
| Có rule tương tác MED001-MED002 mức HIGH chưa? |  |
| Có rule tương tác MED003-MED005 mức MEDIUM chưa? |  |
| Có rule tương tác MED004-MED005 mức LOW chưa? |  |
| AI Copilot có MockAI output chưa? |  |
| AI Audit Log có dữ liệu mẫu hoặc có thể tạo khi demo chưa? |  |
| Neo4j hoặc mock graph có node MED001/MED002 chưa? |  |
| Graph có relationship INTERACTS_WITH giữa MED001 và MED002 chưa? |  |
| Có kịch bản demo in ra cho người thuyết trình chưa? |  |

---

## 25. Rủi ro khi demo và cách xử lý

| Rủi ro | Tác động | Cách xử lý |
|---|---|---|
| Quên seed data | Không có dữ liệu để demo | Chuẩn bị script seed và checklist |
| MED001/MED002 không có interaction | Không demo được điểm nổi bật | Kiểm tra trước bảng drug_interactions |
| Tồn kho MED001/MED002 bằng 0 | Không bán được | Reset tồn kho trước demo |
| MED003 không dưới min_stock | Không hiện cảnh báo sắp hết | Đặt quantity = 15, min_stock = 20 |
| MED004 không gần hết hạn | Không hiện cảnh báo expiry | Đặt expiry_date gần ngày demo |
| AI provider lỗi | Không demo được AI | Dùng MockAI fallback |
| Neo4j lỗi | Không demo được graph | Chuẩn bị mock graph JSON/screenshot |
| Tài khoản sai role | Menu không đúng | Kiểm tra user_roles trước demo |
| Dữ liệu thật bị đưa vào demo | Rủi ro riêng tư | Chỉ dùng dữ liệu giả lập |

---

## 26. Kết luận

Tài liệu **Demo Data and Sample Scenarios** đã chuẩn hóa bộ dữ liệu mẫu và kịch bản demo cho hệ thống **PharmaAssist AI Intelligence**. Bộ dữ liệu này bao gồm tài khoản demo, thuốc mẫu, tồn kho mẫu, tương tác thuốc mẫu, khách hàng mẫu, dữ liệu AI Copilot, AI Audit Log, Knowledge Graph và các kịch bản demo chính.

Trong buổi bảo vệ, nhóm nên ưu tiên demo Scenario 1 vì đây là luồng thể hiện rõ nhất giá trị của hệ thống: bán thuốc, kiểm tra tồn kho, cảnh báo tương tác thuốc, ghi chú tư vấn, thanh toán và hóa đơn. Sau đó có thể demo thêm cảnh báo thuốc sắp hết, thuốc gần hết hạn, AI Copilot, Graph Explorer và AI Audit Log nếu còn thời gian.

Tất cả dữ liệu trong tài liệu này là dữ liệu mẫu phục vụ đồ án. Không sử dụng dữ liệu này cho tư vấn y tế thật.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

