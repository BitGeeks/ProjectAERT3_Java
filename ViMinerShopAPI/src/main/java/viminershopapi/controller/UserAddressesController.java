package viminershopapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viminershopapi.service.SlideImageService;

@RestController
@RequestMapping("/slideimages")
@Api(tags = "slideimages")
@RequiredArgsConstructor
public class UserAddressesController {
    public final SlideImageService slideImageService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetSlideImage() {
        return slideImageService.GetSlideImage();
    }
}
