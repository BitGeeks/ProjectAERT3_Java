package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.SlideImage;

import java.util.List;

public interface SlideImageRepository extends JpaRepository<SlideImage, Integer> {
}
