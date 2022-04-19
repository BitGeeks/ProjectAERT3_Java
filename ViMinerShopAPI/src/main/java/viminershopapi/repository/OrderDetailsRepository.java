package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.OrderDetail;

import java.time.LocalDate;
import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT COUNT(o) FROM OrderDetail o LEFT JOIN PaymentDetail p ON p.Id = o.PaymentDetail.Id WHERE o.User.id = ?1 AND p.Status <> 0")
    long countAllByUserIdAndStatusGood(int id);

    @Query("SELECT o FROM OrderDetail o WHERE o.Id = ?1 AND o.User.id = ?2")
    OrderDetail findByIdAndUserId (int Id, int UserID);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1")
    List<OrderDetail> findByUserId (int UserID);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1 AND o.PaymentDetail.Status = ?2")
    List<OrderDetail> findByUserIdAndPaymentStatus (int userId, int paymentStatus);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1 AND o.Created_at < ?2")
    List<OrderDetail> findByUserIdAndGreaterDay (int userId, LocalDate greaterDay);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1")
    Page<OrderDetail> findByUserIdWithPaginate (int userId, Pageable pageable);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1 AND o.PaymentDetail.Status = ?2")
    Page<OrderDetail> findByUserIdAndPaymentStatusWithPaginate (int userId, int paymentstatus, Pageable pageable);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1 AND o.Created_at >= ?2")
    Page<OrderDetail> findByUserIdAndGreaterDayWithPaginate (int userId, LocalDate greaterDay, Pageable pageable);

    @Query("SELECT o FROM OrderDetail o WHERE o.User.id = ?1 AND o.Coupon.Id IS NOT NULL")
    List<OrderDetail> findAllByUserIdAndCouponIdIsNotNull (int userId);

    @Query("SELECT o.Coupon FROM OrderDetail o WHERE o.User.id = ?1")
    Page<OrderDetail> findAllCouponByUserIdAndCouponIdIsNotNullWithPaginate (int userId, Pageable pageable);

    @Query("SELECT o.Coupon FROM OrderDetail o WHERE o.User.id = ?1")
    List<OrderDetail> findAllCouponByUserIdAndCouponIdIsNotNull (int userId);

    @Query(value = "SELECT * FROM orderdetails WHERE user_id = ?2 AND id = ?1 LIMIT 1", nativeQuery = true)
    OrderDetail findFirstByIdAndUserId (int Id, int userId);
}
