# 10_SYSTEM_ARCHITECTURE

**Mã tài liệu:** 10_System_Architecture  
**Tên tài liệu:** System Architecture Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu kiến trúc hệ thống  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, System Architect, Backend Developer, Frontend Developer, Database Designer, AI/Graph Developer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **System Architecture Document** mô tả kiến trúc tổng thể của hệ thống **PharmaAssist AI Intelligence**. Tài liệu này giúp nhóm phát triển hiểu hệ thống được chia thành những tầng nào, mỗi tầng có vai trò gì, các module giao tiếp với nhau ra sao, dữ liệu được lưu ở đâu và các thành phần AI/Graph được tích hợp như thế nào.

Trong đồ án môn **Công Nghệ Phần Mềm**, tài liệu kiến trúc hệ thống là phần quan trọng để chứng minh nhóm không chỉ xây dựng giao diện và CRUD đơn giản, mà có tư duy tổ chức hệ thống rõ ràng. Với PharmaAssist AI Intelligence, kiến trúc cần thể hiện được cả phần quản lý nhà thuốc cơ bản và phần nâng cao như Rule Engine, AI Orchestrator, Graph-RAG, Guardrail và Audit Log.

Tài liệu này dùng để:

- Mô tả kiến trúc tổng quan của hệ thống.
- Xác định các tầng chính trong hệ thống.
- Mô tả các service backend và trách nhiệm của từng service.
- Mô tả cách frontend, backend, database, graph database và AI provider giao tiếp với nhau.
- Làm cơ sở thiết kế API.
- Làm cơ sở thiết kế database.
- Làm cơ sở phân chia module lập trình.
- Làm cơ sở viết test case tích hợp.
- Làm cơ sở trình bày kiến trúc trong báo cáo và slide bảo vệ.

---

## 2. Phạm vi tài liệu

Tài liệu này mô tả kiến trúc hệ thống ở mức tổng thể và mức module, bao gồm:

- Kiến trúc web nhiều tầng.
- Presentation Layer.
- Application Layer.
- Business Layer.
- Data Layer.
- AI Layer.
- Governance Layer.
- Các backend service chính.
- Cách các service phối hợp trong luồng nghiệp vụ.
- Luồng bán thuốc.
- Luồng nhập thuốc.
- Luồng kiểm tra tương tác thuốc.
- Luồng AI Copilot nếu triển khai.
- Luồng Graph-RAG nếu triển khai.
- Luồng Audit Log.
- Gợi ý triển khai local/Docker.
- Ràng buộc an toàn và bảo mật trong kiến trúc.

Tài liệu này không đi sâu vào source code chi tiết, class implementation hoặc câu lệnh SQL cụ thể. Các nội dung đó sẽ được trình bày trong tài liệu thiết kế module, API Specification, ERD, Data Dictionary và tài liệu triển khai.

---

## 3. Nguyên tắc thiết kế kiến trúc

Kiến trúc của PharmaAssist AI Intelligence được thiết kế theo các nguyên tắc sau:

| Nguyên tắc | Mô tả |
|---|---|
| Tách lớp rõ ràng | Frontend, backend, business service, database, AI và graph được tách biệt |
| Dễ mở rộng | Có thể bổ sung AI/Graph sau khi MVP hoàn thành |
| Dễ kiểm thử | Mỗi service có trách nhiệm rõ để viết unit test/integration test |
| Dễ demo | Hệ thống có thể chạy local bằng dữ liệu mẫu |
| An toàn AI | AI được kiểm soát bằng Guardrail và disclaimer |
| Có truy vết | Các thao tác quan trọng và tác vụ AI có thể ghi Audit Log |
| Không phụ thuộc cứng AI provider | Có thể dùng MockAI, Gemini, OpenRouter hoặc Ollama |
| Ưu tiên MVP | Các service cốt lõi hoạt động trước, AI/Graph là phần nâng cao |

---

## 4. Kiến trúc tổng quan

PharmaAssist AI Intelligence sử dụng kiến trúc web nhiều tầng. Hệ thống gồm frontend web, backend API, các business service, database quan hệ, graph database và AI provider nếu có.

| Tầng | Thành phần | Vai trò |
|---|---|---|
| Presentation Layer | Frontend Web | Giao diện người dùng cho Admin, Nhân viên nhà thuốc và Nhân viên kho |
| Application Layer | Backend API | Tiếp nhận request, xác thực, phân quyền, điều phối service |
| Business Layer | Services | Auth, User, Medicine, Inventory, Sales, Payment, Invoice, Rule Engine, Report, AI, Graph |
| Data Layer | PostgreSQL/MySQL, Neo4j | Lưu dữ liệu quan hệ và dữ liệu graph |
| AI Layer | MockAI/Gemini/OpenRouter/Ollama | Sinh nội dung AI nếu có triển khai AI Copilot |
| Governance Layer | Guardrail, Audit Log, Prompt Management | Kiểm soát AI, bảo mật, truy vết và quản trị hệ thống |

---

## 5. Sơ đồ kiến trúc tổng quan dạng text

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
    +-- Stock Import Service
    +-- Customer Service
    +-- Sales Service
    +-- Payment Service
    +-- Invoice Service
    +-- Rule Engine
    +-- Report Service
    +-- AI Orchestrator
    +-- Graph-RAG Service
    +-- Audit Log Service
    |
    +--> PostgreSQL/MySQL
    +--> Neo4j
    +--> AI Provider
```

---

## 6. Sơ đồ kiến trúc chi tiết dạng text

```text
+--------------------------------------------------------------+
|                        User Browser                          |
|--------------------------------------------------------------|
| Admin UI | Staff POS UI | Warehouse UI | AI UI | Graph UI    |
+-------------------------------|------------------------------+
                                |
                                | HTTPS / REST API / JSON
                                v
+--------------------------------------------------------------+
|                         Frontend Web                         |
|--------------------------------------------------------------|
| - Routing                                                    |
| - Role-based menu                                            |
| - Form validation                                            |
| - State management                                           |
| - API client                                                 |
| - Alert display                                              |
| - Disclaimer display                                         |
+-------------------------------|------------------------------+
                                |
                                v
+--------------------------------------------------------------+
|                         Backend API                          |
|--------------------------------------------------------------|
| - Request validation                                         |
| - Authentication                                             |
| - Authorization                                              |
| - Error handling                                             |
| - Service orchestration                                      |
| - Response formatting                                        |
+-------------------------------|------------------------------+
                                |
       +------------------------+-------------------------+
       |                        |                         |
       v                        v                         v
+---------------+     +------------------+       +----------------+
| Business      |     | Governance       |       | Integration    |
| Services      |     | Services         |       | Services       |
|---------------|     |------------------|       |----------------|
| Auth          |     | Guardrail        |       | AI Adapter     |
| User          |     | Audit Log        |       | Graph Service  |
| Medicine      |     | Prompt Template  |       | Provider API   |
| Inventory     |     | Cost Monitor     |       |                |
| Sales         |     |                  |       |                |
| Payment       |     |                  |       |                |
| Invoice       |     |                  |       |                |
| Report        |     |                  |       |                |
| Rule Engine   |     |                  |       |                |
+-------|-------+     +---------|--------+       +-------|--------+
        |                       |                        |
        v                       v                        v
+---------------+     +------------------+       +----------------+
| PostgreSQL /  |     | AI Audit / Logs  |       | Neo4j / AI     |
| MySQL         |     | Tables           |       | Provider       |
+---------------+     +------------------+       +----------------+
```

---

## 7. Thành phần chính của hệ thống

| Thành phần | Mô tả |
|---|---|
| Frontend | Hiển thị UI cho Admin, nhân viên nhà thuốc và nhân viên kho |
| Backend API | Cung cấp REST API, xử lý request/response |
| Auth Service | Đăng nhập, JWT/session, phân quyền |
| User Service | Quản lý tài khoản, role, trạng thái người dùng |
| Medicine Service | Quản lý thuốc và danh mục thuốc |
| Inventory Service | Nhập kho, tồn kho, hạn dùng, cảnh báo kho |
| Stock Import Service | Tạo và xác nhận phiếu nhập thuốc |
| Customer Service | Quản lý thông tin khách hàng cơ bản |
| Sales Service | Tạo đơn, chi tiết đơn, tính tiền |
| Payment Service | Ghi nhận thanh toán mô phỏng |
| Invoice Service | Tạo và xem/in hóa đơn |
| Rule Engine | Kiểm tra tồn kho, tương tác thuốc và các rule nghiệp vụ |
| Report Service | Doanh thu, thuốc bán chạy, tồn kho |
| AI Orchestrator | Điều phối prompt, provider, guardrail và audit log |
| Graph-RAG Service | Truy xuất Neo4j làm context cho AI |
| Guardrail Service | Kiểm soát input/output AI |
| Audit Log Service | Lưu log thao tác quan trọng và AI request/response |

---

## 8. Mô tả chi tiết các tầng kiến trúc

## 8.1. Presentation Layer - Frontend Web

### 8.1.1. Vai trò

Presentation Layer là tầng giao diện người dùng. Đây là nơi Admin, Nhân viên nhà thuốc và Nhân viên kho tương tác với hệ thống.

### 8.1.2. Trách nhiệm chính

- Hiển thị màn hình đăng nhập.
- Hiển thị dashboard theo vai trò.
- Hiển thị menu phù hợp với role.
- Cho phép quản lý thuốc, danh mục, tồn kho.
- Cho phép tạo đơn bán thuốc tại POS.
- Hiển thị cảnh báo tương tác thuốc.
- Hiển thị màn hình thanh toán và hóa đơn.
- Hiển thị báo cáo.
- Hiển thị AI Copilot nếu có.
- Hiển thị Knowledge Graph nếu có.
- Hiển thị disclaimer ở các màn hình cảnh báo/AI.

### 8.1.3. Màn hình chính

| Màn hình | Actor chính | Mục tiêu |
|---|---|---|
| Login | Admin, Staff, Warehouse | Đăng nhập hệ thống |
| Dashboard | Admin | Xem tổng quan doanh thu, tồn kho, cảnh báo |
| Medicine Management | Admin | Quản lý thuốc |
| Category Management | Admin | Quản lý danh mục thuốc |
| Inventory | Admin, Warehouse | Xem tồn kho và cảnh báo kho |
| Stock Import | Warehouse | Nhập thuốc |
| Sales POS | Staff | Tạo đơn bán thuốc |
| Interaction Alert | Staff | Xem cảnh báo tương tác |
| Payment | Staff | Thanh toán |
| Invoice | Staff | Xem/in hóa đơn |
| Customer | Staff, Admin | Quản lý khách hàng |
| Report | Admin | Xem báo cáo |
| AI Copilot | Staff | Hỗ trợ tư vấn tham khảo |
| Graph Explorer | Admin, Staff | Xem graph thuốc/tương tác |
| AI Audit Log | Admin | Xem log AI |

### 8.1.4. Nguyên tắc frontend

- Giao diện đơn giản, rõ ràng, phù hợp demo.
- Không hiển thị menu người dùng không có quyền.
- Không tin tưởng hoàn toàn frontend để bảo mật; backend vẫn phải kiểm tra quyền.
- Form cần validate dữ liệu cơ bản trước khi gửi API.
- Các cảnh báo liên quan thuốc/AI phải có disclaimer.

---

## 8.2. Application Layer - Backend API

### 8.2.1. Vai trò

Backend API là tầng trung gian giữa frontend và các service nghiệp vụ. Backend nhận request từ frontend, kiểm tra xác thực, kiểm tra phân quyền, gọi service phù hợp và trả response.

### 8.2.2. Trách nhiệm chính

- Xác thực người dùng.
- Kiểm tra quyền truy cập.
- Validate request body.
- Gọi business service.
- Xử lý lỗi.
- Format response.
- Ghi audit log nếu cần.
- Điều phối luồng nghiệp vụ phức tạp.

### 8.2.3. API style

Hệ thống đề xuất dùng REST API với JSON.

Ví dụ:

```text
POST   /auth/login
GET    /medicines
POST   /medicines
GET    /inventories
POST   /stock-imports
POST   /orders
POST   /interactions/check
POST   /payments
GET    /invoices/{id}
GET    /reports/revenue
POST   /ai/consultation
GET    /graph/medicine/{id}
```

---

## 8.3. Business Layer - Services

### 8.3.1. Vai trò

Business Layer chứa các service xử lý nghiệp vụ chính của hệ thống. Mỗi service phụ trách một nhóm chức năng riêng để dễ phát triển, kiểm thử và bảo trì.

### 8.3.2. Danh sách service

| Service | Trách nhiệm chính |
|---|---|
| Auth Service | Đăng nhập, tạo token, kiểm tra mật khẩu |
| User Service | Quản lý user, role, trạng thái tài khoản |
| Medicine Service | CRUD thuốc và danh mục |
| Inventory Service | Quản lý số lượng tồn, cảnh báo kho |
| Stock Import Service | Tạo phiếu nhập và cập nhật tồn kho |
| Customer Service | Quản lý khách hàng cơ bản |
| Sales Service | Tạo đơn hàng, chi tiết đơn, tính tổng tiền |
| Payment Service | Ghi nhận thanh toán và cập nhật trạng thái đơn |
| Invoice Service | Tạo hóa đơn sau thanh toán |
| Rule Engine | Kiểm tra rule nghiệp vụ, tương tác thuốc |
| Report Service | Tổng hợp doanh thu, thuốc bán chạy, tồn kho |
| AI Orchestrator | Điều phối tác vụ AI |
| Graph-RAG Service | Truy xuất graph làm context cho AI |
| Audit Log Service | Ghi log thao tác quan trọng |

---

## 8.4. Data Layer - PostgreSQL/MySQL và Neo4j

### 8.4.1. Database quan hệ

PostgreSQL hoặc MySQL được sử dụng để lưu dữ liệu nghiệp vụ chính.

Nhóm bảng chính:

| Nhóm | Bảng |
|---|---|
| User | users, roles, user_roles |
| Medicine | medicines, medicine_categories, active_ingredients |
| Inventory | inventories, stock_imports, stock_import_details |
| Sales | orders, order_details, payments, invoices |
| Customer | customers |
| Interaction | drug_interactions, interaction_alerts |
| Consultation | consultation_sessions, consultation_notes |
| AI | ai_logs, ai_prompt_templates, ai_feedback |
| Report/Analytics | sales_daily_summary, inventory_forecasts, reorder_suggestions |

### 8.4.2. Neo4j Graph Database

Neo4j được dùng nếu nhóm triển khai phần Knowledge Graph.

Node đề xuất:

| Node | Mô tả |
|---|---|
| Medicine | Thuốc |
| ActiveIngredient | Hoạt chất |
| DrugGroup | Nhóm thuốc |
| Symptom | Triệu chứng mẫu |
| Condition | Bệnh nền/tình trạng mẫu |
| Interaction | Tương tác |
| RedFlag | Dấu hiệu nguy hiểm |
| Recommendation | Khuyến nghị tham khảo |

Relationship đề xuất:

| Relationship | Mô tả |
|---|---|
| CONTAINS | Thuốc chứa hoạt chất |
| BELONGS_TO | Thuốc thuộc nhóm |
| INTERACTS_WITH | Thuốc/hoạt chất tương tác |
| TREATS_SYMPTOM | Nhóm thuốc hỗ trợ triệu chứng mẫu |
| CAUTION_WITH | Cần thận trọng với bệnh nền mẫu |
| HAS_REDFLAG | Triệu chứng có red flag |
| HAS_RECOMMENDATION | Tương tác có khuyến nghị |

---

## 8.5. AI Layer

### 8.5.1. Vai trò

AI Layer cung cấp khả năng sinh nội dung hỗ trợ tham khảo, ví dụ tạo câu hỏi bổ sung, giải thích cảnh báo tương tác hoặc tạo ghi chú tư vấn.

### 8.5.2. Provider đề xuất

| Provider | Vai trò |
|---|---|
| MockAI | AI giả lập, dùng khi không có API thật hoặc để demo ổn định |
| Gemini | Provider AI thật nếu nhóm có API key |
| OpenRouter | Trung gian gọi nhiều model AI |
| Ollama | Chạy model local nếu nhóm muốn demo offline |

### 8.5.3. Nguyên tắc AI Layer

- Không phụ thuộc cứng vào một provider.
- Có interface chung cho AI Service.
- Có fallback sang MockAI nếu provider thật lỗi.
- Có Guardrail kiểm soát input/output.
- Có Audit Log nếu gọi AI.
- Không lưu API key thật trong source code.

---

## 8.6. Governance Layer

### 8.6.1. Vai trò

Governance Layer chịu trách nhiệm kiểm soát, giám sát và truy vết các thành phần nhạy cảm, đặc biệt là AI.

### 8.6.2. Thành phần

| Thành phần | Vai trò |
|---|---|
| Guardrail Service | Kiểm soát input/output AI |
| Audit Log Service | Ghi log thao tác quan trọng và AI request/response |
| Prompt Management | Quản lý prompt template nếu có |
| AI Cost Monitor | Theo dõi số lần gọi AI và chi phí ước tính nếu có |
| Security Middleware | Kiểm tra xác thực và phân quyền |

### 8.6.3. Yêu cầu an toàn

- AI không chẩn đoán bệnh.
- AI không kê đơn thuốc.
- AI không thay thế dược sĩ, bác sĩ hoặc chuyên gia y tế.
- Nội dung AI cần được người dùng xác nhận trước khi lưu.
- Cảnh báo/AI phải có disclaimer.
- Tác vụ AI quan trọng nên được log.

---

## 9. Kiến trúc module backend

## 9.1. Auth Service

### Trách nhiệm

- Xác thực username/password.
- Hash và kiểm tra mật khẩu.
- Sinh JWT hoặc session.
- Trả thông tin user và role.

### Input/Output chính

| Input | Output |
|---|---|
| username, password | access_token, user_info, roles |

---

## 9.2. User Service

### Trách nhiệm

- Quản lý user.
- Quản lý role.
- Gán role cho user.
- Khóa/mở tài khoản.

### Actor chính

- Admin.

---

## 9.3. Medicine Service

### Trách nhiệm

- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Tìm kiếm thuốc.
- Kiểm tra mã thuốc không trùng.
- Kiểm tra giá bán hợp lệ.

### Bảng liên quan

- medicines.
- medicine_categories.

---

## 9.4. Inventory Service

### Trách nhiệm

- Xem tồn kho.
- Cập nhật tồn kho sau nhập.
- Cập nhật tồn kho sau bán.
- Kiểm tra thuốc sắp hết.
- Kiểm tra thuốc gần hết hạn.
- Không cho tồn kho âm.

### Bảng liên quan

- inventories.
- medicines.
- stock_import_details.
- order_details.

---

## 9.5. Stock Import Service

### Trách nhiệm

- Tạo phiếu nhập thuốc.
- Thêm chi tiết thuốc nhập.
- Xác nhận phiếu nhập.
- Gọi Inventory Service để tăng tồn kho.

### Luồng xử lý chính

1. Nhân viên kho tạo phiếu nhập.
2. Thêm danh sách thuốc nhập.
3. Xác nhận phiếu nhập.
4. Stock Import Service lưu phiếu nhập.
5. Inventory Service tăng tồn kho.

---

## 9.6. Sales Service

### Trách nhiệm

- Tạo đơn bán thuốc.
- Thêm thuốc vào đơn.
- Tính tổng tiền.
- Gọi Inventory Service kiểm tra tồn kho.
- Gọi Rule Engine kiểm tra tương tác thuốc.
- Cập nhật trạng thái đơn hàng.

### Bảng liên quan

- orders.
- order_details.
- customers.
- medicines.

---

## 9.7. Rule Engine

### Trách nhiệm

- Kiểm tra rule nghiệp vụ.
- Kiểm tra không bán vượt tồn.
- Kiểm tra tương tác thuốc.
- Tạo danh sách cảnh báo.
- Nhắc ghi chú nếu tương tác mức cao.

### Input/Output

| Input | Output |
|---|---|
| order items, medicine ids, quantities | validation result, alert list, warning messages |

### Rule quan trọng

- Nếu đơn có từ 2 thuốc trở lên, kiểm tra tương tác.
- Nếu có tương tác, trả tên thuốc, mức độ, mô tả, khuyến nghị.
- Cảnh báo phải có disclaimer.

---

## 9.8. Payment Service

### Trách nhiệm

- Ghi nhận thanh toán.
- Kiểm tra đơn hàng hợp lệ.
- Cập nhật trạng thái đơn hàng.
- Gọi Inventory Service để trừ kho sau thanh toán.
- Gọi Invoice Service tạo hóa đơn.

### Nguyên tắc

- Thanh toán thành công mới trừ tồn kho.
- Mỗi đơn hàng MVP có một payment chính.
- Không tích hợp cổng thanh toán thật trong MVP.

---

## 9.9. Invoice Service

### Trách nhiệm

- Tạo hóa đơn sau thanh toán.
- Lấy thông tin đơn hàng, khách hàng, nhân viên và danh sách thuốc.
- Trả dữ liệu hóa đơn cho frontend.

### Nguyên tắc

- Hóa đơn chỉ tạo sau khi thanh toán thành công.
- Không tạo hóa đơn cho đơn hàng rỗng.

---

## 9.10. Report Service

### Trách nhiệm

- Tổng hợp doanh thu.
- Thống kê thuốc bán chạy.
- Thống kê tồn kho thấp.
- Thống kê thuốc gần hết hạn.

### Nguyên tắc

- Doanh thu chỉ tính đơn đã thanh toán.
- Báo cáo doanh thu mặc định chỉ Admin xem.

---

## 9.11. AI Orchestrator

### Trách nhiệm

- Nhận yêu cầu AI từ backend.
- Lấy prompt template.
- Build context.
- Gọi Guardrail kiểm tra input.
- Chọn AI provider.
- Gọi AI Service.
- Gọi Guardrail kiểm tra output.
- Lưu AI Audit Log.
- Trả kết quả về frontend.

### Provider fallback

```text
Primary Provider fails
    |
    v
Try Secondary Provider
    |
    v
If still fails, use MockAI
```

---

## 9.12. Graph-RAG Service

### Trách nhiệm

- Nhận medicine_id, symptom hoặc consultation context.
- Truy vấn Neo4j để lấy quan hệ liên quan.
- Chuyển kết quả graph thành context dạng text ngắn.
- Gửi context cho AI Orchestrator.

### Ví dụ context

```text
Thuốc A mẫu có quan hệ tương tác với Thuốc B mẫu ở mức HIGH theo dữ liệu mẫu.
Khuyến nghị mẫu: cần kiểm tra kỹ và tham khảo ý kiến chuyên gia y tế.
```

---

## 9.13. Audit Log Service

### Trách nhiệm

- Lưu log đăng nhập nếu cần.
- Lưu log nhập kho.
- Lưu log thanh toán.
- Lưu log tạo hóa đơn.
- Lưu log AI request/response.
- Lưu trạng thái success/failed/blocked.

---

## 10. Luồng xử lý chính

## 10.1. Luồng bán thuốc

Luồng bán thuốc là luồng nghiệp vụ quan trọng nhất của MVP.

```text
Frontend gửi yêu cầu tạo đơn
    |
    v
Backend kiểm tra đăng nhập và quyền
    |
    v
Sales Service tạo đơn nháp
    |
    v
Nhân viên thêm thuốc vào đơn
    |
    v
Inventory Service kiểm tra tồn kho
    |
    v
Rule Engine kiểm tra tương tác thuốc
    |
    v
Nếu có cảnh báo, trả về Frontend
    |
    v
Nhân viên xem cảnh báo và ghi chú nếu cần
    |
    v
Nhân viên xác nhận thanh toán
    |
    v
Payment Service lưu thanh toán
    |
    v
Inventory Service trừ kho
    |
    v
Invoice Service tạo hóa đơn
    |
    v
Frontend hiển thị hóa đơn
```

### 10.1.1. Mô tả từng bước

| Bước | Thành phần xử lý | Mô tả |
|---|---|---|
| 1 | Frontend | Nhân viên mở POS và tạo đơn |
| 2 | Backend API | Kiểm tra token và role STAFF/ADMIN |
| 3 | Sales Service | Tạo order trạng thái draft |
| 4 | Sales Service | Thêm thuốc vào order detail |
| 5 | Inventory Service | Kiểm tra số lượng tồn |
| 6 | Rule Engine | Kiểm tra tương tác thuốc nếu có từ 2 thuốc |
| 7 | Frontend | Hiển thị cảnh báo nếu có |
| 8 | Staff | Nhập ghi chú tư vấn nếu cần |
| 9 | Payment Service | Ghi nhận thanh toán |
| 10 | Inventory Service | Trừ tồn kho sau thanh toán |
| 11 | Invoice Service | Tạo hóa đơn |
| 12 | Frontend | Hiển thị hóa đơn |

---

## 10.2. Luồng nhập thuốc

```text
Warehouse Staff tạo phiếu nhập
    |
    v
Backend kiểm tra quyền WAREHOUSE/ADMIN
    |
    v
Stock Import Service tạo phiếu nhập
    |
    v
Thêm chi tiết thuốc nhập
    |
    v
Xác nhận phiếu nhập
    |
    v
Inventory Service tăng tồn kho
    |
    v
Audit Log ghi nhận thao tác nếu cần
```

### 10.2.1. Quy tắc chính

- Chỉ Admin hoặc Nhân viên kho được nhập thuốc.
- Phiếu nhập phải có ít nhất một thuốc.
- Số lượng nhập phải lớn hơn 0.
- Tồn kho chỉ tăng khi phiếu nhập được xác nhận.

---

## 10.3. Luồng kiểm tra tương tác thuốc

```text
Staff thêm thuốc vào đơn
    |
    v
Sales Service lấy danh sách thuốc trong đơn
    |
    v
Rule Engine sinh các cặp thuốc
    |
    v
Rule Engine truy vấn DrugInteraction
    |
    v
Nếu có tương tác, tạo Interaction Alert
    |
    v
Frontend hiển thị cảnh báo
```

### 10.3.1. Input/Output

| Thành phần | Nội dung |
|---|---|
| Input | Danh sách medicine_id trong đơn |
| Processing | Sinh cặp thuốc và tra bảng drug_interactions |
| Output | Danh sách alert gồm thuốc A, thuốc B, severity, description, recommendation |

---

## 10.4. Luồng AI Copilot

```text
Staff gửi yêu cầu AI
    |
    v
Backend kiểm tra quyền
    |
    v
AI Orchestrator nhận request
    |
    v
Guardrail kiểm tra input
    |
    v
Build prompt và context
    |
    v
Chọn AI Provider hoặc MockAI
    |
    v
Gọi AI Service
    |
    v
Guardrail kiểm tra output
    |
    v
Audit Log lưu request/response
    |
    v
Frontend hiển thị kết quả nháp
    |
    v
Staff xác nhận trước khi lưu
```

### 10.4.1. Nguyên tắc AI Copilot

- AI chỉ hỗ trợ tham khảo.
- AI không chẩn đoán bệnh.
- AI không kê đơn thuốc.
- Nội dung AI phải có disclaimer.
- Nội dung AI cần người dùng xác nhận trước khi lưu.

---

## 10.5. Luồng Graph-RAG

```text
Staff chọn thuốc hoặc phiên tư vấn
    |
    v
Graph-RAG Service xác định entity liên quan
    |
    v
Neo4j trả về node/relationship liên quan
    |
    v
Graph-RAG Service tạo context ngắn
    |
    v
AI Orchestrator đưa context vào prompt
    |
    v
AI sinh nội dung tham khảo
    |
    v
Guardrail kiểm tra output
    |
    v
Frontend hiển thị kết quả
```

### 10.5.1. Ghi chú

Graph-RAG là phần nâng cao. Nếu không đủ thời gian, nhóm có thể mô phỏng bằng dữ liệu graph mẫu hoặc mô tả luồng trong báo cáo.

---

## 10.6. Luồng báo cáo

```text
Admin mở màn hình Report
    |
    v
Frontend gọi API báo cáo
    |
    v
Backend kiểm tra quyền Admin
    |
    v
Report Service truy vấn orders, payments, order_details
    |
    v
Report Service tổng hợp số liệu
    |
    v
Frontend hiển thị biểu đồ/bảng báo cáo
```

### 10.6.1. Quy tắc báo cáo

- Doanh thu chỉ tính đơn đã thanh toán.
- Thuốc bán chạy tính theo số lượng đã bán.
- Tồn kho thấp dựa trên min_stock.
- Thuốc gần hết hạn dựa trên expiry_date.

---

## 11. Kiến trúc dữ liệu

## 11.1. Database quan hệ

Database quan hệ lưu dữ liệu nghiệp vụ cốt lõi.

```text
users -- user_roles -- roles
medicine_categories -- medicines -- inventories
stock_imports -- stock_import_details -- medicines
customers -- orders -- order_details -- medicines
orders -- payments
orders -- invoices
orders -- interaction_alerts -- drug_interactions
orders -- consultation_notes
ai_logs -- ai_prompt_templates
```

## 11.2. Neo4j Graph

Neo4j lưu dữ liệu quan hệ ngữ nghĩa.

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)
(Medicine)-[:BELONGS_TO]->(DrugGroup)
(Medicine)-[:INTERACTS_WITH]->(Medicine)
(DrugGroup)-[:TREATS_SYMPTOM]->(Symptom)
(DrugGroup)-[:CAUTION_WITH]->(Condition)
(Symptom)-[:HAS_REDFLAG]->(RedFlag)
(Interaction)-[:HAS_RECOMMENDATION]->(Recommendation)
```

---

## 12. Kiến trúc bảo mật

| Thành phần | Cách bảo vệ |
|---|---|
| Authentication | Username/password, password hash, JWT/session |
| Authorization | Role-based access control |
| API | Middleware kiểm tra token và role |
| Password | Hash, không lưu plain text |
| Customer data | Không dùng dữ liệu thật trong demo, giới hạn quyền xem |
| AI provider key | Lưu trong environment variable, không commit lên GitHub |
| AI output | Guardrail kiểm tra trước khi hiển thị/lưu |
| Audit | Ghi log thao tác quan trọng |

---

## 13. Kiến trúc lỗi và xử lý ngoại lệ

| Loại lỗi | Ví dụ | Cách xử lý |
|---|---|---|
| Auth error | Chưa đăng nhập | Trả 401 Unauthorized |
| Permission error | Sai quyền | Trả 403 Forbidden |
| Validation error | Giá bán âm, thiếu tên thuốc | Trả 400 Bad Request |
| Business error | Bán vượt tồn | Trả lỗi nghiệp vụ rõ ràng |
| Not found | Không tìm thấy thuốc | Trả 404 Not Found |
| Conflict | Mã thuốc trùng | Trả 409 Conflict |
| AI provider error | Provider lỗi/hết quota | Fallback MockAI hoặc thông báo lỗi thân thiện |
| Database error | Lỗi kết nối DB | Log lỗi và trả thông báo chung |

---

## 14. Gợi ý công nghệ triển khai

| Thành phần | Lựa chọn đề xuất | Ghi chú |
|---|---|---|
| Frontend | React hoặc Next.js | Dễ làm dashboard/POS |
| Backend | NestJS hoặc Spring Boot | NestJS hợp module rõ; Spring Boot hợp nhóm Java |
| Database | PostgreSQL hoặc MySQL | PostgreSQL phù hợp nâng cao |
| ORM | Prisma/TypeORM/JPA | Tùy backend |
| Graph DB | Neo4j | Dùng cho Knowledge Graph |
| AI Provider | MockAI, Gemini, OpenRouter, Ollama | MockAI bắt buộc để demo ổn định |
| Auth | JWT | Phù hợp REST API |
| Deployment | Local hoặc Docker Compose | Docker Compose giúp demo gọn |
| API format | REST JSON | Dễ thiết kế và test |

---

## 15. Gợi ý triển khai Docker Compose

Nếu nhóm muốn demo chuyên nghiệp hơn, có thể dùng Docker Compose với các service:

```text
frontend
backend
postgres
neo4j
```

AI provider có thể là API bên ngoài hoặc Ollama local nếu nhóm triển khai.

### 15.1. Ưu điểm Docker Compose

- Dễ chạy demo trên máy khác.
- Tách frontend/backend/database rõ ràng.
- Có thể seed data tự động.
- Giảm lỗi cấu hình môi trường.

### 15.2. Phương án đơn giản hơn

Nếu nhóm chưa quen Docker, có thể chạy local:

```text
Frontend: npm run dev
Backend: npm run start:dev
Database: PostgreSQL/MySQL local
Neo4j: Neo4j Desktop hoặc bỏ qua nếu mock
```

---

## 16. Mapping kiến trúc với yêu cầu

| Yêu cầu | Thành phần kiến trúc xử lý |
|---|---|
| Đăng nhập | Frontend Login, Auth Service, users table |
| Phân quyền | Role Guard, User Service, roles/user_roles |
| Quản lý thuốc | Medicine UI, Medicine Service, medicines table |
| Quản lý kho | Inventory UI, Inventory Service, inventories table |
| Nhập thuốc | Stock Import UI, Stock Import Service, stock_imports tables |
| Tạo đơn bán | Sales POS, Sales Service, orders/order_details |
| Kiểm tra tồn kho | Sales Service, Inventory Service, Rule Engine |
| Kiểm tra tương tác | Rule Engine, drug_interactions table |
| Thanh toán | Payment UI, Payment Service, payments table |
| Hóa đơn | Invoice Service, invoices table |
| Báo cáo | Report UI, Report Service, orders/payments/order_details |
| AI Copilot | AI UI, AI Orchestrator, AI Provider, Guardrail, ai_logs |
| Graph Explorer | Graph UI, Graph Service, Neo4j |
| Graph-RAG | Graph-RAG Service, Neo4j, AI Orchestrator |
| Audit Log | Audit Log Service, audit_logs/ai_logs |

---

## 17. Ràng buộc kiến trúc

| Ràng buộc | Mô tả |
|---|---|
| Dữ liệu thuốc là dữ liệu mẫu | Không dùng dữ liệu y khoa thật chưa kiểm định |
| AI chỉ hỗ trợ tham khảo | Không chẩn đoán, không kê đơn |
| Thanh toán mô phỏng | Không tích hợp cổng thanh toán thật trong MVP |
| Không lưu secret trong source | API key, token, password thật phải để trong env |
| Backend kiểm tra quyền | Không chỉ dựa vào frontend ẩn menu |
| MVP ưu tiên trước | AI/Graph làm sau hoặc mock nếu thiếu thời gian |
| Demo cần ổn định | Có MockAI và seed data để tránh phụ thuộc internet |

---

## 18. Rủi ro kiến trúc và biện pháp xử lý

| Rủi ro | Tác động | Biện pháp xử lý |
|---|---|---|
| Kiến trúc quá phức tạp | Nhóm không hoàn thành đúng hạn | Ưu tiên MVP, AI/Graph tách thành module nâng cao |
| Phụ thuộc AI provider | Demo AI có thể lỗi | Có MockAI fallback |
| Neo4j khó setup | Mất thời gian triển khai | Dùng graph nhỏ hoặc mock graph nếu cần |
| Backend và frontend lệch API | Tích hợp chậm | Có API Specification rõ ràng |
| Database thay đổi nhiều | Code phải sửa nhiều | Chốt ERD trước khi code |
| Không kiểm tra quyền ở backend | Rủi ro bảo mật | Dùng middleware/guard |
| Thiếu audit log | Khó truy vết AI | Tối thiểu log tác vụ AI quan trọng |
| Luồng bán hàng lỗi | Demo thất bại | Test kỹ luồng bán thuốc từ POS đến hóa đơn |

---

## 19. Tiêu chí đánh giá kiến trúc đạt yêu cầu

Kiến trúc hệ thống được xem là đạt nếu:

1. Có tách biệt frontend, backend và database.
2. Backend được chia service theo nghiệp vụ.
3. Có Auth Service và phân quyền rõ ràng.
4. Có Medicine, Inventory, Sales, Payment, Invoice service.
5. Có Rule Engine cho tương tác thuốc.
6. Có database quan hệ cho dữ liệu nghiệp vụ.
7. Có hướng tích hợp Neo4j nếu làm graph.
8. Có hướng tích hợp AI provider nếu làm AI.
9. Có Guardrail và Audit Log nếu có AI.
10. Luồng bán thuốc được mô tả rõ từ frontend đến database.
11. Kiến trúc hỗ trợ demo MVP ổn định.
12. Có ràng buộc an toàn về dữ liệu thuốc và AI.

---

## 20. Kết luận

Tài liệu **System Architecture Document** đã mô tả kiến trúc tổng thể của hệ thống **PharmaAssist AI Intelligence** theo mô hình web nhiều tầng. Hệ thống gồm Frontend Web, Backend API, Business Services, Data Layer, AI Layer và Governance Layer. Kiến trúc này giúp tách biệt trách nhiệm, dễ phát triển, dễ kiểm thử và có thể mở rộng từ MVP sang các chức năng nâng cao như AI Copilot, Neo4j Knowledge Graph, Graph-RAG, Guardrail và Audit Log.

Trong phạm vi MVP, nhóm cần ưu tiên triển khai các service cốt lõi như Auth, Medicine, Inventory, Stock Import, Sales, Rule Engine, Payment, Invoice và Report. Các thành phần AI/Graph nên được thiết kế theo hướng module độc lập để có thể mock hoặc triển khai thật sau khi MVP ổn định.

Kiến trúc này đảm bảo hệ thống vừa giải quyết bài toán quản lý nhà thuốc, vừa có điểm nhấn kỹ thuật đủ mạnh để trình bày trong đồ án Công Nghệ Phần Mềm.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

