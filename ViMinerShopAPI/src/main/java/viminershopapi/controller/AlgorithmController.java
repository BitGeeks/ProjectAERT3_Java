package viminershopapi.controller;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import viminershopapi.service.AlgorithmService;

@RestController
@RequestMapping("/algorithms")
@Api(tags = "algorithms")
@RequiredArgsConstructor
public class AlgorithmController {
    public final AlgorithmService algorithmService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAlgorithms() {
        return algorithmService.GetAlgorithms();
    }

    @GetMapping("/info/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetAlgorithms(@ApiParam("id") @PathVariable int id) {
        return algorithmService.GetAlgorithm(id);
    }
}