package finki.dabod.wpproekt.repositories;

import finki.dabod.wpproekt.models.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    List<Product> findAll();

    Product findById(int id);
}
