package com.lec.sping.domain.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CourseLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long location_id;
    private String location_data;

    // FK 영역

    @ManyToOne
    @JoinColumn(name = "courseboard")
    private CourseBoard courseboard;
}
