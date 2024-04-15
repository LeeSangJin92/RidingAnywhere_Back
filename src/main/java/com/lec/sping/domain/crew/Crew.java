package com.lec.sping.domain.crew;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.sping.domain.Address;
import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@AllArgsConstructor
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crew_id;                // 크루 ID
    private String crew_name;            // 크루 이름
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime crew_regdate;  // 크루 생성 날짜
    private String crew_context;         // 크루 설명
    private String crew_profile;         // 크루 프로필 사진 경로
    private Long crew_count;             // 크루 인원

    // FK 영역
    @OneToOne(optional = false)
    @ToString.Exclude
    @JoinColumn(name = "crewMaster")
    private User user;                  // 크루 마스터(크루장)

    @OneToMany
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "manager")
    private List<CrewManager> crewmanager;      // 크루 인원 관리

    @OneToOne
    @JoinColumn(name = "crew_location")
    private Address crew_location;      // 크루 활동 지역

    // 생성 시 기본값 설정
    @PrePersist
    private void set_Defalut() {

        // 크루 생성 날짜 입력
        crew_regdate = LocalDateTime.now();
        crew_count = 1l;
        user.setCrew(this);
    }
}
