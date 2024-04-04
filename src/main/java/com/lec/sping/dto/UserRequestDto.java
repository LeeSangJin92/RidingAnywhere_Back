package com.lec.sping.dto;

import com.lec.sping.domain.Address;
import com.lec.sping.domain.User;
import com.lec.sping.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String userEmail;       // 유저 이메일
    private String userName;        // 유저 이름
    private String userPhone;       // 유저 연락처
    private String userPassword;    // 유저 패스워드
    private String userNickname;    // 유저 닉네임
    private String userBirthday;    // 유저 생년월일
    private String userAddressCity; // 유저 활동 지역 도시
    private String userAddressTown; // 유저 활동 지역 마을

    public User toUser(PasswordEncoder passwordEncoder){

        return User.builder()
                .userEmail(userEmail)
                .userNickname(userNickname)
                .userPhone(userPhone)
                .userName(userName)
                .userBirthday(userBirthday)
                .userPassword(passwordEncoder.encode(userPassword))
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(userEmail, userPassword);
    }
}
