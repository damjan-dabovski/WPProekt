package finki.dabod.wpproekt.controllers;

import finki.dabod.wpproekt.models.Post;
import finki.dabod.wpproekt.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostRepository repository;

    @Autowired
    public PostController(PostRepository repository){
        this.repository = repository;
    }

    //BATCH INSERT
    @GetMapping("/bulkcreate")
    public void bulkCreate(){
        Post testPost = new Post();
        testPost.setTitle("Test post");
        testPost.setContent("Test post content");
        testPost.setAuthorName("Admin");
        testPost.setDraft(true);
        repository.save(testPost);
    }

    @GetMapping
    public List<Post> findAll(){
        return repository.findAll();
    }
}
