package viminershopapi.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import viminershopapi.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  boolean existsByUsername(String Username);

  boolean existsByEmail(String Email);

  User findByUsername(String Username);

  User findByEmail(String Email);

  @Transactional
  void deleteByUsername(String Username);

}
