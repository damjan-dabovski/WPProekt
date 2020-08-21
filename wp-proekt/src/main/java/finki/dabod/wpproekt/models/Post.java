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
            mappedBy = "post",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments;

    @ManyToMany(targetEntity = Tag.class, cascade = CascadeType.ALL)
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
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

    public void addComment(Comment comment){
        this.comments.add(comment);
        comment.setPost(this);
    }

    public void addTag(Tag tag){
        this.tags.add(tag);
        tag.getPostsThatHaveThisTag().add(this);
    }

    public void removeTag(Tag tag){
        tag.getPostsThatHaveThisTag().remove(this);
        this.tags.remove(tag);
    }
}
