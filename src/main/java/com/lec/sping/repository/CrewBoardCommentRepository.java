package com.lec.sping.repository;

import com.lec.sping.domain.crew.CrewBoard;
import com.lec.sping.domain.crew.CrewBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewBoardCommentRepository extends JpaRepository<CrewBoardComment,Long> {
    @Query("select cbc from CrewBoardComment cbc where cbc.commentBoard = :comment_board ORDER BY cbc.commentId desc")
    List<CrewBoardComment> findAllByCommentBoard(CrewBoard comment_board);
    void deleteAllByCommentBoard(CrewBoard crewBoard);
    void deleteAllByCommentReply(CrewBoardComment comment_reply);
    List<CrewBoardComment> findAllByCommentReply(CrewBoardComment comment_reply);

}
