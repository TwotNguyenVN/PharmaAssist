# 16_AI_ARCHITECTURE_GUARDRAIL

**Mã tài liệu:** 16_AI_Architecture_Guardrail  
**Tên tài liệu:** AI Architecture and Guardrail Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu kiến trúc AI, Guardrail và AI Governance  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** AI Developer, Backend Developer, Frontend Developer, Tester, System Analyst, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **AI Architecture and Guardrail** mô tả kiến trúc AI của hệ thống **PharmaAssist AI Intelligence**, bao gồm AI Orchestrator, AI Provider Adapter, Prompt Builder, Context Builder, Guardrail Engine, AI Audit Log, MockAI và các quy tắc an toàn khi sử dụng AI.

Trong dự án PharmaAssist AI Intelligence, AI không được thiết kế để thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế. AI chỉ đóng vai trò hỗ trợ tham khảo trong phạm vi đồ án Công Nghệ Phần Mềm, ví dụ:

- Tạo câu hỏi bổ sung để nhân viên nhà thuốc tham khảo.
- Giải thích cảnh báo tương tác thuốc bằng ngôn ngữ dễ hiểu.
- Tạo ghi chú tư vấn dạng nháp để nhân viên kiểm tra và xác nhận.
- Tóm tắt báo cáo doanh thu/tồn kho ở mức tham khảo.

Vì hệ thống có liên quan đến thuốc và thông tin tư vấn, kiến trúc AI phải có cơ chế kiểm soát an toàn. Guardrail được dùng để ngăn AI chẩn đoán bệnh, kê đơn thuốc, đưa liều dùng điều trị cụ thể hoặc tạo nội dung vượt phạm vi. AI Audit Log được dùng để lưu lại các tác vụ AI quan trọng nhằm phục vụ truy vết và giải thích trong đồ án.

Tài liệu này dùng để:

- Mô tả kiến trúc AI tổng thể.
- Xác định các thành phần AI và vai trò của từng thành phần.
- Mô tả luồng xử lý AI từ frontend đến provider.
- Mô tả cơ chế guardrail input/output.
- Mô tả quy tắc an toàn AI.
- Mô tả prompt template mẫu.
- Mô tả cách dùng MockAI để demo ổn định.
- Mô tả AI Audit Log.
- Làm cơ sở triển khai AI Module, API AI và test case AI.

---

## 2. Phạm vi tài liệu

Tài liệu này bao gồm các nội dung sau:

- Kiến trúc AI tổng thể.
- Các thành phần AI trong backend.
- AI Provider Adapter.
- MockAI.
- Prompt Builder.
- Context Builder.
- Guardrail Engine.
- AI Cache nếu cần.
- AI Audit Log.
- Use case AI.
- Prompt template mẫu.
- Quy tắc an toàn AI.
- Luồng xử lý AI.
- Luồng Graph-RAG nếu kết hợp Neo4j.
- Test case AI/Guardrail.
- Rủi ro AI và biện pháp xử lý.

Tài liệu này không hướng dẫn sử dụng AI để tư vấn y tế thật, không cung cấp dữ liệu y khoa thật và không dùng để xây dựng hệ thống chẩn đoán hoặc kê đơn.

---

## 3. Nguyên tắc AI trong PharmaAssist

| Nguyên tắc | Mô tả |
|---|---|
| AI chỉ hỗ trợ tham khảo | AI không thay thế nhân viên nhà thuốc, dược sĩ, bác sĩ hoặc chuyên gia y tế |
| Không chẩn đoán | AI không được kết luận khách hàng mắc bệnh |
| Không kê đơn | AI không được chỉ định thuốc điều trị hoặc tạo đơn thuốc |
| Không đưa liều điều trị | AI không được đưa liều dùng, phác đồ hoặc hướng dẫn điều trị cụ thể |
| Human-in-the-loop | Nội dung AI phải được người dùng xem, chỉnh sửa và xác nhận trước khi lưu |
| Có disclaimer | Mọi output AI liên quan thuốc/tư vấn phải có disclaimer an toàn |
| Có audit log | Tác vụ AI quan trọng nên được lưu log |
| Có MockAI | Hệ thống cần có MockAI để demo ổn định, không phụ thuộc internet/API key |
| Không lưu secret | Không commit API key, token hoặc mật khẩu thật vào source code |
| Dữ liệu mẫu | Dữ liệu thuốc, tương tác, graph và khuyến nghị là dữ liệu mẫu phục vụ đồ án |

---

## 4. Kiến trúc AI tổng quan

```text
Frontend AI UI
    |
    v
Backend AI Orchestrator
    |
    +-- Prompt Builder
    +-- Context Builder
    +-- Guardrail Engine
    +-- Provider Selector
    +-- AI Cache
    +-- AI Audit Log
    |
    +-- MockAI
    +-- Gemini
    +-- OpenRouter
    +-- Ollama
```

### 4.1. Mô tả kiến trúc

Frontend AI UI gửi yêu cầu AI đến backend, ví dụ yêu cầu tạo câu hỏi bổ sung, giải thích cảnh báo hoặc tạo ghi chú tư vấn. Backend AI Orchestrator không gọi AI Provider trực tiếp ngay lập tức, mà phải đi qua các bước kiểm soát:

1. Nhận request từ frontend.
2. Kiểm tra quyền người dùng.
3. Chuẩn hóa request.
4. Guardrail kiểm tra input.
5. Context Builder lấy dữ liệu liên quan từ database/graph.
6. Prompt Builder tạo prompt an toàn từ template.
7. Provider Selector chọn AI Provider phù hợp.
8. Gọi AI Provider hoặc MockAI.
9. Guardrail kiểm tra output.
10. Lưu AI Audit Log.
11. Trả kết quả dạng nháp về frontend.
12. Người dùng xác nhận trước khi lưu.

---

## 5. Sơ đồ kiến trúc AI chi tiết dạng text

```text
+-------------------------------------------------------------+
|                       Frontend AI UI                        |
|-------------------------------------------------------------|
| AI Copilot Screen                                           |
| Interaction Alert Explain Button                            |
| Consultation Note Draft UI                                  |
| AI Business Report UI                                       |
+------------------------------|------------------------------+
                               |
                               | REST API / JSON
                               v
+-------------------------------------------------------------+
|                    Backend AI Orchestrator                  |
|-------------------------------------------------------------|
| - Validate request                                           |
| - Check role permission                                      |
| - Coordinate AI workflow                                     |
| - Return draft output                                        |
+---------|----------------|----------------|----------------+
          |                |                |
          v                v                v
+----------------+  +----------------+  +--------------------+
| Prompt Builder |  | Context Builder|  | Guardrail Engine   |
|----------------|  |----------------|  |--------------------|
| Template       |  | Order context  |  | Input validation   |
| Variables      |  | Alert context  |  | Output validation  |
| Safety text    |  | Graph context  |  | Safety filtering   |
+----------------+  +----------------+  +--------------------+
          |                |                |
          +----------------+----------------+
                           |
                           v
+-------------------------------------------------------------+
|                    Provider Selector                        |
|-------------------------------------------------------------|
| Select MockAI / Gemini / OpenRouter / Ollama                |
| Fallback strategy                                            |
+------------------------------|------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                       AI Provider Layer                     |
|-------------------------------------------------------------|
| MockAI | Gemini Adapter | OpenRouter Adapter | Ollama Adapter|
+------------------------------|------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                    AI Audit Log / AI Cache                  |
|-------------------------------------------------------------|
| Save request summary, output summary, provider, status       |
| Optional cache for repeated safe requests                    |
+-------------------------------------------------------------+
```

---

## 6. Thành phần AI

| Thành phần | Vai trò |
|---|---|
| AI Orchestrator | Điều phối toàn bộ luồng AI |
| Prompt Builder | Tạo prompt từ template |
| Context Builder | Lấy dữ liệu đơn hàng, thuốc, cảnh báo, graph |
| Guardrail Engine | Kiểm soát input/output |
| Provider Adapter | Gọi AI provider khác nhau |
| Provider Selector | Chọn provider phù hợp hoặc fallback |
| MockAI | AI giả lập để demo ổn định |
| AI Cache | Lưu tạm kết quả nếu muốn giảm gọi provider |
| AI Audit Log | Lưu request/response và trạng thái guardrail |

---

## 7. AI Orchestrator

### 7.1. Mục tiêu

AI Orchestrator là thành phần trung tâm điều phối toàn bộ luồng xử lý AI. Frontend không gọi trực tiếp AI Provider, mà gọi backend AI Orchestrator. Điều này giúp hệ thống kiểm soát bảo mật, guardrail, prompt, context, provider và audit log.

### 7.2. Trách nhiệm

| Trách nhiệm | Mô tả |
|---|---|
| Nhận request AI | Nhận yêu cầu từ frontend |
| Kiểm tra quyền | Chỉ Admin/Staff được dùng AI Copilot |
| Gọi guardrail input | Kiểm tra input trước khi build prompt |
| Gọi context builder | Lấy context liên quan từ database/graph |
| Gọi prompt builder | Tạo prompt an toàn |
| Chọn provider | Chọn MockAI, Gemini, OpenRouter hoặc Ollama |
| Gọi AI provider | Lấy output từ provider |
| Gọi guardrail output | Kiểm tra output trước khi trả về frontend |
| Lưu audit log | Lưu thông tin request/response |
| Trả draft output | Trả kết quả AI ở trạng thái nháp |

### 7.3. Input/Output

| Thành phần | Nội dung |
|---|---|
| Input | user_id, action_type, context, selected_medicine_ids, interaction_alert_id |
| Output | AI draft output, disclaimer, requiresUserConfirmation, auditLogId |

---

## 8. Prompt Builder

### 8.1. Mục tiêu

Prompt Builder tạo prompt cuối cùng gửi cho AI Provider dựa trên prompt template và dữ liệu context.

### 8.2. Trách nhiệm

| Trách nhiệm | Mô tả |
|---|---|
| Lấy prompt template | Lấy từ code hoặc bảng ai_prompt_templates |
| Chèn context | Chèn dữ liệu đơn hàng, thuốc, cảnh báo, graph |
| Chèn safety instruction | Thêm ràng buộc không chẩn đoán, không kê đơn |
| Chuẩn hóa format output | Yêu cầu AI trả output ngắn gọn, dễ hiểu |
| Gắn disclaimer | Đảm bảo output có disclaimer hoặc backend bổ sung disclaimer |

### 8.3. Nguồn prompt template

| Cách lưu prompt | Ưu điểm | Nhược điểm |
|---|---|---|
| Lưu trong code | Đơn giản, dễ kiểm soát | Khó chỉnh khi chạy demo |
| Lưu trong database | Có thể quản lý phiên bản prompt | Phức tạp hơn |
| Lưu file config | Dễ chỉnh, tách khỏi code | Cần quản lý version |

Khuyến nghị MVP: lưu prompt trong code hoặc file config. Nếu làm nâng cao, dùng bảng `ai_prompt_templates`.

---

## 9. Context Builder

### 9.1. Mục tiêu

Context Builder lấy dữ liệu liên quan để đưa vào prompt. AI không nên tự suy đoán từ thông tin rỗng. Context càng rõ thì output càng dễ kiểm soát.

### 9.2. Nguồn context

| Nguồn | Dữ liệu |
|---|---|
| Order | Mã đơn, danh sách thuốc, số lượng, tổng tiền |
| Medicine | Tên thuốc, mã thuốc, danh mục, mô tả mẫu |
| Interaction Alert | Thuốc A/B, severity, description, recommendation |
| Consultation Note | Ghi chú hiện có của nhân viên |
| Customer | Thông tin khách hàng cơ bản nếu có và được phép |
| Report | Doanh thu, số đơn, tồn kho thấp, thuốc bán chạy |
| Neo4j Graph | Quan hệ thuốc, hoạt chất, tương tác, red flag mẫu |

### 9.3. Quy tắc context

| Quy tắc | Mô tả |
|---|---|
| Chỉ lấy dữ liệu cần thiết | Tránh đưa quá nhiều dữ liệu nhạy cảm vào AI |
| Không đưa secret | Không đưa API key/token/password vào prompt |
| Không đưa dữ liệu thật | Demo chỉ dùng dữ liệu mẫu |
| Gắn nhãn dữ liệu mẫu | Prompt cần nói rõ dữ liệu phục vụ đồ án |
| Giới hạn độ dài context | Tránh prompt quá dài hoặc khó kiểm soát |

---

## 10. Guardrail Engine

### 10.1. Mục tiêu

Guardrail Engine kiểm soát input và output của AI để đảm bảo AI không tạo nội dung vượt phạm vi an toàn.

Guardrail không làm hệ thống trở thành công cụ y tế thật. Guardrail chỉ là cơ chế kỹ thuật trong đồ án để giảm rủi ro AI sinh nội dung không phù hợp.

### 10.2. Guardrail input

Guardrail input kiểm tra yêu cầu của người dùng trước khi gọi AI.

| Kiểm tra | Mô tả | Hành động nếu vi phạm |
|---|---|---|
| Chẩn đoán bệnh | Input yêu cầu AI kết luận bệnh | Từ chối hoặc chuyển sang thông báo an toàn |
| Kê đơn thuốc | Input yêu cầu AI chọn thuốc điều trị | Từ chối |
| Liều dùng cụ thể | Input yêu cầu liều điều trị | Từ chối |
| Dữ liệu nhạy cảm | Input chứa dữ liệu cá nhân không cần thiết | Mask hoặc từ chối |
| Prompt injection | Input yêu cầu bỏ qua rule an toàn | Từ chối |
| Secret/API key | Input chứa token/key | Từ chối và không log chi tiết |

### 10.3. Guardrail output

Guardrail output kiểm tra nội dung AI trả về trước khi hiển thị hoặc lưu.

| Kiểm tra | Mô tả | Hành động nếu vi phạm |
|---|---|---|
| Có chẩn đoán | Output kết luận bệnh | Block output |
| Có kê đơn | Output chỉ định thuốc điều trị | Block output |
| Có liều cụ thể | Output đưa liều dùng/phác đồ | Block output |
| Khẳng định an toàn tuyệt đối | Output nói thuốc chắc chắn an toàn | Chặn hoặc thay bằng disclaimer |
| Thiếu disclaimer | Output không có disclaimer | Backend tự thêm disclaimer |
| Nội dung quá dài/khó hiểu | Output quá dài | Tóm tắt lại hoặc yêu cầu ngắn gọn hơn |

---

## 11. Guardrail Rules

| Rule | Nội dung | Mức độ |
|---|---|---|
| GR-01 | Không chẩn đoán bệnh | Mandatory |
| GR-02 | Không kê đơn thuốc | Mandatory |
| GR-03 | Không khẳng định thuốc chắc chắn an toàn | Mandatory |
| GR-04 | Không đưa liều dùng điều trị cụ thể | Mandatory |
| GR-05 | Luôn có disclaimer | Mandatory |
| GR-06 | Nếu có red flag, khuyến nghị hỏi chuyên gia y tế | Mandatory |
| GR-07 | Lưu AI log cho tác vụ quan trọng | Recommended/Mandatory nếu có AI thật |
| GR-08 | Không tự động lưu output AI | Mandatory |
| GR-09 | Không đưa dữ liệu nhạy cảm không cần thiết vào prompt | Mandatory |
| GR-10 | Chặn prompt injection yêu cầu bỏ qua quy tắc an toàn | Mandatory |

---

## 12. AI Provider Adapter

### 12.1. Mục tiêu

AI Provider Adapter giúp backend có thể gọi nhiều provider AI khác nhau thông qua cùng một interface. Nhờ vậy, hệ thống không phụ thuộc cứng vào một nhà cung cấp.

### 12.2. Provider đề xuất

| Provider | Vai trò | Ghi chú |
|---|---|---|
| MockAI | AI giả lập để demo ổn định | Nên có bắt buộc |
| Gemini | AI provider thật nếu có API key | Không commit key |
| OpenRouter | Gọi nhiều model qua một API | Không commit key |
| Ollama | Chạy local model | Có thể không cần internet |

### 12.3. Interface đề xuất

```text
AIProvider.generate(prompt, options) -> AIResponse
```

### 12.4. AIResponse đề xuất

```json
{
  "provider": "MockAI",
  "model": "mock-pharma-assist",
  "text": "Nội dung AI tham khảo...",
  "status": "SUCCESS",
  "tokenUsage": {
    "inputTokens": 0,
    "outputTokens": 0
  }
}
```

---

## 13. Provider Selector và fallback

### 13.1. Mục tiêu

Provider Selector chọn AI provider phù hợp dựa trên cấu hình hệ thống, tình trạng provider và môi trường demo.

### 13.2. Chiến lược fallback

```text
Try configured provider
    |
    v
If provider available -> use provider
    |
    v
If provider error/timeout/no API key -> use MockAI
```

### 13.3. Quy tắc chọn provider

| Điều kiện | Provider |
|---|---|
| Demo offline | MockAI hoặc Ollama |
| Có API key Gemini | Gemini |
| Muốn test nhiều model | OpenRouter |
| Provider lỗi | Fallback MockAI |
| Không có internet | MockAI |

---

## 14. MockAI

### 14.1. Mục tiêu

MockAI là AI giả lập dùng để demo ổn định. MockAI trả về nội dung cố định hoặc nội dung sinh theo template, không cần API key và không phụ thuộc internet.

### 14.2. Lý do cần MockAI

| Lý do | Mô tả |
|---|---|
| Demo ổn định | Không phụ thuộc mạng/API provider |
| Không tốn chi phí | Không cần gọi model thật |
| Dễ kiểm thử | Output dự đoán được |
| An toàn | Dễ kiểm soát nội dung |
| Phù hợp đồ án | Chức năng AI có thể mô phỏng nếu không đủ thời gian |

### 14.3. Output MockAI mẫu

```json
{
  "questions": [
    "Khách hàng có đang sử dụng thuốc nào khác không?",
    "Khách hàng có tiền sử dị ứng với thuốc nào không?",
    "Khách hàng có đang mang thai, cho con bú hoặc có bệnh nền cần lưu ý không?"
  ],
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

---

## 15. AI Cache

### 15.1. Mục tiêu

AI Cache có thể lưu tạm kết quả AI cho các request giống nhau để giảm số lần gọi provider. Trong MVP, AI Cache không bắt buộc.

### 15.2. Khi nên dùng cache

| Tình huống | Có nên cache? |
|---|---|
| MockAI demo | Không bắt buộc |
| AI business report lặp lại | Có thể |
| Explain cùng một interaction alert | Có thể |
| Consultation note theo ngữ cảnh riêng | Không nên cache lâu |

### 15.3. Lưu ý

- Không cache dữ liệu nhạy cảm.
- Cache nên có thời gian hết hạn.
- Nếu dùng dữ liệu khách hàng, cần cân nhắc bảo mật.

---

## 16. AI Audit Log

### 16.1. Mục tiêu

AI Audit Log lưu lịch sử các tác vụ AI quan trọng để phục vụ truy vết, kiểm thử và trình bày AI Governance trong đồ án.

### 16.2. Dữ liệu log đề xuất

| Field | Mô tả |
|---|---|
| id | Mã log |
| user_id | Người gọi AI |
| action_type | Loại tác vụ AI |
| provider | MockAI/Gemini/OpenRouter/Ollama |
| model | Tên model nếu có |
| prompt_template_id | Prompt template đã dùng nếu có |
| input_summary | Tóm tắt input, không lưu quá nhiều dữ liệu nhạy cảm |
| output_summary | Tóm tắt output |
| status | SUCCESS/FAILED/BLOCKED |
| guardrail_result | Kết quả guardrail |
| created_at | Thời điểm gọi AI |

### 16.3. Trạng thái log

| Status | Ý nghĩa |
|---|---|
| SUCCESS | AI trả kết quả và qua guardrail |
| FAILED | Provider lỗi hoặc hệ thống lỗi |
| BLOCKED | Guardrail chặn input/output |

### 16.4. Quyền xem log

| Actor | Quyền |
|---|---|
| Admin | Xem AI Audit Log |
| Staff | Không được xem log tổng hợp |
| Warehouse | Không được xem log AI |

---

## 17. Use case AI

| Use case | Mô tả | Actor | Ưu tiên |
|---|---|---|---|
| Generate follow-up questions | Tạo câu hỏi bổ sung cho phiên tư vấn | Staff | Medium |
| Explain interaction alert | Giải thích cảnh báo tương tác bằng ngôn ngữ dễ hiểu | Staff | Medium |
| Generate consultation note | Tạo ghi chú tư vấn tham khảo | Staff | Medium |
| Generate business report | Tóm tắt doanh thu/tồn kho | Admin | Low/Medium |
| Graph-RAG explanation | Dùng graph context để giải thích cảnh báo | Staff/Admin | Advanced |

---

## 18. Use case 01 - Generate follow-up questions

### 18.1. Mục tiêu

AI tạo danh sách câu hỏi bổ sung để nhân viên nhà thuốc tham khảo khi trao đổi với khách hàng.

### 18.2. Input

| Field | Mô tả |
|---|---|
| customer_context | Mô tả ngắn ngữ cảnh do nhân viên nhập |
| selected_medicine_ids | Danh sách thuốc đã chọn nếu có |
| interaction_alert_ids | Danh sách cảnh báo nếu có |

### 18.3. Output

```json
{
  "questions": [
    "Khách hàng có đang sử dụng thuốc nào khác không?",
    "Khách hàng có tiền sử dị ứng với thuốc nào không?"
  ],
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

### 18.4. Guardrail áp dụng

- Không hỏi theo hướng chẩn đoán bệnh.
- Không đưa kết luận y tế.
- Không đề xuất thuốc điều trị.

---

## 19. Use case 02 - Explain interaction alert

### 19.1. Mục tiêu

AI giải thích cảnh báo tương tác thuốc bằng ngôn ngữ dễ hiểu, dựa trên dữ liệu mẫu đã có trong hệ thống.

### 19.2. Input

| Field | Mô tả |
|---|---|
| interaction_alert_id | Mã cảnh báo tương tác |
| severity | Mức độ cảnh báo |
| description | Mô tả nguy cơ mẫu |
| recommendation | Khuyến nghị tham khảo |

### 19.3. Output

```json
{
  "explanation": "Cảnh báo này cho biết hai thuốc trong đơn có dữ liệu tương tác mẫu cần lưu ý. Nhân viên nên kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế nếu có rủi ro.",
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

### 19.4. Guardrail áp dụng

- Không khẳng định tương tác chắc chắn xảy ra.
- Không đưa chỉ định điều trị.
- Nếu severity HIGH, phải khuyến nghị hỏi chuyên gia y tế.

---

## 20. Use case 03 - Generate consultation note

### 20.1. Mục tiêu

AI tạo ghi chú tư vấn tham khảo ở trạng thái nháp. Nhân viên phải kiểm tra, chỉnh sửa và xác nhận trước khi lưu.

### 20.2. Input

| Field | Mô tả |
|---|---|
| order_id | Đơn hàng liên quan |
| interaction_alert_ids | Cảnh báo tương tác nếu có |
| staff_note | Ghi chú nhân viên nhập trước đó |

### 20.3. Output

```json
{
  "draftNote": "Đã ghi nhận cảnh báo tương tác thuốc theo dữ liệu mẫu. Nhân viên cần kiểm tra kỹ thông tin và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế nếu có rủi ro.",
  "requiresUserConfirmation": true,
  "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
}
```

### 20.4. Quy tắc lưu

- Output AI chỉ là bản nháp.
- Không tự động lưu vào consultation_notes.
- Chỉ lưu khi nhân viên bấm xác nhận.
- Cần lưu source = ai_confirmed nếu được xác nhận.

---

## 21. Use case 04 - Generate business report

### 21.1. Mục tiêu

AI hỗ trợ Admin tóm tắt số liệu doanh thu, tồn kho và thuốc bán chạy bằng ngôn ngữ dễ hiểu.

### 21.2. Input

| Field | Mô tả |
|---|---|
| revenue_summary | Tổng doanh thu |
| top_medicines | Danh sách thuốc bán chạy |
| low_stock_items | Danh sách thuốc sắp hết |
| near_expiry_items | Danh sách thuốc gần hết hạn |

### 21.3. Output

```json
{
  "summary": "Doanh thu trong kỳ tăng so với dữ liệu mẫu trước đó. Một số thuốc có tồn kho thấp cần được xem xét nhập thêm.",
  "recommendations": [
    "Kiểm tra danh sách thuốc sắp hết để lập kế hoạch nhập hàng.",
    "Theo dõi thuốc gần hết hạn để xử lý kịp thời."
  ]
}
```

### 21.4. Ghi chú

Use case này không liên quan tư vấn y tế trực tiếp, nhưng vẫn cần tránh đưa ra quyết định kinh doanh tuyệt đối nếu dữ liệu chỉ là demo.

---

## 22. Prompt template mẫu

## 22.1. Prompt tạo ghi chú tư vấn

```text
Bạn là AI hỗ trợ dược sĩ trong đồ án phần mềm.
Nhiệm vụ: tạo ghi chú tư vấn tham khảo dựa trên dữ liệu mẫu.

Ràng buộc:
- Không chẩn đoán bệnh.
- Không kê đơn thuốc.
- Không đưa liều dùng điều trị.
- Không thay thế chuyên gia y tế.
- Không khẳng định thuốc chắc chắn an toàn.
- Phải nhắc rằng thông tin chỉ mang tính tham khảo.

Dữ liệu:
{context}

Hãy tạo ghi chú ngắn gọn, dễ hiểu.
```

---

## 22.2. Prompt tạo câu hỏi bổ sung

```text
Bạn là AI hỗ trợ nhân viên nhà thuốc trong đồ án phần mềm PharmaAssist.
Nhiệm vụ: tạo danh sách câu hỏi bổ sung để nhân viên tham khảo khi trao đổi với khách hàng.

Ràng buộc:
- Không chẩn đoán bệnh.
- Không kê đơn thuốc.
- Không đề xuất liều dùng điều trị.
- Không thay thế chuyên gia y tế.
- Câu hỏi phải mang tính khai thác thông tin an toàn, không kết luận bệnh.

Dữ liệu ngữ cảnh:
{context}

Hãy tạo 3 đến 5 câu hỏi ngắn gọn, dễ hiểu.
Luôn kèm disclaimer: "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
```

---

## 22.3. Prompt giải thích cảnh báo tương tác

```text
Bạn là AI hỗ trợ giải thích cảnh báo tương tác thuốc trong đồ án phần mềm.
Dữ liệu dưới đây là dữ liệu mẫu, không phải dữ liệu y khoa thật.

Nhiệm vụ:
- Giải thích cảnh báo bằng ngôn ngữ dễ hiểu.
- Nêu mức độ cảnh báo theo dữ liệu mẫu.
- Nhắc người dùng kiểm tra kỹ và hỏi chuyên gia y tế khi có rủi ro.

Ràng buộc:
- Không chẩn đoán bệnh.
- Không kê đơn thuốc.
- Không đưa liều dùng điều trị.
- Không khẳng định thuốc chắc chắn an toàn hoặc chắc chắn nguy hiểm.

Dữ liệu cảnh báo:
{interaction_context}

Hãy trả lời ngắn gọn, rõ ràng, kèm disclaimer bắt buộc.
```

---

## 22.4. Prompt tóm tắt báo cáo kinh doanh

```text
Bạn là AI hỗ trợ tóm tắt báo cáo vận hành nhà thuốc trong đồ án phần mềm.
Nhiệm vụ: tóm tắt dữ liệu doanh thu, đơn hàng, tồn kho, thuốc bán chạy và thuốc gần hết hạn.

Ràng buộc:
- Không đưa kết luận kinh doanh tuyệt đối.
- Không suy đoán ngoài dữ liệu được cung cấp.
- Chỉ dựa trên dữ liệu mẫu trong hệ thống.

Dữ liệu báo cáo:
{report_context}

Hãy tạo bản tóm tắt ngắn gọn gồm:
1. Tổng quan.
2. Điểm cần chú ý.
3. Gợi ý hành động vận hành ở mức tham khảo.
```

---

## 23. API AI liên quan

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /ai/consultation/questions | Tạo câu hỏi bổ sung | Staff, Admin |
| POST | /ai/consultation/note | Tạo ghi chú tư vấn | Staff, Admin |
| POST | /ai/explain-alert | Giải thích cảnh báo tương tác | Staff, Admin |
| POST | /ai/business-report | Tóm tắt báo cáo kinh doanh | Admin |
| GET | /ai/logs | Xem AI Audit Log | Admin |
| GET | /ai/logs/{id} | Xem chi tiết AI Log | Admin |

---

## 24. Luồng AI Copilot tổng quát

```text
User request from Frontend
    |
    v
Backend checks authentication and role
    |
    v
AI Orchestrator receives request
    |
    v
Guardrail checks input
    |
    v
Context Builder collects data
    |
    v
Prompt Builder builds safe prompt
    |
    v
Provider Selector selects provider
    |
    v
AI Provider / MockAI generates output
    |
    v
Guardrail checks output
    |
    v
AI Audit Log saves event
    |
    v
Backend returns draft result with disclaimer
    |
    v
User reviews and confirms before saving
```

---

## 25. Luồng Guardrail chi tiết

```text
AI Request
    |
    v
Input Guardrail
    |
    +-- detect diagnosis request
    +-- detect prescription request
    +-- detect dosage/treatment request
    +-- detect prompt injection
    +-- detect sensitive data
    |
    v
If safe -> Build Prompt -> Call AI
If unsafe -> Block and return safe message
    |
    v
AI Output
    |
    v
Output Guardrail
    |
    +-- detect diagnosis claim
    +-- detect prescription content
    +-- detect dosage/treatment content
    +-- detect absolute safety claim
    +-- check disclaimer
    |
    v
If safe -> return output
If unsafe -> block output and log BLOCKED
```

---

## 26. Graph-RAG với AI

### 26.1. Mục tiêu

Graph-RAG là phần nâng cao, dùng Neo4j Knowledge Graph để lấy dữ liệu quan hệ làm context cho AI. Trong đồ án, Graph-RAG có thể được triển khai thật hoặc mô phỏng bằng dữ liệu graph mẫu.

### 26.2. Luồng Graph-RAG

```text
AI request with medicine ids
    |
    v
Graph-RAG Service queries Neo4j
    |
    v
Neo4j returns related nodes and relationships
    |
    v
Context Builder converts graph data to text context
    |
    v
Prompt Builder creates safe prompt
    |
    v
AI Provider generates explanation
    |
    v
Guardrail checks output
    |
    v
Return explanation with disclaimer
```

### 26.3. Context graph mẫu

```text
Theo dữ liệu graph mẫu, Thuốc mẫu A có quan hệ INTERACTS_WITH với Thuốc mẫu B ở mức HIGH.
Khuyến nghị mẫu: cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế.
```

---

## 27. Thiết kế bảng AI liên quan

## 27.1. Bảng ai_prompt_templates

| Field | Type | Mô tả |
|---|---|---|
| id | bigint | Mã prompt |
| code | varchar | Mã prompt template |
| name | varchar | Tên prompt |
| template_text | text | Nội dung prompt |
| version | varchar | Phiên bản prompt |
| is_active | boolean | Trạng thái sử dụng |
| created_at | timestamp | Ngày tạo |
| updated_at | timestamp | Ngày cập nhật |

## 27.2. Bảng ai_logs

| Field | Type | Mô tả |
|---|---|---|
| id | bigint | Mã log |
| user_id | bigint | Người gọi AI |
| action_type | varchar | Loại tác vụ AI |
| provider | varchar | Provider sử dụng |
| model | varchar | Model nếu có |
| input_summary | text | Tóm tắt input |
| output_summary | text | Tóm tắt output |
| status | varchar | SUCCESS/FAILED/BLOCKED |
| guardrail_result | text | Kết quả guardrail |
| created_at | timestamp | Thời điểm gọi AI |

---

## 28. Response chuẩn cho AI API

### 28.1. Response thành công

```json
{
  "success": true,
  "data": {
    "result": "Nội dung AI tham khảo",
    "requiresUserConfirmation": true,
    "provider": "MockAI",
    "auditLogId": 1,
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "AI response generated successfully"
}
```

### 28.2. Response bị Guardrail chặn

```json
{
  "success": false,
  "errorCode": "AI_GUARDRAIL_BLOCKED",
  "message": "Yêu cầu hoặc nội dung AI vượt phạm vi an toàn. Hệ thống không hỗ trợ chẩn đoán, kê đơn hoặc hướng dẫn điều trị cụ thể."
}
```

### 28.3. Response provider lỗi nhưng fallback MockAI

```json
{
  "success": true,
  "data": {
    "result": "Nội dung mô phỏng từ MockAI để phục vụ demo.",
    "provider": "MockAI",
    "fallbackUsed": true,
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "AI provider unavailable, MockAI fallback used"
}
```

---

## 29. Test case AI và Guardrail

| Test Case ID | Nội dung kiểm thử | Kết quả mong đợi |
|---|---|---|
| TC-AI-01 | Staff tạo câu hỏi bổ sung | Trả danh sách câu hỏi và disclaimer |
| TC-AI-02 | Staff tạo ghi chú tư vấn | Trả draftNote, requiresUserConfirmation = true |
| TC-AI-03 | Staff giải thích cảnh báo tương tác | Trả explanation có disclaimer |
| TC-AI-04 | Input yêu cầu chẩn đoán bệnh | Guardrail chặn |
| TC-AI-05 | Input yêu cầu kê đơn thuốc | Guardrail chặn |
| TC-AI-06 | Output AI thiếu disclaimer | Backend tự thêm disclaimer hoặc guardrail xử lý |
| TC-AI-07 | Provider thật lỗi | Fallback MockAI |
| TC-AI-08 | Admin xem AI Audit Log | Hiển thị log AI |
| TC-AI-09 | Staff xem AI Audit Log | Bị chặn 403 |
| TC-AI-10 | Output chứa liều dùng điều trị cụ thể | Guardrail chặn |

---

## 30. Rủi ro AI và biện pháp xử lý

| Rủi ro | Tác động | Biện pháp xử lý |
|---|---|---|
| AI chẩn đoán bệnh | Rủi ro an toàn, sai phạm phạm vi đồ án | Guardrail chặn, prompt cấm chẩn đoán |
| AI kê đơn thuốc | Rủi ro an toàn | Guardrail chặn, prompt cấm kê đơn |
| AI đưa liều dùng cụ thể | Có thể bị hiểu là hướng dẫn điều trị | Guardrail output chặn |
| AI output thiếu disclaimer | Người dùng hiểu nhầm | Backend tự thêm disclaimer |
| Provider lỗi khi demo | Demo thất bại | MockAI fallback |
| Lộ API key | Rủi ro bảo mật | Dùng env, không commit key |
| Log lưu dữ liệu nhạy cảm | Rủi ro riêng tư | Chỉ lưu input/output summary |
| Prompt injection | AI bỏ qua ràng buộc | Guardrail input và prompt an toàn |
| Graph context sai | AI giải thích sai | Ghi rõ dữ liệu graph là dữ liệu mẫu |

---

## 31. Checklist triển khai AI an toàn

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Có AI Orchestrator chưa? |  |
| Có MockAI fallback chưa? |  |
| Có Prompt Builder chưa? |  |
| Có Context Builder chưa? |  |
| Có Guardrail input chưa? |  |
| Có Guardrail output chưa? |  |
| Prompt có cấm chẩn đoán không? |  |
| Prompt có cấm kê đơn không? |  |
| Prompt có cấm liều dùng điều trị không? |  |
| Output AI có disclaimer không? |  |
| Nội dung AI có requiresUserConfirmation không? |  |
| Có AI Audit Log chưa? |  |
| Staff có bị chặn xem AI Audit Log không? |  |
| API key có để trong .env không? |  |
| .env có nằm trong .gitignore không? |  |
| Có test case guardrail chưa? |  |

---

## 32. Kết luận

Tài liệu **AI Architecture and Guardrail** đã mô tả kiến trúc AI của hệ thống **PharmaAssist AI Intelligence**, bao gồm AI Orchestrator, Prompt Builder, Context Builder, Guardrail Engine, Provider Adapter, MockAI, AI Cache và AI Audit Log. Kiến trúc này giúp hệ thống có thể tích hợp AI ở mức nâng cao nhưng vẫn giữ được kiểm soát an toàn và phù hợp phạm vi đồ án.

Trong MVP, nhóm có thể triển khai AI ở mức MockAI để đảm bảo demo ổn định. Nếu đủ thời gian, nhóm có thể tích hợp Gemini, OpenRouter hoặc Ollama thông qua Provider Adapter. Dù dùng provider thật hay MockAI, hệ thống vẫn phải tuân thủ các guardrail bắt buộc: không chẩn đoán bệnh, không kê đơn thuốc, không đưa liều dùng điều trị, không khẳng định thuốc chắc chắn an toàn và luôn có disclaimer.

AI trong PharmaAssist AI Intelligence chỉ hỗ trợ tham khảo, không thay thế chuyên gia y tế. Nội dung AI cần được người dùng kiểm tra và xác nhận trước khi lưu hoặc sử dụng trong hệ thống.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

