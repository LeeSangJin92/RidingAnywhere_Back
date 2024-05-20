package com.lec.sping.repository;

import com.lec.sping.domain.crew.Crew;
import com.lec.sping.domain.crew.CrewBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewBoardRepository extends JpaRepository<CrewBoard,Long> {

    List<CrewBoard> findAllByCrew(Crew crew);
}
