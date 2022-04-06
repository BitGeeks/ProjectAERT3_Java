package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="orderitems")
public class OrderItem {
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public viminershopapi.model.OrderDetail getOrderDetail() {
        return OrderDetail;
    }

    public void setOrderDetail(OrderDetail orderDetail) {
        OrderDetail = orderDetail;
    }

    public viminershopapi.model.Product getProduct() {
        return Product;
    }

    public void setProduct(Product product) {
        Product = product;
    }

    public int getQuantity() {
        return Quantity;
    }

    public void setQuantity(int quantity) {
        Quantity = quantity;
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

    @ManyToOne
    @JoinColumn(name = "Order_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private OrderDetail OrderDetail;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    private Product Product;

    private int Quantity;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    private LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    private LocalDate Updated_at;
}
