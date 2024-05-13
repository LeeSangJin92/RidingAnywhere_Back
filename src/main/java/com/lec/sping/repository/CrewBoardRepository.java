package com.lec.sping.repository;

import com.lec.sping.domain.crew.CrewBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewBoardRepository extends JpaRepository<CrewBoard,Long> {
}
