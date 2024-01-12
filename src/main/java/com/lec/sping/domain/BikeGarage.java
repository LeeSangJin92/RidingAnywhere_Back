package com.lec.sping.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BikeGarage {

    @Id
    private Long bikemodel_id;
    @Id
    private Long user_id;

    private LocalDateTime bike_year;
    private String bike_state;
}
