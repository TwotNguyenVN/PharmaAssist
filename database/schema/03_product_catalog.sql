-- 03_product_catalog.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 03
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists countries (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  iso_code text,
  status text not null default 'ACTIVE'
);

create table if not exists product_categories (
  id bigserial primary key,
  parent_id bigint references product_categories(id) on delete set null,
  code text unique not null,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists category_closures (
  ancestor_id bigint not null references product_categories(id) on delete cascade,
  descendant_id bigint not null references product_categories(id) on delete cascade,
  depth integer not null default 0,
  primary key (ancestor_id, descendant_id)
);

create table if not exists brands (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  slug text unique not null,
  logo_url text,
  description text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists manufacturers (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  country_id bigint references countries(id),
  address text,
  phone text,
  email text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists medicine_units (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  description text
);

create table if not exists products (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  slug text unique not null,
  category_id bigint references product_categories(id),
  brand_id bigint references brands(id),
  manufacturer_id bigint references manufacturers(id),
  product_type text not null,
  short_description text,
  description text,
  status text not null default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_variants (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  sku text unique not null,
  barcode text unique,
  variant_name text,
  unit_id bigint references medicine_units(id),
  selling_price numeric(12,2) not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists product_attributes (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  data_type text not null default 'TEXT',
  is_filterable boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_attribute_values (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  attribute_id bigint not null references product_attributes(id) on delete cascade,
  value_text text,
  value_number numeric(12,2),
  value_boolean boolean,
  value_date date,
  unique(product_id, attribute_id)
);

create table if not exists product_tags (
  id bigserial primary key,
  name text unique not null,
  slug text unique not null,
  description text
);

create table if not exists product_tag_relations (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  tag_id bigint not null references product_tags(id) on delete cascade,
  unique(product_id, tag_id)
);

create table if not exists product_documents (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  file_url text not null,
  file_type text,
  title text,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_name on products using gin (to_tsvector('simple', name));
