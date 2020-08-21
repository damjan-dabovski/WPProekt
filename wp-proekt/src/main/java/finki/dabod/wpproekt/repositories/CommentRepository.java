package finki.dabod.wpproekt.repositories;

import finki.dabod.wpproekt.models.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findAll();
    List<Comment> findAllByPostId(int postId);

    Comment findById(int id);
}
