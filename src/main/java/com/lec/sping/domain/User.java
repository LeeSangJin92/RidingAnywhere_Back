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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;           // 기본 Id
    @Column(nullable = false)
    private String user_nickname;   // 유저 닉네임
    @Column(nullable = false)
    private String user_name;       // 유저 이름
    @Column(nullable = false)
    private String user_birthday;   // 유저 생년월일
    private boolean user_sex;       // 유저 성별
    private String user_phone;      // 유저 연락처
    @Column(nullable = false)
    private String user_email;      // 유저 메일
    private Long user_cnt;          // 유저 출석 수
    private String user_state;      // 유저 상태
    private String user_profile;    // 유저 프로필
    @Column(nullable = false)
    @JsonIgnore
    private String user_password;   // 유저 비밀번호
    @Transient
    @ToString.Exclude
    @JsonIgnore
    private String user_password_rd; // 유저 비밀번호 확인용
    private String user_context;    // 유저 자시소개

    //----------------------------------------------
    //FK 영역

    @ManyToOne(optional = false)
    @JoinColumn(name = "authority")
    private Authority authority;    // 유저 권한

    @ManyToOne
    @JoinColumn(name = "crew")
    private Crew crew;              // 소속 크루

    @OneToOne(mappedBy = "user")
    @ToString.Exclude
    private Crew createcrew;              // 생성한 크루

    @OneToOne(mappedBy = "user")
    @ToString.Exclude
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
}