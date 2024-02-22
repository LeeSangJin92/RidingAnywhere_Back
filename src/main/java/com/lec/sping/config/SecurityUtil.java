package com.lec.sping.config;

import com.lec.sping.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    private SecurityUtil(){}
    public static String getCurrentUserId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName()==null){
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }
        return authentication.getName();
    }
}
