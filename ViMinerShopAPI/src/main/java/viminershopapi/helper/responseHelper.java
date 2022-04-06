package viminershopapi.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class responseHelper {
    // Ok()
    public static ResponseEntity Ok() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // NotFound()
    public static ResponseEntity NotFound() {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
