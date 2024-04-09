package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeCrewDto {

    private Long crew_id;
    private String crew_city;
    private String crew_town;
    private String crew_context;
}
