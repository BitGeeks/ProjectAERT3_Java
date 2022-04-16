package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.UserAddress;

import java.util.List;

public interface UserAddressesRepository extends JpaRepository<UserAddress, Integer> {
    @Query("SELECT u FROM UserAddress u")
    public List<UserAddress> findAll();

    @Query("SELECT u FROM UserAddress u WHERE u.Id = ?1")
    public UserAddress findById (int Id);
}
