package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.dto.TokenDto;
import com.lec.sping.dto.UserRequestDto;
import com.lec.sping.dto.UserResponseDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserResponseDto sigup(UserRequestDto requestDto){
        if(userRepository.existsByUserEmail(requestDto.getUserEmail())){
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }
        System.out.println("가입 시도 중...");
        User user = requestDto.toUser(passwordEncoder);
        System.out.println(user);
        return UserResponseDto.of(userRepository.save(user));
    }

    public TokenDto login(UserRequestDto requestDto){
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        System.out.println("유저 찾는 중....");
        System.out.println("매니저빌드 : " + managerBuilder.getObject());
        System.out.println("유저 데이터 : " +authenticationToken );
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("토큰 생성 완료");
        return tokenProvider.generateTokenDto(authentication);
    }
}
