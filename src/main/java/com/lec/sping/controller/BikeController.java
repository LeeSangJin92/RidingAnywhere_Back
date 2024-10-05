package com.lec.sping.controller;

import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.dto.BikeAddDataDto;
import com.lec.sping.dto.BikeAllDataDto;
import com.lec.sping.dto.BikeSelectDataDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.BikeService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "https://riding-anywhere.vercel.app")
@RestController
@RequiredArgsConstructor
@RequestMapping("/RA")
public class BikeController {
    private final BikeService bikeService;
    private final TokenProvider tokenProvider;

    @GetMapping("/BikeModel")
    public ResponseEntity<BikeAllDataDto> getBikeModel(){
        System.out.println("바이크 모델 조회 시작...");
        BikeAllDataDto bikeModelList = bikeService.getfindAll();
        System.out.println("바이크 모델 전달 완료!");
        return new ResponseEntity<>(bikeModelList, HttpStatus.OK);
    }

    @PostMapping("/AddBike")
    public ResponseEntity<?> addBikeData(@RequestBody BikeAddDataDto bikeAddDataDto, @RequestHeader("Authorization") String authTokenHeader){

        String token = authTokenHeader.substring(7);
        bikeAddDataDto.setUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("🛜바이크 데이터 추가 시작...");
        bikeService.addBikeData(bikeAddDataDto);
        System.out.println("✅바이크 데이터 추가 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/SelectBike")
    public ResponseEntity<?> selectBikeData(@RequestBody BikeSelectDataDto bikeSelectData){
        System.out.println("🛜대표 바이크 수정 작업 시작");
        bikeService.changeSelectBike(bikeSelectData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/DeleteBike")
    public ResponseEntity<?> deleteBikeData(@RequestBody BikeGarage bikeData, @RequestHeader("Authorization") String authTokenHeader){
        String token = authTokenHeader.substring(7);
        System.out.println("️🛜바이크 제거 작업 시작");
        return new ResponseEntity<>(bikeService.deleteBike(bikeData,tokenProvider.parseClaims(token).getSubject()), HttpStatus.OK);
    }
}
