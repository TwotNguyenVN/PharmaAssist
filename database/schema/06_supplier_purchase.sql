-- 06_supplier_purchase.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 06
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists suppliers (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  phone text,
  email text,
  address text,
  tax_code text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists supplier_contacts (
  id bigserial primary key,
  supplier_id bigint not null references suppliers(id) on delete cascade,
  full_name text not null,
  phone text,
  email text,
  position text,
  created_at timestamptz not null default now()
);

create table if not exists purchase_orders (
  id bigserial primary key,
  code text unique not null,
  supplier_id bigint references suppliers(id),
  warehouse_id bigint references warehouses(id),
  created_by uuid references users(id) on delete set null,
  status text not null default 'DRAFT',
  total_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists purchase_order_details (
  id bigserial primary key,
  purchase_order_id bigint not null references purchase_orders(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  quantity integer not null,
  expected_price numeric(12,2) not null default 0,
  line_total numeric(12,2) not null default 0
);

create table if not exists stock_imports (
  id bigserial primary key,
  code text unique not null,
  purchase_order_id bigint references purchase_orders(id) on delete set null,
  supplier_id bigint references suppliers(id),
  warehouse_id bigint references warehouses(id),
  imported_by uuid references users(id) on delete set null,
  import_date timestamptz not null default now(),
  total_amount numeric(12,2) not null default 0,
  status text not null default 'COMPLETED',
  note text,
  created_at timestamptz not null default now()
);

create table if not exists stock_import_details (
  id bigserial primary key,
  stock_import_id bigint not null references stock_imports(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  batch_number text,
  quantity integer not null,
  import_price numeric(12,2) not null,
  expiry_date date,
  line_total numeric(12,2) not null
);

create table if not exists supplier_payments (
  id bigserial primary key,
  supplier_id bigint references suppliers(id),
  purchase_order_id bigint references purchase_orders(id),
  amount numeric(12,2) not null,
  method text,
  status text not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
