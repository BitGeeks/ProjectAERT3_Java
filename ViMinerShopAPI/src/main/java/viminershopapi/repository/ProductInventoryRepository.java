package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.ProductInventory;

public interface ProductInventoryRepository extends JpaRepository<ProductInventory, Integer> {
}
