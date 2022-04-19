package viminershopapi.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import viminershopapi.dto.products.ProductQueryModel;
import viminershopapi.dto.products.ProductSearchQueryModel;
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
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object getProducts(@ModelAttribute ProductQueryModel model) {
        return productService.getProducts(model);
    }

    @GetMapping("/search")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object SearchProduct(@ModelAttribute ProductSearchQueryModel model) {
        return productService.SearchProduct(model);
    }

    @GetMapping("/miner/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetProduct(@ApiParam("id") @PathVariable int id) {
        return productService.GetProduct(id);
    }

    @GetMapping("/related/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetProductRelated(@ApiParam("id") @PathVariable int id) {
        return productService.GetProductRelated(id);
    }

    @GetMapping("/count")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetProductsCount(@ModelAttribute ProductQueryModel model) {
        return productService.GetProductsCount(model);
    }

    @GetMapping("/newminer")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetRecentProducts() {
        return productService.GetRecentProducts();
    }

    @GetMapping("/bestminer")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetBestMiner() {
        return productService.GetBestMiner();
    }

}
