package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.ShippingMethodRepository;

@Service
@RequiredArgsConstructor
public class ShippingMethodService {
    public final ShippingMethodRepository shippingMethodRepository;
    public Object GetShippingMethod () {
        return shippingMethodRepository.findAll();
    }

    public Object getByFlag (String flag) {
        if (flag == "repair") {
            return shippingMethodRepository.findByRepairFlag ();
        } else {
            return shippingMethodRepository.findBySalesFlag ();
        }
    }
}
