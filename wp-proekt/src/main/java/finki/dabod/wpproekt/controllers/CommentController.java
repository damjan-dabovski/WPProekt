package finki.dabod.wpproekt.controllers;

import finki.dabod.wpproekt.auth.RequireLogin;
import finki.dabod.wpproekt.models.Comment;
import finki.dabod.wpproekt.models.Post;
import finki.dabod.wpproekt.repositories.CommentRepository;
import finki.dabod.wpproekt.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentRepository repository;
    private final PostRepository postRepository;

    @Autowired
    public CommentController(CommentRepository repository, PostRepository postRepository){
        this.repository = repository;
        this.postRepository = postRepository;
    }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable int id){
        return this.repository.findById(id);
    }

    @GetMapping("/forPost/{id}")
    public List<Comment> getCommentsForPost(@PathVariable int postId){
        return this.repository.findAllByPostId(postId);
    }

    @RequireLogin
    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void postComment(@RequestBody Comment comment, @PathVariable int postId){
        Post targetPost = postRepository.findById(postId);
        if(targetPost != null){
            comment.setPost(targetPost);
            this.repository.save(comment);
        }
    }

    @RequireLogin
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void putComment(@RequestBody Comment newComment){
        Comment commentToUpdate = this.repository.findById(newComment.getId());
        if(commentToUpdate != null){
            commentToUpdate.setContent(newComment.getContent());
            repository.save(commentToUpdate);
        }
    }

    @RequireLogin
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteComment(@PathVariable int id){
        Comment commentToDelete = this.repository.findById(id);
        if(commentToDelete != null){
            repository.delete(commentToDelete);
        }
    }
}
