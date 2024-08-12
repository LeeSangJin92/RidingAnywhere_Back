package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.repository.RiderBoardRepository;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final RiderBoardRepository riderBoardRepository;

    public void writeBoard(RiderBoard boardData) {
        System.out.println("✏️ 라이더 게시글 작성중");
        riderBoardRepository.save(boardData);
        System.out.println("✅ 라이더 게시글 작성 완료");
    }
}
