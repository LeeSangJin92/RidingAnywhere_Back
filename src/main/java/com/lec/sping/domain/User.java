package com.lec.sping.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;           // 기본 Id
    private String user_pw;         // 비밀번호
    private String user_name;       // 이름
    private Long user_age;          // 나이
    private boolean user_sex;       // 성별
    private String user_phone;      // 전화번호
    private String user_email;      // 이메일
    private Long user_check;        // 출석 횟수
    private Long user_state;        // 개인 상태
    private String user_context;    // 자기소개
    private String user_profile;    // 프로필 이미지
}
