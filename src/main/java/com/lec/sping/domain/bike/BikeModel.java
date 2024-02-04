package com.lec.sping.domain.bike;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class BikeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikemodel_id;      // 바이크 모델 ID
    private String bikemodel_name;  // 바이크 모델명
    private Long bikemodel_cc;      // 바이크 배기량

    // FK 영역
    @ManyToOne(optional = false)
    private BikeBrand bikebrand_id;      // 바이크 모델 ID
}
