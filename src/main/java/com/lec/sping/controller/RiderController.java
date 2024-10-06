package com.lec.sping.controller;

import com.lec.sping.domain.User;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.domain.riderboard.RiderBoardComment;
import com.lec.sping.dto.RiderBoardCommentDto;
import com.lec.sping.jwt.TokenProvider;
import com.lec.sping.service.BoardService;
import com.lec.sping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://riding-anywhere.vercel.app")
//@CrossOrigin
@RestController
@RequestMapping("/RA")
@RequiredArgsConstructor
public class RiderController {

    private final UserService userService;
    private final BoardService boardService;
    private final TokenProvider tokenProvider;

    @PostMapping("/RequestWriteBoard")
    public ResponseEntity<?> writeBoard(@RequestHeader("Authorization") String authTokenHeader, @RequestBody RiderBoard boardData){
        System.out.println("🛜 라이더 게시글 작성 요청 받음");
        String token = authTokenHeader.substring(7);
        User writeUser = userService.findByUserEmail(tokenProvider.parseClaims(token).getSubject());
        boardData.setUser(writeUser);
        boardService.writeBoard(boardData);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/LoadRiderBoard")
    public ResponseEntity<?> loadCrewBoard(){
        System.out.println("🛜 라이더 게시글 로드 요청");
        List<RiderBoard> boardList = boardService.loadAllList();
        System.out.println("✅ 라이더 게시글 로드 완료");
        return new ResponseEntity<>(boardList,HttpStatus.OK);
    }

    @GetMapping("/BoardDetail/Board")
    public ResponseEntity<?> loadBoardDetail(@RequestParam Long boardId){
        System.out.println(boardId + "데이터 디테일 요청");
        RiderBoard resultData = boardService.getLoadgin(boardId);
        System.out.println(resultData);
        return new ResponseEntity<>(resultData,HttpStatus.OK);
    }

    @PostMapping("/BoardDetail/Comment")
    public ResponseEntity<?> createBoardComment(@RequestHeader("Authorization") String authTokenHeader, @RequestBody RiderBoardCommentDto commentData){
        System.out.println("🕹️ 댓글 작성 요청");
        String token = authTokenHeader.substring(7);
        commentData.setWriter_email(tokenProvider.parseClaims(token).getSubject());
        System.out.println(commentData);
        boardService.createComment(commentData);
        System.out.println("✅ 댓글 작성 완료");
     return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/BoardDetail/CommentList")
    public ResponseEntity<?> loadBoardComment(@RequestParam Long board){
        System.out.println("🛜 모든 댓글 조회 요청");
        List<RiderBoardComment> resultList = boardService.findAllComment(board);
        System.out.println("✅ 모든 댓글 조회 완료");
        return new ResponseEntity<>(resultList,HttpStatus.OK);
    }

    @PostMapping("/BoardDetail/CommentReply")
    public ResponseEntity<?> createReply(@RequestHeader("Authorization") String authTokenHeader,@RequestParam Long commentId, @RequestParam Long boardId, @RequestBody String replyContext){
        System.out.println("✏️ 대댓글 작성 요청");
        String token = authTokenHeader.substring(7);
        String userEmail = tokenProvider.parseClaims(token).getSubject();
        boardService.createReply(userEmail, commentId, boardId, replyContext);
        System.out.println("✅ 대댓글 작성 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
