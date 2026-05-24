-- 07_order_payment.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 07
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists carts (
  id bigserial primary key,
  customer_id bigint references customers(id) on delete cascade,
  session_id text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cart_items (
  id bigserial primary key,
  cart_id bigint not null references carts(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  quantity integer not null,
  unit_price numeric(12,2) not null,
  created_at timestamptz not null default now(),
  unique(cart_id, product_variant_id)
);

create table if not exists orders (
  id bigserial primary key,
  code text unique not null,
  customer_id bigint references customers(id) on delete set null,
  staff_user_id uuid references users(id) on delete set null,
  store_id bigint references stores(id),
  order_type text not null default 'POS',
  status text not null default 'DRAFT',
  subtotal numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  shipping_fee numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_details (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  quantity integer not null,
  unit_price numeric(12,2) not null,
  discount_amount numeric(12,2) not null default 0,
  line_total numeric(12,2) not null
);

create table if not exists order_status_histories (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references users(id) on delete set null,
  note text,
  changed_at timestamptz not null default now()
);

create table if not exists pos_sessions (
  id bigserial primary key,
  code text unique not null,
  store_id bigint references stores(id),
  staff_user_id uuid references users(id) on delete set null,
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  opening_cash numeric(12,2) not null default 0,
  closing_cash numeric(12,2),
  status text not null default 'OPEN'
);

create table if not exists payment_methods (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  is_active boolean not null default true
);

create table if not exists payments (
  id bigserial primary key,
  code text unique not null,
  order_id bigint not null references orders(id) on delete cascade,
  payment_method_id bigint references payment_methods(id),
  amount numeric(12,2) not null,
  status text not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists payment_transactions (
  id bigserial primary key,
  payment_id bigint not null references payments(id) on delete cascade,
  transaction_code text unique,
  provider text,
  amount numeric(12,2) not null,
  status text not null default 'PENDING',
  raw_response jsonb,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id bigserial primary key,
  code text unique not null,
  order_id bigint not null references orders(id) on delete cascade,
  customer_id bigint references customers(id) on delete set null,
  total_amount numeric(12,2) not null default 0,
  tax_amount numeric(12,2) not null default 0,
  status text not null default 'ISSUED',
  issued_at timestamptz not null default now()
);

create table if not exists invoice_items (
  id bigserial primary key,
  invoice_id bigint not null references invoices(id) on delete cascade,
  product_variant_id bigint not null references product_variants(id),
  quantity integer not null,
  unit_price numeric(12,2) not null,
  line_total numeric(12,2) not null
);

create table if not exists refunds (
  id bigserial primary key,
  code text unique not null,
  order_id bigint references orders(id),
  payment_id bigint references payments(id),
  refund_amount numeric(12,2) not null,
  reason text,
  status text not null default 'REQUESTED',
  created_at timestamptz not null default now()
);

create table if not exists refund_details (
  id bigserial primary key,
  refund_id bigint not null references refunds(id) on delete cascade,
  order_detail_id bigint references order_details(id),
  quantity integer not null,
  amount numeric(12,2) not null
);

create table if not exists pos_session_transactions (
  id bigserial primary key,
  pos_session_id bigint not null references pos_sessions(id) on delete cascade,
  order_id bigint references orders(id),
  payment_id bigint references payments(id),
  amount numeric(12,2) not null,
  transaction_type text not null,
  created_at timestamptz not null default now()
);

create table if not exists interaction_alerts (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  interaction_id bigint not null references drug_interactions(id),
  severity text not null,
  alert_message text not null,
  is_acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists consultation_notes (
  id bigserial primary key,
  order_id bigint references orders(id) on delete cascade,
  customer_id bigint references customers(id) on delete set null,
  staff_user_id uuid references users(id) on delete set null,
  note text not null,
  source text not null default 'MANUAL',
  created_at timestamptz not null default now()
);
