package viminershopapi.repository;

import io.swagger.annotations.ApiParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.CartItem;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    @Query("SELECT c FROM CartItem c WHERE c.ShoppingSession.Id = ?1")
    List<CartItem> FindCartItemBySessionId (int SessionId);

    @Query("SELECT c FROM CartItem c WHERE c.ShoppingSession.Id = ?1 AND c.Id = ?2")
    CartItem FindCartItemToUpdateBySessionAndId (int SessionId, int Id);

    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.ShoppingSession.Id = ?1 AND c.Id = ?2")
    void deleteBySessionIdAndId (int SessionId, int Id);

    @Query("SELECT c FROM CartItem c WHERE c.Id = ?1")
    CartItem findById(int Id);

    @Query(value="SELECT * FROM cartitems WHERE session_id = :SessionID AND product_id = :ProductID LIMIT 1", nativeQuery = true)
    CartItem findFirstByShoppingSessionIdAndProductId (@ApiParam("SessionID") int SessionID, @ApiParam("ProductID") int ProductID);

//    CartItem findFirstByShoppingSessionIdAndProductId (int SessionId, int ProductId);
}
