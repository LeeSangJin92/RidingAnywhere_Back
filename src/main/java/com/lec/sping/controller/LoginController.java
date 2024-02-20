package com.lec.sping.controller;

import com.lec.sping.constants.SecurityConstanst;
import com.lec.sping.domain.AuthenticationRequest;
import com.lec.sping.prop.JwtProps;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
public class LoginController {

    @Autowired
    private JwtProps jwtProps;

    // 로그인
    // 유저 이메일
    // 유저 비밀번호
    @PostMapping("login")
     public ResponseEntity<?> login(@RequestBody AuthenticationRequest request){



        String userEmail = request.getUserEmail();
        String password = request.getPassword();

        log.info("userEmail : " + userEmail);
        log.info("userPassword : " + password);

        // 사용자 권한
        List<String> roles = new ArrayList<>();
        roles.add("Rider");
        roles.add("Admin");

        byte[] signingKey = jwtProps.getSecretKey().getBytes();

        // 토큰 생성
        String jwt = Jwts.builder()
                    /* .signWith( 시크릿키 , 변환 알고리즘 )*/
                    .signWith(Keys.hmacShaKeyFor(signingKey) , Jwts.SIG.HS512)
                .header()
                .add("typ", SecurityConstanst.TOKEN_TYPE)
                .and()
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24*5))
                .claim("uemail",userEmail)
                .claim("rol", roles)
                .compact();

        log.info("jwt : " + jwt);

        return new ResponseEntity<String>(jwt, HttpStatus.OK);



    }

}
