package com.lec.sping.domain.crew;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewJoinBoard {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long joinboard_id;                  // 크루 가입 게시판 ID
        private String joinboard_title;             // 크루 가입 게시판 제목
        private String joinboard_context;           // 크루 가입 게시판 내용
        private LocalDateTime joinboard_regdate;    // 크루 가입 게시판 작성날


        // FK 영역
        @OneToOne
        @JoinColumn(name = "crew_id")
        private Crew crew;                          // 가입 게시판 작성 크루
}
