package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import viminershopapi.model.HPNotice;

import java.util.List;

public interface HPNoticeRepository extends JpaRepository<HPNotice, Integer> {
    List<HPNotice> findAllById(int id);
}
