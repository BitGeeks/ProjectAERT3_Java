package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.repository.HPNoticeRepository;

@Service
@RequiredArgsConstructor
public class HPNoticeService {
    private final HPNoticeRepository hpNoticeRepository;

    public Object GetHPNotices () {
        return hpNoticeRepository.findAll();
    }

    public Object GetHPNotice (int id) {
        return hpNoticeRepository.findAllById(id);
    }
}
