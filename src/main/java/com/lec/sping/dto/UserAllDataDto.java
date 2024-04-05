package com.lec.sping.dto;

import com.lec.sping.domain.Authority;
import com.lec.sping.domain.User;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.domain.bike.BikeModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAllDataDto {

    private List<BikeGarage> bikeList = new ArrayList<>();
    private User userData = new User();
    private byte[] profile;
    private Long crewId;
}
