package viminershopapi.service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.server.ResponseStatusException;
import viminershopapi.helper.stringHelper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import viminershopapi.exception.CustomException;
import viminershopapi.model.User;
import viminershopapi.repository.UserRepository;
import viminershopapi.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final AuthenticationManager authenticationManager;
  private final stringHelper string = new stringHelper();

  public Object signin(String username, String password) {
    User user = null;
    try {
      User usertest = userRepository.findByEmail(username);

      if (usertest != null)
        username = usertest.username;

//      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      user = userRepository.findByUsername(username);
      if (true) return user;

      if (user == null)
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Đã có lỗi xảy ra, vui lòng thử phương thức khác");

      if (user.RoleVar.Id == 3) throw new CustomException("Tài khoản này đã bị gắn cờ!", HttpStatus.BAD_REQUEST);

//      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
//        return null;

      // Record service?

      return jwtTokenProvider.createToken(user);
    } catch (AuthenticationException e) {
      return e.getMessage();
//      throw new CustomException("Địa chỉ email/mật khẩu đã cung cấp không hợp lệ", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public User GetById (int id) {
    return userRepository.findById(id);
  }

  public Object signup(User appUser) {
    if (!userRepository.existsByUsername(appUser.getUsername()) || !userRepository.existsByEmail(appUser.getEmail())) {
      appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
      appUser.setRoleVar_Id
      userRepository.save(appUser);

      return new ResponseEntity<>("Ok", HttpStatus.OK);
    } else {
      throw new CustomException("Tên tài khoản hoặc email đã được sử dụng", HttpStatus.UNPROCESSABLE_ENTITY);
    }
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
