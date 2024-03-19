package com.lec.sping.dto;


import com.lec.sping.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileUpdateDto {

    private String userName;        // 유저 이름
    private String userPhone;       // 유저 연락처
    private String userNickname;    // 유저 닉네임
    private String userBirthday;    // 유저 생년월일
    private boolean userGender;     // 유저 성별
    private MultipartFile userProfile; // 유저 프로필 이미지
    private User user;              // 변경하려는 유저 데이터
}
