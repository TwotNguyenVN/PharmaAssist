# 14_UML_DIAGRAM_PACKAGE

**Mã tài liệu:** 14_UML_Diagram_Package  
**Tên tài liệu:** UML Diagram Package  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Bộ tài liệu sơ đồ UML  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** Nhóm phát triển, giảng viên hướng dẫn, Business Analyst, System Analyst, Backend Developer, Frontend Developer, Tester, người viết báo cáo, người chuẩn bị slide và demo  

---

## 1. Mục đích tài liệu

Tài liệu **UML Diagram Package** tập hợp các sơ đồ UML quan trọng của hệ thống **PharmaAssist AI Intelligence**. UML giúp mô tả hệ thống ở nhiều góc nhìn khác nhau, từ góc nhìn người dùng, quy trình nghiệp vụ, tương tác giữa các thành phần đến cấu trúc class/entity/service trong hệ thống.

Trong đồ án môn **Công Nghệ Phần Mềm**, UML là phần quan trọng để chứng minh nhóm đã phân tích và thiết kế hệ thống trước khi lập trình. Với đề tài PharmaAssist AI Intelligence, các sơ đồ UML cần thể hiện được cả nghiệp vụ quản lý nhà thuốc cơ bản và điểm nổi bật kỹ thuật như cảnh báo tương tác thuốc, AI Copilot, Knowledge Graph và Graph-RAG.

Tài liệu này dùng để:

- Xác định danh sách sơ đồ UML cần chuẩn bị.
- Mô tả mục đích của từng loại sơ đồ.
- Mô tả actor, use case và quan hệ giữa các chức năng.
- Mô tả luồng nghiệp vụ chính bằng Activity Diagram.
- Mô tả tương tác giữa UI, backend, database, AI và graph bằng Sequence Diagram.
- Mô tả cấu trúc class/entity/service bằng Class Diagram.
- Cung cấp PlantUML mẫu để nhóm dễ vẽ sơ đồ.
- Làm cơ sở đưa hình UML vào báo cáo và slide bảo vệ.

---

## 2. Phạm vi tài liệu

Tài liệu này bao gồm các sơ đồ UML sau:

| Loại sơ đồ | Nội dung |
|---|---|
| Use Case Diagram | Actor và chức năng chính của hệ thống |
| Activity Diagram | Luồng bán thuốc, nhập kho, cảnh báo tương tác, AI tư vấn |
| Sequence Diagram | Tương tác giữa UI, Backend, DB, AI, Graph |
| Class Diagram | Class/entity/service chính |

Tài liệu này không yêu cầu vẽ toàn bộ mọi chi tiết nhỏ của hệ thống. Mục tiêu là tạo bộ sơ đồ đủ rõ, đủ nhất quán với SRS, Database Design, API Specification và System Architecture.

---

## 3. Danh sách sơ đồ cần có

| Mã sơ đồ | Loại sơ đồ | Tên sơ đồ | Mục đích | Mức ưu tiên |
|---|---|---|---|---|
| UML-UC-01 | Use Case Diagram | Use Case tổng quan hệ thống | Thể hiện actor và chức năng chính | High |
| UML-ACT-01 | Activity Diagram | Luồng bán thuốc tại quầy | Thể hiện quy trình tạo đơn, kiểm tra tồn, tương tác, thanh toán | High |
| UML-ACT-02 | Activity Diagram | Luồng nhập thuốc | Thể hiện quy trình nhập kho và cập nhật tồn | High |
| UML-ACT-03 | Activity Diagram | Luồng cảnh báo tương tác thuốc | Thể hiện rule-based interaction checking | High |
| UML-ACT-04 | Activity Diagram | Luồng AI tư vấn tham khảo | Thể hiện Guardrail, AI và xác nhận của người dùng | Medium |
| UML-SEQ-01 | Sequence Diagram | Login | UI → Auth API → Database | High |
| UML-SEQ-02 | Sequence Diagram | Create Order | UI → Sales Service → Inventory → Database | High |
| UML-SEQ-03 | Sequence Diagram | Check Interaction | UI → Rule Engine → DrugInteraction DB | High |
| UML-SEQ-04 | Sequence Diagram | AI Copilot | UI → AI Orchestrator → Guardrail → AI Provider → Audit Log | Medium |
| UML-SEQ-05 | Sequence Diagram | Graph-RAG | UI → Backend → Neo4j → Context Builder → AI | Medium |
| UML-CLS-01 | Class Diagram | Class Diagram tổng quan | Thể hiện entity/service chính | High |

---

## 4. Actor hệ thống

| Actor | Mô tả | Vai trò trong UML |
|---|---|---|
| Admin | Chủ nhà thuốc hoặc người quản trị hệ thống | Quản lý user, thuốc, danh mục, báo cáo, AI log |
| Nhân viên nhà thuốc | Người bán thuốc, xem cảnh báo, thanh toán | Tạo đơn, kiểm tra tương tác, thanh toán, hóa đơn, AI Copilot |
| Nhân viên kho | Người nhập thuốc và theo dõi tồn kho | Nhập thuốc, xem tồn kho, cảnh báo sắp hết/gần hết hạn |
| Khách hàng | Người mua thuốc, không đăng nhập trong MVP | Nhận hóa đơn, có thể được lưu thông tin cơ bản |
| Hệ thống AI | Thành phần sinh nội dung tham khảo | AI Copilot, tạo câu hỏi, ghi chú, giải thích cảnh báo |
| Neo4j | Thành phần cung cấp dữ liệu graph | Graph Explorer, Graph-RAG context |
| AI Provider | MockAI/Gemini/OpenRouter/Ollama | Sinh nội dung AI nếu có |

---

## 5. Use Case tổng quan

### 5.1. Danh sách use case chính

| Mã use case | Tên use case | Actor chính | Mô tả ngắn |
|---|---|---|---|
| UC-01 | Đăng nhập | Admin, Nhân viên nhà thuốc, Nhân viên kho | Người dùng nội bộ đăng nhập hệ thống |
| UC-02 | Quản lý user | Admin | Admin tạo, sửa, khóa tài khoản và phân quyền |
| UC-03 | Quản lý thuốc | Admin | Admin thêm, sửa, xóa/ẩn, tìm kiếm thuốc |
| UC-04 | Quản lý danh mục thuốc | Admin | Admin quản lý danh mục thuốc |
| UC-05 | Nhập thuốc | Nhân viên kho | Tạo phiếu nhập thuốc và cập nhật tồn kho |
| UC-06 | Xem tồn kho | Admin, Nhân viên nhà thuốc, Nhân viên kho | Xem số lượng tồn và trạng thái kho |
| UC-07 | Xem cảnh báo kho | Admin, Nhân viên kho | Xem thuốc sắp hết và gần hết hạn |
| UC-08 | Quản lý khách hàng | Nhân viên nhà thuốc, Admin | Lưu thông tin khách hàng cơ bản |
| UC-09 | Tạo đơn bán thuốc | Nhân viên nhà thuốc | Tạo đơn và thêm thuốc vào đơn |
| UC-10 | Kiểm tra tồn kho khi bán | Hệ thống | Không cho bán vượt số lượng tồn |
| UC-11 | Kiểm tra tương tác thuốc | Hệ thống, Nhân viên nhà thuốc | Kiểm tra cặp thuốc trong đơn theo rule mẫu |
| UC-12 | Ghi chú tư vấn | Nhân viên nhà thuốc | Ghi chú khi có cảnh báo hoặc khi cần lưu ý |
| UC-13 | Thanh toán | Nhân viên nhà thuốc | Ghi nhận thanh toán mô phỏng |
| UC-14 | In/Xem hóa đơn | Nhân viên nhà thuốc, Khách hàng | Tạo và xem/in hóa đơn sau thanh toán |
| UC-15 | Xem báo cáo | Admin | Xem doanh thu, thuốc bán chạy, tồn kho |
| UC-16 | AI Copilot | Nhân viên nhà thuốc, Hệ thống AI | Tạo câu hỏi, ghi chú, giải thích cảnh báo tham khảo |
| UC-17 | Graph Explorer | Admin, Nhân viên nhà thuốc, Neo4j | Xem quan hệ thuốc/tương tác dạng graph |
| UC-18 | Xem AI Audit Log | Admin | Xem lịch sử request/response AI |

### 5.2. Quan hệ include/extend đề xuất

| Use case chính | Quan hệ | Use case liên quan | Ý nghĩa |
|---|---|---|---|
| Tạo đơn bán thuốc | include | Kiểm tra tồn kho khi bán | Khi thêm thuốc cần kiểm tra tồn kho |
| Tạo đơn bán thuốc | include | Kiểm tra tương tác thuốc | Khi đơn có từ 2 thuốc trở lên cần kiểm tra tương tác |
| Kiểm tra tương tác thuốc | extend | Ghi chú tư vấn | Nếu có cảnh báo, nhân viên có thể ghi chú |
| Thanh toán | include | Tạo hóa đơn | Sau thanh toán thành công tạo hóa đơn |
| AI Copilot | include | Kiểm tra Guardrail | AI phải được kiểm soát an toàn |
| AI Copilot | include | Ghi AI Audit Log | Lưu lịch sử gọi AI nếu có |
| Graph-RAG | include | Truy vấn Neo4j | Lấy context graph cho AI |

---

## 6. Use Case Diagram tổng quan - PlantUML

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Admin / Chủ nhà thuốc" as Admin
actor "Nhân viên nhà thuốc" as Staff
actor "Nhân viên kho" as Warehouse
actor "Khách hàng" as Customer
actor "Hệ thống AI" as AISystem
actor "Neo4j Graph" as Neo4j
actor "AI Provider" as AIProvider

rectangle "PharmaAssist AI Intelligence" {
  usecase "Đăng nhập" as UC_Login
  usecase "Quản lý user" as UC_User
  usecase "Phân quyền" as UC_Role
  usecase "Quản lý thuốc" as UC_Medicine
  usecase "Quản lý danh mục" as UC_Category
  usecase "Nhập thuốc" as UC_Import
  usecase "Xem tồn kho" as UC_Inventory
  usecase "Cảnh báo sắp hết" as UC_LowStock
  usecase "Cảnh báo gần hết hạn" as UC_Expiry
  usecase "Quản lý khách hàng" as UC_Customer
  usecase "Tạo đơn bán thuốc" as UC_Order
  usecase "Kiểm tra tồn kho" as UC_CheckStock
  usecase "Kiểm tra tương tác thuốc" as UC_Interaction
  usecase "Ghi chú tư vấn" as UC_Note
  usecase "Thanh toán" as UC_Payment
  usecase "Tạo/In hóa đơn" as UC_Invoice
  usecase "Xem báo cáo" as UC_Report
  usecase "AI Copilot" as UC_AI
  usecase "Graph Explorer" as UC_Graph
  usecase "AI Audit Log" as UC_AILog
  usecase "Guardrail" as UC_Guardrail
  usecase "Graph-RAG" as UC_GraphRAG
}

Admin --> UC_Login
Admin --> UC_User
Admin --> UC_Role
Admin --> UC_Medicine
Admin --> UC_Category
Admin --> UC_Inventory
Admin --> UC_LowStock
Admin --> UC_Expiry
Admin --> UC_Report
Admin --> UC_AILog
Admin --> UC_Graph

Staff --> UC_Login
Staff --> UC_Medicine
Staff --> UC_Inventory
Staff --> UC_Customer
Staff --> UC_Order
Staff --> UC_Payment
Staff --> UC_Invoice
Staff --> UC_AI
Staff --> UC_Graph

Warehouse --> UC_Login
Warehouse --> UC_Medicine
Warehouse --> UC_Inventory
Warehouse --> UC_Import
Warehouse --> UC_LowStock
Warehouse --> UC_Expiry

Customer --> UC_Invoice

UC_Order .> UC_CheckStock : <<include>>
UC_Order .> UC_Interaction : <<include>>
UC_Interaction .> UC_Note : <<extend>>
UC_Payment .> UC_Invoice : <<include>>
UC_AI .> UC_Guardrail : <<include>>
UC_AI .> UC_AILog : <<include>>
UC_GraphRAG .> UC_Graph : <<include>>
UC_GraphRAG .> UC_AI : <<include>>

AISystem --> UC_AI
AIProvider --> UC_AI
Neo4j --> UC_Graph
Neo4j --> UC_GraphRAG

@enduml
```

---

## 7. Activity Diagram cần chuẩn bị

| Activity | Mô tả | Mức ưu tiên |
|---|---|---|
| Bán thuốc | Tìm thuốc → thêm vào đơn → kiểm tra tồn → kiểm tra tương tác → thanh toán | High |
| Nhập thuốc | Chọn nhà cung cấp → nhập chi tiết thuốc → cập nhật tồn | High |
| Cảnh báo tương tác | Lấy danh sách thuốc → tạo cặp → kiểm tra rule → hiển thị cảnh báo | High |
| AI tư vấn | Nhập thông tin → kiểm tra guardrail → lấy context → gọi AI → xác nhận | Medium |

---

## 8. Activity Diagram - Luồng bán thuốc tại quầy

### 8.1. Mô tả

Luồng bán thuốc tại quầy là luồng nghiệp vụ quan trọng nhất của MVP. Nhân viên nhà thuốc tìm thuốc, thêm thuốc vào đơn, hệ thống kiểm tra tồn kho, kiểm tra tương tác thuốc nếu có nhiều thuốc, sau đó thanh toán và tạo hóa đơn.

### 8.2. PlantUML

```plantuml
@startuml
start

:Nhân viên đăng nhập;
:Mở màn hình Sales POS;
:Tìm kiếm thuốc;
:Chọn thuốc và nhập số lượng;

if (Số lượng hợp lệ?) then (Có)
  :Kiểm tra tồn kho;
  if (Đủ tồn kho?) then (Có)
    :Thêm thuốc vào đơn;
    :Cập nhật tổng tiền;
    if (Đơn có từ 2 thuốc trở lên?) then (Có)
      :Kiểm tra tương tác thuốc;
      if (Có cảnh báo?) then (Có)
        :Hiển thị tên thuốc, mức độ, mô tả, khuyến nghị;
        :Hiển thị disclaimer;
        :Nhân viên nhập ghi chú tư vấn nếu cần;
      else (Không)
        :Không hiển thị cảnh báo;
      endif
    else (Không)
      :Bỏ qua kiểm tra tương tác;
    endif

    :Chọn hoặc tạo khách hàng nếu cần;
    :Xác nhận thanh toán;
    if (Thanh toán thành công?) then (Có)
      :Trừ tồn kho;
      :Tạo hóa đơn;
      :Hiển thị/In hóa đơn;
    else (Không)
      :Hiển thị lỗi thanh toán;
    endif
  else (Không)
    :Hiển thị lỗi không đủ tồn kho;
  endif
else (Không)
  :Hiển thị lỗi số lượng không hợp lệ;
endif

stop
@enduml
```

---

## 9. Activity Diagram - Luồng nhập thuốc

### 9.1. Mô tả

Luồng nhập thuốc do Nhân viên kho hoặc Admin thực hiện. Sau khi phiếu nhập được xác nhận, hệ thống cập nhật tồn kho.

### 9.2. PlantUML

```plantuml
@startuml
start

:Nhân viên kho đăng nhập;
:Mở màn hình Stock Import;
:Chọn nhà cung cấp;
:Tạo phiếu nhập;

repeat
  :Chọn thuốc;
  :Nhập số lượng, giá nhập, hạn dùng;
  if (Dữ liệu hợp lệ?) then (Có)
    :Thêm dòng thuốc vào phiếu nhập;
  else (Không)
    :Hiển thị lỗi nhập liệu;
  endif
repeat while (Còn thuốc cần nhập?) is (Có)

:Kiểm tra lại phiếu nhập;
if (Xác nhận phiếu nhập?) then (Có)
  :Lưu phiếu nhập trạng thái CONFIRMED;
  :Cập nhật tồn kho;
  :Lưu lịch sử nhập thuốc;
  :Hiển thị thông báo thành công;
else (Không)
  :Lưu phiếu nhập trạng thái DRAFT hoặc hủy;
endif

stop
@enduml
```

---

## 10. Activity Diagram - Luồng cảnh báo tương tác thuốc

### 10.1. Mô tả

Luồng cảnh báo tương tác thuốc được kích hoạt khi đơn hàng có từ hai thuốc trở lên. Hệ thống sinh các cặp thuốc và kiểm tra bảng DrugInteraction.

### 10.2. PlantUML

```plantuml
@startuml
start

:Nhận danh sách thuốc trong đơn;
if (Số thuốc >= 2?) then (Có)
  :Tạo tất cả các cặp thuốc;
  :Khởi tạo danh sách cảnh báo rỗng;
  while (Còn cặp thuốc cần kiểm tra?) is (Có)
    :Lấy cặp thuốc A-B;
    :Chuẩn hóa thứ tự cặp thuốc;
    :Tra bảng DrugInteraction;
    if (Tìm thấy tương tác active?) then (Có)
      :Tạo cảnh báo tương tác;
      :Thêm vào danh sách cảnh báo;
    else (Không)
      :Bỏ qua cặp này;
    endif
  endwhile (Không)

  if (Danh sách cảnh báo có dữ liệu?) then (Có)
    :Trả danh sách cảnh báo cho Frontend;
    :Hiển thị thuốc A, thuốc B, severity, description, recommendation;
    :Hiển thị disclaimer;
  else (Không)
    :Trả kết quả không có cảnh báo;
  endif
else (Không)
  :Không cần kiểm tra tương tác;
endif

stop
@enduml
```

---

## 11. Activity Diagram - Luồng AI tư vấn tham khảo

### 11.1. Mô tả

Luồng AI tư vấn là chức năng nâng cao. AI chỉ sinh nội dung tham khảo, không chẩn đoán, không kê đơn và nội dung phải được người dùng xác nhận trước khi lưu.

### 11.2. PlantUML

```plantuml
@startuml
start

:Nhân viên mở AI Copilot;
:Nhập thông tin tư vấn hoặc chọn cảnh báo;
:Backend nhận yêu cầu AI;
:Guardrail kiểm tra input;

if (Input an toàn?) then (Có)
  :Lấy context từ đơn hàng/cảnh báo;
  if (Có dùng Graph-RAG?) then (Có)
    :Truy vấn Neo4j;
    :Tạo graph context;
  else (Không)
    :Dùng context từ database quan hệ;
  endif

  :Build prompt an toàn;
  :Gọi AI Provider hoặc MockAI;
  :Nhận output AI;
  :Guardrail kiểm tra output;

  if (Output an toàn?) then (Có)
    :Lưu AI Audit Log;
    :Hiển thị nội dung AI ở trạng thái nháp;
    :Hiển thị disclaimer;
    if (Người dùng xác nhận lưu?) then (Có)
      :Lưu ghi chú tư vấn;
    else (Không)
      :Không lưu nội dung AI;
    endif
  else (Không)
    :Chặn output AI;
    :Lưu log trạng thái BLOCKED;
    :Hiển thị thông báo an toàn;
  endif
else (Không)
  :Từ chối yêu cầu AI;
  :Hiển thị thông báo input không phù hợp;
endif

stop
@enduml
```

---

## 12. Sequence Diagram cần chuẩn bị

| Sequence | Thành phần | Mức ưu tiên |
|---|---|---|
| Login | UI → Auth API → Database | High |
| Create Order | UI → Sales Service → Inventory → Database | High |
| Check Interaction | UI → Rule Engine → DrugInteraction DB | High |
| AI Copilot | UI → AI Orchestrator → Guardrail → AI Provider → Audit Log | Medium |
| Graph-RAG | UI → Backend → Neo4j → Context Builder → AI | Medium |

---

## 13. Sequence Diagram - Login

### 13.1. Mô tả

Mô tả quá trình người dùng đăng nhập vào hệ thống.

### 13.2. PlantUML

```plantuml
@startuml
actor User
participant "Frontend UI" as UI
participant "Auth API" as AuthAPI
participant "Auth Service" as AuthService
database "Database" as DB

User -> UI: Nhập username/password
UI -> AuthAPI: POST /auth/login
AuthAPI -> AuthService: validateLogin(username, password)
AuthService -> DB: findUserByUsername(username)
DB --> AuthService: user + roles
AuthService -> AuthService: verifyPassword(password, password_hash)

alt Thông tin hợp lệ
  AuthService -> AuthService: generateAccessToken(user, roles)
  AuthService --> AuthAPI: accessToken, userInfo
  AuthAPI --> UI: success=true, token, user
  UI --> User: Điều hướng dashboard
else Sai thông tin
  AuthService --> AuthAPI: login failed
  AuthAPI --> UI: 401 Unauthorized
  UI --> User: Hiển thị lỗi đăng nhập
end
@enduml
```

---

## 14. Sequence Diagram - Create Order

### 14.1. Mô tả

Mô tả quá trình nhân viên tạo đơn hàng và thêm thuốc vào đơn.

### 14.2. PlantUML

```plantuml
@startuml
actor Staff
participant "Sales POS UI" as UI
participant "Order API" as OrderAPI
participant "Sales Service" as SalesService
participant "Inventory Service" as InventoryService
participant "Rule Engine" as RuleEngine
database "Database" as DB

Staff -> UI: Tạo đơn bán thuốc
UI -> OrderAPI: POST /orders
OrderAPI -> SalesService: createOrder(customerId, staffId)
SalesService -> DB: insert orders(status=DRAFT)
DB --> SalesService: order
SalesService --> OrderAPI: order
OrderAPI --> UI: order created

Staff -> UI: Thêm thuốc vào đơn
UI -> OrderAPI: POST /orders/{id}/items
OrderAPI -> SalesService: addItem(orderId, medicineId, quantity)
SalesService -> InventoryService: checkStock(medicineId, quantity)
InventoryService -> DB: get inventory by medicineId
DB --> InventoryService: inventory

alt Đủ tồn kho
  InventoryService --> SalesService: available=true
  SalesService -> DB: insert/update order_details
  SalesService -> DB: recalculate total_amount
  SalesService -> RuleEngine: checkInteractions(orderId)
  RuleEngine -> DB: get order medicines + drug_interactions
  DB --> RuleEngine: interaction result
  RuleEngine --> SalesService: alerts
  SalesService --> OrderAPI: order item + alerts
  OrderAPI --> UI: success + total + alerts
else Không đủ tồn
  InventoryService --> SalesService: available=false
  SalesService --> OrderAPI: business error
  OrderAPI --> UI: Không đủ tồn kho
end
@enduml
```

---

## 15. Sequence Diagram - Check Interaction

### 15.1. Mô tả

Mô tả quá trình kiểm tra tương tác thuốc bằng Rule Engine.

### 15.2. PlantUML

```plantuml
@startuml
actor Staff
participant "Sales POS UI" as UI
participant "Interaction API" as API
participant "Rule Engine" as RuleEngine
database "DrugInteraction DB" as DB

Staff -> UI: Yêu cầu kiểm tra tương tác
UI -> API: POST /interactions/check {medicineIds}
API -> RuleEngine: checkInteractions(medicineIds)
RuleEngine -> RuleEngine: generatePairs(medicineIds)

loop Với mỗi cặp thuốc
  RuleEngine -> DB: findInteraction(medicineA, medicineB)
  DB --> RuleEngine: interaction or null
  alt Có tương tác
    RuleEngine -> RuleEngine: formatAlert(interaction)
  else Không có tương tác
    RuleEngine -> RuleEngine: skip
  end
end

RuleEngine --> API: alert list
API --> UI: hasAlert, alerts, disclaimer
UI --> Staff: Hiển thị cảnh báo nếu có
@enduml
```

---

## 16. Sequence Diagram - AI Copilot

### 16.1. Mô tả

Mô tả quá trình AI Copilot tạo nội dung tham khảo.

### 16.2. PlantUML

```plantuml
@startuml
actor Staff
participant "AI Copilot UI" as UI
participant "AI API" as API
participant "AI Orchestrator" as Orchestrator
participant "Guardrail Service" as Guardrail
participant "AI Provider / MockAI" as Provider
participant "Audit Log Service" as Audit
database "Database" as DB

Staff -> UI: Nhập yêu cầu AI
UI -> API: POST /ai/consultation/questions
API -> Orchestrator: handleAIRequest(context)
Orchestrator -> Guardrail: checkInput(context)

alt Input an toàn
  Guardrail --> Orchestrator: pass
  Orchestrator -> DB: get prompt template / related context
  DB --> Orchestrator: prompt + context
  Orchestrator -> Provider: generate(prompt)
  Provider --> Orchestrator: aiOutput
  Orchestrator -> Guardrail: checkOutput(aiOutput)

  alt Output an toàn
    Guardrail --> Orchestrator: pass
    Orchestrator -> Audit: saveAIEvent(success)
    Audit -> DB: insert ai_logs
    Orchestrator --> API: AI response + disclaimer
    API --> UI: draft result
    UI --> Staff: Hiển thị nội dung nháp
  else Output không an toàn
    Guardrail --> Orchestrator: blocked
    Orchestrator -> Audit: saveAIEvent(blocked)
    API --> UI: safe error message
  end
else Input không an toàn
  Guardrail --> Orchestrator: blocked
  Orchestrator -> Audit: saveAIEvent(blocked)
  API --> UI: rejected
end
@enduml
```

---

## 17. Sequence Diagram - Graph-RAG

### 17.1. Mô tả

Mô tả luồng truy xuất Knowledge Graph từ Neo4j để tạo context cho AI.

### 17.2. PlantUML

```plantuml
@startuml
actor Staff
participant "Frontend UI" as UI
participant "Backend API" as API
participant "Graph-RAG Service" as GraphRAG
participant "Neo4j" as Neo4j
participant "Context Builder" as ContextBuilder
participant "AI Orchestrator" as AI
participant "AI Provider / MockAI" as Provider
participant "Audit Log" as Audit

Staff -> UI: Chọn thuốc/cảnh báo cần giải thích
UI -> API: POST /ai/graph-rag
API -> GraphRAG: buildGraphContext(medicineIds)
GraphRAG -> Neo4j: query related nodes/relationships
Neo4j --> GraphRAG: graph data
GraphRAG -> ContextBuilder: convertGraphToText(graph data)
ContextBuilder --> GraphRAG: contextText
GraphRAG -> AI: generateWithContext(contextText)
AI -> Provider: generate(prompt + context)
Provider --> AI: aiOutput
AI -> Audit: saveAIEvent()
AI --> API: explanation + disclaimer
API --> UI: result
UI --> Staff: Hiển thị giải thích tham khảo
@enduml
```

---

## 18. Class Diagram nhóm class

| Nhóm | Class |
|---|---|
| User | User, Role, UserRole |
| Medicine | Medicine, MedicineCategory, ActiveIngredient |
| Inventory | Inventory, StockImport, StockImportDetail, Supplier |
| Sales | Order, OrderDetail, Payment, Invoice, Customer |
| Interaction | DrugInteraction, InteractionAlert |
| Consultation | ConsultationSession, ConsultationNote |
| AI | AIService, AIProvider, AIOrchestrator, AILog, AIPromptTemplate |
| Graph | GraphService, GraphNode, GraphRelationship |
| Report | ReportService, SalesDailySummary, InventoryForecast |

---

## 19. Class Diagram tổng quan - PlantUML

```plantuml
@startuml
skinparam classAttributeIconSize 0

class User {
  +id: Long
  +fullName: String
  +username: String
  +passwordHash: String
  +email: String
  +phone: String
  +status: String
}

class Role {
  +id: Long
  +code: String
  +name: String
}

class UserRole {
  +userId: Long
  +roleId: Long
}

class MedicineCategory {
  +id: Long
  +name: String
  +description: String
  +status: String
}

class Medicine {
  +id: Long
  +code: String
  +name: String
  +unit: String
  +sellingPrice: Decimal
  +description: String
  +status: String
}

class ActiveIngredient {
  +id: Long
  +name: String
  +description: String
}

class Inventory {
  +id: Long
  +quantity: Integer
  +minStock: Integer
  +batchNumber: String
  +expiryDate: Date
}

class Supplier {
  +id: Long
  +name: String
  +phone: String
  +address: String
}

class StockImport {
  +id: Long
  +importCode: String
  +importDate: Date
  +status: String
  +note: String
}

class StockImportDetail {
  +id: Long
  +quantity: Integer
  +importPrice: Decimal
  +expiryDate: Date
}

class Customer {
  +id: Long
  +fullName: String
  +phone: String
  +note: String
}

class Order {
  +id: Long
  +orderCode: String
  +status: String
  +totalAmount: Decimal
  +note: String
}

class OrderDetail {
  +id: Long
  +quantity: Integer
  +unitPrice: Decimal
  +lineTotal: Decimal
}

class Payment {
  +id: Long
  +method: String
  +amount: Decimal
  +status: String
  +paidAt: DateTime
}

class Invoice {
  +id: Long
  +invoiceCode: String
  +issuedAt: DateTime
}

class DrugInteraction {
  +id: Long
  +severity: String
  +description: Text
  +recommendation: Text
  +isActive: Boolean
}

class InteractionAlert {
  +id: Long
  +severity: String
  +alertMessage: Text
  +createdAt: DateTime
}

class ConsultationSession {
  +id: Long
  +status: String
  +createdAt: DateTime
}

class ConsultationNote {
  +id: Long
  +noteText: Text
  +source: String
  +createdAt: DateTime
}

class AIPromptTemplate {
  +id: Long
  +code: String
  +name: String
  +templateText: Text
  +version: String
  +isActive: Boolean
}

class AILog {
  +id: Long
  +actionType: String
  +provider: String
  +model: String
  +inputSummary: Text
  +outputSummary: Text
  +status: String
}

User "1" -- "many" UserRole
Role "1" -- "many" UserRole
MedicineCategory "1" -- "many" Medicine
Medicine "1" -- "many" Inventory
Supplier "1" -- "many" StockImport
StockImport "1" -- "many" StockImportDetail
Medicine "1" -- "many" StockImportDetail
Customer "1" -- "many" Order
User "1" -- "many" Order : staff
Order "1" -- "many" OrderDetail
Medicine "1" -- "many" OrderDetail
Order "1" -- "1" Payment
Order "1" -- "1" Invoice
Medicine "1" -- "many" DrugInteraction : medicineA
Medicine "1" -- "many" DrugInteraction : medicineB
DrugInteraction "1" -- "many" InteractionAlert
Order "1" -- "many" InteractionAlert
Order "1" -- "many" ConsultationNote
ConsultationSession "1" -- "many" ConsultationNote
User "1" -- "many" ConsultationNote
User "1" -- "many" AILog
AIPromptTemplate "1" -- "many" AILog

@enduml
```

---

## 20. Class Diagram service-level - PlantUML

```plantuml
@startuml
skinparam classAttributeIconSize 0

class AuthService {
  +login(username, password)
  +logout(token)
  +getCurrentUser(token)
}

class UserService {
  +createUser(data)
  +updateUser(id, data)
  +assignRole(userId, roleId)
}

class MedicineService {
  +createMedicine(data)
  +updateMedicine(id, data)
  +searchMedicines(keyword)
}

class InventoryService {
  +checkStock(medicineId, quantity)
  +increaseStock(medicineId, quantity)
  +decreaseStock(medicineId, quantity)
  +getLowStock()
  +getNearExpiry(days)
}

class SalesService {
  +createOrder(customerId, staffId)
  +addItem(orderId, medicineId, quantity)
  +calculateTotal(orderId)
}

class PaymentService {
  +payOrder(orderId, method, amount)
}

class InvoiceService {
  +createInvoice(orderId)
  +getInvoice(orderId)
}

class RuleEngineService {
  +checkStockRule(medicineId, quantity)
  +checkDrugInteractions(medicineIds)
  +generatePairs(medicineIds)
}

class ReportService {
  +getRevenueReport(fromDate, toDate)
  +getTopMedicines(fromDate, toDate)
  +getInventoryReport()
}

class AIOrchestrator {
  +generateQuestions(context)
  +generateConsultationNote(context)
  +explainAlert(alertId)
}

class GuardrailService {
  +checkInput(input)
  +checkOutput(output)
}

class AIProvider {
  +generate(prompt)
}

class GraphService {
  +getMedicineGraph(medicineId)
  +queryInteractions(medicineIds)
  +buildContext(medicineIds)
}

class AuditLogService {
  +logAction(action)
  +logAIRequest(data)
}

SalesService --> InventoryService
SalesService --> RuleEngineService
PaymentService --> SalesService
PaymentService --> InventoryService
PaymentService --> InvoiceService
RuleEngineService --> InventoryService
AIOrchestrator --> GuardrailService
AIOrchestrator --> AIProvider
AIOrchestrator --> AuditLogService
AIOrchestrator --> GraphService
ReportService --> SalesService
ReportService --> InventoryService

@enduml
```

---

## 21. Mapping UML với tài liệu khác

| UML | Tài liệu liên quan |
|---|---|
| Use Case Diagram | SRS, Actor Role Permission Matrix, Use Case Specification |
| Activity Diagram bán thuốc | BRD, SRS, Business Rule, API Specification |
| Activity Diagram nhập thuốc | BRD, SRS, Database Design |
| Activity Diagram tương tác thuốc | Business Rule, Database Design, Rule Engine Design |
| Activity Diagram AI tư vấn | AI Architecture, Safety Rule, API Specification |
| Sequence Login | API Specification, Module Design |
| Sequence Create Order | API Specification, Module Design, Database Design |
| Sequence Check Interaction | Business Rule, Rule Engine, Database Design |
| Sequence AI Copilot | AI Architecture, Guardrail, Audit Log |
| Sequence Graph-RAG | Graph Design, AI Architecture |
| Class Diagram | Database Design, Module Design, System Architecture |

---

## 22. Quy tắc vẽ UML cho đồ án

| Quy tắc | Mô tả |
|---|---|
| Không vẽ quá nhiều chi tiết phụ | Tập trung vào luồng chính và module chính |
| Tên actor thống nhất | Admin, Nhân viên nhà thuốc, Nhân viên kho |
| Tên use case thống nhất với SRS | Không đổi tên tùy tiện giữa các tài liệu |
| Class/entity thống nhất với database | Medicine, Order, Payment, Invoice... |
| Sequence thống nhất với API | Endpoint trong sequence nên khớp API Specification |
| Activity thể hiện decision rõ | Dùng if/else cho kiểm tra tồn, tương tác, thanh toán |
| AI/Graph phải có disclaimer/safety | Thể hiện Guardrail và Audit Log trong sequence AI |

---

## 23. Checklist hoàn thành UML

| Hạng mục | Có/Không |
|---|---|
| Có Use Case Diagram tổng quan chưa? |  |
| Use Case có đầy đủ actor chính chưa? |  |
| Có Activity Diagram bán thuốc chưa? |  |
| Có Activity Diagram nhập thuốc chưa? |  |
| Có Activity Diagram kiểm tra tương tác chưa? |  |
| Có Activity Diagram AI tư vấn nếu làm AI chưa? |  |
| Có Sequence Diagram Login chưa? |  |
| Có Sequence Diagram Create Order chưa? |  |
| Có Sequence Diagram Check Interaction chưa? |  |
| Có Sequence Diagram AI Copilot nếu làm AI chưa? |  |
| Có Sequence Diagram Graph-RAG nếu làm graph chưa? |  |
| Có Class Diagram entity tổng quan chưa? |  |
| Có Class Diagram service-level nếu cần chưa? |  |
| UML có thống nhất với SRS/API/Database không? |  |
| Sơ đồ có thể đưa vào báo cáo/slide không? |  |

---

## 24. Kết luận

Tài liệu **UML Diagram Package** đã tập hợp các sơ đồ UML quan trọng cho hệ thống **PharmaAssist AI Intelligence**, bao gồm Use Case Diagram, Activity Diagram, Sequence Diagram và Class Diagram. Các sơ đồ này giúp mô tả hệ thống từ nhiều góc nhìn khác nhau: người dùng, quy trình nghiệp vụ, tương tác giữa các thành phần và cấu trúc class/entity/service.

Trong MVP, nhóm cần ưu tiên hoàn thiện Use Case Diagram tổng quan, Activity Diagram bán thuốc, Activity Diagram nhập thuốc, Activity Diagram kiểm tra tương tác, Sequence Diagram Login, Sequence Diagram Create Order, Sequence Diagram Check Interaction và Class Diagram tổng quan. Các sơ đồ AI Copilot và Graph-RAG có thể bổ sung nếu nhóm triển khai hoặc mô phỏng chức năng nâng cao.

Các sơ đồ UML cần được giữ thống nhất với các tài liệu SRS, Module Design, API Specification, Database Design và Business Rule/Safety Rule để đảm bảo bộ hồ sơ đồ án có tính nhất quán cao.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

