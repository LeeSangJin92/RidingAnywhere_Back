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
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OpenCommit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commit_id;                 // 댓글 ID
    private String commit_context;          // 댓글 내용
    private LocalDateTime commit_regdate;   // 댓글 작성일

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "openboard")
    private OpenBoard openBoard;

    @ManyToOne
    @JoinColumn(name = "opencommit")
    private OpenCommit openCommit;

    @OneToMany(mappedBy = "opencommit")
    private List<OpenCommit> openCommitList;
}
