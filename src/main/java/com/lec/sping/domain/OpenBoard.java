package com.lec.sping.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class OpenBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long openboard_id;
    private String openboard_title;
    private String openboard_context;
    private Long openboard_viewcnt;
    private LocalDateTime openboard_regdate;
    private String openboard_img;
}
