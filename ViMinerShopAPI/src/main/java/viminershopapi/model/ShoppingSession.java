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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private viminershopapi.model.User User;

    public double Total;

    @ManyToOne
    @JoinColumn(name = "Coupon_id")
    private Coupon Coupon;

    @ManyToOne
    @JoinColumn(name = "Discount_id")
    private Discount Discount;

    @OneToMany(mappedBy = "ShoppingSession", fetch = FetchType.EAGER)
    List<CartItem> CartItems;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
