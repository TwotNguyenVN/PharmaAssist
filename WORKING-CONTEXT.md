# Working Context - PharmaAssist AI Intelligence

Last updated: 2026-05-22

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
- Jira: Đang đồng bộ hóa với cloud workspace `pharmaassist.atlassian.net` (2 dự án chính: `PA` và `PAC`).
- Trạng thái code:
  - Dự án mới khởi tạo cấu trúc tài liệu.
  - Mã nguồn Backend (`backend/`) và Frontend (`frontend/`) đang được chuẩn bị triển khai.

---

## Current Constraints

> [!NOTE]
> **Mục tiêu:** Liệt kê các ràng buộc nghiêm ngặt trong quá trình phát triển (về mặt kỹ thuật hoặc quy trình).
> **Ví dụ:** Ràng buộc về bảo mật, quy tắc commit, hoặc kiểm soát thư viện sử dụng.

- **Quy tắc Git Commit:** Bắt buộc tuân thủ Conventional Commits và phải gắn mã Jira issue key (`PA-` hoặc `PAC-`).
- **Quy tắc Ngôn ngữ:** Code và comment hoàn toàn bằng tiếng Anh. Phản hồi người dùng bằng tiếng Việt.
- **Bảo mật thông tin:** Tuyệt đối không commit API Keys, mật khẩu, file cấu hình `.env` lên Git.
- **Y khoa:** Hệ thống chỉ mang tính chất tham khảo, không đưa ra chẩn đoán hay chỉ định y khoa thật.

---

## Active Queues

> [!NOTE]
> **Mục tiêu:** Danh sách các đầu việc/ticket Jira hoặc backlog đang hoạt động cần xử lý tiếp theo trong sprint hiện tại.
> **Ví dụ:** Triển khai API đăng nhập, thiết kế database schema, hay dựng layout POS bán hàng.

- [ ] Thiết lập khung dự án Backend (NestJS/Express với Prisma ORM).
- [ ] Thiết lập khung dự án Frontend (React/TypeScript/Tailwind CSS).
- [ ] Thiết kế và migration database schema trên Supabase.
- [ ] Triển khai các tính năng POS bán hàng và Rule-based Drug Interaction.

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

- **2026-05-22:** Thiết lập quy tắc hoạt động cho AI Agent tại file `rules-w-pharmaassist.md`. Cấu hình kết nối thành công với Supabase và kiểm tra quyền truy cập vào Jira.
