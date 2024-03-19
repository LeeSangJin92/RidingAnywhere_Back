package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.dto.*;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.BikeService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.util.Elements;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/RA")
public class UserController {
    private final UserService userService;
    private final BikeService bikeService;
    private final TokenProvider tokenProvider;

    @CrossOrigin
    @GetMapping("/CheckRider")
    public ResponseEntity<?> getMyUserInfo(@RequestHeader("Authorization") String authTokenHeader){
        System.out.println("🛜라이더 데이터 조회중...");
        String token = authTokenHeader.substring(7);
        User userData = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("✅라이더 유저 데이터 확보");
        List<BikeGarage> bikeList = bikeService.findAllRiderBike(userData);
        System.out.println("✅라이더 데이터 조회 완료");
        UserAllDataDto userAllDataDto = new UserAllDataDto();
        userAllDataDto.setUserData(userData);
        userAllDataDto.setBikeList(bikeList);
        return new ResponseEntity<>(userAllDataDto,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/UpdateUser")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authTokenHeader, @RequestBody ProfileUpdateDto updateData){
        System.out.println("🛜수정을 원하는 라이더 정보 수집중...");
        String token = authTokenHeader.substring(7);
        User userData = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("✅라이더 데이터 확인 완료");
        updateData.setUser(userData);
        System.out.println("🛜라이더 데이터 수정 요청");
//        userService.UpdateProfile(updateData)

        return ResponseEntity.ok("체크!");
    }

}
