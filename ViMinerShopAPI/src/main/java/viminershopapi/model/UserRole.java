package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// Không sử dụng
@Entity
@Data
@NoArgsConstructor
@Table(name="userroles")
public class UserRole {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    public User User;

    public int UserDefine;

//    public RoleVar RoleVar;
}
