package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiderBoardCommentDto {
    private Long board_id;          // 게시글 ID
    private String writer_email;    // 댓글 작성자 Email
    private Long comment_id;        // 상위 댓글 ID
    private String comment_context; // 댓글 내용
}
