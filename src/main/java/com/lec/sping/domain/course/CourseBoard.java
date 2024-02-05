package com.lec.sping.domain.course;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CourseBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseboard_id;                // 코스 게시판
    private String courseboard_title;           // 코스 게시판 제목
    private String courseboard_context;         // 코스 게시판 내용

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @OneToMany(mappedBy = "courseboard")
    private List<CourseLocation> locationList;
}
