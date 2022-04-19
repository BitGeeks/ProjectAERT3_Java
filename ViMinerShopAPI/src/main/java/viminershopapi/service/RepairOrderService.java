package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.RepairOrderRepository;
import viminershopapi.repository.RepairRepository;
import viminershopapi.repository.UserRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RepairOrderService {
    private final RepairOrderRepository repairOrderRepository;
    private final UserRepository userRepository;
    private final RepairRepository repairRepository;

    public Object GetRepairOrderCount (String username, int type) {
        var user = userRepository.findByUsername(username);

        var orderList = repairRepository.selectRepairOrderByUserIdAndRepairOrderNotNull (user.getId());

        if (type != -1)
            orderList = orderList.stream().filter(order -> order.getStatus() == type).collect(Collectors.toList());

        return orderList.size();
    }
}
