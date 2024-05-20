package com.lec.sping.repository;

import com.lec.sping.domain.crew.Crew;
import com.lec.sping.domain.crew.CrewBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewBoardRepository extends JpaRepository<CrewBoard,Long> {

    @Query("select cb from CrewBoard cb where cb.crew = :crew ORDER BY cb.boardId desc")
    List<CrewBoard> findAllByCrew(Crew crew);
}
