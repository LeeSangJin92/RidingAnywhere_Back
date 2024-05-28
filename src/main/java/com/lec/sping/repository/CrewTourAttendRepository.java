package com.lec.sping.repository;

import com.lec.sping.domain.crew.CrewBoard;
import com.lec.sping.domain.crew.CrewTourAttend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewTourAttendRepository extends JpaRepository<CrewTourAttend,Long> {
    CrewTourAttend findByTourBoard(CrewBoard crewBoard);
}
