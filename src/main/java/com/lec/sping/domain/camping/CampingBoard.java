package com.lec.sping.domain.camping;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CampingBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campingboard_id;                   // 모캠 게시판 ID
    private String campingboard_title;              // 모캠 게시글 제목
    private String campingboard_context;            // 모캠 게시글 내용
    private LocalDateTime campingboard_startdate;   // 모캠 시작 날짜
    private LocalDateTime campingboard_enddate;     // 모캠 종료 날짜
    private LocalDateTime campingboard_regdate;     // 모캠 게시글 작성날
    private Long campingboard_max;                  // 모캠 최대 인원
    private String campingboard_location;           // 모캠 장소

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                              // 모캠 게시글 작성자

    @OneToMany(mappedBy = "campingboard")
    @ToString.Exclude
    private List<CampingAttendance> campingAttendanceList; // 모캠 참석자 리스트

}
