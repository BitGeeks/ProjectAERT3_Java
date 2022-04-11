package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.products.ProductQueryModel;
import viminershopapi.dto.users.AuthenticateModel;
import viminershopapi.service.ProductService;
import viminershopapi.service.UserService;

@RestController
@RequestMapping("/products")
@Api(tags = "products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra"), //
            @ApiResponse(code = 422, message = "Thông tin đăng nhập không hợp lệ")})
    public Object login(@RequestBody ProductQueryModel model) {
        return productService.getProducts(model);
    }


}
