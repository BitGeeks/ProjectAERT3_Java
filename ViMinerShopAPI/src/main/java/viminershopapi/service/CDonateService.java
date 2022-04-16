package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viminershopapi.dto.coupons.CDonatePaginateModel;
import viminershopapi.model.CouponDonate;
import viminershopapi.repository.CouponDonateRepository;
import viminershopapi.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CDonateService {
    private final UserRepository userRepository;
    private final CouponDonateRepository couponDonateRepository;

    public Object GetCouponDonateBy (String username, CDonatePaginateModel paginate, String flag) {
        var user = userRepository.findByUsername(username);

        if (flag == "transfered") {
            Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
            Page<CouponDonate> userRecordsData = couponDonateRepository.findByFlagTransfered(user.getId(), pageableWithSortDirection);

            return userRecordsData.getContent();
        } else {
            Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
            Page<CouponDonate> userRecordsData = couponDonateRepository.findByFlagNonTransfered(user.getId(), pageableWithSortDirection);

            return userRecordsData.getContent();
        }
    }
}
