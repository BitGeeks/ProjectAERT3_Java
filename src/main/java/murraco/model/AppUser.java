package murraco.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
public class AppUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Integer id;

  @Column(length=63)
  public String FirstName;

  @Column(length=63)
  public String LastName;

  @Size(min = 4, max = 127, message = "Minimum username length: 4 characters")
  @Column(unique = true, nullable = false)
  public String username;

  @Column(length=255)
  public String SocialID;

  @Column(unique = true, nullable = false)
  public String email;

  @Column(length=15)
  public String Telephone;

  public String UserImage;

  @Column(length=11)
  public int LoginFailedCount = 0;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  public byte[] PasswordHash;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  public byte[] PasswordSalt;

  public boolean isSubscribedToMailing;

  @ManyToOne
  @JoinColumn(name = "RoleVar_Id")
  public RoleVar RoleVar;

  public String ReferralCode;

  public String ReferralBy;

  @Column(name = "created_at", columnDefinition = "DATE")
  public LocalDate created_at;

  @Column(name = "updated_at", columnDefinition = "DATE")
  public LocalDate updated_at;

  @ElementCollection(fetch = FetchType.EAGER)
  List<UserAddress> UserAddresss;

//  @ElementCollection(fetch = FetchType.EAGER)
//  List<AppUserRole> appUserRoles;

}
