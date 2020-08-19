package finki.dabod.wpproekt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString(exclude = "post")
@Entity
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String authorName;
    private String content;

    private Date dateCreated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Post post;

    public Comment(){
        dateCreated = new Date();
    }
}
