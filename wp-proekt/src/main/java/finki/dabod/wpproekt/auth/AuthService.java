package finki.dabod.wpproekt.auth;

import finki.dabod.wpproekt.models.User;
import finki.dabod.wpproekt.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository repository;

    public AuthService(UserRepository repository) {
        this.repository = repository;
    }

    public boolean doesUserHaveRole(String uid, Role role){
        User targetUser = repository.findByUid(uid);
        if(targetUser != null){
            return targetUser.getRole().equals(role);
        }
        return false;
    }

    public enum Role{
        ADMIN,
        USER
    }
}
