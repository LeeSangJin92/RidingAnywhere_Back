package com.lec.sping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.lec.sping")
public class RidingAnywhereApplication {

    public static void main(String[] args) {
        SpringApplication.run(RidingAnywhereApplication.class, args);
    }

}
