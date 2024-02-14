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
    private Long model_id;      // 바이크 모델 ID
    private String model_name;  // 바이크 모델명
    private Long model_cc;      // 바이크 배기량

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id")
    private BikeBrand bikebrand_id;      // 바이크 브랜드 ID
}
