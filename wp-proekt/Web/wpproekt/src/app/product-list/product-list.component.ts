import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Product } from '../models/Product'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private service: ApiService) { }

  products: Product[]

  ngOnInit(): void {
    this.service.getProducts().subscribe((data) => {
      this.products = data
      console.log(data)
    })
  }

}
