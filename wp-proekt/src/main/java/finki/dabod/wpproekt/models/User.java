package finki.dabod.wpproekt.models;

import finki.dabod.wpproekt.auth.AuthService;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class User {
    @Id
    private String uid;
    private String userName;

    @Enumerated(EnumType.ORDINAL)
    private AuthService.Role role;
}
