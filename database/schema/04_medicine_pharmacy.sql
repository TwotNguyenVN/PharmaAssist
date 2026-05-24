-- 04_medicine_pharmacy.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 04
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists dosage_forms (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text
);

create table if not exists active_ingredients (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text,
  status text not null default 'ACTIVE'
);

create table if not exists medicines (
  id bigserial primary key,
  product_id bigint not null unique references products(id) on delete cascade,
  medicine_code text unique not null,
  registration_number text,
  dosage_form_id bigint references dosage_forms(id),
  medicine_unit_id bigint references medicine_units(id),
  requires_prescription boolean not null default false,
  usage_note text,
  storage_instruction text,
  status text not null default 'ACTIVE'
);

create table if not exists medicine_ingredients (
  id bigserial primary key,
  medicine_id bigint not null references medicines(id) on delete cascade,
  active_ingredient_id bigint not null references active_ingredients(id) on delete cascade,
  strength text,
  note text,
  unique(medicine_id, active_ingredient_id)
);

create table if not exists medicine_groups (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text,
  status text not null default 'ACTIVE'
);

create table if not exists medicine_group_members (
  id bigserial primary key,
  medicine_id bigint not null references medicines(id) on delete cascade,
  medicine_group_id bigint not null references medicine_groups(id) on delete cascade,
  unique(medicine_id, medicine_group_id)
);

create table if not exists drug_interactions (
  id bigserial primary key,
  code text unique not null,
  medicine_a_id bigint not null references medicines(id),
  medicine_b_id bigint not null references medicines(id),
  severity text not null,
  description text not null,
  recommendation text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(medicine_a_id, medicine_b_id)
);

create table if not exists prescription_uploads (
  id bigserial primary key,
  customer_id bigint references customers(id) on delete set null,
  order_id bigint,
  file_url text not null,
  file_type text not null,
  status text not null default 'PENDING',
  uploaded_at timestamptz not null default now()
);

create table if not exists pharmacist_reviews (
  id bigserial primary key,
  prescription_upload_id bigint references prescription_uploads(id) on delete set null,
  order_id bigint,
  reviewer_user_id uuid references users(id) on delete set null,
  status text not null,
  note text,
  reviewed_at timestamptz
);

create index if not exists idx_medicines_product_id on medicines(product_id);
