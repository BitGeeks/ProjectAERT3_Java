package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
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
}
