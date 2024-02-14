package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.repository.UserRepository;
import com.sun.tools.jconsole.JConsoleContext;
import com.sun.tools.jconsole.JConsolePlugin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LoginService {

    private final UserRepository userRepository;

    @Transactional
    public User findByUserEmail(String email){
        return userRepository.findByUserEmail(email);
    }
}
