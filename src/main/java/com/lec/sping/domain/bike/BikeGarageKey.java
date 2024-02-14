package com.lec.sping.domain.bike;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class BikeGarageKey implements Serializable {
    private Long user_fk;
    private Long bikemodel_fk;
}
