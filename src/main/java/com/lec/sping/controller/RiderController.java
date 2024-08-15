package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.BoardService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/RA")
@RequiredArgsConstructor
public class RiderController {

    private final UserService userService;
    private final BoardService boardService;
    private final TokenProvider tokenProvider;

    @CrossOrigin
    @PostMapping("/RequestWriteBoard")
    public ResponseEntity<?> writeBoard(@RequestHeader("Authorization") String authTokenHeader, @RequestBody RiderBoard boardData){
        System.out.println("🛜 라이더 게시글 작성 요청 받음");
        String token = authTokenHeader.substring(7);
        User writeUser = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        boardData.setUser(writeUser);
        boardService.writeBoard(boardData);
        return ResponseEntity.ok(null);
    }

    @CrossOrigin
    @GetMapping("/LoadRiderBoard")
    public ResponseEntity<?> loadCrewBoard(){
        System.out.println("🛜 라이더 게시글 로드 요청");
        List<RiderBoard> boardList = boardService.loadAllList();
        System.out.println("✅ 라이더 게시글 로드 완료");
        return new ResponseEntity<>(boardList,HttpStatus.OK);
    }
}
