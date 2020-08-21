package finki.dabod.wpproekt.controllers;


import finki.dabod.wpproekt.models.User;
import finki.dabod.wpproekt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository repository;

    @Autowired
    public UserController(UserRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return repository.findAll();
    }

    @GetMapping("/{uid}")
    public User getUser(@PathVariable String uid){
        return repository.findByUid(uid);
    }

    @PostMapping
    public void postUser(@RequestBody User user){
        repository.save(user);
    }

    @DeleteMapping("/{uid}")
    public void deleteUser(@PathVariable String uid){
        User userToDelete = repository.findByUid(uid);
        if (userToDelete != null) {
            repository.delete(userToDelete);
        }
    }
}
