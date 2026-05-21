# PharmaAssist AI Intelligence 💊🤖

> **Website quản lý nhà thuốc thông minh tích hợp cảnh báo tương tác thuốc, AI Pharmacist Copilot và Neo4j Knowledge Graph.**  
> _Đồ án môn học Công Nghệ Phần Mềm_

---

> [!WARNING]
> **TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM Y TẾ (MEDICAL DISCLAIMER):**
> Tất cả dữ liệu y khoa, thuốc, triệu chứng, bệnh nền, tương tác thuốc và các khuyến nghị/cảnh báo được sử dụng trong hệ thống này chỉ là **dữ liệu mẫu phục vụ mục đích học tập, thử nghiệm và demo đồ án môn học**.
> Hệ thống **không** cung cấp tư vấn y khoa thực tế, **không** thay thế chẩn đoán, kê đơn hoặc chỉ định điều trị của bác sĩ, dược sĩ hoặc các chuyên gia y tế có chuyên môn.

---

## 1. Tổng quan dự án

### 1.1. Bối cảnh nghiệp vụ

Tại các nhà thuốc quy mô nhỏ và vừa, việc quản lý vận hành hằng ngày như theo dõi tồn kho, nhập hàng, bán hàng, in hóa đơn và lưu trữ lịch sử mua hàng của khách thường gặp nhiều khó khăn nếu chỉ sử dụng sổ tay hoặc Excel. Nhân viên dễ gặp sai sót khi tính tiền, bán vượt số lượng tồn, hoặc không kịp thời phát hiện các loại thuốc sắp hết hạn sử dụng.
Đặc biệt, việc phát hiện các cặp thuốc có nguy cơ tương tác bất lợi khi khách hàng mua nhiều loại thuốc cùng lúc là cực kỳ quan trọng nhưng lại dễ bị bỏ sót. **PharmaAssist AI Intelligence** ra đời nhằm số hóa các quy trình trên, tích hợp thêm hệ thống kiểm tra tương tác tự động và trợ lý AI để tối ưu hóa quy trình tư vấn và đảm bảo an toàn vận hành ở mức tham khảo.

### 1.2. Mục tiêu dự án

- **Vận hành hiệu quả:** Số hóa toàn bộ quy trình từ quản lý danh mục thuốc, nhập kho, theo dõi tồn kho, đến bán hàng tại quầy (POS) và in hóa đơn.
- **Đảm bảo an toàn (tham khảo):** Tích hợp công cụ tự động kiểm tra tương tác thuốc bằng Rule Engine và Neo4j Knowledge Graph.
- **Hỗ trợ thông minh:** Tích hợp AI Pharmacist Copilot hỗ trợ nhân viên soạn thảo câu hỏi bổ sung và tóm tắt ghi chú tư vấn nhanh chóng.
- **Kiến trúc chuẩn mực:** Thiết kế hệ thống tách biệt rõ ràng giữa Frontend, Backend, Relational Database, Graph Database và AI Provider.

---

## 2. Tính năng hệ thống

Hệ thống được thiết kế phân cấp rõ ràng giữa các tính năng cơ bản (MVP) và các tính năng nâng cao nhằm tạo điểm nhấn kỹ thuật cho đồ án:

### 2.1. Phạm vi cốt lõi (MVP)

- **Quản lý tài khoản & Phân quyền (Auth):** Đăng nhập, đăng xuất và phân quyền truy cập theo 3 vai trò chính: _Admin (Chủ nhà thuốc)_, _Staff (Dược sĩ bán hàng)_, và _Warehouse (Nhân viên kho)_.
- **Quản lý danh mục & Thuốc (Medicines):** Quản lý thông tin thuốc, phân loại danh mục, đơn vị tính, giá bán và trạng thái kinh doanh.
- **Quản lý kho (Inventory):** Theo dõi số lượng tồn kho theo thời gian thực, lập phiếu nhập kho từ nhà cung cấp, hiển thị cảnh báo thuốc sắp hết hàng (Low Stock) hoặc gần hết hạn sử dụng (Near Expiry).
- **Bán hàng tại quầy (Sales POS):** Giao diện POS bán hàng nhanh, tìm kiếm thuốc, thêm vào giỏ hàng, tự động kiểm tra tồn kho (không cho bán vượt tồn).
- **Cảnh báo tương tác thuốc (Drug Interaction Alert - Rule-based):** Khi đơn hàng có từ 2 sản phẩm trở lên, Rule Engine tự động đối chiếu các cặp thuốc trong giỏ hàng với danh sách tương tác mẫu để hiển thị cảnh báo tức thời theo các cấp độ: `LOW`, `MEDIUM`, `HIGH`.
- **Thanh toán & Hóa đơn (Payment & Invoice):** Ghi nhận thanh toán mô phỏng (Tiền mặt/Chuyển khoản) và sinh hóa đơn chi tiết sau khi giao dịch thành công.
- **Báo cáo & Thống kê (Dashboard & Report):** Theo dõi doanh thu, số lượng đơn hàng, và danh sách các loại thuốc bán chạy nhất dành riêng cho Admin.

### 2.2. Phạm vi nâng cao (Advanced Features)

- **AI Pharmacist Copilot:** Tích hợp LLM hỗ trợ dược sĩ tóm tắt cảnh báo tương tác thuốc bằng ngôn ngữ dễ hiểu, gợi ý câu hỏi sàng lọc bệnh nền cho khách hàng.
- **Neo4j Knowledge Graph:** Lưu trữ dữ liệu y khoa mẫu dưới dạng đồ thị (Nodes: Thuốc, Hoạt chất, Nhóm thuốc, Triệu chứng, Bệnh nền; Relationships: `INTERACTS_WITH`, `TREATS_SYMPTOM`, `CAUTION_WITH`).
- **Graph-RAG (Graph Retrieval-Augmented Generation):** Truy xuất thông tin từ Neo4j làm ngữ cảnh (context) đầu vào cho AI sinh câu trả lời chính xác, tránh hiện tượng ảo tưởng (hallucination).
- **AI Guardrail:** Thiết lập bộ lọc prompt và phản hồi đầu ra để đảm bảo AI **không** thực hiện chẩn đoán bệnh hoặc tự ý kê đơn thuốc.
- **AI Audit Log:** Lưu trữ toàn bộ lịch sử tương tác với AI (Prompt, Response, Token, Cost, Model, Status: `SUCCESS`/`BLOCKED`) phục vụ mục đích kiểm toán và quản trị AI.
- **Dự báo tồn kho (Forecast):** Áp dụng công thức tính lượng bán trung bình ngày để ước lượng số ngày còn lại trước khi hết hàng và đưa ra gợi ý nhập thêm.

---

## 3. Kiến trúc hệ thống

Dự án áp dụng kiến trúc đa tầng (N-Tier Architecture) giúp tách biệt vai trò của từng thành phần:

```mermaid
graph TD
    %% Tầng Presentation
    subgraph Presentation_Layer [Presentation Layer]
        A[Admin Web UI]
        B[Staff POS UI]
        C[Warehouse UI]
    end
    %% Tầng Application
    subgraph Application_Layer [Application Layer]
        D[Backend API Gateway / Express or NestJS]
    end
    %% Tầng Business Services
    subgraph Business_Services [Business Services & Rules]
        E[Auth Service]
        F[Medicine Service]
        G[Inventory Service]
        H[Sales POS Service]
        I[Rule Engine - Interaction Check]
        J[AI Orchestrator & Guardrail]
        K[Graph-RAG Service]
    end
    %% Tầng Data & Integration
    subgraph Data_Layer [Data & Integration Layer]
        L[(PostgreSQL / MySQL - Nghiệp vụ)]
        M[(Neo4j Graph Database - Dữ liệu y khoa mẫu)]
        N[AI Providers - Gemini / OpenRouter / Ollama / MockAI]
    end
    %% Kết nối
    Presentation_Layer -->|HTTPS / REST API / JSON| Application_Layer
    Application_Layer --> E & F & G & H & I & J & K
    E & F & G & H --> L
    I --> L
    K --> M
    J --> N
    J -->|Ghi log AI| L
```

### Phân rã chức năng các Service chính:

1.  **Rule Engine:** Tự động tạo các tổ hợp chập 2 từ giỏ hàng để tra cứu nhanh bảng tương tác y khoa mẫu lưu trong RDBMS.
2.  **AI Orchestrator:** Tiếp nhận yêu cầu AI, nạp template prompt, gọi Guardrail xác thực, thực hiện gọi API LLM (hoặc MockAI fallback nếu mất kết nối mạng) và ghi nhận vào AI Audit Log.
3.  **Graph-RAG Service:** Thực hiện truy vấn Cypher đến Neo4j dựa trên danh sách hoạt chất để lấy quan hệ tương tác và bệnh nền, định dạng thành text context gửi kèm prompt cho AI.

---

## 4. Công nghệ sử dụng (Tech Stack đề xuất)

- **Frontend:** React.js / Next.js (TypeScript), Tailwind CSS (hoặc Vanilla CSS để tùy biến giao diện premium).
- **Backend:** Node.js (NestJS / Express) hoặc Java (Spring Boot).
- **Relational Database:** PostgreSQL (khuyên dùng vì hỗ trợ tốt các kiểu dữ liệu phức tạp) hoặc MySQL.
- **Graph Database:** Neo4j (Community Edition / Neo4j Aura Cloud).
- **AI Integration:** LangChain / Vercel AI SDK kết nối qua Gemini API, OpenRouter hoặc Ollama (chạy local offline). Có hỗ trợ **MockAI** tích hợp sẵn để phục vụ demo không phụ thuộc internet.
- **ORM:** Prisma / TypeORM (cho Node.js) hoặc Spring Data JPA (cho Java).

---

## 5. Thiết kế cơ sở dữ liệu quan hệ (Tóm tắt)

Hệ thống sử dụng database quan hệ chứa các nhóm bảng chính sau:
| Nhóm bảng | Tên bảng | Chức năng |
|---|---|---|
| **Phân quyền** | `users`, `roles`, `user_roles` | Quản lý tài khoản, mã hóa mật khẩu, phân quyền. |
| **Danh mục** | `medicines`, `medicine_categories`, `active_ingredients` | Lưu thông tin thuốc, hoạt chất mẫu, danh mục phân loại. |
| **Kho hàng** | `inventories`, `stock_imports`, `stock_import_details`, `suppliers` | Quản lý tồn kho hiện tại, phiếu nhập kho và nhà cung cấp. |
| **Bán hàng** | `orders`, `order_details`, `payments`, `invoices` | Lưu trữ đơn hàng POS, chi tiết đơn, thông tin thanh toán và hóa đơn. |
| **Cảnh báo & AI** | `drug_interactions`, `interaction_alerts`, `ai_logs` | Lưu trữ luật tương tác thuốc mẫu, lịch sử phát sinh cảnh báo và nhật ký gọi AI. |
Sơ đồ ERD quan hệ logic cơ bản:

```text
users --< user_roles >-- roles
medicine_categories --< medicines --< inventories
suppliers --< stock_imports --< stock_import_details >-- medicines
customers --< orders --< order_details >-- medicines
orders -- payments (1-1)
orders -- invoices (1-1)
orders --< interaction_alerts
medicines --< drug_interactions >-- medicines (Thiết lập cặp tương tác)
ai_logs >-- users
```

---

## 6. Hướng dẫn cài đặt & Chạy thử

### 6.1. Cấu hình biến môi trường (`.env`)

Tạo file `.env` tại thư mục backend dựa trên `.env.example`:

```env
# Kết nối Database quan hệ
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pharmaassist?schema=public"
# Bảo mật JWT
JWT_SECRET="pharma_assist_secure_jwt_secret_key_2026"
# Cấu hình AI Provider (Hỗ trợ: MockAI | Gemini | OpenRouter | Ollama)
AI_PROVIDER="MockAI"
AI_API_KEY="your_api_key_here"
# Cấu hình Neo4j Graph Database
NEO4J_URI="bolt://localhost:7687"
NEO4J_USERNAME="neo4j"
NEO4J_PASSWORD="password_demo"
```

### 6.2. Hướng dẫn chạy bằng Docker Compose (Khuyên dùng)

Nếu máy bạn đã cài Docker, bạn có thể khởi động toàn bộ môi trường (PostgreSQL, Neo4j, Backend, Frontend) bằng 1 lệnh duy nhất:

```bash
# Khởi động các container ở chế độ chạy ngầm (detached)
docker compose up -d
# Xem trạng thái các container
docker compose ps
# Xem log của backend
docker compose logs -f backend
```

Để tắt hệ thống:

```bash
docker compose down
```

### 6.3. Hướng dẫn chạy thủ công từng phần (Local)

#### Bước 1: Khởi động Cơ sở dữ liệu

- Tạo database PostgreSQL tên `pharmaassist`.
- _(Tùy chọn)_ Khởi động Neo4j Desktop và tạo cơ sở dữ liệu với mật khẩu tương ứng trong `.env`.

#### Bước 2: Setup và chạy Backend

```bash
cd backend
npm install
# Tạo cấu trúc bảng
npm run migration:run
# Nạp dữ liệu mẫu
npm run seed
# Chạy server ở chế độ dev
npm run start:dev
```

#### Bước 3: Setup và chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

## Truy cập ứng dụng tại địa chỉ mặc định: `http://localhost:5173`.

## 7. Kịch bản Demo chuẩn (Demo Script)

Để buổi bảo vệ đồ án diễn ra mạch lạc, nhóm nên bám sát kịch bản demo sau:

### 7.1. Chuẩn bị dữ liệu Seed mẫu

Hệ thống đi kèm dữ liệu mẫu chuẩn bị sẵn gồm:

- **Tài khoản demo:**
  - Admin: `admin01` / Mật khẩu: `demo123`
  - Bán hàng (Staff): `staff01` / Mật khẩu: `demo123`
  - Nhân viên kho (Warehouse): `warehouse01` / Mật khẩu: `demo123`
- **Thuốc demo:**
  - `MED001` (Thuốc A - Hoạt chất Paracetamol mẫu)
  - `MED002` (Thuốc B - Hoạt chất Ibuprofen mẫu) -> **Có tương tác mức HIGH với MED001**.
  - `MED003` (Thuốc C - Tồn kho thấp: 5 hộp, dưới ngưỡng cảnh báo).
  - `MED004` (Thuốc D - Hạn sử dụng gần kề: hết hạn trong vòng 15 ngày tới).

---

### 7.2. Các bước tiến hành Demo

#### Phần 1: Phân quyền & Quản trị (Vai trò Admin)

1.  Đăng nhập bằng tài khoản `admin01`.
2.  Hiển thị **Dashboard** trực quan hiển thị tổng doanh thu, biểu đồ đơn hàng và thông số hệ thống.
3.  Truy cập trang **Quản lý Thuốc** (Medicine Management) để thực hiện CRUD thuốc mẫu.
4.  Truy cập trang **Báo cáo kinh doanh** (Reports) để xem thống kê doanh thu và thuốc bán chạy.

#### Phần 2: Vận hành kho (Vai trò Warehouse Staff)

1.  Đăng nhập bằng tài khoản `warehouse01`.
2.  Vào trang **Tồn kho** (Inventory). Chỉ ra cho hội đồng thấy:
    - Thuốc `MED003` hiển thị nhãn **Sắp hết hàng (Low Stock)** với màu đỏ cảnh báo.
    - Thuốc `MED004` hiển thị nhãn **Gần hết hạn (Near Expiry)** với cảnh báo màu vàng.
3.  Vào trang **Nhập kho** (Stock Import), tạo một phiếu nhập cho `MED003` để tăng số lượng tồn kho. Xác nhận phiếu và quay lại trang tồn kho để thấy số lượng đã tự động cập nhật.

#### Phần 3: Bán hàng & Cảnh báo tương tác (Vai trò Staff)

1.  Đăng nhập bằng tài khoản `staff01`.
2.  Mở màn hình **Sales POS**.
3.  Tìm kiếm và chọn khách hàng demo `Nguyễn Văn A`.
4.  Thêm thuốc `MED001` vào đơn. Giỏ hàng hiển thị bình thường.
5.  Thêm tiếp thuốc `MED002` vào đơn.
6.  **Hệ thống ngay lập tức hiển thị popup cảnh báo tương tác thuốc (HIGH ALERT):**
    - Tên cặp thuốc tương tác.
    - Cơ chế/Nguy cơ rủi ro mẫu.
    - Khuyến nghị xử lý mẫu.
    - _Disclaimer an toàn đi kèm._
7.  _(Nếu có AI Copilot)_ Bấm nút **AI Pharmacist Copilot**: AI sẽ diễn giải chi tiết cảnh báo này bằng ngôn ngữ dễ hiểu cho bệnh nhân và gợi ý các câu hỏi sàng lọc nhanh.
8.  Dược sĩ nhập ghi chú tư vấn (ví dụ: _"Đã dặn bệnh nhân uống cách nhau 4 tiếng"_).
9.  Bấm **Thanh toán (Payment)** -> Chọn tiền mặt -> Xác nhận thanh toán thành công.
10. Hệ thống hiển thị **Hóa đơn (Invoice)** chi tiết có chứa ghi chú tư vấn. Tồn kho của `MED001` và `MED002` tự động bị trừ đi tương ứng.

#### Phần 4: Kiểm toán AI (Vai trò Admin)

1.  Đăng nhập lại `admin01`.
2.  Vào trang **AI Audit Log**: Chỉ ra lịch sử gọi AI từ luồng POS ở phần trước với thông tin chi tiết về prompt, model và chi phí mô phỏng.

---

### 7.3. Kịch bản dự phòng khi demo gặp sự cố (Backup Plan)

- **Sự cố 1: API AI (Gemini/OpenRouter) bị lỗi mạng hoặc hết hạn mức (Quota):**
  - _Xử lý:_ Vào file `.env` đổi cấu hình thành `AI_PROVIDER="MockAI"`. Hệ thống sẽ tự động chuyển sang cơ chế sinh dữ liệu AI giả lập nội bộ mà không cần kết nối mạng.
- **Sự cố 2: Neo4j Graph Database không kết nối được:**
  - _Xử lý:_ Backend đã được lập trình sẵn cơ chế tự động fallback sang mock graph hoặc truy vấn dữ liệu quan hệ mô phỏng từ PostgreSQL để đảm bảo luồng bán hàng và cảnh báo rule-based không bị gián đoạn.
- **Sự cố 3: Dữ liệu tồn kho bị cạn kiệt sau nhiều lần chạy thử:**
  - _Xử lý:_ Chạy lệnh `npm run seed` ở backend để xóa đơn hàng rác và nạp lại toàn bộ trạng thái tồn kho ban đầu trong 3 giây.

---

## 8. Quản trị rủi ro dự án

| Rủi ro                            | Tác động                                                            | Hướng xử lý / Giảm thiểu                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Phạm vi quá rộng**              | Không hoàn thành kịp tiến độ đồ án                                  | Ưu tiên hoàn thiện tuyệt đối các tính năng MVP cốt lõi (Bán hàng, Kho, Rule-based alert) trước khi bắt tay vào tích hợp AI/Graph. |
| **Rủi ro trách nhiệm y khoa**     | Gây hiểu nhầm hệ thống đưa ra tư vấn y tế thật                      | Luôn hiển thị thông báo miễn trừ trách nhiệm y tế (Disclaimer) tại chân trang POS, modal cảnh báo và kết quả tư vấn AI.           |
| **Thiếu dữ liệu demo**            | Khó thuyết phục giảng viên khi chấm điểm                            | Thiết lập script seed dữ liệu tự động với ít nhất 5 cặp tương tác thuốc điển hình và các trường hợp cảnh báo kho cụ thể.          |
| **Xung đột phiên bản môi trường** | Dự án chạy được trên máy thành viên này nhưng lỗi trên máy chấm bài | Sử dụng Docker Compose để đóng gói toàn bộ môi trường chạy đồng nhất.                                                             |

---

_Chúc các bạn hoàn thành đồ án môn học Công Nghệ Phần Mềm với kết quả cao nhất!_
