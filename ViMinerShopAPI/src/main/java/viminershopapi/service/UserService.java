package viminershopapi.service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.context.ApplicationContextException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;
import viminershopapi.dto.users.PaginateRecordModel;
import viminershopapi.dto.users.UpdateModel;
import viminershopapi.dto.users.UserPoint;
import viminershopapi.helper.stringHelper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import viminershopapi.exception.CustomException;
import viminershopapi.model.User;
import viminershopapi.model.UserRecord;
import viminershopapi.repository.*;
import viminershopapi.security.JwtTokenProvider;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final RoleVarRepository roleVarRepository;
  private final UserRecordRepository userRecordRepository;
  private final OrderDetailsRepository orderDetailsRepository;
  private final PasswordEncoder passwordEncoder;
  private final BCryptPasswordEncoder encoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final AuthenticationManager authenticationManager;
  private final stringHelper string = new stringHelper();

  public Object signin(String username, String password) {
    User user = null;
    try {
      User usertest = userRepository.findByEmail(username);

      if (usertest != null)
        username = usertest.getUsername();

//      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      user = userRepository.findByUsername(username);

      if (user == null)
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Đã có lỗi xảy ra, vui lòng thử phương thức khác");

      if (user.getRoleVar() != null && user.getRoleVar().getId() == 3) throw new CustomException("Tài khoản này đã bị gắn cờ!", HttpStatus.BAD_REQUEST);

      if (!encoder.matches(password, user.Password))
        throw new CustomException("Tên tài khoản hoặc email hoặc mật khẩu không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY);
//      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
//        return null;

      // Record service?

      return jwtTokenProvider.createToken(user);
    } catch (AuthenticationException e) {
      throw new CustomException("Địa chỉ email/mật khẩu đã cung cấp không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public Object SocialAuthenticate (String email, String id) {
    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(id))
      return null;

    User user = userRepository.findByEmail(email);

    if (user == null) {
      user = new User();
      user.setEmail(email);
      user.setSocialID(id);
      user.setPassword(passwordEncoder.encode("S0cjzyb@c~m3$i0*8SMxG"));
      user.setRoleVar(roleVarRepository.findById(1));
      user.setCreated_at(LocalDate.now());
      user.setUpdated_at(LocalDate.now());

      userRepository.save(user);

      return jwtTokenProvider.createToken(user);
    }

    if (user.getRoleVar().getId() == 3)
      return new ApplicationContextException("tài khoản này đã bị gắn cờ");

    if (user.getSocialID() == null) return null;

    // record Service?

    return jwtTokenProvider.createToken(user);
  }

  public User GetByUsername (String username) {
    return userRepository.findByUsername(username);
  }

  public User GetById (int id) {
    return userRepository.findById(id);
  }

  public Object updateByUsername (UpdateModel model, String username) {
    User user = userRepository.findByUsername(username);

    user.setFirstName(model.FirstName);
    user.setLastName(model.LastName);
    user.setUsername(model.Username);
    user.setTelephone(model.Telephone);
    user.setUserImage(model.UserImage);

    try {
      return userRepository.save(user);
    } catch (Exception ex ) {
      return new ApplicationContextException(ex.getMessage());
    }
  }

  public Object signup(User appUser) {
    if (!userRepository.existsByUsername(appUser.getUsername()) || !userRepository.existsByEmail(appUser.getEmail())) {
      appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
      appUser.setRoleVar(roleVarRepository.findById(1));
      appUser.setCreated_at(LocalDate.now());
      appUser.setUpdated_at(LocalDate.now());

      userRepository.save(appUser);

      return new ResponseEntity<>("Ok", HttpStatus.OK);
    } else {
      throw new CustomException("Tên tài khoản hoặc email đã được sử dụng", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public Object toggleSubscription (String username) {
    User user = userRepository.findByUsername(username);

    user.setSubscribedToMailing(!user.isSubscribedToMailing());

    try {
      userRepository.save(user);
    } catch (Exception ex) {
      return new ApplicationContextException(ex.getMessage());
    }
  }

  public Object GetRecord (String username, PaginateRecordModel paginate) {
    User user = userRepository.findByUsername(username);

    Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
    Page<UserRecord> userRecordsData = userRecordRepository.findByIdContaining(user.getId(), pageableWithSortDirection);

    return userRecordsData.getContent();
  }

  public long GetRecordCount (String username) {
    User user = userRepository.findByUsername(username);

    return userRecordRepository.countAllByUserId(user.getId());
  }

  public Object ValidateUser (String username, String token) {
    // Under development
    return null;
  }

  public Object CreateReferralCode (String username) {
    User user = userRepository.findByUsername(username);

    if (user.getReferralCode() != null)
      return new CustomException("Nguời dùng này đã tạo mã giới thiệu", HttpStatus.UNPROCESSABLE_ENTITY);
    String refCode = stringHelper.randomStr(10);

    user.setReferralCode(refCode);
    userRepository.save(user);

    return refCode;
  }

  public Object GetRefList (String username) {
    User user = userRepository.findByUsername(username);

    List<User> userList = userRepository.findAllByReferralCode(user.getReferralCode());

    return userList;
  }

  public Object ResendVerification (String username) {
    // Under development
    return null;
  }

  public Object GetUserStat (String username) {
    User user = userRepository.findByUsername(username);

    double numberOfPoint = orderDetailsRepository.countAllByUserIdAndStatusGood(user.getId()) * 1024;

    return new UserPoint(.0, numberOfPoint);
  }

  public Object SetNewNotify (String username) {
    // Under development
    return null;
  }

  public void delete(String username) {
    userRepository.deleteByUsername(username);
  }

  public User search(String username) {
    User appUser = userRepository.findByUsername(username);
    if (appUser == null) {
      throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return appUser;
  }

  public User whoami(HttpServletRequest req) {
    return userRepository.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
  }

  public String refresh(String username) {
//    return jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getAppUserRoles());
    throw new CustomException("Under development", HttpStatus.UNPROCESSABLE_ENTITY);
  }

  private static boolean VerifyPasswordHash(String password, byte[] storedHash, byte[] storedSalt)
  {
    Mac sha512_HMAC;

    if (password == null) throw new CustomException("Bạn phải nhập mật khẩu", HttpStatus.BAD_REQUEST);
    if (password.isEmpty()) throw new CustomException("Giá trị không thể để trống hoặc chỉ chứa dấu cách.", HttpStatus.BAD_REQUEST);
    if (storedHash.length != 64) throw new CustomException("Độ dài hàm băm mật khẩu không hợp lệ (cần 64 bytes).", HttpStatus.BAD_REQUEST);
    if (storedSalt.length != 128) throw new CustomException("Độ dài salt mật khẩu không hợp lệ (cần 128 bytes).", HttpStatus.BAD_REQUEST);

    try {

      sha512_HMAC = Mac.getInstance("HmacSHA512");

      SecretKeySpec secretkey = new SecretKeySpec(storedHash, "HmacSHA512");

      sha512_HMAC.init(secretkey);

      byte[] computedHash = sha512_HMAC.doFinal(password.getBytes("UTF-8"));

      for (int i = 0; i < computedHash.length; i++)
      {
        if (computedHash[i] != storedHash[i]) return false;
      }
    } catch (Exception e) {
      return false;
    }

    return true;
  }
}
