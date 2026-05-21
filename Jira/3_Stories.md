## Quy ước chung khi tạo Story trên Jira

| **Field trên Jira** | **Giá trị chung** |
| --- | --- |
| Work type | Story |
| Status | To Do |
| Parent | Chọn Epic tương ứng |
| Assignee | Automatic |
| Fix versions | Để trống |
| Team | Để trống hoặc chọn team nếu nhóm đã tạo |
| Labels | Theo module của Story |
| Sprint | Chọn Sprint tương ứng |

# Bảng thông tin 30 User Story

| **Story Key** | **Summary** | **Parent Epic** | **Component** | **Priority** | **Sprint** | **Story Point** | **Start date** | **Due date** | **Labels** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| US-01 | US-01 - Đăng nhập hệ thống | EPIC-01 - Quản lý xác thực và phân quyền | Authentication | High | Sprint 1 | 3 | 22/05/2026 | 26/05/2026 | login, auth, mvp |
| US-02 | US-02 - Đăng xuất hệ thống | EPIC-01 - Quản lý xác thực và phân quyền | Authentication | Medium | Sprint 1 | 2 | 22/05/2026 | 26/05/2026 | logout, auth, mvp |
| US-03 | US-03 - Phân quyền theo vai trò | EPIC-01 - Quản lý xác thực và phân quyền | Authentication | High | Sprint 1 | 5 | 22/05/2026 | 26/05/2026 | rbac, authorization, mvp |
| US-04 | US-04 - Tạo tài khoản nhân viên | EPIC-02 - Quản lý người dùng và vai trò | Admin Management | High | Sprint 2 | 3 | 27/05/2026 | 31/05/2026 | user, admin, account |
| US-05 | US-05 - Cập nhật vai trò và trạng thái tài khoản | EPIC-02 - Quản lý người dùng và vai trò | Admin Management | High | Sprint 2 | 3 | 27/05/2026 | 31/05/2026 | user, role, status |
| US-06 | US-06 - Thêm thuốc mới | EPIC-03 - Quản lý thuốc và danh mục thuốc | Medicine Management | High | Sprint 2 | 5 | 27/05/2026 | 31/05/2026 | medicine, crud, mvp |
| US-07 | US-07 - Tìm kiếm và lọc thuốc | EPIC-03 - Quản lý thuốc và danh mục thuốc | Medicine Management | High | Sprint 2 | 3 | 27/05/2026 | 31/05/2026 | medicine, search, filter |
| US-08 | US-08 - Cập nhật thông tin thuốc | EPIC-03 - Quản lý thuốc và danh mục thuốc | Medicine Management | High | Sprint 2 | 3 | 27/05/2026 | 31/05/2026 | medicine, update, crud |
| US-09 | US-09 - Quản lý danh mục thuốc | EPIC-03 - Quản lý thuốc và danh mục thuốc | Medicine Management | Medium | Sprint 2 | 3 | 27/05/2026 | 31/05/2026 | category, medicine |
| US-10 | US-10 - Xem danh sách tồn kho | EPIC-04 - Quản lý tồn kho | Inventory Management | High | Sprint 3 | 3 | 01/06/2026 | 09/06/2026 | inventory, stock |
| US-11 | US-11 - Cảnh báo thuốc sắp hết | EPIC-04 - Quản lý tồn kho | Inventory Management | High | Sprint 3 | 3 | 01/06/2026 | 09/06/2026 | low-stock, alert |
| US-12 | US-12 - Cảnh báo thuốc gần hết hạn | EPIC-04 - Quản lý tồn kho | Inventory Management | High | Sprint 3 | 3 | 01/06/2026 | 09/06/2026 | expiry, alert |
| US-13 | US-13 - Tạo phiếu nhập thuốc | EPIC-05 - Quản lý nhập thuốc | Inventory Management | High | Sprint 3 | 5 | 01/06/2026 | 09/06/2026 | stock-import, inventory |
| US-14 | US-14 - Thêm nhiều thuốc vào phiếu nhập | EPIC-05 - Quản lý nhập thuốc | Inventory Management | High | Sprint 3 | 5 | 01/06/2026 | 09/06/2026 | stock-import, batch |
| US-15 | US-15 - Lưu thông tin khách hàng | EPIC-06 - Quản lý khách hàng | Customer Management | Medium | Sprint 3 | 3 | 01/06/2026 | 09/06/2026 | customer, mvp |
| US-16 | US-16 - Xem lịch sử mua hàng của khách hàng | EPIC-06 - Quản lý khách hàng | Customer Management | Medium | Sprint 4 | 3 | 10/06/2026 | 13/06/2026 | customer, purchase-history |
| US-17 | US-17 - Tạo đơn bán thuốc | EPIC-07 - Bán thuốc tại quầy | Sales POS | High | Sprint 3 | 5 | 01/06/2026 | 09/06/2026 | sales, order, pos |
| US-18 | US-18 - Thêm thuốc vào đơn hàng | EPIC-07 - Bán thuốc tại quầy | Sales POS | High | Sprint 3 | 5 | 01/06/2026 | 09/06/2026 | sales, cart, order-detail |
| US-19 | US-19 - Kiểm tra tồn kho khi bán | EPIC-07 - Bán thuốc tại quầy | Sales POS | High | Sprint 4 | 5 | 10/06/2026 | 13/06/2026 | sales, inventory-check |
| US-20 | US-20 - Kiểm tra tương tác thuốc | EPIC-08 - Cảnh báo tương tác thuốc | Drug Interaction Alert | Highest | Sprint 4 | 5 | 10/06/2026 | 13/06/2026 | interaction, rule-based, safety |
| US-21 | US-21 - Xem chi tiết cảnh báo tương tác thuốc | EPIC-08 - Cảnh báo tương tác thuốc | Drug Interaction Alert | Highest | Sprint 4 | 5 | 10/06/2026 | 13/06/2026 | interaction, alert, ui |
| US-22 | US-22 - Ghi chú tư vấn sau cảnh báo | EPIC-08 - Cảnh báo tương tác thuốc | Drug Interaction Alert | High | Sprint 4 | 3 | 10/06/2026 | 13/06/2026 | consultation-note, interaction |
| US-23 | US-23 - Thanh toán đơn hàng | EPIC-09 - Thanh toán và hóa đơn | Payment & Invoice | High | Sprint 4 | 5 | 10/06/2026 | 13/06/2026 | payment, checkout |
| US-24 | US-24 - Tạo và xem/in hóa đơn | EPIC-09 - Thanh toán và hóa đơn | Payment & Invoice | High | Sprint 4 | 3 | 10/06/2026 | 13/06/2026 | invoice, receipt |
| US-25 | US-25 - Xem dashboard tổng quan | EPIC-10 - Báo cáo và dashboard | Reports & Dashboard | Medium | Sprint 5 | 3 | 14/06/2026 | 17/06/2026 | dashboard, report |
| US-26 | US-26 - Xem báo cáo doanh thu | EPIC-10 - Báo cáo và dashboard | Reports & Dashboard | Medium | Sprint 5 | 5 | 14/06/2026 | 17/06/2026 | revenue, report |
| US-27 | US-27 - Xem báo cáo thuốc bán chạy | EPIC-10 - Báo cáo và dashboard | Reports & Dashboard | Medium | Sprint 5 | 3 | 14/06/2026 | 17/06/2026 | best-selling, report |
| US-28 | US-28 - Viết test case cho chức năng MVP | EPIC-11 - Kiểm thử hệ thống | Testing | High | Sprint 5 | 3 | 14/06/2026 | 17/06/2026 | testing, test-case |
| US-29 | US-29 - Ghi nhận bug trong quá trình kiểm thử | EPIC-11 - Kiểm thử hệ thống | Testing | High | Sprint 5 | 2 | 14/06/2026 | 17/06/2026 | bug, qa, testing |
| US-30 | US-30 - Chuẩn bị dữ liệu mẫu và kịch bản demo | EPIC-12 - Tài liệu, demo và triển khai | Documentation / Deployment | High | Sprint 5 | 3 | 14/06/2026 | 17/06/2026 | demo, documentation, seed-data |

Dưới đây là **Description mẫu đã viết lại theo giọng của một nhóm sinh viên đang làm đồ án môn học**. Nội dung vẫn đủ rõ để nhập vào Jira, nhưng không quá “doanh nghiệp” hay quá chuyên nghiệp như tài liệu công ty.

**US-01 - Đăng nhập hệ thống**

Nhóm cần xây dựng chức năng đăng nhập để người dùng nội bộ của nhà thuốc có thể truy cập vào hệ thống PharmaAssist.

Chức năng này phục vụ các vai trò như Admin, Nhân viên nhà thuốc và Nhân viên kho. Người dùng sẽ nhập tài khoản và mật khẩu được cấp. Nếu thông tin hợp lệ, hệ thống cho phép đăng nhập và chuyển vào trang chính. Nếu thông tin sai, hệ thống hiển thị thông báo lỗi phù hợp.

Lý do thực hiện:

Đăng nhập là chức năng nền tảng để hệ thống có thể phân quyền và bảo vệ dữ liệu nhà thuốc.

Acceptance Criteria:

- Người dùng nhập đúng tài khoản và mật khẩu thì đăng nhập thành công.

- Người dùng nhập sai tài khoản hoặc mật khẩu thì hệ thống báo lỗi.

- Tài khoản bị khóa không được phép đăng nhập.

- Sau khi đăng nhập thành công, người dùng được chuyển đến màn hình chính.

- Hệ thống lưu trạng thái đăng nhập bằng token hoặc session.

**US-02 - Đăng xuất hệ thống**

Nhóm cần xây dựng chức năng đăng xuất để người dùng có thể thoát khỏi hệ thống sau khi sử dụng.

Khi người dùng bấm đăng xuất, hệ thống sẽ xóa token hoặc session hiện tại và chuyển người dùng về màn hình đăng nhập. Sau khi đăng xuất, người dùng không được phép truy cập các trang nội bộ nếu chưa đăng nhập lại.

Lý do thực hiện:

Chức năng này giúp bảo vệ tài khoản và tránh trường hợp người khác sử dụng hệ thống trên cùng thiết bị.

Acceptance Criteria:

- Người dùng có thể bấm nút đăng xuất.

- Token hoặc session được xóa sau khi đăng xuất.

- Người dùng được chuyển về màn hình đăng nhập.

- Người dùng không thể truy cập dashboard hoặc các trang nội bộ sau khi đã đăng xuất.

**US-03 - Phân quyền theo vai trò**

Nhóm cần xây dựng chức năng phân quyền theo vai trò để mỗi loại người dùng chỉ được sử dụng các chức năng phù hợp.

Trong hệ thống PharmaAssist, các vai trò chính gồm Admin, Nhân viên nhà thuốc và Nhân viên kho. Admin có quyền quản lý người dùng, thuốc và xem báo cáo. Nhân viên nhà thuốc chủ yếu thao tác bán thuốc, khách hàng, thanh toán, hóa đơn và cảnh báo tương tác thuốc. Nhân viên kho chủ yếu thao tác nhập thuốc và quản lý tồn kho.

Lý do thực hiện:

Phân quyền giúp hệ thống an toàn hơn và phù hợp với nghiệp vụ thực tế của nhà thuốc.

Acceptance Criteria:

- Hệ thống phân biệt được vai trò của người dùng sau khi đăng nhập.

- Menu giao diện hiển thị theo vai trò.

- Backend kiểm tra quyền khi người dùng gọi API.

- Người dùng không có quyền sẽ không truy cập được chức năng bị giới hạn.

**US-04 - Tạo tài khoản nhân viên**

Nhóm cần xây dựng chức năng cho phép Admin tạo tài khoản nhân viên trong hệ thống.

Admin có thể nhập các thông tin cơ bản như họ tên, tài khoản, email hoặc số điện thoại, mật khẩu ban đầu và vai trò của nhân viên. Sau khi tạo thành công, nhân viên có thể dùng tài khoản đó để đăng nhập vào hệ thống.

Lý do thực hiện:

Nhà thuốc cần có nhiều tài khoản cho các vai trò khác nhau để quản lý công việc và phân quyền rõ ràng.

Acceptance Criteria:

- Admin có thể mở form tạo tài khoản nhân viên.

- Hệ thống kiểm tra tài khoản hoặc email không được trùng.

- Admin chọn được vai trò cho nhân viên.

- Tài khoản mới được lưu với trạng thái hoạt động.

**US-05 - Cập nhật vai trò và trạng thái tài khoản**

Nhóm cần xây dựng chức năng cho phép Admin cập nhật vai trò và trạng thái của tài khoản người dùng.

Admin có thể thay đổi vai trò của nhân viên khi có sự thay đổi trong phân công công việc. Admin cũng có thể khóa hoặc mở khóa tài khoản nếu nhân viên nghỉ việc hoặc tạm ngưng sử dụng hệ thống.

Lý do thực hiện:

Chức năng này giúp nhà thuốc kiểm soát quyền truy cập và đảm bảo người dùng chỉ có quyền phù hợp.

Acceptance Criteria:

- Admin có thể cập nhật vai trò của tài khoản.

- Admin có thể khóa hoặc mở khóa tài khoản.

- Người dùng bị khóa không thể đăng nhập.

- Sau khi cập nhật, hệ thống lưu lại thông tin mới.

**US-06 - Thêm thuốc mới**

Nhóm cần xây dựng chức năng thêm thuốc mới vào hệ thống để quản lý danh sách thuốc của nhà thuốc.

Người dùng được phân quyền có thể nhập các thông tin như mã thuốc, tên thuốc, danh mục, đơn vị tính, giá bán, mô tả và trạng thái. Sau khi thêm thành công, thuốc sẽ xuất hiện trong danh sách thuốc và có thể được sử dụng trong các nghiệp vụ tồn kho hoặc bán hàng.

Lý do thực hiện:

Đây là chức năng cốt lõi vì các nghiệp vụ nhập kho, tồn kho và bán thuốc đều cần dữ liệu thuốc.

Acceptance Criteria:

- Người dùng có quyền có thể mở form thêm thuốc mới.

- Các trường bắt buộc như mã thuốc, tên thuốc, danh mục và giá bán được kiểm tra hợp lệ.

- Mã thuốc không được trùng.

- Thuốc mới hiển thị trong danh sách thuốc sau khi thêm thành công.

**US-07 - Tìm kiếm và lọc thuốc**

Nhóm cần xây dựng chức năng tìm kiếm và lọc thuốc để người dùng tra cứu thuốc nhanh hơn.

Người dùng có thể tìm thuốc theo tên hoặc mã thuốc. Ngoài ra, hệ thống cần hỗ trợ lọc thuốc theo danh mục hoặc trạng thái để phục vụ việc quản lý và bán thuốc tại quầy.

Lý do thực hiện:

Nhân viên nhà thuốc cần tìm thuốc nhanh khi bán hàng, còn Admin cần lọc dữ liệu để quản lý dễ hơn.

Acceptance Criteria:

- Người dùng có thể tìm kiếm thuốc theo tên hoặc mã thuốc.

- Người dùng có thể lọc thuốc theo danh mục.

- Danh sách thuốc có phân trang nếu có nhiều dữ liệu.

- Nếu không có kết quả, hệ thống hiển thị thông báo phù hợp.

**US-08 - Cập nhật thông tin thuốc**

Nhóm cần xây dựng chức năng cập nhật thông tin thuốc để dữ liệu thuốc luôn chính xác.

Người dùng được phân quyền có thể chỉnh sửa các thông tin như tên thuốc, danh mục, đơn vị tính, giá bán, mô tả và trạng thái. Sau khi lưu, thông tin mới sẽ được cập nhật trong danh sách thuốc.

Lý do thực hiện:

Thông tin thuốc có thể thay đổi trong quá trình quản lý, ví dụ thay đổi giá bán hoặc cập nhật trạng thái ngừng bán.

Acceptance Criteria:

- Người dùng có quyền có thể mở form chỉnh sửa thuốc.

- Hệ thống hiển thị dữ liệu hiện tại của thuốc trong form.

- Các trường bắt buộc được kiểm tra hợp lệ.

- Sau khi cập nhật, danh sách thuốc hiển thị thông tin mới.

**US-09 - Quản lý danh mục thuốc**

Nhóm cần xây dựng chức năng quản lý danh mục thuốc để phân loại thuốc trong hệ thống.

Admin có thể thêm, sửa hoặc ngừng sử dụng danh mục thuốc. Danh mục thuốc sẽ được dùng khi thêm thuốc mới, lọc thuốc và hiển thị thông tin thuốc.

Lý do thực hiện:

Danh mục giúp dữ liệu thuốc được tổ chức rõ ràng và dễ tìm kiếm hơn.

Acceptance Criteria:

- Admin có thể thêm danh mục thuốc mới.

- Admin có thể chỉnh sửa tên hoặc mô tả danh mục.

- Hệ thống không cho tạo danh mục trùng tên.

- Danh mục có thể được sử dụng khi thêm hoặc lọc thuốc.

**US-10 - Xem danh sách tồn kho**

Nhóm cần xây dựng chức năng xem danh sách tồn kho để nhân viên kho và Admin theo dõi số lượng thuốc hiện có.

Màn hình tồn kho cần hiển thị tên thuốc, mã thuốc, số lượng tồn, hạn sử dụng nếu có và trạng thái tồn kho. Người dùng có thể tìm kiếm hoặc lọc dữ liệu để kiểm tra nhanh các thuốc cần quan tâm.

Lý do thực hiện:

Quản lý tồn kho là nghiệp vụ quan trọng để tránh thiếu thuốc hoặc sai lệch số lượng khi bán hàng.

Acceptance Criteria:

- Hệ thống hiển thị danh sách thuốc trong kho.

- Hiển thị được số lượng tồn của từng thuốc.

- Có thể tìm kiếm thuốc trong danh sách tồn kho.

- Có thể lọc theo trạng thái tồn kho.

**US-11 - Cảnh báo thuốc sắp hết**

Nhóm cần xây dựng chức năng cảnh báo thuốc sắp hết để nhân viên kho biết thuốc nào cần nhập thêm.

Hệ thống sẽ dựa vào ngưỡng tồn kho tối thiểu để xác định thuốc sắp hết. Các thuốc này cần được hiển thị rõ trên màn hình tồn kho hoặc dashboard.

Lý do thực hiện:

Chức năng này giúp nhà thuốc chủ động nhập thuốc, tránh trường hợp hết thuốc khi khách cần mua.

Acceptance Criteria:

- Hệ thống xác định thuốc sắp hết dựa trên ngưỡng tồn kho.

- Thuốc sắp hết được hiển thị bằng nhãn hoặc trạng thái cảnh báo.

- Người dùng có thể lọc danh sách thuốc sắp hết.

- Cảnh báo thay đổi khi số lượng tồn được cập nhật.

**US-12 - Cảnh báo thuốc gần hết hạn**

Nhóm cần xây dựng chức năng cảnh báo thuốc gần hết hạn để nhân viên kho theo dõi hạn sử dụng của thuốc.

Hệ thống sẽ xác định thuốc gần hết hạn dựa trên số ngày cấu hình, ví dụ còn dưới 30 ngày. Các thuốc gần hết hạn cần được hiển thị rõ để nhân viên kho có thể kiểm tra và xử lý.

Lý do thực hiện:

Thuốc là hàng hóa đặc thù, cần theo dõi hạn sử dụng để tránh bán hoặc lưu kho thuốc quá hạn.

Acceptance Criteria:

- Hệ thống xác định thuốc gần hết hạn theo ngưỡng ngày quy định.

- Thuốc gần hết hạn được hiển thị rõ trên giao diện.

- Người dùng có thể lọc danh sách thuốc gần hết hạn.

- Cảnh báo cập nhật theo dữ liệu hạn sử dụng.

**US-13 - Tạo phiếu nhập thuốc**

Nhóm cần xây dựng chức năng tạo phiếu nhập thuốc để ghi nhận việc nhập thuốc vào kho.

Nhân viên kho có thể tạo phiếu nhập mới với thông tin ngày nhập, nhà cung cấp, người tạo và ghi chú nếu cần. Phiếu nhập sau đó sẽ được dùng để thêm chi tiết các thuốc được nhập.

Lý do thực hiện:

Phiếu nhập giúp nhà thuốc quản lý lịch sử nhập hàng và làm cơ sở cập nhật tồn kho.

Acceptance Criteria:

- Nhân viên kho có thể tạo phiếu nhập mới.

- Phiếu nhập lưu thông tin ngày nhập, nhà cung cấp và người tạo.

- Phiếu nhập có trạng thái nháp hoặc đã xác nhận.

- Phiếu nhập được lưu vào lịch sử nhập kho.

**US-14 - Thêm nhiều thuốc vào phiếu nhập**

Nhóm cần xây dựng chức năng thêm nhiều thuốc vào phiếu nhập để nhân viên kho có thể nhập nhiều loại thuốc trong một lần.

Mỗi dòng chi tiết trong phiếu nhập gồm thuốc, số lượng nhập, giá nhập và hạn sử dụng. Khi phiếu nhập được xác nhận, hệ thống sẽ cập nhật số lượng tồn kho tương ứng.

Lý do thực hiện:

Trong thực tế, một lần nhập hàng thường có nhiều loại thuốc khác nhau nên hệ thống cần hỗ trợ nhập nhiều dòng chi tiết.

Acceptance Criteria:

- Nhân viên kho có thể thêm nhiều dòng thuốc vào phiếu nhập.

- Mỗi dòng có thuốc, số lượng, giá nhập và hạn sử dụng.

- Hệ thống kiểm tra số lượng và giá nhập phải hợp lệ.

- Khi xác nhận phiếu nhập, tồn kho được cập nhật.

**US-15 - Lưu thông tin khách hàng**

Nhóm cần xây dựng chức năng lưu thông tin khách hàng cơ bản để hỗ trợ bán thuốc và tra cứu lịch sử mua hàng.

Nhân viên nhà thuốc có thể lưu tên, số điện thoại và ghi chú cơ bản của khách hàng. Trong phạm vi MVP, khách hàng không cần đăng nhập vào hệ thống.

Lý do thực hiện:

Thông tin khách hàng giúp nhà thuốc tra cứu giao dịch và hỗ trợ tốt hơn trong những lần mua sau.

Acceptance Criteria:

- Nhân viên có thể thêm khách hàng mới.

- Thông tin tối thiểu gồm tên và số điện thoại.

- Có thể tìm khách hàng khi tạo đơn bán thuốc.

- Khách hàng không bắt buộc phải có tài khoản đăng nhập.

**US-16 - Xem lịch sử mua hàng của khách hàng**

Nhóm cần xây dựng chức năng xem lịch sử mua hàng của khách hàng để nhân viên có thể tra cứu các giao dịch trước đó.

Khi mở chi tiết khách hàng, hệ thống hiển thị các đơn hàng đã mua, ngày mua, tổng tiền và trạng thái thanh toán. Chức năng này giúp nhóm thể hiện được sự liên kết giữa khách hàng và đơn hàng.

Lý do thực hiện:

Lịch sử mua hàng giúp nhà thuốc theo dõi giao dịch và hỗ trợ tra cứu thông tin khi cần.

Acceptance Criteria:

- Người dùng có thể mở chi tiết khách hàng.

- Hệ thống hiển thị danh sách đơn hàng của khách hàng.

- Mỗi đơn hàng có ngày mua, tổng tiền và trạng thái thanh toán.

- Nếu khách hàng chưa có đơn hàng, hệ thống hiển thị thông báo phù hợp.

**US-17 - Tạo đơn bán thuốc**

Nhóm cần xây dựng chức năng tạo đơn bán thuốc để ghi nhận giao dịch bán thuốc tại quầy.

Nhân viên nhà thuốc có thể tạo đơn bán mới, chọn khách hàng nếu có và bắt đầu thêm thuốc vào đơn. Đơn hàng sẽ là trung tâm của luồng bán thuốc, kiểm tra tồn kho, kiểm tra tương tác thuốc, thanh toán và hóa đơn.

Lý do thực hiện:

Đây là nghiệp vụ chính của nhà thuốc và là một trong những luồng demo quan trọng nhất của đồ án.

Acceptance Criteria:

- Nhân viên nhà thuốc có thể tạo đơn bán thuốc mới.

- Có thể chọn khách hàng hoặc tạo đơn không gắn khách hàng.

- Đơn hàng có trạng thái ban đầu phù hợp.

- Đơn hàng được lưu để tiếp tục thêm thuốc và thanh toán.

**US-18 - Thêm thuốc vào đơn hàng**

Nhóm cần xây dựng chức năng thêm thuốc vào đơn hàng để nhân viên lập danh sách thuốc khách mua.

Nhân viên có thể tìm kiếm thuốc, thêm thuốc vào đơn, chỉnh số lượng và xem thành tiền. Hệ thống cần tính tổng tiền đơn hàng dựa trên các dòng thuốc đã thêm.

Lý do thực hiện:

Chức năng này là bước chính trong luồng bán thuốc tại quầy.

Acceptance Criteria:

- Nhân viên có thể tìm kiếm thuốc và thêm vào đơn hàng.

- Có thể cập nhật số lượng thuốc trong đơn.

- Hệ thống tính thành tiền từng dòng thuốc.

- Hệ thống tính tổng tiền đơn hàng.

**US-19 - Kiểm tra tồn kho khi bán**

Nhóm cần xây dựng chức năng kiểm tra tồn kho khi bán để tránh việc bán thuốc vượt quá số lượng hiện có.

Khi nhân viên thêm thuốc hoặc thay đổi số lượng trong đơn hàng, hệ thống kiểm tra số lượng tồn kho. Nếu số lượng bán vượt tồn, hệ thống hiển thị cảnh báo và không cho thanh toán.

Lý do thực hiện:

Đây là rule nghiệp vụ quan trọng giúp dữ liệu tồn kho không bị âm và phản ánh đúng tình trạng thực tế.

Acceptance Criteria:

- Hệ thống kiểm tra tồn kho khi thêm thuốc vào đơn.

- Hệ thống kiểm tra lại khi thay đổi số lượng thuốc.

- Nếu số lượng bán vượt tồn kho, hệ thống hiển thị cảnh báo.

- Không cho thanh toán đơn hàng nếu có thuốc vượt tồn.

**US-20 - Kiểm tra tương tác thuốc**

Nhóm cần xây dựng chức năng kiểm tra tương tác thuốc theo rule-based data khi đơn hàng có từ hai thuốc trở lên.

Hệ thống sẽ so sánh từng cặp thuốc trong đơn hàng với dữ liệu mẫu trong bảng tương tác thuốc. Nếu có cặp thuốc tương tác, hệ thống trả về danh sách cảnh báo để hiển thị cho nhân viên nhà thuốc.

Lý do thực hiện:

Đây là chức năng nổi bật của đề tài, giúp PharmaAssist khác với một website bán hàng thông thường.

Acceptance Criteria:

- Hệ thống chỉ kiểm tra tương tác khi đơn hàng có từ hai thuốc trở lên.

- Hệ thống so sánh từng cặp thuốc trong đơn hàng.

- Dữ liệu tương tác thuốc sử dụng dữ liệu mẫu cho đồ án.

- Nếu phát hiện tương tác, hệ thống trả về danh sách cảnh báo.

**US-21 - Xem chi tiết cảnh báo tương tác thuốc**

Nhóm cần xây dựng giao diện xem chi tiết cảnh báo tương tác thuốc để nhân viên nhà thuốc có thông tin tham khảo khi bán nhiều thuốc cùng lúc.

Cảnh báo cần hiển thị tên hai thuốc, mức độ cảnh báo, mô tả nguy cơ và khuyến nghị xử lý. Nội dung cảnh báo chỉ là dữ liệu mẫu phục vụ đồ án, không dùng thay thế tư vấn y tế thật.

Lý do thực hiện:

Chức năng này giúp thể hiện rõ điểm nhấn của đề tài trong luồng demo bán thuốc.

Acceptance Criteria:

- Cảnh báo hiển thị tên hai thuốc liên quan.

- Cảnh báo hiển thị mức độ nhẹ, trung bình hoặc cao.

- Cảnh báo hiển thị mô tả nguy cơ.

- Cảnh báo hiển thị khuyến nghị xử lý.

- Giao diện có disclaimer an toàn.

**US-22 - Ghi chú tư vấn sau cảnh báo**

Nhóm cần xây dựng chức năng ghi chú tư vấn sau khi hệ thống hiển thị cảnh báo tương tác thuốc.

Nhân viên nhà thuốc có thể nhập ghi chú để lưu lại nội dung đã tư vấn hoặc hướng xử lý tham khảo. Ghi chú này được gắn với đơn hàng hoặc cảnh báo tương tác để có thể xem lại khi cần.

Lý do thực hiện:

Chức năng này giúp luồng cảnh báo tương tác thuốc đầy đủ hơn và có tính nghiệp vụ hơn trong demo.

Acceptance Criteria:

- Nhân viên có thể nhập ghi chú tư vấn.

- Ghi chú được lưu theo đơn hàng hoặc cảnh báo tương tác.

- Có thể xem lại ghi chú trong chi tiết đơn hàng.

- Ghi chú chỉ mang tính tham khảo trong phạm vi đồ án.

**US-23 - Thanh toán đơn hàng**

Nhóm cần xây dựng chức năng thanh toán để hoàn tất đơn bán thuốc.

Nhân viên nhà thuốc có thể xem tổng tiền, chọn phương thức thanh toán và xác nhận thanh toán. Sau khi thanh toán thành công, trạng thái đơn hàng được cập nhật và hệ thống có thể tạo hóa đơn.

Lý do thực hiện:

Thanh toán là bước bắt buộc để hoàn thành luồng bán thuốc tại quầy.

Acceptance Criteria:

- Nhân viên có thể xem tổng tiền cần thanh toán.

- Nhân viên chọn được phương thức thanh toán.

- Sau khi thanh toán, trạng thái đơn hàng được cập nhật.

- Không cho thanh toán nếu đơn hàng trống hoặc có lỗi tồn kho.

**US-24 - Tạo và xem/in hóa đơn**

Nhóm cần xây dựng chức năng tạo và xem hóa đơn sau khi đơn hàng được thanh toán.

Hóa đơn cần hiển thị thông tin đơn hàng, khách hàng nếu có, danh sách thuốc, số lượng, đơn giá, tổng tiền và thời gian thanh toán. Trong phạm vi đồ án, chức năng in hóa đơn có thể thực hiện ở mức demo.

Lý do thực hiện:

Hóa đơn giúp hoàn thiện luồng bán hàng và là bằng chứng giao dịch cho khách hàng.

Acceptance Criteria:

- Hệ thống tạo hóa đơn sau khi thanh toán thành công.

- Hóa đơn hiển thị thông tin đơn hàng và danh sách thuốc.

- Hóa đơn hiển thị tổng tiền và thời gian thanh toán.

- Người dùng có thể xem hoặc in hóa đơn ở mức demo.

**US-25 - Xem dashboard tổng quan**

Nhóm cần xây dựng dashboard tổng quan để Admin hoặc chủ nhà thuốc có thể xem nhanh tình hình hoạt động của hệ thống.

Dashboard có thể hiển thị số đơn hàng, doanh thu, thuốc sắp hết, thuốc gần hết hạn và một số chỉ số chính khác. Đây là màn hình giúp demo hệ thống trực quan hơn.

Lý do thực hiện:

Dashboard giúp người quản lý nắm thông tin nhanh mà không cần đi vào từng màn hình chi tiết.

Acceptance Criteria:

- Dashboard hiển thị số lượng đơn hàng.

- Dashboard hiển thị doanh thu tổng quan.

- Dashboard hiển thị cảnh báo tồn kho.

- Dữ liệu dashboard lấy từ dữ liệu demo của hệ thống.

**US-26 - Xem báo cáo doanh thu**

Nhóm cần xây dựng chức năng báo cáo doanh thu để Admin theo dõi kết quả bán hàng.

Báo cáo lấy dữ liệu từ các đơn hàng đã thanh toán. Người dùng có thể xem doanh thu theo ngày hoặc tháng tùy phạm vi triển khai của nhóm.

Lý do thực hiện:

Báo cáo doanh thu là chức năng cần có trong hệ thống quản lý nhà thuốc và giúp phần demo có dữ liệu thống kê.

Acceptance Criteria:

- Hệ thống tính doanh thu từ các đơn hàng đã thanh toán.

- Có thể xem doanh thu theo ngày hoặc tháng.

- Báo cáo hiển thị tổng doanh thu và số đơn hàng.

- Dữ liệu báo cáo phù hợp với dữ liệu demo.

**US-27 - Xem báo cáo thuốc bán chạy**

Nhóm cần xây dựng chức năng báo cáo thuốc bán chạy để Admin biết thuốc nào được bán nhiều nhất trong dữ liệu demo.

Hệ thống thống kê số lượng bán từ chi tiết đơn hàng và hiển thị danh sách thuốc có số lượng bán cao.

Lý do thực hiện:

Báo cáo thuốc bán chạy giúp đề tài có thêm phần thống kê và hỗ trợ quản lý kinh doanh nhà thuốc.

Acceptance Criteria:

- Hệ thống thống kê thuốc bán chạy từ chi tiết đơn hàng.

- Hiển thị tên thuốc và số lượng đã bán.

- Có thể sắp xếp theo số lượng bán.

- Dữ liệu hiển thị phù hợp với đơn hàng demo.

**US-28 - Viết test case cho chức năng MVP**

Nhóm cần viết test case cho các chức năng chính trong phạm vi MVP để chuẩn bị kiểm thử trước khi demo.

Các nhóm chức năng cần có test case gồm đăng nhập, phân quyền, quản lý thuốc, tồn kho, bán thuốc, cảnh báo tương tác thuốc, thanh toán và hóa đơn.

Lý do thực hiện:

Test case giúp nhóm kiểm tra hệ thống có hoạt động đúng yêu cầu không và cũng là minh chứng cho quy trình Công Nghệ Phần Mềm.

Acceptance Criteria:

- Có test case cho các chức năng MVP quan trọng.

- Mỗi test case có bước thực hiện, dữ liệu đầu vào và kết quả mong đợi.

- Test case được lưu trong tài liệu hoặc Jira.

- Các test case chính được chạy trước buổi demo.

**US-29 - Ghi nhận bug trong quá trình kiểm thử**

Nhóm cần ghi nhận bug trong quá trình kiểm thử để theo dõi lỗi và xử lý trước khi demo.

Mỗi bug cần có tiêu đề, mô tả lỗi, bước tái hiện, mức độ ưu tiên và trạng thái xử lý. Các bug nghiêm trọng ảnh hưởng đến luồng demo phải được ưu tiên sửa trước.

Lý do thực hiện:

Việc ghi nhận bug giúp nhóm thể hiện quy trình kiểm thử và quản lý chất lượng phần mềm.

Acceptance Criteria:

- Bug có tiêu đề và mô tả rõ ràng.

- Bug có bước tái hiện lỗi.

- Bug được gắn module hoặc chức năng liên quan.

- Bug nghiêm trọng được xử lý trước buổi demo.

**US-30 - Chuẩn bị dữ liệu mẫu và kịch bản demo**

Nhóm cần chuẩn bị dữ liệu mẫu và kịch bản demo để buổi bảo vệ diễn ra ổn định.

Dữ liệu mẫu gồm tài khoản demo cho từng vai trò, thuốc mẫu, tồn kho mẫu, khách hàng mẫu, đơn hàng mẫu và dữ liệu tương tác thuốc mẫu. Kịch bản demo cần thể hiện được luồng chính: đăng nhập, bán thuốc, kiểm tra tồn kho, cảnh báo tương tác thuốc, thanh toán, hóa đơn và báo cáo.

Lý do thực hiện:

Dữ liệu demo tốt giúp nhóm tránh lỗi khi bảo vệ và giúp giảng viên dễ thấy được giá trị của hệ thống.

Acceptance Criteria:

- Có tài khoản demo cho Admin, Nhân viên nhà thuốc và Nhân viên kho.

- Có dữ liệu thuốc, tồn kho, khách hàng và đơn hàng mẫu.

- Có ít nhất một cặp thuốc tương tác mẫu để demo cảnh báo.

- Có kịch bản demo rõ ràng cho buổi bảo vệ.

Thông tin cảnh báo tương tác thuốc trong hệ thống chỉ mang tính tham khảo cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.