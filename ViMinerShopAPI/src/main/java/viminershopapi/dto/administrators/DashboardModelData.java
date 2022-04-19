package viminershopapi.dto.administrators;

import viminershopapi.model.OrderDetail;

import java.util.List;

public class DashboardModelData {
    public List<OrderDetail> orderHistory;
    public double totalIncome;
    public int totalOrder;
    public int totalMiner;
}
