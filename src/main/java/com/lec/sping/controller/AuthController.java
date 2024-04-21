package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.dto.UserRequestDto;
import com.lec.sping.dto.UserResponseDto;
import com.lec.sping.service.AuthService;
import com.lec.sping.service.CrewService;
import com.lec.sping.service.EmailService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/RA")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;

    @CrossOrigin
    @PostMapping("/Signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto requestDto){
        try {
            return new ResponseEntity<>(authService.sigup(requestDto),HttpStatus.OK);
        } catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @PostMapping("/SignUp/Email")
    public ResponseEntity<String> check(@RequestBody String email) throws Exception{
            System.out.println("받은 이메일 주소 : "+ email);
            String code = emailService.sendSimpleMessage(email);
            System.out.println("인증코드 : "+code);
            return new ResponseEntity<>(code, HttpStatus.OK);
    }
    @CrossOrigin
    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody UserRequestDto requestDto){
        try {
        System.out.println("로그인 시도 요청");
        System.out.println("요청 DTO 정보 : " + requestDto);
        System.out.println("토큰 정보 : " + authService.login(requestDto));
        return new ResponseEntity<>(authService.login(requestDto),HttpStatus.OK);
        } catch (NullPointerException e){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
