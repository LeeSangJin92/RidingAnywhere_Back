package com.lec.sping.domain;

import jakarta.persistence.*;
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
    @ManyToOne
    private BikeModel bikemodel;          // 바이크 모델 ID (FK)

    @Id
    @ManyToOne
    private User user;               // 유저 ID (FK)

    private LocalDateTime bike_year;    // 바이크 년식
    private String bike_state;          // 바이크 상태
}
