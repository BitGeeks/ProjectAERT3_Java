package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="rolevars")
public class RoleVar {
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getRoleName() {
        return RoleName;
    }

    public void setRoleName(String roleName) {
        RoleName = roleName;
    }

    public String getIsAdmin() {
        return IsAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        IsAdmin = isAdmin;
    }

    public String getIsSeller() {
        return IsSeller;
    }

    public void setIsSeller(String isSeller) {
        IsSeller = isSeller;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String RoleName;

    private String IsAdmin;

    private String IsSeller;
}
