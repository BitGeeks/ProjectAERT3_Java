package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.administrators.GetAllProduct;
import viminershopapi.dto.administrators.ProductCreateModel;
import viminershopapi.service.AdminService;

@RestController
@RequestMapping("/admin")
@Api(tags = "admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/orders/chart")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAllChartData() {
        return adminService.GetAllChartData();
    }

    @GetMapping("/products/count")
    public Object GetProductCount () {
        return adminService.GetProductCount();
    }

    @GetMapping("/products/all")
    public Object GetProductList (@ModelAttribute GetAllProduct model) {
        return adminService.GetProductList(model);
    }

    @PostMapping("/products/add")
    public Object AddProduct (@ModelAttribute ProductCreateModel model) {
        return adminService.AddProduct(model);
    }

    @GetMapping("/algorithms/list")
    public Object ListAlgorithm () {
        return adminService.GetAlgorithms();
    }
}
