package com.lec.sping.repository;

import com.lec.sping.domain.Auth;
import com.lec.sping.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByAuthorityName(Auth authorityName);
}
