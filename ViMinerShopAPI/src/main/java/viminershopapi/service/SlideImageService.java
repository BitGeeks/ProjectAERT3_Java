package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.SlideImageRepository;

@Service
@RequiredArgsConstructor
public class SlideImageService {
    SlideImageRepository slideImageRepository;

    public Object GetSlideImage () {
        return slideImageRepository.findAll();
    }
}
