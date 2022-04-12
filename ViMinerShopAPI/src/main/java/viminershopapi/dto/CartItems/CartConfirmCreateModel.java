package viminershopapi.dto.cartitems;

import org.jetbrains.annotations.Nullable;
import org.springframework.lang.Nullable;
import viminershopapi.model.CartItem;

import java.util.List;

public class CartConfirmCreateModel {
    public int Id;
    public int ShippingMethod_Id;
    public String shippingAddress;
    public double Total;
    public List<CartItem> CartItems;
    public double shippingAmount;
    @Nullable
    public String LocationName;
    @Nullable
    public String Longitute;
    @Nullable
    public String Latitute;
}