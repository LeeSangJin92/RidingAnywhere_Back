package com.lec.sping.domain.bike;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class BikeBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikebrand_id;      // 바이크 브랜드 ID
    @NonNull
    private String bikebrand_name;    // 바이크 브랜드 명
}
