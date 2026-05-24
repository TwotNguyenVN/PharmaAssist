-- 02_customer.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 02
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists customers (
  id bigserial primary key,
  code text unique not null,
  user_id uuid references users(id) on delete set null,
  full_name text not null,
  phone text,
  email text,
  gender text,
  date_of_birth date,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customer_addresses (
  id bigserial primary key,
  customer_id bigint not null references customers(id) on delete cascade,
  receiver_name text not null,
  receiver_phone text not null,
  province text,
  district text,
  ward text,
  address_line text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists customer_notes (
  id bigserial primary key,
  customer_id bigint not null references customers(id) on delete cascade,
  created_by uuid references users(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists customer_groups (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text,
  discount_rate numeric(5,2) not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists customer_group_members (
  id bigserial primary key,
  customer_id bigint not null references customers(id) on delete cascade,
  group_id bigint not null references customer_groups(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique(customer_id, group_id)
);

create table if not exists loyalty_accounts (
  id bigserial primary key,
  customer_id bigint not null unique references customers(id) on delete cascade,
  point_balance integer not null default 0,
  total_earned integer not null default 0,
  total_redeemed integer not null default 0,
  tier text not null default 'STANDARD',
  updated_at timestamptz not null default now()
);

create table if not exists loyalty_transactions (
  id bigserial primary key,
  loyalty_account_id bigint not null references loyalty_accounts(id) on delete cascade,
  order_id bigint,
  type text not null,
  points integer not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists customer_wishlists (
  id bigserial primary key,
  customer_id bigint not null references customers(id) on delete cascade,
  product_id bigint,
  created_at timestamptz not null default now(),
  unique(customer_id, product_id)
);

create table if not exists customer_recent_views (
  id bigserial primary key,
  customer_id bigint not null references customers(id) on delete cascade,
  product_id bigint,
  viewed_at timestamptz not null default now()
);

create index if not exists idx_customers_phone on customers(phone);
