package murraco.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class ProductInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public int Quantity;

    public String Flag;

    public double Hps;

    public double weight;

    public String ShippingInfo;

    @Column(name = "Created_at", columnDefinition = "DATE")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATE")
    public LocalDate Updated_at;
}
