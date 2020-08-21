package finki.dabod.wpproekt.controllers;

import finki.dabod.wpproekt.models.Comment;
import finki.dabod.wpproekt.models.Post;
import finki.dabod.wpproekt.models.Tag;
import finki.dabod.wpproekt.repositories.PostRepository;
import finki.dabod.wpproekt.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostRepository repository;
    private final TagRepository tagRepository;

    @Autowired
    public PostController(PostRepository repository, TagRepository tagRepository){
        this.repository = repository;
        this.tagRepository = tagRepository;
    }

    //BATCH INSERT - FOR TESTING ONLY
    @GetMapping("/bulkcreate")
    public void bulkCreate(){
        Post testPost = new Post();
        testPost.setTitle("Test post");
        testPost.setContent("Test post content");
        testPost.setAuthorName("Admin");

        Comment testComment = new Comment();
        testComment.setAuthorName("user");
        testComment.setContent("This is a test comment");

        testPost.addComment(testComment);
        repository.save(testPost);

        Post testPost_draft = new Post();
        testPost_draft.setTitle("Draft Test post");
        testPost_draft.setContent("Test post content");
        testPost_draft.setAuthorName("Admin");
        testPost_draft.setDraft(true);
        repository.save(testPost_draft);

        for (int i = 0; i < 3; i++){
            Post bulkPost = new Post();
            bulkPost.setTitle("Test post" + i);
            bulkPost.setContent("Test post content" + i);
            bulkPost.setAuthorName("Admin");
            if(i%2 != 0){
                bulkPost.setDraft(true);
            }
            repository.save(bulkPost);
        }
    }

    // GET: /posts
    @GetMapping
    public List<Post> getAllPosts(@RequestParam(defaultValue = "false") boolean getDrafts){
        if(getDrafts){
            return repository.findAll();
        } else {
            return repository.findByIsDraftFalse();
        }
    }

    // GET: /posts/5
    @GetMapping("/{id}")
    public Post getPostWithId(@PathVariable int id){
        return repository.findById(id);
    }

    // GET: /posts/newest
    @GetMapping("/newest")
    public List<Post> getNewestPosts(){
        return repository.findTop3ByAndIsDraftFalseOrderByDateCreatedDesc();
    }

    // POST: /posts
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postPost(@RequestBody Post newPost){
        repository.save(newPost);
    }

    // POST: /posts/5/tags
    @PostMapping("/{id}/tags")
    public void addTagToPost(@PathVariable int id, @RequestBody int tagId) {
        Post targetPost = this.repository.findById(id);
        Tag tagToAdd = tagRepository.findById(tagId);
        if (targetPost != null) {
            if (tagToAdd != null) {
                targetPost.addTag(tagToAdd);
                this.repository.save(targetPost);
                tagToAdd.addPost(targetPost);
                tagRepository.save(tagToAdd);
            }
        }
    }

    // PUT: /posts/
    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public void putPost(@RequestBody Post newPost){
        Post postToUpdate = repository.findById(newPost.getId());
        if(postToUpdate != null){
            postToUpdate.update(newPost);
            repository.save(postToUpdate);
        }
    }

    // DELETE: /posts/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable int id){
        Post postToDelete = repository.findById(id);
        if(postToDelete != null){
            repository.delete(postToDelete);
        }
    }
}
