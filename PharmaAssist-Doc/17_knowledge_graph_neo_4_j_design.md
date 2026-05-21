# 17_KNOWLEDGE_GRAPH_NEO4J_DESIGN

**Mã tài liệu:** 17_Knowledge_Graph_Neo4j_Design  
**Tên tài liệu:** Knowledge Graph and Neo4j Design Document  
**Dự án:** PharmaAssist AI Intelligence  
**Loại tài liệu:** Tài liệu thiết kế Knowledge Graph, Neo4j và Graph-RAG  
**Phiên bản:** v1.0  
**Ngày cập nhật:** 17/05/2026  
**Đối tượng sử dụng:** AI/Graph Developer, Backend Developer, Database Designer, System Analyst, Tester, người viết báo cáo, người chuẩn bị demo  

---

## 1. Mục đích tài liệu

Tài liệu **Knowledge Graph and Neo4j Design** mô tả thiết kế Knowledge Graph trong hệ thống **PharmaAssist AI Intelligence**, bao gồm các loại node, relationship, thuộc tính, quy ước đặt tên, Cypher query mẫu, dữ liệu graph demo và luồng **Graph-RAG**.

Knowledge Graph là phần nâng cao của đề tài. Trong MVP, hệ thống có thể kiểm tra tương tác thuốc bằng bảng quan hệ `drug_interactions` trong database quan hệ. Tuy nhiên, để tăng điểm kỹ thuật, hệ thống có thể mở rộng thêm Neo4j Knowledge Graph nhằm biểu diễn các quan hệ giữa thuốc, hoạt chất, nhóm thuốc, triệu chứng mẫu, tình trạng cần thận trọng, red flag mẫu và khuyến nghị tham khảo.

Graph trong đồ án này không phải dữ liệu y khoa thật. Graph được xây dựng bằng dữ liệu mẫu nhằm phục vụ minh họa kỹ thuật:

- Mô hình hóa dữ liệu dạng node-edge.
- Truy vấn quan hệ thuốc nhanh bằng Cypher.
- Hiển thị Graph Explorer trên giao diện.
- Cung cấp context cho AI Copilot thông qua Graph-RAG.
- Thể hiện kiến trúc AI + Knowledge Graph + Guardrail.

Tài liệu này dùng để:

- Xác định các node trong Knowledge Graph.
- Xác định các relationship giữa node.
- Mô tả thuộc tính của node và relationship.
- Cung cấp Cypher query mẫu.
- Cung cấp dữ liệu seed graph mẫu cho demo.
- Mô tả Graph-RAG flow.
- Mapping graph với database quan hệ.
- Xác định guardrail và ràng buộc an toàn khi dùng graph.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

---

## 2. Phạm vi thiết kế Knowledge Graph

Knowledge Graph trong PharmaAssist AI Intelligence được thiết kế cho mục đích học tập và demo đồ án. Phạm vi bao gồm:

- Lưu node thuốc.
- Lưu node hoạt chất mẫu.
- Lưu node nhóm thuốc mẫu.
- Lưu node triệu chứng mẫu.
- Lưu node bệnh nền/tình trạng cần thận trọng mẫu.
- Lưu node tương tác mẫu.
- Lưu node dấu hiệu nguy hiểm mẫu.
- Lưu node khuyến nghị tham khảo.
- Lưu relationship giữa thuốc và hoạt chất.
- Lưu relationship giữa thuốc và nhóm thuốc.
- Lưu relationship tương tác giữa thuốc hoặc hoạt chất.
- Lưu relationship giữa nhóm thuốc và triệu chứng mẫu.
- Lưu relationship giữa nhóm thuốc và tình trạng cần thận trọng.
- Lưu relationship giữa triệu chứng và red flag mẫu.
- Lưu relationship giữa tương tác và khuyến nghị.
- Truy vấn subgraph của thuốc.
- Truy vấn tương tác giữa hai thuốc.
- Tạo context ngắn cho AI Copilot.

Ngoài phạm vi:

- Không xây dựng kho tri thức y khoa thật.
- Không dùng graph để chẩn đoán bệnh.
- Không dùng graph để kê đơn thuốc.
- Không thay thế tư vấn chuyên môn.
- Không đảm bảo dữ liệu graph đúng y khoa thực tế.

---

## 3. Vai trò của Knowledge Graph trong hệ thống

| Vai trò | Mô tả |
|---|---|
| Biểu diễn quan hệ phức tạp | Graph thể hiện thuốc, hoạt chất, nhóm thuốc, tương tác, triệu chứng bằng node-edge |
| Hỗ trợ Graph Explorer | Giao diện có thể hiển thị quan hệ thuốc dưới dạng trực quan |
| Hỗ trợ kiểm tra tương tác nâng cao | Có thể truy vấn quan hệ INTERACTS_WITH trong Neo4j |
| Hỗ trợ Graph-RAG | Trích xuất graph context để đưa vào prompt AI |
| Tăng điểm kỹ thuật | Thể hiện hệ thống có tích hợp Knowledge Graph và AI Governance |
| Tách dữ liệu graph khỏi dữ liệu giao dịch | Database quan hệ lưu bán hàng/kho, Neo4j lưu quan hệ tri thức mẫu |

---

## 4. Kiến trúc tích hợp Neo4j

```text
Frontend Graph Explorer / AI Copilot
        |
        v
Backend API
        |
        +-- Graph Service
        |       |
        |       +-- Neo4j Driver
        |       +-- Graph Query Builder
        |       +-- Graph Context Builder
        |
        +-- AI Orchestrator
        |       |
        |       +-- Context Builder
        |       +-- Guardrail Engine
        |       +-- AI Provider / MockAI
        |
        +-- PostgreSQL/MySQL
        +-- Neo4j
```

### 4.1. Thành phần liên quan

| Thành phần | Vai trò |
|---|---|
| Graph Explorer UI | Hiển thị node-edge của thuốc/tương tác |
| AI Copilot UI | Gửi yêu cầu cần context graph |
| Graph Service | Xử lý truy vấn Neo4j |
| Graph Query Builder | Tạo Cypher query an toàn theo use case |
| Neo4j Driver | Kết nối backend với Neo4j |
| Graph Context Builder | Chuyển graph result thành text context ngắn |
| AI Orchestrator | Dùng graph context trong prompt AI |
| Guardrail Engine | Kiểm soát input/output AI |
| AI Audit Log | Ghi log tác vụ AI dùng graph nếu có |

---

## 5. Danh sách Node

| Node | Mô tả | Thuộc tính |
|---|---|---|
| Medicine | Thuốc | id, code, name, unit, source |
| ActiveIngredient | Hoạt chất | id, name, description, source |
| DrugGroup | Nhóm thuốc | id, name, description |
| Symptom | Triệu chứng mẫu | id, name, description |
| Condition | Bệnh nền/tình trạng mẫu | id, name, description |
| Interaction | Tương tác | id, severity, description, riskScore |
| RedFlag | Dấu hiệu nguy hiểm mẫu | id, name, description |
| Recommendation | Khuyến nghị tham khảo | id, content, type |

---

## 6. Mô tả chi tiết Node

## 6.1. Node Medicine

### 6.1.1. Mục đích

Node `Medicine` đại diện cho thuốc trong Knowledge Graph. Node này có thể đồng bộ hoặc ánh xạ từ bảng `medicines` trong database quan hệ.

### 6.1.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã thuốc trong graph hoặc database |
| code | string | Mã thuốc, nên trùng với medicines.code |
| name | string | Tên thuốc |
| unit | string | Đơn vị tính nếu cần |
| source | string | demo/manual/import |
| createdAt | datetime | Ngày tạo node nếu cần |

### 6.1.3. Ví dụ

```text
(:Medicine {id: 1, code: 'MED001', name: 'Thuốc mẫu A', unit: 'Hộp', source: 'demo'})
```

---

## 6.2. Node ActiveIngredient

### 6.2.1. Mục đích

Node `ActiveIngredient` đại diện cho hoạt chất mẫu. Trong đồ án, hoạt chất chỉ là dữ liệu mô phỏng, không dùng thay thế thông tin y khoa thật.

### 6.2.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã hoạt chất |
| name | string | Tên hoạt chất mẫu |
| description | string | Mô tả mẫu |
| source | string | demo/manual/import |

---

## 6.3. Node DrugGroup

### 6.3.1. Mục đích

Node `DrugGroup` đại diện cho nhóm thuốc hoặc nhóm tác dụng mẫu.

### 6.3.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã nhóm thuốc |
| name | string | Tên nhóm thuốc |
| description | string | Mô tả mẫu |

---

## 6.4. Node Symptom

### 6.4.1. Mục đích

Node `Symptom` đại diện cho triệu chứng mẫu phục vụ Graph Explorer hoặc AI Copilot.

### 6.4.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã triệu chứng |
| name | string | Tên triệu chứng mẫu |
| description | string | Mô tả mẫu |

### 6.4.3. Lưu ý an toàn

Triệu chứng trong graph chỉ dùng để minh họa quan hệ. Hệ thống không dùng symptom để chẩn đoán bệnh.

---

## 6.5. Node Condition

### 6.5.1. Mục đích

Node `Condition` đại diện cho bệnh nền hoặc tình trạng cần thận trọng mẫu.

### 6.5.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã condition |
| name | string | Tên tình trạng mẫu |
| description | string | Mô tả mẫu |

### 6.5.3. Lưu ý an toàn

Condition chỉ phục vụ mô phỏng. AI hoặc hệ thống không được kết luận khách hàng có condition cụ thể.

---

## 6.6. Node Interaction

### 6.6.1. Mục đích

Node `Interaction` đại diện cho một loại tương tác hoặc một record tương tác mẫu. Có hai cách mô hình hóa tương tác:

| Cách | Mô tả | Khi dùng |
|---|---|---|
| Relationship property | Lưu severity/description trực tiếp trên relationship INTERACTS_WITH | Đơn giản, phù hợp MVP |
| Interaction node | Tạo node Interaction và nối đến Medicine/Recommendation | Phù hợp khi muốn mở rộng nhiều thuộc tính |

Tài liệu này hỗ trợ cả hai, nhưng khuyến nghị MVP dùng relationship property để đơn giản.

### 6.6.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã tương tác |
| severity | string | LOW/MEDIUM/HIGH |
| description | string | Mô tả rủi ro mẫu |
| riskScore | number | Điểm rủi ro mẫu nếu cần |

---

## 6.7. Node RedFlag

### 6.7.1. Mục đích

Node `RedFlag` đại diện cho dấu hiệu nguy hiểm mẫu. RedFlag chỉ dùng để nhắc rằng cần hỏi chuyên gia y tế, không dùng để chẩn đoán.

### 6.7.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã red flag |
| name | string | Tên dấu hiệu mẫu |
| description | string | Mô tả mẫu |

---

## 6.8. Node Recommendation

### 6.8.1. Mục đích

Node `Recommendation` lưu nội dung khuyến nghị tham khảo dùng cho tương tác, red flag hoặc graph context.

### 6.8.2. Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
|---|---|---|
| id | string/number | Mã recommendation |
| content | string | Nội dung khuyến nghị tham khảo |
| type | string | interaction/red_flag/general |

### 6.8.3. Lưu ý

Recommendation phải là khuyến nghị tham khảo, không phải chỉ định điều trị hoặc kê đơn.

---

## 7. Danh sách Relationship

| Relationship | Mô tả | From | To |
|---|---|---|---|
| CONTAINS | Thuốc chứa hoạt chất | Medicine | ActiveIngredient |
| BELONGS_TO | Thuốc thuộc nhóm | Medicine | DrugGroup |
| INTERACTS_WITH | Thuốc/hoạt chất tương tác | Medicine/ActiveIngredient | Medicine/ActiveIngredient |
| TREATS_SYMPTOM | Nhóm thuốc hỗ trợ triệu chứng mẫu | DrugGroup | Symptom |
| CAUTION_WITH | Cần thận trọng với bệnh nền/tình trạng mẫu | DrugGroup/Medicine | Condition |
| HAS_REDFLAG | Triệu chứng có dấu hiệu nguy hiểm mẫu | Symptom | RedFlag |
| HAS_RECOMMENDATION | Tương tác hoặc red flag có khuyến nghị | Interaction/RedFlag | Recommendation |
| HAS_INTERACTION | Medicine liên kết với Interaction node | Medicine | Interaction |

---

## 8. Mô tả chi tiết Relationship

## 8.1. CONTAINS

| Mục | Nội dung |
|---|---|
| Tên relationship | CONTAINS |
| Ý nghĩa | Thuốc chứa hoạt chất mẫu |
| From | Medicine |
| To | ActiveIngredient |
| Thuộc tính | amountText nếu cần |

Ví dụ:

```text
(Medicine)-[:CONTAINS {amountText: 'Hàm lượng mẫu'}]->(ActiveIngredient)
```

---

## 8.2. BELONGS_TO

| Mục | Nội dung |
|---|---|
| Tên relationship | BELONGS_TO |
| Ý nghĩa | Thuốc thuộc nhóm thuốc |
| From | Medicine |
| To | DrugGroup |
| Thuộc tính | source nếu cần |

Ví dụ:

```text
(Medicine)-[:BELONGS_TO]->(DrugGroup)
```

---

## 8.3. INTERACTS_WITH

| Mục | Nội dung |
|---|---|
| Tên relationship | INTERACTS_WITH |
| Ý nghĩa | Hai thuốc hoặc hai hoạt chất có tương tác mẫu |
| From | Medicine hoặc ActiveIngredient |
| To | Medicine hoặc ActiveIngredient |
| Thuộc tính | severity, riskScore, description, recommendation, source |

Ví dụ:

```text
(Medicine)-[:INTERACTS_WITH {severity: 'HIGH', riskScore: 90, description: 'Mô tả mẫu', recommendation: 'Khuyến nghị mẫu'}]-(Medicine)
```

### Lưu ý

Relationship này nên được xem là không có hướng khi truy vấn tương tác giữa hai thuốc.

---

## 8.4. TREATS_SYMPTOM

| Mục | Nội dung |
|---|---|
| Tên relationship | TREATS_SYMPTOM |
| Ý nghĩa | Nhóm thuốc hỗ trợ triệu chứng mẫu |
| From | DrugGroup |
| To | Symptom |
| Thuộc tính | confidence nếu cần |

Lưu ý: Relationship này chỉ phục vụ minh họa, không dùng để gợi ý điều trị thật.

---

## 8.5. CAUTION_WITH

| Mục | Nội dung |
|---|---|
| Tên relationship | CAUTION_WITH |
| Ý nghĩa | Cần thận trọng với tình trạng/bệnh nền mẫu |
| From | DrugGroup hoặc Medicine |
| To | Condition |
| Thuộc tính | severity, note |

---

## 8.6. HAS_REDFLAG

| Mục | Nội dung |
|---|---|
| Tên relationship | HAS_REDFLAG |
| Ý nghĩa | Triệu chứng có dấu hiệu nguy hiểm mẫu |
| From | Symptom |
| To | RedFlag |
| Thuộc tính | urgency nếu cần |

---

## 8.7. HAS_RECOMMENDATION

| Mục | Nội dung |
|---|---|
| Tên relationship | HAS_RECOMMENDATION |
| Ý nghĩa | Tương tác hoặc red flag có khuyến nghị tham khảo |
| From | Interaction hoặc RedFlag |
| To | Recommendation |
| Thuộc tính | priority nếu cần |

---

## 9. Sơ đồ text Knowledge Graph

```text
(Medicine)-[:CONTAINS]->(ActiveIngredient)
(Medicine)-[:BELONGS_TO]->(DrugGroup)
(Medicine)-[:INTERACTS_WITH {severity, riskScore, description, recommendation}]->(Medicine)
(ActiveIngredient)-[:INTERACTS_WITH {severity, riskScore}]->(ActiveIngredient)
(DrugGroup)-[:TREATS_SYMPTOM]->(Symptom)
(DrugGroup)-[:CAUTION_WITH]->(Condition)
(Symptom)-[:HAS_REDFLAG]->(RedFlag)
(Interaction)-[:HAS_RECOMMENDATION]->(Recommendation)
(RedFlag)-[:HAS_RECOMMENDATION]->(Recommendation)
```

---

## 10. Quy ước đặt tên trong Neo4j

| Thành phần | Quy ước | Ví dụ |
|---|---|---|
| Label node | PascalCase | Medicine, ActiveIngredient |
| Relationship | UPPER_SNAKE_CASE | INTERACTS_WITH, BELONGS_TO |
| Property | camelCase | riskScore, createdAt |
| Medicine code | Trùng database quan hệ | MED001 |
| Severity | UPPERCASE | LOW, MEDIUM, HIGH |
| Source | string | demo, manual, imported |

---

## 11. Ràng buộc và index Neo4j

### 11.1. Constraint đề xuất

```cypher
CREATE CONSTRAINT medicine_code_unique IF NOT EXISTS
FOR (m:Medicine)
REQUIRE m.code IS UNIQUE;

CREATE CONSTRAINT active_ingredient_name_unique IF NOT EXISTS
FOR (a:ActiveIngredient)
REQUIRE a.name IS UNIQUE;

CREATE CONSTRAINT drug_group_name_unique IF NOT EXISTS
FOR (g:DrugGroup)
REQUIRE g.name IS UNIQUE;
```

### 11.2. Index đề xuất

```cypher
CREATE INDEX medicine_name_index IF NOT EXISTS
FOR (m:Medicine)
ON (m.name);

CREATE INDEX symptom_name_index IF NOT EXISTS
FOR (s:Symptom)
ON (s.name);
```

---

## 12. Cypher mẫu

## 12.1. Tạo node Medicine

```cypher
MERGE (m:Medicine {code: $code})
SET m.id = $id,
    m.name = $name,
    m.unit = $unit,
    m.source = 'demo';
```

---

## 12.2. Tạo node ActiveIngredient

```cypher
MERGE (a:ActiveIngredient {name: $name})
SET a.id = $id,
    a.description = $description,
    a.source = 'demo';
```

---

## 12.3. Tạo quan hệ thuốc chứa hoạt chất

```cypher
MATCH (m:Medicine {code: $medicineCode})
MATCH (a:ActiveIngredient {name: $ingredientName})
MERGE (m)-[r:CONTAINS]->(a)
SET r.amountText = $amountText;
```

---

## 12.4. Tạo quan hệ thuốc thuộc nhóm

```cypher
MATCH (m:Medicine {code: $medicineCode})
MATCH (g:DrugGroup {name: $groupName})
MERGE (m)-[:BELONGS_TO]->(g);
```

---

## 12.5. Tạo tương tác giữa hai thuốc

```cypher
MATCH (m1:Medicine {code: $medicineCodeA})
MATCH (m2:Medicine {code: $medicineCodeB})
MERGE (m1)-[r:INTERACTS_WITH]-(m2)
SET r.severity = $severity,
    r.riskScore = $riskScore,
    r.description = $description,
    r.recommendation = $recommendation,
    r.source = 'demo';
```

---

## 12.6. Tìm tương tác giữa hai thuốc

```cypher
MATCH (m1:Medicine {code: $medicineCodeA})-[r:INTERACTS_WITH]-(m2:Medicine {code: $medicineCodeB})
RETURN m1.name AS medicineA,
       m2.name AS medicineB,
       r.severity AS severity,
       r.description AS description,
       r.recommendation AS recommendation;
```

---

## 12.7. Lấy subgraph của thuốc

```cypher
MATCH path = (m:Medicine {code: $medicineCode})-[*1..2]-(n)
RETURN path
LIMIT 50;
```

---

## 12.8. Tìm tất cả thuốc tương tác với một thuốc

```cypher
MATCH (m:Medicine {code: $medicineCode})-[r:INTERACTS_WITH]-(other:Medicine)
RETURN other.code AS code,
       other.name AS name,
       r.severity AS severity,
       r.description AS description,
       r.recommendation AS recommendation
ORDER BY r.riskScore DESC;
```

---

## 12.9. Lấy hoạt chất của thuốc

```cypher
MATCH (m:Medicine {code: $medicineCode})-[:CONTAINS]->(a:ActiveIngredient)
RETURN m.name AS medicine,
       collect(a.name) AS activeIngredients;
```

---

## 12.10. Lấy nhóm thuốc và condition cần thận trọng

```cypher
MATCH (m:Medicine {code: $medicineCode})-[:BELONGS_TO]->(g:DrugGroup)
OPTIONAL MATCH (g)-[c:CAUTION_WITH]->(condition:Condition)
RETURN m.name AS medicine,
       g.name AS drugGroup,
       collect({condition: condition.name, note: c.note, severity: c.severity}) AS cautions;
```

---

## 12.11. Lấy red flag theo triệu chứng mẫu

```cypher
MATCH (s:Symptom {name: $symptomName})-[:HAS_REDFLAG]->(r:RedFlag)
OPTIONAL MATCH (r)-[:HAS_RECOMMENDATION]->(rec:Recommendation)
RETURN s.name AS symptom,
       r.name AS redFlag,
       r.description AS description,
       collect(rec.content) AS recommendations;
```

---

## 13. Dữ liệu graph mẫu cho demo

## 13.1. Tạo thuốc mẫu

```cypher
MERGE (:Medicine {id: 1, code: 'MED001', name: 'Thuốc mẫu A', unit: 'Hộp', source: 'demo'});
MERGE (:Medicine {id: 2, code: 'MED002', name: 'Thuốc mẫu B', unit: 'Hộp', source: 'demo'});
MERGE (:Medicine {id: 3, code: 'MED003', name: 'Thuốc mẫu C', unit: 'Chai', source: 'demo'});
MERGE (:Medicine {id: 4, code: 'MED004', name: 'Thuốc mẫu D', unit: 'Hộp', source: 'demo'});
```

---

## 13.2. Tạo hoạt chất mẫu

```cypher
MERGE (:ActiveIngredient {id: 1, name: 'Hoạt chất mẫu X', description: 'Dữ liệu hoạt chất mẫu', source: 'demo'});
MERGE (:ActiveIngredient {id: 2, name: 'Hoạt chất mẫu Y', description: 'Dữ liệu hoạt chất mẫu', source: 'demo'});
MERGE (:ActiveIngredient {id: 3, name: 'Hoạt chất mẫu Z', description: 'Dữ liệu hoạt chất mẫu', source: 'demo'});
```

---

## 13.3. Tạo nhóm thuốc mẫu

```cypher
MERGE (:DrugGroup {id: 1, name: 'Nhóm giảm đau mẫu', description: 'Nhóm thuốc mẫu phục vụ đồ án'});
MERGE (:DrugGroup {id: 2, name: 'Nhóm cảm cúm mẫu', description: 'Nhóm thuốc mẫu phục vụ đồ án'});
MERGE (:DrugGroup {id: 3, name: 'Nhóm tiêu hóa mẫu', description: 'Nhóm thuốc mẫu phục vụ đồ án'});
```

---

## 13.4. Tạo quan hệ thuốc - hoạt chất - nhóm

```cypher
MATCH (m:Medicine {code: 'MED001'}), (a:ActiveIngredient {name: 'Hoạt chất mẫu X'})
MERGE (m)-[:CONTAINS {amountText: 'Hàm lượng mẫu'}]->(a);

MATCH (m:Medicine {code: 'MED002'}), (a:ActiveIngredient {name: 'Hoạt chất mẫu Y'})
MERGE (m)-[:CONTAINS {amountText: 'Hàm lượng mẫu'}]->(a);

MATCH (m:Medicine {code: 'MED001'}), (g:DrugGroup {name: 'Nhóm giảm đau mẫu'})
MERGE (m)-[:BELONGS_TO]->(g);

MATCH (m:Medicine {code: 'MED002'}), (g:DrugGroup {name: 'Nhóm cảm cúm mẫu'})
MERGE (m)-[:BELONGS_TO]->(g);
```

---

## 13.5. Tạo tương tác mẫu

```cypher
MATCH (m1:Medicine {code: 'MED001'}), (m2:Medicine {code: 'MED002'})
MERGE (m1)-[r:INTERACTS_WITH]-(m2)
SET r.severity = 'HIGH',
    r.riskScore = 90,
    r.description = 'Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu.',
    r.recommendation = 'Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế.',
    r.source = 'demo';

MATCH (m1:Medicine {code: 'MED003'}), (m2:Medicine {code: 'MED004'})
MERGE (m1)-[r:INTERACTS_WITH]-(m2)
SET r.severity = 'MEDIUM',
    r.riskScore = 60,
    r.description = 'Có thể cần lưu ý khi sử dụng cùng lúc theo dữ liệu mẫu.',
    r.recommendation = 'Nhân viên nên xem cảnh báo và ghi chú tư vấn nếu cần.',
    r.source = 'demo';
```

---

## 13.6. Tạo symptom, red flag, recommendation mẫu

```cypher
MERGE (s:Symptom {id: 1, name: 'Triệu chứng mẫu A', description: 'Dữ liệu triệu chứng mẫu'});
MERGE (r:RedFlag {id: 1, name: 'Dấu hiệu nguy hiểm mẫu', description: 'Dữ liệu red flag mẫu'});
MERGE (rec:Recommendation {id: 1, content: 'Khuyến nghị hỏi ý kiến chuyên gia y tế khi có dấu hiệu nguy hiểm.', type: 'red_flag'});

MATCH (s:Symptom {name: 'Triệu chứng mẫu A'}), (r:RedFlag {name: 'Dấu hiệu nguy hiểm mẫu'})
MERGE (s)-[:HAS_REDFLAG {urgency: 'HIGH'}]->(r);

MATCH (r:RedFlag {name: 'Dấu hiệu nguy hiểm mẫu'}), (rec:Recommendation {id: 1})
MERGE (r)-[:HAS_RECOMMENDATION {priority: 'HIGH'}]->(rec);
```

---

## 14. Graph API đề xuất

| Method | Endpoint | Mô tả | Actor |
|---|---|---|---|
| GET | /graph/medicine/{id} | Lấy subgraph liên quan thuốc | Admin, Staff |
| GET | /graph/medicine-code/{code} | Lấy subgraph theo mã thuốc | Admin, Staff |
| POST | /graph/interactions/query | Truy vấn tương tác graph giữa các thuốc | Admin, Staff |
| GET | /graph/search | Tìm node graph | Admin, Staff |
| POST | /graph/context | Tạo graph context cho AI | Admin, Staff |
| POST | /ai/graph-rag | Dùng graph context để gọi AI | Admin, Staff |

---

## 15. Response graph mẫu

### 15.1. Response subgraph thuốc

```json
{
  "success": true,
  "data": {
    "nodes": [
      {
        "id": "MED001",
        "label": "Medicine",
        "name": "Thuốc mẫu A"
      },
      {
        "id": "AI001",
        "label": "ActiveIngredient",
        "name": "Hoạt chất mẫu X"
      }
    ],
    "relationships": [
      {
        "source": "MED001",
        "target": "AI001",
        "type": "CONTAINS"
      }
    ],
    "disclaimer": "Dữ liệu graph là dữ liệu mẫu phục vụ đồ án. Thông tin cảnh báo chỉ mang tính tham khảo."
  },
  "message": "Success"
}
```

---

### 15.2. Response interaction graph query

```json
{
  "success": true,
  "data": {
    "interactions": [
      {
        "medicineA": "Thuốc mẫu A",
        "medicineB": "Thuốc mẫu B",
        "severity": "HIGH",
        "riskScore": 90,
        "description": "Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu.",
        "recommendation": "Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế."
      }
    ],
    "disclaimer": "Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế."
  },
  "message": "Graph interaction query completed"
}
```

---

## 16. Graph-RAG flow

### 16.1. Mô tả tổng quan

Graph-RAG là quy trình dùng dữ liệu từ Knowledge Graph làm context cho AI. Thay vì AI tự trả lời từ kiến thức bên ngoài, hệ thống truy vấn Neo4j trước, lấy kết quả graph liên quan, sau đó chuyển thành context ngắn đưa vào prompt.

### 16.2. Flow chi tiết

1. Người dùng nhập thông tin phiên tư vấn hoặc đơn hàng.
2. Backend chuẩn hóa dữ liệu.
3. Backend xác định danh sách thuốc hoặc cảnh báo cần truy vấn.
4. Graph Service truy vấn Neo4j.
5. Neo4j trả về node/relationship liên quan.
6. Context Builder tạo context ngắn.
7. Guardrail kiểm tra input.
8. Prompt Builder tạo prompt an toàn.
9. AI Provider hoặc MockAI sinh nội dung.
10. Guardrail kiểm tra output.
11. Lưu AI Audit Log.
12. Trả kết quả cho người dùng.
13. Người dùng xác nhận trước khi lưu nếu là nội dung tư vấn.

### 16.3. Sơ đồ text Graph-RAG

```text
User / Staff
    |
    v
Frontend AI Copilot
    |
    v
Backend API
    |
    v
Graph-RAG Service
    |
    +-- Normalize medicine ids/codes
    +-- Query Neo4j
    +-- Get graph result
    +-- Build graph context
    |
    v
AI Orchestrator
    |
    +-- Input Guardrail
    +-- Prompt Builder
    +-- AI Provider / MockAI
    +-- Output Guardrail
    +-- AI Audit Log
    |
    v
Frontend displays draft result + disclaimer
```

---

## 17. Context Builder cho Graph-RAG

### 17.1. Mục tiêu

Context Builder chuyển dữ liệu graph dạng node-edge thành đoạn văn bản ngắn, rõ ràng, phù hợp để đưa vào prompt AI.

### 17.2. Input

| Input | Mô tả |
|---|---|
| medicineCodes | Danh sách mã thuốc |
| graphNodes | Node trả về từ Neo4j |
| graphRelationships | Relationship trả về từ Neo4j |
| interactionResults | Kết quả tương tác nếu có |

### 17.3. Output context mẫu

```text
Dữ liệu graph mẫu:
- Thuốc mẫu A có mã MED001.
- Thuốc mẫu B có mã MED002.
- MED001 có quan hệ INTERACTS_WITH với MED002.
- Mức độ: HIGH.
- Mô tả mẫu: Có nguy cơ tương tác đáng chú ý theo dữ liệu mẫu.
- Khuyến nghị mẫu: Cần kiểm tra kỹ và khuyến nghị khách hàng hỏi ý kiến chuyên gia y tế.

Lưu ý: Dữ liệu trên là dữ liệu mẫu phục vụ đồ án, không phải dữ liệu y khoa thật.
```

---

## 18. Prompt Graph-RAG mẫu

```text
Bạn là AI hỗ trợ nhân viên nhà thuốc trong đồ án phần mềm PharmaAssist AI Intelligence.
Nhiệm vụ: giải thích thông tin graph context bằng ngôn ngữ dễ hiểu.

Ràng buộc an toàn:
- Không chẩn đoán bệnh.
- Không kê đơn thuốc.
- Không đưa liều dùng điều trị cụ thể.
- Không khẳng định thuốc chắc chắn an toàn hoặc chắc chắn nguy hiểm.
- Chỉ dựa trên dữ liệu graph mẫu được cung cấp.
- Phải nhắc rằng thông tin chỉ mang tính tham khảo.

Graph context:
{graph_context}

Hãy tạo phần giải thích ngắn gọn cho nhân viên nhà thuốc tham khảo.
```

---

## 19. Mapping Neo4j với database quan hệ

| Database quan hệ | Neo4j | Mapping |
|---|---|---|
| medicines.id | Medicine.id | Dùng để đồng bộ định danh |
| medicines.code | Medicine.code | Mã thuốc chính để truy vấn |
| medicines.name | Medicine.name | Tên thuốc hiển thị |
| medicine_categories.name | DrugGroup.name | Có thể map danh mục sang nhóm thuốc mẫu |
| active_ingredients.name | ActiveIngredient.name | Hoạt chất mẫu |
| drug_interactions | INTERACTS_WITH | Có thể đồng bộ rule tương tác sang graph |
| drug_interactions.severity | r.severity | Mức độ tương tác |
| drug_interactions.description | r.description | Mô tả tương tác |
| drug_interactions.recommendation | r.recommendation | Khuyến nghị tham khảo |

### 19.1. Chiến lược đồng bộ

| Chiến lược | Mô tả | Phù hợp |
|---|---|---|
| Seed riêng Neo4j | Tạo script Cypher riêng cho graph | Đồ án/MVP |
| Đồng bộ thủ công từ DB quan hệ | Backend đọc DB quan hệ và tạo node/edge | Nâng cao |
| Đồng bộ tự động theo event | Khi medicine/interaction thay đổi thì cập nhật Neo4j | Phát triển sau |

Khuyến nghị đồ án: dùng **seed riêng Neo4j** để đơn giản và ổn định khi demo.

---

## 20. Graph Explorer UI

### 20.1. Mục tiêu

Graph Explorer UI cho phép người dùng xem trực quan quan hệ graph của thuốc.

### 20.2. Thành phần UI

| Thành phần | Mô tả |
|---|---|
| Ô tìm thuốc | Tìm theo tên hoặc mã thuốc |
| Khu vực graph | Hiển thị node và relationship |
| Panel chi tiết node | Hiển thị thông tin node được chọn |
| Bộ lọc relationship | CONTAINS, BELONGS_TO, INTERACTS_WITH |
| Nút truy vấn tương tác | Kiểm tra tương tác graph |
| Disclaimer | Dữ liệu graph là dữ liệu mẫu |

### 20.3. Hành động người dùng

| Hành động | Kết quả |
|---|---|
| Chọn thuốc | Hiển thị subgraph của thuốc |
| Click node | Hiển thị chi tiết node |
| Lọc relationship | Graph chỉ hiển thị loại quan hệ được chọn |
| Truy vấn tương tác | Hiển thị các interaction nếu có |

---

## 21. Quy tắc an toàn khi dùng Knowledge Graph

| Rule | Nội dung |
|---|---|
| KG-SAFE-01 | Graph chỉ chứa dữ liệu mẫu phục vụ đồ án |
| KG-SAFE-02 | Graph không dùng để chẩn đoán bệnh |
| KG-SAFE-03 | Graph không dùng để kê đơn thuốc |
| KG-SAFE-04 | Graph-RAG output phải qua Guardrail |
| KG-SAFE-05 | Graph Explorer phải có disclaimer |
| KG-SAFE-06 | Nếu graph context có red flag, AI phải khuyến nghị hỏi chuyên gia y tế |
| KG-SAFE-07 | Không đưa dữ liệu cá nhân nhạy cảm vào graph context |
| KG-SAFE-08 | Không cho người dùng query Cypher trực tiếp từ UI |

---

## 22. Rủi ro và biện pháp xử lý

| Rủi ro | Tác động | Biện pháp xử lý |
|---|---|---|
| Dữ liệu graph bị hiểu là dữ liệu y khoa thật | Rủi ro an toàn | Gắn disclaimer rõ ràng |
| Neo4j khó cài đặt khi demo | Demo lỗi | Có mock graph JSON fallback |
| Cypher query quá rộng | Trả quá nhiều dữ liệu, chậm | Giới hạn depth và LIMIT |
| Người dùng nhập query nguy hiểm | Rủi ro bảo mật | Không cho nhập Cypher trực tiếp |
| Graph-RAG sinh nội dung vượt phạm vi | Rủi ro AI | Guardrail input/output |
| Mapping DB quan hệ và Neo4j lệch | Kết quả graph sai | Dùng medicine.code làm khóa mapping thống nhất |
| Thiếu dữ liệu graph demo | Graph Explorer trống | Chuẩn bị seed data Cypher trước |

---

## 23. Test case Knowledge Graph

| Test Case ID | Nội dung kiểm thử | Kết quả mong đợi |
|---|---|---|
| TC-GRAPH-01 | Lấy subgraph của thuốc MED001 | Trả node Medicine, ActiveIngredient, DrugGroup |
| TC-GRAPH-02 | Truy vấn tương tác MED001 và MED002 | Trả interaction severity HIGH |
| TC-GRAPH-03 | Truy vấn thuốc không có tương tác | Trả danh sách rỗng |
| TC-GRAPH-04 | Lấy graph context cho AI | Trả context text ngắn |
| TC-GRAPH-05 | Graph Explorer hiển thị disclaimer | Có disclaimer |
| TC-GRAPH-06 | Staff truy cập Graph Explorer | Được phép nếu có quyền |
| TC-GRAPH-07 | Warehouse truy cập Graph Explorer không được cấp quyền | Bị chặn hoặc chỉ xem giới hạn |
| TC-GRAPH-08 | Neo4j lỗi kết nối | Hệ thống dùng mock graph hoặc báo lỗi thân thiện |
| TC-GRAPH-09 | Graph-RAG output thiếu disclaimer | Guardrail/backend bổ sung disclaimer |
| TC-GRAPH-10 | Người dùng cố nhập Cypher trực tiếp | Không hỗ trợ hoặc bị chặn |

---

## 24. Checklist triển khai Neo4j/Graph-RAG

| Câu hỏi kiểm tra | Có/Không |
|---|---|
| Đã xác định node label chính chưa? |  |
| Đã xác định relationship chính chưa? |  |
| Có seed data Cypher cho graph demo chưa? |  |
| Có constraint Medicine.code unique chưa? |  |
| Có API lấy subgraph thuốc chưa? |  |
| Có API truy vấn tương tác graph chưa? |  |
| Có Graph Explorer UI chưa? |  |
| Graph Explorer có disclaimer chưa? |  |
| Có Graph Context Builder chưa? |  |
| Có luồng Graph-RAG với AI chưa? |  |
| Graph-RAG output có qua Guardrail chưa? |  |
| Có mock graph fallback khi Neo4j lỗi chưa? |  |
| Không cho nhập Cypher trực tiếp từ UI chưa? |  |
| Có test case cho graph chưa? |  |

---

## 25. Kết luận

Tài liệu **Knowledge Graph and Neo4j Design** đã mô tả thiết kế Knowledge Graph cho hệ thống **PharmaAssist AI Intelligence**, bao gồm node, relationship, thuộc tính, Cypher query mẫu, dữ liệu seed demo, Graph API, Graph Explorer và luồng Graph-RAG.

Trong phạm vi đồ án, Knowledge Graph là phần nâng cao giúp hệ thống có điểm nhấn kỹ thuật. Nhóm có thể triển khai Neo4j thật hoặc mô phỏng bằng JSON nếu không đủ thời gian. Dù triển khai theo cách nào, graph chỉ sử dụng dữ liệu mẫu phục vụ đồ án, không phải dữ liệu y khoa thật.

Khi dùng Graph-RAG với AI Copilot, output AI phải được kiểm soát bởi Guardrail, có disclaimer và không được dùng để chẩn đoán, kê đơn hoặc thay thế chuyên gia y tế.

**Thông tin cảnh báo chỉ mang tính tham khảo, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.**

