# PharmaAssist Database SQL Files

Bộ file SQL cho phiên bản PharmaAssist Mức C gồm 100 bảng.

## Cách chạy trên Supabase

Chạy lần lượt trong Supabase SQL Editor:

1. `01_auth_rbac.sql`
2. `02_customer.sql`
3. `03_product_catalog.sql`
4. `04_medicine_pharmacy.sql`
5. `05_inventory.sql`
6. `06_supplier_purchase.sql`
7. `07_order_payment.sql`
8. `08_promotion_shipping.sql`
9. `09_ai_graph.sql`
10. `10_content_review.sql`
11. `99_seed_demo_data.sql`

## Lưu ý

- Nên chạy trên database development/demo.
- Nếu dùng Supabase Auth thật, các user demo trong `public.users` vẫn cần được tạo tương ứng trong Supabase Auth nếu bạn muốn đăng nhập thật.
- Dữ liệu thuốc, hoạt chất, tương tác thuốc, AI response và Knowledge Graph chỉ là dữ liệu mẫu cho đồ án, không thay thế tư vấn của dược sĩ, bác sĩ hoặc chuyên gia y tế.
