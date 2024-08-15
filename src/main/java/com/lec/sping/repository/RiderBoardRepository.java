package com.lec.sping.repository;

import com.lec.sping.domain.riderboard.RiderBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiderBoardRepository extends JpaRepository<RiderBoard, Long> {
}
