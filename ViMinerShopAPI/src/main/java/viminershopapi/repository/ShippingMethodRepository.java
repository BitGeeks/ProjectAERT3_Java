package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.ShippingMethod;

import java.util.List;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Integer> {
    @Query("SELECT s FROM ShippingMethod s WHERE s.Id = ?1")
    ShippingMethod findById(int Id);

    @Query("SELECT s FROM ShippingMethod s")
    List<ShippingMethod> findAll();

    @Query("SELECT s FROM ShippingMethod s WHERE s.repairFlag = '1'")
    List<ShippingMethod> findByRepairFlag();

    @Query("SELECT s FROM ShippingMethod s WHERE s.salesFlag = '1'")
    List<ShippingMethod> findBySalesFlag();
}
