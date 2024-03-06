package com.lec.sping.domain.bike;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
@Entity
public class BikeGarage {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long bikegarage_id;          // 내 바이크 Id
    private String bike_state;          // 바이크 상태 (고장, 정비, 사고 등...)
    private String bike_year;           // 바이크 연식

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    @MapsId
    private User user;                  // 유저

    @ManyToOne(optional = false)
    @JoinColumn(name = "bikemodel_id")
    @MapsId
    private BikeModel bikeModel;       // 바이크 모델
}
