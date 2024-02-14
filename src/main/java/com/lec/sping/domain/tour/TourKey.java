package com.lec.sping.domain.tour;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class TourKey implements Serializable {
    private Long tourboard_id;      // 투어 게시판 ID
    private Long user_id;           // 게시판 작성자 ID

}
