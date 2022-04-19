package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.PaymentDetail;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Integer> {
    @Query(value = "SELECT * FROM paymentdetails WHERE id = ?1", nativeQuery = true)
    PaymentDetail findFirstById (int Id);
}
