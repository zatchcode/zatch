create extension if not exists "pgcrypto";

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  phone text not null unique,
  interest text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table waitlist_signups is 'Landing page waitlist opt-ins';
comment on column waitlist_signups.interest is 'Either shopping or selling';