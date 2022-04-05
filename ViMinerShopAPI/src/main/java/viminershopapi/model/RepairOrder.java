package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="repairorder")
public class RepairOrder {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @OneToOne
    @JoinColumn(name = "Repair_id")
    public Repair Repair;

    @OneToOne
    @JoinColumn(name = "Payment_id")
    public PaymentDetail PaymentDetail;

    public int Status;

    public int Provider;

    public double Price;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
