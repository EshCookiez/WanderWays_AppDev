
package com.wanderways.Repository;

import com.wanderways.Entity.AcmPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AcmPaymentRepo extends JpaRepository<AcmPayment, Long> {
    List<AcmPayment> findByUserInfoCustomerId(Long customerId);
}