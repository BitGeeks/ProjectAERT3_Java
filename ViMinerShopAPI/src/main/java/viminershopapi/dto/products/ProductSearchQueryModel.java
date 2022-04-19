package viminershopapi.dto.products;

import lombok.Data;

@Data
public class ProductSearchQueryModel {
    public int page;
    public int size;
    public String keyword;
}
