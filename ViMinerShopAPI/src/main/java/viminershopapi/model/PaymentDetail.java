package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="paymentdetails")
public class PaymentDetail {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public double Amount;

    public double Provider;

    public double Status;

    @Column(nullable = true)
    public String MaxMinesBillID;

    @Column(nullable = true)
    public String PaypalID;

    @Column(nullable = true)
    public String ReferralBy;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
