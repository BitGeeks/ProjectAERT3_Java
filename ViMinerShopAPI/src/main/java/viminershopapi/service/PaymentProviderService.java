package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.PaymentProviderRepository;

@Service
@RequiredArgsConstructor
public class PaymentProviderService {
    private final PaymentProviderRepository paymentProviderRepository;

    public Object GetPaymentProvider () {
        return paymentProviderRepository.findAll();
    }
}
