package com.lec.sping.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/Map")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://riding-anywhere.vercel.app")
public class NaverMapController {

    private final RestTemplate restTemplate;

    // 🔎 장소 이름 검색
    @GetMapping("/api/search")
    public ResponseEntity<String> proxySearch(@RequestParam String location) {
        String url = "https://openapi.naver.com/v1/search/local.json"+"?query=" + location + "&display=5&start=1&sort=random";
        System.out.println("🛜 장소 이름 검색 요청");
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", "L8Q5xDgqa0JL2obUGv3A");
        headers.set("X-Naver-Client-Secret", "DPCY40iDv0");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("✅ 장소 이름 검색 요청");
        return ResponseEntity.ok(response.getBody());
    }

    // 🔎주소로 위치 검색
    @GetMapping("/api/address")
    public ResponseEntity<String> addressSearch(@RequestParam String address){
        String url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query="+address;
        System.out.println("🛜 주소 기준 검색");
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID","ncqqcjhrfk");
        headers.set("X-NCP-APIGW-API-KEY","hawJVMsndko89s19X4Rg10vDFtLXZi733t8SDmRa");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        HttpEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("✅ 주소 기준 검색");
        return ResponseEntity.ok(response.getBody());
    }


    @GetMapping("/api/coordinate")
    public ResponseEntity<String> coordinateSearch(@RequestParam String lat, @RequestParam String lng){
        String url = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords="+lng+","+lat+"&orders=admcode,roadaddr&output=json";
        System.out.println("🛜 좌표 기준 주소 요청");
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", "ncqqcjhrfk");
        headers.set("X-NCP-APIGW-API-KEY", "hawJVMsndko89s19X4Rg10vDFtLXZi733t8SDmRa");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println("✅ 좌표 기준 주소 요청");
        return ResponseEntity.ok(response.getBody());
    }
}
