Dưới đây là **danh sách Component đầy đủ của dự án PharmaAssist** sau khi đã cập nhật theo quyết định mới: **không dùng `Advanced Documentation`**, mọi tài liệu nâng cao dùng chung Component **Documentation**.

Tổng cộng: **29 Component**.

---

## 1. Components MVP / Core

| Component                  | Description                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**               | Quản lý các issue lập trình giao diện người dùng: đăng nhập, dashboard, quản lý thuốc, bán thuốc, tồn kho, thanh toán, hóa đơn và báo cáo.             |
| **Backend**                | Quản lý các issue lập trình API, service xử lý nghiệp vụ, xác thực, phân quyền, bán thuốc, nhập kho, thanh toán và báo cáo.                            |
| **Database**               | Quản lý các issue liên quan đến thiết kế bảng, migration, seed data, quan hệ dữ liệu thuốc, tồn kho, đơn hàng, hóa đơn và tương tác thuốc.             |
| **Authentication**         | Quản lý các issue liên quan đến đăng nhập, đăng xuất, Supabase Auth, JWT/session và phân quyền Admin, Nhân viên nhà thuốc, Nhân viên kho.              |
| **Medicine Management**    | Quản lý các issue liên quan đến thêm, sửa, xóa, tìm kiếm, lọc thuốc và quản lý danh mục thuốc.                                                         |
| **Inventory Management**   | Quản lý các issue liên quan đến tồn kho, nhập thuốc, cập nhật số lượng, cảnh báo thuốc sắp hết và gần hết hạn.                                         |
| **Sales POS**              | Quản lý các issue liên quan đến tạo đơn bán thuốc, thêm thuốc vào đơn, kiểm tra tồn kho và xử lý đơn hàng tại quầy.                                    |
| **Drug Interaction Alert** | Quản lý các issue liên quan đến kiểm tra tương tác thuốc rule-based, hiển thị cảnh báo, mức độ nguy cơ và ghi chú tư vấn.                              |
| **Payment & Invoice**      | Quản lý các issue liên quan đến thanh toán, trạng thái thanh toán, tạo hóa đơn và in/xem hóa đơn.                                                      |
| **Customer Management**    | Quản lý các issue liên quan đến lưu thông tin khách hàng cơ bản, số điện thoại và lịch sử mua hàng.                                                    |
| **Reports & Dashboard**    | Quản lý các issue liên quan đến dashboard, doanh thu, thuốc bán chạy, báo cáo tồn kho và thống kê đơn hàng.                                            |
| **Admin Management**       | Quản lý các issue liên quan đến tài khoản người dùng, vai trò, phân quyền và chức năng quản trị hệ thống.                                              |
| **Testing**                | Quản lý các issue kiểm thử chức năng, test API, test giao diện, test phân quyền, ghi nhận bug và sửa lỗi cho MVP.                                      |
| **Deployment**             | Quản lý các issue liên quan đến cấu hình môi trường, build, deploy demo frontend, backend và database.                                                 |
| **Documentation**          | Quản lý các issue liên quan đến báo cáo, slide, README, tài liệu thiết kế, kịch bản demo, backup plan và hướng dẫn setup cho cả MVP lẫn phần nâng cao. |

---

## 2. Components nâng cao / Advanced

| Component              | Description                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Copilot**         | Quản lý các issue liên quan đến AI hỗ trợ giải thích cảnh báo tương tác thuốc và tạo ghi chú tư vấn nháp cho nhân viên nhà thuốc.                  |
| **MockAI**             | Quản lý các issue liên quan đến AI giả lập để demo ổn định khi Gemini API lỗi, hết quota hoặc không có mạng.                                       |
| **Gemini Integration** | Quản lý các issue liên quan đến tích hợp Gemini API ở backend, cấu hình API key, gọi AI provider và xử lý lỗi khi gọi Gemini.                      |
| **AI Guardrail**       | Quản lý các issue liên quan đến kiểm soát an toàn AI, chặn yêu cầu chẩn đoán, kê đơn, liều dùng cụ thể và kiểm tra phản hồi AI trước khi hiển thị. |
| **AI Audit Log**       | Quản lý các issue liên quan đến lưu nhật ký sử dụng AI, gồm request, response, provider, prompt type, trạng thái guardrail và thông tin truy vết.  |
| **Supabase Storage**   | Quản lý các issue liên quan đến upload, lưu trữ và hiển thị ảnh thuốc hoặc file liên quan bằng Supabase Storage.                                   |
| **Supabase Realtime**  | Quản lý các issue liên quan đến cập nhật tồn kho realtime trên POS, đồng bộ dữ liệu khi nhiều người thao tác và theo dõi thay đổi inventory.       |
| **Notification**       | Quản lý các issue liên quan đến thông báo tồn kho thấp, thuốc gần hết hạn, thông báo hệ thống và trạng thái đã đọc/chưa đọc.                       |
| **Scheduled Job**      | Quản lý các issue liên quan đến job định kỳ, pg_cron hoặc API thủ công để quét thuốc gần hết hạn và tạo cảnh báo định kỳ.                          |
| **Knowledge Graph**    | Quản lý các issue liên quan đến mô phỏng quan hệ thuốc, hoạt chất, nhóm thuốc, tương tác và khuyến nghị bằng dữ liệu graph mẫu.                    |
| **Graph Explorer**     | Quản lý các issue liên quan đến giao diện xem node-edge của thuốc, hoạt chất, nhóm thuốc, tương tác thuốc và khuyến nghị mẫu.                      |
| **Graph-RAG**          | Quản lý các issue liên quan đến tạo context từ graph/mock graph để hỗ trợ AI Copilot giải thích cảnh báo tương tác thuốc tốt hơn.                  |
| **Forecast**           | Quản lý các issue liên quan đến dự báo nguy cơ hết hàng dựa trên lịch sử bán và số lượng tồn kho hiện tại bằng công thức đơn giản.                 |
| **Advanced Testing**   | Quản lý các issue kiểm thử chức năng nâng cao như AI Copilot, Guardrail, Audit Log, Storage, Realtime, Graph-RAG và Forecast.                      |
