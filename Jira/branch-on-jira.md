# Danh sách Nhánh Git tương ứng với Jira Issues

Tài liệu này ghi lại toàn bộ danh sách các nhánh Git tương ứng với từng **Epic**, **User Story**, và **Task** trên Jira của dự án **PharmaAssist**.

> [!IMPORTANT]
> **Quy tắc làm việc với Git:**
> - Mỗi Epic, Story, Task đều có một nhánh riêng được đặt tên theo đúng cấu trúc bên dưới.
> - Tên nhánh luôn bắt đầu bằng loại công việc (`epic/`, `feature/`, `bugfix/`) kèm theo mã công việc trên Jira (`PAC-xxx`) và mô tả ngắn bằng tiếng Anh (kebab-case).
> - Khi commit, bắt buộc chèn mã `PAC-xxx` vào đầu commit message (ví dụ: `git commit -m "PAC-43: thiết kế UI đăng nhập"`).

---

## 1. Epics (18 nhánh)

| Jira Key | Tên Epic trên Jira | Nhánh Git tương ứng |
| :--- | :--- | :--- |
| **PAC-1** | EPIC-01 - Quản lý xác thực và phân quyền | `epic/PAC-1-management-auth-and-rbac` |
| **PAC-2** | EPIC-02 - Quản lý người dùng và vai trò | `epic/PAC-2-management-user-and-role` |
| **PAC-3** | EPIC-03 - Quản lý thuốc và danh mục thuốc | `epic/PAC-3-management-medicine-and-category-medicine` |
| **PAC-4** | EPIC-04 - Quản lý tồn kho | `epic/PAC-4-management-inventory` |
| **PAC-5** | EPIC-05 - Quản lý nhập thuốc | `epic/PAC-5-management-stock-import` |
| **PAC-6** | EPIC-06 - Quản lý khách hàng | `epic/PAC-6-management-customer` |
| **PAC-7** | EPIC-07 - Bán thuốc tại quầy | `epic/PAC-7-sale-medicine-at-counter` |
| **PAC-8** | EPIC-08 - Cảnh báo tương tác thuốc | `epic/PAC-8-alert-interaction-medicine` |
| **PAC-9** | EPIC-09 - Thanh toán và hóa đơn | `epic/PAC-9-payment-and-invoice` |
| **PAC-10** | EPIC-10 - Báo cáo và dashboard | `epic/PAC-10-report-and-dashboard` |
| **PAC-11** | EPIC-11 - Kiểm thử hệ thống | `epic/PAC-11-testing-system` |
| **PAC-12** | EPIC-12 - Tài liệu, demo và triển khai | `epic/PAC-12-documentation-demo-and-deployment` |
| **PAC-121** | EPIC-13 - AI Copilot hỗ trợ cảnh báo thuốc | `epic/PAC-121-ai-copilot-support-alert-medicine` |
| **PAC-122** | EPIC-14 - An toàn AI và nhật ký kiểm soát | `epic/PAC-122-safety-ai-and-audit-log-control` |
| **PAC-123** | EPIC-15 - Tính năng Supabase nâng cao | `epic/PAC-123-feature-supabase-advanced` |
| **PAC-124** | EPIC-16 - Knowledge Graph và Graph-RAG | `epic/PAC-124-knowledge-graph-and-graph-rag` |
| **PAC-125** | EPIC-17 - Dự báo tồn kho nâng cao | `epic/PAC-125-forecast-inventory-advanced` |
| **PAC-126** | EPIC-18 - Kiểm thử và demo chức năng nâng cao | `epic/PAC-126-testing-and-demo-feature-advanced` |

---

## 2. User Stories (59 nhánh)

| Jira Key | Tên Story trên Jira | Nhánh Git tương ứng |
| :--- | :--- | :--- |
| **PAC-13** | US-01 - Đăng nhập hệ thống | `feature/PAC-13-login-system` |
| **PAC-14** | US-02 - Đăng xuất hệ thống | `feature/PAC-14-logout-system` |
| **PAC-15** | US-03 - Phân quyền theo vai trò | `feature/PAC-15-rbac-by-role` |
| **PAC-16** | US-04 - Tạo tài khoản nhân viên | `feature/PAC-16-create-account-staff` |
| **PAC-17** | US-05 - Cập nhật vai trò và trạng thái tài khoản | `feature/PAC-17-update-role-and-status-account` |
| **PAC-18** | US-06 - Thêm thuốc mới | `feature/PAC-18-create-medicine-new` |
| **PAC-19** | US-07 - Tìm kiếm và lọc thuốc | `feature/PAC-19-search-and-filter-medicine` |
| **PAC-20** | US-08 - Cập nhật thông tin thuốc | `feature/PAC-20-update-info-medicine` |
| **PAC-21** | US-09 - Quản lý danh mục thuốc | `feature/PAC-21-management-category-medicine` |
| **PAC-22** | US-10 - Xem danh sách tồn kho | `feature/PAC-22-view-list-inventory` |
| **PAC-23** | US-11 - Cảnh báo thuốc sắp hết | `feature/PAC-23-alert-medicine-low-stock` |
| **PAC-24** | US-12 - Cảnh báo thuốc gần hết hạn | `feature/PAC-24-alert-medicine-near-expiry` |
| **PAC-25** | US-13 - Tạo phiếu nhập thuốc | `feature/PAC-25-create-import-voucher-medicine` |
| **PAC-26** | US-14 - Thêm nhiều thuốc vào phiếu nhập | `feature/PAC-26-create-multiple-medicine-to-import-voucher` |
| **PAC-27** | US-15 - Lưu thông tin khách hàng | `feature/PAC-27-save-info-customer` |
| **PAC-28** | US-16 - Xem lịch sử mua hàng của khách hàng | `feature/PAC-28-view-history-purchase-of-customer` |
| **PAC-29** | US-17 - Tạo đơn bán thuốc | `feature/PAC-29-create-sale-order-medicine` |
| **PAC-30** | US-18 - Thêm thuốc vào đơn hàng | `feature/PAC-30-create-medicine-to-order` |
| **PAC-31** | US-19 - Kiểm tra tồn kho khi bán | `feature/PAC-31-check-inventory-on-sales` |
| **PAC-32** | US-20 - Kiểm tra tương tác thuốc | `feature/PAC-32-check-interaction-medicine` |
| **PAC-33** | US-21 - Xem chi tiết cảnh báo tương tác thuốc | `feature/PAC-33-view-detail-alert-interaction-medicine` |
| **PAC-34** | US-22 - Ghi chú tư vấn sau cảnh báo | `feature/PAC-34-note-consultation-after-alert` |
| **PAC-35** | US-23 - Thanh toán đơn hàng | `feature/PAC-35-payment-order` |
| **PAC-36** | US-24 - Tạo và xem/in hóa đơn | `feature/PAC-36-create-and-view-print-invoice` |
| **PAC-37** | US-25 - Xem dashboard tổng quan | `feature/PAC-37-view-dashboard-overview` |
| **PAC-38** | US-26 - Xem báo cáo doanh thu | `feature/PAC-38-view-report-revenue` |
| **PAC-39** | US-27 - Xem báo cáo thuốc bán chạy | `feature/PAC-39-view-report-medicine-best-selling` |
| **PAC-40** | US-28 - Viết test case cho chức năng MVP | `feature/PAC-40-write-test-case-for-feature-mvp` |
| **PAC-41** | US-29 - Ghi nhận bug trong quá trình kiểm thử | `bugfix/PAC-41-record-bug-in-testing-process` |
| **PAC-42** | US-30 - Chuẩn bị dữ liệu mẫu và kịch bản demo | `feature/PAC-42-prepare-data-mock-and-script-demo` |
| **PAC-128** | US-31 - Khởi tạo AI Copilot Module | `feature/PAC-128-init-ai-copilot-module` |
| **PAC-129** | US-32 - AI giải thích cảnh báo tương tác thuốc | `feature/PAC-129-ai-explain-alert-interaction-medicine` |
| **PAC-130** | US-33 - AI tạo ghi chú tư vấn nháp | `feature/PAC-130-ai-create-note-draft-consultation` |
| **PAC-131** | US-34 - MockAI dự phòng khi Gemini API lỗi | `feature/PAC-131-mockai-fallback-when-gemini-api-error` |
| **PAC-132** | US-35 - Hiển thị AI Copilot Panel trên POS | `feature/PAC-132-display-ai-copilot-panel-on-pos` |
| **PAC-133** | US-36 - Tích hợp Gemini API cho AI Copilot | `feature/PAC-133-integrate-gemini-api-for-ai-copilot` |
| **PAC-134** | US-37 - Chặn yêu cầu chẩn đoán và kê đơn | `feature/PAC-134-block-request-diagnosis-and-prescription` |
| **PAC-135** | US-38 - Kiểm tra phản hồi AI trước khi hiển thị | `feature/PAC-135-check-response-ai-before-display` |
| **PAC-136** | US-39 - Lưu nhật ký sử dụng AI | `feature/PAC-136-save-audit-log-usage-ai` |
| **PAC-137** | US-40 - Admin xem nhật ký AI cơ bản | `feature/PAC-137-admin-view-audit-log-ai-basic` |
| **PAC-138** | US-41 - Kiểm thử AI Copilot và Guardrail | `feature/PAC-138-testing-ai-copilot-and-guardrail` |
| **PAC-139** | US-42 - Upload ảnh thuốc bằng Supabase Storage | `feature/PAC-139-upload-image-medicine-by-supabase-storage` |
| **PAC-140** | US-43 - Hiển thị ảnh thuốc trong danh sách thuốc | `feature/PAC-140-display-image-medicine-in-list-medicine` |
| **PAC-141** | US-44 - Cập nhật tồn kho realtime trên POS | `feature/PAC-141-update-inventory-realtime-on-pos` |
| **PAC-142** | US-45 - Tạo thông báo tồn kho thấp | `feature/PAC-142-create-notification-inventory-low` |
| **PAC-143** | US-46 - Tạo thông báo thuốc gần hết hạn | `feature/PAC-143-create-notification-medicine-near-expiry` |
| **PAC-144** | US-47 - Quét thuốc gần hết hạn định kỳ | `feature/PAC-144-scan-medicine-near-expiry-scheduled-job` |
| **PAC-145** | US-48 - Kiểm thử Supabase Advanced Features | `feature/PAC-145-testing-supabase-advanced-features` |
| **PAC-146** | US-49 - Thiết kế Mock Knowledge Graph | `feature/PAC-146-design-mock-knowledge-graph` |
| **PAC-147** | US-50 - Xem Knowledge Graph của thuốc | `feature/PAC-147-view-knowledge-graph-of-medicine` |
| **PAC-148** | US-51 - Tạo context Graph-RAG cho AI Copilot | `feature/PAC-148-create-context-graph-rag-for-ai-copilot` |
| **PAC-149** | US-52 - AI giải thích cảnh báo bằng graph context | `feature/PAC-149-ai-explain-alert-table-graph-context` |
| **PAC-150** | US-53 - Kiểm thử Knowledge Graph và Graph-RAG | `feature/PAC-150-testing-knowledge-graph-and-graph-rag` |
| **PAC-151** | US-54 - Dự báo nguy cơ hết hàng | `feature/PAC-151-forecast-risk-out-of-stock` |
| **PAC-152** | US-55 - Hiển thị dự báo tồn kho trên Dashboard | `feature/PAC-152-display-forecast-inventory-on-dashboard` |
| **PAC-153** | US-56 - Kiểm thử toàn bộ chức năng nâng cao | `feature/PAC-153-testing-all-feature-advanced` |
| **PAC-154** | US-57 - Hoàn thiện README phần nâng cao | `feature/PAC-154-complete-readme-part-advanced` |
| **PAC-155** | US-58 - Hoàn thiện slide chức năng nâng cao | `feature/PAC-155-complete-slide-feature-advanced` |
| **PAC-156** | US-59 - Chuẩn bị demo script chức năng nâng cao | `feature/PAC-156-prepare-demo-script-feature-advanced` |

---

## 3. Tasks & Subtasks (185 nhánh)

| Jira Key | Tên Task trên Jira | Nhánh Git tương ứng |
| :--- | :--- | :--- |
| **PAC-43** | T-01 - Thiết kế giao diện màn hình đăng nhập | `feature/PAC-43-design-ui-screen-login` |
| **PAC-44** | T-02 - Tạo API đăng nhập và trả về access token | `feature/PAC-44-create-api-login-and-return-access-token` |
| **PAC-45** | T-03 - Thiết kế bảng users và roles phục vụ đăng nhập | `feature/PAC-45-design-users-table-and-roles-for-login` |
| **PAC-46** | T-04 - Validate form đăng nhập và hiển thị lỗi | `feature/PAC-46-validate-form-login-and-display-error` |
| **PAC-47** | T-05 - Tạo chức năng đăng xuất và xóa token/session | `feature/PAC-47-create-feature-logout-and-delete-token-session` |
| **PAC-48** | T-06 - Tạo middleware/guard kiểm tra quyền truy cập API | `feature/PAC-48-create-middleware-guard-check-quyen-access-api` |
| **PAC-49** | T-07 - Ẩn/hiện menu sidebar theo vai trò người dùng | `feature/PAC-49-hide-show-menu-sidebar-by-role-user` |
| **PAC-50** | T-08 - Viết test case cho đăng nhập, đăng xuất và phân quyền | `feature/PAC-50-write-test-case-for-login-logout-and-rbac` |
| **PAC-51** | T-09 - Thiết kế màn hình danh sách người dùng | `feature/PAC-51-design-screen-list-user` |
| **PAC-52** | T-10 - Tạo form thêm tài khoản nhân viên | `feature/PAC-52-create-form-create-account-staff` |
| **PAC-53** | T-11 - Tạo API thêm tài khoản người dùng | `feature/PAC-53-create-api-create-account-user` |
| **PAC-54** | T-12 - Validate username/email không được trùng | `feature/PAC-54-validate-username-email-unique` |
| **PAC-55** | T-13 - Tạo API cập nhật vai trò và trạng thái tài khoản | `feature/PAC-55-create-api-update-role-and-status-account` |
| **PAC-56** | T-14 - Thiết kế chức năng khóa/mở tài khoản trên UI | `feature/PAC-56-design-feature-lock-unlock-account-on-ui` |
| **PAC-57** | T-15 - Thiết kế bảng medicines và medicine_categories | `feature/PAC-57-design-medicines-table-and-medicinecategories` |
| **PAC-58** | T-16 - Tạo API thêm thuốc mới | `feature/PAC-58-create-api-create-medicine-new` |
| **PAC-59** | T-17 - Thiết kế form thêm thuốc mới | `feature/PAC-59-design-form-create-medicine-new` |
| **PAC-60** | T-18 - Validate dữ liệu thuốc bắt buộc và giá bán hợp lệ | `feature/PAC-60-validate-data-medicine-required-and-selling-price-valid` |
| **PAC-61** | T-19 - Tạo API danh sách thuốc có tìm kiếm, lọc và phân trang | `feature/PAC-61-create-api-list-medicine-has-search-filter-and-pagination` |
| **PAC-62** | T-20 - Thiết kế màn hình danh sách thuốc | `feature/PAC-62-design-screen-list-medicine` |
| **PAC-63** | T-21 - Thêm chức năng tìm kiếm thuốc theo tên hoặc mã thuốc | `feature/PAC-63-create-feature-search-medicine-by-name-or-code-medicine` |
| **PAC-64** | T-22 - Tạo API cập nhật thông tin thuốc | `feature/PAC-64-create-api-update-info-medicine` |
| **PAC-65** | T-23 - Thiết kế form chỉnh sửa thông tin thuốc | `feature/PAC-65-design-form-edit-info-medicine` |
| **PAC-66** | T-24 - Tạo API quản lý danh mục thuốc | `feature/PAC-66-create-api-management-category-medicine` |
| **PAC-67** | T-25 - Thiết kế màn hình quản lý danh mục thuốc | `feature/PAC-67-design-screen-management-category-medicine` |
| **PAC-68** | T-26 - Thiết kế bảng inventory hoặc stock_batches | `feature/PAC-68-design-table-inventory-or-stockbatches` |
| **PAC-69** | T-27 - Tạo API xem danh sách tồn kho | `feature/PAC-69-create-api-view-list-inventory` |
| **PAC-70** | T-28 - Thiết kế màn hình tồn kho | `feature/PAC-70-design-screen-inventory` |
| **PAC-71** | T-29 - Thêm tìm kiếm và lọc trạng thái tồn kho | `feature/PAC-71-create-search-and-filter-status-inventory` |
| **PAC-72** | T-30 - Xây dựng rule xác định thuốc sắp hết theo ngưỡng tồn kho | `feature/PAC-72-build-rule-determine-medicine-low-stock-by-threshold-inventory` |
| **PAC-73** | T-31 - Hiển thị nhãn cảnh báo thuốc sắp hết trên giao diện | `feature/PAC-73-display-label-alert-medicine-low-stock-on-ui` |
| **PAC-74** | T-32 - Xây dựng rule xác định thuốc gần hết hạn | `feature/PAC-74-build-rule-determine-medicine-near-expiry` |
| **PAC-75** | T-33 - Thiết kế danh sách thuốc gần hết hạn | `feature/PAC-75-design-list-medicine-near-expiry` |
| **PAC-76** | T-34 - Thiết kế bảng stock_imports và stock_import_details | `feature/PAC-76-design-table-stockimports-and-stockimportdetails` |
| **PAC-77** | T-35 - Tạo API tạo phiếu nhập thuốc | `feature/PAC-77-create-api-create-import-voucher-medicine` |
| **PAC-78** | T-36 - Thiết kế màn hình tạo phiếu nhập thuốc | `feature/PAC-78-design-screen-create-import-voucher-medicine` |
| **PAC-79** | T-37 - Tạo chức năng thêm nhiều dòng thuốc vào phiếu nhập | `feature/PAC-79-create-feature-create-multiple-rows-medicine-to-import-voucher` |
| **PAC-80** | T-38 - Tạo logic xác nhận phiếu nhập và cập nhật tồn kho | `feature/PAC-80-create-logic-confirm-import-voucher-and-update-inventory` |
| **PAC-81** | T-39 - Validate số lượng nhập, giá nhập và hạn sử dụng | `feature/PAC-81-validate-import-quantity-import-price-and-expiry-date` |
| **PAC-82** | T-40 - Thiết kế bảng customers | `feature/PAC-82-design-table-customers` |
| **PAC-83** | T-41 - Tạo API thêm và tìm kiếm khách hàng | `feature/PAC-83-create-api-create-and-search-customer` |
| **PAC-84** | T-42 - Thiết kế form lưu thông tin khách hàng | `feature/PAC-84-design-form-save-info-customer` |
| **PAC-85** | T-43 - Tạo API xem lịch sử mua hàng của khách hàng | `feature/PAC-85-create-api-view-history-purchase-of-customer` |
| **PAC-86** | T-44 - Thiết kế màn hình lịch sử mua hàng của khách hàng | `feature/PAC-86-design-screen-history-purchase-of-customer` |
| **PAC-87** | T-45 - Thiết kế bảng orders và order_details | `feature/PAC-87-design-table-orders-and-orderdetails` |
| **PAC-88** | T-46 - Tạo API tạo đơn bán thuốc | `feature/PAC-88-create-api-create-sale-order-medicine` |
| **PAC-89** | T-47 - Thiết kế màn hình Sales POS | `feature/PAC-89-design-screen-sales-pos` |
| **PAC-90** | T-48 - Tạo API thêm thuốc vào đơn hàng | `feature/PAC-90-create-api-create-medicine-to-order` |
| **PAC-91** | T-49 - Xây dựng chức năng giỏ hàng trong màn hình bán thuốc | `feature/PAC-91-build-feature-cart-in-screen-sale-medicine` |
| **PAC-92** | T-50 - Tính thành tiền từng dòng và tổng tiền đơn hàng | `feature/PAC-92-calculate-amount-each-row-and-total-amount-order` |
| **PAC-93** | T-51 - Tạo logic kiểm tra tồn kho khi thêm thuốc vào đơn | `feature/PAC-93-create-logic-check-inventory-when-create-medicine-to-order` |
| **PAC-94** | T-52 - Hiển thị cảnh báo khi số lượng bán vượt tồn kho | `feature/PAC-94-display-alert-when-sales-quantity-exceed-inventory` |
| **PAC-95** | T-53 - Trừ tồn kho sau khi thanh toán thành công | `feature/PAC-95-deduct-inventory-after-payment-success` |
| **PAC-96** | T-54 - Thiết kế bảng drug_interactions | `feature/PAC-96-design-drug-interactions-table` |
| **PAC-97** | T-55 - Seed dữ liệu mẫu tương tác thuốc rule-based | `feature/PAC-97-seed-data-mock-interaction-medicine-rule-based` |
| **PAC-98** | T-56 - Tạo API kiểm tra tương tác thuốc trong đơn hàng | `feature/PAC-98-create-api-check-interaction-medicine-in-order` |
| **PAC-99** | T-57 - Tạo logic so sánh các cặp thuốc trong đơn hàng | `feature/PAC-99-create-logic-compare-pair-medicine-in-order` |
| **PAC-100** | T-58 - Thiết kế popup/card hiển thị cảnh báo tương tác thuốc | `feature/PAC-100-design-popup-card-display-alert-interaction-medicine` |
| **PAC-101** | T-59 - Hiển thị mức độ cảnh báo nhẹ, trung bình, cao | `feature/PAC-101-display-level-alert-mild-average-severe` |
| **PAC-102** | T-60 - Hiển thị disclaimer cảnh báo chỉ mang tính tham khảo | `feature/PAC-102-display-disclaimer-alert-only-for-reference-only` |
| **PAC-103** | T-61 - Thiết kế bảng consultation_notes | `feature/PAC-103-design-consultation-notes-table` |
| **PAC-104** | T-62 - Tạo chức năng ghi chú tư vấn sau cảnh báo | `feature/PAC-104-create-feature-note-consultation-after-alert` |
| **PAC-105** | T-63 - Thiết kế bảng payments | `feature/PAC-105-design-payments-table` |
| **PAC-106** | T-64 - Tạo API ghi nhận thanh toán | `feature/PAC-106-create-api-record-payment` |
| **PAC-107** | T-65 - Thiết kế màn hình thanh toán | `feature/PAC-107-design-screen-payment` |
| **PAC-108** | T-66 - Thiết kế bảng invoices | `feature/PAC-108-design-invoices-table` |
| **PAC-109** | T-67 - Tạo API tạo hóa đơn sau thanh toán | `feature/PAC-109-create-api-create-invoice-after-payment` |
| **PAC-110** | T-68 - Thiết kế màn hình xem/in hóa đơn | `feature/PAC-110-design-screen-view-print-invoice` |
| **PAC-111** | T-69 - Thiết kế dashboard tổng quan cho Admin | `feature/PAC-111-design-dashboard-overview-for-admin` |
| **PAC-112** | T-70 - Tạo API báo cáo doanh thu theo ngày/tháng | `feature/PAC-112-create-api-report-revenue-by-day-month` |
| **PAC-113** | T-71 - Tạo API báo cáo thuốc bán chạy | `feature/PAC-113-create-api-report-medicine-best-selling` |
| **PAC-114** | T-72 - Viết test case cho luồng bán thuốc và thanh toán | `feature/PAC-114-write-test-case-for-sales-flow-medicine-and-payment` |
| **PAC-115** | T-73 - Viết test case cho cảnh báo tương tác thuốc | `feature/PAC-115-write-test-case-for-alert-interaction-medicine` |
| **PAC-116** | T-74 - Ghi nhận bug và phân loại mức độ ưu tiên | `bugfix/PAC-116-record-bug-and-classify-level-priority` |
| **PAC-117** | T-75 - Chuẩn bị dữ liệu mẫu cho tài khoản, thuốc, tồn kho và tương tác thuốc | `feature/PAC-117-prepare-data-mock-for-account-medicine-inventory-and-interaction-medicine` |
| **PAC-118** | T-76 - Viết README và hướng dẫn setup project | `feature/PAC-118-write-readme-and-guide-setup-project` |
| **PAC-119** | T-77 - Chuẩn bị slide bảo vệ và kịch bản demo | `feature/PAC-119-prepare-slide-defend-and-script-demo` |
| **PAC-120** | T-78 - Cấu hình môi trường chạy demo local hoặc Docker | `feature/PAC-120-configure-environment-run-demo-local-or-docker` |
| **PAC-157** | T-79 - Tạo module AI Copilot trong NestJS | `feature/PAC-157-create-module-ai-copilot-in-nestjs` |
| **PAC-158** | T-80 - Tạo AI Provider Interface | `feature/PAC-158-create-ai-provider-interface` |
| **PAC-159** | T-81 - Tạo AI Orchestrator Service | `feature/PAC-159-create-ai-orchestrator-service` |
| **PAC-160** | T-82 - Cấu hình biến môi trường AI_PROVIDER | `feature/PAC-160-configure-env-var-aiprovider` |
| **PAC-161** | T-83 - Tạo prompt template giải thích cảnh báo | `feature/PAC-161-create-prompt-template-explain-alert` |
| **PAC-162** | T-84 - Tạo API AI giải thích cảnh báo tương tác thuốc | `feature/PAC-162-create-api-ai-explain-alert-interaction-medicine` |
| **PAC-163** | T-85 - Lấy dữ liệu cảnh báo tương tác thuốc từ order | `feature/PAC-163-get-data-alert-interaction-medicine-from-order` |
| **PAC-164** | T-86 - Hiển thị kết quả AI giải thích cảnh báo trên POS | `feature/PAC-164-display-result-ai-explain-alert-on-pos` |
| **PAC-165** | T-87 - Tạo prompt template ghi chú tư vấn nháp | `feature/PAC-165-create-prompt-template-note-draft-consultation` |
| **PAC-166** | T-88 - Tạo API AI sinh ghi chú tư vấn nháp | `feature/PAC-166-create-api-ai-generate-note-draft-consultation` |
| **PAC-167** | T-89 - Hiển thị ghi chú nháp trong form ghi chú tư vấn | `feature/PAC-167-display-draft-note-in-form-note-consultation` |
| **PAC-168** | T-90 - Lưu ghi chú tư vấn sau khi nhân viên xác nhận | `feature/PAC-168-save-note-consultation-after-staff-confirm` |
| **PAC-169** | T-91 - Tạo service MockAI để demo ổn định | `feature/PAC-169-create-service-mockai-to-demo-stable` |
| **PAC-170** | T-92 - Tạo response mẫu cho giải thích cảnh báo | `feature/PAC-170-create-response-mock-for-explain-alert` |
| **PAC-171** | T-93 - Tạo response mẫu cho ghi chú tư vấn nháp | `feature/PAC-171-create-response-mock-for-note-draft-consultation` |
| **PAC-172** | T-94 - Tạo cơ chế fallback từ Gemini sang MockAI | `feature/PAC-172-create-mechanism-fallback-from-gemini-sang-mockai` |
| **PAC-173** | T-95 - Thiết kế AI Copilot Panel trên màn hình POS | `feature/PAC-173-design-ai-copilot-panel-on-screen-pos` |
| **PAC-174** | T-96 - Tạo nút giải thích cảnh báo bằng AI | `feature/PAC-174-create-button-explain-alert-by-ai` |
| **PAC-175** | T-97 - Tạo nút sinh ghi chú tư vấn nháp bằng AI | `feature/PAC-175-create-button-generate-note-draft-consultation-by-ai` |
| **PAC-176** | T-98 - Hiển thị loading và error state cho AI Copilot | `feature/PAC-176-display-loading-and-error-state-for-ai-copilot` |
| **PAC-177** | T-99 - Hiển thị disclaimer trong AI Copilot Panel | `feature/PAC-177-display-disclaimer-in-ai-copilot-panel` |
| **PAC-178** | T-100 - Tích hợp Gemini API cho AI Copilot | `feature/PAC-178-integrate-gemini-api-for-ai-copilot` |
| **PAC-179** | T-101 - Cấu hình GEMINI_API_KEY trong backend | `feature/PAC-179-configure-geminiapikey-in-backend` |
| **PAC-180** | T-102 - Xử lý lỗi khi Gemini API không phản hồi | `feature/PAC-180-handle-error-when-gemini-api-no-response` |
| **PAC-181** | T-103 - Tạo Guardrail Module trong NestJS | `feature/PAC-181-create-guardrail-module-in-nestjs` |
| **PAC-182** | T-104 - Tạo input guardrail kiểm tra yêu cầu người dùng | `feature/PAC-182-create-input-guardrail-check-request-user` |
| **PAC-183** | T-105 - Tạo danh sách intent không được phép | `feature/PAC-183-create-list-intent-disallowed` |
| **PAC-184** | T-106 - Tạo response từ chối an toàn cho AI | `feature/PAC-184-create-response-reject-safety-for-ai` |
| **PAC-185** | T-107 - Tạo output guardrail kiểm tra phản hồi AI | `feature/PAC-185-create-output-guardrail-check-response-ai` |
| **PAC-186** | T-108 - Tạo cơ chế thay thế phản hồi AI không an toàn | `feature/PAC-186-create-mechanism-replace-response-ai-no-safety` |
| **PAC-187** | T-109 - Gắn output guardrail vào AI Orchestrator | `feature/PAC-187-gan-output-guardrail-to-ai-orchestrator` |
| **PAC-188** | T-110 - Thiết kế bảng ai_audit_logs | `feature/PAC-188-design-ai-audit-logs-table` |
| **PAC-189** | T-111 - Tạo AI Audit Log Service | `feature/PAC-189-create-ai-audit-log-service` |
| **PAC-190** | T-112 - Lưu request và response AI vào nhật ký kiểm soát | `feature/PAC-190-save-request-and-response-ai-to-audit-log-control` |
| **PAC-191** | T-113 - Gắn AI Audit Log vào AI Orchestrator | `feature/PAC-191-gan-ai-audit-log-to-ai-orchestrator` |
| **PAC-192** | T-114 - Tạo API danh sách AI Audit Log cho Admin | `feature/PAC-192-create-api-list-ai-audit-log-for-admin` |
| **PAC-193** | T-115 - Thiết kế màn hình AI Audit Log | `feature/PAC-193-design-screen-ai-audit-log` |
| **PAC-194** | T-116 - Kiểm tra phân quyền xem AI Audit Log | `feature/PAC-194-check-rbac-view-ai-audit-log` |
| **PAC-195** | T-117 - Viết test case cho AI giải thích cảnh báo | `feature/PAC-195-write-test-case-for-ai-explain-alert` |
| **PAC-196** | T-118 - Viết test case cho MockAI fallback | `feature/PAC-196-write-test-case-for-mockai-fallback` |
| **PAC-197** | T-119 - Viết test case cho Guardrail chặn chẩn đoán | `feature/PAC-197-write-test-case-for-guardrail-block-diagnosis` |
| **PAC-198** | T-120 - Viết test case cho Guardrail chặn kê đơn | `feature/PAC-198-write-test-case-for-guardrail-block-prescription` |
| **PAC-199** | T-121 - Cập nhật test report phần AI nâng cao | `feature/PAC-199-update-test-report-part-ai-advanced` |
| **PAC-200** | T-122 - Tạo bucket medicine-images trên Supabase Storage | `feature/PAC-200-create-bucket-medicine-images-on-supabase-storage` |
| **PAC-201** | T-123 - Thêm trường image_url vào bảng medicines | `feature/PAC-201-create-field-imageurl-to-medicines-table` |
| **PAC-202** | T-124 - Tạo API upload ảnh thuốc | `feature/PAC-202-create-api-upload-image-medicine` |
| **PAC-203** | T-125 - Kiểm tra định dạng và dung lượng file ảnh | `feature/PAC-203-check-format-and-size-file-image` |
| **PAC-204** | T-126 - Thêm input upload ảnh trong form thuốc | `feature/PAC-204-create-input-upload-image-in-form-medicine` |
| **PAC-205** | T-127 - Hiển thị ảnh thuốc trong danh sách thuốc | `feature/PAC-205-display-image-medicine-in-list-medicine` |
| **PAC-206** | T-128 - Hiển thị ảnh thuốc trong màn hình chi tiết thuốc | `feature/PAC-206-display-image-medicine-in-screen-detail-medicine` |
| **PAC-207** | T-129 - Hiển thị ảnh placeholder khi thuốc chưa có ảnh | `feature/PAC-207-display-image-placeholder-when-medicine-no-image` |
| **PAC-208** | T-130 - Cấu hình Realtime cho bảng inventories | `feature/PAC-208-configure-realtime-for-table-inventories` |
| **PAC-209** | T-131 - Subscribe thay đổi tồn kho trên màn hình POS | `feature/PAC-209-subscribe-change-inventory-on-screen-pos` |
| **PAC-210** | T-132 - Cập nhật số lượng tồn kho realtime trong POS | `feature/PAC-210-update-quantity-inventory-realtime-in-pos` |
| **PAC-211** | T-133 - Hiển thị cảnh báo khi tồn kho thay đổi trong lúc bán | `feature/PAC-211-display-alert-when-inventory-change-during-sale` |
| **PAC-212** | T-134 - Đảm bảo backend vẫn chặn bán vượt tồn kho | `feature/PAC-212-ensure-backend-still-block-sale-exceed-inventory` |
| **PAC-213** | T-135 - Thiết kế bảng notifications | `feature/PAC-213-design-notifications-table` |
| **PAC-214** | T-136 - Tạo service sinh thông báo tồn kho thấp | `feature/PAC-214-create-service-generate-notification-inventory-low` |
| **PAC-215** | T-137 - Tạo service sinh thông báo thuốc gần hết hạn | `feature/PAC-215-create-service-generate-notification-medicine-near-expiry` |
| **PAC-216** | T-138 - Thiết kế Notification Bell trên Header | `feature/PAC-216-design-notification-bell-on-header` |
| **PAC-217** | T-139 - Tạo danh sách thông báo tồn kho và hạn dùng | `feature/PAC-217-create-list-notification-inventory-and-expiry` |
| **PAC-218** | T-140 - Tạo SQL function quét thuốc gần hết hạn | `feature/PAC-218-create-sql-function-scan-medicine-near-expiry` |
| **PAC-219** | T-141 - Tạo API chạy quét thuốc gần hết hạn thủ công khi demo | `feature/PAC-219-create-api-run-scan-medicine-near-expiry-manual-when-demo` |
| **PAC-220** | T-142 - Viết test case upload ảnh thuốc | `feature/PAC-220-write-test-case-upload-image-medicine` |
| **PAC-221** | T-143 - Viết test case realtime tồn kho bằng hai tab | `feature/PAC-221-write-test-case-realtime-inventory-with-two-tabs` |
| **PAC-222** | T-144 - Viết test case notification tồn kho và hạn dùng | `feature/PAC-222-write-test-case-notification-inventory-and-expiry` |
| **PAC-223** | T-145 - Thiết kế cấu trúc dữ liệu Mock Knowledge Graph | `feature/PAC-223-design-structure-data-mock-knowledge-graph` |
| **PAC-224** | T-146 - Seed dữ liệu Mock Knowledge Graph cho MED001 đến MED005 | `feature/PAC-224-seed-data-mock-knowledge-graph-for-med001-den-med005` |
| **PAC-225** | T-147 - Tạo module Graph trong NestJS | `feature/PAC-225-create-module-graph-in-nestjs` |
| **PAC-226** | T-148 - Tạo API lấy graph theo mã thuốc | `feature/PAC-226-create-api-get-graph-by-code-medicine` |
| **PAC-227** | T-149 - Chuẩn hóa response nodes và edges | `feature/PAC-227-normalize-response-nodes-and-edges` |
| **PAC-228** | T-150 - Thiết kế màn hình Graph Explorer | `feature/PAC-228-design-screen-graph-explorer` |
| **PAC-229** | T-151 - Hiển thị nodes và edges trên Graph Explorer | `feature/PAC-229-display-nodes-and-edges-on-graph-explorer` |
| **PAC-230** | T-152 - Tạo dropdown chọn thuốc để xem graph | `feature/PAC-230-create-dropdown-select-medicine-to-view-graph` |
| **PAC-231** | T-153 - Tạo empty state khi graph không có dữ liệu | `feature/PAC-231-create-empty-state-when-graph-no-data` |
| **PAC-232** | T-154 - Tạo GraphContextBuilder Service | `feature/PAC-232-create-graphcontextbuilder-service` |
| **PAC-233** | T-155 - Tạo context dạng text từ nodes và edges | `feature/PAC-233-create-context-format-text-from-nodes-and-edges` |
| **PAC-234** | T-156 - Giới hạn độ dài graph context trước khi gửi AI | `feature/PAC-234-limit-length-graph-context-before-send-ai` |
| **PAC-235** | T-157 - Tích hợp graph context vào AI prompt | `feature/PAC-235-integrate-graph-context-to-ai-prompt` |
| **PAC-236** | T-158 - Hiển thị nhãn có sử dụng graph context mẫu | `feature/PAC-236-display-label-has-usage-graph-context-mock` |
| **PAC-237** | T-159 - Viết test case Graph Explorer cho MED001 | `feature/PAC-237-write-test-case-graph-explorer-for-med001` |
| **PAC-238** | T-160 - Viết test case Graph-RAG context builder | `feature/PAC-238-write-test-case-graph-rag-context-builder` |
| **PAC-239** | T-161 - Tạo service dự báo nguy cơ hết hàng | `feature/PAC-239-create-service-forecast-risk-out-of-stock` |
| **PAC-240** | T-162 - Tính tốc độ bán trung bình của từng thuốc | `feature/PAC-240-calculate-average-sales-speed-of-each-medicine` |
| **PAC-241** | T-163 - Tính số ngày ước tính trước khi hết hàng | `feature/PAC-241-calculate-days-estimate-before-out-of-stock` |
| **PAC-242** | T-164 - Tạo API báo cáo dự báo tồn kho | `feature/PAC-242-create-api-report-forecast-inventory` |
| **PAC-243** | T-165 - Hiển thị card dự báo tồn kho trên Dashboard | `feature/PAC-243-display-card-forecast-inventory-on-dashboard` |
| **PAC-244** | T-166 - Hiển thị danh sách thuốc có nguy cơ hết hàng | `feature/PAC-244-display-list-medicine-has-risk-out-of-stock` |
| **PAC-245** | T-167 - Viết test case forecast đủ dữ liệu và thiếu dữ liệu | `feature/PAC-245-write-test-case-forecast-sufficient-data-and-insufficient-data` |
| **PAC-246** | T-168 - Test lại AI Copilot, Guardrail và Audit Log | `feature/PAC-246-retest-ai-copilot-guardrail-and-audit-log` |
| **PAC-247** | T-169 - Test lại Storage, Realtime và Notification | `feature/PAC-247-retest-storage-realtime-and-notification` |
| **PAC-248** | T-170 - Test lại Graph Explorer và Graph-RAG | `feature/PAC-248-retest-graph-explorer-and-graph-rag` |
| **PAC-249** | T-171 - Cập nhật README phần AI Copilot | `feature/PAC-249-update-readme-part-ai-copilot` |
| **PAC-250** | T-172 - Cập nhật README phần Supabase Advanced | `feature/PAC-250-update-readme-part-supabase-advanced` |
| **PAC-251** | T-173 - Cập nhật README phần Knowledge Graph và Forecast | `feature/PAC-251-update-readme-part-knowledge-graph-and-forecast` |
| **PAC-252** | T-174 - Bổ sung slide AI Copilot và Guardrail | `feature/PAC-252-add-slide-ai-copilot-and-guardrail` |
| **PAC-253** | T-175 - Bổ sung slide Supabase Advanced Features | `feature/PAC-253-add-slide-supabase-advanced-features` |
| **PAC-254** | T-176 - Bổ sung slide Knowledge Graph và Graph-RAG | `feature/PAC-254-add-slide-knowledge-graph-and-graph-rag` |
| **PAC-255** | T-177 - Viết demo script phần AI Copilot | `feature/PAC-255-write-demo-script-part-ai-copilot` |
| **PAC-256** | T-178 - Viết demo script phần Supabase Realtime | `feature/PAC-256-write-demo-script-part-supabase-realtime` |
| **PAC-257** | T-179 - Viết demo script phần Graph và Forecast | `feature/PAC-257-write-demo-script-part-graph-and-forecast` |
| **PAC-258** | T-180 - Chuẩn bị backup plan khi Gemini, Realtime hoặc Graph lỗi | `feature/PAC-258-prepare-backup-plan-when-gemini-realtime-or-graph-error` |
| **PAC-259** | UCD-01 - Vẽ Use Case Diagram tổng thể hệ thống PharmaAssist | `feature/PAC-259-draw-use-case-diagram-system-wide-system-pharmaassist` |
| **PAC-260** | UCD-02 - Vẽ Use Case Diagram mô-đun Xác thực & Phân quyền | `feature/PAC-260-draw-use-case-diagram-module-auth-rbac` |
| **PAC-261** | UCD-03 - Vẽ Use Case Diagram mô-đun Quản lý Thuốc & Tồn kho | `feature/PAC-261-draw-use-case-diagram-module-management-medicine-inventory` |
| **PAC-262** | UCD-04 - Vẽ Use Case Diagram mô-đun POS & Kiểm tra Tương tác Thuốc | `feature/PAC-262-draw-use-case-diagram-module-pos-check-interaction-medicine` |
| **PAC-263** | UCD-05 - Vẽ Use Case Diagram mô-đun Báo cáo & AI Copilot | `feature/PAC-263-draw-use-case-diagram-module-report-ai-copilot` |
