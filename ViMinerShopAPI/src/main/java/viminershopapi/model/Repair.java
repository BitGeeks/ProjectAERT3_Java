package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name="repair")
public class Repair {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public int User_id;

    public int Status;

    public String TicketReason;

    @OneToMany(mappedBy = "Repair")
    List<RepairItem> RepairItems;

    public String TrackingNo;

    public int ShippingLogisticsId;

    public String CustomerAddress;

    @OneToOne
    @JoinColumn(name = "Repair_id", referencedColumnName = "Id")
    public RepairOrder RepairOder;

    @ManyToOne
    @JoinColumn(name = "RepairSiteId")
    public RepairSite RepairSite;

    public int ReturnLogisticsId;

    public String Remark;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
