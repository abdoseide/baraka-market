-- Run this once in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image_url text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  unit text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0),
  image_url text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "public can read active categories" on public.categories;
drop policy if exists "public can read active products" on public.products;
drop policy if exists "public can read products" on public.products;
drop policy if exists "authenticated can manage categories" on public.categories;
drop policy if exists "authenticated can manage products" on public.products;
create policy "public can read active categories" on public.categories for select using (is_active = true);
-- Inactive products remain visible so the storefront can show an unavailable card.
create policy "public can read products" on public.products for select using (true);

-- The current dashboard uses its existing admin password. Replace these policies
-- with Supabase Auth based policies before exposing write access publicly.
create policy "authenticated can manage categories" on public.categories for all to authenticated using (true) with check (true);
create policy "authenticated can manage products" on public.products for all to authenticated using (true) with check (true);

-- Enable live catalog updates for storefront visitors (safe to run repeatedly).
do $$
begin
  if not exists (
    select 1
    from pg_publication p
    join pg_publication_rel pr on pr.prpubid = p.oid
    join pg_class c on c.oid = pr.prrelid
    where p.pubname = 'supabase_realtime' and c.relname = 'categories'
  ) then
    alter publication supabase_realtime add table public.categories;
  end if;
  if not exists (
    select 1
    from pg_publication p
    join pg_publication_rel pr on pr.prpubid = p.oid
    join pg_class c on c.oid = pr.prrelid
    where p.pubname = 'supabase_realtime' and c.relname = 'products'
  ) then
    alter publication supabase_realtime add table public.products;
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public can view product images" on storage.objects;
drop policy if exists "authenticated can upload product images" on storage.objects;
create policy "public can view product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "authenticated can upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images');

-- Visitor counter used by the storefront and admin dashboard.
create table if not exists public.visitor_stats (
  id integer primary key check (id = 1),
  total bigint not null default 0,
  daily bigint not null default 0,
  monthly bigint not null default 0,
  day_key date not null default current_date,
  month_key text not null default to_char(current_date, 'YYYY-MM'),
  updated_at timestamptz not null default now()
);

create table if not exists public.visitor_presence (
  visitor_id text primary key,
  last_active timestamptz not null default now()
);

alter table public.visitor_stats enable row level security;
alter table public.visitor_presence enable row level security;

drop policy if exists "public can read visitor stats" on public.visitor_stats;
create policy "public can read visitor stats" on public.visitor_stats for select using (true);
drop policy if exists "public can read visitor presence" on public.visitor_presence;
create policy "public can read visitor presence" on public.visitor_presence for select using (true);
drop policy if exists "public can update visitor presence" on public.visitor_presence;
create policy "public can update visitor presence" on public.visitor_presence for insert with check (true);
drop policy if exists "public can refresh visitor presence" on public.visitor_presence;
create policy "public can refresh visitor presence" on public.visitor_presence for update using (true) with check (true);

insert into public.visitor_stats (id) values (1) on conflict (id) do nothing;

create or replace function public.track_visitor(p_count boolean default true)
returns public.visitor_stats
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.visitor_stats;
begin
  insert into public.visitor_stats (id) values (1) on conflict (id) do nothing;
  update public.visitor_stats
  set
    total = case when p_count then total + 1 else total end,
    daily = case when day_key = current_date then
      case when p_count then daily + 1 else daily end
      else case when p_count then 1 else 0 end end,
    monthly = case when month_key = to_char(current_date, 'YYYY-MM') then
      case when p_count then monthly + 1 else monthly end
      else case when p_count then 1 else 0 end end,
    day_key = current_date,
    month_key = to_char(current_date, 'YYYY-MM'),
    updated_at = now()
  where id = 1
  returning * into result;
  return result;
end;
$$;

grant execute on function public.track_visitor(boolean) to anon, authenticated;
