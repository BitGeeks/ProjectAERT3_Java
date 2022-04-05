package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="repairsite")

public class RepairSite {
    @javax.persistence.Id
    public String Code;

    public String Name;

    public String ExtraInfo;

    public String Note;

    public String Location;

    public boolean isDisabled;
}
