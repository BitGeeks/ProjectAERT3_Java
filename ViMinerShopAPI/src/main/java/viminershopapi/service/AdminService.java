package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viminershopapi.dto.administrators.DashboardModelData;
import viminershopapi.dto.administrators.GetAllProduct;
import viminershopapi.dto.administrators.ProcessingImage;
import viminershopapi.dto.administrators.ProductCreateModel;
import viminershopapi.model.*;
import viminershopapi.repository.*;

import java.time.LocalDate;
import java.util.List;

import static viminershopapi.helper.responseHelper.NotFound;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final ProductRepository productRepository;
    private final ProductInventoryRepository productInventoryRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final AlgorithmRepository algorithmRepository;
    private final ProductImagesRepository productImagesRepository;

    public Object GetProductCount () {
        return productRepository.findAll().size();
    }

    public Object GetProductList (GetAllProduct paginate) {
        Pageable pageableWithSortDirection = PageRequest.of(paginate.page, paginate.size, Sort.by("Id").descending());
        Page<Product> products = productRepository.findAllWithPaginate (pageableWithSortDirection);

        return products.getContent();
    }

    public Object GetAllChartData () {
        List<OrderDetail> orderDetails = orderDetailsRepository.findAll();

        var miner = productRepository.selectProductInventoryByAll ();

        if (orderDetails.size() == 0) return NotFound();

        var dmd = new DashboardModelData();

        dmd.orderHistory = orderDetails;
        dmd.totalIncome = this.sumArray(orderDetails);
        dmd.totalOrder = orderDetails.size();
        dmd.totalMiner = this.sumQArray(miner);

        return dmd;
    }

    public Object AddProduct (ProductCreateModel model) {
        var productInventory = new ProductInventory();

        productInventory.setQuantity(model.quantity);
        productInventory.setFlag(model.flag);
        productInventory.setHps(model.hps);
        productInventory.setWeight(model.weight);
        productInventory.setShippingInfo(model.shippingInfo);
        productInventory.setCreated_at(LocalDate.now());
        productInventory.setUpdated_at(LocalDate.now());

        productInventoryRepository.save(productInventory);

        ProductCategory category1 = productCategoryRepository.findById (model.category_id);
        Algorithm algorithm1 = algorithmRepository.findById (Integer.parseInt(model.algorithm_id));

        Product product = new Product();

        product.setName(model.name);
        product.setDescription(model.desc);
        product.setDetailDesc(model.detailDesc);
        product.setNoteDesc(model.noteDesc);
        product.setPaymentDesc(model.paymentDesc);
        product.setWarrantyDesc(model.warrantyDesc);
        product.setSKU(model.sku);
        product.setProductCategory(category1);
        product.setProductInventory(productInventory);
        product.setAlgorithm(algorithm1);
        product.setPrice(model.price);
        product.setPricePromotion(model.pricePromotion);
        product.setActive(true);
        product.setCreated_at(LocalDate.now());
        product.setUpdated_at(LocalDate.now());

        productRepository.save(product);

        for (ProcessingImage imageObj : model.productImage)
        {
            var productImage = productImagesRepository.findFirstByProductIdAndImageUrl (product.getId(), imageObj.getImageUrl());
            if (productImage == null)
            {
                var image = new ProductImage();

                image.setProduct(product);
                image.setAlt_Name(imageObj.getAlt_Name());
                image.setImageUrl(imageObj.getImageUrl());
                image.setCreated_at(LocalDate.now());
                image.setUpdated_at(LocalDate.now());

                productImagesRepository.save(image);
            }
        }

        return product;
    }

    public Object GetAlgorithms () {
        return algorithmRepository.findAll();
    }

    public static int sumArray(List<OrderDetail> model) {
        int add=0;
        for (OrderDetail c : model) {
            add += c.getPaymentDetail().getAmount();
        }
        return add;
    }

    public static int sumQArray(List<ProductInventory> model) {
        int add=0;
        for (ProductInventory c : model) {
            add += c.getQuantity();
        }
        return add;
    }
}
