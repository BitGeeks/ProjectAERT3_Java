package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="useraddresses")
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User User;

    public String Address;

    public String Street_name;

    public String City;

    public String Postal_code;

    public String Country;

    public String Telephone;

    public String Mobile;
}
