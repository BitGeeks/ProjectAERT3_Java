package viminershopapi.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.cartitems.CartAmountChangeModel;
import viminershopapi.dto.cartitems.CartConfirmCreateModel;
import viminershopapi.dto.cartitems.CartItemCreateModel;
import viminershopapi.dto.coupons.ApplyCouponModel;
import viminershopapi.dto.orders.ShippingPosModel;
import viminershopapi.dto.users.AuthenticateModel;
import viminershopapi.service.CartService;

@RestController
@RequestMapping("/cart")
@Api(tags = "cart")
@RequiredArgsConstructor
public class CartController {
    public final CartService cartService;
    private final ModelMapper modelMapper;

    @GetMapping("/session")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetSession() {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.getSession(jud.getUsername());
    }

    @GetMapping("/mc")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetCartItems() {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.getCartItems(jud.getUsername());
    }

    @PostMapping("/increment")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object IncrementCartItem(@RequestBody CartAmountChangeModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.IncrementCartItem(jud.getUsername(), model);
    }

    @PostMapping("/setcartnum")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object setCartNum(@RequestBody CartAmountChangeModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.setCartNum(jud.getUsername(), model);
    }

    @PostMapping("/confirm")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object ConfirmCartItem(@RequestBody CartConfirmCreateModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.ConfirmCartItem(jud.getUsername(), model);
    }

    @GetMapping("/orders/{id}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetOrderById(@ApiParam("id") @PathVariable int id) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.getOrderById(jud.getUsername(), id);
    }

    @PostMapping("/setshippingpos")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public double SetShippingPos(@RequestBody ShippingPosModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.SetShippingPos(model);
    }

    @PostMapping("/orders")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetOrders(@RequestBody ShippingPosModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.GetOrders(jud.getUsername());
    }

    @PostMapping("/decrement")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object DecrementCartItem(@RequestBody CartAmountChangeModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.DecrementCartItem(jud.getUsername(), model);
    }

    @PostMapping("/create")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object PostCartItem(@RequestBody CartItemCreateModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.PostCartItem(jud.getUsername(), model);
    }

    @DeleteMapping("/remove/{id}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object DeleteCartItem(@ApiParam("id") @PathVariable int id) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.DeleteCartItem(jud.getUsername(), id);
    }

    @PostMapping("/coupon")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object ToggleCoupon(@RequestBody ApplyCouponModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cartService.ToggleCoupon(jud.getUsername(), model);
    }
}
