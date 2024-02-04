package com.lec.sping.domain.crew;


import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CrewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crewschedule_id;                       // 크루 일정 ID
    private String crewschedule_title;                  // 크루 일정 제목
    private String crewschedule_context;                // 크루 일정 내용
    private String crewschedule_location;               // 크루 일정 장소
    private LocalDateTime crewschedule_startdate;       // 크루 일정 시작일
    private LocalDateTime crewschedule_enddate;         // 크루 일정 종료일
    private LocalDateTime crewschedule_regdate;         // 크루 일정 생성일

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "crew_id")
    private Crew crew;                                  // 작성 크루 ID

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;                                  // 작성자

    @OneToMany(mappedBy = "schedule")
    @ToString.Exclude
    private List<CrewAttendance> attendaceusers;        // 일정 참가 인원 리스트
}
