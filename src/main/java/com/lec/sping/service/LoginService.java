package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LoginService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private AuthenticationManager authenticationManager;


    @Transactional
    public User findByUserEmail(String email){
        return userRepository.findByUserEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + "로 DB에서 찾을 수 없습니다."));
    }

    public void login(User user, HttpServletRequest request) throws Exception{
        String userEmail = user.getUserEmail();
        String userPassword = user.getUserPassword();
        System.out.println("로그인 데이터");
        System.out.println("Email : " + userEmail);
        System.out.println("Password : " + userPassword);

        // 이메일, 패스워드 인증 토큰 생성
        UsernamePasswordAuthenticationToken token
                = new UsernamePasswordAuthenticationToken(userEmail, userPassword);

        // 토근에 요청 정보 등록
        token.setDetails(new WebAuthenticationDetails(request));

        // 토큰을 이용하여 로그인 요청
        Authentication authentication = authenticationManager.authenticate(token);
        System.out.println("인증 여부 : "+authentication.isAuthenticated());

        org.springframework.security.core.userdetails.User loginUser = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        System.out.println("인증된 사용자 : " + loginUser.getUsername());

        // 시큐리티 컨텍스트에 인증된 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
