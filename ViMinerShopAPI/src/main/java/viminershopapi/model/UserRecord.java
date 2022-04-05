package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name="userrecord")
public class UserRecord {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public User User;

    public String ActivityName;

    @Column(nullable = true)
    public String UserAgent;

    public int loglevel;

    public String ip;

    @Column(name = "Created_at", columnDefinition = "DATETIME")
    public LocalDate Created_at;
}
