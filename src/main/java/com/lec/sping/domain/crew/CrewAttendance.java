package com.lec.sping.domain.crew;

import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
public class CrewAttendance {


    @EmbeddedId
    private CrewAttendanceKey attendance_id;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    @MapsId("schedule_fk")
    private CrewSchedule schedule;          // 크루 일정 ID

    @ManyToOne
    @MapsId("user_fk")
    @JoinColumn(name = "user_id")
    private User user;                      // 일정 작성자 ID
}
