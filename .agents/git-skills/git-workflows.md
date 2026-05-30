# 📜 HIẾN PHÁP GIT & GITHUB WORKFLOW CHO LÀM VIỆC NHÓM

> Bộ "Hiến pháp Git" tối cao quy định quy trình làm việc nhóm chuyên nghiệp, nhất quán và an toàn với Git & GitHub dành cho mọi thành viên trong dự án.

---

## 1. MỤC ĐÍCH CỦA QUY TRÌNH GIT KHI LÀM NHÓM

Git không chỉ dùng để lưu code mà còn để:

- Tránh ghi đè code của nhau
- Theo dõi ai đã sửa gì, khi nào
- Dễ quay lại phiên bản cũ khi bị lỗi
- Review code trước khi đưa vào bản chính
- Tách riêng từng chức năng để dễ quản lý
- Giữ nhánh chính luôn chạy được

> **Nguyên tắc quan trọng nhất:** Không ai được tự ý đưa code chưa kiểm tra vào nhánh chính.

---

## 2. MÔ HÌNH NHÁNH (BRANCHING MODEL)

### 2.1. Tổng quan các nhánh

- 🔴 **`main`**: Nhánh chứa code hoàn chỉnh, ổn định nhất. Dùng để deploy (chạy thực tế) hoặc nộp bài, demo. **TUYỆT ĐỐI KHÔNG code trực tiếp trên nhánh này.**
- 🟡 **`develop`**: Nhánh "hội quân" (Integration Branch). Chứa code mới nhất đã qua kiểm thử cơ bản. Mọi tính năng mới đều phân nhánh từ đây và gộp (merge) về đây.
- 🟢 **`feature/*`**: Các nhánh dùng để làm tính năng mới. (Ví dụ: `feature/PAC-13-login-system`, `feature/PAC-23-alert-medicine-low-stock`).
- 🟠 **`fix/*`** hoặc **`bugfix/*`**: Nhánh dùng để sửa lỗi trong quá trình phát triển. (Ví dụ: `fix/PAC-41-record-bug-in-testing-process`).
- 🔵 **`docs/*`**: Nhánh dùng để cập nhật tài liệu (README, Markdown, UML).
- 🟣 **`release/*`**: Chuẩn bị bản phát hành, demo hoặc nộp bài.
- 🔴 **`hotfix/*`**: Sửa lỗi khẩn cấp trực tiếp trên production/main.

### 2.2. Sơ đồ cấu trúc

```text
main
 └── develop
      ├── feature/PAC-13-login-system
      ├── feature/PAC-21-management-category-medicine
      ├── feature/PAC-35-payment-order
      ├── feature/PAC-38-view-report-revenue
      ├── fix/PAC-41-record-bug-in-testing-process
      └── docs/PAC-118-write-readme-and-guide-setup-project
```

### 2.3. Chi tiết từng nhánh

#### Nhánh `main`

- Code ổn định nhất, có thể deploy/demo/nộp bài
- **KHÔNG** code trực tiếp trên main
- Chỉ nhận code từ: `release → main` hoặc `hotfix → main`
- Nên bảo vệ bằng Branch Protection Rules

#### Nhánh `develop`

- Nơi gom các chức năng đã làm xong nhưng chưa phát hành
- Tất cả feature branches tạo từ develop, merge ngược lại develop

#### Nhánh `feature/*`

- Mỗi chức năng lớn có một nhánh riêng
- Tạo từ develop, merge về develop qua Pull Request

```bash
git checkout develop
git pull origin develop
git checkout -b feature/login
```

#### Nhánh `release/*`

- Chuẩn bị bản demo/nộp bài khi develop đã tương đối ổn
- Chỉ sửa lỗi nhỏ, chỉnh UI, cập nhật docs — **KHÔNG** thêm chức năng lớn
- Merge vào cả `main` (bản chính thức) VÀ `develop` (giữ bản sửa lỗi)

```text
develop → release/v1.0 → main + develop
```

#### Nhánh `hotfix/*`

- Sửa lỗi khẩn cấp trên bản chính thức
- Tạo từ `main` (không phải develop)
- Merge vào cả `main` VÀ `develop`

```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-login-error
```

#### Nhánh `bugfix/*` / `fix/*`

- Sửa lỗi trong quá trình phát triển (chưa phải lỗi khẩn cấp)
- Tạo từ develop, merge lại develop

---

## 3. LUỒNG LÀM VIỆC TỔNG QUÁT (WORKFLOW)

### 3.1. Công thức chính

```text
feature → develop → release → main
hotfix  → main + develop
```

### 3.2. Quy trình 9 bước

```text
1. Lấy code mới nhất từ develop
2. Tạo nhánh feature riêng
3. Code chức năng được giao
4. Commit code rõ ràng
5. Push nhánh lên GitHub
6. Tạo Pull Request vào develop
7. Thành viên khác review
8. Merge vào develop
9. Khi ổn định → merge develop vào main
```

---

## 4. QUY TRÌNH CHI TIẾT CHO TỪNG THÀNH VIÊN

### Bước 1: Đảm bảo bạn đang ở nhánh `develop` và có code mới nhất

```bash
# Chuyển về nhánh develop
git checkout develop

# Lấy code mới nhất từ GitHub về máy
git pull origin develop
```

### Bước 2: Tạo nhánh mới cho tính năng / sửa lỗi

Tên nhánh cần mô tả ngắn gọn tính năng bạn sắp làm.

```bash
# Tạo và chuyển sang nhánh mới
git checkout -b feature/ten-tinh-nang
# Ví dụ: git checkout -b feature/user-profile
```

### Bước 3: Viết code và Kiểm tra trên local

Làm việc trên VSCode/IDE của bạn.

```bash
# Chạy thử project để kiểm tra code
npm run dev

# Kiểm tra danh sách file đã thay đổi
git status
```

### Bước 4: Lưu lại thay đổi (Commit)

Khi code xong một phần logic, hãy commit lại với thông điệp rõ ràng theo chuẩn Conventional Commits.

```bash
# Thêm các file đã thay đổi vào danh sách chờ
git add .

# Lưu lại với lời nhắn có ý nghĩa
git commit -m "feat: thêm giao diện trang cá nhân người dùng"
```

_(Bạn có thể lặp lại Bước 4 nhiều lần cho đến khi xong tính năng)_

### Bước 5: Đẩy code lên GitHub (Push)

```bash
# Lần đầu tiên đẩy nhánh này lên GitHub:
git push -u origin feature/ten-tinh-nang

# Các lần sau chỉ cần:
git push
```

### Bước 6: Tạo Pull Request (PR) và Review

1. Truy cập vào trang GitHub (hoặc GitLab, Bitbucket) của dự án.
2. Sẽ có nút màu xanh **"Compare & pull request"** hiện lên ở đầu trang -> Bấm vào đó.
3. Đảm bảo luồng merge chính xác là: `feature/ten-tinh-nang` ➡️ `develop` (TUYỆT ĐỐI KHÔNG merge trực tiếp vào main).
4. Viết mô tả chi tiết những gì bạn đã làm, kèm theo ảnh chụp màn hình (nếu có thay đổi UI).
5. Bấm **Create pull request**. Nhờ trưởng nhóm hoặc đồng đội review code, duyệt PR và bấm **Merge pull request**.

### Bước 7: Cập nhật lại develop sau khi PR được merge

```bash
# Quay về develop
git checkout develop

# Cập nhật code mới nhất từ GitHub
git pull origin develop

# Sẵn sàng tạo nhánh mới cho công việc tiếp theo!
```

---

## 5. QUY TRÌNH CHO LEADER / QUẢN LÝ REPO

### 5.1. Tạo nhánh develop (nếu chưa có)

```bash
git checkout main && git pull origin main
git checkout -b develop
git push -u origin develop
```

### 5.2. Bảo vệ nhánh main

Vào GitHub → Settings → Branches → Branch protection rules:

- ✅ Require pull request before merging
- ✅ Require approvals (ít nhất 1 người)
- ✅ Block direct push to main
- ✅ Không cho merge nếu còn conflict hoặc test fail

### 5.3. Trách nhiệm Leader

- Quản lý nhánh main và develop
- Review Pull Request
- Kiểm tra conflict
- Tạo release khi gần nộp
- Tạo tag phiên bản

---

## 6. QUY TRÌNH RELEASE (CHUẨN BỊ BẢN NỘP/DEMO)

```bash
# Bước 1: Tạo release
git checkout develop && git pull origin develop
git checkout -b release/v1.0
git push -u origin release/v1.0

# Bước 2: Test toàn bộ (đăng ký, đăng nhập, phân quyền, CRUD, thanh toán, responsive, migration, README...)
# Bước 3: Chỉ sửa lỗi nhỏ, KHÔNG thêm chức năng lớn

# Bước 4: Merge release vào main (tạo PR trên GitHub)
# release/v1.0 → main

# Bước 5: Tạo tag
git checkout main && git pull origin main
git tag v1.0
git push origin v1.0

# Bước 6: Merge release lại vào develop
# release/v1.0 → develop
```

**Ý nghĩa tag:**

```text
v0.1 = bản demo đầu tiên
v0.2 = bản giữa kỳ
v1.0 = bản hoàn chỉnh cuối kỳ
```

---

## 7. QUY TRÌNH HOTFIX (SỬA LỖI KHẨN CẤP)

```bash
# Bước 1: Tạo hotfix từ main
git checkout main && git pull origin main
git checkout -b hotfix/fix-login-error

# Bước 2: Sửa lỗi
git add .
git commit -m "fix: resolve login error on production"
git push -u origin hotfix/fix-login-error

# Bước 3: PR vào main → merge → tạo tag mới
git checkout main && git pull origin main
git tag v1.0.1
git push origin v1.0.1

# Bước 4: PR vào develop (để develop cũng nhận bản sửa)
# hotfix/fix-login-error → develop
```

---

## 8. QUY TẮC ĐẶT TÊN NHÁNH

### ✅ Nên

```text
feature/login           feature/payment         feature/report-dashboard
fix/login-validation    fix/navbar-responsive
hotfix/fix-login-crash  hotfix/fix-database-error
docs/update-readme      docs/add-api-spec
ui/update-homepage      ui/fix-navbar-responsive
release/v1.0            release/final-submission
```

### ❌ Không nên

```text
test    abc    new    update    fix    code-cua-tui    branch1
```

> Tên nhánh nên cho người khác biết ngay bạn đang làm gì.

---

## 9. QUY TẮC VIẾT COMMIT MESSAGE

### Công thức: `<type>: <mô tả ngắn>`

| Type       | Ý nghĩa                          |
| ---------- | -------------------------------- |
| `feat`     | Thêm chức năng mới               |
| `fix`      | Sửa lỗi                          |
| `docs`     | Cập nhật tài liệu                |
| `style`    | Sửa giao diện hoặc format code   |
| `refactor` | Tối ưu code, không đổi chức năng |
| `test`     | Thêm hoặc sửa test               |
| `chore`    | Việc phụ như config, package     |
| `perf`     | Cải thiện hiệu năng              |
| `ci`       | Thay đổi CI/CD                   |

### ✅ Ví dụ tốt

```bash
git commit -m "feat: add login page"
git commit -m "fix: handle invalid password error"
git commit -m "docs: update setup instructions"
git commit -m "refactor: simplify payment service"
```

### ❌ Ví dụ không tốt

```bash
git commit -m "update"
git commit -m "fix"
git commit -m "abc"
git commit -m "done"
```

---

## 10. QUY TẮC PULL REQUEST

### Mẫu PR tốt

```text
Tiêu đề: feat(PAC-35): add medicine checkout payment flow

Mô tả: PR này thực hiện luồng checkout và thanh toán đơn bán thuốc tại quầy cho POS.

Đã làm:
- Tạo giao diện màn hình thanh toán POS (POS Payment Screen)
- Thiết kế API ghi nhận thanh toán và tạo hóa đơn (invoices)
- Tạo logic trừ tồn kho sau khi thanh toán thành công
- Tích hợp kiểm tra tương tác thuốc trước khi checkout

Cách test:
1. Đăng nhập bằng tài khoản nhân viên (Staff) hoặc quản trị (Admin)
2. Vào màn hình POS → Chọn thuốc (VD: MED001) → Click "Thêm vào giỏ hàng"
3. Nhấp "Thanh toán" → Chọn phương thức thanh toán (Tiền mặt/Mã QR)
4. Xác nhận thành công và kiểm tra hóa đơn in ra

Ghi chú:
- Đã chạy qua script kiểm tra tương tác thuốc rule-based của đơn hàng hoạt động tốt.
```

### Quy tắc PR

- PR từ feature vào **develop** (KHÔNG vào main)
- Một PR chỉ tập trung vào một chức năng
- Phải có mô tả rõ ràng đã làm gì
- Nếu có giao diện, nên đính kèm screenshot

---

## 11. QUY TẮC REVIEW CODE

### Người review cần kiểm tra

- [ ] Code có chạy không?
- [ ] Có đúng yêu cầu không?
- [ ] Có ảnh hưởng chức năng khác không?
- [ ] Có lỗi bảo mật không? (hard-code, push .env?)
- [ ] Có conflict không?
- [ ] Có code dư, console.log, comment rác không?
- [ ] Tên biến/hàm có dễ hiểu không?

### ✅ Comment review tốt

```text
Chỗ này nên tách API call ra authService để dễ bảo trì hơn.
Biến này nên đổi tên rõ hơn, ví dụ medicineId thay vì id.
Cần xử lý trường hợp API trả lỗi 401.
```

### ❌ Comment review không tốt

```text
Code gì kỳ vậy?   Sai hết rồi.   Làm lại đi.
```

---

## 12. XỬ LÝ CONFLICT

### Conflict xảy ra khi nào?

Khi nhiều người cùng sửa một file hoặc cùng một đoạn code.

### Dạng conflict trong file

```text
<<<<<<< HEAD
code hiện tại của bạn
=======
code từ nhánh khác
>>>>>>> develop
```

### Cách xử lý

Khi Git báo conflict trong quá trình pull hoặc merge:

1. Mở VSCode lên, tìm các file bị báo đỏ/lỗi (được đánh dấu bằng chữ `C` hoặc có cảnh báo).
2. VSCode sẽ tự động làm nổi bật và bôi màu các đoạn code bị xung đột.
3. Tại mỗi đoạn xung đột, bạn sẽ thấy các lựa chọn nhanh hiển thị ngay phía trên đoạn code:
   - **Accept Current Change**: Giữ lại code hiện tại của bạn ở máy local.
   - **Accept Incoming Change**: Lấy code mới kéo từ GitHub về và ghi đè code của bạn.
   - **Accept Both Changes**: Giữ lại và kết hợp cả hai đoạn code.
   - Hoặc bạn có thể tự tay chỉnh sửa/gộp cả 2 phần trực tiếp.
4. Xóa tất cả các ký tự marker (`<<<<<<<`, `=======`, `>>>>>>>`) nếu chúng chưa tự biến mất.
5. Sau khi sửa xong toàn bộ các file bị conflict, lưu file lại và chạy lệnh:

```bash
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

> ⚠️ **CẢNH BÁO QUAN TRỌNG:** Tuyệt đối **KHÔNG** click chọn bừa "Accept Current" hoặc "Accept Incoming" nếu chưa thực sự hiểu rõ code của hai bên. Nếu không chắc chắn, hãy chủ động liên hệ với thành viên viết đoạn code xung đột đó để cùng tìm giải pháp.

### Cách hạn chế conflict

1. Luôn pull code mới nhất trước khi tạo nhánh
2. Mỗi người làm một chức năng riêng
3. Hạn chế nhiều người sửa cùng một file
4. Nếu cần sửa file chung, **báo nhóm trước**
5. Commit và push thường xuyên
6. Tạo Pull Request sớm

### Các file dễ conflict

```text
routes/api.php    package.json    composer.json
.env.example      App.jsx         main.jsx
database/migrations                layout files
```

---

## 13. CẬP NHẬT NHÁNH FEATURE VỚI DEVELOP MỚI

### Khi nào cần cập nhật?

- Trước khi bắt đầu code trong ngày
- Trước khi tạo Pull Request
- Khi develop có thay đổi quan trọng
- Khi PR báo conflict

### Cách 1: Merge (đơn giản, an toàn — khuyên dùng cho nhóm mới)

```bash
git checkout feature/payment
git fetch origin
git merge origin/develop
```

```text
Kết quả: Giữ nguyên lịch sử, thêm merge commit
Ưu điểm: Dễ hiểu, an toàn
Nhược điểm: Lịch sử có thể nhiều merge commit
```

### Cách 2: Rebase (chuyên nghiệp — cho nhóm đã quen Git)

```bash
git checkout feature/payment
git fetch origin
git rebase origin/develop
```

```text
Kết quả: Lịch sử thẳng, sạch hơn
Ưu điểm: PR dễ nhìn, ít commit merge phụ
Nhược điểm: Viết lại lịch sử, có thể gây rối nếu dùng sai
```

**Quy tắc rebase:**

- ✅ Chỉ rebase trên nhánh feature CÁ NHÂN
- ❌ KHÔNG rebase develop, main, hoặc nhánh người khác đang dùng
- Sau rebase nếu đã push: `git push --force-with-lease origin feature/payment`
- KHÔNG dùng `git push --force` (có thể ghi đè code người khác)

### So sánh Merge vs Rebase

```text
Merge  = gộp develop mới VÀO nhánh của bạn (tạo merge commit)
Rebase = chuyển nhánh của bạn sang BẮT ĐẦU TỪ develop mới nhất
```

```text
Merge:   develop: A---B---C
                       \
         feature:       D---E---M (merge commit)

Rebase:  develop: A---B---C
                           \
         feature:           D'---E' (commits được tạo lại)
```

---

## 14. XỬ LÝ CODE ĐANG LÀM DỞ KHI CẬP NHẬT

### Trường hợp 1: Code đã commit → An toàn

```bash
git fetch origin
git merge origin/develop  # hoặc rebase
```

### Trường hợp 2: Code chưa commit → Cần xử lý

**Cách A: Commit tạm (khuyên dùng)**

```bash
git add .
git commit -m "wip: payment work in progress"
git fetch origin
git merge origin/develop
```

**Cách B: Stash (cất tạm)**

```bash
git stash                    # Cất code đang sửa
git fetch origin
git merge origin/develop
git stash pop                # Lấy lại code
```

| Tình huống                    | Nên dùng             |
| ----------------------------- | -------------------- |
| Làm xong một phần nhỏ         | `commit`             |
| Đang sửa dở, chưa muốn commit | `stash`              |
| Sợ mất code                   | `commit` an toàn hơn |

> ⚠️ Luôn chạy `git status` trước khi merge/rebase!

---

## 15. LÀM VIỆC SONG SONG — XỬ LÝ PHỤ THUỘC

### Chức năng tiếp theo KHÔNG phụ thuộc chức năng trước

Tạo nhánh mới bình thường từ develop:

```bash
git checkout develop && git pull origin develop
git checkout -b feature/contact-page
```

### Chức năng tiếp theo PHỤ THUỘC chức năng trước (chưa merge)

**Cách tốt nhất:** Chờ PR cũ merge rồi tạo nhánh mới.

**Cách tạm thời (nếu bắt buộc):** Tạo nhánh từ nhánh cũ:

```bash
git checkout feature/login
git checkout -b feature/user-profile
```

> ⚠️ Rủi ro: PR user-profile chứa cả code login, review khó hơn, phải merge theo đúng thứ tự.

### KHÔNG NÊN dồn PR cuối ngày

```text
❌ Sáng pull develop → Cả ngày tạo 20 nhánh → Cuối ngày PR hàng loạt
   → develop bị cũ, conflict nhiều, review quá tải

✅ Xong chức năng nào → PR sớm chức năng đó → Review → Merge dần
   → develop được cập nhật từng bước, ít conflict
```

### Nếu đã lỡ có nhiều PR cùng lúc

Merge theo thứ tự ưu tiên:

```text
1. PR nền tảng trước (database, models)
2. PR chức năng phụ thuộc sau (API, services)
3. PR giao diện/tài liệu sau cùng (UI, docs)
```

Sau mỗi lần merge, các PR còn lại cần cập nhật develop mới.

### 15.4. Đồng bộ ngược khi `develop` bị chậm hơn (behind) `main`

> **Tình huống:** Khi `main` nhận được các thay đổi trực tiếp từ việc gộp nhánh `release/*` hoặc sửa lỗi khẩn cấp `hotfix/*` mà nhánh `develop` chưa được cập nhật. GitHub sẽ báo cảnh báo: `This branch is X commits behind main`.
> **Nguyên tắc:** Bất cứ khi nào có thay đổi mới được gộp vào `main`, **phải thực hiện đồng bộ ngược** để đưa những sửa đổi đó trở lại `develop`. Điều này giúp `develop` luôn đồng nhất và không bị đi sau `main`.

Cách thực hiện đồng bộ ngược an toàn:

```bash
git checkout develop
git fetch origin
git merge origin/main
git push origin develop
```

Sau khi chạy các lệnh trên, nhánh `develop` sẽ hoàn toàn bắt kịp `main` và sẵn sàng làm việc tiếp mà không gặp lỗi lệch code lịch sử.

---

## 16. FILE `.gitignore`

### Node.js / React / Vue

```gitignore
node_modules
dist
build
.env
.env.local
.DS_Store
```

### Laravel

```gitignore
/vendor
/node_modules
.env
/storage/logs/*.log
/public/storage
.DS_Store
```

### Python

```gitignore
__pycache__/
*.pyc
.env
.venv/
venv/
```

### Java

```gitignore
/target
*.class
*.jar
.idea
*.iml
```

### TUYỆT ĐỐI không push

```text
.env, mật khẩu database, API key, token
node_modules, vendor
file log, file test cá nhân
```

### Nên có `.env.example`

```env
APP_NAME=MyProject
DB_HOST=127.0.0.1
DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=
```

---

## 17. README CHO DỰ ÁN NHÓM

Nội dung cần có:

1. Tên dự án + mô tả ngắn
2. Thành viên nhóm
3. Công nghệ sử dụng
4. **Cách cài đặt** (step-by-step)
5. **Cách chạy project**
6. Cách tạo database
7. Tài khoản demo (nếu có)
8. Cấu trúc thư mục
9. Quy trình Git của nhóm

---

## 18. LỆNH GIT QUAN TRỌNG — THAM CHIẾU NHANH

| Mục đích             | Lệnh                                                               |
| -------------------- | ------------------------------------------------------------------ |
| Kiểm tra trạng thái  | `git status`                                                       |
| Xem danh sách nhánh  | `git branch`                                                       |
| Chuyển nhánh         | `git checkout develop` hoặc `git switch develop`                   |
| Tạo nhánh mới        | `git checkout -b feature/login` hoặc `git switch -c feature/login` |
| Lấy code mới nhất    | `git pull origin develop`                                          |
| Thêm file vào commit | `git add .`                                                        |
| Commit               | `git commit -m "feat: add login page"`                             |
| Push                 | `git push origin feature/login`                                    |
| Xem lịch sử commit   | `git log --oneline`                                                |
| Merge nhánh          | `git merge feature/login`                                          |
| Xóa nhánh local      | `git branch -d feature/login`                                      |
| Xóa nhánh remote     | `git push origin --delete feature/login`                           |
| Tạo tag              | `git tag v1.0` → `git push origin v1.0`                            |
| Stash code           | `git stash` → `git stash pop`                                      |
| Fetch (không merge)  | `git fetch origin`                                                 |

---

## 19. NGUYÊN TẮC VÀNG KHI PUSH LÊN GITHUB (PUSH GUIDELINES)

Để đảm bảo dự án vận hành trơn tru, chất lượng code luôn cao và tránh làm hỏng repository chung, mọi thành viên trong nhóm **bắt buộc** phải tuân thủ nghiêm ngặt các nguyên tắc vàng sau trước khi chạy lệnh `git push`:

1. **Kiểm tra Biên dịch & Linter**: Luôn chạy lệnh kiểm tra lỗi cú pháp, linter và type check ở máy local (`npx tsc --noEmit` hoặc tương đương) trước khi push. Tuyệt đối không bao giờ đẩy code đang bị lỗi biên dịch lên repo chung.
2. **Tuyệt đối KHÔNG Force Push bừa bãi**: Không bao giờ dùng `git push --force` hoặc `-f` trên các nhánh dùng chung như `develop` và `main`. Điều này sẽ ghi đè lịch sử commit của người khác, làm mất mát code và phá hỏng repository.
3. **Luôn cập nhật code mới nhất trước khi push**: Trước khi đẩy code lên, hãy kéo phiên bản mới nhất từ GitHub về (`git pull origin develop` hoặc `git pull origin <nhánh-đang-làm>`) để phát hiện và tự giải quyết mọi xung đột (conflict) ở máy local của bạn trước.
4. **Không push file nhạy cảm và file rác**: Đảm bảo cấu hình `.gitignore` chính xác. Tuyệt đối không push file `.env`, file cấu hình tài khoản cá nhân, thư mục thư viện `node_modules`, hoặc thư mục build (`dist`, `build`, `out`).
5. **Đúng nhánh, đúng việc**: Chỉ push lên nhánh `feature/*` hoặc `fix/*` do bạn tự tạo để xử lý công việc được giao. Tuyệt đối không push trực tiếp lên `develop` hoặc `main` khi chưa qua quy trình tạo Pull Request (PR) để review và merge.
6. **Luôn tạo nhánh mới từ develop mới nhất**: Đảm bảo nhánh của bạn được tách ra từ phiên bản `develop` mới nhất trên hệ thống (`git checkout develop` -> `git pull origin develop` -> `git checkout -b <tên-nhánh-mới>`). Tuyệt đối không code trực tiếp trên `develop` hoặc `main`.

---

## 20. CHECKLIST

### ✅ Trước khi tạo Pull Request

- [ ] Đang ở đúng nhánh feature
- [ ] Đã pull code mới nhất từ develop
- [ ] Code chạy được trên máy mình
- [ ] Không còn console.log/debug dư
- [ ] Không push .env hoặc file rác
- [ ] Commit message rõ ràng
- [ ] Chức năng làm đúng yêu cầu
- [ ] Không làm hỏng chức năng khác
- [ ] Đã ghi mô tả Pull Request
- [ ] Nếu có giao diện, đã chụp ảnh minh họa
- [ ] PR merge vào **develop**, không merge vào main

### ✅ Trước khi merge Pull Request (cho reviewer)

- [ ] PR có mô tả rõ ràng
- [ ] Code đúng chức năng
- [ ] Không có conflict
- [ ] Không có file nhạy cảm (.env, token)
- [ ] Không có code dư / file rác
- [ ] Project vẫn chạy được
- [ ] Không ảnh hưởng chức năng khác
- [ ] Tên biến/hàm rõ ràng
- [ ] Có xử lý lỗi cơ bản

---

## 21. NHỮNG LỖI THƯỜNG GẶP

| Lỗi                                                     | Cách tránh                                   |
| ------------------------------------------------------- | -------------------------------------------- |
| Code trực tiếp trên `main`                              | Chỉ code trên nhánh `feature`                |
| Quên pull code mới nhất                                 | Luôn `git pull origin develop` trước khi làm |
| Commit quá lớn (login + payment + admin trong 1 commit) | Chia nhỏ: 1 commit = 1 việc cụ thể           |
| Push file `.env`                                        | Thêm `.env` vào `.gitignore`                 |
| Commit message không rõ ("update", "fix", "abc")        | Dùng format `feat:`, `fix:`, `docs:`         |
| Không review code                                       | Bắt buộc PR và review trước khi merge        |
| Sửa code người khác không báo                           | Nhắn nhóm trước khi sửa file chung           |
| PR trống không mô tả                                    | Luôn ghi rõ đã làm gì + cách test            |
| Merge code chưa test                                    | Chạy project trước khi tạo PR                |
| Dồn PR cuối ngày                                        | Xong chức năng nào PR sớm chức năng đó       |
| Bấm Accept Current/Incoming bừa                         | Đọc hiểu code rồi mới chọn                   |

---

## 22. SO SÁNH CÁC MÔ HÌNH GIT

### Git Flow (đầy đủ)

```text
Nhánh: main, develop, feature/*, release/*, hotfix/*
Phù hợp: Dự án lớn, nhiều phiên bản, nhiều người, có release rõ ràng
Nhược điểm: Nhiều nhánh, quy trình hơi nặng
```

### GitHub Flow (đơn giản)

```text
Nhánh: main, feature/*
Phù hợp: Dự án nhỏ, deploy liên tục, nhóm ít người
Nhược điểm: main phải luôn cực kỳ ổn định, cần test tự động tốt
```

### Trunk-Based Development

```text
Nhánh: main + feature rất ngắn
Phù hợp: Công ty lớn, CI/CD mạnh, feature flag
Nhược điểm: Khó cho nhóm chưa quen Git
```

### Khuyến nghị cho nhóm đồ án

Dùng **Git Flow rút gọn**:

```text
main + develop + feature/* + release/* (+ hotfix/* nếu cần)
```

---

## 23. QUY TRÌNH LÀM VIỆC HẰNG NGÀY — TÓM TẮT

### Thành viên bình thường

```bash
# Đầu ngày
git checkout develop
git pull origin develop
git checkout -b feature/ten-chuc-nang

# Trong ngày
git status
git add .
git commit -m "feat: add something"

# Khi xong chức năng
git push origin feature/ten-chuc-nang
# → Tạo PR vào develop → Chờ review → Merge

# Sau khi merge
git checkout develop
git pull origin develop
# → Tạo nhánh mới cho chức năng tiếp theo
```

### Trưởng nhóm

- Quản lý nhánh main và develop
- Review Pull Request → Kiểm tra conflict
- Merge code vào develop
- Tạo release khi gần nộp → Merge vào main → Tạo tag

---

## 24. QUY TRÌNH GIT KHI LÀM VIỆC VỚI AI ASSISTANT

> Mục này quy định cách AI assistant (Antigravity, Cursor, Claude, v.v.) thực hiện các thao tác Git khi được yêu cầu nhằm bảo vệ mã nguồn dự án khỏi việc tự động merge bừa bãi và tuân thủ quy trình kiểm duyệt Pull Request (PR) nghiêm ngặt của nhóm.

### 24.1. Nguyên tắc cốt lõi

1. **MỖI YÊU CẦU = MỘT NHÁNH RIÊNG**
   → Tạo nhánh feature/fix/docs cho từng công việc cụ thể tách biệt.

2. **KHÔNG TỰ Ý COMMIT/PUSH**
   → Chỉ commit và push khi người dùng **YÊU CẦU RÕ RÀNG** "push lên GitHub", "tạo PR", hoặc "đẩy code".
   → Trong quá trình làm việc, chỉ sửa đổi code trên local để giữ lịch sử Git gọn gàng.

3. **KHI ĐƯỢC YÊU CẦU PUSH → CHỈ COMMIT, PUSH VÀ HƯỚNG DẪN TẠO PR**
   → AI chỉ thực hiện commit và push nhánh feature/fix đó lên GitHub.
   → **Tuyệt đối KHÔNG tự ý merge trực tiếp** nhánh feature/fix vào `develop` hay `main` bằng lệnh git ở local để tôn trọng bước kiểm duyệt (review) và bảo vệ quy tắc Branch Protection.

4. **KHI NHẬN YÊU CẦU MỚI → CẬP NHẬT TRƯỚC KHI LÀM**
   → Luôn gộp code mới nhất từ nhánh `develop` trên GitHub về local trước khi bắt đầu công việc tiếp theo.

### 24.2. Quy trình chi tiết

#### Bước 1: Nhận yêu cầu mới từ người dùng

```bash
# Cập nhật code mới nhất từ develop
git checkout develop
git pull origin develop

# Tạo nhánh mới cho yêu cầu
git checkout -b feature/ten-yeu-cau
# hoặc: fix/ten-loi, docs/ten-tai-lieu, ui/ten-giao-dien
```

#### Bước 2: Thực hiện yêu cầu

```text
→ AI tiến hành sửa code, thêm file, xóa file... trên local.
→ KHÔNG tự ý commit, KHÔNG tự ý push.
→ Chờ người dùng kiểm tra hoặc yêu cầu thêm.
→ Nhận và xử lý nhiều yêu cầu chỉnh sửa nhỏ liên tục trên cùng nhánh này.
```

#### Bước 3: Khi người dùng yêu cầu "push lên GitHub" hoặc "đẩy code"

AI thực hiện tự động chuỗi hành động an toàn sau:

```bash
# 3a. Commit toàn bộ thay đổi local
git add .
git commit -m "feat: mô tả ngắn gọn công việc đã làm"

# 3b. Đẩy nhánh feature lên GitHub (Thiết lập upstream lần đầu)
git push -u origin feature/ten-yeu-cau
```

**3c. Hướng dẫn người dùng tạo Pull Request (PR) trên giao diện GitHub Web:**
Sau khi push thành công, AI sẽ in ra thông báo hướng dẫn người dùng:

1. Truy cập vào trang GitHub của dự án.
2. Bấm nút **"Compare & pull request"**.
3. Chọn luồng merge: `feature/ten-yeu-cau` ➡️ `develop` (Tuyệt đối không merge thẳng vào main).
4. Viết mô tả ngắn và gán nhãn reviewer để được đồng đội/leader review và merge trên GitHub.

#### Bước 4: Chuẩn bị cho yêu cầu tiếp theo

```text
→ Sau khi PR được duyệt và merge trên GitHub, quay lại Bước 1 khi nhận yêu cầu mới.
→ Mỗi yêu cầu mới luôn bắt đầu bằng việc checkout develop và pull mới nhất.
```

### 24.3. Sơ đồ vòng lặp

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ① Nhận yêu cầu mới                                       │
│   │                                                         │
│   ② Pull develop mới nhất + Tạo nhánh feature/fix/docs      │
│   │                                                         │
│   ③ Thực hiện code (KHÔNG commit/push)                      │
│   │                                                         │
│   ④ Người dùng kiểm tra / yêu cầu chỉnh sửa               │
│   │  └── Chỉnh sửa thêm trên cùng nhánh (lặp lại ③④)      │
│   │                                                         │
│   ⑤ Người dùng yêu cầu "PUSH LÊN GITHUB"                  │
│   │                                                         │
│   ⑥ AI Commit + Push nhánh feature lên GitHub               │
│   │                                                         │
│   ⑦ AI Hướng dẫn Người dùng tạo Pull Request trên GitHub    │
│   │  └── Leader/Reviewer duyệt và merge PR vào develop      │
│   │                                                         │
│   └── Quay lại ① chờ yêu cầu tiếp theo                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 24.4. Quy tắc commit message cho AI

```bash
# Chức năng mới
git commit -m "feat: add payment checkout page"

# Sửa lỗi
git commit -m "fix: resolve login validation error"

# Chỉnh giao diện
git commit -m "style: update navbar responsive layout"

# Nhiều thay đổi nhỏ trong cùng yêu cầu
git commit -m "feat: implement user profile page

- Add profile form with avatar upload
- Add edit profile API integration
- Add form validation
- Update navbar to show user avatar"
```

### 24.5. Xử lý tình huống đặc biệt

| Tình huống                                          | Xử lý                                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Conflict khi merge vào develop trên GitHub          | AI hướng dẫn xử lý hoặc tự cập nhật develop vào feature để giải quyết conflict ở local (xem 24.7) |
| Người dùng muốn hủy thay đổi                        | `git checkout .` hoặc `git stash`                                                                 |
| Cần squash nhiều commit                             | Thao tác Squash có thể chọn trực tiếp khi click Merge PR trên GitHub Web UI                       |
| Người dùng yêu cầu **"merge lên main"**             | Xem hướng dẫn ở mục 24.6 bên dưới                                                                 |
| **Develop bị thay đổi (lệch code) so với lúc pull** | Xem quy trình giải quyết an toàn ở mục 24.7 bên dưới                                              |

### 24.6. Khi người dùng yêu cầu "MERGE LÊN MAIN"

> Đối với đồ án nhóm, việc gộp lên `main` nên thực hiện thông qua **Pull Request (PR)** từ `develop` ➡️ `main` (hoặc từ `release/*` ➡️ `main`) trên giao diện GitHub Web để đảm bảo an toàn tối đa.
> AI chỉ hỗ trợ đẩy code và hướng dẫn người dùng tạo PR tương ứng.

Trong trường hợp người dùng là leader và có toàn quyền gộp nhánh trực tiếp ở máy local (khi không bật luật bảo vệ nhánh), quy trình local chuẩn là:

```bash
# ① Gộp nhánh feature vào develop thông qua PR và test kỹ càng
# ② Chuyển sang main và kéo code mới nhất
git checkout main
git pull origin main

# ③ Gộp develop vào main ở local (Sử dụng --no-ff để lưu vết rõ ràng)
git merge develop --no-ff -m "merge: tích hợp develop vào main"
git push origin main

# ④ Quay về develop và kéo cập nhật (đảm bảo đồng bộ)
git checkout develop
git pull origin develop
```

### 24.7. Khi develop bị thay đổi (lệch code) so với lúc pull về làm việc

> **Tình huống:** Trong lúc AI đang làm việc trên nhánh `feature/ten-yeu-cau`, nhánh `develop` trên GitHub đã có thay đổi mới do thành viên khác push lên.
> **Nguyên tắc:** **LUÔN LUÔN giải quyết lệch code/conflict trên nhánh feature cá nhân**, KHÔNG giải quyết trực tiếp trên nhánh `develop` chung.

Khi người dùng ra lệnh push, AI sẽ thực hiện chuỗi thao tác tự động giải quyết conflict ở local sau:

```bash
# ① Commit tạm thời code đang làm dở trên nhánh feature
git add .
git commit -m "feat: save progress before update"

# ② Kéo dữ liệu develop mới nhất từ GitHub về local (chưa gộp)
git fetch origin

# ③ Gộp develop mới nhất vào nhánh feature để tự giải quyết conflict trên local
git merge origin/develop

# ④ NẾU CÓ CONFLICT:
#   - AI sẽ tự động phân tích và giải quyết các file bị conflict trên local.
#   - Đảm bảo giữ lại các thay đổi của cả hai bên một cách hợp lý.
#   - Sau khi sửa hết xung đột:
#     git add .
#     git commit -m "fix: resolve conflict with develop"

# ⑤ Kiểm tra/Chạy thử project để chắc chắn không bị lỗi biên dịch

# ⑥ Push nhánh feature đã được cập nhật hoàn chỉnh lên GitHub
git push origin feature/ten-yeu-cau

# ⑦ Hướng dẫn người dùng tạo Pull Request (feature ➡️ develop) trên GitHub.
#   Lúc này việc duyệt và gộp PR trên GitHub sẽ cực kỳ mượt mà không lo bị conflict!
```

---

## 25. CÂU CẦN NHỚ

> **PR càng nhỏ và càng sớm thì càng dễ review, ít conflict, và project ổn định hơn.**

```text
✦ Không làm trực tiếp trên main.
✦ Không merge code chưa review.
✦ Không push file nhạy cảm.
✦ Luôn pull code mới nhất trước khi làm.
✦ Mỗi chức năng nên có nhánh riêng.
✦ Làm xong chức năng thì tạo PR sớm.
✦ AI chỉ commit/push nhánh feature và hướng dẫn tạo PR, không tự ý merge bừa bãi.
```

> Làm việc nhóm với Git không chỉ là biết lệnh Git, mà là biết tổ chức quy trình để code của mọi người không đè lên nhau và project luôn có một bản ổn định.
