package finki.dabod.wpproekt.controllers;

import finki.dabod.wpproekt.models.Tag;
import finki.dabod.wpproekt.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
    private final TagRepository repository;

    @Autowired
    public TagController(TagRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Tag> getTags(@RequestParam(defaultValue = "") String name){
        if(name != null && !name.isEmpty()){
            return repository.findByNameLike(name);
        } else {
            return repository.findAll();
        }
    }

    @PostMapping
    public void postTag(@RequestBody Tag tag){
        repository.save(tag);
    }

    @DeleteMapping("/{id}")
    public void deleteTag(@PathVariable int id){
        Tag tagToDelete = repository.findById(id);
        if(tagToDelete != null){
            repository.delete(tagToDelete);
        }
    }
}
