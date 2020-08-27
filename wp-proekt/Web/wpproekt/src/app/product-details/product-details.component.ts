import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private service: ApiService, private route: ActivatedRoute) { }

  productId: number
  product: Product

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']
      this.service.getProduct(this.productId).subscribe(data => {
        this.product = data
        console.log(data)
      })
    })
  }

  deleteProduct(){
    this.service.deleteProduct(this.product.id)
  }

}
