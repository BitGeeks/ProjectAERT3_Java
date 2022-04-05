package viminershopapi.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import viminershopapi.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  User findByUsername(String username);

  User findByEmail(String email);

  @Transactional
  void deleteByUsername(String username);

}
