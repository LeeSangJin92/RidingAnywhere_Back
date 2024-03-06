package com.lec.sping.repository;

import com.lec.sping.domain.bike.BikeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BikeModelRepository extends JpaRepository<BikeModel, Long> {

    @Query("select b from BikeModel b where b.model_name = ?1 And b.model_cc = ?2")
    BikeModel findBymodel_nameAndmodel_cc(String model_name, String model_cc);
}
