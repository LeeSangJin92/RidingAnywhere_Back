package com.lec.sping.service;

import com.fasterxml.classmate.MemberResolver;
import com.lec.sping.config.SecurityUtil;
import com.lec.sping.domain.User;
import com.lec.sping.dto.UserResponseDto;
import com.lec.sping.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto getMyInfoBySecurity(){
        return userRepository.findByUserEmail(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(()->new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Transactional
    public UserResponseDto changeUserNickname(String userEmail, String userNickname){
        User user = userRepository.findByUserEmail(userEmail).orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다."));
        user.setUserNickname(userNickname);
        return UserResponseDto.of(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto changeUserPassword(String userEmail, String exPassword, String newPassword){
        User user = userRepository.findByUserEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다."));
        if(!passwordEncoder.matches(exPassword, user.getUserPassword())){
            throw new RuntimeException("비밀번호가 맞지 않습니다.");
        }
        user.setUserPassword(passwordEncoder.encode((newPassword)));
        return UserResponseDto.of(userRepository.save(user));
    }
}
