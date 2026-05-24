-- 01_auth_rbac.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 01
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  supabase_auth_id uuid unique,
  email text unique not null,
  username text unique,
  full_name text not null,
  phone text,
  avatar_url text,
  status text not null default 'ACTIVE',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_profiles (
  id bigserial primary key,
  user_id uuid not null unique references users(id) on delete cascade,
  date_of_birth date,
  gender text,
  address text,
  identity_number text,
  employee_code text unique,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id bigserial primary key,
  code text unique not null,
  name text unique not null,
  description text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists permissions (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  module text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  id bigserial primary key,
  user_id uuid not null references users(id) on delete cascade,
  role_id bigint not null references roles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references users(id),
  unique(user_id, role_id)
);

create table if not exists role_permissions (
  id bigserial primary key,
  role_id bigint not null references roles(id) on delete cascade,
  permission_id bigint not null references permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(role_id, permission_id)
);

create table if not exists login_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete set null,
  email text,
  ip_address inet,
  user_agent text,
  status text not null,
  message text,
  logged_at timestamptz not null default now()
);

create index if not exists idx_users_email on users(email);
create index if not exists idx_user_roles_user_id on user_roles(user_id);
