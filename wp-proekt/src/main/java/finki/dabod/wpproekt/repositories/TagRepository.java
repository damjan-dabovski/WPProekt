package finki.dabod.wpproekt.repositories;

import finki.dabod.wpproekt.models.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TagRepository extends CrudRepository<Tag, Integer> {
    List<Tag> findAll();
    List<Tag> findByNameLike(String name);

    /*@Query("SELECT DISTINCT tag FROM Tag tag JOIN post_tags ON post_tags.")
    List<Tag> findTagsForPost(int postId);*/
    Tag findById(int id);
}
