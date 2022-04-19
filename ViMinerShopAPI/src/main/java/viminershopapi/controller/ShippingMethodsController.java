package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viminershopapi.repository.ShippingMethodRepository;
import viminershopapi.service.ShippingMethodService;

@RestController
@RequestMapping("/shippingmethods")
@Api(tags = "shippingmethods")
@RequiredArgsConstructor
public class ShippingMethodsController {
    private final ShippingMethodService shippingMethodService;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetShippingMethod () {
        return shippingMethodService.GetShippingMethod();
    }

    public Object GetShippingMethodByFlag (String flag) {
        return shippingMethodService.getByFlag(flag);
    }
}
