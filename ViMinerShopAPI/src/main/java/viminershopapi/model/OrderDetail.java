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

    public double getSubTotal() {
        return SubTotal;
    }

    public void setSubTotal(double subTotal) {
        SubTotal = subTotal;
    }

    public double getCouponAmount() {
        return CouponAmount;
    }

    public void setCouponAmount(double couponAmount) {
        CouponAmount = couponAmount;
    }

    public double getDiscountAmount() {
        return DiscountAmount;
    }

    public void setDiscountAmount(double discountAmount) {
        DiscountAmount = discountAmount;
    }

    public double getTotal() {
        return Total;
    }

    public void setTotal(double total) {
        Total = total;
    }

    public viminershopapi.model.PaymentDetail getPaymentDetail() {
        return PaymentDetail;
    }

    public void setPaymentDetail(viminershopapi.model.PaymentDetail paymentDetail) {
        PaymentDetail = paymentDetail;
    }

    public viminershopapi.model.ShippingMethod getShippingMethod() {
        return ShippingMethod;
    }

    public void setShippingMethod(viminershopapi.model.ShippingMethod shippingMethod) {
        ShippingMethod = shippingMethod;
    }

    public String getShippingAddress() {
        return ShippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        ShippingAddress = shippingAddress;
    }

    public viminershopapi.model.Discount getDiscount() {
        return Discount;
    }

    public void setDiscount(viminershopapi.model.Discount discount) {
        Discount = discount;
    }

    public viminershopapi.model.Coupon getCoupon() {
        return Coupon;
    }

    public void setCoupon(viminershopapi.model.Coupon coupon) {
        Coupon = coupon;
    }

    public String getLocationName() {
        return LocationName;
    }

    public void setLocationName(String locationName) {
        LocationName = locationName;
    }

    public String getLatitute() {
        return Latitute;
    }

    public void setLatitute(String latitute) {
        Latitute = latitute;
    }

    public String getLongitute() {
        return Longitute;
    }

    public void setLongitute(String longitute) {
        Longitute = longitute;
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

    public List<OrderItem> getOrderItems() {
        return OrderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        OrderItems = orderItems;
    }

    public double getShippingAmount() {
        return shippingAmount;
    }

    public void setShippingAmount(double shippingAmount) {
        this.shippingAmount = shippingAmount;
    }

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User User;

    private double SubTotal;

    private double CouponAmount;

    private double DiscountAmount;

    private double Total;

    @OneToOne
    @JoinColumn(name = "Payment_id")
    private PaymentDetail PaymentDetail;

    @ManyToOne
    @JoinColumn(name = "ShippingMethod_id")
    private ShippingMethod ShippingMethod;

    private String ShippingAddress;

    @ManyToOne
    @JoinColumn(name = "Discount_id", nullable = true)
    private Discount Discount;

    private double shippingAmount;

    @ManyToOne
    @JoinColumn(name = "Coupon_id", nullable = true)
    private Coupon Coupon;

    @Column(nullable = true)
    private String LocationName;

    @Column(nullable = true)
    private String Latitute;

    @Column(nullable = true)
    private String Longitute;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;

    @OneToMany(mappedBy = "OrderDetail")
    private List<OrderItem> OrderItems;
}
