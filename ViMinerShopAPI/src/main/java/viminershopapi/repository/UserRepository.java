package viminershopapi.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import viminershopapi.model.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Integer> {

  boolean existsByUsername(String Username);

  boolean existsByEmail(String Email);

  AppUser findByUsername(String Username);

  AppUser findByEmail(String Email);

  @Transactional
  void deleteByUsername(String Username);

}
