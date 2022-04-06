package viminershopapi.helper;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;

public class stringHelper {
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    public static boolean IsNullOrEmpty(String param) {
        return param == null || param.trim().length() == 0;
    }

    public static String currentTime () {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();

        return formatter.format(date);
    }

    public static String randomStr(int len){
        StringBuilder sb = new StringBuilder(len);
        for(int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }
}
