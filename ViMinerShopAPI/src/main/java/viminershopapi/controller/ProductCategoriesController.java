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
import viminershopapi.model.ProductCategory;
import viminershopapi.service.ProductCategoryService;

@RestController
@RequestMapping("/productcategories")
@Api(tags = "productcategories")
@RequiredArgsConstructor
public class ProductCategoriesController {
    public final ProductCategoryService productCategoryService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetProductCategories() {
        return productCategoryService.getAll();
    }

    @GetMapping("/info/{id}")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object GetProductCategory(@ApiParam("id") @PathVariable String id) {
        return productCategoryService.getById(id);
    }
}
