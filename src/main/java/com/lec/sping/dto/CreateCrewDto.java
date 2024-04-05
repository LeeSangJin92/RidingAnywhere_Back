package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCrewDto {
    private String crew_name;   // 크루 이름
    private String crew_city;   // 크루 활동 도시
    private String crew_town;   // 크로 활동 지역
    private String crew_context;    // 크루 인사말
}
