package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.domain.riderboard.RiderBoardComment;
import com.lec.sping.dto.RiderBoardCommentDto;
import com.lec.sping.repository.RiderBoardCommentRepository;
import com.lec.sping.repository.RiderBoardRepository;
import com.lec.sping.repository.UserRepository;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final RiderBoardRepository riderBoardRepository;
    private final RiderBoardCommentRepository riderBoardCommentRepository;
    private final UserRepository userRepository;

    public void writeBoard(RiderBoard boardData) {
        System.out.println("✏️ 라이더 게시글 작성 중....");
        riderBoardRepository.save(boardData);
        System.out.println("✅ 라이더 게시글 작성 완료");
    }

    public List<RiderBoard> loadAllList() {
        System.out.println("🔎 라이더 게시글 가져오는 중...");
        List<RiderBoard> resultList = riderBoardRepository.findAll(Sort.by(Sort.Direction.DESC,"boardRegdate"));
        System.out.println("✅ 라이더 게시글 로드 완료");
        return resultList;
    }

    public RiderBoard getLoadgin(Long boardId) {
        System.out.println(boardId);
        return riderBoardRepository.findById(boardId).orElseThrow(()-> new NullPointerException("⚠️ 찾으려는 게시글이 없습니다."));
    }

    public void createComment(RiderBoardCommentDto commentData) {
        System.out.println("✏️ 라이더 게시 댓글 작성 중...");
        RiderBoardComment createData = new RiderBoardComment();
        User commentWriter = userRepository.findByUserEmail(commentData.getWriter_email()).orElseThrow(()-> new NullPointerException("🚨 존재하지 않는 유저 입니다."));
        RiderBoard targetBoard = riderBoardRepository.findById(commentData.getBoard_id()).orElseThrow(()-> new NullPointerException("🚨 존재하지 않는 게시글 입니다."));
        createData.setUser(commentWriter);
        createData.setCommentContext(commentData.getComment_context());
        createData.setRiderBoard(targetBoard);
        riderBoardCommentRepository.save(createData);
    }

    public List<RiderBoardComment> findAllComment(Long boardId) {
        System.out.println("🔎 라이더 게시글 댓글 조회 중...");
        RiderBoard targetBoard = riderBoardRepository.findById(boardId).orElseThrow(()->new NullPointerException("🚨 존재하지 않는 게시판입니다."));
        List<RiderBoardComment> resultList = riderBoardCommentRepository.findAllByRiderBoard(targetBoard);
        return resultList;
    }

    public void createReply(String userEmail, Long commentId, Long boardId, String replyContext) {
        System.out.println("✏️ 대댓글 작성 중....");
        User replyWriter = userRepository.findByUserEmail(userEmail).orElseThrow(()->new NullPointerException("🚨 존재하지 않은 유저입니다."));
        RiderBoard riderBoard = riderBoardRepository.findById(boardId).orElseThrow(()->new NullPointerException("🚨 존재하지 않은 게시글입니다."));
        RiderBoardComment comment = riderBoardCommentRepository.findById(commentId).orElseThrow(()->new NullPointerException("🚨 존재하지 않은 댓글입니다."));
        RiderBoardComment reply = new RiderBoardComment();
        reply.setUser(replyWriter);
        reply.setRiderBoard(riderBoard);
        reply.setCommentReply(comment);
        reply.setCommentContext(replyContext);
        riderBoardCommentRepository.save(reply);
    }
}
