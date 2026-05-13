package fit.iuh.dtcllshopbe.mapper;

import fit.iuh.dtcllshopbe.dto.response.CartResponse;
import fit.iuh.dtcllshopbe.entities.Cart;
import fit.iuh.dtcllshopbe.entities.CartDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartResponse toCartResponse(Cart cart);
}
