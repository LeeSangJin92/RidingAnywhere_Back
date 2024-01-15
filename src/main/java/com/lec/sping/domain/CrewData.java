package com.lec.sping.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crew_id;               // 고유 Id
    private String crew_name;           // 크루 이름
    private String crew_area;           // 크루 활동 지역
    private String crew_context;        // 크루 설명란
    private String crew_profile;        // 크루 프로필
    private String crew_igurl;          // 크루 인스타 url
    private String crew_openkakaourl;   // 크루 오픈 카카오 url

    //-----------------------------------------------------
    // 참조키 영역

    @JoinColumn
    @OneToMany
    private List<User> user;
}