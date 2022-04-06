package viminershopapi.model.response;

public class signin {
    public signin(int id, String email, String username, String firstName, String lastName, boolean isActive, int roleVar_id, String token) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.firstname = firstName;
        this.lastname = lastName;
        this.isActive = isActive;
        this.roleVar_id = roleVar_id;
        this.token = token;
    }

    public int id;

    public String email;

    public String username;

    public String firstname;

    public String lastname;

    public boolean isActive;

    public int roleVar_id;

    public String token;
}
