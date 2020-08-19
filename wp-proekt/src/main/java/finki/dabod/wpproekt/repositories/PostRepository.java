package finki.dabod.wpproekt.repositories;

import finki.dabod.wpproekt.models.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends CrudRepository<Post, Integer> {
    List<Post> findAll();
    List<Post> findById(int id);
}
