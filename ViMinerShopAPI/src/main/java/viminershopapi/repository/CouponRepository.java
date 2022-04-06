package viminershopapi.repository;

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

    public Coupon findByUserIdAndExpired_atAndCouponCode (int UserId, LocalDate ExpireAt, String couponcode);
}
