package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            return userRepository.findByUserEmail(username)
                    .map(this::createUserDetails)
                    .orElseThrow(() -> new UsernameNotFoundException(username + "을 DB에서 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(User user){
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getAuthorityId().toString());
        return new org.springframework.security.core.userdetails.User(
                String.valueOf(user.getUserEmail()),
                user.getUserPassword(),
                Collections.singleton(grantedAuthority)
        );
    }

}
