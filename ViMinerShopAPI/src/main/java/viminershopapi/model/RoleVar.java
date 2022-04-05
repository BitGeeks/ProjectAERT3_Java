package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class RoleVar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String RoleName;

    public String IsAdmin;

    public String IsSeller;
}
