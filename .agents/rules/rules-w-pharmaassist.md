---
trigger: always_on
glob: "*"
description: Quy tắc phát triển và chuẩn code cho dự án PharmaAssist (NestJS/Express/Prisma backend, React/TypeScript/Tailwind CSS frontend, kết nối Supabase và Jira)
---

# Quy Tắc Làm Việc Cho Dự Án PharmaAssist

Tập hợp các nguyên tắc và chỉ dẫn dành cho AI Agent khi tham gia phát triển, bảo trì và sửa lỗi dự án PharmaAssist.

## 1. Ngôn Ngữ & Giao Tiếp (Language & Communication)
- **Bắt đầu phiên làm việc:** Mỗi khi bắt đầu một phiên làm việc mới, AI Agent **bắt buộc phải đọc lại** file [rules-w-pharmaassist.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.agents/rules/rules-w-pharmaassist.md) này để ghi nhớ các nguyên tắc.
- **Ghi chép ý tưởng và chốt thiết kế:** Khi làm việc với người dùng, đối với những phần người dùng đã chốt hoặc có ý tưởng thiết kế rõ ràng, AI Agent phải cập nhật ngay vào file [WORKING-CONTEXT.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/WORKING-CONTEXT.md) để nắm rõ và lưu trữ thông tin dự án.
- **Ghi nhận tiến độ công việc:** Khi hoàn thành một phần công việc mới, AI Agent phải tóm tắt ngắn gọn những việc đã làm vào [WORKING-CONTEXT.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/WORKING-CONTEXT.md) để các phiên làm việc sau biết được tiến độ đã đến đâu. Đồng thời, ghi chú lại bất kỳ phần lưu ý quan trọng nào (nếu có).
- **Phản hồi từ khóa "Bắt đầu":** Khi người dùng nhắn tin `"Bắt đầu"`, AI Agent phải tự động đọc file [WORKING-CONTEXT.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/WORKING-CONTEXT.md) để hiểu lại toàn bộ bối cảnh dự án, sau đó báo cáo nhanh cho người dùng biết trạng thái hiện tại của dự án.
- **Giao tiếp với người dùng:** Luôn phản hồi bằng tiếng Việt (theo ngôn ngữ của người dùng).
- **Mã nguồn (Code & Comments):** Mọi tên biến, tên hàm, cấu trúc file và comment trong code đều viết bằng **tiếng Anh**. Comment tập trung giải thích **TẠI SAO (WHY)** làm như vậy, thay vì giải thích **CÁI GÌ (WHAT)**.
- **Tài liệu:** Tài liệu phát triển phần mềm chính thức (SRS, Architecture, Database Design, v.v.) viết bằng tiếng Việt và tiếng Anh đồng bộ.

## 2. Tiêu Chuẩn Viết Code (Coding Standards)
- **Quy tắc Karpathy:**
  1. *Think Before Coding:* Hiểu rõ code hiện tại và thiết kế hệ thống trước khi chỉnh sửa.
  2. *Simplicity First:* Chọn giải pháp tối giản nhất, tránh over-engineer.
  3. *Surgical Changes:* Chỉ sửa đổi những dòng cần thiết, không chỉnh sửa code không liên quan.
  4. *Goal-Driven:* Luôn tập trung hoàn thành đúng mục tiêu/yêu cầu của người dùng.
- **TypeScript & JavaScript:**
  - Sử dụng TypeScript cho cả frontend và backend.
  - Sử dụng `const` làm mặc định, `let` khi cần gán lại, tuyệt đối không dùng `var`.
  - Hạn chế tối đa kiểu `any`. Dùng `unknown` hoặc định nghĩa interface/type cụ thể.
- **Xử lý lỗi (Error Handling):**
  - Không nuốt lỗi (silent catch). Phải log lỗi rõ ràng kèm ngữ cảnh hoặc ném lại lỗi có ý nghĩa.
  - Phải kiểm tra (validate) dữ liệu đầu vào ở các tầng ranh giới (API endpoints, controllers, services).

## 3. Kiến Trúc & Công Nghệ (Architecture & Technology Stack)
- **Frontend:**
  - Sử dụng React / Next.js với TypeScript.
  - Sử dụng **Tailwind CSS** (theo đề xuất của dự án) hoặc CSS thuần.
  - **Quy tắc thiết kế UI:** Khi phát triển, lập trình giao diện người dùng (UI) bắt buộc phải tuân thủ nghiêm ngặt theo bảng màu, typography, khoảng cách (spacing), và token thiết kế được định nghĩa trong file [DESIGN.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.agents/DESIGN.md) (phong cách thiết kế HP Electric Blue `#024ad8` làm tín hiệu CTA, ink `#1a1a1a`, Forma-DJR sans, v.v.).
- **Backend:**
  - Sử dụng Node.js với NestJS hoặc Express.
  - RESTful API thiết kế chuẩn, phân quyền vai trò (Role-based: Admin, Staff, Warehouse).
- **Database & ORM:**
  - Sử dụng **Supabase (Cloud PostgreSQL)** làm database chính (Project Ref: `opzhotrjpxlldflcnzzq`, URL: `https://opzhotrjpxlldflcnzzq.supabase.co`).
  - Dùng **Prisma ORM** để tương tác cơ sở dữ liệu.
  - Định nghĩa database schema trong `backend/prisma/schema.prisma`.
- **Cấu trúc thư mục:**
  - Backend: `backend/src/` (nhóm theo module: `auth`, `users`, `medicines`, v.v.).
  - Frontend: `frontend/src/` (chia thư mục theo component, page, service, v.v.).

## 4. Quy Tắc Nghiệp Vụ & An Toàn (Business & Safety Rules)
- **Quy tắc nghiệp vụ chính:**
  - Không cho phép bán vượt số lượng tồn kho (`BR-06`).
  - Đơn hàng phải có ít nhất một thuốc (`BR-09`).
  - Trừ tồn kho chỉ khi thanh toán thành công (`BR-10`).
  - Đơn hàng có từ 2 thuốc trở lên phải tự động kiểm tra tương tác thuốc (`BR-13`) thông qua bảng `drug_interactions`.
- **Nguyên tắc an toàn (Safety Rules):**
  - Hệ thống chỉ cung cấp cảnh báo tương tác thuốc mang tính chất **tham khảo**. Tuyệt đối không chẩn đoán hoặc kê đơn điều trị.
  - AI Pharmacist Copilot chỉ giải thích thông tin và hỗ trợ soạn ghi chú nháp, không đưa ra quyết định y tế.
  - Tuyệt đối không commit file cấu hình nhạy cảm `.env`, API key hoặc thông tin credentials lên git.

## 5. Quản Lý Phiên Bản (Git Integration)
- **Quy trình làm việc với Git/GitHub:** Khi thực hiện bất kỳ thao tác nào liên quan đến Git (tạo nhánh, commit, merge, push code, tạo Pull Request), AI Agent bắt buộc phải đọc và tuân thủ nghiêm ngặt quy trình được định nghĩa chi tiết tại file [git-workflows.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/git-workflows.md).
- **Checklist bắt buộc trước khi Commit:**
  - Chạy `git status` và `git diff` để kiểm tra danh sách file thay đổi. Đảm bảo không commit nhầm file rác hoặc nhạy cảm.
  - Sử dụng Agent `commit-writer` để viết commit message. Định dạng bắt buộc: `<type>(PAC-xxx): <mô tả ngắn bằng tiếng Anh>`.
- **Checklist bắt buộc trước khi Push:**
  - Chạy kiểm tra biên dịch (`npm run build` hoặc type check thích hợp) để đảm bảo code không bị lỗi cú pháp/TypeScript trên máy local.
  - Luôn kéo code mới nhất từ develop về bằng `git pull origin develop --rebase` (hoặc merge) để giải quyết xung đột cục bộ trước khi push.
- **Xác định nhánh đẩy code (Push Branch Selection):** Mỗi khi người dùng yêu cầu push code hoặc commit, AI Agent bắt buộc phải thực hiện các bước sau:
  1. Phân tích `WORKING-CONTEXT.md` (mục `Active Queues` hoặc `Latest Execution Notes`) hoặc xem các file vừa thay đổi để xác định mã Jira issue key (`PAC-xxx`) hiện tại.
  2. Tra cứu trong file [.agents/git-skills/branch-on-jira.md](file:///Users/twot/Documents/HKII_NAM_3/16_Cong_Nghe_Pham_Mem/PharmaAssist/.agents/git-skills/branch-on-jira.md) để tìm chính xác tên nhánh Git tương ứng (ví dụ: `feature/PAC-xxx-slug`).
  3. Kiểm tra xem nhánh hiện tại trên local (`git branch --show-current`) đã đúng chưa. Nếu chưa có nhánh này trên local, hãy tạo nhánh mới từ develop mới nhất bằng `git checkout -b <tên-nhánh-chuẩn>`.
  4. Thực hiện commit (với commit message chứa đúng mã `PAC-xxx`) và push lên đúng nhánh đã tra cứu đó (`git push origin <tên-nhánh-chuẩn>`).
- **Nguyên tắc an toàn khi Push:**
  - Tuyệt đối không dùng `git push --force` hoặc `-f` lên các nhánh dùng chung (`main`, `develop`).
  - Chỉ push lên đúng nhánh `feature/PAC-xxx-slug` hoặc `fix/PAC-xxx-slug` tương ứng của bạn đã được tra cứu ở trên.
- **Bảo mật file cấu hình (.gitignore):** Đảm bảo tuyệt đối không push các file chứa thông tin nhạy cảm (`.env`, `.env.local`, API keys, certificates) và các thư mục phụ thuộc (`node_modules`, `dist`, `.next`) lên GitHub. Luôn cập nhật `.gitignore` đầy đủ.
## 6. Liên kết Tác vụ Jira & Git (Jira & Git Integration)
Để Jira tự động nhận diện và liên kết nhánh (branch), commit, hoặc Pull Request (PR) của bạn với một Epic, Story, hay Task cụ thể, Jira sử dụng cơ chế quét Issue Key (Mã công việc - ví dụ: `PAC-2`, `PAC-126`, `PAC-15`).

Dưới đây là nguyên lý và cách thực hiện khi làm việc với Git:

### 6.1. Nguyên tắc vàng: Đưa "Issue Key" vào Tên Nhánh hoặc Commit
Jira sẽ tự động liên kết khi tìm thấy Issue Key nằm ở một trong các vị trí sau:

- **A. Đặt trong tên nhánh (Branch Name) — Cách khuyên dùng và phổ biến nhất**
  Khi tạo nhánh mới từ terminal, luôn chèn mã công việc vào đầu hoặc trong tên nhánh.
  * Cú pháp: `feature/ISSUE-KEY-ten-nhanh` hoặc `fix/ISSUE-KEY-ten-nhanh`
  * Ví dụ:
    * `feature/PAC-2` (Epic 2)
    * `feature/PAC-12-login-page` (Story hoặc Task số 12)
    * `bugfix/PAC-45-fix-db-error` (Bug số 45)

- **B. Đặt trong nội dung commit (Commit Message)**
  Nếu tên nhánh không chứa mã, Jira vẫn nhận diện được nếu các commit bên trong nhánh đó có chứa mã công việc.
  * Ví dụ:
    * `git commit -m "PAC-2: viết API đăng nhập và phân quyền"`
    * `git commit -m "feat(PAC-12): thêm nút đăng nhập Google"`

- **C. Đặt trong tiêu đề Pull Request (PR Title)**
  Khi mở Pull Request trên GitHub, chỉ cần tiêu đề PR chứa mã `PAC-2` hoặc `PAC-12`, Jira cũng sẽ tự động liên kết cả PR đó vào ticket tương ứng.

### 6.2. Điều kiện tiên quyết (Prerequisite)
Để tính năng này hoạt động, dự án cần phải được tích hợp giữa Jira và GitHub (hoặc GitLab/Bitbucket) thông qua việc cài đặt ứng dụng **GitHub for Jira** trên Atlassian Marketplace và kết nối repository `PharmaAssist` với Jira.

### 6.3. Kết quả hiển thị và Tự động hóa trên Jira
Khi đặt tên nhánh đúng chuẩn (ví dụ: `feature/PAC-2`) và push lên GitHub:
- Bên phải màn hình chi tiết của ticket `PAC-2` trên Jira (mục **Development**) sẽ tự động xuất hiện nhánh, commit và Pull Request tương ứng.
- Trạng thái của ticket trên Jira có thể tự động chuyển từ **To Do** ➡️ **In Progress** thông qua cấu hình quy tắc Jira Automation khi tạo nhánh mới.

### 6.4. Quy tắc phân tách nhánh theo từng nhiệm vụ (Task-based Branching Rules)
Để giữ mã nguồn sạch và quản lý chính xác tiến độ của từng hạng mục trên Jira:
- **Tạo nhánh riêng biệt:** Mỗi khi bắt đầu thực hiện bất kỳ nhiệm vụ nào (Epic, Story, Task, Bug), lập trình viên **bắt buộc phải tạo một nhánh mới** từ nhánh `develop` sạch và mới nhất. Tên nhánh phải chứa đúng `ISSUE-KEY` của nhiệm vụ đó.
  * *Ví dụ:* Khi làm task `PAC-44`, hãy tạo nhánh có chứa `PAC-44` (như `feature/PAC-44` hoặc `PAC-44-login-api`). Tiến hành code, commit và push code lên chính nhánh này.
- **Không code chồng chéo:** Tuyệt đối không viết đè code của nhiệm vụ mới lên nhánh cũ của nhiệm vụ khác. 
- **Phân tách công việc rõ ràng:** Khi chuyển sang làm phần việc tiếp theo, phải checkout về nhánh gốc (`develop`), kéo code mới nhất, và tạo một nhánh mới hoàn toàn chứa đúng `ISSUE-KEY` của nhiệm vụ mới đó để thực hiện.
- **Áp dụng cho mọi cấp độ:** Quy tắc tạo nhánh và push code tương ứng này áp dụng đồng nhất cho cả Epic, Story, Task hay Bug.

