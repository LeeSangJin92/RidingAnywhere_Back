package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.service.EmailService;
import com.lec.sping.service.LoginService;
import com.lec.sping.service.SignUpService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController("/")
public class PageController {

        private final LoginService loginService;
        private final SignUpService signUpService;
        private final EmailService emailService;

        @CrossOrigin
        @PostMapping("/RA/Login")
        public ResponseEntity<?> findByUserEmail(@RequestBody User user){
                User loginUser = loginService.findByUserEmail(user.getUserEmail());
                if(loginUser==null) return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);      // 이메일 없을 경우 404 리턴
                else if(!user.getUserPassword().equals(loginUser.getUserPassword()))
                        return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);            // 비밀번호 다를 경우 406 리턴
                else return new ResponseEntity<>(loginUser,HttpStatus.OK);                              // 모두 정확하다면 200 리턴
        }

        @CrossOrigin
        @PostMapping("/RA/SignUp")
        public ResponseEntity<?> save(@RequestBody User user){
                try {
                        return new ResponseEntity<>(signUpService.signUp(user),HttpStatus.CREATED);     // 회원가입 성공 시 201
                } catch (IllegalArgumentException e){
                        return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);                    // 정상적이지 않은 권한 412
                } catch (DuplicateKeyException e){
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);                            // 이미 가입된 유저 400
                }
        }

        @CrossOrigin
        @PostMapping("/RA/SignUp/Email")
        public ResponseEntity<String> check(@RequestBody String email) throws Exception{
                System.out.println("받은 이메일 주소 : "+ email);
                String code = emailService.sendSimpleMessage(email);
                System.out.println("인증코드 : "+code);
                return new ResponseEntity<>(code, HttpStatus.OK);
        }
}
