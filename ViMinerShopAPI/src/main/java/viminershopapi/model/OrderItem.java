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

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public OrderDetail OrderDetail;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    public Product Product;

    public int Quantity;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
