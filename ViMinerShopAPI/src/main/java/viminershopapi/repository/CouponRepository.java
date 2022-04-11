package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.Coupon;
import viminershopapi.model.ShoppingSession;

import java.time.LocalDate;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    @Query("SELECT s FROM Coupon s WHERE Id = ?1")
    public Coupon findByID(int Id);

    @Query(value="SELECT 1 * FROM 'coupon' WHERE 'user_id' = :UserID AND 'expired_at' > :ExpireAt AND 'coupon_code' = :CouponCode LIMIT 1", nativeQuery = true)
    public Coupon findByUserIdAndExpired_atAndCouponCode (@ApiParam("UserID") int UserID, @ApiParam("ExpireAt") LocalDate ExpireAt, @ApiParam("CouponCode") String CouponCode);

    @Query("SELECT c FROM Coupon c WHERE c.User.id = ?1")
    List<Coupon> findAllByUserId (int userId);

    @Query("SELECT c FROM Coupon c WHERE c.User.id = ?1 AND c.couponLeft <> ?2 AND c.active = ?3 AND c.expired_at >= ?4")
    List<Coupon> findAllByUserIdAndNECouponLeftAndActiveAndExpiredGreater (int userId, int CouponLeft, boolean active, LocalDate GreaterDay);

    @Query("SELECT c FROM Coupon c WHERE c.User.id = ?1 AND c.expired_at <= ?2")
    List<Coupon> findAllByUserIdAndExpiredLower (int userId, LocalDate LowerDay);

    @Query("SELECT c FROM Coupon c WHERE c.User.id = ?1 AND c.expired_at <= ?2")
    Page<Coupon> findAllByUserIdAndExpiredLowerWithPaginate (int userId, LocalDate LowerDay, Pageable pageable);

    @Query("SELECT c FROM Coupon c WHERE c.User.id = ?1 AND c.couponLeft <> ?2 AND c.active = ?3 AND c.expired_at >= ?4")
    Page<Coupon> findAllByUserIdAndNECouponLeftAndActiveAndExpiredGreaterWithPaginate (int userId, int CouponLeft, boolean active, LocalDate GreaterDay, Pageable pageable);
}
