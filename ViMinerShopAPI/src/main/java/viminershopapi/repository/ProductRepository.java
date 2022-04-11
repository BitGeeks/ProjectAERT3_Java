package viminershopapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import viminershopapi.model.Product;
import viminershopapi.model.UserRecord;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.Id = ?1")
    Product findById (int Id);

    @Query("SELECT p FROM Product p WHERE p.isActive = ?1")
    List<Product> findAllByActive (boolean isActive);

    @Query("SELECT p FROM Product p WHERE p.Name LIKE %?1% AND p.isActive = true")
    Page<Product> findByNameContainingAndActive (String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.Name LIKE %?1%")
    List<Product> findByNameContaining (String keyword);

    @Query("SELECT p FROM Product p WHERE p.Id <> ?3 AND (p.ProductCategory.Id = ?1 OR p.Algorithm.id = ?2)")
    List<Product> findAllByRelated (int categoryid, int algorithmid, int producttargetid);

    @Query("SElECT p FROM Product p WHERE p.isActive = true ORDER BY p.Id DESC")
    List<Product> findAllByNewMiner ();

    @Query("SElECT p FROM Product p WHERE p.isActive = true ORDER BY p.ProductInventory.Hps DESC")
    List<Product> findAllByBestMiner ();
}
