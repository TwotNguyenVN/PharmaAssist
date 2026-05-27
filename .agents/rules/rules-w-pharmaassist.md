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
- **Bảo mật file cấu hình (.gitignore):** Đảm bảo tuyệt đối không push các file chứa thông tin nhạy cảm (`.env`, `.env.local`, API keys, certificates) và các thư mục phụ thuộc (`node_modules`, `dist`, `.next`) lên GitHub. Luôn cập nhật `.gitignore` đầy đủ.


