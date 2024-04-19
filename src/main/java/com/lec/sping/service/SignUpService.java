package com.lec.sping.service;

import com.lec.sping.domain.Auth;
import com.lec.sping.domain.Authority;
import com.lec.sping.domain.User;
import com.lec.sping.repository.AuthorityRepository;
import com.lec.sping.repository.UserRepository;
import jakarta.persistence.Transient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SignUpService {

    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    @Transient
    public User signUp(User user) {
        if(null!=userRepository.findByUserEmail(user.getUserEmail())){
            throw new DuplicateKeyException("이미 존재하는 이메일입니다.");
            }
            user.setAuthorityId(authorityRepository.findById(1L)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 권한 입니다.")));
        return userRepository.save(changed(user));
    }

    public User changed(User user){
        String userPw = user.getUserPassword();
        String encodePw = passwordEncoder.encode(userPw);
        Authority userAuth = new Authority();
        userAuth.setAuthority_id(1L);
        userAuth.setAuthorityName(Auth.ROLE_RA_Member);
        user.setAuthorityId(userAuth);      // 기본 권한 추가("Rider")
        user.setUserPassword(encodePw);     // 비밀번호 인코딩 후 저장
        return user;
    }
}
