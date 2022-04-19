package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viminershopapi.dto.repairs.TabRepairQuery;
import viminershopapi.repository.RepairRepository;
import viminershopapi.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class RepairService {
    private final RepairRepository repairRepository;
    private final UserRepository userRepository;

    public Object GetRepair (String username, TabRepairQuery model) {
        var user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        var result = repairRepository.findAllByUserIdWithPaginate(user.getId(), pageableWithSortDirection);

        return result.getContent();
    }

    public Object GetRepairCount (String username, int type) {
        var user = userRepository.findByUsername(username);

        var result = repairRepository.findAllByUserId (user.getId());

        return result.size();
    }
}
