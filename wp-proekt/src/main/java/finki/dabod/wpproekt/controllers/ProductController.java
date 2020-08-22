package finki.dabod.wpproekt.controllers;

import finki.dabod.wpproekt.auth.RequireAdmin;
import finki.dabod.wpproekt.models.Product;
import finki.dabod.wpproekt.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository repository;

    public ProductController(ProductRepository repository){
        this.repository = repository;
    }

    // GET: /products
    @GetMapping
    public List<Product> getAllProducts(){
        return this.repository.findAll();
    }

    // GET: /products/5
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable int id){
        return this.repository.findById(id);
    }

    // GET: /products/hot
    @GetMapping("/hot")
    public List<Product> getHotProducts(){
        List<Product> allProducts = this.repository.findAll();
        List<Product> hotProducts = new ArrayList<>();
        Random rand = new Random();
        for(int i = 0; i < 3; i++){
            hotProducts.add(allProducts.get(rand.nextInt(allProducts.size())));
        }
        return hotProducts;
    }

    // POST: /products
    @RequireAdmin
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postProduct(@RequestBody Product newProduct){
        repository.save(newProduct);
    }

    // PUT: /products
    @RequireAdmin
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void putProduct(@RequestBody Product newProduct){
        Product productToUpdate = repository.findById(newProduct.getId());
        if(productToUpdate != null){
            productToUpdate.setName(newProduct.getName());
            productToUpdate.setDescription(newProduct.getDescription());
            productToUpdate.setImageUrl(newProduct.getImageUrl());
            productToUpdate.setPrice(newProduct.getPrice());
        }
    }

    // DELETE: /products/5
    @RequireAdmin
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable int id){
        Product productToDelete = repository.findById(id);
        if(productToDelete != null) {
            repository.delete(productToDelete);
        }
    }
}
