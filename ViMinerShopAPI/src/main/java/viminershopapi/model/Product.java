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
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getNoteDesc() {
        return NoteDesc;
    }

    public void setNoteDesc(String noteDesc) {
        NoteDesc = noteDesc;
    }

    public String getDetailDesc() {
        return DetailDesc;
    }

    public void setDetailDesc(String detailDesc) {
        DetailDesc = detailDesc;
    }

    public String getPaymentDesc() {
        return PaymentDesc;
    }

    public void setPaymentDesc(String paymentDesc) {
        PaymentDesc = paymentDesc;
    }

    public String getWarrantyDesc() {
        return WarrantyDesc;
    }

    public void setWarrantyDesc(String warrantyDesc) {
        WarrantyDesc = warrantyDesc;
    }

    public String getSKU() {
        return SKU;
    }

    public void setSKU(String SKU) {
        this.SKU = SKU;
    }

    public viminershopapi.model.ProductCategory getProductCategory() {
        return ProductCategory;
    }

    public void setProductCategory(viminershopapi.model.ProductCategory productCategory) {
        ProductCategory = productCategory;
    }

    public viminershopapi.model.ProductInventory getProductInventory() {
        return ProductInventory;
    }

    public void setProductInventory(viminershopapi.model.ProductInventory productInventory) {
        ProductInventory = productInventory;
    }

    public viminershopapi.model.Algorithm getAlgorithm() {
        return Algorithm;
    }

    public void setAlgorithm(viminershopapi.model.Algorithm algorithm) {
        Algorithm = algorithm;
    }

    public List<ProductImage> getProductImages() {
        return ProductImages;
    }

    public void setProductImages(List<ProductImage> productImages) {
        ProductImages = productImages;
    }

    public double getPrice() {
        return Price;
    }

    public void setPrice(double price) {
        Price = price;
    }

    public double getPricePromotion() {
        return PricePromotion;
    }

    public void setPricePromotion(double pricePromotion) {
        PricePromotion = pricePromotion;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String Name;

    private String Description;

    private String NoteDesc;

    private String DetailDesc;

    private String PaymentDesc;

    private String WarrantyDesc;

    private String SKU;

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
    private List<ProductImage> ProductImages;

    private double Price;

    private double PricePromotion;

    private boolean isActive;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
