package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import viminershopapi.dto.cartitems.CartAmountChangeModel;
import viminershopapi.dto.cartitems.CartConfirmCreateModel;
import viminershopapi.dto.cartitems.CartItemCreateModel;
import viminershopapi.dto.coupons.ApplyCouponModel;
import viminershopapi.dto.orders.ShippingPosModel;
import viminershopapi.exception.CustomException;
import viminershopapi.helper.responseHelper;
import viminershopapi.model.*;
import viminershopapi.repository.*;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final ShoppingSessionRepository shoppingSessionRepository;
    private final CartItemRepository cartItemRepository;
    private final CouponRepository couponRepository;
    private final PaymentDetailRepository paymentDetailRepository;
    private final ShippingMethodRepository shippingMethodRepository;
    private final OrderDetailsRepository orderDetailRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public Object getSession(String username) {
        User user = userRepository.findByUsername(username);
        double total = 0;

        ShoppingSession session = this.getLatestSession(user);

        if (session.getCartItems().size() != 0) {
            for (CartItem c: session.getCartItems()) {
                double cartPrice = c.getProduct().getPricePromotion() != 0 ? c.getProduct().getPricePromotion() : c.getProduct().getPrice();
                total += c.getQuantity() * cartPrice;
            }
        }

        session.setTotal(total);

        return session;
    }

    public Object getCartItems (String username) {
        User user = userRepository.findByUsername(username);

        ShoppingSession session = this.getLatestSession(user);
        return cartItemRepository.FindCartItemBySessionId(session.getId());
    }

    public Object IncrementCartItem (String username, CartAmountChangeModel model) {
        User user = userRepository.findByUsername(username);

        ShoppingSession session = this.getLatestSession(user);

        CartItem updateObj = cartItemRepository.FindCartItemToUpdateBySessionAndId(session.getId(), model.cartItemId);

        if (updateObj != null) {
            updateObj.setQuantity(updateObj.getQuantity() + model.amount);
            cartItemRepository.save(updateObj);
            return this.getSession(user.getUsername());
        }

        return new responseHelper().NotFound();
    }

    public Object setCartNum (String username, CartAmountChangeModel model) {
        User user = userRepository.findByUsername(username);

        ShoppingSession session = this.getLatestSession(user);

        CartItem updateObj = cartItemRepository.FindCartItemToUpdateBySessionAndId(session.getId(), model.cartItemId);

        if (updateObj != null) {
            if (updateObj.getProduct().getProductInventory().getQuantity() >= model.amount)
                updateObj.setQuantity(model.amount);
            else updateObj.setQuantity(updateObj.getProduct().getProductInventory().getQuantity());
            cartItemRepository.save(updateObj);
            return this.getSession(user.getUsername());
        }

        return new responseHelper().NotFound();
    }

    public Object ConfirmCartItem (String username, CartConfirmCreateModel model) {
        User user = userRepository.findByUsername(username);
        // Mail?

        ShoppingSession session = this.getLatestSession(user);

        double subTotal = model.Total;
        double total = model.Total;
        double shippingAmount = model.shippingAmount;
        double couponAmount = .0;
        double discountAmount = .0;

        if (session.getCoupon() != null && (session.getCoupon().getExpired_at().compareTo(LocalDate.now()) > 0 && session.getCoupon().isActive() && session.getCoupon().getMinPrice() < model.Total)) {
            Coupon cptick = couponRepository.findByID(session.getCoupon().getId());

            couponAmount = total * (Double.parseDouble(session.getCoupon().getCouponPercent()) / 100);
            total -= (total * (Double.parseDouble(session.getCoupon().getCouponPercent()) / 100));
            cptick.setCouponLeft(cptick.getCouponLeft() - 1);

            couponRepository.save(cptick);
        }

        PaymentDetail paymentDetail = new PaymentDetail(total, 0, 0, user.getReferralBy(), LocalDate.now(), LocalDate.now());
        paymentDetailRepository.save(paymentDetail);

        OrderDetail orderDetail = new OrderDetail();

        ShippingMethod shippingMethod = shippingMethodRepository.findById(model.ShippingMethod_Id);

        orderDetail.setUser(user);
        orderDetail.setTotal(total + shippingAmount);
        orderDetail.setSubTotal(subTotal);
        orderDetail.setDiscountAmount(discountAmount);
        orderDetail.setCouponAmount(couponAmount);
        orderDetail.setShippingMethod(shippingMethod);
        orderDetail.setShippingAddress(model.shippingAddress);
        orderDetail.setCoupon(session.getCoupon());
        orderDetail.setDiscount(session.getDiscount());
        orderDetail.setLocationName(model.LocationName);
        orderDetail.setLatitute(model.Latitute);
        orderDetail.setLongitute(model.Longitute);
        orderDetail.setCreated_at(LocalDate.now());
        orderDetail.setUpdated_at(LocalDate.now());

        orderDetailRepository.save(orderDetail);

        for (CartItem item : model.CartItems) {
            OrderItem orderItem = new OrderItem();

            orderItem.setOrderDetail(orderDetail);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setCreated_at(LocalDate.now());
            orderItem.setUpdated_at(LocalDate.now());

            orderItemRepository.save(orderItem);
            cartItemRepository.deleteBySessionIdAndId(model.Id, item.getId());
        }

        shoppingSessionRepository.deleteByIdAndUserId(model.Id, user.getId());

        return this.getOrderById(user.getUsername(), orderDetail.getId());
    }

    public Object getOrderById (String username, int id) {
        User user = userRepository.findByUsername(username);
        double total = 0;
        OrderDetail orderDetail = orderDetailRepository.findByIdAndUserId(id, user.getId());

        if (orderDetail == null)
            return new responseHelper().NotFound();

        return orderDetail;
    }

    private ShoppingSession getLatestSession (User user) {
        List<ShoppingSession> sessions = shoppingSessionRepository.FindLatestSessionByUserId(user.getId()); //, PageRequest.of(0, 1)

        ShoppingSession session = null;
        if (sessions.size() == 0 || sessions == null) {
            session = new ShoppingSession(user, 0, LocalDate.now(), LocalDate.now());
            shoppingSessionRepository.save(session);
        } else {
            session = sessions.get(0);
        }

        return session;
    }

    public double SetShippingPos (ShippingPosModel model) {
        // Tính khoảng cách 2 điểm ở đây
        return 10000.0;
    }

    public Object GetOrders (String username) {
        User user = userRepository.findByUsername(username);

        List<OrderDetail> session = orderDetailRepository.findByUserId(user.getId());

        return session;
    }

    public Object DecrementCartItem (String username, CartAmountChangeModel model) {
        User user = userRepository.findByUsername(username);

        ShoppingSession session = this.getLatestSession(user);

        CartItem updateObj = cartItemRepository.FindCartItemToUpdateBySessionAndId(session.getId(), model.cartItemId);

        if (updateObj != null) {
            if (updateObj.getQuantity() - model.amount <= 0)
                cartItemRepository.delete(updateObj);
            else {
                updateObj.setQuantity(updateObj.getQuantity() - model.amount);
                cartItemRepository.save(updateObj);
            }
            return this.getSession(user.getUsername());
        }

        return new responseHelper().NotFound();
    }

    public Object GetCartItem (String username, int id) {
        CartItem cartItem = cartItemRepository.findById(id);

        if (cartItem == null)
            return new responseHelper().NotFound();

        return cartItem;
    }

    public Object PostCartItem (String username, CartItemCreateModel model) {
        User user = userRepository.findByUsername(username);
        ShoppingSession session = this.getLatestSession(user);

        Product yesProduct = productRepository.findById(model.productId);

        CartItem checkCart = cartItemRepository.findFirstByShoppingSessionIdAndProductId(session.getId(), model.productId);

        if (checkCart == null) {
            CartItem cart = new CartItem();

            cart.setProduct(yesProduct);
            cart.setShoppingSession(session);
            cart.setQuantity(model.amount);
            cart.setUpdated_at(LocalDate.now());
            cart.setCreated_at(LocalDate.now());

            cartItemRepository.save(cart);
        } else {
            checkCart.setQuantity(checkCart.getQuantity() + model.amount);
            cartItemRepository.save(checkCart);
        }

        return this.getSession(user.getUsername());
    }

    public Object DeleteCartItem (String username, int id) {
        CartItem cartItem = cartItemRepository.findById(id);

        if (cartItem == null) return new responseHelper().NotFound();

        cartItemRepository.delete(cartItem);

        return this.getSession(username);
    }

    public Object ToggleCoupon (String username, ApplyCouponModel model) {
        User user = userRepository.findByUsername(username);

        Coupon check = couponRepository.findByUserIdAndExpired_atAndCouponCode(user.getId(), LocalDate.now(), model.code);

        ShoppingSession session = this.getLatestSession(user);

        if (check == null) {
            session.setCoupon(check);
            shoppingSessionRepository.save(session);
        } else {
            if (session.getCoupon().getId() == check.getId())
                session.setCoupon(null);
            else session.setCoupon(check);
            shoppingSessionRepository.save(session);
        }

        return this.getSession(username);
    }


}
