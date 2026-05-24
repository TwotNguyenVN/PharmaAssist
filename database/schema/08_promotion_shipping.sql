-- 08_promotion_shipping.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 08
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists delivery_partners (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  phone text,
  api_endpoint text,
  status text not null default 'ACTIVE'
);

create table if not exists shipping_methods (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  base_fee numeric(12,2) not null default 0,
  is_active boolean not null default true
);

create table if not exists shipments (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  shipping_method_id bigint references shipping_methods(id),
  delivery_partner_id bigint references delivery_partners(id),
  receiver_name text not null,
  receiver_phone text not null,
  shipping_address text not null,
  shipping_fee numeric(12,2) not null default 0,
  status text not null default 'PENDING',
  created_at timestamptz not null default now()
);

create table if not exists shipment_items (
  id bigserial primary key,
  shipment_id bigint not null references shipments(id) on delete cascade,
  order_detail_id bigint references order_details(id),
  quantity integer not null
);

create table if not exists delivery_status_histories (
  id bigserial primary key,
  shipment_id bigint not null references shipments(id) on delete cascade,
  old_status text,
  new_status text not null,
  note text,
  changed_at timestamptz not null default now()
);

create table if not exists price_lists (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  applies_to text not null default 'ONLINE',
  start_date date,
  end_date date,
  status text not null default 'ACTIVE'
);

create table if not exists product_prices (
  id bigserial primary key,
  price_list_id bigint not null references price_lists(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  price numeric(12,2) not null,
  effective_from date,
  effective_to date,
  unique(price_list_id, product_variant_id)
);

create table if not exists price_histories (
  id bigserial primary key,
  product_variant_id bigint not null references product_variants(id),
  old_price numeric(12,2),
  new_price numeric(12,2) not null,
  changed_by uuid references users(id) on delete set null,
  changed_at timestamptz not null default now(),
  reason text
);

create table if not exists promotions (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text,
  discount_type text not null,
  discount_value numeric(12,2) not null,
  start_date timestamptz,
  end_date timestamptz,
  status text not null default 'ACTIVE'
);

create table if not exists promotion_items (
  id bigserial primary key,
  promotion_id bigint not null references promotions(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  discount_value numeric(12,2),
  unique(promotion_id, product_variant_id)
);

create table if not exists coupons (
  id bigserial primary key,
  code text unique not null,
  description text,
  discount_type text not null,
  discount_value numeric(12,2) not null,
  usage_limit integer,
  used_count integer not null default 0,
  start_date timestamptz,
  end_date timestamptz,
  status text not null default 'ACTIVE'
);

create table if not exists coupon_usages (
  id bigserial primary key,
  coupon_id bigint not null references coupons(id) on delete cascade,
  customer_id bigint references customers(id) on delete set null,
  order_id bigint references orders(id) on delete set null,
  discount_amount numeric(12,2) not null default 0,
  used_at timestamptz not null default now()
);
