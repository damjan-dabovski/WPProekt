package finki.dabod.wpproekt.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Entity
@Table(name = "Posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;
    private String content;

    private String authorName;

    private Date dateCreated;
    private Date dateModified;

    @OneToMany(
            mappedBy = "postId",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments;

    @ManyToMany
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "postsThatHaveThisTag"),
            inverseJoinColumns = @JoinColumn(name = "tags")
    )
    private List<Tag> tags;

    private boolean isDraft;

    public Post(){
        comments = new ArrayList<>();
        tags = new ArrayList<>();
        dateModified = dateCreated = new Date();
    }

    public void update(Post newVersion){
        this.title = newVersion.getTitle();
        this.content = newVersion.getContent();
        this.dateModified = new Date();
    }
}
