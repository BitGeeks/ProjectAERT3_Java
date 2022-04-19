package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.ProductImage;

public interface ProductImagesRepository extends JpaRepository<ProductImage, Integer> {
    @Query(value = "SELECT * FROM productimages WHERE product_id = ?1 AND image_url = ?2 LIMIT 1", nativeQuery = true)
    ProductImage findFirstByProductIdAndImageUrl (int productId, String imageUrl);
}
