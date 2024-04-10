package com.lec.sping.dto;

import com.lec.sping.domain.crew.Crew;
import com.lec.sping.domain.crew.CrewManager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrewManagerDto {
    private Long crewId;
    private String crewName;
    private String crewMaster;
    private List<CrewManager> crewList;
}
