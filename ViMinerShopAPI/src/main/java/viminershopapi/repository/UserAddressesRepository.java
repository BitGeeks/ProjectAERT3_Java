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

    @Query("SELECT u FROM UserAddress u WHERE u.Id = ?1 AND u.User.id = ?2")
    public UserAddress findByIdAndUserId (int Id, int UserId);

    @Query(value = "SELECT * FROM useraddresses WHERE user_id = ?1 LIMIT 1", nativeQuery = true)
    public UserAddress findFirstByUserId (int UserId);

    @Query(value = "SELECT * FROM useraddresses WHERE address = ?1 AND street_name = ?2 AND user_id = ?3", nativeQuery = true)
    public UserAddress findFirstByAddressAndStreetNameAndUserId (String address, String street_name, int UserId);

    @Query(value = "SELECT * FROM useraddresses WHERE is_default = true AND user_id = ?1 LIMIT 1", nativeQuery = true)
    public UserAddress findFirstByDefaultAndUserId (int UserId);

    @Query(value = "SELECT * FROM useraddresses WHERE id = ?2 AND user_id = ?1 LIMIT 1", nativeQuery = true)
    public UserAddress findFirstByUserIdAndId (int UserId, int Id);

    void deleteById (int Id);
}
