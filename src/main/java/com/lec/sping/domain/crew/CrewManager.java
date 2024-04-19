package com.lec.sping.domain.crew;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Persistent;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long manger_id;              // 크루 관리 ID
    private Long crew_cnt;                  // 크루 출석 수
    private LocalDateTime crew_joindate;    // 크루 가입 날짜
    private String crew_state;              // 크루 상태(가입 신청, 허가, 거절, 등...)

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    // 크루 가입자
    @JoinColumn(name = "user_id", unique = true)
    @OneToOne(optional = false)
    private User user;

    @PrePersist
    private void setDefult(){
        crew_joindate = LocalDateTime.now();
        crew_cnt = 0L;
    }
}
