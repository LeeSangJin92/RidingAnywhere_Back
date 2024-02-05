package com.lec.sping.repository;

import com.lec.sping.domain.course.CourseBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseBoard,Long> {
}
