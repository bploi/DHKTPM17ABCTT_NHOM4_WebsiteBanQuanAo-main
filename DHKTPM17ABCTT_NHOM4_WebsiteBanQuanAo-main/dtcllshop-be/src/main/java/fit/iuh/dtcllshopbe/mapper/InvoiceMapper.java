package fit.iuh.dtcllshopbe.mapper;

import fit.iuh.dtcllshopbe.dto.response.InvoiceResponse;
import fit.iuh.dtcllshopbe.dto.response.OrderResponse;
import fit.iuh.dtcllshopbe.entities.Invoice;
import fit.iuh.dtcllshopbe.entities.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    InvoiceResponse toInvoiceMapper(Invoice invoice);

}
