package com.lec.sping.service;

import com.fasterxml.classmate.MemberResolver;
import com.lec.sping.config.SecurityUtil;
import com.lec.sping.domain.User;
import com.lec.sping.dto.ProfileUpdateDto;
import com.lec.sping.dto.UserResponseDto;
import com.lec.sping.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findByUserEmail(String userEmail){
        return userRepository.findByUserEmail(userEmail)
                .orElseThrow(()->new RuntimeException("❌정보 요청에 오류가 발생되었습니다"));
    }

    public UserResponseDto getMyInfoBySecurity(){
        return userRepository.findByUserEmail(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(()->new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Transactional
    public User UpdateProfile(ProfileUpdateDto updateData) {
        System.out.println("🛠️유저 데이터 수정 작업중...");
        User afterUser = updateData.getUser();
        afterUser.setUserNickname(updateData.getUserNickname());
        afterUser.setUserName(updateData.getUserName());
        afterUser.setUserPhone(updateData.getUserPhone());
        afterUser.setUserBirthday(updateData.getUserBirthday());
        afterUser.setUserGender(updateData.isUserGender());
        System.out.println("✅유저 데이터 수정 완료");
        return userRepository.save(afterUser);
    }

    @Transactional
    public User UpdateImage(User afteruser, MultipartFile updateImg) throws IOException, SQLException {
        System.out.println("🛠️유저 프로필 이미지 수정중...");
        Blob profile = new javax.sql.rowset.serial.SerialBlob(updateImg.getBytes());
        afteruser.setUserProfile(profile);
        System.out.println(afteruser);
        System.out.println("✅유저 프로필 이미지 수정 완료");
        return userRepository.save(afteruser);
    }
}
