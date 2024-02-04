package com.lec.sping.repository;

import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.domain.bike.BikeGarageKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikeGarageRepository extends JpaRepository<BikeGarage, BikeGarageKey> {
}
