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
import viminershopapi.dto.products.ProductQueryModel;
import viminershopapi.dto.repairs.TabRepairQuery;
import viminershopapi.service.ProductService;
import viminershopapi.service.RepairService;

@RestController
@RequestMapping("/repairs")
@Api(tags = "repairs")
@RequiredArgsConstructor
public class RepairsController {
    private final RepairService repairService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetRepair(@ModelAttribute TabRepairQuery model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return repairService.GetRepair(jud.getUsername(), model);
    }

    @GetMapping("/count/{type}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetRepairCount(@ApiParam("type") @PathVariable int type) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return repairService.GetRepairCount(jud.getUsername(), type);
    }
}
