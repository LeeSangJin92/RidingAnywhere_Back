package com.lec.sping.domain.crew;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewManager {

    @EmbeddedId
    private CrewKey manger_id;              // 크루 관리 ID
    @Column(columnDefinition = "DEFAULT 0")
    private Long crew_cnt;                  // 크루 출석 수
    private LocalDateTime crew_joindate;    // 크루 가입 날짜

    // FK 영역

    @ManyToOne(optional = false)
    @JoinColumn(name = "crew")
    private Crew crew;

    @OneToOne(optional = false)
    @JoinColumn(name = "user")
    private User user;
}
