package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.helper.responseHelper;
import viminershopapi.model.ProductCategory;
import viminershopapi.repository.ProductCategoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public Object getAll () {
        return productCategoryRepository.findAll();
    }

    public Object getById (String id) {
        ProductCategory productCategory = productCategoryRepository.findBySlug(id);

        if (productCategory == null) return new responseHelper().NotFound();

        return productCategory;
    }
}
