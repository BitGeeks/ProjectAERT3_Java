package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viminershopapi.service.PaymentProviderService;

@RestController
@RequestMapping("/paymentproviders")
@Api(tags = "paymentproviders")
@RequiredArgsConstructor
public class PaymentProvidersController {
    public final PaymentProviderService paymentProviderService;

    @GetMapping("/providers")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetPaymentProvider () {
        return paymentProviderService.GetPaymentProvider();
    }
}
