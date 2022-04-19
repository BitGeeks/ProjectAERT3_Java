package viminershopapi.dto.coupons;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class CDonatePaginateModel {
    @Nullable
    public int size;
    @Nullable
    public int page;
}
