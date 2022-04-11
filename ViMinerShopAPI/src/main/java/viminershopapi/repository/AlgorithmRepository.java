package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.Algorithm;
import viminershopapi.model.ProductCategory;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Integer> {
    @Query(value="SELECT 1 * FROM 'algorithms' WHERE 'name' = :name LIMIT 1", nativeQuery = true)
    Algorithm findByName (@ApiParam("name") String name);
}
