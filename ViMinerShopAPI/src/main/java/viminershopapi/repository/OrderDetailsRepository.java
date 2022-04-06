package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.OrderDetail;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT COUNT(o) FROM OrderDetail o LEFT JOIN PaymentDetail p ON p.id = o.PaymentDetail.Id WHERE o.User.id = ?1 AND p.Status <> 0")
    long countAllByUserIdAndStatusGood(int id);

    @Query("SELECT o FROM OrderDetail o WHERE o.Id = ?1 AND o.User.id = ?2")
    OrderDetail findByIdAndUserId (int Id, int UserID);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1")
    List<OrderDetail> findByUserId (int UserID);
}
