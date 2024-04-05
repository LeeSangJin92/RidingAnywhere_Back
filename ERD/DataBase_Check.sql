# 🔎전체 테이블 보기
show tables;

# 🔎라이더 리스트 보기
select * from user;

UPDATE user set crew_id = null
WHERE user_id=1;

# 🔎권한 리스트 보기
select * from authority;

# 🔎크루 리스트 보기
drop table crew;
select * from crew;
delete from crew;

select * from crew_manager;
delete from crew_manager;

drop table crew_attendance;
drop table crew_schedule;
drop table crew_join_board;

drop table crew_join;
select * from crew_join;

select * from crew_manager;
drop table crew_manager;