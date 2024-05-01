package com.lec.sping.repository;

import com.lec.sping.domain.User;
import com.lec.sping.domain.crew.Crew;
import com.lec.sping.domain.crew.CrewManager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewManagerRepository extends JpaRepository<CrewManager, Long> {

    List<CrewManager> findAllByCrew(Crew crew);

    CrewManager findByCrewAndAndUser(Crew crew, User user);
}
