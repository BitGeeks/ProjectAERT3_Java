package viminershopapi.dto.products;

import org.springframework.lang.Nullable;

public class ProductQueryModel {
    @Nullable
    public int page;
    @Nullable
    public int size;
    @Nullable
    public String sort;
    @Nullable
    public String category;
    @Nullable
    public String algorithm;
    @Nullable
    public String minPrice;
    @Nullable
    public String maxPrice;
    @Nullable
    public String minHashrate;
    @Nullable
    public String maxHashrate;
    @Nullable
    public String searchString;
}
