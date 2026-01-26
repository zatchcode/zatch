create extension if not exists "uuid-ossp";

create table if not exists startzatching_participants (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  phone text not null unique,
  screenshot_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  initial_discount smallint not null,
  current_discount smallint not null,
  initial_orders smallint not null,
  current_orders smallint not null,
  coupon_code text not null unique,
  referral_code text not null unique,
  referrer_id uuid references startzatching_participants(id) on delete set null,
  total_referrals integer not null default 0,
  social_share_count integer not null default 0,
  boost_history jsonb not null default '[]'::jsonb,
  last_updated timestamptz not null default timezone('utc'::text, now())
);

create index if not exists startzatching_participants_referral_code_idx
  on startzatching_participants (referral_code);

create table if not exists startzatching_referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid not null references startzatching_participants(id) on delete cascade,
  referred_id uuid not null references startzatching_participants(id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique(referred_id)
);

create table if not exists startzatching_social_shares (
  id uuid primary key default uuid_generate_v4(),
  participant_id uuid not null references startzatching_participants(id) on delete cascade,
  platform text not null,
  discount_boost smallint not null,
  orders_increment boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique(participant_id, platform)
);

insert into storage.buckets (id, name, public)
values ('startzatching-screenshots', 'startzatching-screenshots', false)
on conflict (id) do nothing;