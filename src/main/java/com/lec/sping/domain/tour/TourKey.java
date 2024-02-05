package com.lec.sping.domain.tour;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class TourKey implements Serializable {
    private Long tourboard_id;
    private Long user_id;

}
