package com.lec.sping.domain.bike;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class BikeBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikebrand_id;      // 바이크 브랜드 ID
    @Column(nullable = false)
    private String bikebrand_name;    // 바이크 브랜드명
    private String bikebrand_logo;    // 바이크 로고 파일명
}