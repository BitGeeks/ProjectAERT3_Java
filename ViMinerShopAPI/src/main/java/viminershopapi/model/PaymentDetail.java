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

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public double getAmount() {
        return Amount;
    }

    public void setAmount(double amount) {
        Amount = amount;
    }

    public double getProvider() {
        return Provider;
    }

    public void setProvider(double provider) {
        Provider = provider;
    }

    public double getStatus() {
        return Status;
    }

    public void setStatus(double status) {
        Status = status;
    }

    public String getMaxMinesBillID() {
        return MaxMinesBillID;
    }

    public void setMaxMinesBillID(String maxMinesBillID) {
        MaxMinesBillID = maxMinesBillID;
    }

    public String getPaypalID() {
        return PaypalID;
    }

    public void setPaypalID(String paypalID) {
        PaypalID = paypalID;
    }

    public String getReferralBy() {
        return ReferralBy;
    }

    public void setReferralBy(String referralBy) {
        ReferralBy = referralBy;
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
