package com.wanderways.Repository;

import com.wanderways.Entity.AcmPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcmPaymentRepo extends JpaRepository<AcmPayment, Long> {
    // Additional query methods if needed
}