package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.HPNoticeRepository;

@Service
@RequiredArgsConstructor
public class HPNoticeService {
    HPNoticeRepository hpNoticeRepository;

    public Object GetHPNotice () {
        return hpNoticeRepository.findAll();
    }

    public Object GetHPNotice (int id) {
        return hpNoticeRepository.findAllById(id);
    }
}
