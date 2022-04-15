package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.PaymentProvider;

import java.util.List;

public interface PaymentProviderRepository extends JpaRepository<PaymentProvider, Integer> {
    @Query("SELECT p FROM PaymentProvider p")
    public List<PaymentProvider> findAll ();
}
