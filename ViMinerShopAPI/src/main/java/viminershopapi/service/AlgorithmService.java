package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.model.*;
import viminershopapi.repository.AlgorithmRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlgorithmService {
    AlgorithmRepository algorithmRepository;

    public Object GetAlgorithms() {
        List<Algorithm> algorithmList = algorithmRepository.findAll();

        return algorithmList;
    }

    public Object GetAlgorithm (int id) {
        List<Algorithm> algorithmList = algorithmRepository.findAllById(id);

        return algorithmList;
    }
}
