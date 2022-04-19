package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viminershopapi.dto.coupons.CDonatePaginateModel;
import viminershopapi.dto.coupons.TransactionStartModel;
import viminershopapi.helper.stringHelper;
import viminershopapi.model.Coupon;
import viminershopapi.model.CouponDonate;
import viminershopapi.repository.CouponDonateRepository;
import viminershopapi.repository.CouponRepository;
import viminershopapi.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

import static viminershopapi.helper.responseHelper.NotFound;

@Service
@RequiredArgsConstructor
public class CDonateService {
    private final UserRepository userRepository;
    private final CouponDonateRepository couponDonateRepository;
    private final CouponRepository couponRepository;

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

    public Object GetCouponDonateBy (String username, String flag) {
        var user = userRepository.findByUsername(username);

        if (flag == "transfered") {
            List<CouponDonate> userRecordsData = couponDonateRepository.findByFlagTransferedWithNoPag(user.getId());

            return userRecordsData.size();
        } else {
            List<CouponDonate> userRecordsData = couponDonateRepository.findByFlagNonTransferedWithNoPag(user.getId());

            return userRecordsData.size();
        }
    }

    @Transactional
    public Object PostCouponDonate (String username, TransactionStartModel transaction) {
        var user = userRepository.findByUsername(username);

        var couponCheck = couponRepository.findFirstByIdAndUserIdAndExpiredAt (transaction.couponId, user.getId(), LocalDate.now());

        var backCoupon = couponCheck;

        var receiver = userRepository.findByEmail (transaction.receiverMail);

        if (receiver == null || couponCheck == null || couponCheck.getCouponLeft() < transaction.couponNumber || receiver.getId() == user.getId()) return NotFound();

        var couponRCheck = couponRepository.findFirstByUserIdAndCouponCode(receiver.getId(), couponCheck.getCouponCode());

        if (couponCheck.getCouponLeft() == transaction.couponNumber)
        {
            if (couponRCheck != null)
            {
                couponRCheck.setCouponLeft(couponRCheck.getCouponLeft() + transaction.couponNumber);
                couponRepository.delete(couponCheck);
            }
            else
                couponCheck.setUser(receiver);
        }
        else
        {
            couponCheck.setCouponLeft(couponCheck.getCouponLeft() - transaction.couponNumber);
            if (couponRCheck == null)
            {
                var newCoupon = new Coupon();
                newCoupon.setCouponCode(couponCheck.getCouponCode());
                newCoupon.setUser(receiver);
                newCoupon.setDescription(couponCheck.getDescription());
                newCoupon.setCouponPercent(couponCheck.getCouponPercent());
                newCoupon.setCouponType(couponCheck.getCouponType());
                newCoupon.setMinPrice(couponCheck.getMinPrice());
                newCoupon.setActive(couponCheck.isActive());
                newCoupon.setCouponLeft(transaction.couponNumber);
                newCoupon.setExpired_at(couponCheck.getExpired_at());
                newCoupon.setCreated_at(LocalDate.now());
                newCoupon.setUpdated_at(LocalDate.now());

                couponRepository.save(newCoupon);
            } else
                couponRCheck.setCouponLeft(couponRCheck.getCouponLeft() + transaction.couponNumber);
        }
        couponCheck.setUpdated_at(LocalDate.now());

        var donate = new CouponDonate();

        donate.setTransactionId(new stringHelper().randomStr(20));
        donate.setUser(user);
        donate.setReceiver(receiver);
        donate.setCoupon(backCoupon);
        donate.setCouponName(backCoupon.getCouponCode());
        donate.setCouponPercent(backCoupon.getCouponPercent());
        donate.setQuantity(transaction.couponNumber);
        donate.setCreated_at(LocalDate.now());
        donate.setUpdated_at(LocalDate.now());

        couponDonateRepository.save(donate);

        return "";

    }
}
