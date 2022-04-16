package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.CouponDonate;

import java.util.List;

public interface CouponDonateRepository extends JpaRepository<CouponDonate, Integer> {
    @Query("SELECT c FROM CouponDonate c WHERE c.User.id = ?1 ORDER BY c.Id DESC")
    public Page<CouponDonate> findByFlagTransfered (int userId, Pageable pageable);

    @Query("SELECT c FROM CouponDonate c WHERE c.Receiver.id = ?1 ORDER BY c.Id DESC")
    public Page<CouponDonate> findByFlagNonTransfered (int userId, Pageable pageable);
}
