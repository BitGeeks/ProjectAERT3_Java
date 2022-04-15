package viminershopapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import viminershopapi.dto.coupons.CDonatePaginateModel;
import viminershopapi.model.CouponDonate;
import viminershopapi.repository.CouponDonateRepository;
import viminershopapi.repository.UserRepository;

public class CDonateService {
    public final UserRepository userRepository;
    public final CouponDonateRepository couponDonateRepository;

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
