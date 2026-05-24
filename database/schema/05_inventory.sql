-- 05_inventory.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 05
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists stores (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  phone text,
  address text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists warehouses (
  id bigserial primary key,
  store_id bigint references stores(id) on delete set null,
  code text unique not null,
  name text not null,
  address text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists store_staff (
  id bigserial primary key,
  store_id bigint not null references stores(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  position text,
  is_active boolean not null default true,
  assigned_at timestamptz not null default now(),
  unique(store_id, user_id)
);

create table if not exists inventories (
  id bigserial primary key,
  warehouse_id bigint references warehouses(id) on delete set null,
  store_id bigint references stores(id) on delete set null,
  product_variant_id bigint not null references product_variants(id) on delete cascade,
  quantity integer not null default 0,
  reserved_quantity integer not null default 0,
  min_quantity integer not null default 10,
  updated_at timestamptz not null default now(),
  unique(warehouse_id, product_variant_id)
);

create table if not exists stock_batches (
  id bigserial primary key,
  product_variant_id bigint not null references product_variants(id) on delete cascade,
  warehouse_id bigint references warehouses(id) on delete set null,
  batch_number text not null,
  quantity integer not null default 0,
  manufacturing_date date,
  expiry_date date,
  import_price numeric(12,2),
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  unique(product_variant_id, warehouse_id, batch_number)
);

create table if not exists stock_movements (
  id bigserial primary key,
  warehouse_id bigint references warehouses(id) on delete set null,
  product_variant_id bigint not null references product_variants(id),
  batch_id bigint references stock_batches(id) on delete set null,
  movement_type text not null,
  quantity_change integer not null,
  reference_type text,
  reference_id bigint,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists stock_adjustments (
  id bigserial primary key,
  code text unique not null,
  warehouse_id bigint references warehouses(id) on delete set null,
  created_by uuid references users(id) on delete set null,
  reason text,
  status text not null default 'DRAFT',
  created_at timestamptz not null default now()
);

create table if not exists stock_adjustment_details (
  id bigserial primary key,
  adjustment_id bigint not null references stock_adjustments(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  batch_id bigint references stock_batches(id),
  old_quantity integer not null,
  new_quantity integer not null,
  difference integer not null
);

create table if not exists stock_transfers (
  id bigserial primary key,
  code text unique not null,
  from_warehouse_id bigint references warehouses(id),
  to_warehouse_id bigint references warehouses(id),
  created_by uuid references users(id) on delete set null,
  status text not null default 'DRAFT',
  created_at timestamptz not null default now()
);

create table if not exists stock_transfer_details (
  id bigserial primary key,
  transfer_id bigint not null references stock_transfers(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  batch_id bigint references stock_batches(id),
  quantity integer not null
);

create table if not exists inventory_alerts (
  id bigserial primary key,
  warehouse_id bigint references warehouses(id) on delete set null,
  product_variant_id bigint not null references product_variants(id),
  batch_id bigint references stock_batches(id) on delete set null,
  alert_type text not null,
  message text not null,
  status text not null default 'OPEN',
  created_at timestamptz not null default now()
);
