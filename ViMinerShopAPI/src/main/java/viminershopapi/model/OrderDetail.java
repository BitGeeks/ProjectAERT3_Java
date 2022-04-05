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
@Table(name="orderdetails")
public class OrderDetail {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public viminershopapi.model.User User;

    public double SubTotal;

    public double CouponAmount;

    public double DiscountAmount;

    public double Total;

    @OneToOne
    @JoinColumn(name = "Payment_id")
    public PaymentDetail PaymentDetail;

    @ManyToOne
    @JoinColumn(name = "ShippingMethod_id")
    public ShippingMethod ShippingMethod;

    public String ShippingAddress;

    @ManyToOne
    @JoinColumn(name = "Discount_id", nullable = true)
    public Discount Discount;

    @ManyToOne
    @JoinColumn(name = "Coupon_id", nullable = true)
    public Coupon Coupon;

    @Column(nullable = true)
    public String LocationName;

    @Column(nullable = true)
    public String Latitute;

    @Column(nullable = true)
    public String Longitute;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;

    @OneToMany(mappedBy = "OrderDetail")
    List<OrderItem> OrderItems;
}
