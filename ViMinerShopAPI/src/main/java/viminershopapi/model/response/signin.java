package viminershopapi.model.response;

public class signin {
    public int Id;

    public signin(int id, String email, String username, String firstName, String lastName, boolean isActive, int roleVar_id, String token) {
        Id = id;
        Email = email;
        Username = username;
        FirstName = firstName;
        LastName = lastName;
        this.isActive = isActive;
        this.roleVar_id = roleVar_id;
        Token = token;
    }

    public String Email;

    public String Username;

    public String FirstName;

    public String LastName;

    public boolean isActive;

    public int roleVar_id;

    public String Token;
}
