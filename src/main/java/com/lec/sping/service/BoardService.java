package com.lec.sping.service;

import com.lec.sping.domain.User;
import com.lec.sping.domain.riderboard.RiderBoard;
import com.lec.sping.repository.RiderBoardRepository;
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
}
