package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import viminershopapi.model.RoleVar;
import viminershopapi.model.User;

@Repository
public interface RoleVarRepository extends JpaRepository<RoleVar, Integer> {
    RoleVar findById (int id);
}
