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
    public PaymentDetail(double amount, double provider, double status, String referralBy, LocalDate created_at, LocalDate updated_at) {
        Amount = amount;
        Provider = provider;
        Status = status;
        ReferralBy = referralBy;
        Created_at = created_at;
        Updated_at = updated_at;
    }

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private double Amount;

    private double Provider;

    private double Status;

    @Column(nullable = true)
    private String MaxMinesBillID;

    @Column(nullable = true)
    private String PaypalID;

    @Column(nullable = true)
    private String ReferralBy;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
