package viminershopapi.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import viminershopapi.service.HPNoticeService;

@RestController
@RequestMapping("/hpnotices")
@Api(tags = "hpnotices")
@RequiredArgsConstructor
public class HPNoticesController {
    public final HPNoticeService hpNoticeService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetHPNotice() {
        return hpNoticeService.GetHPNotices();
    }

    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetHPNotice(@ApiParam("id") @PathVariable int id) {
        return hpNoticeService.GetHPNotice(id);
    }
}
