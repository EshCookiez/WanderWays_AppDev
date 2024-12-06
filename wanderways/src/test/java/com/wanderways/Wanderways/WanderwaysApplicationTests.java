package com.wanderways.Wanderways;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@SpringBootTest
@ComponentScan(basePackages = "com.wanderways.util")
class WanderwaysApplicationTests {

    @Test
    void contextLoads() {
        // This test will fail if the application context cannot start
    }
}