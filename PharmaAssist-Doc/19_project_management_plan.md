# 19_PROJECT_MANAGEMENT_PLAN

**Mã tài liệu:** 19_Project_Management_Plan  
**Tên tài liệu:** Project Management Plan  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu kế hoạch quản lý dự án  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, trưởng nhóm, giảng viên hướng dẫn, Scrum Master/Project Manager, Developer, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Project Management Plan** mô tả cách nhóm tổ chức, phân công, lập backlog, chia sprint, theo dõi tiến độ, quản lý rủi ro và chuẩn bị sản phẩm bàn giao cho dự án **PharmaAssist AI Intelligence**.

Đây là tài liệu quan trọng trong đồ án môn **Công Nghệ Phần Mềm** vì thể hiện nhóm có quy trình quản lý dự án rõ ràng, không chỉ tập trung vào lập trình. Dự án PharmaAssist có nhiều nhóm chức năng như đăng nhập, phân quyền, quản lý thuốc, quản lý kho, bán thuốc, thanh toán, hóa đơn, cảnh báo tương tác thuốc, báo cáo, AI Copilot và Knowledge Graph. Nếu không có kế hoạch quản lý phù hợp, nhóm dễ gặp tình trạng phạm vi quá rộng, trễ tiến độ, tài liệu lệch với code hoặc demo không ổn định.

Tài liệu này dùng để:

- Xác định phương pháp quản lý dự án.
- Xác định vai trò của các thành viên.
- Xác định Epic và Product Backlog.
- Chia Sprint và mục tiêu từng Sprint.
- Theo dõi tiến độ bằng Jira, Trello hoặc GitHub Projects.
- Quản lý rủi ro trong quá trình thực hiện.
- Xác định sản phẩm bàn giao theo từng giai đoạn.
- Làm cơ sở đưa vào báo cáo và slide bảo vệ.

---

## 2. Thông tin dự án

| Mục | Nội dung |
|---|---|
| Tên dự án | PharmaAssist AI Intelligence |
| Tên đầy đủ | Website quản lý nhà thuốc thông minh tích hợp cảnh báo tương tác thuốc, AI Copilot và Knowledge Graph |
| Loại dự án | Đồ án môn Công Nghệ Phần Mềm |
| Phương pháp quản lý | Agile/Scrum rút gọn |
| Công cụ quản lý | Jira, Trello hoặc GitHub Projects |
| Công cụ lưu mã nguồn | GitHub |
| Công cụ thiết kế UI | Figma hoặc draw.io |
| Công cụ UML | PlantUML, draw.io |
| Công cụ database diagram | dbdiagram.io, draw.io |
| Trạng thái dự án | Planning / Analysis / Design / Development / Demo |
| Phiên bản mục tiêu | v1.0 MVP |

---

## 3. Phương pháp quản lý

Dự án áp dụng **Agile/Scrum rút gọn** với các sprint ngắn. Nhóm sử dụng Jira, Trello hoặc GitHub Projects để quản lý backlog, task và tiến độ.

### 3.1. Lý do chọn Agile/Scrum rút gọn

| Lý do | Mô tả |
|---|---|
| Phù hợp đồ án sinh viên | Dễ chia việc, dễ theo dõi, không quá nặng quy trình |
| Dễ thay đổi phạm vi | Có thể tách MVP và phần nâng cao |
| Có sản phẩm sau từng sprint | Mỗi sprint có đầu ra cụ thể |
| Dễ demo tiến độ | Có thể trình bày board, backlog, sprint |
| Hỗ trợ làm nhóm | Mỗi thành viên có task rõ ràng |

### 3.2. Quy trình Scrum rút gọn

| Hoạt động | Mô tả | Tần suất |
|---|---|---|
| Product Backlog | Danh sách toàn bộ chức năng, task, bug, tài liệu | Cập nhật liên tục |
| Sprint Planning | Chọn task cho sprint tiếp theo | Đầu sprint |
| Daily/Weekly Check-in | Cập nhật đang làm gì, vướng gì, cần hỗ trợ gì | 2-3 lần/tuần hoặc theo nhóm |
| Sprint Review | Kiểm tra đầu ra sprint | Cuối sprint |
| Sprint Retrospective | Rút kinh nghiệm, điều chỉnh cách làm | Cuối sprint |
| Demo Preparation | Chuẩn bị dữ liệu và kịch bản demo | Sprint cuối |

---

## 4. Vai trò trong nhóm

| Vai trò | Nhiệm vụ chính | Ghi chú |
|---|---|---|
| Project Leader / Scrum Master | Quản lý tiến độ, phân công, tổng hợp báo cáo | Có thể kiêm Backend |
| Business Analyst | Phân tích nghiệp vụ, SRS, use case, user story | Có thể kiêm tài liệu |
| Backend Developer | API, service, auth, rule engine | Phụ trách logic nghiệp vụ |
| Frontend Developer | UI/UX, màn hình, gọi API | Phụ trách trải nghiệm người dùng |
| Database Designer | ERD, schema, migration, seed data | Có thể kiêm backend |
| AI/Graph Developer | MockAI, AI Copilot, Neo4j, Graph-RAG | Phần nâng cao |
| Tester/QA | Test case, test plan, bug report, demo test | Có thể kiêm tài liệu |
| Documentation Owner | Báo cáo, slide, README, demo script | Có thể chia nhiều người |

### 4.1. Phân công mẫu theo 5 thành viên

| Thành viên | Vai trò | Nhiệm vụ chính |
|---|---|---|
| Thành viên 1 | Leader / Backend | Quản lý tiến độ, Auth, User, Sales API |
| Thành viên 2 | Frontend | UI Login, Dashboard, Medicine, Sales POS |
| Thành viên 3 | Database / Inventory | ERD, migration, seed data, Inventory, Stock Import |
| Thành viên 4 | AI/Graph / Rule Engine | Interaction Alert, MockAI, Neo4j, Graph-RAG |
| Thành viên 5 | Tester / Document | Test case, báo cáo, slide, demo script |

### 4.2. Phân công mẫu theo 4 thành viên

| Thành viên | Vai trò | Nhiệm vụ chính |
|---|---|---|
| Thành viên 1 | Leader / Backend | Auth, User, Sales, Payment, quản lý tiến độ |
| Thành viên 2 | Frontend | UI toàn hệ thống, tích hợp API |
| Thành viên 3 | Database / Inventory | ERD, Medicine, Inventory, Stock Import, seed data |
| Thành viên 4 | AI/Graph / Tester / Document | Rule Engine, AI, Graph, test case, báo cáo |

---

## 5. Công cụ quản lý dự án

| Công cụ | Mục đích |
|---|---|
| Jira | Quản lý Epic, Story, Task, Sprint, trạng thái |
| Trello | Quản lý board đơn giản nếu không dùng Jira |
| GitHub Projects | Quản lý task gắn với issue/pull request |
| GitHub | Lưu source code, quản lý branch, pull request |
| Figma | Thiết kế giao diện/wireframe |
| PlantUML | Vẽ UML bằng code |
| dbdiagram.io | Vẽ ERD/database diagram |
| Google Docs/Word | Viết tài liệu báo cáo |
| PowerPoint/Canva | Làm slide bảo vệ |

### 5.1. Khuyến nghị công cụ

Nếu nhóm muốn thể hiện quy trình SE rõ ràng, nên dùng:

- **Jira** cho backlog và sprint.
- **GitHub** cho source code và issue/PR.
- **Figma** cho UI.
- **PlantUML/draw.io** cho UML.
- **dbdiagram.io** cho ERD.

Nếu nhóm muốn đơn giản, có thể dùng GitHub Projects thay Jira.

---

## 6. Epic của dự án

| Epic ID | Tên Epic | Mô tả | Ưu tiên |
|---|---|---|---|
| EPIC-01 | Quản lý người dùng và phân quyền | Đăng nhập, đăng xuất, user, role, RBAC | High |
| EPIC-02 | Quản lý thuốc | CRUD thuốc, danh mục, tìm kiếm thuốc | High |
| EPIC-03 | Quản lý kho | Tồn kho, nhập thuốc, cảnh báo sắp hết/gần hết hạn | High |
| EPIC-04 | Bán thuốc và thanh toán | POS, đơn hàng, thanh toán, hóa đơn | High |
| EPIC-05 | Cảnh báo tương tác thuốc | Rule-based drug interaction alert | High |
| EPIC-06 | AI Copilot | MockAI/provider thật, prompt, guardrail, AI note | Medium |
| EPIC-07 | Neo4j Knowledge Graph | Graph data, Graph Explorer, Graph-RAG | Medium |
| EPIC-08 | Báo cáo và thống kê | Doanh thu, thuốc bán chạy, tồn kho | Medium |
| EPIC-09 | UI/UX | Thiết kế màn hình, wireframe, responsive cơ bản | High |
| EPIC-10 | Kiểm thử và tài liệu | Test case, báo cáo, slide, demo script | High |

---

## 7. Product Backlog mẫu

| Issue Key | Issue Type | Summary | Description | Assignee | Priority | Sprint | Story Point | Status |
|---|---|---|---|---|---|---|---:|---|
| PA-001 | Epic | Auth & Role | Đăng nhập, phân quyền | Member 1 | High | Sprint 1 | 13 | To Do |
| PA-002 | Story | Đăng nhập | User đăng nhập bằng username/password | Member 1 | High | Sprint 1 | 5 | To Do |
| PA-003 | Story | Quản lý thuốc | CRUD thuốc | Member 2 | High | Sprint 2 | 8 | To Do |
| PA-004 | Story | Nhập kho | Tạo phiếu nhập thuốc | Member 3 | High | Sprint 2 | 8 | To Do |
| PA-005 | Story | Tạo đơn bán thuốc | POS bán thuốc | Member 1 | High | Sprint 3 | 8 | To Do |
| PA-006 | Story | Kiểm tra tương tác | Rule-based interaction alert | Member 4 | High | Sprint 3 | 8 | To Do |
| PA-007 | Story | Báo cáo doanh thu | Dashboard report | Member 2 | Medium | Sprint 4 | 5 | To Do |
| PA-008 | Story | AI Copilot | MockAI hoặc provider thật | Member 4 | Medium | Sprint 4 | 8 | To Do |

---

## 8. Product Backlog chi tiết đề xuất

| Issue Key | Issue Type | Epic | Summary | Description | Assignee | Priority | Sprint | Story Point | Status |
|---|---|---|---|---|---|---|---|---:|---|
| PA-001 | Epic | EPIC-01 | Auth & Role | Đăng nhập, đăng xuất, JWT, phân quyền | Member 1 | High | Sprint 1 | 13 | To Do |
| PA-002 | Story | EPIC-01 | Đăng nhập | Là user, tôi muốn đăng nhập để sử dụng hệ thống | Member 1 | High | Sprint 1 | 5 | To Do |
| PA-003 | Task | EPIC-01 | Thiết kế bảng users/roles | Tạo schema users, roles, user_roles | Member 3 | High | Sprint 1 | 3 | To Do |
| PA-004 | Task | EPIC-01 | API /auth/login | Tạo API login trả accessToken | Member 1 | High | Sprint 1 | 3 | To Do |
| PA-005 | Task | EPIC-01 | Middleware phân quyền | Chặn API theo role | Member 1 | High | Sprint 1 | 5 | To Do |
| PA-006 | Story | EPIC-02 | Quản lý thuốc | CRUD thuốc, tìm kiếm, lọc danh mục | Member 2 | High | Sprint 2 | 8 | To Do |
| PA-007 | Story | EPIC-02 | Quản lý danh mục thuốc | CRUD danh mục thuốc | Member 2 | High | Sprint 2 | 5 | To Do |
| PA-008 | Task | EPIC-02 | API /medicines | Tạo API danh sách, thêm, sửa, xóa thuốc | Member 1 | High | Sprint 2 | 5 | To Do |
| PA-009 | Task | EPIC-09 | UI Medicine Management | Tạo màn hình quản lý thuốc | Member 2 | High | Sprint 2 | 5 | To Do |
| PA-010 | Story | EPIC-03 | Quản lý tồn kho | Xem tồn kho, số lượng, hạn dùng | Member 3 | High | Sprint 2 | 8 | To Do |
| PA-011 | Story | EPIC-03 | Nhập kho | Tạo phiếu nhập và cập nhật tồn kho | Member 3 | High | Sprint 2 | 8 | To Do |
| PA-012 | Story | EPIC-03 | Cảnh báo sắp hết | Hiển thị thuốc dưới ngưỡng tồn kho | Member 3 | High | Sprint 2 | 5 | To Do |
| PA-013 | Story | EPIC-03 | Cảnh báo gần hết hạn | Hiển thị thuốc gần hết hạn | Member 3 | High | Sprint 2 | 5 | To Do |
| PA-014 | Story | EPIC-04 | Tạo đơn bán thuốc | Nhân viên tạo đơn tại POS | Member 1 | High | Sprint 3 | 8 | To Do |
| PA-015 | Story | EPIC-04 | Thêm thuốc vào đơn | Kiểm tra tồn kho và thêm thuốc | Member 1 | High | Sprint 3 | 5 | To Do |
| PA-016 | Story | EPIC-05 | Kiểm tra tương tác thuốc | Rule engine kiểm tra cặp thuốc | Member 4 | High | Sprint 3 | 8 | To Do |
| PA-017 | Task | EPIC-05 | Bảng drug_interactions | Tạo schema và seed tương tác mẫu | Member 3 | High | Sprint 3 | 3 | To Do |
| PA-018 | Task | EPIC-09 | UI Interaction Alert Modal | Hiển thị cảnh báo thuốc A/B, severity, mô tả, khuyến nghị | Member 2 | High | Sprint 3 | 5 | To Do |
| PA-019 | Story | EPIC-04 | Thanh toán | Ghi nhận thanh toán mô phỏng | Member 1 | High | Sprint 3 | 5 | To Do |
| PA-020 | Story | EPIC-04 | Hóa đơn | Tạo và xem/in hóa đơn | Member 2 | High | Sprint 3 | 5 | To Do |
| PA-021 | Story | EPIC-08 | Báo cáo doanh thu | Thống kê doanh thu theo ngày/tháng | Member 2 | Medium | Sprint 4 | 5 | To Do |
| PA-022 | Story | EPIC-08 | Thuốc bán chạy | Top thuốc bán chạy | Member 2 | Medium | Sprint 4 | 5 | To Do |
| PA-023 | Story | EPIC-06 | AI Copilot MockAI | Tạo câu hỏi/ghi chú bằng MockAI | Member 4 | Medium | Sprint 4 | 8 | To Do |
| PA-024 | Story | EPIC-06 | AI Guardrail | Chặn chẩn đoán/kê đơn/liều dùng | Member 4 | High | Sprint 4 | 5 | To Do |
| PA-025 | Story | EPIC-06 | AI Audit Log | Lưu log tác vụ AI | Member 4 | Medium | Sprint 4 | 5 | To Do |
| PA-026 | Story | EPIC-07 | Neo4j Graph demo | Tạo graph thuốc/hoạt chất/tương tác mẫu | Member 4 | Medium | Sprint 4 | 8 | To Do |
| PA-027 | Story | EPIC-07 | Graph Explorer UI | Hiển thị node-edge mẫu | Member 2 | Medium | Sprint 4 | 5 | To Do |
| PA-028 | Task | EPIC-10 | Viết test case | Test chức năng chính và edge case | Member 5 | High | Sprint 5 | 8 | To Do |
| PA-029 | Task | EPIC-10 | Chuẩn bị seed data | Dữ liệu demo thuốc, tương tác, khách hàng | Member 3 | High | Sprint 5 | 5 | To Do |
| PA-030 | Task | EPIC-10 | Fix bug demo | Sửa lỗi luồng demo chính | All | High | Sprint 5 | 8 | To Do |
| PA-031 | Task | EPIC-10 | Hoàn thiện báo cáo | Tổng hợp tài liệu và hình ảnh | Member 5 | High | Sprint 6 | 8 | To Do |
| PA-032 | Task | EPIC-10 | Làm slide bảo vệ | Slide giới thiệu, phân tích, thiết kế, demo | Member 5 | High | Sprint 6 | 5 | To Do |
| PA-033 | Task | EPIC-10 | Viết demo script | Kịch bản trình bày từng bước | Member 5 | High | Sprint 6 | 5 | To Do |

---

## 9. Quy ước Jira Issue

### 9.1. Issue Type

| Issue Type | Ý nghĩa | Ví dụ |
|---|---|---|
| Epic | Nhóm chức năng lớn | Quản lý thuốc |
| Story | Chức năng theo góc nhìn người dùng | Là nhân viên, tôi muốn tạo đơn bán thuốc |
| Task | Công việc kỹ thuật hoặc tài liệu | Tạo bảng medicines |
| Sub-task | Công việc con của story/task | Tạo form thêm thuốc |
| Bug | Lỗi cần sửa | Không hiển thị cảnh báo tương tác |

### 9.2. Priority

| Priority | Ý nghĩa |
|---|---|
| High | Bắt buộc cho MVP hoặc demo chính |
| Medium | Nên có nếu đủ thời gian |
| Low | Có thể làm sau |

### 9.3. Status workflow

| Status | Ý nghĩa |
|---|---|
| To Do | Chưa làm |
| In Progress | Đang làm |
| In Review | Đang review code/tài liệu |
| Testing | Đang kiểm thử |
| Done | Hoàn thành |
| Blocked | Bị chặn do phụ thuộc/lỗi |
| Deferred | Để sau |

---

## 10. Sprint Plan

| Sprint | Mục tiêu | Công việc chính | Đầu ra |
|---|---|---|---|
| Sprint 0 | Khởi động | Chốt đề tài, phạm vi, công nghệ | Charter, Scope, Backlog |
| Sprint 1 | Phân tích/setup | SRS, ERD, repo, auth | Tài liệu + Auth base |
| Sprint 2 | Thuốc/kho | Medicine, Category, Inventory | Module thuốc/kho |
| Sprint 3 | Bán hàng | Order, Payment, Invoice, Interaction | POS hoạt động |
| Sprint 4 | Nâng cao | AI, Graph, Report | AI/Graph demo |
| Sprint 5 | Kiểm thử | Test, sửa lỗi, seed data | Demo ổn định |
| Sprint 6 | Bảo vệ | Slide, báo cáo, demo script | Hồ sơ hoàn chỉnh |

---

## 11. Sprint 0 - Khởi động dự án

### 11.1. Mục tiêu

Chốt đề tài, mục tiêu, phạm vi MVP, công nghệ dự kiến và cách quản lý dự án.

### 11.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| Chốt tên đề tài | Leader | Project Charter |
| Xác định actor và stakeholder | BA/Document | Stakeholder list |
| Xác định phạm vi MVP | Cả nhóm | MVP Scope |
| Xác định phần nâng cao | Cả nhóm | AI/Graph scope |
| Tạo board Jira/Trello/GitHub Projects | Leader | Project board |
| Tạo epic ban đầu | Leader/BA | Epic list |

### 11.3. Sản phẩm đầu ra

- Project Charter.
- Vision & Scope.
- Epic list.
- Product Backlog bản đầu.
- Repository GitHub.
- Quy ước làm việc nhóm.

---

## 12. Sprint 1 - Phân tích và setup nền tảng

### 12.1. Mục tiêu

Hoàn thiện tài liệu phân tích cốt lõi, thiết kế database sơ bộ, setup source code và triển khai Auth base.

### 12.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| Viết SRS | BA/Document | SRS v1.0 |
| Thiết kế ERD sơ bộ | Database Designer | ERD v1.0 |
| Setup frontend/backend repo | Backend/Frontend | Source base |
| Setup database local | Database Designer | DB connection |
| Tạo bảng users/roles | Backend/DB | Migration |
| Triển khai login API | Backend | POST /auth/login |
| Thiết kế Login UI | Frontend | Login screen |
| Tạo tài khoản demo | Backend/DB | admin01/staff01/warehouse01 |

### 12.3. Đầu ra Sprint 1

- SRS bản đầu.
- ERD bản đầu.
- Repository có cấu trúc thư mục.
- Login UI + Auth API hoạt động cơ bản.
- Seed tài khoản demo.

---

## 13. Sprint 2 - Thuốc và kho

### 13.1. Mục tiêu

Triển khai quản lý thuốc, danh mục, tồn kho, nhập thuốc và cảnh báo kho.

### 13.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| API quản lý thuốc | Backend | /medicines |
| UI quản lý thuốc | Frontend | Medicine Management |
| API danh mục thuốc | Backend | /categories |
| UI danh mục thuốc | Frontend | Category Management |
| Bảng inventories | DB | Migration |
| API xem tồn kho | Backend | /inventories |
| UI Inventory | Frontend | Inventory screen |
| API nhập kho | Backend | /stock-imports |
| UI Stock Import | Frontend | Stock Import screen |
| Cảnh báo sắp hết | Backend/Frontend | Low stock alert |
| Cảnh báo gần hết hạn | Backend/Frontend | Near expiry alert |

### 13.3. Đầu ra Sprint 2

- CRUD thuốc.
- CRUD danh mục.
- Xem tồn kho.
- Nhập thuốc.
- Hiển thị thuốc sắp hết.
- Hiển thị thuốc gần hết hạn.

---

## 14. Sprint 3 - Bán hàng, thanh toán và tương tác thuốc

### 14.1. Mục tiêu

Hoàn thiện luồng demo chính: tạo đơn bán thuốc, kiểm tra tồn kho, kiểm tra tương tác thuốc, thanh toán và hóa đơn.

### 14.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| API tạo đơn hàng | Backend | POST /orders |
| UI Sales POS | Frontend | Sales POS screen |
| API thêm thuốc vào đơn | Backend | POST /orders/{id}/items |
| Kiểm tra tồn kho khi bán | Backend | Stock validation |
| Bảng drug_interactions | DB | Migration + seed |
| Rule Engine tương tác | AI/Graph/Backend | Interaction check |
| Interaction Alert Modal | Frontend | Modal cảnh báo |
| API thanh toán | Backend | POST /orders/{id}/pay |
| UI Payment | Frontend | Payment screen |
| API hóa đơn | Backend | GET /orders/{id}/invoice |
| UI Invoice | Frontend | Invoice screen |

### 14.3. Đầu ra Sprint 3

- Sales POS hoạt động.
- Cảnh báo tương tác MED001-MED002 mức HIGH hoạt động.
- Thanh toán mô phỏng hoạt động.
- Hóa đơn tạo được sau thanh toán.
- Luồng demo chính chạy được.

---

## 15. Sprint 4 - Nâng cao: AI, Graph, Report

### 15.1. Mục tiêu

Bổ sung các chức năng nâng cao để tăng điểm kỹ thuật và hoàn thiện phần báo cáo.

### 15.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| Dashboard report | Backend/Frontend | Dashboard |
| Báo cáo doanh thu | Backend/Frontend | Revenue report |
| Thuốc bán chạy | Backend/Frontend | Top medicines |
| MockAI | AI Developer | MockAI service |
| AI Copilot UI | Frontend | AI Copilot screen |
| AI Guardrail | AI Developer | Guardrail rules |
| AI Audit Log | Backend/AI | ai_logs |
| Neo4j seed data | AI/Graph Developer | Graph demo data |
| Graph API | Backend/Graph | /graph/* |
| Graph Explorer UI | Frontend | Graph screen |
| Graph-RAG mock | AI/Graph Developer | Context + AI explanation |

### 15.3. Đầu ra Sprint 4

- Báo cáo cơ bản.
- AI Copilot mock hoặc provider thật.
- Guardrail hoạt động cơ bản.
- AI Audit Log.
- Graph Explorer hoặc mock graph.
- Graph-RAG demo nếu đủ thời gian.

---

## 16. Sprint 5 - Kiểm thử và ổn định demo

### 16.1. Mục tiêu

Kiểm thử toàn bộ luồng chính, sửa lỗi, hoàn thiện dữ liệu demo và chuẩn bị demo ổn định.

### 16.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| Viết test case | Tester | Test Case Document |
| Test Auth/Role | Tester | Bug list |
| Test Medicine/Inventory | Tester | Bug list |
| Test Sales/Payment/Invoice | Tester | Bug list |
| Test Interaction Alert | Tester/AI Developer | Bug list |
| Test AI/Graph | Tester/AI Developer | Bug list |
| Seed data final | DB Developer | Demo data stable |
| Fix bug | Cả nhóm | Demo ổn định |
| Viết README | Document/Leader | README |

### 16.3. Đầu ra Sprint 5

- Test case hoàn chỉnh.
- Bug chính được sửa.
- Seed data ổn định.
- README chạy project.
- Demo chính chạy mượt.

---

## 17. Sprint 6 - Báo cáo và bảo vệ

### 17.1. Mục tiêu

Hoàn thiện báo cáo, slide, demo script và luyện trình bày.

### 17.2. Công việc chính

| Công việc | Người phụ trách | Đầu ra |
|---|---|---|
| Tổng hợp báo cáo | Document Owner | Báo cáo cuối |
| Chèn UML/ERD/UI vào báo cáo | BA/UI/DB | Hình ảnh thiết kế |
| Làm slide | Document/Leader | Slide bảo vệ |
| Viết demo script | Tester/Leader | Demo script |
| Chuẩn bị tài khoản demo | DB/Tester | Demo checklist |
| Luyện demo | Cả nhóm | Kịch bản ổn định |
| Chốt phiên bản source | Leader | Release tag nếu có |

### 17.3. Đầu ra Sprint 6

- Báo cáo hoàn chỉnh.
- Slide bảo vệ.
- Demo script.
- Dữ liệu demo.
- Source code ổn định.
- Checklist trước khi bảo vệ.

---

## 18. Definition of Ready và Definition of Done

## 18.1. Definition of Ready

Một task/story được đưa vào sprint khi:

| Điều kiện | Mô tả |
|---|---|
| Có mô tả rõ | Summary và description đủ hiểu |
| Có priority | High/Medium/Low |
| Có assignee | Có người phụ trách |
| Có acceptance criteria | Biết khi nào hoàn thành |
| Có dependency rõ | Biết phụ thuộc task nào |
| Có estimate | Có story point hoặc ước lượng công |

## 18.2. Definition of Done

Một task/story được xem là Done khi:

| Điều kiện | Mô tả |
|---|---|
| Code hoàn thành | Chức năng hoạt động theo yêu cầu |
| Có kiểm tra quyền | API/màn hình đúng role |
| Có validation | Dữ liệu đầu vào được kiểm tra |
| Có xử lý lỗi | Lỗi hiển thị rõ ràng |
| Có test cơ bản | Đã test luồng chính |
| Không phá luồng demo | Demo chính vẫn chạy |
| Tài liệu cập nhật | API/RTM/test case cập nhật nếu cần |
| Pull request được review | Nếu nhóm dùng PR |

---

## 19. Quản lý GitHub

### 19.1. Branching strategy đề xuất

| Branch | Mục đích |
|---|---|
| main | Code ổn định, dùng demo |
| develop | Tích hợp tính năng đang phát triển |
| feature/auth-login | Tính năng đăng nhập |
| feature/medicine-management | Quản lý thuốc |
| feature/sales-pos | POS bán thuốc |
| feature/interaction-alert | Cảnh báo tương tác |
| feature/ai-copilot | AI Copilot |
| feature/graph-explorer | Graph Explorer |
| bugfix/... | Sửa lỗi |

### 19.2. Quy tắc commit

| Prefix | Ý nghĩa | Ví dụ |
|---|---|---|
| feat | Thêm chức năng | feat: add login api |
| fix | Sửa lỗi | fix: prevent selling over stock |
| docs | Tài liệu | docs: update api specification |
| refactor | Refactor code | refactor: split rule engine service |
| test | Test | test: add sales test cases |
| chore | Cấu hình/phụ trợ | chore: update env example |

### 19.3. Quy tắc bảo mật GitHub

- Không commit `.env` thật.
- Không commit API key, token, mật khẩu thật.
- Có file `.env.example`.
- Không commit dữ liệu khách hàng thật.
- Không commit log chứa secret.
- Review code trước khi merge vào main.

---

## 20. Quản lý tài liệu

| Nhóm tài liệu | Người phụ trách | Ghi chú |
|---|---|---|
| Project overview/charter/scope | Leader/Document | Sprint 0-1 |
| SRS/BRD/Use Case | BA/Document | Sprint 1 |
| UML/Architecture/Module | System Analyst/Backend | Sprint 1-2 |
| Database/API | Backend/DB | Sprint 2 |
| UI/UX | Frontend/UI | Sprint 2-3 |
| AI/Graph | AI/Graph Developer | Sprint 4 |
| Test case/Test plan | Tester | Sprint 5 |
| Demo data/Demo script | Tester/Leader | Sprint 5-6 |
| Báo cáo/Slide | Document Owner | Sprint 6 |

### 20.1. Quy tắc cập nhật tài liệu

| Quy tắc | Mô tả |
|---|---|
| Tài liệu phải khớp code | API, database, UI phải cập nhật khi code đổi |
| RTM phải được cập nhật | Khi thêm/bỏ yêu cầu phải sửa RTM |
| Feature Matrix phải phản ánh trạng thái thật | Done/Mocked/Deferred rõ ràng |
| Demo script phải khớp dữ liệu seed | Tránh demo sai dữ liệu |
| Báo cáo phải có disclaimer | Với cảnh báo thuốc/AI/Graph |

---

## 21. Quản lý rủi ro

## 21.1. Risk List

| Rủi ro | Mức độ | Cách xử lý |
|---|---|---|
| Phạm vi quá rộng | Cao | Chia MVP và nâng cao |
| AI API lỗi | Cao | Chuẩn bị MockAI |
| Neo4j khó tích hợp | Trung bình | Làm graph demo đơn giản hoặc mock graph |
| Thiếu dữ liệu demo | Trung bình | Chuẩn bị seed data sớm |
| Trễ tiến độ | Cao | Ưu tiên must-have |
| Code và tài liệu lệch nhau | Cao | Dùng Feature Matrix và RTM |

## 21.2. Risk List chi tiết

| Risk ID | Rủi ro | Mức độ | Khả năng xảy ra | Tác động | Dấu hiệu nhận biết | Cách xử lý |
|---|---|---|---|---|---|---|
| R-01 | Phạm vi quá rộng | Cao | Cao | Không hoàn thành MVP | Nhiều task AI/Graph nhưng core chưa xong | Chốt MVP trước, AI/Graph làm mock hoặc deferred |
| R-02 | AI API lỗi/hết quota | Cao | Trung bình | Không demo được AI | API timeout, lỗi key, hết quota | MockAI fallback, không phụ thuộc provider thật |
| R-03 | Neo4j khó tích hợp | Trung bình | Trung bình | Không demo được graph | Lỗi cài đặt, query không chạy | Chuẩn bị mock graph JSON hoặc Cypher seed đơn giản |
| R-04 | Thiếu dữ liệu demo | Trung bình | Cao | Demo không ra cảnh báo | Không có interaction, tồn kho sai | Chuẩn bị seed data từ Sprint 5, có checklist |
| R-05 | Trễ tiến độ | Cao | Cao | Không kịp báo cáo/demo | Nhiều task In Progress kéo dài | Ưu tiên High, bỏ bớt Could-have |
| R-06 | Code và tài liệu lệch nhau | Cao | Trung bình | Báo cáo bị thiếu nhất quán | API khác tài liệu, bảng DB khác ERD | Cập nhật RTM, API spec, DB design sau mỗi sprint |
| R-07 | Merge conflict GitHub | Trung bình | Trung bình | Mất thời gian sửa code | Nhiều người sửa cùng file | Dùng branch riêng và pull thường xuyên |
| R-08 | UI quá phức tạp | Trung bình | Trung bình | Không kịp frontend | Nhiều màn hình chưa xong | Tập trung UI demo chính trước |
| R-09 | Test không đủ | Cao | Trung bình | Demo lỗi | Luồng bán hàng chưa test đủ | Test kịch bản demo nhiều lần |
| R-10 | Thành viên bận/không hoàn thành task | Cao | Trung bình | Trễ tiến độ | Task không cập nhật nhiều ngày | Chia task nhỏ, review tiến độ thường xuyên |
| R-11 | Lộ API key/secret | Cao | Thấp/Trung bình | Rủi ro bảo mật | Commit .env hoặc key lên GitHub | Dùng .env, .gitignore, .env.example |
| R-12 | AI output vượt phạm vi | Cao | Trung bình | Rủi ro an toàn | AI trả lời chẩn đoán/kê đơn | Guardrail, prompt an toàn, disclaimer |

---

## 22. Quản lý chất lượng

### 22.1. Tiêu chí chất lượng MVP

| Tiêu chí | Mô tả |
|---|---|
| Chạy được luồng chính | Login → Sales POS → Interaction Alert → Payment → Invoice |
| Không bán vượt tồn | Hệ thống chặn số lượng vượt tồn |
| Cảnh báo tương tác hoạt động | MED001 + MED002 hiển thị HIGH |
| Tồn kho/cảnh báo kho hoạt động | MED003 sắp hết, MED004 gần hết hạn |
| Phân quyền đúng | Admin/Staff/Warehouse thấy đúng chức năng |
| Dữ liệu demo ổn định | Seed data có thể reset |
| Tài liệu đầy đủ | Có SRS, UML, ERD, API, Test, Demo |
| An toàn AI | Không chẩn đoán/kê đơn, có disclaimer |

### 22.2. Review checklist theo sprint

| Câu hỏi | Có/Không |
|---|---|
| Sprint có mục tiêu rõ không? |  |
| Task có assignee không? |  |
| Task High priority có được ưu tiên không? |  |
| Có task nào bị blocked không? |  |
| Demo chính còn chạy được không? |  |
| Tài liệu có cập nhật theo code không? |  |
| Có bug nghiêm trọng chưa xử lý không? |  |
| Có cần giảm phạm vi không? |  |

---

## 23. Kế hoạch kiểm thử liên quan quản lý dự án

| Giai đoạn | Hoạt động kiểm thử | Người phụ trách |
|---|---|---|
| Sprint 1 | Test login, phân quyền | Tester/Backend |
| Sprint 2 | Test thuốc, danh mục, tồn kho, nhập kho | Tester/DB/Frontend |
| Sprint 3 | Test bán hàng, tương tác, thanh toán, hóa đơn | Tester/Cả nhóm |
| Sprint 4 | Test báo cáo, AI, Graph | Tester/AI Developer |
| Sprint 5 | Regression test toàn hệ thống | Tester/Cả nhóm |
| Sprint 6 | Test demo script | Cả nhóm |

---

## 24. Kế hoạch bàn giao sản phẩm

| Sản phẩm bàn giao | Nội dung | Sprint hoàn thành |
|---|---|---|
| Source code | Frontend, backend, database migration | Sprint 5-6 |
| Database script | Schema, migration, seed data | Sprint 5 |
| Tài liệu phân tích | BRD, SRS, Scope, RTM | Sprint 1-2 |
| Tài liệu thiết kế | Architecture, Module, API, Database, UML | Sprint 2-4 |
| Tài liệu AI/Graph | AI Architecture, Guardrail, Neo4j Design | Sprint 4 |
| Tài liệu kiểm thử | Test Plan, Test Case, Bug Report | Sprint 5 |
| Demo data | Tài khoản, thuốc, tương tác, khách hàng | Sprint 5 |
| Báo cáo | Báo cáo đồ án hoàn chỉnh | Sprint 6 |
| Slide | Slide bảo vệ | Sprint 6 |
| Demo script | Kịch bản demo từng bước | Sprint 6 |

---

## 25. Tiêu chí thành công dự án

| Tiêu chí | Mô tả |
|---|---|
| Hoàn thành MVP | Có đủ Auth, Medicine, Inventory, Sales, Interaction, Payment, Invoice |
| Demo luồng chính ổn định | Bán thuốc có cảnh báo tương tác và hóa đơn thành công |
| Tài liệu đầy đủ | Có phân tích, thiết kế, quản lý dự án, kiểm thử |
| Có điểm nhấn kỹ thuật | Rule-based interaction, AI Copilot/MockAI, Neo4j/Graph nếu có |
| Có dữ liệu demo | Tài khoản, thuốc, tương tác, khách hàng, AI log |
| Có kiểm thử | Test case cho chức năng chính và rủi ro |
| An toàn | Có disclaimer, guardrail, không kê đơn/chẩn đoán |
| Trình bày rõ | Slide và demo script dễ hiểu |

---

## 26. Checklist trước khi bảo vệ

| Hạng mục | Có/Không |
|---|---|
| Source code chạy được trên máy demo chưa? |  |
| Database đã seed dữ liệu demo chưa? |  |
| Tài khoản admin01/staff01/warehouse01 đăng nhập được chưa? |  |
| Sales POS bán MED001 + MED002 có cảnh báo HIGH chưa? |  |
| Thanh toán và hóa đơn hoạt động chưa? |  |
| MED003 hiển thị sắp hết chưa? |  |
| MED004 hiển thị gần hết hạn chưa? |  |
| AI Copilot/MockAI chạy được chưa? |  |
| AI Audit Log có dữ liệu chưa? |  |
| Graph Explorer/Mock Graph chạy được chưa? |  |
| Báo cáo doanh thu có dữ liệu chưa? |  |
| Test case đã hoàn thành chưa? |  |
| Báo cáo đã chèn UML/ERD/UI chưa? |  |
| Slide đã hoàn thiện chưa? |  |
| Demo script đã luyện chưa? |  |
| Có phương án dự phòng nếu AI/Neo4j lỗi chưa? |  |

---

## 27. Kết luận

Tài liệu **Project Management Plan** đã mô tả cách nhóm quản lý dự án **PharmaAssist AI Intelligence** theo Agile/Scrum rút gọn. Tài liệu bao gồm phương pháp quản lý, vai trò thành viên, công cụ sử dụng, danh sách Epic, Product Backlog, Sprint Plan, quy ước Jira, quản lý GitHub, quản lý tài liệu, quản lý rủi ro, quản lý chất lượng và checklist trước khi bảo vệ.

Trong quá trình triển khai, nhóm cần ưu tiên MVP trước, đặc biệt là luồng bán thuốc có cảnh báo tương tác, thanh toán và hóa đơn. Các phần AI Copilot, Neo4j Knowledge Graph và Graph-RAG nên được xem là phần nâng cao, có thể triển khai thật hoặc mô phỏng bằng MockAI/Mock Graph để đảm bảo demo ổn định.

Việc duy trì Product Backlog, Sprint Plan, Feature Matrix và RTM sẽ giúp nhóm kiểm soát tiến độ, tránh lệch tài liệu với code và đảm bảo sản phẩm cuối cùng có tính nhất quán.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

