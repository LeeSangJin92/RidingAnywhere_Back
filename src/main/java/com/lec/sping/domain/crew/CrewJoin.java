package com.lec.sping.domain.crew;


import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class CrewJoin  {

    @EmbeddedId
    private CrewKey join_id;        // 크루 가입 ID
    private Boolean join_state;         // 크루 가입 요청 상태

    // FK 영역
    @OneToOne
    @JoinColumn(name = "user")
    private User user;                  // 가입 요청하는 유저

    @ManyToOne
    private Crew crew;                  // 크루

}
