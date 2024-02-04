package com.lec.sping.domain.crew;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CrewAttendanceKey implements Serializable {

    private Long user_id;
    private Long schedule_id;
}
