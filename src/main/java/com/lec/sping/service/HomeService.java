package com.lec.sping.service;

import com.lec.sping.domain.course.CourseBoard;
import com.lec.sping.domain.openboard.OpenBoard;
import com.lec.sping.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class HomeService {

        private final UserRepository userRepository;
        private final CrewRepository crewRepository;
        private final TourRepository tourRepository;
        private final OpenRepository openRepository;
        private final CampingRepository campingRepository;
        private final CourseRepository courseRepository;
}
