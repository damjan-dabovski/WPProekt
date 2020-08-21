package finki.dabod.wpproekt.repositories;

import finki.dabod.wpproekt.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findAll();

    User findByUid(String uid);
    User findByUserName(String userName);
}
