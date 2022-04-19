package viminershopapi.dto.products;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
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
