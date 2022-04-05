package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String Name;

    public String Description;

    public String NoteDesc;

    public String DetailDesc;

    public String PaymentDesc;

    public String WarrantyDesc;

    public String SKU;

    @ManyToOne
    @JoinColumn(name = "Category_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ProductCategory ProductCategory;

    @OneToOne
    @JoinColumn(name = "Inventory_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ProductInventory ProductInventory;

    @ManyToOne
    @JoinColumn(name = "Algorithm_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Algorithm Algorithm;

    @OneToMany(mappedBy = "Product")
    List<ProductImage> ProductImages;

    public double Price;

    public double PricePromotion;

    public boolean isActive;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
