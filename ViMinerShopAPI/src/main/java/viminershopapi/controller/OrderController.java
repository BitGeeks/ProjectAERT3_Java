package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.orders.OrderDataRequestModel;
import viminershopapi.dto.orders.UserPaymentMaxMinesRequestModel;
import viminershopapi.dto.orders.UserPaymentPaypalRequestModel;
import viminershopapi.dto.payments.PaymentUpdateModel;
import viminershopapi.model.helper.Paginate;
import viminershopapi.service.HPNoticeService;
import viminershopapi.service.OrderService;

@RestController
@RequestMapping("/order")
@Api(tags = "order")
@RequiredArgsConstructor
public class OrderController {
    public final OrderService orderService;
    private final ModelMapper modelMapper;

    @GetMapping("/all/{type}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAllOrderByType(@ApiParam("type") @PathVariable int type) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetAllOrderByType(jud.getUsername(), type);
    }

    @GetMapping("/")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetOrderDetails(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetOrderDetails(jud.getUsername(), model);
    }

    @GetMapping("/unpaid")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetUnpaidOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetUnpaidOrder(jud.getUsername(), model);
    }

    @GetMapping("/pending")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetPendingOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetPendingOrder(jud.getUsername(), model);
    }

    @GetMapping("/unshipped")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetUnshippedOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetUnshippedOrder(jud.getUsername(), model);
    }

    @GetMapping("/shipping")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetShippingOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetShippingOrder(jud.getUsername(), model);
    }

    @GetMapping("/shipped")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetShippedOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetShippedOrder(jud.getUsername(), model);
    }

    @GetMapping("/expired")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetExpiredOrder(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetExpiredOrder(jud.getUsername(), model);
    }

    @GetMapping("/count")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAllOrderCount(@RequestParam OrderDataRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetAllOrderCount(jud.getUsername());
    }

    @GetMapping("/countType/{type}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAllOrderCountByType(@ApiParam("type") @PathVariable int type) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetAllOrderCountByType(jud.getUsername(), type);
    }

    @PostMapping("/userPaymentPaypal")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object OnUserPaymentPaypal(@RequestBody UserPaymentPaypalRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.OnUserPaymentPaypal(jud.getUsername(), model);
    }

    @PostMapping("/userPaymentMaxMines")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object OnUserPaymentMaxMines(@RequestBody UserPaymentMaxMinesRequestModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.OnUserPaymentMaxMines(jud.getUsername(), model);
    }

    @PutMapping("/paymentsetup")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object PutOrderDetail(@RequestBody PaymentUpdateModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.PutOrderDetail(jud.getUsername(), model);
    }

    @GetMapping("/availableCoupon")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAvailableCoupon(@RequestBody Paginate model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetAvailableCoupon(jud.getUsername(), model);
    }

    @GetMapping("/usedCoupon")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetUsedCoupon(@RequestBody Paginate model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetUsedCoupon(jud.getUsername(), model);
    }

    @GetMapping("/expiredCoupon")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetExpiredCoupon(@RequestBody Paginate model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.GetExpiredCoupon(jud.getUsername(), model);
    }
}
