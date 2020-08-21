package finki.dabod.wpproekt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@ToString(exclude = "postsThatHaveThisTag")
@NoArgsConstructor()
@Entity
@Table(name = "Tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String colorCode;
    private String name;

    @ManyToMany(targetEntity = Post.class, mappedBy = "tags", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Post> postsThatHaveThisTag;

    public void addPost(Post post){
        this.postsThatHaveThisTag.add(post);
    }
}
