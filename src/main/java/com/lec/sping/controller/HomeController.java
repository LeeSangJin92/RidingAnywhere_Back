package com.lec.sping.controller;

import com.lec.sping.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor
@RestController("/RA")
public class HomeController {

        private final HomeService homeService;
//        @CrossOrigin
//        @GetMapping("/RA/RiderBoard")
//        public ResponseEntity<?> findAll(){return new ResponseEntity<>()}


}
