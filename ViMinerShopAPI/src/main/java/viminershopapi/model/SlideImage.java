package viminershopapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@Table(name="slideimage")
public class SlideImage {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;

    public String Name;

    public String FillColor;

    public String ImgUrl;

    public String JumpTo;
}
