package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viminershopapi.dto.coupons.CDonatePaginateModel;
import viminershopapi.model.CouponDonate;
import viminershopapi.model.UserRecord;
import viminershopapi.repository.CouponDonateRepository;
import viminershopapi.repository.UserRepository;
import viminershopapi.service.CDonateService;

@RestController
@RequestMapping("/cdonate")
@Api(tags = "cdonate")
@RequiredArgsConstructor
public class CDonateController {
    private final CDonateService cDonateService;
    @PostMapping("/with/{flag}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetCouponDonateBy (@ApiParam @PathVariable String flag, CDonatePaginateModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cDonateService.GetCouponDonateBy(jud.getUsername(), model, flag);
    }
}
