package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import viminershopapi.model.ProductCategory;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    @Query(value="SELECT 1 * FROM 'productcategories' WHERE 'slug' = :slug LIMIT 1", nativeQuery = true)
    ProductCategory findBySlug (@ApiParam("slug") String slug);

    @Query(value="SELECT 1 * FROM 'productcategories' WHERE 'name' = :name LIMIT 1", nativeQuery = true)
    ProductCategory findByName (@ApiParam("name") String name);
}
