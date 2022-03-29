package murraco.helper;

public class stringHelper {
    public static boolean IsNullOrEmpty(String param) {
        return param == null || param.trim().length() == 0;
    }
}
