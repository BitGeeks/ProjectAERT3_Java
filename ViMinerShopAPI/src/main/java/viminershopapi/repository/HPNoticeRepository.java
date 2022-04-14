package viminershopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import viminershopapi.model.HPNotice;

import java.util.List;

public interface HPNoticeRepository extends JpaRepository<HPNotice, Integer> {
    @Query("SELECT h FROM HPNotice h WHERE h.Id = ?1")
    List<HPNotice> findAllById (int id);

    @Query("SELECT h FROM HPNotice h WHERE h.Id <> 0")
    List<HPNotice> findAll ();
}
