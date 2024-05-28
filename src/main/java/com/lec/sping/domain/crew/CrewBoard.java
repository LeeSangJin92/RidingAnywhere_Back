package com.lec.sping.domain.crew;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardId;
    private Boolean emergencyNote;  // 긴급 공지     (공지글 해당)
    private String boardTitle;      // 게시글 제목
    private String boardContext;    // 게시글 내용
    private LocalDateTime startDate;// 게시글 시작 일자(공지글, 모임 게시글 해당)
    private LocalDateTime endDate;  // 게시글 종료 일자(공지글, 모임 게시글 해당)
    private LocalDateTime regDate;  // 게시글 생성 날짜
    private Long memberCount;    // 참여 인원 설정(모임 게시글 해당)
    private String address;         // 모임 장소
    private String boardType;       // 게시글 타입 (공지글, 모임글, 자유글, 인사글)
    private Long boardCnt;          // 게시글 조회수

    //FK 영역
    @ManyToOne
    private User writer;            // 게시글 작성자

    @ManyToOne
    private Crew crew;              // 담당 크루

    @PrePersist
    private void setBoardRegDate(){
        // 크루 게시글 작성 날짜 입력
        regDate = LocalDateTime.now();

        // 게시글 조회수 1로 설정
        boardCnt = 1L;
    }
}
