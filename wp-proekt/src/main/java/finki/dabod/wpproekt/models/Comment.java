package finki.dabod.wpproekt.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String authorName;
    private String content;

    private Date dateCreated;

    @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY)
    private int postId;

    public Comment(){
        dateCreated = new Date();
    }
}
