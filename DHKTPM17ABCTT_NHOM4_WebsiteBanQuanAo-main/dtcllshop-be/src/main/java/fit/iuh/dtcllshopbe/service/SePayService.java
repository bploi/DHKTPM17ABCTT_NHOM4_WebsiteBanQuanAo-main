package fit.iuh.dtcllshopbe.service;

import fit.iuh.dtcllshopbe.configuration.SePayConfig;
import fit.iuh.dtcllshopbe.dto.request.SePayRequest;
import fit.iuh.dtcllshopbe.dto.response.SePayResponse;
import fit.iuh.dtcllshopbe.entities.Invoice;
import fit.iuh.dtcllshopbe.enums.StatusPayment;
import fit.iuh.dtcllshopbe.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SePayService {

    @Autowired
    private SePayConfig sePayConfig;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private fit.iuh.dtcllshopbe.repository.OrderRepository orderRepository;

    public SePayResponse handleCallback(SePayRequest callbackRequest, String authorizationHeader) {
        if (!sePayConfig.getApiKey().equals(authorizationHeader)) {
            return new SePayResponse(false, "Unauthorized callback " + authorizationHeader);
        }
        if (!"in".equalsIgnoreCase(callbackRequest.getTransferType())) {
            return new SePayResponse(true, "Transaction type not supported");
        }
        String invoiceCode = callbackRequest.getCode();

        if (invoiceCode == null || invoiceCode.isEmpty()) {
            String content = callbackRequest.getContent();

            if (content != null && !content.isEmpty()) {
                // Bắt mã dạng cũ: INV20251206002
                Pattern pattern = Pattern.compile("(INV\\d{11,})");
                Matcher matcher = pattern.matcher(content);
                if (matcher.find()) {
                    invoiceCode = matcher.group(1);
                }
            }
        }
        Invoice invoice = invoiceRepository.findByInvoiceCode(invoiceCode);

        // Nếu không tìm thấy, thử format lại theo kiểu cũ (thêm gạch nối) rồi tìm lại
        if (invoice == null && invoiceCode != null && invoiceCode.matches("INV\\d{11,}")) {
            String datePart = invoiceCode.substring(3, 11);
            String indexPart = invoiceCode.substring(11);
            String formattedCode = "INV-" + datePart + "-" + indexPart;
            invoice = invoiceRepository.findByInvoiceCode(formattedCode);
        }

        if (invoice == null) {
            return new SePayResponse(true, "Invoice not found: " + invoiceCode);
        }
        if (callbackRequest.getTransferAmount() < invoice.getTotalAmount()) {
            return new SePayResponse(true, "Payment amount insufficient");
        }
        invoice.setPaymentStatus(StatusPayment.PAID);
        invoiceRepository.save(invoice);

        if (invoice.getOrder() != null) {
            fit.iuh.dtcllshopbe.entities.Order order = invoice.getOrder();
            order.setStatusOrder(fit.iuh.dtcllshopbe.enums.StatusOrdering.CONFIRMED);
            orderRepository.save(order);
        }

        System.out.println(invoice);

        return new SePayResponse(true, "Payment processed successfully");
    }
}
