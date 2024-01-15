package com.lec.sping.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BikeBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikebrand_id;      // 바이크 브랜드 ID
    private String bikebrand_name;  // 바이크 브랜드 이름
}
