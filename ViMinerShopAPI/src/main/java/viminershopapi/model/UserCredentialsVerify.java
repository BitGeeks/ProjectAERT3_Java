package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="usercredentialsverify")
public class UserCredentialsVerify {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public User User;

    @Column(nullable = true)
    public String EmailVerifyCode;

    @Column(name = "ResendMailAt", columnDefinition = "DATETIME")
    public LocalDate ResendMailAt;
}
