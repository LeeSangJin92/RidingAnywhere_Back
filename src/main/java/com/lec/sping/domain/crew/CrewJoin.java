package com.lec.sping.domain.crew;


import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CrewJoin  {

    @EmbeddedId
    private CrewKey join_id;        // 크루 가입 ID
    private Boolean join_state;         // 크루 가입 요청 상태

    // FK 영역
    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId("user_fk")
    private User user;                  // 가입 요청하는 유저

    @ManyToOne
    @MapsId("crew_fk")
    @JoinColumn(name = "crew_id")
    private Crew crew;                  // 크루

}
