package viminershopapi.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  User findById (int id);

  User findByUsername(String username);

  User findByEmail(String email);

  @Query("SELECT a FROM a WHERE a.referral_code = ?1")
  List<User> findAllByReferralCode (String refCode);

  @Transactional
  void deleteByUsername(String username);

}
