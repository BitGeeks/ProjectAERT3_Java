package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import viminershopapi.model.UserRecord;

@Repository
public interface UserRecordRepository extends JpaRepository<UserRecord, Integer> {
    @Query("SELECT u FROM UserRecord u WHERE u.id = ?1")
    Page<UserRecord> findByIdContaining(int id, Pageable pageable);

    @Query("SELECT COUNT(u) FROM UserRecord u WHERE u.name = ?1")
    long countAllByUserId(int id);
}
