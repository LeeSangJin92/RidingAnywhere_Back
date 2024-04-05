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

    @EmbeddedId
    private CrewKey manger_id;            // 크루 관리 ID
    private Long crew_cnt;                  // 크루 출석 수
    private LocalDateTime crew_joindate;    // 크루 가입 날짜

    // FK 영역
    @ManyToOne(optional = false)
    @JoinColumn(name = "crew_id")
    @MapsId("crew_fk")
    private Crew crew;

    // 크루 가입자
    @JoinColumn(name = "user_id")
    @OneToOne(optional = false)
    @MapsId("user_fk")
    private User user;

    @PrePersist
    private void setDefult(){
        crew_joindate = LocalDateTime.now();
        crew_cnt = 1L;
    }
}
