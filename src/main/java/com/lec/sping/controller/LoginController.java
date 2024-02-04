package com.lec.sping.controller;

import com.lec.sping.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/RidingAnywher")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

}
