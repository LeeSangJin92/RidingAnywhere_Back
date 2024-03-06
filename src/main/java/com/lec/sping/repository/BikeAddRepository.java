package com.lec.sping.repository;

import com.lec.sping.domain.User;
import com.lec.sping.domain.bike.BikeGarage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BikeAddRepository extends JpaRepository<BikeGarage, Long> {

    List<BikeGarage> findAllByUser(User user);
}
