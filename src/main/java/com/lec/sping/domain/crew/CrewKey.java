package com.lec.sping.domain.crew;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CrewKey implements Serializable {
    // 크루 ID
    @Column(name = "crew_id")
    private Long crew_fk;
    // 크루 마스터 ID
    @Column(name = "user_id")
    private Long user_fk;
}
