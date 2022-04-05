package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.RoleVar;
import viminershopapi.model.User;

public interface RoleVarRepository extends JpaRepository<RoleVar, Integer> {
    RoleVar findById (int id);
}
