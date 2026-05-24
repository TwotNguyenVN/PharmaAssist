-- 10_content_review.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 10
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists product_reviews (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  customer_id bigint references customers(id) on delete set null,
  order_id bigint references orders(id) on delete set null,
  rating integer not null,
  content text,
  status text not null default 'PENDING',
  created_at timestamptz not null default now()
);

create table if not exists review_images (
  id bigserial primary key,
  review_id bigint not null references product_reviews(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists product_questions (
  id bigserial primary key,
  product_id bigint not null references products(id) on delete cascade,
  customer_id bigint references customers(id) on delete set null,
  question text not null,
  status text not null default 'PENDING',
  created_at timestamptz not null default now()
);

create table if not exists product_answers (
  id bigserial primary key,
  question_id bigint not null references product_questions(id) on delete cascade,
  answered_by uuid references users(id) on delete set null,
  answer text not null,
  created_at timestamptz not null default now()
);

create table if not exists article_categories (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  description text,
  parent_id bigint references article_categories(id) on delete set null,
  status text not null default 'ACTIVE'
);

create table if not exists articles (
  id bigserial primary key,
  category_id bigint references article_categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  summary text,
  content text,
  thumbnail_url text,
  author_id uuid references users(id) on delete set null,
  status text not null default 'DRAFT',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists banners (
  id bigserial primary key,
  title text not null,
  image_url text not null,
  link_url text,
  position text,
  start_date timestamptz,
  end_date timestamptz,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);
