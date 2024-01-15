package com.lec.sping.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CrewBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crewboard_id;          // 크루 게시판 ID
    private String crewboard_title;     // 크루 게시판 제목
    private String crewboard_context;   // 크루 게시판 내용
    private Long crewboard_viewcnt;     // 크루 게시판 조회수
    private String crewboard_img;       // 크루 게시판 첨부 이미지


    //--------------------------------------------------
    // 참조키 영역
    @JoinColumn
    @ManyToOne
    private User user;                  // 게시판 작성자


}
