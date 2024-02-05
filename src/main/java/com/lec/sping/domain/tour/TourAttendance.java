package com.lec.sping.domain.tour;

import com.lec.sping.domain.User;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TourAttendance {

    @EmbeddedId
    private TourKey tourattendance_id;      // 투어 참여 ID
    private boolean tourcheckout;           // 투어 참석 허락

    // FK 영역
    @ManyToOne
    @JoinColumn(name = "tourboard")
    private TourBoard tourboard;            // 참석하는 투어 정보

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;                      // 참석 유저 정보


}
