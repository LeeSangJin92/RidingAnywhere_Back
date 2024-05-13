package com.lec.sping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrewBoardDto {
    private Boolean emergencyNote;
    private String boardTitle;
    private String boardContext;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer memberCount;
    private String address;
    private String boardType;
}
