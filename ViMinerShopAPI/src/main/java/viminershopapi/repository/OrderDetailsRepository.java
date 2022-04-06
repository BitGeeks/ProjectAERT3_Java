package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.OrderDetail;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT COUNT(o) FROM OrderDetail o LEFT JOIN PaymentDetail p ON p.id = o.PaymentDetail.Id WHERE o.User.id = ?1 AND p.Status <> 0")
    long countAllByUserIdAndStatusGood(int id);
}
