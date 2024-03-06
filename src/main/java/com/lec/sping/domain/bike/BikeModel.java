package com.lec.sping.domain.bike;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.bind.annotation.Mapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@NoArgsConstructor
public class BikeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long model_id;      // 바이크 모델 ID
    private String model_name;  // 바이크 모델명
    private String model_cc;      // 바이크 배기량

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id")
    private BikeBrand bikebrand_id;      // 바이크 브랜드 ID

}
