package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
