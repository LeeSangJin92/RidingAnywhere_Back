package com.lec.sping.repository;

import com.lec.sping.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<User, Long> {
}
