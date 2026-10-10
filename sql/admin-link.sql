delete from public.admin_users where username = 'batu';

insert into public.admin_users (user_id, username)
select id, 'batu'
from auth.users
where lower(email) = lower('batu@aogiri.local')
on conflict (user_id) do update
set username = excluded.username;

select username, user_id
from public.admin_users
where username = 'batu';
