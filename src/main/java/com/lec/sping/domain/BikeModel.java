package com.lec.sping.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BikeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikemodl_id;           // 바이크 모델 ID
    private String bikemodel_name;      // 바이크 이름
    private Long bikemodel_cc;          // 바이크 CC

    @ManyToOne
    private BikeBrand brand;            // 바이크 브랜드 (FK)




}
