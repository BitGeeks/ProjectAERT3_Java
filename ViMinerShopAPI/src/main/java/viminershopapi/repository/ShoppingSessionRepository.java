package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.ShoppingSession;

import java.util.List;

public interface ShoppingSessionRepository extends JpaRepository<ShoppingSession, Integer> {
    @Query("SELECT s FROM ShoppingSession s WHERE s.User.id = ?1 ORDER BY s.Id DESC")
    public Page<ShoppingSession> FindLatestSessionByUserId(int UserId, Pageable page);

    @Query("SELECT s FROM ShoppingSession s WHERE s.User.id = ?1 ORDER BY s.Id DESC")
    public List<ShoppingSession> FindLatestSessionByUserId(int UserId);

    @Modifying
    @Query("DELETE FROM ShoppingSession s WHERE s.Id = ?1 AND s.User.id = ?2")
    void deleteByIdAndUserId (int Id, int UserID);
}
