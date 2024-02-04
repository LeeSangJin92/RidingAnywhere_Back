package com.lec.sping.domain.openboard;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OpenBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long open_id;              // 라이더 게시판 Id
    private String open_title;         // 라이더 게시판 제목
    private String open_context;       // 라이더 게시판 내용
    private LocalDateTime open_regdate; // 라이더 게시판 작성일
    private String open_type;           // 게시글 타입

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @OneToMany(mappedBy = "openboard")
    @ToString.Exclude
    private List<OpenCommit> openCommit;
}
