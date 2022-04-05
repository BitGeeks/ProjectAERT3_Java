package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="productsoldoutnotify")
public class ProductSoldOutNotify {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    public viminershopapi.model.User User;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    public Product Product;

    public int quantity;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATETIME")
    public LocalDate Updated_at;
}
