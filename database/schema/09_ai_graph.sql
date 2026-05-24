-- 09_ai_graph.sql
-- PharmaAssist Mức C - 100-table commercial pharmacy schema
-- Run this file in order: 09
-- Note: Dữ liệu thuốc/tương tác/AI trong dự án chỉ là dữ liệu mẫu cho đồ án.

set search_path to public;
create extension if not exists pgcrypto;


create table if not exists notifications (
  id bigserial primary key,
  type text not null,
  title text not null,
  message text not null,
  reference_type text,
  reference_id bigint,
  created_at timestamptz not null default now()
);

create table if not exists notification_recipients (
  id bigserial primary key,
  notification_id bigint not null references notifications(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  is_read boolean not null default false,
  read_at timestamptz,
  unique(notification_id, user_id)
);

create table if not exists audit_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id bigint,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ai_audit_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete set null,
  order_id bigint references orders(id) on delete set null,
  alert_id bigint references interaction_alerts(id) on delete set null,
  provider text not null,
  prompt_type text not null,
  request_summary text,
  response_summary text,
  guardrail_status text not null,
  created_at timestamptz not null default now()
);

create table if not exists ai_guardrail_events (
  id bigserial primary key,
  ai_audit_log_id bigint references ai_audit_logs(id) on delete cascade,
  event_type text not null,
  reason text,
  original_text text,
  safe_response text,
  created_at timestamptz not null default now()
);

create table if not exists graph_nodes (
  id bigserial primary key,
  node_key text unique not null,
  label text not null,
  type text not null,
  description text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists graph_edges (
  id bigserial primary key,
  from_node_id bigint not null references graph_nodes(id) on delete cascade,
  to_node_id bigint not null references graph_nodes(id) on delete cascade,
  relation text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists graph_context_logs (
  id bigserial primary key,
  order_id bigint references orders(id) on delete set null,
  alert_id bigint references interaction_alerts(id) on delete set null,
  context_text text,
  used_by_ai_log_id bigint references ai_audit_logs(id) on delete set null,
  created_at timestamptz not null default now()
);
