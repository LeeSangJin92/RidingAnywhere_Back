package com.lec.sping.repository;


import com.lec.sping.domain.crew.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew,Long> {
}
