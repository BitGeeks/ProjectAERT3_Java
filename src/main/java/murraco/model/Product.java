package murraco.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String Name;

    public String Desc;

    public String NoteDesc;

    public String DetailDesc;

    public String PaymentDesc;

    public String WarrantyDesc;

    public String SKU;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ProductCategory ProductCategory;

    @ManyToOne
    @JoinColumn(name = "Inventory_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ProductInventory ProductInventory;

    @ManyToOne
    @JoinColumn(name = "Algorithm_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Algorithm Algorithm;

    @ElementCollection(fetch = FetchType.EAGER)
    List<ProductImage> ProductImages;

    public double Price;

    public double PricePromotion;

    public boolean isActive;

    @Column(name = "Created_at", columnDefinition = "DATE")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATE")
    public LocalDate Updated_at;
}
