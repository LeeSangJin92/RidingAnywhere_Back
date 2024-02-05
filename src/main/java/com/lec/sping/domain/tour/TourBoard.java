package com.lec.sping.domain.tour;

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
public class TourBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tourboard_id;                  // 투어 게시판 ID
    private String tourboard_title;             // 투어 게시판 제목
    private String tourboard_context;           // 투어 게시판 내용
    private LocalDateTime tourboard_startdate;  // 투어 시작일
    private LocalDateTime tourboard_regdate;    // 투어 게시글 작성날
    private String tourboard_location;          // 투어 장소
    private Long tourboard_max;                 // 투어 최대 인원

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                          // 투어 게시글 작성자

    @OneToMany(mappedBy = "tourboard")
    @ToString.Exclude                           // 투어 참석 요청 리스트
    private List<TourAttendance> tourAttendancesList;
}
