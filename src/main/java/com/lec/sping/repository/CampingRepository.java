package com.lec.sping.repository;

import com.lec.sping.domain.camping.CampingBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampingRepository extends JpaRepository<CampingBoard,Long> {
}
