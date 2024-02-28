show databases;
use ra_db;
drop database ra_db;
create database ra_db;
show tables ;

# 권한 테이블 데이터 추가
insert into authority(authority_name)
values ("ROLE_RA_Member"),("ROLE_CREW_Master"),("ROLE_CREW_Named"),("ROLE_CREW_Member"),("ROLE_RA_ADMIN");
select * from authority;

# 바이크 브랜드 테이블 데이터 추가
insert into bike_brand(bikebrand_name)
values ("혼다"),("가와사키"),("스즈키"),("야마하"),("할리데이비슨");
select * from bike_brand;

# 바이크 모델 테이블 데이터 추가
insert into bike_model(brand_id,model_name,model_cc)
values (1,"슈퍼커브",110),(1,"헌터커브",125),(1,"레블500",500),
       (2,"닌자300",300),(2,"닌자400",400),(2,"발칸",500),
       (3,"스즈키2",300),(3,"스즈키4",600),(3,"스즈키8",900),
       (4,"R3",300),(4,"R6",600),(4,"R9",900),
       (5,"로드글라이드",800),(5,"스트라이드글라이드",1200),(5,"브레이크아웃",1500);
select * from bike_model;

delete from bike_model;

# 유저 테이블 데이터 추가
insert into user(user_nickname,user_name,user_birthday,user_gender,
                 user_phone,user_email,user_state,user_password,user_context,user_regdate,authority_id)
values ("관리1","이름1","20231231",true,"010-1111-1234","test1@naver.com","라이딩중","1234","자기소개1","2024-02-14T09:30:00",5),
       ("별명2","이름2","20231231",false,"010-1111-1234","test2@naver.com","치료중","1234","자기소개2","2024-02-14T09:30:00",1),
       ("별명3","이름3","20231231",true,"010-1111-1234","test3@naver.com","시즌종료","1234","자기소개3","2024-02-14T09:30:00",1),
       ("별명4","이름4","20231231",false,"010-1111-1234","test4@naver.com","치료중","1234","자기소개4","2024-02-14T09:30:00",1),
       ("별명5","이름5","20231231",false,"010-1111-1234","test5@naver.com","라이딩중","1234","자기소개5","2024-02-14T09:30:00",1),
       ("별명6","이름6","20231231",false,"010-1111-1234","test6@naver.com","시즌종료","1234","자기소개6","2024-02-14T09:30:00",1),
       ("별명7","이름7","20231231",true,"010-1111-1234","test7@naver.com","시즌종료","1234","자기소개7","2024-02-14T09:30:00",1),
       ("별명8","이름8","20231231",true,"010-1111-1234","test8@naver.com","라이딩중","1234","자기소개8","2024-02-14T09:30:00",1),
       ("별명9","이름9","20231231",true,"010-1111-1234","test9@naver.com","라이딩중","1234","자기소개9","2024-02-14T09:30:00",1);

select * from user;

delete from user;



