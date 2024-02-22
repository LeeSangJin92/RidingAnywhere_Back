package com.lec.sping.dto;

import com.lec.sping.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String userEmail;
    private String userNickName;

    public static UserResponseDto of(User user){
        return UserResponseDto.builder()
                .userEmail(user.getUserEmail())
                .userNickName(user.getUserNickname())
                .build();
    }
}
