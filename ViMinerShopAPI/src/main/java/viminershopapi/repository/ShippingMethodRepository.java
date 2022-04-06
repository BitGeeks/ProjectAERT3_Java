package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.ShippingMethod;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Integer> {
    @Query("SELECT s FROM ShippingMethod s WHERE Id = ?1")
    ShippingMethod findById(int Id);
}
