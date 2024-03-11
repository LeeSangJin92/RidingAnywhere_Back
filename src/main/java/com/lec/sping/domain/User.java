package com.lec.sping.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.domain.camping.CampingAttendance;
import com.lec.sping.domain.course.CourseBoard;
import com.lec.sping.domain.crew.*;
import com.lec.sping.domain.openboard.OpenBoard;
import com.lec.sping.domain.openboard.OpenCommit;
import com.lec.sping.domain.tour.TourAttendance;
import com.lec.sping.domain.tour.TourBoard;
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
    private byte[] userProfile;    // 유저 프로필
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

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "authorityId")
    private Authority authorityId;    // 유저 권한

    @ManyToOne
    @JoinColumn(name = "crewId")
    private Crew crew;              // 소속 크루

    @OneToOne(mappedBy = "user")
    private Crew createcrew;              // 생성한 크루

    @OneToOne(mappedBy = "user")
    private CrewManager crewmanager;      // 크루 관리 유저

    @OneToOne(mappedBy = "user")
    @ToString.Exclude
    private CrewJoin joincrew;              // 크루 참여 요청

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<BikeGarage> garages;        // 내 바이크 정보

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<CrewSchedule> schedules;       // 크루 일정 작성자

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<CrewAttendance> attendances;   // 크루 일정 참가

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<OpenBoard> openBoardList;      // 라이더 게시판 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<OpenCommit> openCommits;       // 라이더 게시판 댓글 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<TourBoard> tourBoardList;      // 작성한 투어 게시글 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<TourAttendance> tourAttendanceList; // 참석하는 투어 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<CampingAttendance> campingAttendanceList; // 참석하는 모캠 리스트

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<CourseBoard> courseBoardList; // 작성한 코스 게시판 리스트

    // 계성 생성 날짜 입력
    @PrePersist
    private void set_Defalut(){

        userRegdate = LocalDateTime.now();
        authorityId = new Authority();
        authorityId.setAuthority_id(1l);
        authorityId.setAuthority_name(Auth.ROLE_RA_Member);
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