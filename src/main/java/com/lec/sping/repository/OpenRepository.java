package com.lec.sping.repository;

import com.lec.sping.domain.riderboard.RiderBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenRepository extends JpaRepository<RiderBoard,Long> {
}
