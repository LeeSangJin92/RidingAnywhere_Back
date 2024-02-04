package com.lec.sping.domain.crew;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CrewKey implements Serializable {
    private Long crew_id;
    private Long user_id;
}
