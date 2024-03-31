package com.lec.sping.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BikeAddDataDto {

    private String userEmail;   // 유저 이메일
    private String bikeBrand;   // 바이크 브랜드
    private String bikeModel;   // 바이크 모델
    private String bikeCC;      // 바이크 배기량
    private String bikeYear;    // 바이크 연식
}
