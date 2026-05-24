-- 99_seed_demo_data.sql
-- PharmaAssist Mức C - Full demo seed data
-- Run order: 99, after 01 -> 10.
-- Note: Run on a fresh development database. If you rerun, unique rows are protected where possible,
-- but some transaction/demo tables may duplicate.

set search_path to public;

-- ============================================================
-- 1. AUTH / RBAC
-- ============================================================

insert into users (id, supabase_auth_id, email, username, full_name, phone, status) values
('00000000-0000-0000-0000-000000000001', null, 'admin@pharmaassist.local', 'admin01', 'Nguyễn Admin', '0900000001', 'ACTIVE'),
('00000000-0000-0000-0000-000000000002', null, 'staff@pharmaassist.local', 'staff01', 'Trần Nhân Viên', '0900000002', 'ACTIVE'),
('00000000-0000-0000-0000-000000000003', null, 'warehouse@pharmaassist.local', 'warehouse01', 'Lê Thủ Kho', '0900000003', 'ACTIVE'),
('00000000-0000-0000-0000-000000000004', null, 'customer@pharmaassist.local', 'customer01', 'Nguyễn Khách Hàng', '0900000004', 'ACTIVE')
on conflict (id) do nothing;

insert into user_profiles (user_id, gender, address, employee_code, bio) values
('00000000-0000-0000-0000-000000000001', 'MALE', 'TP.HCM', 'EMP001', 'Tài khoản Admin demo'),
('00000000-0000-0000-0000-000000000002', 'FEMALE', 'TP.HCM', 'EMP002', 'Tài khoản nhân viên bán hàng demo'),
('00000000-0000-0000-0000-000000000003', 'MALE', 'TP.HCM', 'EMP003', 'Tài khoản nhân viên kho demo')
on conflict (user_id) do nothing;

insert into roles (code, name, description) values
('ROLE_ADMIN', 'ADMIN', 'Chủ nhà thuốc / quản trị hệ thống'),
('ROLE_STAFF', 'STAFF', 'Nhân viên nhà thuốc'),
('ROLE_WAREHOUSE', 'WAREHOUSE', 'Nhân viên kho'),
('ROLE_CUSTOMER', 'CUSTOMER', 'Khách hàng online')
on conflict (code) do nothing;

insert into permissions (code, name, module, description) values
('medicine.view', 'Xem thuốc', 'medicine', 'Xem danh sách và chi tiết thuốc'),
('medicine.create', 'Thêm thuốc', 'medicine', 'Tạo thuốc mới'),
('inventory.view', 'Xem tồn kho', 'inventory', 'Xem dữ liệu tồn kho'),
('inventory.import', 'Nhập kho', 'inventory', 'Tạo phiếu nhập kho'),
('order.create', 'Tạo đơn hàng', 'order', 'Tạo đơn bán thuốc'),
('order.pay', 'Thanh toán đơn hàng', 'order', 'Thanh toán đơn hàng'),
('report.view', 'Xem báo cáo', 'report', 'Xem dashboard/báo cáo')
on conflict (code) do nothing;

insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000001', id from roles where code='ROLE_ADMIN'
on conflict do nothing;
insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000002', id from roles where code='ROLE_STAFF'
on conflict do nothing;
insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000003', id from roles where code='ROLE_WAREHOUSE'
on conflict do nothing;
insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000004', id from roles where code='ROLE_CUSTOMER'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r cross join permissions p
where r.code='ROLE_ADMIN'
on conflict do nothing;

insert into login_logs (user_id, email, status, message)
values ('00000000-0000-0000-0000-000000000001', 'admin@pharmaassist.local', 'SUCCESS', 'Demo login success');

-- ============================================================
-- 2. CUSTOMER / LOYALTY
-- ============================================================

insert into customers (code, user_id, full_name, phone, email, gender, status) values
('CUS001', '00000000-0000-0000-0000-000000000004', 'Nguyễn Văn An', '0911000001', 'an@example.com', 'MALE', 'ACTIVE'),
('CUS002', null, 'Trần Thị Bình', '0911000002', 'binh@example.com', 'FEMALE', 'ACTIVE'),
('CUS003', null, 'Khách lẻ', '0000000000', null, null, 'ACTIVE')
on conflict (code) do nothing;

insert into customer_addresses (customer_id, receiver_name, receiver_phone, province, district, ward, address_line, is_default)
select id, 'Nguyễn Văn An', '0911000001', 'TP.HCM', 'Quận 1', 'Phường Bến Nghé', '123 Đường Demo', true
from customers where code='CUS001';

insert into customer_notes (customer_id, created_by, note)
select id, '00000000-0000-0000-0000-000000000002', 'Khách hàng demo có lịch sử mua thuốc mẫu.'
from customers where code='CUS001';

insert into customer_groups (code, name, description, discount_rate) values
('GROUP_STANDARD', 'Khách thường', 'Nhóm khách hàng mặc định', 0),
('GROUP_VIP', 'Khách VIP', 'Nhóm khách hàng thân thiết', 5)
on conflict (code) do nothing;

insert into customer_group_members (customer_id, group_id)
select c.id, g.id from customers c, customer_groups g where c.code='CUS001' and g.code='GROUP_VIP'
on conflict do nothing;

insert into loyalty_accounts (customer_id, point_balance, total_earned, total_redeemed, tier)
select id, 120, 150, 30, 'SILVER' from customers where code='CUS001'
on conflict (customer_id) do nothing;

insert into loyalty_transactions (loyalty_account_id, type, points, description)
select id, 'EARN', 50, 'Cộng điểm demo từ đơn hàng mẫu' from loyalty_accounts limit 1;

-- ============================================================
-- 3. PRODUCT CATALOG / MEDICINE
-- ============================================================

insert into countries (code, name, iso_code) values
('VN', 'Việt Nam', 'VN'),
('US', 'Hoa Kỳ', 'US'),
('JP', 'Nhật Bản', 'JP')
on conflict (code) do nothing;

insert into product_categories (code, name, slug, description, sort_order) values
('CAT_MEDICINE', 'Thuốc', 'thuoc', 'Danh mục thuốc mẫu', 1),
('CAT_SUPPLEMENT', 'Vitamin và khoáng chất', 'vitamin-khoang-chat', 'Danh mục thực phẩm bổ sung mẫu', 2),
('CAT_DEVICE', 'Thiết bị y tế', 'thiet-bi-y-te', 'Danh mục thiết bị y tế mẫu', 3)
on conflict (code) do nothing;

insert into category_closures (ancestor_id, descendant_id, depth)
select id, id, 0 from product_categories
on conflict do nothing;

insert into brands (code, name, slug, description) values
('BR001', 'Thương hiệu Mẫu 1', 'thuong-hieu-mau-1', 'Thương hiệu mẫu cho đồ án'),
('BR002', 'Thương hiệu Mẫu 2', 'thuong-hieu-mau-2', 'Thương hiệu mẫu cho đồ án')
on conflict (code) do nothing;

insert into manufacturers (code, name, country_id, address, phone, email) values
('MFR001', 'Nhà sản xuất Mẫu 1', (select id from countries where code='VN'), 'TP.HCM', '0902000001', 'mfr001@example.com'),
('MFR002', 'Nhà sản xuất Mẫu 2', (select id from countries where code='JP'), 'Tokyo', '0902000002', 'mfr002@example.com')
on conflict (code) do nothing;

insert into medicine_units (code, name, description) values
('BOX', 'Hộp', 'Đơn vị hộp'),
('BLISTER', 'Vỉ', 'Đơn vị vỉ'),
('BOTTLE', 'Chai', 'Đơn vị chai'),
('TUBE', 'Tuýp', 'Đơn vị tuýp')
on conflict (code) do nothing;

insert into products (code, name, slug, category_id, brand_id, manufacturer_id, product_type, short_description, description, status) values
('MED001', 'Thuốc mẫu A', 'thuoc-mau-a', (select id from product_categories where code='CAT_MEDICINE'), (select id from brands where code='BR001'), (select id from manufacturers where code='MFR001'), 'MEDICINE', 'Thuốc mẫu A', 'Dữ liệu mẫu, tương tác HIGH với MED002.', 'ACTIVE'),
('MED002', 'Thuốc mẫu B', 'thuoc-mau-b', (select id from product_categories where code='CAT_MEDICINE'), (select id from brands where code='BR002'), (select id from manufacturers where code='MFR001'), 'MEDICINE', 'Thuốc mẫu B', 'Dữ liệu mẫu, tương tác HIGH với MED001.', 'ACTIVE'),
('MED003', 'Thuốc mẫu C - tồn thấp', 'thuoc-mau-c-ton-thap', (select id from product_categories where code='CAT_SUPPLEMENT'), (select id from brands where code='BR001'), (select id from manufacturers where code='MFR002'), 'MEDICINE', 'Thuốc tồn thấp', 'Dữ liệu mẫu tồn kho thấp.', 'ACTIVE'),
('MED004', 'Thuốc mẫu D - gần hết hạn', 'thuoc-mau-d-gan-het-han', (select id from product_categories where code='CAT_MEDICINE'), (select id from brands where code='BR002'), (select id from manufacturers where code='MFR002'), 'MEDICINE', 'Thuốc gần hết hạn', 'Dữ liệu mẫu gần hết hạn.', 'ACTIVE')
on conflict (code) do nothing;

insert into product_variants (product_id, sku, barcode, variant_name, unit_id, selling_price) values
((select id from products where code='MED001'), 'SKU-MED001-BOX', '893000000001', 'Hộp 1', (select id from medicine_units where code='BOX'), 50000),
((select id from products where code='MED002'), 'SKU-MED002-BOX', '893000000002', 'Hộp 1', (select id from medicine_units where code='BOX'), 70000),
((select id from products where code='MED003'), 'SKU-MED003-BLISTER', '893000000003', 'Vỉ 1', (select id from medicine_units where code='BLISTER'), 30000),
((select id from products where code='MED004'), 'SKU-MED004-BOX', '893000000004', 'Hộp 1', (select id from medicine_units where code='BOX'), 45000)
on conflict (sku) do nothing;

insert into product_images (product_id, image_url, alt_text, is_primary)
select id, 'https://example.com/demo/' || lower(code) || '.png', name, true from products
where code in ('MED001','MED002','MED003','MED004');

insert into product_attributes (code, name, data_type, is_filterable) values
('ORIGIN', 'Xuất xứ', 'TEXT', true),
('PACKAGING', 'Quy cách', 'TEXT', true)
on conflict (code) do nothing;

insert into product_attribute_values (product_id, attribute_id, value_text)
select p.id, a.id, 'Dữ liệu mẫu' from products p, product_attributes a
where p.code='MED001' and a.code='ORIGIN'
on conflict do nothing;

insert into product_tags (name, slug, description) values
('Bán chạy', 'ban-chay', 'Tag sản phẩm bán chạy'),
('Demo', 'demo', 'Tag dữ liệu demo')
on conflict (name) do nothing;

insert into product_tag_relations (product_id, tag_id)
select p.id, t.id from products p, product_tags t where p.code='MED001' and t.name='Demo'
on conflict do nothing;

insert into product_documents (product_id, file_url, file_type, title)
select id, 'https://example.com/demo/product-guide.pdf', 'PDF', 'Tài liệu mẫu' from products where code='MED001';

insert into dosage_forms (code, name, description) values
('TABLET', 'Viên nén', 'Dạng viên nén mẫu'),
('SYRUP', 'Siro', 'Dạng siro mẫu')
on conflict (code) do nothing;

insert into active_ingredients (code, name, description) values
('ING001', 'Hoạt chất mẫu 1', 'Dữ liệu hoạt chất mẫu'),
('ING002', 'Hoạt chất mẫu 2', 'Dữ liệu hoạt chất mẫu'),
('ING003', 'Hoạt chất mẫu 3', 'Dữ liệu hoạt chất mẫu')
on conflict (code) do nothing;

insert into medicines (product_id, medicine_code, registration_number, dosage_form_id, medicine_unit_id, requires_prescription, usage_note, storage_instruction) values
((select id from products where code='MED001'), 'MED001', 'REG-DEMO-001', (select id from dosage_forms where code='TABLET'), (select id from medicine_units where code='BOX'), false, 'Ghi chú sử dụng mẫu.', 'Bảo quản mẫu.'),
((select id from products where code='MED002'), 'MED002', 'REG-DEMO-002', (select id from dosage_forms where code='TABLET'), (select id from medicine_units where code='BOX'), false, 'Ghi chú sử dụng mẫu.', 'Bảo quản mẫu.'),
((select id from products where code='MED003'), 'MED003', 'REG-DEMO-003', (select id from dosage_forms where code='TABLET'), (select id from medicine_units where code='BLISTER'), false, 'Ghi chú sử dụng mẫu.', 'Bảo quản mẫu.'),
((select id from products where code='MED004'), 'MED004', 'REG-DEMO-004', (select id from dosage_forms where code='SYRUP'), (select id from medicine_units where code='BOX'), true, 'Ghi chú sử dụng mẫu.', 'Bảo quản mẫu.')
on conflict (medicine_code) do nothing;

insert into medicine_ingredients (medicine_id, active_ingredient_id, strength, note)
select m.id, ai.id, 'Hàm lượng mẫu', 'Dữ liệu mẫu'
from medicines m, active_ingredients ai
where m.medicine_code='MED001' and ai.code='ING001'
on conflict do nothing;

insert into medicine_groups (code, name, description) values
('MG001', 'Nhóm thuốc mẫu giảm đau', 'Nhóm thuốc mẫu cho đồ án'),
('MG002', 'Nhóm thuốc mẫu kháng viêm', 'Nhóm thuốc mẫu cho đồ án')
on conflict (code) do nothing;

insert into medicine_group_members (medicine_id, medicine_group_id)
select m.id, g.id from medicines m, medicine_groups g where m.medicine_code='MED001' and g.code='MG001'
on conflict do nothing;

insert into drug_interactions (code, medicine_a_id, medicine_b_id, severity, description, recommendation) values
('INT001', (select id from medicines where medicine_code='MED001'), (select id from medicines where medicine_code='MED002'), 'HIGH', 'Mô tả tương tác mẫu MED001 + MED002. Không phải dữ liệu y khoa thật.', 'Khuyến nghị mẫu: hiển thị cảnh báo và ghi chú tư vấn.'),
('INT002', (select id from medicines where medicine_code='MED001'), (select id from medicines where medicine_code='MED003'), 'MEDIUM', 'Mô tả tương tác mẫu MED001 + MED003.', 'Khuyến nghị mẫu: kiểm tra trước khi bán.')
on conflict (code) do nothing;

-- ============================================================
-- 4. STORE / INVENTORY / SUPPLIER
-- ============================================================

insert into stores (code, name, phone, address) values
('STORE001', 'Nhà thuốc Demo Quận 1', '0280000001', 'Quận 1, TP.HCM')
on conflict (code) do nothing;

insert into warehouses (store_id, code, name, address) values
((select id from stores where code='STORE001'), 'WH001', 'Kho Demo Quận 1', 'Quận 1, TP.HCM')
on conflict (code) do nothing;

insert into store_staff (store_id, user_id, position)
values ((select id from stores where code='STORE001'), '00000000-0000-0000-0000-000000000002', 'Nhân viên nhà thuốc')
on conflict do nothing;

insert into inventories (warehouse_id, store_id, product_variant_id, quantity, reserved_quantity, min_quantity) values
((select id from warehouses where code='WH001'), (select id from stores where code='STORE001'), (select id from product_variants where sku='SKU-MED001-BOX'), 50, 0, 10),
((select id from warehouses where code='WH001'), (select id from stores where code='STORE001'), (select id from product_variants where sku='SKU-MED002-BOX'), 40, 0, 10),
((select id from warehouses where code='WH001'), (select id from stores where code='STORE001'), (select id from product_variants where sku='SKU-MED003-BLISTER'), 3, 0, 10),
((select id from warehouses where code='WH001'), (select id from stores where code='STORE001'), (select id from product_variants where sku='SKU-MED004-BOX'), 20, 0, 10)
on conflict do nothing;

insert into stock_batches (product_variant_id, warehouse_id, batch_number, quantity, manufacturing_date, expiry_date, import_price) values
((select id from product_variants where sku='SKU-MED001-BOX'), (select id from warehouses where code='WH001'), 'BATCH-MED001-001', 50, '2026-01-01', '2027-12-31', 30000),
((select id from product_variants where sku='SKU-MED002-BOX'), (select id from warehouses where code='WH001'), 'BATCH-MED002-001', 40, '2026-01-01', '2027-12-31', 45000),
((select id from product_variants where sku='SKU-MED003-BLISTER'), (select id from warehouses where code='WH001'), 'BATCH-MED003-001', 3, '2026-01-01', '2027-12-31', 18000),
((select id from product_variants where sku='SKU-MED004-BOX'), (select id from warehouses where code='WH001'), 'BATCH-MED004-001', 20, '2025-12-01', '2026-06-15', 25000)
on conflict do nothing;

insert into stock_movements (warehouse_id, product_variant_id, batch_id, movement_type, quantity_change, reference_type, note)
select wh.id, pv.id, sb.id, 'IMPORT', sb.quantity, 'SEED', 'Khởi tạo tồn kho demo'
from stock_batches sb
join warehouses wh on wh.id=sb.warehouse_id
join product_variants pv on pv.id=sb.product_variant_id;

insert into stock_adjustments (code, warehouse_id, created_by, reason, status) values
('ADJ001', (select id from warehouses where code='WH001'), '00000000-0000-0000-0000-000000000003', 'Điều chỉnh demo', 'DRAFT')
on conflict (code) do nothing;

insert into stock_adjustment_details (adjustment_id, product_variant_id, batch_id, old_quantity, new_quantity, difference)
select (select id from stock_adjustments where code='ADJ001'), pv.id, sb.id, 50, 50, 0
from product_variants pv join stock_batches sb on sb.product_variant_id=pv.id
where pv.sku='SKU-MED001-BOX'
limit 1;

insert into stock_transfers (code, from_warehouse_id, to_warehouse_id, created_by, status) values
('TRF001', (select id from warehouses where code='WH001'), (select id from warehouses where code='WH001'), '00000000-0000-0000-0000-000000000003', 'DRAFT')
on conflict (code) do nothing;

insert into stock_transfer_details (transfer_id, product_variant_id, batch_id, quantity)
select (select id from stock_transfers where code='TRF001'), pv.id, sb.id, 1
from product_variants pv join stock_batches sb on sb.product_variant_id=pv.id
where pv.sku='SKU-MED001-BOX'
limit 1;

insert into inventory_alerts (warehouse_id, product_variant_id, batch_id, alert_type, message)
select (select id from warehouses where code='WH001'), pv.id, sb.id, 'LOW_STOCK', 'MED003 đang dưới ngưỡng tồn tối thiểu.'
from product_variants pv join stock_batches sb on sb.product_variant_id=pv.id
where pv.sku='SKU-MED003-BLISTER'
limit 1;

insert into suppliers (code, name, phone, email, address, tax_code) values
('SUP001', 'Công ty Dược phẩm Mẫu 1', '0901000001', 'sup001@example.com', 'TP.HCM', 'TAX001')
on conflict (code) do nothing;

insert into supplier_contacts (supplier_id, full_name, phone, email, position)
select id, 'Người liên hệ mẫu', '0901999999', 'contact@example.com', 'Sales' from suppliers where code='SUP001';

insert into purchase_orders (code, supplier_id, warehouse_id, created_by, status, total_amount) values
('PO001', (select id from suppliers where code='SUP001'), (select id from warehouses where code='WH001'), '00000000-0000-0000-0000-000000000003', 'RECEIVED', 3000000)
on conflict (code) do nothing;

insert into purchase_order_details (purchase_order_id, product_variant_id, quantity, expected_price, line_total)
values ((select id from purchase_orders where code='PO001'), (select id from product_variants where sku='SKU-MED001-BOX'), 50, 30000, 1500000);

insert into stock_imports (code, purchase_order_id, supplier_id, warehouse_id, imported_by, total_amount, note) values
('SI001', (select id from purchase_orders where code='PO001'), (select id from suppliers where code='SUP001'), (select id from warehouses where code='WH001'), '00000000-0000-0000-0000-000000000003', 3000000, 'Nhập thuốc demo')
on conflict (code) do nothing;

insert into stock_import_details (stock_import_id, product_variant_id, batch_number, quantity, import_price, expiry_date, line_total)
values ((select id from stock_imports where code='SI001'), (select id from product_variants where sku='SKU-MED001-BOX'), 'BATCH-MED001-001', 50, 30000, '2027-12-31', 1500000);

insert into supplier_payments (supplier_id, purchase_order_id, amount, method, status, paid_at)
values ((select id from suppliers where code='SUP001'), (select id from purchase_orders where code='PO001'), 3000000, 'BANK_TRANSFER', 'PAID', now());

-- ============================================================
-- 5. ORDER / PAYMENT / SHIPPING / PROMOTION
-- ============================================================

insert into payment_methods (code, name) values
('CASH', 'Tiền mặt'),
('BANK_TRANSFER', 'Chuyển khoản'),
('CARD', 'Thẻ')
on conflict (code) do nothing;

insert into carts (customer_id, status)
select id, 'ACTIVE' from customers where code='CUS001';

insert into cart_items (cart_id, product_variant_id, quantity, unit_price)
select c.id, (select id from product_variants where sku='SKU-MED001-BOX'), 1, 50000
from carts c order by c.id desc limit 1
on conflict do nothing;

insert into orders (code, customer_id, staff_user_id, store_id, order_type, status, subtotal, discount_amount, shipping_fee, total_amount, note) values
('ORD001', (select id from customers where code='CUS001'), '00000000-0000-0000-0000-000000000002', (select id from stores where code='STORE001'), 'POS', 'PAID', 120000, 0, 0, 120000, 'Đơn demo có tương tác HIGH'),
('ORD002', (select id from customers where code='CUS002'), '00000000-0000-0000-0000-000000000002', (select id from stores where code='STORE001'), 'ONLINE', 'PENDING', 30000, 0, 15000, 45000, 'Đơn online demo')
on conflict (code) do nothing;

insert into order_details (order_id, product_variant_id, quantity, unit_price, discount_amount, line_total) values
((select id from orders where code='ORD001'), (select id from product_variants where sku='SKU-MED001-BOX'), 1, 50000, 0, 50000),
((select id from orders where code='ORD001'), (select id from product_variants where sku='SKU-MED002-BOX'), 1, 70000, 0, 70000),
((select id from orders where code='ORD002'), (select id from product_variants where sku='SKU-MED003-BLISTER'), 1, 30000, 0, 30000);

insert into order_status_histories (order_id, old_status, new_status, changed_by, note)
values ((select id from orders where code='ORD001'), 'DRAFT', 'PAID', '00000000-0000-0000-0000-000000000002', 'Thanh toán đơn demo');

insert into pos_sessions (code, store_id, staff_user_id, opening_cash, status) values
('POS001', (select id from stores where code='STORE001'), '00000000-0000-0000-0000-000000000002', 1000000, 'OPEN')
on conflict (code) do nothing;

insert into payments (code, order_id, payment_method_id, amount, status, paid_at) values
('PAY001', (select id from orders where code='ORD001'), (select id from payment_methods where code='CASH'), 120000, 'PAID', now())
on conflict (code) do nothing;

insert into payment_transactions (payment_id, transaction_code, provider, amount, status, raw_response)
values ((select id from payments where code='PAY001'), 'TXN001', 'DEMO', 120000, 'SUCCESS', '{"demo":true}');

insert into invoices (code, order_id, customer_id, total_amount, tax_amount, status)
values ('INV001', (select id from orders where code='ORD001'), (select id from customers where code='CUS001'), 120000, 0, 'ISSUED')
on conflict (code) do nothing;

insert into invoice_items (invoice_id, product_variant_id, quantity, unit_price, line_total)
values ((select id from invoices where code='INV001'), (select id from product_variants where sku='SKU-MED001-BOX'), 1, 50000, 50000);

insert into refunds (code, order_id, payment_id, refund_amount, reason, status) values
('REF001', (select id from orders where code='ORD001'), (select id from payments where code='PAY001'), 0, 'Demo no refund', 'REQUESTED')
on conflict (code) do nothing;

insert into refund_details (refund_id, order_detail_id, quantity, amount)
select (select id from refunds where code='REF001'), od.id, 0, 0
from order_details od join orders o on o.id=od.order_id where o.code='ORD001' limit 1;

insert into pos_session_transactions (pos_session_id, order_id, payment_id, amount, transaction_type)
values ((select id from pos_sessions where code='POS001'), (select id from orders where code='ORD001'), (select id from payments where code='PAY001'), 120000, 'SALE');

insert into delivery_partners (code, name, phone, status) values
('DP001', 'Đối tác giao hàng Demo', '19000001', 'ACTIVE')
on conflict (code) do nothing;

insert into shipping_methods (code, name, base_fee, is_active) values
('STANDARD', 'Giao hàng tiêu chuẩn', 15000, true)
on conflict (code) do nothing;

insert into shipments (order_id, shipping_method_id, delivery_partner_id, receiver_name, receiver_phone, shipping_address, shipping_fee, status)
values ((select id from orders where code='ORD002'), (select id from shipping_methods where code='STANDARD'), (select id from delivery_partners where code='DP001'), 'Trần Thị Bình', '0911000002', 'Quận 3, TP.HCM', 15000, 'PENDING');

insert into shipment_items (shipment_id, order_detail_id, quantity)
select s.id, od.id, 1 from shipments s, order_details od, orders o
where s.order_id=o.id and od.order_id=o.id and o.code='ORD002'
limit 1;

insert into delivery_status_histories (shipment_id, old_status, new_status, note)
select id, null, 'PENDING', 'Tạo vận đơn demo' from shipments order by id desc limit 1;

insert into price_lists (code, name, applies_to, status) values
('PL_ONLINE', 'Bảng giá online', 'ONLINE', 'ACTIVE'),
('PL_POS', 'Bảng giá tại quầy', 'POS', 'ACTIVE')
on conflict (code) do nothing;

insert into product_prices (price_list_id, product_variant_id, price)
values ((select id from price_lists where code='PL_ONLINE'), (select id from product_variants where sku='SKU-MED001-BOX'), 50000)
on conflict do nothing;

insert into price_histories (product_variant_id, old_price, new_price, changed_by, reason)
values ((select id from product_variants where sku='SKU-MED001-BOX'), 48000, 50000, '00000000-0000-0000-0000-000000000001', 'Cập nhật giá demo');

insert into promotions (code, name, description, discount_type, discount_value, status) values
('PROMO001', 'Khuyến mãi demo', 'Giảm giá mẫu cho đồ án', 'PERCENT', 10, 'ACTIVE')
on conflict (code) do nothing;

insert into promotion_items (promotion_id, product_variant_id, discount_value)
values ((select id from promotions where code='PROMO001'), (select id from product_variants where sku='SKU-MED001-BOX'), 10)
on conflict do nothing;

insert into coupons (code, description, discount_type, discount_value, usage_limit, status) values
('DEMO10', 'Mã giảm giá demo', 'PERCENT', 10, 100, 'ACTIVE')
on conflict (code) do nothing;

insert into coupon_usages (coupon_id, customer_id, order_id, discount_amount)
values ((select id from coupons where code='DEMO10'), (select id from customers where code='CUS001'), (select id from orders where code='ORD001'), 0);

-- ============================================================
-- 6. INTERACTION ALERT / AI / GRAPH / CONTENT
-- ============================================================

insert into interaction_alerts (order_id, interaction_id, severity, alert_message, is_acknowledged)
values ((select id from orders where code='ORD001'), (select id from drug_interactions where code='INT001'), 'HIGH', 'Đơn hàng có cặp thuốc mẫu MED001 và MED002 có nguy cơ tương tác mức cao.', true);

insert into consultation_notes (order_id, customer_id, staff_user_id, note, source)
values ((select id from orders where code='ORD001'), (select id from customers where code='CUS001'), '00000000-0000-0000-0000-000000000002', 'Đã hiển thị cảnh báo tương tác thuốc mẫu và ghi chú tư vấn.', 'MANUAL');

insert into prescription_uploads (customer_id, order_id, file_url, file_type, status)
values ((select id from customers where code='CUS001'), (select id from orders where code='ORD001'), 'https://example.com/demo/prescription.png', 'IMAGE', 'REVIEWED');

insert into pharmacist_reviews (prescription_upload_id, order_id, reviewer_user_id, status, note, reviewed_at)
values ((select id from prescription_uploads order by id desc limit 1), (select id from orders where code='ORD001'), '00000000-0000-0000-0000-000000000002', 'APPROVED', 'Review mẫu cho đồ án.', now());

insert into notifications (type, title, message, reference_type, reference_id) values
('LOW_STOCK', 'Thuốc sắp hết', 'MED003 đang dưới ngưỡng tồn tối thiểu.', 'inventory', (select id from product_variants where sku='SKU-MED003-BLISTER')),
('NEAR_EXPIRY', 'Thuốc gần hết hạn', 'MED004 gần hết hạn, cần kiểm tra.', 'stock_batch', (select id from stock_batches where batch_number='BATCH-MED004-001')),
('SYSTEM', 'Thông báo hệ thống', 'Dữ liệu demo đã được khởi tạo.', 'system', null);

insert into notification_recipients (notification_id, user_id)
select n.id, '00000000-0000-0000-0000-000000000003' from notifications n where n.type in ('LOW_STOCK','NEAR_EXPIRY')
on conflict do nothing;

insert into ai_audit_logs (user_id, order_id, alert_id, provider, prompt_type, request_summary, response_summary, guardrail_status)
values ('00000000-0000-0000-0000-000000000002', (select id from orders where code='ORD001'), (select id from interaction_alerts order by id desc limit 1), 'mock', 'explain_alert', 'Yêu cầu giải thích cảnh báo tương tác thuốc mẫu.', 'AI trả về giải thích tham khảo có disclaimer.', 'passed');

insert into ai_guardrail_events (ai_audit_log_id, event_type, reason, original_text, safe_response)
values ((select id from ai_audit_logs order by id desc limit 1), 'INPUT_BLOCKED', 'Yêu cầu kê đơn bị chặn', 'Hãy kê đơn cho tôi', 'Tôi không thể chẩn đoán hoặc kê đơn. Vui lòng hỏi dược sĩ, bác sĩ hoặc chuyên gia y tế.');

insert into audit_logs (user_id, action, entity_type, entity_id, old_value, new_value)
values ('00000000-0000-0000-0000-000000000001', 'CREATE', 'seed_data', 1, null, '{"status":"created"}');

insert into graph_nodes (node_key, label, type, description, metadata) values
('NODE_MED001', 'Thuốc mẫu A', 'Medicine', 'Node thuốc mẫu A', '{"medicine_code":"MED001"}'),
('NODE_MED002', 'Thuốc mẫu B', 'Medicine', 'Node thuốc mẫu B', '{"medicine_code":"MED002"}'),
('NODE_ING001', 'Hoạt chất mẫu 1', 'ActiveIngredient', 'Hoạt chất mẫu cho đồ án', '{}'),
('NODE_INT001', 'Tương tác mẫu MED001-MED002', 'Interaction', 'Tương tác mẫu mức HIGH', '{"severity":"HIGH"}'),
('NODE_REC001', 'Khuyến nghị mẫu cho cảnh báo HIGH', 'Recommendation', 'Khuyến nghị mẫu chỉ mang tính tham khảo', '{}')
on conflict (node_key) do nothing;

insert into graph_edges (from_node_id, to_node_id, relation, metadata) values
((select id from graph_nodes where node_key='NODE_MED001'), (select id from graph_nodes where node_key='NODE_ING001'), 'HAS_INGREDIENT', '{}'),
((select id from graph_nodes where node_key='NODE_MED001'), (select id from graph_nodes where node_key='NODE_INT001'), 'INTERACTS_WITH', '{}'),
((select id from graph_nodes where node_key='NODE_MED002'), (select id from graph_nodes where node_key='NODE_INT001'), 'INTERACTS_WITH', '{}'),
((select id from graph_nodes where node_key='NODE_INT001'), (select id from graph_nodes where node_key='NODE_REC001'), 'HAS_RECOMMENDATION', '{}');

insert into graph_context_logs (order_id, alert_id, context_text, used_by_ai_log_id)
values ((select id from orders where code='ORD001'), (select id from interaction_alerts order by id desc limit 1), 'Context mẫu từ graph cho MED001 và MED002.', (select id from ai_audit_logs order by id desc limit 1));

insert into product_reviews (product_id, customer_id, order_id, rating, content, status)
values ((select id from products where code='MED001'), (select id from customers where code='CUS001'), (select id from orders where code='ORD001'), 5, 'Đánh giá sản phẩm mẫu.', 'APPROVED');

insert into review_images (review_id, image_url)
values ((select id from product_reviews order by id desc limit 1), 'https://example.com/demo/review.png');

insert into product_questions (product_id, customer_id, question, status)
values ((select id from products where code='MED001'), (select id from customers where code='CUS001'), 'Câu hỏi mẫu về sản phẩm?', 'ANSWERED');

insert into product_answers (question_id, answered_by, answer)
values ((select id from product_questions order by id desc limit 1), '00000000-0000-0000-0000-000000000002', 'Câu trả lời mẫu từ nhân viên.');

insert into article_categories (name, slug, description) values
('Góc sức khỏe', 'goc-suc-khoe', 'Danh mục bài viết sức khỏe mẫu')
on conflict (slug) do nothing;

insert into articles (category_id, title, slug, summary, content, thumbnail_url, author_id, status, published_at)
values ((select id from article_categories where slug='goc-suc-khoe'), 'Bài viết sức khỏe mẫu', 'bai-viet-suc-khoe-mau', 'Tóm tắt bài viết mẫu.', 'Nội dung bài viết mẫu cho đồ án.', 'https://example.com/demo/article.png', '00000000-0000-0000-0000-000000000001', 'PUBLISHED', now())
on conflict (slug) do nothing;

insert into banners (title, image_url, link_url, position, status)
values ('Banner demo PharmaAssist', 'https://example.com/demo/banner.png', '/products', 'HOME_TOP', 'ACTIVE');

-- ============================================================
-- 7. VALIDATION
-- ============================================================

select 'users' table_name, count(*) total from users
union all select 'products', count(*) from products
union all select 'product_variants', count(*) from product_variants
union all select 'medicines', count(*) from medicines
union all select 'inventories', count(*) from inventories
union all select 'orders', count(*) from orders
union all select 'drug_interactions', count(*) from drug_interactions
union all select 'interaction_alerts', count(*) from interaction_alerts
union all select 'ai_audit_logs', count(*) from ai_audit_logs
union all select 'graph_nodes', count(*) from graph_nodes;
