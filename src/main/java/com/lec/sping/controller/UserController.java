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

    @PostMapping("/userNickName")
    public ResponseEntity<UserResponseDto> setUserNickName(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.changeUserNickname(userRequestDto.getUserEmail(), userRequestDto.getUserNickname()));
    }

    @PostMapping("/userPassword")
    public ResponseEntity<UserResponseDto> setUserPassword(@RequestBody ChangePasswordRequestDto requestDto){
        return ResponseEntity.ok(userService.changeUserPassword(requestDto.getUserEmail(),requestDto.getExUserPassword(),requestDto.getNewUserPassword()));
    }


}
