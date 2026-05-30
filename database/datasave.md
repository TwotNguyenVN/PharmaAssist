# Tài Liệu Đặc Tả Các Thuộc Tính Lưu Trữ Dữ Liệu Sản Phẩm & Thuốc (PharmaAssist)

Tài liệu này đặc tả chi tiết các thuộc tính dữ liệu sẽ được chọn lọc và lưu trữ từ bộ dữ liệu cào (Long Châu) vào cơ sở dữ liệu quan hệ (PostgreSQL / Supabase) của PharmaAssist. 

Mục tiêu là loại bỏ dữ liệu rác (metadata của bot cào), chuẩn hóa tên trường và tối ưu hiệu suất truy vấn thông qua các liên kết khóa ngoại số nguyên (`bigint`).

---

## 1. Danh Mục Master Data (Dữ liệu dùng chung)

### 1.1. Quốc gia (`countries`)
Lưu trữ danh sách các quốc gia sản xuất thuốc/thiết bị y tế.
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã quốc gia (Ví dụ: `CTY000001` - Ánh xạ từ `country_code`).
*   `name`: Tên quốc gia (Ví dụ: `Việt Nam` - Ánh xạ từ `country_name`).
*   `iso_code`: Mã tiêu chuẩn quốc tế (Nếu có - Ánh xạ từ `iso_code`).
*   `status`: Trạng thái hoạt động (`ACTIVE` hoặc `INACTIVE`).

### 1.2. Thương hiệu (`brands`)
Lưu trữ thông tin các thương hiệu sản phẩm.
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã thương hiệu (Ví dụ: `BRD000001` - Ánh xạ từ `brand_code`).
*   `name`: Tên thương hiệu (Ánh xạ từ `brand_name`).
*   `slug`: Đường dẫn URL thân thiện phục vụ tìm kiếm/SEO (Ánh xạ từ `brand_slug`).
*   `logo_url`: Đường dẫn ảnh đại diện thương hiệu (Nếu có).
*   `description`: Mô tả thông tin thương hiệu.
*   `status`: Trạng thái hoạt động (`ACTIVE`).

### 1.3. Nhà sản xuất (`manufacturers`)
Thông tin về đơn vị sản xuất ra thuốc/sản phẩm.
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã nhà sản xuất (Ví dụ: `MFR000001` - Ánh xạ từ `manufacturer_code`).
*   `name`: Tên nhà sản xuất (Ánh xạ từ `manufacturer_name`).
*   `country_id`: ID của quốc gia sản xuất (Khóa ngoại, được liên kết tự động bằng cách tra cứu từ `country_code` sang bảng `countries`).
*   `address`/`phone`/`email`: Thông tin liên hệ của hãng sản xuất (Nếu có).
*   `status`: Trạng thái hoạt động (`ACTIVE`).

### 1.4. Đơn vị tính (`medicine_units`)
Danh mục các đơn vị đo lường sản phẩm (Viên, Vỉ, Hộp, Chai, Tuýp,...).
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã đơn vị (Ví dụ: `UNIT000001` - Ánh xạ từ `unit_code`).
*   `name`: Tên đơn vị (Ví dụ: `Hộp` - Ánh xạ từ `unit_name`).
*   `description`: Mô tả đơn vị tính.

### 1.5. Dạng bào chế (`dosage_forms`)
Cách thức bào chế của thuốc (Viên nén, Viên nang, Dung dịch tiêm, Hỗn dịch uống,...).
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã dạng bào chế (Ví dụ: `DOS000001` - Ánh xạ từ `dosage_form_code`).
*   `name`: Tên dạng bào chế (Ánh xạ từ `dosage_form_name`).
*   `description`: Mô tả dạng bào chế.

### 1.6. Danh mục sản phẩm (`product_categories`)
Cấu trúc cây danh mục cha-con quản lý sản phẩm.
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `parent_id`: ID danh mục cha (Khóa ngoại tự liên kết). Được tìm kiếm và gán bằng cách so khớp `parent_category_code` của danh mục cha.
*   `code`: Mã danh mục (Ví dụ: `CAT000001` - Ánh xạ từ `category_code`).
*   `name`: Tên danh mục (Ánh xạ từ `category_name`).
*   `slug`: Đường dẫn URL thân thiện (Ánh xạ từ `category_slug`).
*   `sort_order`: Thứ tự hiển thị trên giao diện.
*   `status`: Trạng thái hoạt động (`ACTIVE`).

### 1.7. Phân cấp danh mục đóng gói (`category_closures`)
Bảng liên kết quản lý cấu trúc cây đa cấp (Ancestors & Descendants) của danh mục sản phẩm phục vụ đệ quy nhanh.
*   `ancestor_id`: ID của danh mục tổ tiên (Khóa ngoại liên kết `product_categories.id`).
*   `descendant_id`: ID của danh mục con cháu (Khóa ngoại liên kết `product_categories.id`).
*   `depth`: Độ sâu phân cấp (Ví dụ: 0 là chính nó, 1 là cha-con, 2 là ông-cháu).

### 1.8. Hoạt chất (`active_ingredients`)
Danh sách các chất hóa dược, dược chất có trong thuốc.
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã hoạt chất (Ví dụ: `ING000001` - Ánh xạ từ `ingredient_code`).
*   `name`: Tên hoạt chất (Ví dụ: `Paracetamol` - Ánh xạ từ `ingredient_name`).
*   `description`: Giải thích chi tiết, công dụng của hoạt chất.
*   `status`: Trạng thái hoạt động (`ACTIVE`).

---

## 2. Danh Mục Nghiệp Vụ Sản Phẩm & Thuốc (Product Data)

### 2.1. Sản phẩm tổng quát (`products`)
Bảng chứa thông tin chung của tất cả mặt hàng (Thuốc, thực phẩm chức năng, thiết bị y tế, mỹ phẩm).
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `code`: Mã sản phẩm (Ví dụ: `P000001` - Ánh xạ từ `product_code`).
*   `name`: Tên sản phẩm đầy đủ (Ánh xạ từ `product_name`).
*   `slug`: Đường dẫn URL thân thiện của sản phẩm (Ánh xạ từ `product_slug`).
*   `category_id`: ID danh mục sản phẩm (Khóa ngoại liên kết `product_categories.id`).
*   `brand_id`: ID thương hiệu (Khóa ngoại liên kết `brands.id`, có thể NULL).
*   `manufacturer_id`: ID nhà sản xuất (Khóa ngoại liên kết `manufacturers.id`, có thể NULL).
*   `product_type`: Phân loại mặt hàng (Ví dụ: `MEDICINE`, `SUPPLEMENT`, `DEVICE`, `COSMETIC` - Ánh xạ từ `product_type`).
*   `short_description`: Mô tả ngắn gọn thông tin sản phẩm.
*   `description`: Mô tả chi tiết cách dùng, đối tượng sử dụng (Nếu có).
*   `status`: Trạng thái kinh doanh (Mặc định: `ACTIVE` - Ánh xạ từ `price_status`).

### 2.2. Biến thể sản phẩm (`product_variants`)
Các quy cách đóng gói và bán thực tế (ví dụ: Hộp 3 vỉ, Hộp 10 vỉ, Hộp 30 viên).
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `product_id`: ID sản phẩm tổng quát (Khóa ngoại liên kết `products.id`).
*   `sku`: Mã quản lý kho hàng độc nhất (Ví dụ: `SKU-P000001-Hộp` - Ánh xạ từ `sku`).
*   `variant_name`: Tên biến thể quy cách (Ví dụ: *"Hộp 3 vỉ x 10 viên"* - Ánh xạ kết hợp từ `unit_name` và `packaging_size`).
*   `unit_id`: ID đơn vị tính (Khóa ngoại liên kết `medicine_units.id`).
*   `selling_price`: Giá bán lẻ thực tế (Ánh xạ từ cột `price` trong bảng giá cào được).
*   `status`: Trạng thái kinh doanh (`ACTIVE`).

### 2.3. Hình ảnh sản phẩm (`product_images`)
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `product_id`: ID sản phẩm liên kết (Khóa ngoại liên kết `products.id`).
*   `image_url`: Đường dẫn ảnh sản phẩm.
*   `is_primary`: Đánh dấu ảnh chính hiển thị trên trang chủ (`true`/`false`).
*   `sort_order`: Thứ tự hiển thị hình ảnh.

### 2.4. Thông tin chuyên biệt cho Thuốc (`medicines`)
Mở rộng từ bảng `products`, chỉ lưu trữ thêm nếu mặt hàng là `MEDICINE` (Thuốc).
*   `id`: Khóa chính (Số nguyên tự tăng).
*   `product_id`: ID sản phẩm liên kết trong bảng `products` (Khóa ngoại).
*   `medicine_code`: Mã thuốc duy nhất (Ánh xạ từ `product_code`).
*   `registration_number`: Số đăng ký lưu hành của Bộ Y tế (Ví dụ: `VD-20123-13` - Ánh xạ từ `registration_number`).
*   `dosage_form_id`: ID dạng bào chế (Khóa ngoại liên kết `dosage_forms.id`).
*   `medicine_unit_id`: ID đơn vị tính cơ bản của thuốc (Khóa ngoại liên kết `medicine_units.id`).
*   `requires_prescription`: Thuốc có cần kê đơn hay không (`true`/`false` - Ánh xạ từ `requires_prescription`).
*   `storage_instruction`: Hướng dẫn bảo quản tổng hợp (Ánh xạ kết hợp từ `temperature_condition`, `light_condition`, `humidity_condition` thành chuỗi văn bản).
*   `usage_note`: Lưu ý đặc biệt khi sử dụng thuốc.

### 2.5. Thành phần chi tiết của thuốc (`medicine_ingredients`)
Liên kết nhiều - nhiều biểu diễn hàm lượng các hoạt chất có trong một loại thuốc.
*   `id`: Khóa chính.
*   `medicine_id`: ID của thuốc (Khóa ngoại liên kết `medicines.id`).
*   `active_ingredient_id`: ID của hoạt chất (Khóa ngoại liên kết `active_ingredients.id`).
*   `strength`: Hàm lượng/Nồng độ hoạt chất (Ví dụ: *"500mg"*, *"10ml/g"* - Ánh xạ từ sự kết hợp của `strength_value` và `strength_unit`).
*   `note`: Ghi chú thêm về thành phần.

### 2.6. Tài liệu đính kèm sản phẩm (`product_documents`)
Lưu trữ thông tin tờ hướng dẫn sử dụng chi tiết (Leaflet/HDSD).
*   `id`: Khóa chính.
*   `product_id`: ID sản phẩm liên kết (Khóa ngoại liên kết `products.id`).
*   `file_url`: Link chứa tài liệu gốc (Nếu có).
*   `file_type`: Loại tài liệu (Mặc định: `TEXT` hoặc `PDF`).
*   `title`: Tiêu đề tài liệu (Ví dụ: *"Tờ hướng dẫn sử dụng chi tiết"*).

---

## 3. Các Thuộc Tính Loại Bỏ (Discarded Fields)

Các thuộc tính sau đây trong tệp tin cào thô sẽ **BỊ LOẠI BỎ** (Không lưu trữ vào database hệ thống):
1.  **`source_name`**: Giá trị luôn là `Nhà thuốc Long Châu` (đã biết trước, không cần lưu trữ lặp lại hàng triệu lần).
2.  **`source_url`**: Đường dẫn URL tới sản phẩm trên web gốc (chỉ phục vụ audit cào dữ liệu, không dùng cho nghiệp vụ bán hàng).
3.  **`source_note`**: Ghi chú đồ án (Không có giá trị nghiệp vụ).
4.  **`is_demo_data`**: Luôn là `true` (Không cần thiết).
5.  **`collected_at`**: Thời gian chạy tool cào dữ liệu (Không cần thiết).
6.  **`rating_average` & `review_count`**: Được thay thế bằng tính toán động (Aggregation) từ các đánh giá thực tế phát sinh trên hệ thống PharmaAssist.
