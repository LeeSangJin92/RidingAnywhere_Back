package com.lec.sping.service;

import com.lec.sping.dto.BikeAllDataDto;
import com.lec.sping.repository.BikeBrandRepository;
import com.lec.sping.repository.BikeModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class BikeService {

    private final BikeModelRepository bikeModelRepository;
    private final BikeBrandRepository bikeBrandRepository;

    @Transactional
    public BikeAllDataDto getfindAll(){
        BikeAllDataDto bikeAlllDto = new BikeAllDataDto();
        bikeAlllDto.setBikeModelList(bikeModelRepository.findAll());
        bikeAlllDto.setBikeBrandList(bikeBrandRepository.findAll());
        return bikeAlllDto;
    }
}
