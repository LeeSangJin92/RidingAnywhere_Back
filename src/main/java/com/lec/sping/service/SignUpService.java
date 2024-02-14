package com.lec.sping.service;

import com.lec.sping.domain.Authority;
import com.lec.sping.domain.User;
import com.lec.sping.repository.AuthorityRepository;
import com.lec.sping.repository.UserRepository;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Transient;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SignUpService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    @Transient
    public User signUp(User user) {
        if(null!=userRepository.findByUserEmail(user.getUserEmail())){
            throw new DuplicateKeyException("이미 존재하는 이메일입니다.");
            }
            user.setAuthorityId(authorityRepository.findById(1L)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 권한 입니다.")));
        return userRepository.save(user);


    }
}
