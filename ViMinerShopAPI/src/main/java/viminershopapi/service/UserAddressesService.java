package viminershopapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import viminershopapi.dto.useraddresses.UserAddressCreateModel;
import viminershopapi.dto.useraddresses.UserAddressDefaultModel;
import viminershopapi.model.UserAddress;
import viminershopapi.repository.UserAddressesRepository;
import viminershopapi.repository.UserRepository;

import static viminershopapi.helper.responseHelper.NotFound;

@Service
@RequiredArgsConstructor
public class UserAddressesService {
    private final UserAddressesRepository userAddressesRepository;
    private final UserRepository userRepository;

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
        return null;
    }

    public Object PutUserAddress (String username, UserAddressCreateModel userAddress) {
        var checkVal = this.checkEmptyValueAddressObj(userAddress);

        if (checkVal == null) {
            return checkVal;
        }

        var user = userRepository.findByUsername(username);

        var check = userAddressesRepository.findByIdAndUserId (userAddress.id, user.getId());

        if (check == null)
            return NotFound();

        check.setAddress(userAddress.address);
        check.setStreet_name(userAddress.street_name);
        check.setCity(userAddress.city);
        check.setPostal_code(userAddress.postal_code);
        check.setCountry(userAddress.country);
        check.setTelephone(userAddress.telephone);
        check.setMobile(userAddress.mobile);

        userAddressesRepository.save(check);

        return "";
    }

    public Object PostUserAddress (String username, UserAddressCreateModel userAddress) {
        var checkVal = this.checkEmptyValueAddressObj(userAddress);
        if (checkVal != null) {
            return checkVal;
        }
        boolean isDefault = false;

        var user = userRepository.findByUsername(username);
        var checkEmpty = userAddressesRepository.findFirstByUserId (user.getId());
        isDefault = checkEmpty == null;
        var check = userAddressesRepository.findFirstByAddressAndStreetNameAndUserId (userAddress.address, userAddress.street_name, user.getId());

        if (check != null)
            return new ResponseEntity<Object>("This address has in your address list", HttpStatus.NOT_ACCEPTABLE);

        var address = new UserAddress();

        address.setUser(user);
        address.setAddress(userAddress.address);
        address.setStreet_name(userAddress.street_name);
        address.setCity(userAddress.city);
        address.setPostal_code(userAddress.postal_code);
        address.setCountry(userAddress.country);
        address.setTelephone(userAddress.telephone);
        address.setMobile(userAddress.mobile);
        address.setDefault(isDefault);
        userAddressesRepository.save(address);

        return new ResponseEntity<Object>("", HttpStatus.NO_CONTENT);
    }

    public Object SetUserDefaultAddress (String username, UserAddressDefaultModel model) {
        var user = userRepository.findByUsername(username);
        var setNoDefault = userAddressesRepository.findFirstByDefaultAndUserId (user.getId());

        if (setNoDefault != null)
        {
            setNoDefault.setDefault(false);
            userAddressesRepository.save(setNoDefault);
        }

        var check = userAddressesRepository.findFirstByUserIdAndId (user.getId(), model.id);
        if (check == null)
            return "Invalid address";
        check.setDefault(true);

        userAddressesRepository.save(setNoDefault);

        return new ResponseEntity<Object>("", HttpStatus.NO_CONTENT);
    }

    public Object DeleteUserAddress (String username, int id) {
        var user = userRepository.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<Object>("NotFound", HttpStatus.NOT_FOUND);
        }

        userAddressesRepository.deleteById(id);

        return "";
    }
}
