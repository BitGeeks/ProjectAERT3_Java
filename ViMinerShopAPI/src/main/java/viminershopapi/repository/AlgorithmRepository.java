package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.Algorithm;
import viminershopapi.model.ProductCategory;

import java.util.List;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Integer> {
    @Query(value="SELECT * FROM algorithms WHERE name = ?1 LIMIT 1", nativeQuery = true)
    Algorithm findByName (String name);

    List<Algorithm> findAllById (Integer Id);

    List<Algorithm> findAll ();

    @Query(value = "SELECT * FROM algorithms WHERE id = ?1", nativeQuery = true)
    Algorithm findById (int id);
}
