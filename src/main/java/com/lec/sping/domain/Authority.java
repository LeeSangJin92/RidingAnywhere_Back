package com.lec.sping.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authority_id;          // 권한 ID
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Auth authority_name;      // 권한명

    //FK 영역

    @OneToMany(mappedBy = "authorityId")
    @JsonIgnore
    @ToString.Exclude
    private List<User> user;            // 유저
}
