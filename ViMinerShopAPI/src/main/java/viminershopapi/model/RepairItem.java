package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="repairitem")
public class RepairItem {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "RepairId")
    public Repair Repair;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    public Product Product;

    public int Quantity;

    public String Remark;
}
