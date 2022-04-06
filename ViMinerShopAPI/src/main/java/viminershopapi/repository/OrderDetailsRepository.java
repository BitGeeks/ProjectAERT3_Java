package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

public interface OrderDetailsRepository extends JpaRepository<UserDetails, Integer> {
    @Query("SELECT COUNT(o) FROM OrderDetails o LEFT JOIN PaymentDetails ON PaymentDetails.id = o.Payment_id WHERE o.name = ?1 AND PaymentDetails.Status <> 0")
    long countAllByUserIdAndStatusGood(int id);
}
