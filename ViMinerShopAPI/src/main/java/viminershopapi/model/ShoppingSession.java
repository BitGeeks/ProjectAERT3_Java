package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name="shoppingsessions")
public class ShoppingSession {
    public ShoppingSession () { }

    public ShoppingSession(viminershopapi.model.User user, double total, LocalDate created_at, LocalDate updated_at) {
        User = user;
        Total = total;
        Created_at = created_at;
        Updated_at = updated_at;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public viminershopapi.model.User getUser() {
        return User;
    }

    public void setUser(viminershopapi.model.User user) {
        User = user;
    }

    public double getTotal() {
        return Total;
    }

    public void setTotal(double total) {
        Total = total;
    }

    public viminershopapi.model.Coupon getCoupon() {
        return Coupon;
    }

    public void setCoupon(viminershopapi.model.Coupon coupon) {
        Coupon = coupon;
    }

    public viminershopapi.model.Discount getDiscount() {
        return Discount;
    }

    public void setDiscount(viminershopapi.model.Discount discount) {
        Discount = discount;
    }

    public List<CartItem> getCartItems() {
        return CartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        CartItems = cartItems;
    }

    public LocalDate getCreated_at() {
        return Created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        Created_at = created_at;
    }

    public LocalDate getUpdated_at() {
        return Updated_at;
    }

    public void setUpdated_at(LocalDate updated_at) {
        Updated_at = updated_at;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private viminershopapi.model.User User;

    private double Total;

    @ManyToOne
    @JoinColumn(name = "Coupon_id")
    private Coupon Coupon;

    @ManyToOne
    @JoinColumn(name = "Discount_id")
    private Discount Discount;

    @OneToMany(mappedBy = "ShoppingSession", fetch = FetchType.EAGER)
    private List<CartItem> CartItems;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
