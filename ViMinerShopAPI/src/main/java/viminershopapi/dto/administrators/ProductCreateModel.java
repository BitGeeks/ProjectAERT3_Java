package viminershopapi.dto.administrators;

import java.util.List;

public class ProductCreateModel {
    public String algorithm_id;
    public int category_id;
    public String desc;
    public String detailDesc;
    public int inventory_id;
    public String name;
    public String noteDesc;
    public String paymentDesc;
    public double price;
    public double pricePromotion;
    public String sku;
    public String warrantyDesc;
    public int quantity;
    public String flag;
    public double hps;
    public double weight;
    public String shippingInfo;
    public List<ProcessingImage> productImage;
}
