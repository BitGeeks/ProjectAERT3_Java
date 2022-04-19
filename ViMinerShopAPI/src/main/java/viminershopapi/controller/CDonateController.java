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
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.coupons.CDonatePaginateModel;
import viminershopapi.dto.coupons.TransactionStartModel;
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

    @GetMapping("/with/{flag}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetCouponDonateBy (@ModelAttribute CDonatePaginateModel model, @ApiParam("flag") @PathVariable String flag) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cDonateService.GetCouponDonateBy(jud.getUsername(), model, flag);
    }

    @GetMapping("/countWith/{flag}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetCouponDonateBy (@ApiParam("flag") @PathVariable String flag) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cDonateService.GetCouponDonateBy(jud.getUsername(), flag);
    }

    @PostMapping("/transaction")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object PostCouponDonate (@RequestBody TransactionStartModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return cDonateService.PostCouponDonate(jud.getUsername(), model);
    }
}
