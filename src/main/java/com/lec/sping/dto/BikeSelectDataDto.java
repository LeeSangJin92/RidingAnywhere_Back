package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BikeSelectDataDto {

    private Long beforBikeId;
    private Long afterBikeId;
}
