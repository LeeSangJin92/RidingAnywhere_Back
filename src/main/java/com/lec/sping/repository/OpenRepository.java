package com.lec.sping.repository;

import com.lec.sping.domain.openboard.OpenBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenRepository extends JpaRepository<OpenBoard,Long> {
}
