# 12_API_SPECIFICATION

**Mã tài liệu:** 12_API_Specification  
**Tên tài liệu:** API Specification Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu đặc tả API  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Backend Developer, Frontend Developer, Tester, System Analyst, Database Designer, AI/Graph Developer, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **API Specification** mô tả danh sách API của hệ thống **PharmaAssist AI Intelligence**, bao gồm method, endpoint, mục đích sử dụng, actor được phép gọi, request body, query parameter, path parameter, response chính và các lỗi có thể xảy ra.

Tài liệu này là cầu nối giữa frontend và backend. Frontend dựa vào tài liệu này để gọi API đúng endpoint, đúng method và đúng dữ liệu. Backend dựa vào tài liệu này để triển khai controller/service. Tester dựa vào tài liệu này để viết test case API và test case tích hợp.

Tài liệu này giúp nhóm:

- Thống nhất danh sách API cần xây dựng.
- Tránh frontend và backend hiểu sai format request/response.
- Xác định API nào cần đăng nhập và phân quyền.
- Xác định bảng dữ liệu liên quan đến từng API.
- Làm cơ sở viết test case API.
- Làm cơ sở tạo Postman Collection hoặc Swagger/OpenAPI.
- Làm cơ sở trình bày kiến trúc backend trong báo cáo.

---

## 2. Phạm vi API

Tài liệu này mô tả API cho các module chính:

- Auth API.
- User & Role API.
- Medicine API.
- Medicine Category API.
- Inventory API.
- Stock Import API.
- Customer API.
- Sales/Order API.
- Interaction API.
- Payment API.
- Invoice API.
- Report API.
- AI API.
- Graph API.
- Audit API.

Trong MVP, nhóm cần ưu tiên các API Auth, Medicine, Inventory, Stock Import, Sales, Interaction, Payment, Invoice và Report. API AI/Graph/Audit có thể triển khai thật hoặc mô phỏng tùy tiến độ.

---

## 3. Quy ước chung

### 3.1. Base URL đề xuất

```text
Local development:
http://localhost:3000/api

Production/demo nếu có:
https://pharmaassist-demo.example.com/api
```

Ghi chú: URL production chỉ là ví dụ. Trong đồ án, nhóm có thể dùng local hoặc Docker.

### 3.2. API style

Hệ thống sử dụng REST API với JSON.

| Thành phần | Quy ước |
|---|---|
| Request body | JSON |
| Response body | JSON |
| Authentication | Bearer Token / JWT |
| Date format | ISO 8601, ví dụ 2026-05-17T10:00:00Z |
| Pagination | page, limit |
| Sorting | sortBy, sortOrder |
| Filtering | Query parameter |

### 3.3. Header chung

Các API cần đăng nhập sử dụng header:

```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

### 3.4. Quy ước actor

| Actor trong tài liệu | Ý nghĩa |
|---|---|
| Public | Không cần đăng nhập |
| User | Người dùng đã đăng nhập |
| Admin | Admin/Chủ nhà thuốc |
| Staff | Nhân viên nhà thuốc |
| Warehouse | Nhân viên kho |
| AI System | Thành phần AI nội bộ |
| Graph System | Neo4j/Graph service nội bộ |

---

## 4. Quy ước response

### 4.1. Response thành công

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

### 4.2. Response lỗi

```json
{
  "success": false,
  "errorCode": "VALIDATION_ERROR",
  "message": "Invalid input"
}
```

### 4.3. Response phân trang

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  },
  "message": "Success"
}
```

---

## 5. Quy ước mã lỗi

| Error Code | HTTP Status | Ý nghĩa |
|---|---:|---|
| VALIDATION_ERROR | 400 | Dữ liệu đầu vào không hợp lệ |
| UNAUTHORIZED | 401 | Chưa đăng nhập hoặc token không hợp lệ |
| FORBIDDEN | 403 | Không đủ quyền truy cập |
| NOT_FOUND | 404 | Không tìm thấy dữ liệu |
| CONFLICT | 409 | Dữ liệu bị trùng hoặc xung đột trạng thái |
| BUSINESS_RULE_VIOLATION | 422 | Vi phạm rule nghiệp vụ |
| INTERNAL_ERROR | 500 | Lỗi hệ thống |
| AI_PROVIDER_ERROR | 502 | Lỗi từ AI provider |
| GRAPH_QUERY_ERROR | 502 | Lỗi truy vấn graph |

### 5.1. Ví dụ lỗi validation

```json
{
  "success": false,
  "errorCode": "VALIDATION_ERROR",
  "message": "Medicine name is required"
}
```

### 5.2. Ví dụ lỗi phân quyền

```json
{
  "success": false,
  "errorCode": "FORBIDDEN",
  "message": "You do not have permission to access this resource"
}
```

### 5.3. Ví dụ lỗi nghiệp vụ

```json
{
  "success": false,
  "errorCode": "BUSINESS_RULE_VIOLATION",
  "message": "Cannot sell quantity greater than available stock"
}
```

---

## 6. API Auth

### 6.1. Danh sách API Auth

| Method | Endpoint | Mô tả | Actor | Request | Response |
|---|---|---|---|---|---|
| POST | /auth/login | Đăng nhập | Public | username, password | accessToken, user |
| POST | /auth/logout | Đăng xuất | User | token | success |
| GET | /auth/me | Lấy thông tin user hiện tại | User | token | user info |

---

### 6.2. POST /auth/login

**Mô tả:** Đăng nhập vào hệ thống bằng username và password.

| Mục | Nội dung |
|---|---|
| Method | POST |
| Endpoint | /auth/login |
| Actor | Public |
| Authentication | Không cần |
| Module | Auth Module |
| Database | users, roles, user_roles |

#### Request body

```json
{
  "username": "admin01",
  "password": "123456"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_access_token_here",
    "user": {
      "id": 1,
      "fullName": "Admin Demo",
      "username": "admin01",
      "roles": ["ADMIN"]
    }
  },
  "message": "Login successful"
}
```

#### Lỗi có thể xảy ra

| Error Code | Mô tả |
|---|---|
| VALIDATION_ERROR | Thiếu username hoặc password |
| UNAUTHORIZED | Username hoặc password không đúng |
| FORBIDDEN | Tài khoản bị khóa |

---

### 6.3. POST /auth/logout

**Mô tả:** Đăng xuất khỏi hệ thống.

| Mục | Nội dung |
|---|---|
| Method | POST |
| Endpoint | /auth/logout |
| Actor | User |
| Authentication | Bearer Token |
| Module | Auth Module |

#### Request header

```http
Authorization: Bearer <accessToken>
```

#### Response thành công

```json
{
  "success": true,
  "data": null,
  "message": "Logout successful"
}
```

---

### 6.4. GET /auth/me

**Mô tả:** Lấy thông tin người dùng hiện tại.

| Mục | Nội dung |
|---|---|
| Method | GET |
| Endpoint | /auth/me |
| Actor | User |
| Authentication | Bearer Token |
| Module | Auth Module |

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Admin Demo",
    "username": "admin01",
    "roles": ["ADMIN"]
  },
  "message": "Success"
}
```

---

## 7. API User & Role

### 7.1. Danh sách API User & Role

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /users | Lấy danh sách user | Admin |
| POST | /users | Tạo user | Admin |
| GET | /users/{id} | Xem chi tiết user | Admin |
| PUT | /users/{id} | Cập nhật user | Admin |
| PATCH | /users/{id}/status | Khóa/mở tài khoản | Admin |
| GET | /roles | Lấy danh sách role | Admin |
| POST | /users/{id}/roles | Gán role cho user | Admin |

### 7.2. POST /users

#### Request body

```json
{
  "fullName": "Nguyen Van A",
  "username": "staff01",
  "password": "123456",
  "roles": ["STAFF"]
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 2,
    "fullName": "Nguyen Van A",
    "username": "staff01",
    "roles": ["STAFF"],
    "status": "ACTIVE"
  },
  "message": "User created successfully"
}
```

---

## 8. API Medicine

### 8.1. Danh sách API Medicine

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /medicines | Lấy danh sách thuốc | Admin, Staff, Warehouse |
| GET | /medicines/{id} | Xem chi tiết thuốc | Admin, Staff, Warehouse |
| POST | /medicines | Thêm thuốc | Admin |
| PUT | /medicines/{id} | Cập nhật thuốc | Admin |
| DELETE | /medicines/{id} | Xóa/ẩn thuốc | Admin |

---

### 8.2. GET /medicines

**Mô tả:** Lấy danh sách thuốc, hỗ trợ tìm kiếm, lọc và phân trang.

| Mục | Nội dung |
|---|---|
| Method | GET |
| Endpoint | /medicines |
| Actor | Admin, Staff, Warehouse |
| Authentication | Bearer Token |
| Module | Medicine Module |
| Database | medicines, medicine_categories |

#### Query parameters

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| keyword | string | Không | Tìm theo tên hoặc mã thuốc |
| categoryId | number | Không | Lọc theo danh mục |
| status | string | Không | ACTIVE/INACTIVE |
| page | number | Không | Trang hiện tại |
| limit | number | Không | Số dòng mỗi trang |

#### Ví dụ request

```text
GET /medicines?keyword=para&page=1&limit=10
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "code": "MED001",
        "name": "Thuốc mẫu A",
        "category": {
          "id": 1,
          "name": "Giảm đau"
        },
        "unit": "Hộp",
        "sellingPrice": 50000,
        "status": "ACTIVE"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 1,
      "totalPages": 1
    }
  },
  "message": "Success"
}
```

---

### 8.3. GET /medicines/{id}

**Mô tả:** Xem chi tiết thuốc.

| Mục | Nội dung |
|---|---|
| Method | GET |
| Endpoint | /medicines/{id} |
| Actor | Admin, Staff, Warehouse |

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "MED001",
    "name": "Thuốc mẫu A",
    "categoryId": 1,
    "categoryName": "Giảm đau",
    "unit": "Hộp",
    "sellingPrice": 50000,
    "description": "Dữ liệu thuốc mẫu phục vụ đồ án",
    "status": "ACTIVE"
  },
  "message": "Success"
}
```

---

### 8.4. POST /medicines

**Mô tả:** Admin thêm thuốc mới.

| Mục | Nội dung |
|---|---|
| Method | POST |
| Endpoint | /medicines |
| Actor | Admin |

#### Request body

```json
{
  "code": "MED001",
  "name": "Thuốc mẫu A",
  "categoryId": 1,
  "unit": "Hộp",
  "sellingPrice": 50000,
  "description": "Dữ liệu thuốc mẫu phục vụ đồ án",
  "status": "ACTIVE"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "MED001",
    "name": "Thuốc mẫu A"
  },
  "message": "Medicine created successfully"
}
```

#### Lỗi có thể xảy ra

| Error Code | Mô tả |
|---|---|
| VALIDATION_ERROR | Thiếu tên thuốc, mã thuốc hoặc giá không hợp lệ |
| CONFLICT | Mã thuốc đã tồn tại |
| FORBIDDEN | Người dùng không phải Admin |

---

### 8.5. PUT /medicines/{id}

#### Request body

```json
{
  "name": "Thuốc mẫu A cập nhật",
  "categoryId": 1,
  "unit": "Hộp",
  "sellingPrice": 55000,
  "description": "Cập nhật mô tả thuốc mẫu",
  "status": "ACTIVE"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Thuốc mẫu A cập nhật"
  },
  "message": "Medicine updated successfully"
}
```

---

### 8.6. DELETE /medicines/{id}

**Mô tả:** Xóa mềm hoặc chuyển thuốc sang trạng thái inactive.

#### Response thành công

```json
{
  "success": true,
  "data": null,
  "message": "Medicine deleted successfully"
}
```

Ghi chú: Nên dùng xóa mềm/inactive thay vì xóa cứng nếu thuốc đã có trong đơn hàng.

---

## 9. API Medicine Category

### 9.1. Danh sách API Category

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /categories | Lấy danh sách danh mục | Admin, Staff, Warehouse |
| GET | /categories/{id} | Xem chi tiết danh mục | Admin, Staff, Warehouse |
| POST | /categories | Thêm danh mục | Admin |
| PUT | /categories/{id} | Cập nhật danh mục | Admin |
| DELETE | /categories/{id} | Xóa/ẩn danh mục | Admin |

### 9.2. POST /categories

#### Request body

```json
{
  "name": "Giảm đau",
  "description": "Danh mục thuốc mẫu"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Giảm đau"
  },
  "message": "Category created successfully"
}
```

---

## 10. API Inventory

### 10.1. Danh sách API Inventory

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /inventories | Xem tồn kho | Admin, Warehouse, Staff |
| GET | /inventory/low-stock | Thuốc sắp hết | Admin, Warehouse, Staff |
| GET | /inventory/near-expiry | Thuốc gần hết hạn | Admin, Warehouse, Staff |
| POST | /stock-imports | Tạo phiếu nhập | Admin, Warehouse |
| GET | /stock-imports | Xem lịch sử nhập | Admin, Warehouse |
| GET | /stock-imports/{id} | Xem chi tiết phiếu nhập | Admin, Warehouse |
| POST | /stock-imports/{id}/confirm | Xác nhận phiếu nhập | Admin, Warehouse |

---

### 10.2. GET /inventories

**Mô tả:** Xem danh sách tồn kho.

#### Query parameters

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| keyword | string | Không | Tìm theo tên/mã thuốc |
| lowStockOnly | boolean | Không | Chỉ lấy thuốc sắp hết |
| page | number | Không | Trang |
| limit | number | Không | Số dòng |

#### Response thành công

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "medicineId": 1,
        "medicineCode": "MED001",
        "medicineName": "Thuốc mẫu A",
        "quantity": 20,
        "minStock": 10,
        "expiryDate": "2026-12-31",
        "isLowStock": false,
        "isNearExpiry": false
      }
    ]
  },
  "message": "Success"
}
```

---

### 10.3. GET /inventory/low-stock

**Mô tả:** Lấy danh sách thuốc dưới hoặc bằng ngưỡng tồn kho tối thiểu.

#### Response thành công

```json
{
  "success": true,
  "data": [
    {
      "medicineId": 2,
      "medicineName": "Thuốc mẫu B",
      "quantity": 5,
      "minStock": 10,
      "message": "Thuốc sắp hết hàng"
    }
  ],
  "message": "Success"
}
```

---

### 10.4. GET /inventory/near-expiry

**Mô tả:** Lấy danh sách thuốc gần hết hạn trong khoảng ngày cấu hình.

#### Query parameters

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| days | number | Không | Số ngày cảnh báo, mặc định 60 |

#### Response thành công

```json
{
  "success": true,
  "data": [
    {
      "medicineId": 3,
      "medicineName": "Thuốc mẫu C",
      "expiryDate": "2026-06-20",
      "daysLeft": 34,
      "message": "Thuốc gần hết hạn"
    }
  ],
  "message": "Success"
}
```

---

### 10.5. POST /stock-imports

**Mô tả:** Tạo phiếu nhập thuốc.

#### Request body

```json
{
  "supplierId": 1,
  "importDate": "2026-05-17",
  "items": [
    {
      "medicineId": 1,
      "quantity": 100,
      "importPrice": 30000,
      "expiryDate": "2027-05-17"
    }
  ],
  "note": "Phiếu nhập demo"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "DRAFT",
    "totalItems": 1
  },
  "message": "Stock import created successfully"
}
```

---

### 10.6. POST /stock-imports/{id}/confirm

**Mô tả:** Xác nhận phiếu nhập và cập nhật tồn kho.

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "CONFIRMED"
  },
  "message": "Stock import confirmed and inventory updated"
}
```

---

## 11. API Customer

### 11.1. Danh sách API Customer

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /customers | Lấy danh sách khách hàng | Admin, Staff |
| GET | /customers/{id} | Xem chi tiết khách hàng | Admin, Staff |
| POST | /customers | Thêm khách hàng | Admin, Staff |
| PUT | /customers/{id} | Cập nhật khách hàng | Admin, Staff |
| GET | /customers/{id}/orders | Lịch sử mua hàng | Admin, Staff |

### 11.2. POST /customers

#### Request body

```json
{
  "fullName": "Khach Hang Demo",
  "phone": "0900000000",
  "note": "Dữ liệu khách hàng mẫu"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Khach Hang Demo",
    "phone": "0900000000"
  },
  "message": "Customer created successfully"
}
```

Ghi chú: Không dùng dữ liệu cá nhân thật trong demo.

---

## 12. API Sales

### 12.1. Danh sách API Sales

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /orders | Tạo đơn hàng | Staff, Admin |
| GET | /orders/{id} | Xem chi tiết đơn hàng | Staff, Admin |
| POST | /orders/{id}/items | Thêm thuốc vào đơn | Staff, Admin |
| PUT | /orders/{id}/items/{itemId} | Cập nhật số lượng thuốc | Staff, Admin |
| DELETE | /orders/{id}/items/{itemId} | Xóa thuốc khỏi đơn | Staff, Admin |
| POST | /orders/{id}/check-interactions | Kiểm tra tương tác | Staff, Admin |
| POST | /orders/{id}/pay | Thanh toán | Staff, Admin |
| GET | /orders/{id}/invoice | Xem hóa đơn | Staff, Admin |

---

### 12.2. POST /orders

**Mô tả:** Tạo đơn hàng nháp.

#### Request body

```json
{
  "customerId": 1,
  "note": "Đơn hàng demo"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "id": 1,
    "orderCode": "ORD-0001",
    "status": "DRAFT",
    "totalAmount": 0
  },
  "message": "Order created successfully"
}
```

---

### 12.3. POST /orders/{id}/items

**Mô tả:** Thêm thuốc vào đơn hàng.

#### Request body

```json
{
  "medicineId": 1,
  "quantity": 2
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "item": {
      "id": 10,
      "medicineId": 1,
      "medicineName": "Thuốc mẫu A",
      "quantity": 2,
      "unitPrice": 50000,
      "lineTotal": 100000
    },
    "totalAmount": 100000,
    "interactionAlerts": []
  },
  "message": "Item added successfully"
}
```

#### Lỗi có thể xảy ra

| Error Code | Mô tả |
|---|---|
| BUSINESS_RULE_VIOLATION | Số lượng bán vượt tồn kho |
| NOT_FOUND | Không tìm thấy thuốc hoặc đơn hàng |
| VALIDATION_ERROR | Số lượng không hợp lệ |

---

### 12.4. POST /orders/{id}/check-interactions

**Mô tả:** Kiểm tra tương tác thuốc trong đơn hàng.

#### Response thành công khi có cảnh báo

```json
{
  "success": true,
  "data": {
    "hasAlert": true,
    "alerts": [
      {
        "interactionId": 1,
        "medicineA": {
          "id": 1,
          "name": "Thuốc mẫu A"
        },
        "medicineB": {
          "id": 2,
          "name": "Thuốc mẫu B"
        },
        "severity": "HIGH",
        "description": "Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu.",
        "recommendation": "Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế.",
        "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
      }
    ]
  },
  "message": "Interaction check completed"
}
```

#### Response khi không có cảnh báo

```json
{
  "success": true,
  "data": {
    "hasAlert": false,
    "alerts": []
  },
  "message": "No interaction found in sample data"
}
```

---

### 12.5. POST /orders/{id}/pay

**Mô tả:** Thanh toán đơn hàng, trừ tồn kho và tạo hóa đơn.

#### Request body

```json
{
  "paymentMethod": "CASH",
  "amountPaid": 100000,
  "consultationNote": "Đã hiển thị cảnh báo mẫu và ghi chú tư vấn demo."
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "paymentId": 1,
    "invoiceId": 1,
    "status": "PAID",
    "totalAmount": 100000
  },
  "message": "Payment successful and invoice created"
}
```

#### Business rules

- Đơn hàng phải có ít nhất một thuốc.
- Không thanh toán nếu có thuốc vượt tồn.
- Thanh toán thành công mới trừ tồn kho.
- Hóa đơn chỉ tạo sau thanh toán thành công.

---

### 12.6. GET /orders/{id}/invoice

**Mô tả:** Xem hóa đơn của đơn hàng.

#### Response thành công

```json
{
  "success": true,
  "data": {
    "invoiceId": 1,
    "invoiceCode": "INV-0001",
    "orderCode": "ORD-0001",
    "issuedAt": "2026-05-17T10:00:00Z",
    "staffName": "Staff Demo",
    "customerName": "Khach Hang Demo",
    "items": [
      {
        "medicineName": "Thuốc mẫu A",
        "quantity": 2,
        "unitPrice": 50000,
        "lineTotal": 100000
      }
    ],
    "totalAmount": 100000,
    "paymentMethod": "CASH"
  },
  "message": "Success"
}
```

---

## 13. API Interaction

### 13.1. Danh sách API Interaction

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /interactions/check | Kiểm tra tương tác từ danh sách thuốc | Staff, Admin |
| GET | /interactions | Xem rule tương tác | Admin |
| POST | /interactions | Thêm rule tương tác | Admin |
| PUT | /interactions/{id} | Cập nhật rule tương tác | Admin |
| DELETE | /interactions/{id} | Xóa/ẩn rule tương tác | Admin |

### 13.2. POST /interactions/check

#### Request body

```json
{
  "medicineIds": [1, 2, 3]
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "hasAlert": true,
    "alerts": [
      {
        "medicineAId": 1,
        "medicineAName": "Thuốc mẫu A",
        "medicineBId": 2,
        "medicineBName": "Thuốc mẫu B",
        "severity": "MEDIUM",
        "description": "Mô tả tương tác mẫu.",
        "recommendation": "Khuyến nghị mẫu cho đồ án.",
        "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
      }
    ]
  },
  "message": "Interaction check completed"
}
```

---

## 14. API Payment

### 14.1. Danh sách API Payment

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /payments | Tạo thanh toán | Staff, Admin |
| GET | /payments/{id} | Xem chi tiết thanh toán | Staff, Admin |
| GET | /orders/{id}/payment | Xem thanh toán theo đơn hàng | Staff, Admin |

### 14.2. POST /payments

#### Request body

```json
{
  "orderId": 1,
  "paymentMethod": "CASH",
  "amountPaid": 100000
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "paymentId": 1,
    "orderId": 1,
    "paymentMethod": "CASH",
    "amountPaid": 100000,
    "status": "PAID"
  },
  "message": "Payment created successfully"
}
```

---

## 15. API Invoice

### 15.1. Danh sách API Invoice

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /invoices | Tạo hóa đơn | Staff, Admin |
| GET | /invoices/{id} | Xem chi tiết hóa đơn | Staff, Admin |
| GET | /orders/{id}/invoice | Xem hóa đơn theo đơn hàng | Staff, Admin |

### 15.2. POST /invoices

#### Request body

```json
{
  "orderId": 1
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "invoiceId": 1,
    "invoiceCode": "INV-0001",
    "orderId": 1
  },
  "message": "Invoice created successfully"
}
```

Ghi chú: Trong luồng MVP, hóa đơn thường được tạo tự động sau khi thanh toán thành công.

---

## 16. API Report

### 16.1. Danh sách API Report

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /reports/revenue | Báo cáo doanh thu | Admin |
| GET | /reports/top-medicines | Thuốc bán chạy | Admin |
| GET | /reports/inventory | Báo cáo tồn kho | Admin, Warehouse giới hạn |
| GET | /reports/dashboard | Dashboard tổng quan | Admin |

### 16.2. GET /reports/revenue

#### Query parameters

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| fromDate | date | Không | Ngày bắt đầu |
| toDate | date | Không | Ngày kết thúc |
| groupBy | string | Không | day/month |

#### Response thành công

```json
{
  "success": true,
  "data": {
    "totalRevenue": 1500000,
    "totalOrders": 25,
    "items": [
      {
        "date": "2026-05-17",
        "revenue": 500000,
        "orderCount": 8
      }
    ]
  },
  "message": "Success"
}
```

---

### 16.3. GET /reports/top-medicines

#### Response thành công

```json
{
  "success": true,
  "data": [
    {
      "medicineId": 1,
      "medicineName": "Thuốc mẫu A",
      "soldQuantity": 120,
      "revenue": 6000000
    }
  ],
  "message": "Success"
}
```

---

## 17. API AI/Graph

## 17.1. Danh sách API AI

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| POST | /ai/consultation/questions | Tạo câu hỏi bổ sung | Staff, Admin |
| POST | /ai/consultation/note | Tạo ghi chú tư vấn | Staff, Admin |
| POST | /ai/explain-alert | Giải thích cảnh báo | Staff, Admin |
| GET | /ai/logs | Xem AI Audit Log | Admin |
| GET | /ai/logs/{id} | Xem chi tiết AI Log | Admin |

---

### 17.2. POST /ai/consultation/questions

**Mô tả:** AI tạo câu hỏi bổ sung cho phiên tư vấn tham khảo.

#### Request body

```json
{
  "customerContext": "Khách hàng hỏi mua thuốc theo triệu chứng mô tả chung trong demo.",
  "selectedMedicineIds": [1, 2]
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "questions": [
      "Khách hàng có đang sử dụng thuốc nào khác không?",
      "Khách hàng có tiền sử dị ứng với thuốc nào không?",
      "Khách hàng có đang mang thai, cho con bú hoặc có bệnh nền cần lưu ý không?"
    ],
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "AI questions generated successfully"
}
```

---

### 17.3. POST /ai/consultation/note

**Mô tả:** AI tạo ghi chú tư vấn tham khảo ở trạng thái nháp.

#### Request body

```json
{
  "orderId": 1,
  "interactionAlertIds": [1],
  "staffNote": "Đã hiển thị cảnh báo tương tác mẫu."
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "draftNote": "Ghi chú tư vấn mẫu do AI tạo. Nội dung này cần được nhân viên kiểm tra và xác nhận trước khi lưu.",
    "requiresUserConfirmation": true,
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "Draft consultation note generated"
}
```

---

### 17.4. POST /ai/explain-alert

**Mô tả:** AI giải thích cảnh báo tương tác bằng ngôn ngữ dễ hiểu.

#### Request body

```json
{
  "interactionAlertId": 1
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "explanation": "Đây là phần giải thích cảnh báo tương tác thuốc bằng dữ liệu mẫu. Nhân viên cần kiểm tra kỹ và không sử dụng nội dung này như kết luận y tế.",
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "Alert explanation generated"
}
```

---

### 17.5. GET /ai/logs

**Mô tả:** Admin xem AI Audit Log.

#### Response thành công

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "actionType": "GENERATE_CONSULTATION_NOTE",
        "provider": "MockAI",
        "status": "SUCCESS",
        "createdAt": "2026-05-17T10:00:00Z"
      }
    ]
  },
  "message": "Success"
}
```

---

## 18. API Graph

### 18.1. Danh sách API Graph

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /graph/medicine/{id} | Xem graph thuốc | Admin, Staff |
| POST | /graph/interactions/query | Truy vấn tương tác graph | Admin, Staff |
| GET | /graph/search | Tìm node graph | Admin, Staff |
| POST | /graph/context | Tạo graph context cho AI | Admin, Staff |

---

### 18.2. GET /graph/medicine/{id}

**Mô tả:** Lấy graph liên quan đến một thuốc.

#### Response thành công

```json
{
  "success": true,
  "data": {
    "nodes": [
      {
        "id": "m1",
        "label": "Medicine",
        "name": "Thuốc mẫu A"
      },
      {
        "id": "ai1",
        "label": "ActiveIngredient",
        "name": "Hoạt chất mẫu X"
      }
    ],
    "relationships": [
      {
        "source": "m1",
        "target": "ai1",
        "type": "CONTAINS"
      }
    ],
    "disclaimer": "Dữ liệu graph là dữ liệu mẫu phục vụ đồ án. Thông tin cảnh báo chỉ mang tính tham khảo."
  },
  "message": "Success"
}
```

---

### 18.3. POST /graph/interactions/query

**Mô tả:** Truy vấn tương tác trong graph.

#### Request body

```json
{
  "medicineIds": [1, 2]
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "interactions": [
      {
        "medicineA": "Thuốc mẫu A",
        "medicineB": "Thuốc mẫu B",
        "severity": "HIGH",
        "relationshipType": "INTERACTS_WITH"
      }
    ],
    "disclaimer": "Dữ liệu graph là dữ liệu mẫu phục vụ đồ án. Thông tin cảnh báo chỉ mang tính tham khảo."
  },
  "message": "Graph interaction query completed"
}
```

---

### 18.4. POST /graph/context

**Mô tả:** Tạo context từ graph để đưa vào AI Copilot hoặc Graph-RAG.

#### Request body

```json
{
  "medicineIds": [1, 2],
  "purpose": "EXPLAIN_INTERACTION"
}
```

#### Response thành công

```json
{
  "success": true,
  "data": {
    "contextText": "Theo dữ liệu graph mẫu, Thuốc mẫu A có quan hệ INTERACTS_WITH với Thuốc mẫu B ở mức HIGH.",
    "source": "Neo4j mock/demo graph"
  },
  "message": "Graph context created"
}
```

---

## 19. API Audit

### 19.1. Danh sách API Audit

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /audit-logs | Xem audit log hệ thống | Admin |
| GET | /audit-logs/{id} | Xem chi tiết audit log | Admin |

### 19.2. GET /audit-logs

#### Response thành công

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "actionType": "PAYMENT_CREATED",
        "entityType": "ORDER",
        "entityId": 1,
        "performedBy": "staff01",
        "status": "SUCCESS",
        "createdAt": "2026-05-17T10:00:00Z"
      }
    ]
  },
  "message": "Success"
}
```

---

## 20. API bảo mật và phân quyền

### 20.1. API public

| Endpoint | Ghi chú |
|---|---|
| POST /auth/login | Không cần token |

### 20.2. API cần đăng nhập

Hầu hết API nghiệp vụ cần header:

```http
Authorization: Bearer <accessToken>
```

### 20.3. API chỉ Admin

| API | Lý do |
|---|---|
| /users/* | Quản lý tài khoản |
| /roles/* | Quản lý vai trò |
| POST/PUT/DELETE /medicines | Sửa dữ liệu thuốc |
| POST/PUT/DELETE /categories | Sửa danh mục |
| GET /reports/revenue | Doanh thu quản trị |
| GET /ai/logs | Log AI nhạy cảm |
| GET /audit-logs | Log hệ thống |

---

## 21. Mapping API với module

| Module | API chính |
|---|---|
| Auth Module | /auth/login, /auth/logout, /auth/me |
| User Module | /users, /roles |
| Medicine Module | /medicines, /categories |
| Inventory Module | /inventories, /inventory/low-stock, /inventory/near-expiry, /stock-imports |
| Customer Module | /customers |
| Sales Module | /orders, /orders/{id}/items |
| Rule Engine Module | /orders/{id}/check-interactions, /interactions/check |
| Payment Module | /payments, /orders/{id}/pay |
| Invoice Module | /invoices, /orders/{id}/invoice |
| Report Module | /reports/revenue, /reports/top-medicines, /reports/inventory |
| AI Module | /ai/consultation/questions, /ai/consultation/note, /ai/explain-alert |
| Graph Module | /graph/medicine/{id}, /graph/interactions/query, /graph/context |
| Audit Module | /audit-logs, /ai/logs |

---

## 22. Mapping API với test case

| API | Test Case |
|---|---|
| POST /auth/login | TC-AUTH-01 |
| GET /auth/me | TC-AUTH-02 |
| GET /medicines | TC-MED-01 |
| POST /medicines | TC-MED-02 |
| POST /stock-imports | TC-STOCK-01 |
| GET /inventories | TC-INV-01 |
| GET /inventory/low-stock | TC-INV-02 |
| GET /inventory/near-expiry | TC-INV-03 |
| POST /orders | TC-SALES-01 |
| POST /orders/{id}/items | TC-SALES-02 |
| POST /orders/{id}/check-interactions | TC-INT-01 |
| POST /orders/{id}/pay | TC-PAY-01 |
| GET /orders/{id}/invoice | TC-INVC-01 |
| GET /reports/revenue | TC-REP-01 |
| POST /ai/consultation/questions | TC-AI-01 |
| GET /graph/medicine/{id} | TC-GRAPH-01 |

---

## 23. Ràng buộc API

| Ràng buộc | Mô tả |
|---|---|
| API phải kiểm tra token | Trừ /auth/login, các API khác cần xác thực |
| API phải kiểm tra role | Không chỉ dựa vào frontend ẩn menu |
| Không trả dữ liệu nhạy cảm | Không trả password hash, secret, token không cần thiết |
| Không commit API key | AI provider key phải để trong env |
| Cảnh báo/AI phải có disclaimer | API liên quan AI/cảnh báo nên trả disclaimer |
| Không dùng dữ liệu thật | Response demo dùng dữ liệu mẫu |
| Thanh toán chỉ mô phỏng | Không gọi cổng thanh toán thật |

---

## 24. Kết luận

Tài liệu **API Specification** đã mô tả các API chính của hệ thống **PharmaAssist AI Intelligence**, bao gồm Auth, User, Medicine, Inventory, Stock Import, Customer, Sales, Interaction, Payment, Invoice, Report, AI, Graph và Audit. Mỗi API được mô tả với method, endpoint, actor được phép gọi, request body, response chính và lỗi thường gặp.

Trong MVP, nhóm cần ưu tiên triển khai các API phục vụ luồng demo chính: đăng nhập, lấy danh sách thuốc, xem tồn kho, tạo đơn hàng, thêm thuốc vào đơn, kiểm tra tương tác, thanh toán và xem hóa đơn. Các API AI/Graph có thể triển khai thật hoặc mô phỏng bằng dữ liệu mẫu để tăng điểm kỹ thuật cho đồ án.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

