package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.domain.crew.Crew;
import com.lec.sping.dto.ChangeCrewDto;
import com.lec.sping.dto.CreateCrewDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.AddressService;
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
    private final AddressService addressService;

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

    @CrossOrigin
    @PostMapping("/LoadCrewData")
    public ResponseEntity<?> loadCrewData(@RequestHeader("Authorization") String authTokenHeader, @RequestBody Long crewId){
        System.out.println("🛠️ 크루 데이터 호출 요청 받음");
        Crew crew = crewService.findById(crewId);
        System.out.println("✅ 크루 데이터 로드 완료");
        System.out.println(crew);
        return new ResponseEntity<>(crew,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/ChangeAddress")
    public ResponseEntity<?> changeAddressData(@RequestHeader("Authorization") String authTokenHeader, @RequestBody ChangeCrewDto changeCrewData){
        System.out.println("🛠️ 크루 지역 데이터 수정 요청 받음");
        System.out.println("🔎 수정하려는 크루 데이터 조회중...");
        Crew crew = crewService.findById(changeCrewData.getCrew_id());
        System.out.println("✅ 크루 데이터 조회 완료");
        System.out.println("🛠️ 데이터 수정 중...");
        crew.setCrew_location(addressService.findByLocation(changeCrewData.getCrew_city(), changeCrewData.getCrew_town()));
        System.out.println("✅ 크루 데이터 수정 완료");
        return new ResponseEntity<>(crewService.save(crew),HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("ChangeContext")
    public ResponseEntity<?> changeContext(@RequestHeader("Authorization") String authTokenHeader, @RequestBody ChangeCrewDto changeCrewData){
        System.out.println("🛠️ 크루 인사말 수정 요청 받음 ");
        System.out.println("🔎 수정하려는 크루 데이터 조회중...");
        Crew crew = crewService.findById(changeCrewData.getCrew_id());
        System.out.println("✅ 크루 데이터 조회 완료");
        System.out.println("🛠️ 데이터 수정 중...");
        crew.setCrew_context(changeCrewData.getCrew_context());
        System.out.println("✅ 크루 데이터 수정 완료");
        return new ResponseEntity<>(crewService.save(crew),HttpStatus.OK);
    }



}
