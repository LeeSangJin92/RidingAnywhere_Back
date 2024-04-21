package com.lec.sping.controller;

import com.lec.sping.domain.Address;
import com.lec.sping.domain.User;
import com.lec.sping.domain.bike.BikeGarage;
import com.lec.sping.dto.*;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.AddressService;
import com.lec.sping.service.BikeService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/RA")
public class UserController {
    private final UserService userService;
    private final BikeService bikeService;
    private final TokenProvider tokenProvider;
    private final AddressService addressService;

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
        if(userData.getCrew()!=null) userAllDataDto.setCrewId(userData.getCrew().getCrew_id());
        return new ResponseEntity<>(userAllDataDto,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/UpdateUser")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authTokenHeader, @RequestBody ProfileUpdateDto updateData) {
        System.out.println("🛜수정을 원하는 라이더 정보 수집중...");
        String token = authTokenHeader.substring(7);
        User userData = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("✅라이더 데이터 확인 완료");
        updateData.setUser(userData);
        System.out.println("🛜라이더 데이터 수정 요청");
        System.out.println(updateData);
        return ResponseEntity.ok(userService.UpdateProfile(updateData));
    }
    @CrossOrigin
    @PostMapping("/UpdateImage")
    public ResponseEntity<?> updateImage(@RequestHeader("Authorization") String authTokenHeader,
                                         @RequestPart("file") MultipartFile file) throws IOException, SQLException {
        System.out.println("🛜이미지 수정을 원하는 라이더 정보 수집중...");
        String token = authTokenHeader.substring(7);
        User userData = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("✅라이더 데이터 확인 완료");
        System.out.println("🛜라이더 이미지 수정 요청");
        return ResponseEntity.ok(userService.UpdateImage(userData, file));
    }

    @CrossOrigin
    @GetMapping("/AddressData")
    public ResponseEntity<?> findAll(){
        List<Address> addressList = addressService.getfindAll();
        System.out.println("주소 찾기 완료!");
        return new ResponseEntity<>(addressList,HttpStatus.OK);
    }
}
