package fit.iuh.dtcllshopbe.mapper;

import fit.iuh.dtcllshopbe.dto.response.AddressResponse;
import fit.iuh.dtcllshopbe.dto.response.CartDetailResponse;
import fit.iuh.dtcllshopbe.entities.Address;
import fit.iuh.dtcllshopbe.entities.CartDetail;
import org.mapstruct.Mapper;
import fit.iuh.dtcllshopbe.entities.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressResponse toAddressResponse(Address address);
}
