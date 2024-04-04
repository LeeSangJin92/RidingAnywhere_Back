package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.dto.TokenDto;
import com.lec.sping.dto.UserRequestDto;
import com.lec.sping.dto.UserResponseDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.repository.AddressRepository;
import com.lec.sping.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
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
    private final AddressRepository addressRepository;
    private final TokenProvider tokenProvider;

    public UserResponseDto sigup(UserRequestDto requestDto){
        if(userRepository.existsByUserEmail(requestDto.getUserEmail())){
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }
        System.out.println("가입 시도 중...");
        User user = requestDto.toUser(passwordEncoder);
        user.setAddress(addressRepository.findByCityAndTown(requestDto.getUserAddressCity(),requestDto.getUserAddressTown()).orElseThrow(()->new RuntimeException("❌해당하는 지역이 없습니다.")));
        System.out.println(user);
        return UserResponseDto.of(userRepository.save(user));
    }

    public TokenDto login(UserRequestDto requestDto){

        userRepository.findByUserEmail(requestDto.getUserEmail()).orElseThrow(()->new NullPointerException("가입된 회원정보가 아닙니다."));
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }
}
