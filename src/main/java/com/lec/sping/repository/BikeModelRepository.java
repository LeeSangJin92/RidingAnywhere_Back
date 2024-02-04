package com.lec.sping.repository;

import com.lec.sping.domain.bike.BikeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikeModelRepository extends JpaRepository<BikeModel, Long> {
}
