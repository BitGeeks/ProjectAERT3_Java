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
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int user_id) {
        User_id = user_id;
    }

    public int getStatus() {
        return Status;
    }

    public void setStatus(int status) {
        Status = status;
    }

    public String getTicketReason() {
        return TicketReason;
    }

    public void setTicketReason(String ticketReason) {
        TicketReason = ticketReason;
    }

    public List<RepairItem> getRepairItems() {
        return RepairItems;
    }

    public void setRepairItems(List<RepairItem> repairItems) {
        RepairItems = repairItems;
    }

    public RepairOrder getRepairOrder() {
        return RepairOrder;
    }

    public void setRepairOrder(RepairOrder repairOrder) {
        RepairOrder = repairOrder;
    }

    public String getTrackingNo() {
        return TrackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        TrackingNo = trackingNo;
    }

    public int getShippingLogisticsId() {
        return ShippingLogisticsId;
    }

    public void setShippingLogisticsId(int shippingLogisticsId) {
        ShippingLogisticsId = shippingLogisticsId;
    }

    public String getCustomerAddress() {
        return CustomerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        CustomerAddress = customerAddress;
    }

    public viminershopapi.model.RepairSite getRepairSite() {
        return RepairSite;
    }

    public void setRepairSite(viminershopapi.model.RepairSite repairSite) {
        RepairSite = repairSite;
    }

    public int getReturnLogisticsId() {
        return ReturnLogisticsId;
    }

    public void setReturnLogisticsId(int returnLogisticsId) {
        ReturnLogisticsId = returnLogisticsId;
    }

    public String getRemark() {
        return Remark;
    }

    public void setRemark(String remark) {
        Remark = remark;
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

    private int User_id;

    private int Status;

    private String TicketReason;

    @OneToMany(mappedBy = "Repair")
    private List<RepairItem> RepairItems;

    @OneToOne(mappedBy = "Repair")
    private RepairOrder RepairOrder;

    private String TrackingNo;

    private int ShippingLogisticsId;

    private String CustomerAddress;

    @ManyToOne
    @JoinColumn(name = "RepairSiteId")
    private RepairSite RepairSite;

    private int ReturnLogisticsId;

    private String Remark;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
