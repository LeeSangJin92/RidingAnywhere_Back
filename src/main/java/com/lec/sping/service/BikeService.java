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
import jakarta.persistence.Entity;
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

//    라이더의 바이크 추가 관련 라인
    public BikeGarage addBikeData(BikeAddDataDto addData){
        User user = userRepository.findByUserEmail(addData.getUserEmail()).orElseThrow(()->new NullPointerException("존재하지 않은 유저입니다."));
        System.out.println("🛜라이더의 바이크 리스트 조회중...");
        boolean isNewBike = findAllRiderBike(user).isEmpty();
        System.out.println("✅라이더의 바이크 리스트 조회 완료!");
        System.out.println("🛜신규 바이크 모델 생성 중...");
        BikeModel bikeModel = bikeModelRepository.findBymodel_nameAndmodel_cc(addData.getBikeModel(),addData.getBikeCC());
        System.out.println("🛜신규 바이크 차고에 저장 중...");
        BikeGarage bikeGarage = new BikeGarage();
        bikeGarage.setUser(user);
        bikeGarage.setBikeModel(bikeModel);
        bikeGarage.setBike_year(addData.getBikeYear());
        if(isNewBike)bikeGarage.setBike_select(true);
        else bikeGarage.setBike_select(false);
        BikeGarage result = bikeAddRepository.save(bikeGarage);
        System.out.println("✅신규 바이크 차고에 저장 완료!");
        return result;
    }

    /*✅라이더가 소유하고 있는 바이크 모두 조회*/
    public List<BikeGarage> findAllRiderBike(User user){
        return bikeAddRepository.findAllByUser(user);
    }
}
