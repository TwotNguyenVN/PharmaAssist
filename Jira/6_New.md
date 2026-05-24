Có. Để phần nâng cao **dễ hiểu, dễ chia việc và dễ triển khai hơn**, tôi khuyên không gom quá nhiều thứ vào 3 Sprint nữa. Thay vào đó, nên tách phần nâng cao thành **5 Sprint nhỏ hơn**, mỗi Sprint tập trung một nhóm kỹ thuật rõ ràng.

Cách chia mới:

```text
Sprint 6 - AI Copilot Foundation
Sprint 7 - AI Guardrail & Audit Log
Sprint 8 - Supabase Storage, Realtime & Notification
Sprint 9 - Knowledge Graph & Graph-RAG
Sprint 10 - Forecast, Advanced Testing & Final Demo
```

Như vậy nhóm sẽ dễ làm hơn vì mỗi Sprint có mục tiêu riêng, không bị quá tải.

---

# 1. Tổng quan phần nâng cao sau khi mở rộng

## 1.1. Mục tiêu phần nâng cao

Phần nâng cao giúp PharmaAssist có thêm các điểm kỹ thuật nổi bật:

| Nhóm nâng cao     | Ý nghĩa                                        |
| ----------------- | ---------------------------------------------- |
| AI Copilot        | Hỗ trợ giải thích cảnh báo tương tác thuốc     |
| MockAI            | Demo ổn định khi Gemini lỗi                    |
| Gemini API        | Tích hợp AI thật nếu còn thời gian             |
| AI Guardrail      | Chặn chẩn đoán, kê đơn, liều dùng              |
| AI Audit Log      | Lưu nhật ký sử dụng AI                         |
| Supabase Storage  | Lưu ảnh thuốc                                  |
| Supabase Realtime | Cập nhật tồn kho realtime                      |
| Notification      | Thông báo tồn thấp, gần hết hạn                |
| Scheduled Job     | Quét thuốc gần hết hạn định kỳ                 |
| Knowledge Graph   | Mô phỏng quan hệ thuốc - hoạt chất - tương tác |
| Graph-RAG         | Dùng graph context để AI giải thích tốt hơn    |
| Forecast          | Dự báo nguy cơ hết hàng đơn giản               |
| Advanced Testing  | Test các chức năng nâng cao                    |
| Advanced Demo     | Slide, kịch bản demo, backup plan              |

---

# 2. Sprint nâng cao đề xuất

## 2.1. Bảng tổng quan Sprint 6 đến Sprint 10

| Sprint    | Tên Sprint                                | Mục tiêu chính                                                       | Epic liên quan   | Kết quả đầu ra                                           |
| --------- | ----------------------------------------- | -------------------------------------------------------------------- | ---------------- | -------------------------------------------------------- |
| Sprint 6  | AI Copilot Foundation                     | Xây nền tảng AI Copilot, MockAI, Gemini API, API giải thích cảnh báo | EPIC-13          | AI Copilot API, MockAI, Gemini service, AI Copilot Panel |
| Sprint 7  | AI Guardrail & Audit Log                  | Kiểm soát an toàn AI, lưu log, test AI safety                        | EPIC-14, EPIC-18 | Guardrail, AI Audit Log, test case AI safety             |
| Sprint 8  | Supabase Storage, Realtime & Notification | Upload ảnh thuốc, realtime tồn kho, notification, job quét hạn dùng  | EPIC-15, EPIC-18 | Ảnh thuốc, realtime POS, notification tồn kho/hạn dùng   |
| Sprint 9  | Knowledge Graph & Graph-RAG               | Mock Knowledge Graph, Graph Explorer, Graph-RAG context              | EPIC-16          | Graph data, Graph Explorer, Graph-RAG context builder    |
| Sprint 10 | Forecast, Advanced Testing & Final Demo   | Forecast tồn kho, test tổng hợp, tài liệu và demo nâng cao           | EPIC-17, EPIC-18 | Forecast, test report, slide, demo script nâng cao       |

---

# 3. Epic nâng cao nên bổ sung

## 3.1. Danh sách Epic

| Epic Key | Summary                                       | Component chính                                   | Priority     | Sprint      |
| -------- | --------------------------------------------- | ------------------------------------------------- | ------------ | ----------- |
| EPIC-13  | EPIC-13 - AI Copilot hỗ trợ cảnh báo thuốc    | AI Copilot                                        | High         | Sprint 6    |
| EPIC-14  | EPIC-14 - An toàn AI và nhật ký kiểm soát     | AI Guardrail, AI Audit Log                        | High         | Sprint 7    |
| EPIC-15  | EPIC-15 - Tính năng Supabase nâng cao         | Supabase Storage, Supabase Realtime, Notification | Medium       | Sprint 8    |
| EPIC-16  | EPIC-16 - Knowledge Graph và Graph-RAG        | Knowledge Graph, Graph Explorer, Graph-RAG        | Medium       | Sprint 9    |
| EPIC-17  | EPIC-17 - Dự báo tồn kho nâng cao             | Forecast, Reports & Dashboard                     | Low / Medium | Sprint 10   |
| EPIC-18  | EPIC-18 - Kiểm thử và demo chức năng nâng cao | Advanced Testing, Advanced Documentation          | High         | Sprint 7–10 |

---

## 3.2. EPIC-13 - AI Copilot hỗ trợ cảnh báo thuốc

| Field      | Giá trị                                    |
| ---------- | ------------------------------------------ |
| Work type  | Epic                                       |
| Status     | To Do                                      |
| Sprint     | Sprint 6                                   |
| Summary    | EPIC-13 - AI Copilot hỗ trợ cảnh báo thuốc |
| Components | AI Copilot, Gemini Integration, MockAI     |
| Priority   | High                                       |
| Labels     | ai, copilot, gemini, mockai, advanced      |

**Description:**

```text
Xây dựng chức năng AI Copilot hỗ trợ nhân viên nhà thuốc giải thích cảnh báo tương tác thuốc và tạo ghi chú tư vấn nháp. AI chỉ đóng vai trò tham khảo, không chẩn đoán, không kê đơn và không thay thế chuyên gia y tế. Hệ thống có MockAI để demo ổn định khi Gemini API lỗi hoặc không có mạng.
```

**Acceptance Criteria:**

```text
AC1. Có AI Copilot Module trong backend.
AC2. Có MockAI Service.
AC3. Có Gemini API Service nếu cấu hình AI_PROVIDER=gemini.
AC4. Có API giải thích cảnh báo tương tác thuốc.
AC5. Có API tạo ghi chú tư vấn nháp.
AC6. Có AI Copilot Panel trên POS.
AC7. Có disclaimer an toàn.
AC8. Gemini API key chỉ nằm ở backend, không lộ ra frontend.
```

---

## 3.3. EPIC-14 - An toàn AI và nhật ký kiểm soát

| Field      | Giá trị                                   |
| ---------- | ----------------------------------------- |
| Work type  | Epic                                      |
| Status     | To Do                                     |
| Sprint     | Sprint 7                                  |
| Summary    | EPIC-14 - An toàn AI và nhật ký kiểm soát |
| Components | AI Guardrail, AI Audit Log                |
| Priority   | High                                      |
| Labels     | ai-safety, guardrail, audit-log, advanced |

**Description:**

```text
Xây dựng cơ chế kiểm soát AI nhằm đảm bảo AI không đưa ra nội dung chẩn đoán bệnh, kê đơn thuốc, liều dùng cụ thể hoặc hướng dẫn điều trị thay chuyên gia y tế. Hệ thống lưu nhật ký sử dụng AI để phục vụ truy vết và minh bạch.
```

**Acceptance Criteria:**

```text
AC1. Có input guardrail kiểm tra yêu cầu người dùng.
AC2. Có output guardrail kiểm tra phản hồi AI.
AC3. Chặn các yêu cầu chẩn đoán, kê đơn, liều dùng cụ thể.
AC4. Có bảng ai_audit_logs.
AC5. Mỗi lần gọi AI được lưu log.
AC6. Admin có thể xem log cơ bản.
AC7. Có test case cho input hợp lệ và input bị chặn.
```

---

## 3.4. EPIC-15 - Tính năng Supabase nâng cao

| Field      | Giá trị                                                          |
| ---------- | ---------------------------------------------------------------- |
| Work type  | Epic                                                             |
| Status     | To Do                                                            |
| Sprint     | Sprint 8                                                         |
| Summary    | EPIC-15 - Tính năng Supabase nâng cao                            |
| Components | Supabase Storage, Supabase Realtime, Notification, Scheduled Job |
| Priority   | Medium                                                           |
| Labels     | supabase, storage, realtime, notification, scheduled-job         |

**Description:**

```text
Bổ sung các tính năng nâng cao của Supabase gồm Storage để lưu ảnh thuốc, Realtime để đồng bộ tồn kho trên POS, Notification để cảnh báo tồn kho thấp/gần hết hạn và Scheduled Job hoặc API thủ công để quét hạn dùng.
```

**Acceptance Criteria:**

```text
AC1. Admin có thể upload ảnh thuốc.
AC2. Ảnh thuốc hiển thị trong danh sách và chi tiết thuốc.
AC3. POS nhận cập nhật tồn kho realtime.
AC4. Có notification tồn kho thấp.
AC5. Có notification thuốc gần hết hạn.
AC6. Có API hoặc job quét thuốc gần hết hạn.
AC7. Realtime lỗi không làm hỏng luồng bán hàng chính.
```

---

## 3.5. EPIC-16 - Knowledge Graph và Graph-RAG

| Field      | Giá trị                                              |
| ---------- | ---------------------------------------------------- |
| Work type  | Epic                                                 |
| Status     | To Do                                                |
| Sprint     | Sprint 9                                             |
| Summary    | EPIC-16 - Knowledge Graph và Graph-RAG               |
| Components | Knowledge Graph, Graph Explorer, Graph-RAG           |
| Priority   | Medium                                               |
| Labels     | knowledge-graph, graph-rag, graph-explorer, advanced |

**Description:**

```text
Mô phỏng Knowledge Graph để biểu diễn quan hệ thuốc, hoạt chất, nhóm thuốc, tương tác và khuyến nghị. Xây dựng Graph Explorer để xem graph và Graph-RAG Context Builder để tạo context cho AI Copilot.
```

**Acceptance Criteria:**

```text
AC1. Có dữ liệu mock graph cho MED001 đến MED005.
AC2. Có node Medicine, ActiveIngredient, DrugGroup, Interaction, Recommendation.
AC3. Có edge HAS_INGREDIENT, BELONGS_TO_GROUP, INTERACTS_WITH, HAS_RECOMMENDATION.
AC4. Có API trả về nodes và edges.
AC5. Có màn hình Graph Explorer.
AC6. Có GraphContextBuilder tạo context dạng text.
AC7. AI Copilot có thể dùng graph context nếu có.
AC8. Dữ liệu graph được ghi rõ là dữ liệu mẫu cho đồ án.
```

---

## 3.6. EPIC-17 - Dự báo tồn kho nâng cao

| Field      | Giá trị                                  |
| ---------- | ---------------------------------------- |
| Work type  | Epic                                     |
| Status     | To Do                                    |
| Sprint     | Sprint 10                                |
| Summary    | EPIC-17 - Dự báo tồn kho nâng cao        |
| Components | Forecast, Reports & Dashboard            |
| Priority   | Low / Medium                             |
| Labels     | forecast, inventory, dashboard, advanced |

**Description:**

```text
Bổ sung chức năng dự báo nguy cơ hết hàng dựa trên lịch sử bán. Chức năng sử dụng công thức đơn giản, không dùng machine learning, nhằm hỗ trợ Admin nhận biết thuốc có nguy cơ hết hàng trong thời gian tới.
```

**Acceptance Criteria:**

```text
AC1. Backend tính số lượng bán trung bình trong N ngày gần nhất.
AC2. Backend ước tính số ngày còn lại trước khi hết hàng.
AC3. Dashboard hiển thị danh sách thuốc có nguy cơ hết hàng.
AC4. Nếu không đủ dữ liệu, hiển thị "Không đủ dữ liệu".
AC5. Có ghi chú đây là dự báo tham khảo.
```

---

## 3.7. EPIC-18 - Kiểm thử và demo chức năng nâng cao

| Field      | Giá trị                                              |
| ---------- | ---------------------------------------------------- |
| Work type  | Epic                                                 |
| Status     | To Do                                                |
| Sprint     | Sprint 7, Sprint 8, Sprint 9, Sprint 10              |
| Summary    | EPIC-18 - Kiểm thử và demo chức năng nâng cao        |
| Components | Advanced Testing, Advanced Documentation, Deployment |
| Priority   | High                                                 |
| Labels     | testing, documentation, demo, advanced               |

**Description:**

```text
Bổ sung test case, tài liệu, README, slide và demo script cho các chức năng nâng cao như AI Copilot, Guardrail, Audit Log, Supabase Advanced, Knowledge Graph, Graph-RAG và Forecast.
```

**Acceptance Criteria:**

```text
AC1. Có test case cho AI Copilot.
AC2. Có test case cho Guardrail.
AC3. Có test case cho Storage và Realtime.
AC4. Có test case cho Graph Explorer và Graph-RAG.
AC5. Có test case cho Forecast.
AC6. README có phần hướng dẫn chức năng nâng cao.
AC7. Slide có phần advanced features.
AC8. Demo script có backup plan khi AI/Gemini/Reatime/Graph lỗi.
```

---

# 4. User Story nâng cao nên bổ sung

## 4.1. Tổng quan User Story theo Sprint

| Story Key | Summary                                           | Parent Epic | Component              | Priority     | Sprint    | SP |
| --------- | ------------------------------------------------- | ----------- | ---------------------- | ------------ | --------- | -: |
| US-31     | US-31 - Khởi tạo AI Copilot Module                | EPIC-13     | AI Copilot             | High         | Sprint 6  |  3 |
| US-32     | US-32 - AI giải thích cảnh báo tương tác thuốc    | EPIC-13     | AI Copilot             | High         | Sprint 6  |  5 |
| US-33     | US-33 - AI tạo ghi chú tư vấn nháp                | EPIC-13     | AI Copilot             | Medium       | Sprint 6  |  3 |
| US-34     | US-34 - MockAI dự phòng khi Gemini API lỗi        | EPIC-13     | MockAI                 | High         | Sprint 6  |  3 |
| US-35     | US-35 - Hiển thị AI Copilot Panel trên POS        | EPIC-13     | AI Copilot             | Medium       | Sprint 6  |  3 |
| US-36     | US-36 - Chặn yêu cầu chẩn đoán và kê đơn          | EPIC-14     | AI Guardrail           | High         | Sprint 7  |  5 |
| US-37     | US-37 - Kiểm tra phản hồi AI trước khi hiển thị   | EPIC-14     | AI Guardrail           | High         | Sprint 7  |  3 |
| US-38     | US-38 - Lưu nhật ký sử dụng AI                    | EPIC-14     | AI Audit Log           | Medium       | Sprint 7  |  3 |
| US-39     | US-39 - Admin xem nhật ký AI cơ bản               | EPIC-14     | AI Audit Log           | Low / Medium | Sprint 7  |  2 |
| US-40     | US-40 - Kiểm thử AI Copilot và Guardrail          | EPIC-18     | Advanced Testing       | High         | Sprint 7  |  3 |
| US-41     | US-41 - Upload ảnh thuốc bằng Supabase Storage    | EPIC-15     | Supabase Storage       | Medium       | Sprint 8  |  3 |
| US-42     | US-42 - Hiển thị ảnh thuốc trong danh sách thuốc  | EPIC-15     | Supabase Storage       | Medium       | Sprint 8  |  2 |
| US-43     | US-43 - Cập nhật tồn kho realtime trên POS        | EPIC-15     | Supabase Realtime      | Medium       | Sprint 8  |  5 |
| US-44     | US-44 - Tạo thông báo tồn kho thấp                | EPIC-15     | Notification           | Medium       | Sprint 8  |  3 |
| US-45     | US-45 - Tạo thông báo thuốc gần hết hạn           | EPIC-15     | Notification           | Medium       | Sprint 8  |  3 |
| US-46     | US-46 - Quét thuốc gần hết hạn định kỳ            | EPIC-15     | Scheduled Job          | Medium       | Sprint 8  |  5 |
| US-47     | US-47 - Thiết kế Mock Knowledge Graph             | EPIC-16     | Knowledge Graph        | Medium       | Sprint 9  |  3 |
| US-48     | US-48 - Xem Knowledge Graph của thuốc             | EPIC-16     | Graph Explorer         | Medium       | Sprint 9  |  5 |
| US-49     | US-49 - Tạo context Graph-RAG cho AI Copilot      | EPIC-16     | Graph-RAG              | Medium       | Sprint 9  |  5 |
| US-50     | US-50 - AI giải thích cảnh báo bằng graph context | EPIC-16     | Graph-RAG              | Medium       | Sprint 9  |  3 |
| US-51     | US-51 - Dự báo nguy cơ hết hàng                   | EPIC-17     | Forecast               | Low / Medium | Sprint 10 |  5 |
| US-52     | US-52 - Hiển thị dự báo tồn kho trên Dashboard    | EPIC-17     | Reports & Dashboard    | Low / Medium | Sprint 10 |  3 |
| US-53     | US-53 - Kiểm thử chức năng nâng cao               | EPIC-18     | Advanced Testing       | High         | Sprint 10 |  5 |
| US-54     | US-54 - Hoàn thiện tài liệu chức năng nâng cao    | EPIC-18     | Advanced Documentation | High         | Sprint 10 |  3 |
| US-55     | US-55 - Chuẩn bị demo chức năng nâng cao          | EPIC-18     | Advanced Documentation | High         | Sprint 10 |  3 |

---

# 5. Chi tiết Sprint 6 - AI Copilot Foundation

## 5.1. Mục tiêu Sprint 6

```text
Xây nền tảng AI Copilot để hỗ trợ giải thích cảnh báo tương tác thuốc và tạo ghi chú tư vấn nháp. Ưu tiên MockAI trước để demo ổn định, sau đó mới tích hợp Gemini API.
```

## 5.2. Story Sprint 6

### US-31 - Khởi tạo AI Copilot Module

| Field       | Nội dung                                   |
| ----------- | ------------------------------------------ |
| Summary     | US-31 - Khởi tạo AI Copilot Module         |
| Parent Epic | EPIC-13 - AI Copilot hỗ trợ cảnh báo thuốc |
| Component   | AI Copilot                                 |
| Priority    | High                                       |
| Sprint      | Sprint 6                                   |
| Story Point | 3                                          |

**User story:**

```text
Là nhóm phát triển, tôi muốn có module AI Copilot trong backend, để quản lý tập trung các chức năng AI của hệ thống.
```

**Acceptance Criteria:**

```text
AC1. Có AI Copilot Module trong NestJS.
AC2. Có AI Provider Interface.
AC3. Có AI Orchestrator Service.
AC4. Có cấu hình AI_PROVIDER=mock/gemini.
AC5. Module AI không làm ảnh hưởng luồng bán hàng chính.
```

**Task:**

| Task Key | Summary                                     | Component  | Assignee     |
| -------- | ------------------------------------------- | ---------- | ------------ |
| T-79     | T-79 - Tạo module AI Copilot trong NestJS   | Backend    | Thành viên 4 |
| T-80     | T-80 - Tạo AI Provider Interface            | AI Copilot | Thành viên 4 |
| T-81     | T-81 - Tạo AI Orchestrator Service          | AI Copilot | Thành viên 4 |
| T-82     | T-82 - Cấu hình biến môi trường AI_PROVIDER | AI Copilot | Thành viên 4 |

---

### US-32 - AI giải thích cảnh báo tương tác thuốc

| Field       | Nội dung                                       |
| ----------- | ---------------------------------------------- |
| Summary     | US-32 - AI giải thích cảnh báo tương tác thuốc |
| Parent Epic | EPIC-13                                        |
| Component   | AI Copilot                                     |
| Priority    | High                                           |
| Sprint      | Sprint 6                                       |
| Story Point | 5                                              |

**User story:**

```text
Là nhân viên nhà thuốc, tôi muốn AI giải thích cảnh báo tương tác thuốc bằng ngôn ngữ dễ hiểu, để có thêm thông tin tham khảo khi tư vấn khách hàng.
```

**Acceptance Criteria:**

```text
AC1. Nhân viên có thể bấm "Giải thích bằng AI" khi đơn có cảnh báo tương tác.
AC2. Backend lấy được thông tin cảnh báo gồm tên hai thuốc, mức độ, mô tả, khuyến nghị.
AC3. Backend build prompt từ dữ liệu cảnh báo.
AC4. Backend gọi AI provider qua AI Orchestrator.
AC5. Frontend hiển thị kết quả giải thích.
AC6. Có disclaimer an toàn.
```

**Task:**

| Task Key | Summary                                                 | Component  | Assignee     |
| -------- | ------------------------------------------------------- | ---------- | ------------ |
| T-83     | T-83 - Tạo prompt template giải thích cảnh báo          | AI Copilot | Thành viên 4 |
| T-84     | T-84 - Tạo API AI giải thích cảnh báo tương tác thuốc   | Backend    | Thành viên 1 |
| T-85     | T-85 - Lấy dữ liệu cảnh báo tương tác thuốc từ order    | Backend    | Thành viên 1 |
| T-86     | T-86 - Hiển thị kết quả AI giải thích cảnh báo trên POS | Frontend   | Thành viên 2 |

---

### US-33 - AI tạo ghi chú tư vấn nháp

| Field       | Nội dung                           |
| ----------- | ---------------------------------- |
| Summary     | US-33 - AI tạo ghi chú tư vấn nháp |
| Parent Epic | EPIC-13                            |
| Component   | AI Copilot                         |
| Priority    | Medium                             |
| Sprint      | Sprint 6                           |
| Story Point | 3                                  |

**User story:**

```text
Là nhân viên nhà thuốc, tôi muốn AI tạo ghi chú tư vấn nháp từ cảnh báo tương tác thuốc, để tôi có thể chỉnh sửa và lưu vào đơn hàng.
```

**Acceptance Criteria:**

```text
AC1. Có nút "Tạo ghi chú nháp bằng AI".
AC2. AI tạo ghi chú dựa trên cảnh báo tương tác.
AC3. Ghi chú AI không tự động lưu.
AC4. Nhân viên có thể chỉnh sửa trước khi lưu.
AC5. Ghi chú sau khi lưu được lưu vào consultation_notes.
```

**Task:**

| Task Key | Summary                                                | Component  | Assignee     |
| -------- | ------------------------------------------------------ | ---------- | ------------ |
| T-87     | T-87 - Tạo prompt template ghi chú tư vấn nháp         | AI Copilot | Thành viên 4 |
| T-88     | T-88 - Tạo API AI sinh ghi chú tư vấn nháp             | Backend    | Thành viên 1 |
| T-89     | T-89 - Hiển thị ghi chú nháp trong form ghi chú tư vấn | Frontend   | Thành viên 2 |
| T-90     | T-90 - Lưu ghi chú tư vấn sau khi nhân viên xác nhận   | Backend    | Thành viên 1 |

---

### US-34 - MockAI dự phòng khi Gemini API lỗi

| Field       | Nội dung                                   |
| ----------- | ------------------------------------------ |
| Summary     | US-34 - MockAI dự phòng khi Gemini API lỗi |
| Parent Epic | EPIC-13                                    |
| Component   | MockAI                                     |
| Priority    | High                                       |
| Sprint      | Sprint 6                                   |
| Story Point | 3                                          |

**User story:**

```text
Là nhóm phát triển, tôi muốn có MockAI dự phòng, để demo AI Copilot vẫn ổn định khi Gemini API lỗi, hết quota hoặc không có mạng.
```

**Acceptance Criteria:**

```text
AC1. Có MockAI Service.
AC2. MockAI trả kết quả theo template cố định.
AC3. Khi AI_PROVIDER=mock, hệ thống không gọi Gemini API.
AC4. Khi Gemini lỗi, có thể fallback sang MockAI.
AC5. Demo vẫn chạy được khi không có GEMINI_API_KEY.
```

**Task:**

| Task Key | Summary                                          | Component | Assignee     |
| -------- | ------------------------------------------------ | --------- | ------------ |
| T-91     | T-91 - Tạo service MockAI để demo ổn định        | MockAI    | Thành viên 4 |
| T-92     | T-92 - Tạo response mẫu cho giải thích cảnh báo  | MockAI    | Thành viên 4 |
| T-93     | T-93 - Tạo response mẫu cho ghi chú tư vấn nháp  | MockAI    | Thành viên 4 |
| T-94     | T-94 - Tạo cơ chế fallback từ Gemini sang MockAI | MockAI    | Thành viên 4 |

---

### US-35 - Hiển thị AI Copilot Panel trên POS

| Field       | Nội dung                                   |
| ----------- | ------------------------------------------ |
| Summary     | US-35 - Hiển thị AI Copilot Panel trên POS |
| Parent Epic | EPIC-13                                    |
| Component   | AI Copilot                                 |
| Priority    | Medium                                     |
| Sprint      | Sprint 6                                   |
| Story Point | 3                                          |

**User story:**

```text
Là nhân viên nhà thuốc, tôi muốn có khu vực AI Copilot trên màn hình POS, để sử dụng AI khi có cảnh báo tương tác thuốc.
```

**Acceptance Criteria:**

```text
AC1. POS có AI Copilot Panel hoặc Drawer.
AC2. Panel có nút "Giải thích cảnh báo".
AC3. Panel có nút "Tạo ghi chú nháp".
AC4. Panel có loading state.
AC5. Panel có error state.
AC6. Panel có disclaimer an toàn.
```

**Task:**

| Task Key | Summary                                               | Component | Assignee     |
| -------- | ----------------------------------------------------- | --------- | ------------ |
| T-95     | T-95 - Thiết kế AI Copilot Panel trên màn hình POS    | Frontend  | Thành viên 2 |
| T-96     | T-96 - Tạo nút giải thích cảnh báo bằng AI            | Frontend  | Thành viên 2 |
| T-97     | T-97 - Tạo nút sinh ghi chú tư vấn nháp bằng AI       | Frontend  | Thành viên 2 |
| T-98     | T-98 - Hiển thị loading và error state cho AI Copilot | Frontend  | Thành viên 2 |
| T-99     | T-99 - Hiển thị disclaimer trong AI Copilot Panel     | Frontend  | Thành viên 2 |

---

### US-36 - Tích hợp Gemini API cho AI Copilot

| Field       | Nội dung                                   |
| ----------- | ------------------------------------------ |
| Summary     | US-36 - Tích hợp Gemini API cho AI Copilot |
| Parent Epic | EPIC-13                                    |
| Component   | Gemini Integration                         |
| Priority    | Medium                                     |
| Sprint      | Sprint 6                                   |
| Story Point | 3                                          |

**User story:**

```text
Là nhóm phát triển, tôi muốn tích hợp Gemini API ở backend, để AI Copilot có thể tạo phản hồi thật khi môi trường demo cho phép.
```

**Acceptance Criteria:**

```text
AC1. Gemini API key chỉ được lưu ở backend.
AC2. Backend gọi Gemini API thông qua Gemini Service.
AC3. Nếu thiếu GEMINI_API_KEY, hệ thống tự dùng MockAI.
AC4. Nếu Gemini trả lỗi, hệ thống fallback sang MockAI.
AC5. Không gọi Gemini API trực tiếp từ frontend.
```

**Task:**

| Task Key | Summary                                         | Component          | Assignee     |
| -------- | ----------------------------------------------- | ------------------ | ------------ |
| T-100    | T-100 - Tích hợp Gemini API cho AI Copilot      | Gemini Integration | Thành viên 4 |
| T-101    | T-101 - Cấu hình GEMINI_API_KEY trong backend   | Gemini Integration | Thành viên 4 |
| T-102    | T-102 - Xử lý lỗi khi Gemini API không phản hồi | Gemini Integration | Thành viên 4 |

---

# 6. Chi tiết Sprint 7 - AI Guardrail & Audit Log

## 6.1. Story Sprint 7

| Story Key | Summary                                         | Epic    | Priority | SP |
| --------- | ----------------------------------------------- | ------- | -------- | -: |
| US-37     | US-37 - Chặn yêu cầu chẩn đoán và kê đơn        | EPIC-14 | High     |  5 |
| US-38     | US-38 - Kiểm tra phản hồi AI trước khi hiển thị | EPIC-14 | High     |  3 |
| US-39     | US-39 - Lưu nhật ký sử dụng AI                  | EPIC-14 | Medium   |  3 |
| US-40     | US-40 - Admin xem nhật ký AI cơ bản             | EPIC-14 | Medium   |  2 |
| US-41     | US-41 - Kiểm thử AI Copilot và Guardrail        | EPIC-18 | High     |  3 |

---

### US-37 - Chặn yêu cầu chẩn đoán và kê đơn

| Field       | Nội dung     |
| ----------- | ------------ |
| Component   | AI Guardrail |
| Priority    | High         |
| Sprint      | Sprint 7     |
| Story Point | 5            |

**Acceptance Criteria:**

```text
AC1. Backend kiểm tra input trước khi gửi sang AI.
AC2. Chặn nội dung yêu cầu chẩn đoán bệnh.
AC3. Chặn nội dung yêu cầu kê đơn thuốc.
AC4. Chặn nội dung yêu cầu liều dùng cụ thể.
AC5. Trả response từ chối an toàn.
AC6. Có disclaimer y tế.
```

**Task:**

| Task Key | Summary                                                 | Component    | Assignee     |
| -------- | ------------------------------------------------------- | ------------ | ------------ |
| T-103    | T-103 - Tạo Guardrail Module trong NestJS               | AI Guardrail | Thành viên 4 |
| T-104    | T-104 - Tạo input guardrail kiểm tra yêu cầu người dùng | AI Guardrail | Thành viên 4 |
| T-105    | T-105 - Tạo danh sách intent không được phép            | AI Guardrail | Thành viên 4 |
| T-106    | T-106 - Tạo response từ chối an toàn cho AI             | AI Guardrail | Thành viên 4 |

---

### US-38 - Kiểm tra phản hồi AI trước khi hiển thị

| Field       | Nội dung     |
| ----------- | ------------ |
| Component   | AI Guardrail |
| Priority    | High         |
| Sprint      | Sprint 7     |
| Story Point | 3            |

**Acceptance Criteria:**

```text
AC1. Backend kiểm tra output AI trước khi trả về frontend.
AC2. Nếu output chứa nội dung không an toàn, hệ thống thay bằng phản hồi an toàn.
AC3. Output hợp lệ được trả về bình thường.
AC4. Có log trạng thái sanitized nếu output bị chỉnh.
```

**Task:**

| Task Key | Summary                                               | Component    | Assignee     |
| -------- | ----------------------------------------------------- | ------------ | ------------ |
| T-107    | T-107 - Tạo output guardrail kiểm tra phản hồi AI     | AI Guardrail | Thành viên 4 |
| T-108    | T-108 - Tạo cơ chế thay thế phản hồi AI không an toàn | AI Guardrail | Thành viên 4 |
| T-109    | T-109 - Gắn output guardrail vào AI Orchestrator      | AI Guardrail | Thành viên 4 |

---

### US-39 - Lưu nhật ký sử dụng AI

| Field       | Nội dung     |
| ----------- | ------------ |
| Component   | AI Audit Log |
| Priority    | Medium       |
| Sprint      | Sprint 7     |
| Story Point | 3            |

**Acceptance Criteria:**

```text
AC1. Có bảng ai_audit_logs.
AC2. Mỗi lần gọi AI tạo một log.
AC3. Log lưu user_id, order_id, alert_id nếu có.
AC4. Log lưu provider là mock hoặc gemini.
AC5. Log lưu prompt_type.
AC6. Log lưu guardrail_status.
```

**Task:**

| Task Key | Summary                                                  | Component    | Assignee     |
| -------- | -------------------------------------------------------- | ------------ | ------------ |
| T-110    | T-110 - Thiết kế bảng ai_audit_logs                      | Database     | Thành viên 3 |
| T-111    | T-111 - Tạo AI Audit Log Service                         | AI Audit Log | Thành viên 1 |
| T-112    | T-112 - Lưu request và response AI vào nhật ký kiểm soát | AI Audit Log | Thành viên 1 |
| T-113    | T-113 - Gắn AI Audit Log vào AI Orchestrator             | AI Audit Log | Thành viên 1 |

---

### US-40 - Admin xem nhật ký AI cơ bản

| Field       | Nội dung     |
| ----------- | ------------ |
| Component   | AI Audit Log |
| Priority    | Medium       |
| Sprint      | Sprint 7     |
| Story Point | 2            |

**Acceptance Criteria:**

```text
AC1. Admin có thể xem danh sách AI Audit Log.
AC2. Danh sách hiển thị thời gian, người dùng, provider, prompt_type, guardrail_status.
AC3. Staff không được xem AI Audit Log.
AC4. Có phân trang cơ bản.
```

**Task:**

| Task Key | Summary                                          | Component | Assignee     |
| -------- | ------------------------------------------------ | --------- | ------------ |
| T-114    | T-114 - Tạo API danh sách AI Audit Log cho Admin | Backend   | Thành viên 1 |
| T-115    | T-115 - Thiết kế màn hình AI Audit Log           | Frontend  | Thành viên 2 |
| T-116    | T-116 - Kiểm tra phân quyền xem AI Audit Log     | Backend   | Thành viên 1 |

---

### US-41 - Kiểm thử AI Copilot và Guardrail

| Field       | Nội dung         |
| ----------- | ---------------- |
| Component   | Advanced Testing |
| Priority    | High             |
| Sprint      | Sprint 7         |
| Story Point | 3                |

**Task:**

| Task Key | Summary                                             | Component              | Assignee     |
| -------- | --------------------------------------------------- | ---------------------- | ------------ |
| T-117    | T-117 - Viết test case cho AI giải thích cảnh báo   | Advanced Testing       | Thành viên 4 |
| T-118    | T-118 - Viết test case cho MockAI fallback          | Advanced Testing       | Thành viên 4 |
| T-119    | T-119 - Viết test case cho Guardrail chặn chẩn đoán | Advanced Testing       | Thành viên 4 |
| T-120    | T-120 - Viết test case cho Guardrail chặn kê đơn    | Advanced Testing       | Thành viên 4 |
| T-121    | T-121 - Cập nhật test report phần AI nâng cao       | Advanced Documentation | Thành viên 4 |

---

# 7. Sprint 8 - Supabase Storage, Realtime & Notification

## 7.1. Story Sprint 8

| Story Key | Summary                                          | Epic    | Priority | SP |
| --------- | ------------------------------------------------ | ------- | -------- | -: |
| US-42     | US-42 - Upload ảnh thuốc bằng Supabase Storage   | EPIC-15 | Medium   |  3 |
| US-43     | US-43 - Hiển thị ảnh thuốc trong danh sách thuốc | EPIC-15 | Medium   |  2 |
| US-44     | US-44 - Cập nhật tồn kho realtime trên POS       | EPIC-15 | Medium   |  5 |
| US-45     | US-45 - Tạo thông báo tồn kho thấp               | EPIC-15 | Medium   |  3 |
| US-46     | US-46 - Tạo thông báo thuốc gần hết hạn          | EPIC-15 | Medium   |  3 |
| US-47     | US-47 - Quét thuốc gần hết hạn định kỳ           | EPIC-15 | Medium   |  5 |
| US-48     | US-48 - Kiểm thử Supabase Advanced Features      | EPIC-18 | High     |  3 |

## 7.2. Task Sprint 8

| Task Key | Summary                                                       | Linked Story | Component         | Assignee     |
| -------- | ------------------------------------------------------------- | ------------ | ----------------- | ------------ |
| T-122    | T-122 - Tạo bucket medicine-images trên Supabase Storage      | US-42        | Supabase Storage  | Thành viên 3 |
| T-123    | T-123 - Thêm trường image_url vào bảng medicines              | US-42        | Database          | Thành viên 3 |
| T-124    | T-124 - Tạo API upload ảnh thuốc                              | US-42        | Backend           | Thành viên 1 |
| T-125    | T-125 - Kiểm tra định dạng và dung lượng file ảnh             | US-42        | Backend           | Thành viên 1 |
| T-126    | T-126 - Thêm input upload ảnh trong form thuốc                | US-42        | Frontend          | Thành viên 2 |
| T-127    | T-127 - Hiển thị ảnh thuốc trong danh sách thuốc              | US-43        | Frontend          | Thành viên 2 |
| T-128    | T-128 - Hiển thị ảnh thuốc trong màn hình chi tiết thuốc      | US-43        | Frontend          | Thành viên 2 |
| T-129    | T-129 - Hiển thị ảnh placeholder khi thuốc chưa có ảnh        | US-43        | Frontend          | Thành viên 2 |
| T-130    | T-130 - Cấu hình Realtime cho bảng inventories                | US-44        | Supabase Realtime | Thành viên 3 |
| T-131    | T-131 - Subscribe thay đổi tồn kho trên màn hình POS          | US-44        | Supabase Realtime | Thành viên 2 |
| T-132    | T-132 - Cập nhật số lượng tồn kho realtime trong POS          | US-44        | Frontend          | Thành viên 2 |
| T-133    | T-133 - Hiển thị cảnh báo khi tồn kho thay đổi trong lúc bán  | US-44        | Frontend          | Thành viên 2 |
| T-134    | T-134 - Đảm bảo backend vẫn chặn bán vượt tồn kho             | US-44        | Backend           | Thành viên 1 |
| T-135    | T-135 - Thiết kế bảng notifications                           | US-45        | Database          | Thành viên 3 |
| T-136    | T-136 - Tạo service sinh thông báo tồn kho thấp               | US-45        | Backend           | Thành viên 1 |
| T-137    | T-137 - Tạo service sinh thông báo thuốc gần hết hạn          | US-46        | Backend           | Thành viên 1 |
| T-138    | T-138 - Thiết kế Notification Bell trên Header                | US-45        | Frontend          | Thành viên 2 |
| T-139    | T-139 - Tạo danh sách thông báo tồn kho và hạn dùng           | US-45        | Frontend          | Thành viên 2 |
| T-140    | T-140 - Tạo SQL function quét thuốc gần hết hạn               | US-47        | Scheduled Job     | Thành viên 3 |
| T-141    | T-141 - Tạo API chạy quét thuốc gần hết hạn thủ công khi demo | US-47        | Backend           | Thành viên 1 |
| T-142    | T-142 - Viết test case upload ảnh thuốc                       | US-48        | Advanced Testing  | Thành viên 4 |
| T-143    | T-143 - Viết test case realtime tồn kho bằng hai tab          | US-48        | Advanced Testing  | Thành viên 4 |
| T-144    | T-144 - Viết test case notification tồn kho và hạn dùng       | US-48        | Advanced Testing  | Thành viên 4 |

---

# 8. Sprint 9 - Knowledge Graph & Graph-RAG

## 8.1. Story Sprint 9

| Story Key | Summary                                           | Epic    | Priority | SP |
| --------- | ------------------------------------------------- | ------- | -------- | -: |
| US-49     | US-49 - Thiết kế Mock Knowledge Graph             | EPIC-16 | Medium   |  3 |
| US-50     | US-50 - Xem Knowledge Graph của thuốc             | EPIC-16 | Medium   |  5 |
| US-51     | US-51 - Tạo context Graph-RAG cho AI Copilot      | EPIC-16 | Medium   |  5 |
| US-52     | US-52 - AI giải thích cảnh báo bằng graph context | EPIC-16 | Medium   |  3 |
| US-53     | US-53 - Kiểm thử Knowledge Graph và Graph-RAG     | EPIC-18 | Medium   |  3 |

## 8.2. Task Sprint 9

| Task Key | Summary                                                         | Linked Story | Component        | Assignee     |
| -------- | --------------------------------------------------------------- | ------------ | ---------------- | ------------ |
| T-145    | T-145 - Thiết kế cấu trúc dữ liệu Mock Knowledge Graph          | US-49        | Knowledge Graph  | Thành viên 4 |
| T-146    | T-146 - Seed dữ liệu Mock Knowledge Graph cho MED001 đến MED005 | US-49        | Knowledge Graph  | Thành viên 3 |
| T-147    | T-147 - Tạo module Graph trong NestJS                           | US-50        | Backend          | Thành viên 1 |
| T-148    | T-148 - Tạo API lấy graph theo mã thuốc                         | US-50        | Backend          | Thành viên 1 |
| T-149    | T-149 - Chuẩn hóa response nodes và edges                       | US-50        | Knowledge Graph  | Thành viên 4 |
| T-150    | T-150 - Thiết kế màn hình Graph Explorer                        | US-50        | Frontend         | Thành viên 2 |
| T-151    | T-151 - Hiển thị nodes và edges trên Graph Explorer             | US-50        | Frontend         | Thành viên 2 |
| T-152    | T-152 - Tạo dropdown chọn thuốc để xem graph                    | US-50        | Frontend         | Thành viên 2 |
| T-153    | T-153 - Tạo empty state khi graph không có dữ liệu              | US-50        | Frontend         | Thành viên 2 |
| T-154    | T-154 - Tạo GraphContextBuilder Service                         | US-51        | Graph-RAG        | Thành viên 4 |
| T-155    | T-155 - Tạo context dạng text từ nodes và edges                 | US-51        | Graph-RAG        | Thành viên 4 |
| T-156    | T-156 - Giới hạn độ dài graph context trước khi gửi AI          | US-51        | Graph-RAG        | Thành viên 4 |
| T-157    | T-157 - Tích hợp graph context vào AI prompt                    | US-52        | Graph-RAG        | Thành viên 4 |
| T-158    | T-158 - Hiển thị nhãn có sử dụng graph context mẫu              | US-52        | Frontend         | Thành viên 2 |
| T-159    | T-159 - Viết test case Graph Explorer cho MED001                | US-53        | Advanced Testing | Thành viên 4 |
| T-160    | T-160 - Viết test case Graph-RAG context builder                | US-53        | Advanced Testing | Thành viên 4 |

---

# 9. Sprint 10 - Forecast, Advanced Testing & Final Demo

## 9.1. Story Sprint 10

| Story Key | Summary                                         | Epic    | Priority     | SP |
| --------- | ----------------------------------------------- | ------- | ------------ | -: |
| US-54     | US-54 - Dự báo nguy cơ hết hàng                 | EPIC-17 | Low / Medium |  5 |
| US-55     | US-55 - Hiển thị dự báo tồn kho trên Dashboard  | EPIC-17 | Low / Medium |  3 |
| US-56     | US-56 - Kiểm thử toàn bộ chức năng nâng cao     | EPIC-18 | High         |  5 |
| US-57     | US-57 - Hoàn thiện README phần nâng cao         | EPIC-18 | High         |  2 |
| US-58     | US-58 - Hoàn thiện slide chức năng nâng cao     | EPIC-18 | High         |  2 |
| US-59     | US-59 - Chuẩn bị demo script chức năng nâng cao | EPIC-18 | High         |  3 |

## 9.2. Task Sprint 10

| Task Key | Summary                                                          | Linked Story | Component              | Assignee                    |
| -------- | ---------------------------------------------------------------- | ------------ | ---------------------- | --------------------------- |
| T-161    | T-161 - Tạo service dự báo nguy cơ hết hàng                      | US-54        | Forecast               | Thành viên 1                |
| T-162    | T-162 - Tính tốc độ bán trung bình của từng thuốc                | US-54        | Forecast               | Thành viên 1                |
| T-163    | T-163 - Tính số ngày ước tính trước khi hết hàng                 | US-54        | Forecast               | Thành viên 1                |
| T-164    | T-164 - Tạo API báo cáo dự báo tồn kho                           | US-54        | Backend                | Thành viên 1                |
| T-165    | T-165 - Hiển thị card dự báo tồn kho trên Dashboard              | US-55        | Frontend               | Thành viên 2                |
| T-166    | T-166 - Hiển thị danh sách thuốc có nguy cơ hết hàng             | US-55        | Frontend               | Thành viên 2                |
| T-167    | T-167 - Viết test case forecast đủ dữ liệu và thiếu dữ liệu      | US-56        | Advanced Testing       | Thành viên 4                |
| T-168    | T-168 - Test lại AI Copilot, Guardrail và Audit Log              | US-56        | Advanced Testing       | Thành viên 4                |
| T-169    | T-169 - Test lại Storage, Realtime và Notification               | US-56        | Advanced Testing       | Thành viên 4                |
| T-170    | T-170 - Test lại Graph Explorer và Graph-RAG                     | US-56        | Advanced Testing       | Thành viên 4                |
| T-171    | T-171 - Cập nhật README phần AI Copilot                          | US-57        | Advanced Documentation | Thành viên 4                |
| T-172    | T-172 - Cập nhật README phần Supabase Advanced                   | US-57        | Advanced Documentation | Thành viên 4                |
| T-173    | T-173 - Cập nhật README phần Knowledge Graph và Forecast         | US-57        | Advanced Documentation | Thành viên 4                |
| T-174    | T-174 - Bổ sung slide AI Copilot và Guardrail                    | US-58        | Advanced Documentation | Thành viên 4                |
| T-175    | T-175 - Bổ sung slide Supabase Advanced Features                 | US-58        | Advanced Documentation | Thành viên 4                |
| T-176    | T-176 - Bổ sung slide Knowledge Graph và Graph-RAG               | US-58        | Advanced Documentation | Thành viên 4                |
| T-177    | T-177 - Viết demo script phần AI Copilot                         | US-59        | Advanced Documentation | Thành viên 4                |
| T-178    | T-178 - Viết demo script phần Supabase Realtime                  | US-59        | Advanced Documentation | Thành viên 4                |
| T-179    | T-179 - Viết demo script phần Graph và Forecast                  | US-59        | Advanced Documentation | Thành viên 4                |
| T-180    | T-180 - Chuẩn bị backup plan khi Gemini, Realtime hoặc Graph lỗi | US-59        | Deployment             | Thành viên 1 / Thành viên 4 |

---

# 10. Thứ tự triển khai dễ làm nhất

## 10.1. Nếu làm AI Copilot

Thứ tự nên làm:

```text
1. Tạo AI Copilot Module
2. Tạo MockAI Service
3. Tạo AI Provider Interface
4. Tạo AI Orchestrator
5. Tạo API explain-alert
6. Tạo API draft-consultation-note
7. Tạo AI Copilot Panel
8. Tạo Guardrail
9. Tạo Audit Log
10. Test và cập nhật README
```

Không nên tích hợp Gemini ngay từ đầu. Làm MockAI trước để demo chắc chắn.

---

## 10.2. Nếu làm Supabase Advanced

Thứ tự nên làm:

```text
1. Thêm image_url vào medicines
2. Tạo bucket medicine-images
3. Upload ảnh thuốc
4. Hiển thị ảnh thuốc
5. Tạo bảng notifications
6. Tạo notification tồn thấp/gần hết hạn
7. Cấu hình realtime inventories
8. Subscribe realtime trên POS
9. Tạo job/API quét hạn dùng
10. Test bằng 2 tab trình duyệt
```

---

## 10.3. Nếu làm Graph-RAG

Thứ tự nên làm:

```text
1. Thiết kế mock graph data
2. Seed graph data
3. Tạo Graph Module
4. Tạo API graph theo medicine
5. Tạo Graph Explorer UI
6. Tạo GraphContextBuilder
7. Tích hợp context vào AI prompt
8. Test với MED001 + MED002
```

---

# 11. Mức ưu tiên nếu không đủ thời gian

## Gói nâng cao tối thiểu nên làm

```text
Sprint 6 + Sprint 7 một phần
```

Cụ thể:

```text
US-31 - Khởi tạo AI Copilot Module
US-32 - AI giải thích cảnh báo tương tác thuốc
US-34 - MockAI dự phòng khi Gemini API lỗi
US-35 - Hiển thị AI Copilot Panel trên POS
US-37 - Chặn yêu cầu chẩn đoán và kê đơn
US-39 - Lưu nhật ký sử dụng AI
```

Đây là gói đáng làm nhất vì liên quan trực tiếp đến điểm nổi bật của đề tài.

---

## Gói nâng cao vừa sức

```text
Gói tối thiểu
+
US-42 - Upload ảnh thuốc bằng Supabase Storage
US-44 - Cập nhật tồn kho realtime trên POS
US-45 - Tạo thông báo tồn kho thấp
US-46 - Tạo thông báo thuốc gần hết hạn
```

---

## Gói nâng cao đầy đủ

```text
Sprint 6 + Sprint 7 + Sprint 8 + Sprint 9 + Sprint 10
```

Chỉ nên làm nếu MVP đã rất ổn định.

---

# 12. Definition of Done cho phần nâng cao

Một Story nâng cao chỉ được kéo sang Done khi đạt đủ:

```text
1. Có API hoặc UI hoạt động.
2. Có dữ liệu demo.
3. Có test case.
4. Có xử lý lỗi cơ bản.
5. Có phân quyền nếu cần.
6. Có disclaimer nếu liên quan AI/thuốc.
7. Không làm hỏng luồng MVP.
8. Có cập nhật README hoặc demo script.
9. Có thể demo trong 1–2 phút.
```

---

# 13. Kết luận

Bạn có thể bổ sung vào Jira theo bản mở rộng này:

```text
Sprint 6 - AI Copilot Foundation
EPIC-13
US-31 → US-36
T-79 → T-102

Sprint 7 - AI Guardrail & Audit Log
EPIC-14, EPIC-18
US-37 → US-41
T-103 → T-121

Sprint 8 - Supabase Storage, Realtime & Notification
EPIC-15, EPIC-18
US-42 → US-48
T-122 → T-144

Sprint 9 - Knowledge Graph & Graph-RAG
EPIC-16, EPIC-18
US-49 → US-53
T-145 → T-160

Sprint 10 - Forecast, Advanced Testing & Final Demo
EPIC-17, EPIC-18
US-54 → US-59
T-161 → T-180
```

Nếu muốn chắc tiến độ, hãy đánh dấu:

```text
Sprint 6: Should-have
Sprint 7: Could-have
Sprint 8: Could-have
Sprint 9: Optional
Sprint 10: Optional / Documentation
```

Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
