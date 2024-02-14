package com.lec.sping.domain.crew;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CrewKey implements Serializable {
    @Column(name = "crew_id")
    private Long crew_fk;

    @Column(name = "user_id")
    private Long user_fk;
}
