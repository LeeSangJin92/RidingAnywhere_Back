package com.lec.sping.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("com.lec.jwt")
public class JwtProps {

    // 인코딩된 시크릿 키 가져옴
    private String secretKey;
}
