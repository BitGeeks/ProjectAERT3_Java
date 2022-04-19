package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import viminershopapi.model.ProductCategory;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    @Query(value="SELECT * FROM productcategories WHERE slug = ?1 LIMIT 1", nativeQuery = true)
    ProductCategory findBySlug (String slug);

    @Query(value="SELECT * FROM productcategories WHERE name = ?1 LIMIT 1", nativeQuery = true)
    ProductCategory findByName (String name);

    @Query (value= "SELECT * FROM productcategories WHERE id = ?1 LIMIT 1", nativeQuery = true)
    ProductCategory findById (int id);
}
