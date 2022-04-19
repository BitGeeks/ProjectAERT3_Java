package viminershopapi;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.RestHighLevelClient;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;

import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import viminershopapi.service.UserService;


@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class, SecurityAutoConfiguration.class})
@RequiredArgsConstructor
public class ViMinerShopRestService implements CommandLineRunner {

//  final UserService userService;

  public static void main(String[] args) {
    SpringApplication.run(ViMinerShopRestService.class, args);
  }

//  @Bean
//  public ModelMapper modelMapper() {
//    return new ModelMapper();
//  }

  @Bean
  public RestHighLevelClient client() {
    ClientConfiguration clientConfiguration
            = ClientConfiguration.builder()
            .connectedTo("localhost:9200")
            .build();

    return RestClients.create(clientConfiguration).rest();
  }

  @Bean
  public ElasticsearchOperations elasticsearchTemplate() {
    return new ElasticsearchRestTemplate(client());
  }

  @Override
  public void run(String... params) throws Exception {
    // Silent is Golden
  }

}
