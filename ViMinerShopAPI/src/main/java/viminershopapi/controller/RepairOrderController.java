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
import viminershopapi.dto.repairs.TabRepairQuery;
import viminershopapi.service.RepairOrderService;
import viminershopapi.service.RepairService;

@RestController
@RequestMapping("/repairorder")
@Api(tags = "repairorder")
@RequiredArgsConstructor
public class RepairOrderController {
    private final RepairOrderService repairOrderService;
    private final ModelMapper modelMapper;

    @GetMapping("/count/{type}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetRepairOrderCount(@ApiParam("type") @PathVariable int type) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return repairOrderService.GetRepairOrderCount(jud.getUsername(), type);
    }
}
