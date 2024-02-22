package com.lec.sping.repository;

import com.lec.sping.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUserEmail(String user_email);;

    boolean existsByUserEmail(String email);
}
