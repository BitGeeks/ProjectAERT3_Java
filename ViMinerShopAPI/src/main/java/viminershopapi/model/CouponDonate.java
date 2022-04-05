package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="coupondonate")
public class CouponDonate {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String TransactionId;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private viminershopapi.model.User User;

    @ManyToOne
    @JoinColumn(name = "ReceiverId")
    private viminershopapi.model.User Receiver;

    @ManyToOne
    @JoinColumn(name = "CouponId")
    public Coupon Coupon;

    public String CouponName;

    public String CouponPercent;

    public int Quantity;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
