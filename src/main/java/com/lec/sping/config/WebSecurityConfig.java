package com.lec.sping.config;

import com.lec.sping.jwt.JwtAccessDeniedHandler;
import com.lec.sping.jwt.JwtAuthenticationEntryPoint;
import com.lec.sping.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final TokenProvider tokenProvider;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.httpBasic((basic)-> basic.disable());
        http.csrf((csrf) -> csrf.disable());
        http.sessionManagement((sessionManagement)->sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling((exceptionHandling)->exceptionHandling
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler));
        http.authorizeHttpRequests((authorizeRequests)->authorizeRequests
                .requestMatchers("/RA/Login").permitAll()
                .requestMatchers("/RA/Signup").permitAll()
                .requestMatchers("/RA/SignUp/Email").permitAll()
                .requestMatchers("/RA/BikeModel").permitAll()
                .requestMatchers("/RA/AddBike").permitAll()
                .requestMatchers("/RA/CheckRider").permitAll()
                .anyRequest().authenticated());
        http.apply(new JwtSecurityConfig(tokenProvider));
        return http.build();
    }
}
