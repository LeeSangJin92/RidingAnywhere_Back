package com.lec.sping.repository;

import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.domain.riderboard.RiderBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiderBoardCommentRepository extends JpaRepository<RiderBoardComment,Long> {

    List<RiderBoardComment> findAllByRiderBoard(RiderBoard riderBoard);
}
