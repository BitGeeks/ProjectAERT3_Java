package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.Repair;

import java.util.List;

public interface RepairRepository extends JpaRepository<Repair, Integer> {
    @Query("SELECT r FROM Repair r WHERE r.User_id = ?1")
    Page<Repair> findAllByUserIdWithPaginate (int userId, Pageable pageable);

    @Query("SELECT r FROM Repair r WHERE r.User_id = ?1")
    List<Repair> findAllByUserId (int userId);

    @Query("SELECT r.RepairOrder FROM Repair r WHERE r.User_id = ?1 AND r.RepairOrder IS NOT NULL")
    List<Repair> selectRepairOrderByUserIdAndRepairOrderNotNull (int userId);
}
