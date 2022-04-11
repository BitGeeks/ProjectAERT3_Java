package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viminershopapi.dto.orders.OrderDataRequestModel;
import viminershopapi.dto.orders.UserPaymentMaxMinesRequestModel;
import viminershopapi.dto.orders.UserPaymentPaypalRequestModel;
import viminershopapi.dto.payments.PaymentUpdateModel;
import viminershopapi.model.Coupon;
import viminershopapi.model.OrderDetail;
import viminershopapi.model.User;
import viminershopapi.model.UserRecord;
import viminershopapi.model.helper.Paginate;
import viminershopapi.repository.CouponRepository;
import viminershopapi.repository.OrderDetailsRepository;
import viminershopapi.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    UserRepository userRepository;
    OrderDetailsRepository orderDetailsRepository;
    CouponRepository couponRepository;

    public Object GetAllOrderByType (String username, int type) {
        User user = userRepository.findByUsername(username);

        List<OrderDetail> orders = orderDetailsRepository
                .findByUserId(user.getId());

        if (type == 2) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 0);
        }
        else if (type == 3) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 1);
        }
        else if (type == 4) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 2);
        }
        else if (type == 5) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 3);
        }
        else if (type == 6) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 4);
        }
        else if (type == 7) {
            orders = orderDetailsRepository
                    .findByUserIdAndGreaterDay(user.getId(), LocalDate.now().minusDays(30));
        }

        return orders;
    }

    public Object GetOrderDetails (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdWithPaginate(user.getId(), pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetUnpaidOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndPaymentStatusWithPaginate(user.getId(), 0, pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetPendingOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndPaymentStatusWithPaginate(user.getId(), 1, pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetUnshippedOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndPaymentStatusWithPaginate(user.getId(), 2, pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetShippingOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndPaymentStatusWithPaginate(user.getId(), 3, pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetShippedOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndPaymentStatusWithPaginate(user.getId(), 4, pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetExpiredOrder (String username, OrderDataRequestModel model) {
        User user = userRepository.findByUsername(username);

        Pageable pageableWithSortDirection = PageRequest.of(model.page, model.size, Sort.by("Id").descending());
        Page<OrderDetail> orderDetailData = orderDetailsRepository.findByUserIdAndGreaterDayWithPaginate(user.getId(), LocalDate.now().minusDays(30), pageableWithSortDirection);

        return orderDetailData;
    }

    public Object GetAllOrderCount (String username) {
        User user = userRepository.findByUsername(username);

        List<OrderDetail> orders = orderDetailsRepository.findByUserId(user.getId());

        return orders.size();
    }

    public Object GetAllOrderCountByType (String username, int type) {
        User user = userRepository.findByUsername(username);

        List<OrderDetail> orders = orderDetailsRepository
                .findByUserId(user.getId());

        if (type == 2) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 0);
        }
        else if (type == 3) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 1);
        }
        else if (type == 4) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 2);
        }
        else if (type == 5) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 3);
        }
        else if (type == 6) {
            orders = orderDetailsRepository
                    .findByUserIdAndPaymentStatus(user.getId(), 4);
        }
        else if (type == 7) {
            orders = orderDetailsRepository
                    .findByUserIdAndGreaterDay(user.getId(), LocalDate.now().minusDays(30));
        }

        return orders.size();
    }

    public Object OnUserPaymentPaypal (String username, UserPaymentPaypalRequestModel model) {
        // under development
        return "";
    }

    private void afterPaymentSuccessful (User user, OrderDetail order, String providerName) {

    }

    private String calculateCouponPercenByBill (double billTotal)
    {
        if (billTotal <= 500) return "10";
        else if (billTotal > 500 && billTotal <= 1000) return "25";
        else if (billTotal > 1000 && billTotal <= 2000) return "35";
        else if (billTotal > 2000 && billTotal <= 3000) return "40";
        else if (billTotal > 3000 && billTotal < 4000) return "45";
        else if (billTotal > 4000 && billTotal < 5000) return "50";
        else return "55";
    }

    public Object OnUserPaymentMaxMines (String username, UserPaymentMaxMinesRequestModel model) {
        // under development
        return "";
    }

    public Object PutOrderDetail (String username, PaymentUpdateModel model) {
        User user = userRepository.findByUsername(username);

        var order = orderDetailsRepository.findByIdAndUserId(model.orderId, user.getId());
        order.getPaymentDetail().setProvider(model.paymentId);

        orderDetailsRepository.save(order);
        return order;
    }

    public Object GetCouponCount (String username, int type) {
        User user = userRepository.findByUsername(username);

        var couponCount = couponRepository.findAllByUserId(user.getId());

        if (type == 0) {
            couponCount = couponRepository.findAllByUserIdAndNECouponLeftAndActiveAndExpiredGreater (user.getId(), 0, true, LocalDate.now());
        } else if (type == 1) {
            return orderDetailsRepository.findAllByUserIdAndCouponIdIsNotNull (user.getId()).size();
        } else if (type == 2) {
            couponCount = couponRepository.findAllByUserIdAndExpiredLower (user.getId(), LocalDate.now());
        } else return "NotFound";

        return couponCount.size();
    }

    public Object GetAvailableCoupon (String username, Paginate paginate) {
        User user = userRepository.findByUsername(username);

        var coupon = couponRepository.findAllByUserIdAndNECouponLeftAndActiveAndExpiredGreater(user.getId(), 0, true, LocalDate.now());

        if (paginate.size != 0) {
            Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
            Page<Coupon> coupons = couponRepository.findAllByUserIdAndNECouponLeftAndActiveAndExpiredGreaterWithPaginate(user.getId(), 0, true, LocalDate.now(), pageableWithSortDirection);

            return coupons.getContent();
        }

        return coupon;
    }

    public Object GetUsedCoupon (String username, Paginate paginate) {
        User user = userRepository.findByUsername(username);

        var orders = orderDetailsRepository.findAllCouponByUserIdAndCouponIdIsNotNull(user.getId());

        if (paginate.size != 0) {
            Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
            Page<OrderDetail> orderDetailData = orderDetailsRepository.findAllCouponByUserIdAndCouponIdIsNotNullWithPaginate(user.getId(), pageableWithSortDirection);

            return orderDetailData.getContent();
        }

        return orders;
    }

    public Object GetExpiredCoupon (String username, Paginate paginate) {
        User user = userRepository.findByUsername(username);

        var coupon = couponRepository.findAllByUserIdAndExpiredLower(user.getId(), LocalDate.now());

        if (paginate.size != 0) {
            Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
            Page<Coupon> couponData = couponRepository.findAllByUserIdAndExpiredLowerWithPaginate(user.getId(), LocalDate.now(), pageableWithSortDirection);

            return couponData.getContent();
        }

        return coupon;
    }


}
