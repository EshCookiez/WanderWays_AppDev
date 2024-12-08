package com.wanderways.Wanderways;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.wanderways.Repository")
@EntityScan(basePackages = "com.wanderways.Entity")
@ComponentScan(basePackages = {"com.wanderways"}) 
@SpringBootApplication(scanBasePackages = {"Controller","Service","Entity", "Repository"})
public class WanderwaysApplication {

    public static void main(String[] args) {
        SpringApplication.run(WanderwaysApplication.class, args);
    }
}
