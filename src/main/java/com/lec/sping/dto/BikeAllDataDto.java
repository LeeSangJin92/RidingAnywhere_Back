package com.lec.sping.dto;

import com.lec.sping.domain.bike.BikeBrand;
import com.lec.sping.domain.bike.BikeModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BikeAllDataDto {
    public List<BikeModel> bikeModelList = new ArrayList<>();
    public List<BikeBrand> bikeBrandList = new ArrayList<>();

    public static BikeAllDataDto of(BikeAllDataDto dataDto){
        BikeAllDataDto bikeAllDataDto = dataDto;
        return bikeAllDataDto;
    }
}
