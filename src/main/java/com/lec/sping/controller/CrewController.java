package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.domain.crew.Crew;
import com.lec.sping.dto.CreateCrewDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.CrewService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/CR")
public class CrewController {

    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final CrewService crewService;

    @CrossOrigin
    @PostMapping("/Create")
    public ResponseEntity<?> createCrew(@RequestHeader("Authorization") String authTokenHeader, @RequestBody CreateCrewDto crewDto){
        System.out.println("🛠️크루 생성 작업 요청 받음");
        System.out.println("🔎생성자 조회중...");
        String token = authTokenHeader.substring(7);
        User userData = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        System.out.println("✅생성자 데이터 확인 완료");
        Crew createdCrew = crewService.createCrew(userData,crewDto);
        System.out.println("✅크루 생성 완료");
        System.out.println("🛠️생성된 크루 초기화중...");
        crewService.defaultCrewManager(createdCrew);
        return new ResponseEntity<>(createdCrew,HttpStatus.OK);
    }
}
