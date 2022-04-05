package viminershopapi.helper;

import java.text.SimpleDateFormat;
import java.util.Date;

public class stringHelper {
    public static boolean IsNullOrEmpty(String param) {
        return param == null || param.trim().length() == 0;
    }

    public static String currentTime () {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();

        return formatter.format(date);
    }
}
