package viminershopapi.model.helper;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class Paginate {
    @Nullable
    public int page;
    @Nullable
    public int size;
}
