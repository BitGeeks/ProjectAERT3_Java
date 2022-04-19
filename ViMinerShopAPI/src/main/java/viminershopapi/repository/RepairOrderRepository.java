package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.RepairOrder;

public interface RepairOrderRepository extends JpaRepository<RepairOrder, Integer> {

}
