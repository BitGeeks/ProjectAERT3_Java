package murraco.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ShoppingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private AppUser User;

    public double Total;

    @ManyToOne
    @JoinColumn(name = "Coupon_id")
    private Coupon Coupon;

    @ManyToOne
    @JoinColumn(name = "Discount_id")
    private Discount Discount;

//    @ElementCollection(fetch = FetchType.EAGER)
//    List<CartItem> CartItems;

    @Column(name = "Created_at", columnDefinition = "DATE")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATE")
    public LocalDate Updated_at;
}
