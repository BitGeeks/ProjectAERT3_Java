package viminershopapi.dto;

import java.util.List;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import viminershopapi.model.AppUserRole;

@Data
@NoArgsConstructor
public class UserDataDTO {
  
  @ApiModelProperty(position = 0)
  private String firstname;
  @ApiModelProperty(position = 1)
  private String lastname;
  @ApiModelProperty(position = 2)
  private String username;
  @ApiModelProperty(position = 3)
  private String email;
  @ApiModelProperty(position = 4)
  private String password;
  @ApiModelProperty(position = 5)
  private String refcode;

}
