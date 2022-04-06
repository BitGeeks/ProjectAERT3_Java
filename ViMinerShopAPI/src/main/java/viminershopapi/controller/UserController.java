package viminershopapi.controller;

import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.users.*;
import viminershopapi.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import viminershopapi.dto.UserDataDTO;
import viminershopapi.dto.UserResponseDTO;
import viminershopapi.service.UserService;

@RestController
@RequestMapping("/users")
@Api(tags = "users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final ModelMapper modelMapper;

  @PostMapping("/authenticate")
  @ApiOperation(value = "${UserController.signin}")
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
      @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object login(@RequestBody AuthenticateModel model) {
    return userService.signin(model.email, model.password);
  }

  @PostMapping("/socialauthenticate")
  @ApiOperation(value = "${UserController.socialauthenticate}")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object socialauth(@RequestBody SocialAuthenticateModel model) {
    return userService.SocialAuthenticate(model.email, model.id);
  }

  @GetMapping("/")
  @ApiOperation(value = "${UserController.socialauthenticate}")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object GetUsers() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.GetByUsername(jud.getUsername());
  }

  @PutMapping("/update")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object PutUser(@RequestBody UpdateModel model) {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.updateByUsername(model, jud.getUsername());
  }

  @PutMapping("/subscription")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object UpdateSubscription() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.toggleSubscription(jud.getUsername());
  }

  @PostMapping("/register")
  @ApiOperation(value = "${UserController.signup}")
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
      @ApiResponse(code = 403, message = "Từ chối quyền truy dụng cập"), //
      @ApiResponse(code = 422, message = "Tên tài khoản đã được sử ")})
  public Object signup(@RequestBody UserDataDTO user) {
    return userService.signup(modelMapper.map(user, User.class));
  }

  @DeleteMapping("/delete/{id}")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public void DeleteUser() {
    // Under development
  }

  @GetMapping("/records/all")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object GetUserRecord(@RequestParam PaginateRecordModel paginate) {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.GetRecord(jud.getUsername(), paginate);
  }

  @GetMapping("/records/count")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public long GetUserRecordCount() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.GetRecordCount(jud.getUsername());
  }

  @PostMapping("/register/validate")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object ValidateUser(@RequestBody UserRegistrationValidateModel model) {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.ValidateUser(jud.getUsername(), model.token);
  }

  @PostMapping("/referrals/create")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object CreateRefCode() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.CreateReferralCode(jud.getUsername());
  }

  @GetMapping("/referrals/all")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object GetRefList() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
    return userService.GetRefList(jud.getUsername());
  }

  @PostMapping("/register/resend")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object ResendVerification() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

    return userService.ResendVerification(jud.getUsername());
  }

  @GetMapping("/stats/point")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object GetUserStatPoint() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

    return userService.GetUserStat(jud.getUsername());
  }

  @GetMapping("/soldoutnotify")
  @ApiResponses(value = {//
          @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
          @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
  public Object SetNewNotify() {
    UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

    return userService.SetNewNotify(jud.getUsername());
  }

  @GetMapping("/test")
  @ApiOperation(value = "${UserController.testApi}")
  @ApiResponses(value = {})
  public String testApi () {
    return "hello world";
  }

  @PostMapping("/{id}")
  @ApiOperation(value = "${UserController.getId}", authorizations = { @Authorization(value="apiKey") })
  public Object GetUser (@ApiParam("id") @PathVariable int id) {
    return userService.GetById(id);
  }


  @DeleteMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "${UserController.delete}", authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 404, message = "The user doesn't exist"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public String delete(@ApiParam("Username") @PathVariable String username) {
    userService.delete(username);
    return username;
  }

  @GetMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 404, message = "The user doesn't exist"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public UserResponseDTO search(@ApiParam("Username") @PathVariable String username) {
    return modelMapper.map(userService.search(username), UserResponseDTO.class);
  }

  @GetMapping(value = "/me")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  @ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = { @Authorization(value="apiKey") })
  @ApiResponses(value = {//
      @ApiResponse(code = 400, message = "Something went wrong"), //
      @ApiResponse(code = 403, message = "Access denied"), //
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
  public UserResponseDTO whoami(HttpServletRequest req) {
    return modelMapper.map(userService.whoami(req), UserResponseDTO.class);
  }

  @GetMapping("/refresh")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public String refresh(HttpServletRequest req) {
    return userService.refresh(req.getRemoteUser());
  }

}
