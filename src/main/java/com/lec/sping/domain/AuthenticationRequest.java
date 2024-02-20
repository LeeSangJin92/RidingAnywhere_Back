package com.lec.sping.domain;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String userEmail;
    private String password;

}
