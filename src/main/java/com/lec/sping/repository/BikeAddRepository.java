package com.lec.sping.repository;

import com.lec.sping.domain.bike.BikeGarage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikeAddRepository extends JpaRepository<BikeGarage, Long> {
}
