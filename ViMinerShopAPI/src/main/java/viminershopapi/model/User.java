package viminershopapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@Table(name="users")
public class User {
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFirstName() {
    return FirstName;
  }

  public void setFirstName(String firstName) {
    FirstName = firstName;
  }

  public String getLastName() {
    return LastName;
  }

  public void setLastName(String lastName) {
    LastName = lastName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getSocialID() {
    return SocialID;
  }

  public void setSocialID(String socialID) {
    SocialID = socialID;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getTelephone() {
    return Telephone;
  }

  public void setTelephone(String telephone) {
    Telephone = telephone;
  }

  public String getUserImage() {
    return UserImage;
  }

  public void setUserImage(String userImage) {
    UserImage = userImage;
  }

  public int getLoginFailedCount() {
    return LoginFailedCount;
  }

  public void setLoginFailedCount(int loginFailedCount) {
    LoginFailedCount = loginFailedCount;
  }

  public byte[] getPasswordHash() {
    return PasswordHash;
  }

  public void setPasswordHash(byte[] passwordHash) {
    PasswordHash = passwordHash;
  }

  public byte[] getPasswordSalt() {
    return PasswordSalt;
  }

  public void setPasswordSalt(byte[] passwordSalt) {
    PasswordSalt = passwordSalt;
  }

  public boolean isSubscribedToMailing() {
    return isSubscribedToMailing;
  }

  public void setSubscribedToMailing(boolean subscribedToMailing) {
    isSubscribedToMailing = subscribedToMailing;
  }

  public viminershopapi.model.RoleVar getRoleVar() {
    return RoleVar;
  }

  public void setRoleVar(viminershopapi.model.RoleVar roleVar) {
    RoleVar = roleVar;
  }

  public String getReferralCode() {
    return ReferralCode;
  }

  public void setReferralCode(String referralCode) {
    ReferralCode = referralCode;
  }

  public String getReferralBy() {
    return ReferralBy;
  }

  public void setReferralBy(String referralBy) {
    ReferralBy = referralBy;
  }

  public LocalDate getCreated_at() {
    return created_at;
  }

  public void setCreated_at(LocalDate created_at) {
    this.created_at = created_at;
  }

  public LocalDate getUpdated_at() {
    return updated_at;
  }

  public void setUpdated_at(LocalDate updated_at) {
    this.updated_at = updated_at;
  }

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

  public String getPassword() {
    return Password;
  }

  public void setPassword(String password) {
    Password = password;
  }

  @Column(length=11)
  public int LoginFailedCount = 0;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  public byte[] PasswordHash;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  public byte[] PasswordSalt;

  @Size(min = 2, message = "Độ dài mật khẩu tối thiểu là 2 ký tự")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  public String Password;

  public boolean isSubscribedToMailing;

  @ManyToOne
  @JoinColumn(name = "RoleVar_Id")
  public RoleVar RoleVar;

  public String ReferralCode;

  public String ReferralBy;

  @Column(name = "created_at", columnDefinition = "DATETIME")
  public LocalDate created_at;

  @Column(name = "updated_at", columnDefinition = "DATETIME")
  public LocalDate updated_at;

//  @ElementCollection(fetch = FetchType.EAGER)
//  List<UserAddress> UserAddresss;

//  @ElementCollection(fetch = FetchType.EAGER)
//  List<AppUserRole> appUserRoles;

}
