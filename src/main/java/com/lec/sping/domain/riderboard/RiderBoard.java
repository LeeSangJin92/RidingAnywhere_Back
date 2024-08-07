package com.lec.sping.domain.riderboard;

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
public class RiderBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;              // 게시글 Id
    private String boardType;           // 게시글 타입
    private String boardTitle;         // 게시글 제목
    private String boardContext;       // 게시글 내용
    private boolean boardCommentOn;     // 게시글 댓글 제한
    private String boardEvent;          // 사건글 종류
    private String boardLevel;          // 게시글 등급
    private LocalDateTime boardDate;    // 게시글 일정
    private String boardLocation;       // 게시글 장소
    private LocalDateTime boardRegdate; // 게시글 작성일

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                  // 작성자
}
