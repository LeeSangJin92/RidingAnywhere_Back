package com.lec.sping.service;


import com.lec.sping.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginService {
        private final LoginRepository loginRepository;
}
