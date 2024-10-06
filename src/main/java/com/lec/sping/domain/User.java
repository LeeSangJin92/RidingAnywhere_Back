package com.lec.sping.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.domain.crew.*;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.domain.riderboard.RiderBoardComment;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;           // 기본 Id
    @Column(nullable = false)
    private String userNickname;      // 유저 연락처
    private String userName;       // 유저 이름
    @Column(nullable = false)
    private String userBirthday;   // 유저 생년월일
    private boolean userGender;    // 유저 성별
    private String userPhone;      // 유저 연락처
    @Column(nullable = false,unique = true)
    private String userEmail;      // 유저 메일
    @ColumnDefault("0")
    private Long userCnt;          // 유저 출석 수
    private String userState;      // 유저 상태
    @Lob
    private Blob userProfile;    // 유저 프로필
    @Column(nullable = false)
    private String userPassword;   // 유저 비밀번호
    @Transient
    @ToString.Exclude
    @JsonIgnore
    private String userPassword_rd; // 유저 비밀번호 확인용
    private String userContext;    // 유저 자시소개
    private LocalDateTime userRegdate; // 유저 회원가입 날짜

    //----------------------------------------------
    //FK 영역

    @ManyToOne(optional = false)
    @JoinColumn(name = "authorityId")
    private Authority authorityId;        // 유저 권한

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "crewId")
    private Crew crew;                    // 소속 크루

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    @ToString.Exclude
    private Crew createcrew;              // 생성한 크루

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    @ToString.Exclude
    private CrewManager crewmanager;      // 크루 관리 유저

    @OneToOne(mappedBy = "user")
    @ToString.Exclude
    private CrewJoin joincrew;              // 크루 참여 요청

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "attend_member_id", nullable = true)
    private CrewTourAttend crewTourAttend;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<BikeGarage> garages;        // 내 바이크 정보

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    @JsonIgnore
    private List<RiderBoard> riderBoardList;      // 라이더 게시판 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    @JsonIgnore
    private List<RiderBoardComment> openCommits;       // 라이더 게시판 댓글 리스트

    @ManyToOne
    private Address address;    // 유저 활동 지역

    // 계성 생성 날짜 입력
    @PrePersist
    private void set_Default(){
        userRegdate = LocalDateTime.now();
    }

    @Builder
    public User(Long userId, String userEmail, String userPassword,
                String userNickname, String userBirthday, String userContext,
                String userPhone, String userState, String userName
                ){
        this.userId = userId;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userNickname = userNickname;
        this.userBirthday = userBirthday;
        this.userContext = userContext;
        this.userPhone = userPhone;
        this.userState = userState;
        this.userName = userName;
    }
}