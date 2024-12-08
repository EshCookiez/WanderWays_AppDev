
package com.wanderways.Repository;

import com.wanderways.Entity.AcmPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcmPaymentRepo extends JpaRepository<AcmPayment, Long> {
}