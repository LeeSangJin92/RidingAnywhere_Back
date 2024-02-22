package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequestDto {
    private String userEmail;
    private String exUserPassword;
    private String newUserPassword;
}
