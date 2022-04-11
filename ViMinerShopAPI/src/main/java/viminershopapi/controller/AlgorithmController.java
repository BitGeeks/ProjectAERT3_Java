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
import viminershopapi.service.AlgorithmService;
import viminershopapi.service.CartService;

@RestController
@RequestMapping("/algorithms")
@Api(tags = "algorithms")
@RequiredArgsConstructor
public class AlgorithmController {
    public final AlgorithmService algorithmService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAlgorithms() {
        return algorithmService.GetAlgorithms();
    }

    @GetMapping("/info/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAlgorithms(@ApiParam("id") @PathVariable int id) {
        return algorithmService.GetAlgorithm(id);
    }
}