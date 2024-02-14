package com.lec.sping.repository;

import com.lec.sping.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserEmail(String user_email);
}
