package com.lec.sping.repository;

import com.lec.sping.domain.tour.TourBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<TourBoard, Long> {
}
