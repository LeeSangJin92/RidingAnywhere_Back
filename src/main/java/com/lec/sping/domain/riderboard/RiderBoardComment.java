package com.lec.sping.domain.riderboard;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RiderBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;                 // 댓글 ID
    private String commentContext;          // 댓글 내용
    private LocalDateTime commentRegdate;   // 댓글 작성일

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                      // 작성자

    @ManyToOne
    @JoinColumn(name = "riderBoard")
    private RiderBoard riderBoard;            // 상위 게시판

    @ManyToOne
    @JoinColumn(name = "commentReply")
    private RiderBoardComment commentReply;          // 상위 댓글
}
