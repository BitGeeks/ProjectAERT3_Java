package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import viminershopapi.dto.useraddresses.UserAddressCreateModel;
import viminershopapi.model.UserAddress;
import viminershopapi.repository.UserAddressesRepository;

import static viminershopapi.helper.responseHelper.NotFound;

@Service
@RequiredArgsConstructor
public class UserAddressesService {
    private final UserAddressesRepository userAddressesRepository;

    public Object GetUserAddresss () {
        return userAddressesRepository.findAll();
    }

    public Object GetUserAddress(int id)
    {
        var userAddress = userAddressesRepository.findById(id);

        if (userAddress == null)
        {
            return NotFound();
        }

        return userAddress;
    }

    public ResponseEntity<Object> checkEmptyValueAddressObj (UserAddressCreateModel userAddress)
    {
        if (userAddress.address.length() == 0)
        {
            return new ResponseEntity<>("Invalid address value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.street_name.length() == 0)
        {
            return new ResponseEntity<>("Invalid street_name value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.city.length() == 0)
        {
            return new ResponseEntity<>("Invalid city value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.postal_code.length() == 0)
        {
            return new ResponseEntity<>("Invalid postal_code value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.country.length() == 0)
        {
            return new ResponseEntity<>("Invalid country value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.telephone.length() == 0)
        {
            return new ResponseEntity<>("Invalid telephone value", HttpStatus.NOT_ACCEPTABLE);
        }
        else if (userAddress.mobile.length() == 0)
        {
            return new ResponseEntity<>("Invalid mobile value", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
