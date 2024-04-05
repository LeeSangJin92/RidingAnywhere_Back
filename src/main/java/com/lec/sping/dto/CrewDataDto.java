package com.lec.sping.dto;

import com.lec.sping.domain.crew.Crew;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrewDataDto {
    private Crew crew;
    private String crewMaster;
}
