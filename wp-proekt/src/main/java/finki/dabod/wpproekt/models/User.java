package finki.dabod.wpproekt.models;

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
    private Role role;

    public enum Role{
        ADMIN,
        USER
    }
}
