package com.lec.sping.controller;

import com.lec.sping.dto.BikeAllDataDto;
import com.lec.sping.dto.ChangePasswordRequestDto;
import com.lec.sping.dto.UserRequestDto;
import com.lec.sping.dto.UserResponseDto;
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

    @GetMapping("/User")
    public ResponseEntity<UserResponseDto> getMyUserInfo(){
        System.out.println("내 데이터 찾기");
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        System.out.println((myInfoBySecurity));
        return ResponseEntity.ok((myInfoBySecurity));
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
