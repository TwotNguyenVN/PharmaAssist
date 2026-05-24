# Working Context - PharmaAssist AI Intelligence

Last updated: 2026-05-24

## Purpose

> [!NOTE]
> **Mục tiêu:** Mô tả ngắn gọn về dự án hiện tại, mục đích của repo và vai trò của file context này đối với AI Agent.
> **Ví dụ:** Dự án PharmaAssist AI Intelligence là hệ thống quản lý nhà thuốc thông minh tích hợp kiểm tra tương tác thuốc (Rule-based) và hỗ trợ AI Copilot.

Dự án phát triển website quản lý nhà thuốc thông minh **PharmaAssist AI Intelligence** phục vụ môn học **Công Nghệ Phần Mềm**. Repo này chứa toàn bộ mã nguồn của hệ thống (Frontend và Backend), tài liệu đặc tả, và các thiết kế liên quan.

---

## Current Truth

> [!NOTE]
> **Mục tiêu:** Ghi lại trạng thái thực tế hiện tại của hệ thống (nhánh Git mặc định, phiên bản release, các cấu hình đang chạy ổn định).
> **Ví dụ:** Trạng thái kết nối Supabase, các service đã chạy thử nghiệm thành công.

- Nhánh chính hiện tại: `main`
- Database: Kết nối trực tiếp với Supabase Cloud PostgreSQL (Project Ref: `opzhotrjpxlldflcnzzq`).
- Jira: Đang đồng bộ hóa với cloud workspace `pharmaassist.atlassian.net` (1 dự án chính: `PAC`).
- **Technology Stack (Đã chốt):**
  - **Frontend:** Next.js (React + TypeScript), Tailwind CSS, Shadcn UI/Lucide Icons.
  - **Backend:** NestJS (Node.js + TypeScript), Prisma ORM, Supabase Auth + JWT Verification (NestJS Guard), class-validator.
  - **Database:** Supabase Cloud PostgreSQL.
  - **Supabase Features (Tận dụng thêm):**
    - **Supabase Auth:** Đăng ký, đăng nhập và quản lý session.
    - **PostgreSQL Triggers & Functions:** Tự động đồng bộ tài khoản từ `auth.users` sang bảng `public.users`.
    - **Supabase Storage:** Lưu trữ hình ảnh thuốc (medicines) và ảnh đơn thuốc (prescriptions).
    - **Supabase Realtime:** Đồng bộ số lượng tồn kho thời gian thực trên giao diện POS và đẩy thông báo hệ thống.
    - **PostgreSQL Extensions (`pg_cron`):** Quét tự động định kỳ hàng ngày để phát hiện và cảnh báo thuốc sắp hết hạn.
  - **AI Integration:** Gemini API (phục vụ tính năng AI Pharmacist Copilot).
- Trạng thái code:
  - Dự án mới khởi tạo cấu trúc tài liệu.
  - Mã nguồn Backend (`backend/`) và Frontend (`frontend/`) đang được chuẩn bị triển khai.

---

## Current Constraints

> [!NOTE]
> **Mục tiêu:** Liệt kê các ràng buộc nghiêm ngặt trong quá trình phát triển (về mặt kỹ thuật hoặc quy trình).
> **Ví dụ:** Ràng buộc về bảo mật, quy tắc commit, hoặc kiểm soát thư viện sử dụng.

- **Quy tắc Git Commit:** Bắt buộc tuân thủ Conventional Commits và phải gắn mã Jira issue key (với dự án PAC hiện tại là `PAC-`).
- **Quy tắc Ngôn ngữ:** Code và comment hoàn toàn bằng tiếng Anh. Phản hồi người dùng bằng tiếng Việt.
- **Bảo mật thông tin:** Tuyệt đối không commit API Keys, mật khẩu, file cấu hình `.env` lên Git.
- **Y khoa:** Hệ thống chỉ mang tính chất tham khảo, không đưa ra chẩn đoán hay chỉ định y khoa thật.

---

## Active Queues

> [!NOTE]
> **Mục tiêu:** Danh sách các đầu việc/ticket Jira hoặc backlog đang hoạt động cần xử lý tiếp theo trong sprint hiện tại.
> **Ví dụ:** Triển khai API đăng nhập, thiết kế database schema, hay dựng layout POS bán hàng.

- [x] Thiết lập khung dự án Backend (NestJS với Prisma ORM). (Đã cấu hình kết nối thành công với Prisma 7, NestJS compile và chạy kết nối DB hoàn tất).
- [x] Thiết lập khung dự án Frontend (React/TypeScript/Tailwind CSS).
- [x] Thiết kế và migration database schema trên Supabase. (Đã chạy migrate thành công migration đầu tiên `init_foundation`).
- [x] Triển khai Xác thực & Phân quyền (Auth & RBAC) cho cả Backend & Frontend (Sprint 1 - PAC-43 đến PAC-50).
- [ ] Triển khai Quản lý nhân viên & thuốc (User & Medicine Management) (Sprint 2 - PAC-51 đến PAC-67).
- [ ] Triển khai Quản lý Tồn kho & Nhập kho (Inventory & Stock Import) (Sprint 3 - PAC-68 đến PAC-84, PAC-87 đến PAC-92).
- [ ] Triển khai Luồng bán hàng POS & Kiểm tra tương tác thuốc (POS Sales & Drug Interaction) (Sprint 4 - PAC-85, PAC-86, PAC-93 đến PAC-110).
- [ ] Báo cáo & Dashboard tổng quan (Reports & Dashboard) (Sprint 5 - PAC-111 đến PAC-120).
- [ ] Triển khai AI Copilot Foundation (Sprint 6 - PAC-128 đến PAC-133, PAC-157 đến PAC-180).
- [ ] Triển khai AI Guardrail & Audit Log (Sprint 7 - PAC-134 đến PAC-138, PAC-181 đến PAC-199).
- [ ] Triển khai Supabase Storage, Realtime & Notification (Sprint 8 - PAC-139 đến PAC-145, PAC-200 đến PAC-222).
- [ ] Triển khai Knowledge Graph & Graph-RAG (Sprint 9 - PAC-146 đến PAC-150, PAC-223 đến PAC-238).
- [ ] Triển khai Forecast, Advanced Testing & Final Demo (Sprint 10 - PAC-151 đến PAC-156, PAC-239 đến PAC-258).

---

## Interfaces

> [!NOTE]
> **Mục tiêu:** Các nguồn thông tin quản lý dự án (Jira, GitHub Issues, Figma, tài liệu thiết kế).
> **Ví dụ:** Liệt kê link hoặc trạng thái của các tài liệu đặc tả.

- **Jira Board:** [pharmaassist.atlassian.net](https://pharmaassist.atlassian.net) (Project: `PA` & `PAC`).
- **Tài liệu đặc tả hệ thống:** Nằm trong thư mục [PharmaAssist-Doc](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/PharmaAssist-Doc).
- **Quy tắc làm việc của Agent:** File [rules-w-pharmaassist.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.agents/rules/rules-w-pharmaassist.md).

---

## Update Rule

> [!NOTE]
> **Mục tiêu:** Quy tắc duy trì và cập nhật file này.
> Luôn giữ file này ngắn gọn, phản ánh đúng tình hình của sprint hiện tại và các hành động tiếp theo. Khi hoàn thành task, hãy tổng hợp và lưu trữ thay vì để file quá dài.

Mỗi khi hoàn thành một mốc phát triển hoặc cập nhật tiến trình lớn, AI Agent hoặc Nhà phát triển cần cập nhật lại ngày `Last updated` và ghi nhận trạng thái mới vào các mục tương ứng trong file này.

---

## Latest Execution Notes

> [!NOTE]
> **Mục tiêu:** Nhật ký ghi lại các thay đổi, bản sửa lỗi, hoặc tính năng mới nhất đã được merge hoặc triển khai theo mốc thời gian gần nhất.
> **Ví dụ:** `2026-05-22: Đã cấu hình và kết nối dự án với Supabase thành công.`

- **2026-05-24 (Database 100 Bảng & Reset Database):** Thực hiện xóa toàn bộ cấu trúc 6 bảng cũ của database và tái thiết lập toàn diện 100 bảng database thương mại lớn theo đặc tả [1_100_bang.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/database/schema/1_100_bang.md). Dọn sạch public schema của database trên Supabase và chạy migration mới (`init_100_tables`) tạo thành công 100 bảng. Đồng thời, cập nhật file seed [prisma/seed.ts](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/backend/prisma/seed.ts) tương thích với cấu trúc Role/User mới, chạy seed thành công và NestJS Backend khởi chạy mượt mà với 0 lỗi TypeScript.
- **2026-05-23 (Jira Tasks Integration):** Đã tạo thành công 102 Tasks phần nâng cao (từ `T-79` đến `T-180`, tương ứng các Jira key `PAC-157` đến `PAC-258`) trên Jira Cloud. Các Tasks được cấu hình đầy đủ các trường: Sprint (Sprint 6 đến 10), Component, Assignee, Start/Due Date, Parent Epic tương ứng và liên kết đến các Story (US-31 đến US-59) trong phần Description. Đồng thời, đã đồng bộ cập nhật hiển thị mã Jira Key cho toàn bộ danh sách Tasks trong file [4.1_Task.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/Jira/4.1_Task.md).
- **2026-05-22 (Sprint 1 Completion & Bug Fix):** Hoàn thành toàn bộ Sprint 1 (Xác thực & Phân quyền - Auth & RBAC). Khắc phục lỗi verify JWT token của Supabase Auth (sử dụng thuật toán ES256) trên Backend NestJS bằng cách cấu hình lại `JwtStrategy` sử dụng `jwks-rsa` để lấy public keys động qua endpoint JWKS của Supabase. Chạy thử nghiệm thành công đăng nhập/đăng xuất và phân quyền Sidebar, RouteGuard ở Frontend Next.js. Đồng thời đã cập nhật 8 Jira tickets (`PAC-43` -> `PAC-50`) sang trạng thái Done.
- **2026-05-22 (Linter Fix):** Khắc phục cảnh báo "Unknown at rule @custom-variant" trong file [globals.css](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/frontend/src/app/globals.css) của frontend bằng cách cấu hình [.vscode/settings.json](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.vscode/settings.json) để bỏ qua cảnh báo linter đối với các at-rules tùy chỉnh của Tailwind CSS v4.
- **2026-05-22 (UI Design Rules Update):** Cập nhật file `rules-w-pharmaassist.md` yêu cầu bắt buộc tuân thủ nghiêm ngặt hệ thống design tokens (bảng màu HP Electric Blue `#024ad8`, typography, spacing) được đặc tả trong file `DESIGN.md` khi phát triển giao diện người dùng.
- **2026-05-22 (Extended Tech Integration):** Giữ nguyên kiến trúc Next.js Frontend (theo ý định thử thách bản thân của nhà phát triển) và NestJS Backend. Tích hợp thành công các thư viện bổ sung từ dự án trước: Recharts (biểu đồ), Leaflet (bản đồ), Socket.io (realtime), Gemini AI SDK (chatbot AI) ở cả hai phía. Cấu hình global API prefix `/api` và Swagger UI tại `/api/docs` cho NestJS Backend. Cả hai dev server (cổng 3000 và 3001) đều đang chạy ổn định.
- **2026-05-22 (Database Connection & Prisma 7 Fixes):** Khắc phục lỗi kết nối Supabase Cloud do vùng đặt dự án ở Tokyo (`ap-northeast-1`) thay vì Singapore và direct host chỉ hỗ trợ IPv6. Chuyển sang kết nối hoàn toàn qua Pooler Session Mode (cổng 5432) cho Prisma CLI. Nâng cấp cấu hình tương thích Prisma 7 sử dụng Driver Adapter PG (`@prisma/adapter-pg` và `pg`). Chạy thành công migration đầu tiên `20260522142212_init_foundation` tạo các bảng `users`, `roles`, `user_roles`, `medicine_categories`, `medicines`, và `inventories`. Khởi động thử backend NestJS dev server chạy trơn tru trên cổng 3001.
- **2026-05-22:** Thiết lập quy tắc hoạt động cho AI Agent tại file `rules-w-pharmaassist.md`. Cấu hình kết nối thành công với Supabase và kiểm tra quyền truy cập vào Jira. Đồng thời chốt stack công nghệ hoàn chỉnh (Next.js, NestJS, Supabase Auth, Prisma ORM) cùng các tính năng Supabase tận dụng thêm (Storage, Realtime, Triggers, pg_cron).
