# PharmaAssist AI Intelligence

**PharmaAssist AI Intelligence** là website quản lý nhà thuốc thông minh, hỗ trợ các nghiệp vụ như quản lý thuốc, quản lý tồn kho, nhập thuốc, bán thuốc tại quầy, thanh toán, hóa đơn, cảnh báo tương tác thuốc và báo cáo vận hành.

Dự án được thực hiện trong phạm vi môn **Công Nghệ Phần Mềm**, tập trung vào quy trình phân tích, thiết kế, phát triển, kiểm thử và demo hệ thống phần mềm.

> **Lưu ý an toàn:**  
> Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.

---

## 1. Mục tiêu dự án

PharmaAssist AI Intelligence hướng đến việc hỗ trợ nhà thuốc nhỏ và vừa:

- Quản lý thông tin thuốc tập trung.
- Theo dõi tồn kho và hạn sử dụng.
- Hỗ trợ bán thuốc tại quầy nhanh hơn.
- Kiểm tra tồn kho khi bán.
- Cảnh báo thuốc sắp hết hàng.
- Cảnh báo thuốc gần hết hạn.
- Cảnh báo tương tác thuốc bằng dữ liệu mẫu.
- Ghi nhận thanh toán và tạo hóa đơn.
- Quản lý khách hàng cơ bản.
- Thống kê doanh thu, thuốc bán chạy và tồn kho.
- Mở rộng với AI Copilot, Guardrail, Audit Log và Knowledge Graph nếu đủ thời gian.

---

## 2. Chức năng chính

### 2.1. Chức năng MVP

- Đăng nhập, đăng xuất.
- Phân quyền theo vai trò.
- Quản lý tài khoản người dùng.
- Quản lý thuốc.
- Quản lý danh mục thuốc.
- Quản lý khách hàng.
- Quản lý nhà cung cấp.
- Nhập thuốc.
- Quản lý tồn kho.
- Cảnh báo thuốc sắp hết.
- Cảnh báo thuốc gần hết hạn.
- Tạo đơn bán thuốc.
- Thêm thuốc vào đơn hàng.
- Kiểm tra tồn kho khi bán.
- Kiểm tra tương tác thuốc rule-based.
- Hiển thị cảnh báo tương tác thuốc.
- Ghi chú tư vấn.
- Thanh toán mô phỏng.
- Tạo và xem/in hóa đơn.
- Xem lịch sử bán hàng.
- Báo cáo doanh thu.
- Báo cáo thuốc bán chạy.
- Dashboard tổng quan.

### 2.2. Chức năng nâng cao

- AI Pharmacist Copilot.
- MockAI fallback để demo ổn định.
- AI Guardrail.
- AI Audit Log.
- Neo4j Knowledge Graph.
- Graph Explorer.
- Graph-RAG.
- Forecast tồn kho nếu có thời gian.

---

## 3. Vai trò người dùng

| Vai trò               | Mô tả                                                                   |
| --------------------- | ----------------------------------------------------------------------- |
| Admin / Chủ nhà thuốc | Quản lý toàn hệ thống, người dùng, thuốc, danh mục, báo cáo, cấu hình   |
| Nhân viên nhà thuốc   | Bán thuốc, tạo đơn hàng, xem cảnh báo tương tác, thanh toán, in hóa đơn |
| Nhân viên kho         | Nhập thuốc, cập nhật tồn kho, theo dõi thuốc sắp hết và gần hết hạn     |
| Khách hàng            | Người mua thuốc tại nhà thuốc, không bắt buộc đăng nhập trong MVP       |

---

## 4. Điểm nổi bật của hệ thống

### Rule-based Drug Interaction Alert

Khi nhân viên thêm từ 2 thuốc trở lên vào đơn hàng, hệ thống kiểm tra dữ liệu trong bảng `drug_interactions`.

Nếu phát hiện tương tác thuốc, hệ thống hiển thị:

- Tên thuốc thứ nhất.
- Tên thuốc thứ hai.
- Mức độ cảnh báo: `LOW`, `MEDIUM`, `HIGH`.
- Mô tả nguy cơ.
- Khuyến nghị xử lý mẫu.
- Khu vực nhập ghi chú tư vấn.

Dữ liệu tương tác thuốc trong dự án là **dữ liệu mẫu phục vụ đồ án**, không phải dữ liệu y khoa thật.

---

## 5. Kiến trúc tổng quan

Hệ thống được thiết kế theo mô hình web nhiều tầng:

```text
Frontend Web
    |
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
    +-- Rule Engine Service
    +-- Report Service
    +-- AI Service / MockAI
    +-- Graph Service / Mock Graph
    +-- Audit Service
    |
    v
Database
    |
    +-- Relational Database
    +-- Neo4j Graph Database optional
```

---

## 6. Công nghệ sử dụng

> Có thể điều chỉnh phần này theo công nghệ thực tế của nhóm.

### Frontend

- ReactJS hoặc Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Chart library cho dashboard/report

### Backend

- Node.js với NestJS hoặc ExpressJS
- RESTful API
- JWT Authentication
- Role-based Authorization
- Rule Engine xử lý tương tác thuốc

### Database

- PostgreSQL hoặc MySQL
- Prisma ORM hoặc TypeORM
- Neo4j cho Knowledge Graph nếu triển khai phần nâng cao

### DevOps / Tools

- GitHub
- Docker optional
- Jira / Trello / GitHub Projects
- Figma
- PlantUML
- dbdiagram.io
- Postman

---

## 7. Cấu trúc thư mục đề xuất

```text
pharmaassist-ai-intelligence/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── medicines/
│   │   ├── categories/
│   │   ├── inventory/
│   │   ├── stock-imports/
│   │   ├── customers/
│   │   ├── sales/
│   │   ├── payments/
│   │   ├── invoices/
│   │   ├── interactions/
│   │   ├── reports/
│   │   ├── ai/
│   │   ├── graph/
│   │   └── audit-logs/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── requirement/
│   ├── uml/
│   ├── database/
│   ├── api/
│   ├── testing/
│   └── demo/
│
├── docker-compose.yml
└── README.md
```

---

## 8. Cài đặt và chạy dự án

### 8.1. Yêu cầu môi trường

- Node.js 18+
- npm hoặc yarn
- PostgreSQL hoặc MySQL
- Neo4j optional nếu chạy Knowledge Graph
- Git

---

### 8.2. Clone repository

```bash
git clone https://github.com/your-team/pharmaassist-ai-intelligence.git
cd pharmaassist-ai-intelligence
```

---

### 8.3. Cấu hình Backend

```bash
cd backend
npm install
cp .env.example .env
```

Cấu hình file `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/pharmaassist"

JWT_SECRET="change_me_in_local"

AI_PROVIDER=MockAI
OPENAI_API_KEY=

NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
```

Chạy migration và seed data:

```bash
npm run migrate
npm run seed
```

Chạy backend:

```bash
npm run start:dev
```

Backend mặc định chạy tại:

```text
http://localhost:3000
```

---

### 8.4. Cấu hình Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Cấu hình file `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Chạy frontend:

```bash
npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

---

## 9. Tài khoản demo

| Vai trò             | Username    | Password |
| ------------------- | ----------- | -------- |
| Admin               | admin01     | demo123  |
| Nhân viên nhà thuốc | staff01     | demo123  |
| Nhân viên kho       | warehouse01 | demo123  |

---

## 10. Dữ liệu demo gợi ý

| Mã thuốc | Mục đích demo                                       |
| -------- | --------------------------------------------------- |
| MED001   | Thuốc mẫu dùng trong luồng bán hàng                 |
| MED002   | Thuốc mẫu dùng để tạo cảnh báo tương tác với MED001 |
| MED003   | Thuốc có tồn kho thấp để demo cảnh báo sắp hết      |
| MED004   | Thuốc gần hết hạn để demo cảnh báo hạn sử dụng      |
| MED005   | Thuốc thường, không có cảnh báo đặc biệt            |

Tình huống demo chính:

```text
1. Đăng nhập bằng tài khoản staff01.
2. Vào màn hình Sales POS.
3. Tạo đơn bán thuốc mới.
4. Thêm MED001 vào đơn hàng.
5. Thêm MED002 vào đơn hàng.
6. Hệ thống hiển thị cảnh báo tương tác thuốc mức HIGH.
7. Nhân viên nhập ghi chú tư vấn.
8. Tiến hành thanh toán.
9. Hệ thống tạo hóa đơn.
10. Kiểm tra tồn kho đã được cập nhật.
```

---

## 11. API chính

| Nhóm         | Endpoint mẫu                           | Mô tả                              |
| ------------ | -------------------------------------- | ---------------------------------- |
| Auth         | `POST /auth/login`                     | Đăng nhập                          |
| Auth         | `GET /auth/me`                         | Lấy thông tin người dùng hiện tại  |
| Medicine     | `GET /medicines`                       | Danh sách thuốc                    |
| Medicine     | `POST /medicines`                      | Thêm thuốc                         |
| Inventory    | `GET /inventories`                     | Xem tồn kho                        |
| Inventory    | `GET /inventory/low-stock`             | Danh sách thuốc sắp hết            |
| Inventory    | `GET /inventory/near-expiry`           | Danh sách thuốc gần hết hạn        |
| Stock Import | `POST /stock-imports`                  | Tạo phiếu nhập thuốc               |
| Sales        | `POST /orders`                         | Tạo đơn hàng                       |
| Sales        | `POST /orders/{id}/items`              | Thêm thuốc vào đơn                 |
| Interaction  | `POST /orders/{id}/check-interactions` | Kiểm tra tương tác thuốc           |
| Payment      | `POST /orders/{id}/pay`                | Thanh toán đơn hàng                |
| Invoice      | `GET /orders/{id}/invoice`             | Xem hóa đơn                        |
| Report       | `GET /reports/revenue`                 | Báo cáo doanh thu                  |
| Report       | `GET /reports/top-medicines`           | Báo cáo thuốc bán chạy             |
| AI           | `POST /ai/explain-alert`               | Giải thích cảnh báo bằng AI/MockAI |
| Graph        | `GET /graph/medicine/{id}`             | Xem graph liên quan đến thuốc      |

---

## 12. Business Rules quan trọng

| Mã rule | Nội dung                                                                  |
| ------- | ------------------------------------------------------------------------- |
| BR-01   | Người dùng phải đăng nhập trước khi sử dụng hệ thống                      |
| BR-02   | Người dùng chỉ được truy cập chức năng theo vai trò                       |
| BR-03   | Mã thuốc không được trùng                                                 |
| BR-04   | Giá bán phải lớn hơn hoặc bằng 0                                          |
| BR-05   | Số lượng tồn không được âm                                                |
| BR-06   | Không cho bán thuốc vượt số lượng tồn                                     |
| BR-07   | Thuốc dưới ngưỡng tối thiểu phải hiện cảnh báo sắp hết                    |
| BR-08   | Thuốc gần hết hạn trong X ngày phải hiện cảnh báo                         |
| BR-09   | Đơn hàng phải có ít nhất một thuốc                                        |
| BR-10   | Thanh toán thành công mới được trừ tồn kho                                |
| BR-12   | Hóa đơn chỉ được tạo sau khi thanh toán thành công                        |
| BR-13   | Khi đơn có từ 2 thuốc trở lên, hệ thống kiểm tra tương tác                |
| BR-14   | Nếu có tương tác, hệ thống hiển thị tên thuốc, mức độ, mô tả, khuyến nghị |
| BR-16   | Báo cáo doanh thu chỉ tính đơn đã thanh toán                              |

---

## 13. Safety Rules

- Hệ thống không chẩn đoán bệnh.
- Hệ thống không kê đơn thuốc.
- Cảnh báo thuốc chỉ mang tính tham khảo.
- AI không được đưa hướng dẫn điều trị cụ thể.
- Nội dung AI phải được người dùng kiểm tra trước khi lưu.
- Không lưu thông tin nhạy cảm không cần thiết.
- Không commit API key, token, mật khẩu thật.
- Các tác vụ AI quan trọng nên được ghi log.

---

## 14. Kiểm thử

Các nhóm test chính:

- Auth Test
- Role Permission Test
- Medicine Test
- Inventory Test
- Stock Import Test
- Sales Test
- Drug Interaction Test
- Payment Test
- Invoice Test
- Report Test
- AI Guardrail Test
- Graph Test

Một số test case bắt buộc:

| Test Case   | Mô tả                          | Kết quả mong đợi              |
| ----------- | ------------------------------ | ----------------------------- |
| TC-AUTH-01  | Đăng nhập đúng tài khoản       | Đăng nhập thành công          |
| TC-AUTH-02  | Staff truy cập User Management | Bị chặn quyền                 |
| TC-MED-01   | Thêm thuốc hợp lệ              | Thuốc được tạo                |
| TC-INV-01   | Thuốc dưới ngưỡng tồn          | Hiển thị cảnh báo sắp hết     |
| TC-SALES-01 | Tạo đơn bán thuốc              | Đơn hàng được tạo             |
| TC-SALES-02 | Bán vượt tồn                   | Hệ thống báo lỗi              |
| TC-INT-01   | Thêm MED001 + MED002           | Hiển thị cảnh báo HIGH        |
| TC-PAY-01   | Thanh toán đơn hàng            | Tạo payment và trừ tồn        |
| TC-INVC-01  | Xem hóa đơn                    | Hóa đơn hiển thị đúng         |
| TC-AI-01    | Yêu cầu AI kê đơn              | AI từ chối hoặc nhắc giới hạn |
| TC-GRAPH-01 | Xem graph MED001               | Hiển thị node/edge liên quan  |

---

## 15. Kịch bản demo đề xuất

### Demo MVP

```text
1. Admin đăng nhập.
2. Admin xem Dashboard.
3. Admin xem danh sách thuốc.
4. Nhân viên kho đăng nhập.
5. Nhân viên kho xem thuốc sắp hết và thuốc gần hết hạn.
6. Nhân viên nhà thuốc đăng nhập.
7. Nhân viên tạo đơn bán thuốc.
8. Nhân viên thêm MED001 và MED002.
9. Hệ thống hiển thị cảnh báo tương tác thuốc.
10. Nhân viên nhập ghi chú tư vấn.
11. Nhân viên thanh toán.
12. Hệ thống tạo hóa đơn.
13. Admin xem báo cáo doanh thu và thuốc bán chạy.
```

### Demo nâng cao nếu có

```text
1. Mở AI Copilot.
2. Chọn cảnh báo tương tác thuốc.
3. AI/MockAI giải thích cảnh báo bằng ngôn ngữ dễ hiểu.
4. AI tạo ghi chú tư vấn nháp.
5. Guardrail chặn yêu cầu chẩn đoán hoặc kê đơn.
6. Mở Graph Explorer.
7. Xem quan hệ thuốc - hoạt chất - tương tác.
8. Xem AI Audit Log.
```

---

## 16. Reset dữ liệu demo

Khi demo nhiều lần làm giảm tồn kho hoặc phát sinh dữ liệu rác, có thể reset dữ liệu:

```bash
cd backend
npm run db:reset
npm run seed
```

Checklist sau khi reset:

- Đăng nhập được `admin01`, `staff01`, `warehouse01`.
- Có dữ liệu thuốc MED001 - MED005.
- MED001 + MED002 tạo cảnh báo tương tác HIGH.
- MED003 hiển thị cảnh báo sắp hết hàng.
- MED004 hiển thị cảnh báo gần hết hạn.
- Luồng POS → Alert → Payment → Invoice chạy ổn định.

---

## 17. Trạng thái dự án

| Hạng mục          | Trạng thái         |
| ----------------- | ------------------ |
| Phân tích yêu cầu | Done / In Progress |
| Thiết kế UML      | Done / In Progress |
| Thiết kế database | Done / In Progress |
| Thiết kế API      | Done / In Progress |
| Thiết kế UI/UX    | Done / In Progress |
| Backend MVP       | In Progress        |
| Frontend MVP      | In Progress        |
| Rule Engine       | In Progress        |
| AI/Graph          | Optional / Mocked  |
| Testing           | Planned            |
| Demo              | Planned            |

---

## 18. Tài liệu liên quan

- Project Charter
- Vision and Scope Document
- Business Requirement Document
- Software Requirement Specification
- Actor, Role and Permission Matrix
- Business Rule and Safety Rule Document
- Requirement Traceability Matrix
- System Architecture Document
- Module Design Document
- Database Design Document
- API Specification
- UML Diagram Package
- UI/UX Screen Specification
- AI Architecture and Guardrail Document
- Knowledge Graph and Neo4j Design Document
- Project Management Plan
- Testing, Demo and Setup Guide

---

## 19. Thành viên nhóm

| Thành viên   | Vai trò                                         | Nhiệm vụ chính                                                                                              |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Thành viên 1 | Leader / Backend Developer                      | Quản lý tiến độ, phân công task, Auth, User, Sales, Payment, Invoice                                        |
| Thành viên 2 | Frontend Developer                              | Thiết kế và lập trình UI, Dashboard, Medicine, POS bán thuốc, Invoice, Report                               |
| Thành viên 3 | Database / Inventory Developer                  | ERD, migration, seed data, Medicine, Category, Inventory, Stock Import, Supplier                            |
| Thành viên 4 | Rule Engine / AI-Graph / Tester / Documentation | Interaction Alert, Rule Engine, AI Copilot/MockAI, Graph/Mock Graph, test case, báo cáo, slide, demo script |

---

## 20. Ghi chú bảo mật

- Không commit file `.env`.
- Không commit API key thật.
- Không commit mật khẩu thật.
- Không lưu dữ liệu khách hàng nhạy cảm không cần thiết.
- Không dùng dữ liệu y khoa thật nếu chưa được kiểm chứng.
- Thanh toán trong dự án chỉ là mô phỏng, không tích hợp cổng thanh toán thật trong MVP.

---
