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
import viminershopapi.dto.useraddresses.UserAddressCreateModel;
import viminershopapi.dto.useraddresses.UserAddressDefaultModel;
import viminershopapi.service.SlideImageService;
import viminershopapi.service.UserAddressesService;

@RestController
@RequestMapping("/useraddresses")
@Api(tags = "useraddresses")
@RequiredArgsConstructor
public class UserAddressesController {
    public final UserAddressesService userAddressesService;
    private final ModelMapper modelMapper;

    @GetMapping("/all")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")})
    public Object GetUserAddress(@ApiParam @PathVariable int id) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userAddressesService.GetUserAddress(id);
    }

    @PutMapping("/update")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")
    })
    public Object PutUserAddress (@RequestBody UserAddressCreateModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userAddressesService.PutUserAddress(jud.getUsername(), model);
    }

    @PostMapping("/add")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")
    })
    public Object PostUserAddress (@RequestBody UserAddressCreateModel userAddress) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userAddressesService.PostUserAddress(jud.getUsername(), userAddress);
    }

    @PostMapping("/setdefault")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Có lỗi đã xảy ra")
    })
    public Object SetUserDefaultAddress (@RequestBody UserAddressDefaultModel model) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userAddressesService.SetUserDefaultAddress(jud.getUsername(), model);
    }

    @DeleteMapping("/remove/{id}")
    public Object DeleteUserAddress (@ApiParam("id") @PathVariable int id) {
        UserDetails jud = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userAddressesService.DeleteUserAddress(jud.getUsername(), id);
    }


}
