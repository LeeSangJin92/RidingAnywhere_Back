package com.lec.sping.domain.riderboard;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RiderBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;               // 게시글 Id
    private String boardType;           // 게시글 타입
    private String boardTitle;          // 게시글 제목
    private String boardContext;        // 게시글 내용
    private boolean boardLimit;         // 게시글 댓글 제한
    private String boardDetail;         // 사건글 종류
    private LocalDateTime boardDate;    // 게시글 일정
    private String boardLocation;       // 게시글 장소
    private LocalDateTime boardRegdate; // 게시글 작성일
    private Long boardCnt;            // 게시글 조회수

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                  // 작성자

    @PrePersist
    public void setDefault(){
        boardCnt = 1L;                // 게시글 조회수 1 설정
        boardRegdate = LocalDateTime.now(); // 게시글 작성 날짜 입력
    }
}
