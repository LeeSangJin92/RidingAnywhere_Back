package com.lec.sping.domain.camping;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CampingKey implements Serializable {
    private Long campingboard_id;
    private Long user_id;
}
