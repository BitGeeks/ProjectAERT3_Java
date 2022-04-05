package viminershopapi;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;

import viminershopapi.service.UserService;

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class, SecurityAutoConfiguration.class})
@RequiredArgsConstructor
public class ViMinerShopRestService implements CommandLineRunner {

  final UserService userService;

  public static void main(String[] args) {
    SpringApplication.run(ViMinerShopRestService.class, args);
  }

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Override
  public void run(String... params) throws Exception {
    // Silent is Golden
  }

}
