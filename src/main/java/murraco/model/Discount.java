package murraco.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String Name;

    public String Desc;

    public String Discount_percent;

    public String Discount_type;

    public String Active;

    @Column(name = "Created_at", columnDefinition = "DATE")
    public LocalDate Created_at;

    @Column(name = "Updated_at", columnDefinition = "DATE")
    public LocalDate Updated_at;
}
