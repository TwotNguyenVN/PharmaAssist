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

- **2026-05-30 (Hoàn Thành Hệ Thống Phân Quyền & Nghiệp Vụ Y Tế - POS Bán Hàng Lâm Sàng & Lô Hạn Dùng):** Đã triển khai và hoàn thiện khép kín toàn bộ hệ thống phân quyền (RBAC) cùng các giao diện nghiệp vụ y tế thực tế, đáp ứng tuyệt đối các quy tắc nghiệp vụ nghiêm ngặt trong `rules-w-pharmaassist.md`. Biên dịch Next.js build sạch 100% không cảnh báo linter hay TypeScript.
  1. **Dashboard Tổng Quan (`/dashboard` - Sprint 1)**: Nâng cấp biểu đồ báo cáo doanh thu AreaChart và stacked BarChart cơ cấu cảnh báo chéo lâm sàng sử dụng thư viện **Recharts**.
  2. **Quản Lý Danh Mục (`/medicines` - Sprint 2)**: Xây dựng bảng danh mục hoạt chất, phân nhóm điều trị, và bộ form cấu hình thuộc tính Rx (yêu cầu đơn thuốc) trực quan.
  3. **Kho Lô Hạn Dùng (`/inventory` - Sprint 3)**: Theo dõi thẻ kho theo mã lô `StockBatch`, ngày sản xuất, hạn sử dụng; tự động khóa bán lô hết hạn; tích hợp phiếu nhập kho lô mới đồng bộ.
  4. **Quầy POS Bán Hàng Lâm Sàng (`/sales` - Sprint 4)**: POS bán lẻ tích hợp chốt chặn bán vượt tồn kho (`BR-06`), bắt buộc có ≥ 1 thuốc (`BR-09`), trừ kho thực tế khi thanh toán thành công (`BR-10`). Tích hợp Rule Engine quét tương tác chéo (`BR-13`) cực kỳ nhạy bén (như Aspirin + Warfarin ➡️ Nguy cơ xuất huyết cao) đi kèm bảng điều khiển trợ lý AI **Clinical AI Pharmacist Console** tư vấn phác đồ chi tiết. Đồng thời tích hợp cổng kiểm duyệt tải lên Đơn thuốc của bác sĩ (Rx Gate) bắt buộc đối với thuốc Rx.
- **2026-05-30 (Tái Thiết Kế Trang Chủ Bán Lẻ & Quản Trị Lâm Sàng PharmaAssist - Kết Hợp Long Châu & HP DESIGN.md):** Đập đi xây mới và nâng cấp toàn diện trang chủ `src/app/page.tsx` từ B2B đơn thuần thành **Cổng Cửa Hàng Bán Lẻ & Quản Trị Y Khoa Thông Minh** đẳng cấp cao.
  1. **Core Layout (`src/app/layout.tsx`)**: Tích hợp và chuyển đổi font chủ đạo sang Google Fonts **Manrope** (weights 400/500/600/700) kế thừa hoàn hảo phong cách geometric của Forma DJR Micro.
  2. **Homepage Thiết kế HP-Long Châu (`src/app/page.tsx`)**: Vận dụng triệt để tokens của HP Electric Blue `#024ad8`, canvas trắng tinh khiết, ink đen `#1a1a1a`, card bo 16px Soft Lift, button sharp 4px nhãn viết hoa, chevrons song chéo chéo góc song song. Nạp danh mục 8 sản phẩm thật cào từ Long Châu.
  3. **Rx Gate (Quét Đơn Thuốc AI)**: Cổng tải ảnh đơn thuốc y khoa có thanh lướt quét OCR AI giả lập sinh động và tự động bóc tách nạp thuốc vào giỏ hàng.
  4. **Giỏ Hàng Tương Tác Thuốc Lâm Sàng (`BR-13`)**: Tích hợp Rule Engine lâm sàng ngay trong giỏ hàng. Nếu giỏ có từ 2 thuốc trở lên gây tương tác nguy hại (Aspirin + Warfarin), hệ thống sẽ lập tức báo động đỏ rực, hiển thị cảnh báo y tế lâm sàng chi tiết, tắt nút thanh toán nhanh, bắt buộc tích chọn cam kết y khoa.
  5. **Trợ Lý Dược Sĩ AI Chatbot**: Chatbot nổi ở góc dưới phải tư vấn dùng thuốc bằng tiếng Việt, hỗ trợ chọn câu hỏi mẫu nhanh chóng và trả lời trôi chảy.
  6. **Simulator**: Nâng cấp visual bộ giả lập tương tác chéo y khoa trực tiếp động tại trung tâm trang chủ.
  7. **Cổng POS & Dashboard**: Tích hợp các CTA chuyển hướng tiện lợi cho nhân viên y tế để truy cập POS bán hàng tại quầy và dashboard phân tích.
- **2026-05-30 (Tái Thiết Kế Giao Diện Trang Chủ - Phiên Bản B2B Enterprise Cũ):** Đã được nâng cấp lên phiên bản tích hợp bán lẻ & quản trị thông minh chuẩn y khoa HP-Long Châu nêu trên. Giao diện biên dịch sạch 100% không lỗi linter và đã được kiểm thử chạy hoàn hảo tại `http://localhost:3000`.
- **2026-05-27 (Thiết kế Script Seed dữ liệu bằng Prisma):** Chốt phương án nạp dữ liệu cào từ Long Châu lên Supabase. Thay vì sử dụng các tệp SQL thô có dung lượng lớn và bị lệch cấu trúc thuộc tính (schema mismatch), dự án thống nhất phát triển script `seed_crawled_data.ts` tại thư mục `backend/prisma/` để đọc dữ liệu từ các file CSV chuẩn hóa (`database/normalized/*.csv`). Script này sẽ dùng Prisma Client kết nối trực tiếp với Supabase Cloud, giải quyết tự động việc ánh xạ mã code sang ID tự tăng của database, đảm bảo tính toàn vẹn dữ liệu và tránh hoàn toàn các lỗi khóa ngoại.
- **2026-05-25 (Tối Ưu Hóa & Sửa Lỗi Link Collector & Crawler Pipeline):** Thực hiện nâng cấp toàn diện kịch bản cào dữ liệu: (1) Sửa cấu hình `.env` chuyển `HEADLESS=false` để tránh Cloudflare chặn trên Long Châu; (2) Tối ưu hóa bộ lọc URL sản phẩm ở bước 2, loại bỏ 100% các link rác (chính sách, tin tức, điều khoản) kết thúc bằng số; (3) Giới hạn tối đa 5 danh mục cào trong sample mode để tăng hiệu năng, rút ngắn thời gian lấy link từ >15 phút xuống dưới 1 phút; (4) Đồng bộ các biến độ trễ ngẫu nhiên (`REQUEST_DELAY_RANDOM_MIN_MS` và `REQUEST_DELAY_RANDOM_MAX_MS`) giữa bước cào link và cào chi tiết. Toàn bộ sample pipeline chạy thành công 100% và sinh ra SQL seed sạch.
- **2026-05-24 (Cập Nhật Tài Liệu Hướng Hướng Dẫn - README.md):** Thực hiện dọn dẹp toàn diện file [README.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/tools/data-collector/README.md) của `tools/data-collector`. Đã loại bỏ hoàn toàn các nội dung không liên quan đến data collector như các bảng component MVP, component nâng cao, các tính năng AI nâng cao (Gemini, Graph-RAG, Forecast...) và các nhiệm vụ Jira của dự án lớn. Hoàn thiện nội dung tập trung duy nhất vào hướng dẫn sử dụng crawler tool với đầy đủ 13 phần chi tiết (Giới thiệu, Cài đặt, Cấu hình .env, Quy trình chạy sample, Quy trình chạy full, Retry failed, Normalize data, Validate data, Generate SQL, Cấu trúc output, Quy tắc an toàn, Troubleshooting, Disclaimer y tế).
- **2026-05-24 (Sinh SQL Seed từ CSV):** Hoàn tất xây dựng script `05_generate_seed_sql.ts` đọc 15 file CSV đã chuẩn hóa để sinh dữ liệu seed cho Supabase PostgreSQL. Script thực hiện escape nháy đơn, cast chuẩn các trường Number/Boolean/NULL, tự động skip an toàn các dòng bị thiếu trường bắt buộc (ví dụ: product_prices thiếu giá do CONTACT_REQUIRED). Các bảng được phân tách khoa học thành Master Data (`001_master_data.sql`) và Product Data chia theo từng batch 500 sản phẩm (`002_products_batch_001.sql`). Đồng thời, sinh file tổng gộp `seed_longchau_demo.sql` chứa hướng dẫn thứ tự chạy và tổng hợp dữ liệu toàn bộ. Tiến trình chạy thành công 100% không phát hiện lỗi.
- **2026-05-24 (Chuẩn Hóa Product Documents):** Thực hiện nâng cấp toàn diện cấu trúc lưu trữ tài liệu sản phẩm (`product_documents`). Tách cột `content_text` cũ thành hai cột: `content` lưu trữ plain text sạch (đã loại bỏ hoàn toàn HTML tags, giữ cấu trúc danh mục và ngắt dòng tự nhiên) và `content_html` lưu trữ mã HTML an toàn (được lọc qua bộ chuyển đổi custom chỉ giữ lại các thẻ whitelist như `h2`, `h3`, `h4`, `p`, `ul`, `ol`, `li`, `strong`, `b`, `em`, `i`, `br`, `a`, `table`, `thead`, `tbody`, `tr`, `th`, `td` và loại bỏ hoàn toàn các thẻ độc hại/event handlers/javascript URL). Đồng thời cập nhật `07_validate_data.ts` để kiểm thử và tự động phát hiện lỗi bảo mật HTML tag. Toàn bộ pipeline normalize và validate chạy thành công 100%, không phát hiện lỗi (FAIL) hay cảnh báo (WARNING).
- **2026-05-24 (Data Validation Report):** Hoàn thành viết và chạy thử nghiệm thành công script đánh giá chất lượng dữ liệu `07_validate_data.ts`. Script phân tích và đối soát chéo toàn bộ các file raw JSON, file trạng thái thu thập, và 15 file CSV chuẩn hóa. Tự động kiểm tra độ đầy đủ của các trường thông tin (Name, SKU, Price, Image, v.v.), thông tin chi tiết về thuốc (SDK, dạng bào chế, hạn dùng, cách dùng, tác dụng phụ, bảo quản, chỉ định, chống chỉ định), tính duy nhất của dữ liệu gốc (Master Data), và tính toàn vẹn khóa ngoại (Foreign Key integrity) giữa các bảng. Báo cáo chất lượng chi tiết được ghi ra file [data_quality_report.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/tools/data-collector/data/output/data_quality_report.md).
- **2026-05-24 (Data Collector & Demo Seed Data):** Đã hoàn thiện bộ công cụ crawler (`tools/data-collector`) sử dụng Playwright và TypeScript để lấy dữ liệu sản phẩm demo/seed data từ Nhà thuốc Long Châu. Hoàn thành toàn bộ pipeline bao gồm: (01) lấy danh mục, (02) thu thập links, (03) cào chi tiết sản phẩm xử lý isolate context triệt để với trang web, (04) chuẩn hóa dữ liệu sang cấu trúc đồng nhất, (07) validate dữ liệu bằng Zod, và (05) xuất ra file SQL (`seed_longchau_demo.sql`) để nạp vào DB 100 bảng. Pipeline chạy thành công hoàn toàn cho dữ liệu mẫu (sample mode).
- **2026-05-24 (Database 100 Bảng & Reset Database):** Thực hiện xóa toàn bộ cấu trúc 6 bảng cũ của database và tái thiết lập toàn diện 100 bảng database thương mại lớn theo đặc tả [1_100_bang.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/database/schema/1_100_bang.md). Dọn sạch public schema của database trên Supabase và chạy migration mới (`init_100_tables`) tạo thành công 100 bảng. Đồng thời, cập nhật file seed [prisma/seed.ts](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/backend/prisma/seed.ts) tương thích với cấu trúc Role/User mới, chạy seed thành công và NestJS Backend khởi chạy mượt mà với 0 lỗi TypeScript.
- **2026-05-23 (Jira Tasks Integration):** Đã tạo thành công 102 Tasks phần nâng cao (từ `T-79` đến `T-180`, tương ứng các Jira key `PAC-157` đến `PAC-258`) trên Jira Cloud. Các Tasks được cấu hình đầy đủ các trường: Sprint (Sprint 6 đến 10), Component, Assignee, Start/Due Date, Parent Epic tương ứng và liên kết đến các Story (US-31 đến US-59) trong phần Description. Đồng thời, đã đồng bộ cập nhật hiển thị mã Jira Key cho toàn bộ danh sách Tasks trong file [4.1_Task.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/Jira/4.1_Task.md).
- **2026-05-22 (Sprint 1 Completion & Bug Fix):** Hoàn thành toàn bộ Sprint 1 (Xác thực & Phân quyền - Auth & RBAC). Khắc phục lỗi verify JWT token của Supabase Auth (sử dụng thuật toán ES256) trên Backend NestJS bằng cách cấu hình lại `JwtStrategy` sử dụng `jwks-rsa` để lấy public keys động qua endpoint JWKS của Supabase. Chạy thử nghiệm thành công đăng nhập/đăng xuất và phân quyền Sidebar, RouteGuard ở Frontend Next.js. Đồng thời đã cập nhật 8 Jira tickets (`PAC-43` -> `PAC-50`) sang trạng thái Done.
- **2026-05-22 (Linter Fix):** Khắc phục cảnh báo "Unknown at rule @custom-variant" trong file [globals.css](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/frontend/src/app/globals.css) của frontend bằng cách cấu hình [.vscode/settings.json](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.vscode/settings.json) để bỏ qua cảnh báo linter đối với các at-rules tùy chỉnh của Tailwind CSS v4.
- **2026-05-22 (UI Design Rules Update):** Cập nhật file `rules-w-pharmaassist.md` yêu cầu bắt buộc tuân thủ nghiêm ngặt hệ thống design tokens (bảng màu HP Electric Blue `#024ad8`, typography, spacing) được đặc tả trong file `DESIGN.md` khi phát triển giao diện người dùng.
- **2026-05-22 (Extended Tech Integration):** Giữ nguyên kiến trúc Next.js Frontend (theo ý định thử thách bản thân của nhà phát triển) và NestJS Backend. Tích hợp thành công các thư viện bổ sung từ dự án trước: Recharts (biểu đồ), Leaflet (bản đồ), Socket.io (realtime), Gemini AI SDK (chatbot AI) ở cả hai phía. Cấu hình global API prefix `/api` và Swagger UI tại `/api/docs` cho NestJS Backend. Cả hai dev server (cổng 3000 và 3001) đều đang chạy ổn định.
- **2026-05-22 (Database Connection & Prisma 7 Fixes):** Khắc phục lỗi kết nối Supabase Cloud do vùng đặt dự án ở Tokyo (`ap-northeast-1`) thay vì Singapore và direct host chỉ hỗ trợ IPv6. Chuyển sang kết nối hoàn toàn qua Pooler Session Mode (cổng 5432) cho Prisma CLI. Nâng cấp cấu hình tương thích Prisma 7 sử dụng Driver Adapter PG (`@prisma/adapter-pg` và `pg`). Chạy thành công migration đầu tiên `20260522142212_init_foundation` tạo các bảng `users`, `roles`, `user_roles`, `medicine_categories`, `medicines`, và `inventories`. Khởi động thử backend NestJS dev server chạy trơn tru trên cổng 3001.
- **2026-05-22:** Thiết lập quy tắc hoạt động cho AI Agent tại file `rules-w-pharmaassist.md`. Cấu hình kết nối thành công với Supabase và kiểm tra quyền truy cập vào Jira. Đồng thời chốt stack công nghệ hoàn chỉnh (Next.js, NestJS, Supabase Auth, Prisma ORM) cùng các tính năng Supabase tận dụng thêm (Storage, Realtime, Triggers, pg_cron).
