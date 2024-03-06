package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.domain.bike.BikeModel;
import com.lec.sping.dto.BikeAddDataDto;
import com.lec.sping.dto.BikeAllDataDto;
import com.lec.sping.repository.BikeAddRepository;
import com.lec.sping.repository.BikeBrandRepository;
import com.lec.sping.repository.BikeModelRepository;
import com.lec.sping.repository.UserRepository;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BikeService {

    private final UserRepository userRepository;
    private final BikeModelRepository bikeModelRepository;
    private final BikeBrandRepository bikeBrandRepository;
    private final BikeAddRepository bikeAddRepository;

    public BikeAllDataDto getfindAll(){
        BikeAllDataDto bikeAlllDto = new BikeAllDataDto();
        bikeAlllDto.setBikeModelList(bikeModelRepository.findAll());
        bikeAlllDto.setBikeBrandList(bikeBrandRepository.findAll());
        return bikeAlllDto;
    }

    public BikeGarage addBikeData(BikeAddDataDto addData){
        User user = userRepository.findByUserEmail(addData.getUserEmail()).orElseThrow(()->new NullPointerException("존재하지 않은 유저입니다."));

        BikeModel bikeModel = bikeModelRepository.findBymodel_nameAndmodel_cc(addData.getBikeModel(),addData.getBikeCC());
        System.out.println("통과");
        System.out.println(bikeModel);

        BikeGarage bikeGarage = new BikeGarage();
        bikeGarage.setUser(user);
        bikeGarage.setBikeModel(bikeModel);
        bikeGarage.setBike_state(addData.getBikeState());
        bikeGarage.setBike_year(addData.getBikeYear());
        System.out.println("✅"+bikeGarage);
        return bikeAddRepository.save(bikeGarage);
    }

    /*✅라이더가 소유하고 있는 바이크 모두 조회*/
    public List<BikeGarage> findAllRiderBike(User user){
        return bikeAddRepository.findAllByUser(user);
    }
}
