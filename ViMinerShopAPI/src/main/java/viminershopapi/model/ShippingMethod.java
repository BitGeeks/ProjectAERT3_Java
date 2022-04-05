package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="shippingmethod")
public class ShippingMethod {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String Name;

    public String ShortName;

    public String repairFlag;

    public String salesFlag;

    public String supportFreeShip;

    public String erpCode;

    public String logoUrl;

    public double avgfeeperkm;
}
