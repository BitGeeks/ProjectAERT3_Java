package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viminershopapi.dto.products.ProductQueryModel;
import viminershopapi.model.Algorithm;
import viminershopapi.model.Product;
import viminershopapi.model.ProductCategory;
import viminershopapi.repository.AlgorithmRepository;
import viminershopapi.repository.ProductCategoryRepository;
import viminershopapi.repository.ProductRepository;

import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final AlgorithmRepository algorithmRepository;

    private Predicate<Product> isContains (String query) {
        return c -> c.getName().toLowerCase().contains(query);
    }

    public Object getProducts (ProductQueryModel model) {
        List<Product> productList = productRepository.findAllByActive (true);

        // Predicate
        if (model.size != 0 || model.page != 0) {
            if (model.category != null) {
                ProductCategory category = productCategoryRepository.findByName(model.category);
                productList = productList.stream().filter(product -> product.getProductCategory().getId() == category.getId()).collect(Collectors.toList());
            }
            if (model.algorithm != null) {
                Algorithm algorithm = algorithmRepository.findByName(model.algorithm);
                productList = productList.stream().filter(product -> product.getAlgorithm().getId() == algorithm.getId()).collect(Collectors.toList());
            }
            if (model.minPrice != null && Double.parseDouble(model.minPrice) != 0) {
                productList = productList.stream().filter(product -> product.getPricePromotion() == 0 && product.getPrice() >= Double.parseDouble(model.minPrice) || product.getPricePromotion() != 0 && product.getPricePromotion() >= Double.parseDouble(model.minPrice)).collect(Collectors.toList());
            }
            if (model.maxPrice != null && Double.parseDouble(model.maxPrice) != 0) {
                productList = productList.stream().filter(product -> product.getPricePromotion() == 0 && product.getPrice() <= Double.parseDouble(model.maxPrice) || product.getPricePromotion() != 0 && product.getPricePromotion() <= Double.parseDouble(model.maxPrice)).collect(Collectors.toList());
            }
            if (model.minHashrate != null && Double.parseDouble(model.minHashrate) != 0) {
                productList = productList.stream().filter(product -> product.getProductInventory().getHps() >= Double.parseDouble(model.minHashrate)).collect(Collectors.toList());
            }
            if (model.maxHashrate != null && Double.parseDouble(model.maxHashrate) != 0) {
                productList = productList.stream().filter(product -> product.getProductInventory().getHps() <= Double.parseDouble(model.maxHashrate)).collect(Collectors.toList());
            }
            if (model.searchString != null && model.searchString != "") {
                String searchString = model.searchString.toLowerCase();
                String[] searchStringArray = searchString.split(" ");
                Predicate<Product> predicate = new Predicate<Product>() {
                    @Override
                    public boolean test(Product product) {
                        return product.getName().toLowerCase().contains(searchStringArray[0]);
                    }
                };

                for (String query: searchStringArray) {
                    predicate = predicate.and(p -> p.getName().toLowerCase().contains(query));
                }

                productList = productList.stream().filter(predicate).collect(Collectors.toList());
            }
            if (model.sort != null && model.sort != "any") {
                if (model.sort == "lowest") {
                    productList = productList.stream().sorted(Comparator.comparing(Product::getPrice)).collect(Collectors.toList());
                } else if (model.sort == "highest") {
                    productList = productList.stream().sorted(Comparator.comparing(Product::getPrice).reversed()).collect(Collectors.toList());
                } else if (model.sort == "hlowest") {
                    productList = productList.stream().sorted(Comparator.comparing(p -> p.getProductInventory().getHps())).collect(Collectors.toList());

                } else if (model.sort == "hhighest") {
                    productList = productList.stream().sorted(Comparator.comparing(p -> p.getProductInventory().getHps(), Comparator.reverseOrder())).collect(Collectors.toList());
                } else if (model.sort == "wlowest") {
                    productList = productList.stream().sorted(Comparator.comparing(p -> p.getProductInventory().getWeight())).collect(Collectors.toList());

                } else if (model.sort == "whighest") {
                    productList = productList.stream().sorted(Comparator.comparing(p -> p.getProductInventory().getWeight(), Comparator.reverseOrder())).collect(Collectors.toList());
                }
            } else {
                productList = productList.stream().sorted(Comparator.comparing(Product::getId).reversed()).collect(Collectors.toList());
            }

            return productList;
        }
        return productList;
    }

}
