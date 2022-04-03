package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "Product_Id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Product Product;

    public String Alt_Name;

    public String ImageUrl;

    @Column(name = "Created_at", columnDefinition = "DATE")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATE")
    public LocalDate Updated_at;
}
