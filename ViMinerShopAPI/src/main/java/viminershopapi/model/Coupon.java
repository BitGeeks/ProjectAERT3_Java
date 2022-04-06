package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="coupon")
public class Coupon {
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getCouponCode() {
        return CouponCode;
    }

    public void setCouponCode(String couponCode) {
        CouponCode = couponCode;
    }

    public viminershopapi.model.User getUser() {
        return User;
    }

    public void setUser(viminershopapi.model.User user) {
        User = user;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getCouponPercent() {
        return CouponPercent;
    }

    public void setCouponPercent(String couponPercent) {
        CouponPercent = couponPercent;
    }

    public String getCouponType() {
        return CouponType;
    }

    public void setCouponType(String couponType) {
        CouponType = couponType;
    }

    public double getMinPrice() {
        return MinPrice;
    }

    public void setMinPrice(double minPrice) {
        MinPrice = minPrice;
    }

    public boolean isActive() {
        return Active;
    }

    public void setActive(boolean active) {
        Active = active;
    }

    public int getCouponLeft() {
        return CouponLeft;
    }

    public void setCouponLeft(int couponLeft) {
        CouponLeft = couponLeft;
    }

    public LocalDate getExpired_at() {
        return Expired_at;
    }

    public void setExpired_at(LocalDate expired_at) {
        Expired_at = expired_at;
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

    private String CouponCode;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private viminershopapi.model.User User;

    private String Description;

    private String CouponPercent;

    private String CouponType;

    private double MinPrice;

    private boolean Active;

    private int CouponLeft;

    @Column(name = "Expired_at", columnDefinition = "DATETIME")
    private LocalDate Expired_at;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
