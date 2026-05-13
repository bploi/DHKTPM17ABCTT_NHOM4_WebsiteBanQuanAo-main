package fit.iuh.dtcllshopbe.service;

import fit.iuh.dtcllshopbe.dto.request.OrderDetailRequest;
import fit.iuh.dtcllshopbe.dto.response.OrderDetailResponse;
import fit.iuh.dtcllshopbe.dto.response.OrderResponse;
import fit.iuh.dtcllshopbe.entities.Order;
import fit.iuh.dtcllshopbe.entities.OrderDetail;
import fit.iuh.dtcllshopbe.entities.Product;
import fit.iuh.dtcllshopbe.mapper.OrderDetailMapper;
import fit.iuh.dtcllshopbe.repository.OrderDetailRepository;
import fit.iuh.dtcllshopbe.repository.OrderRepository;
import fit.iuh.dtcllshopbe.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class OrderDetailService {
    OrderDetailRepository orderDetailRepository;
    ProductRepository productRepository;
    OrderRepository orderRepository;
    OrderDetailMapper orderDetailMapper;

    public OrderDetailResponse createOrderDetail(OrderDetailRequest orderDetailRequest) {
        Product product = productRepository.findById(orderDetailRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Order order = orderRepository.findById(orderDetailRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setProduct(product);
        orderDetail.setOrder(order);
        orderDetail.setProductName(orderDetailRequest.getProductName());
        orderDetail.setQuantity(orderDetailRequest.getQuantity());
        orderDetail.setCreated_at(new Date());
        orderDetail.setUpdated_at(new Date());
        orderDetail.setTotalPrice(orderDetailRequest.getTotalPrice());
        orderDetail.setUnitPrice(orderDetailRequest.getUnitPrice());

        OrderDetail saved = orderDetailRepository.save(orderDetail);

        return orderDetailMapper.toOrderDetailResponse(saved);

    }
}
