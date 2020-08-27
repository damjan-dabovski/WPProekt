import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {

  constructor(private service: ApiService, private storage: AngularFireStorage) { }

  @Input()
  productName: string;
  @Input()
  productDescription: string;
  @Input()
  productPrice: number;

  productImageUrl: string;
  file: any;

  ngOnInit(): void {
  }

  fileAttached(files: any){
    this.file = files[0] 
    console.log(this.file)
  }

  submitProduct(){
    var ref = this.storage.storage.ref(`/products/${this.file.name}`)
    ref.put(this.file)
      .then(snapshot => {
        ref.getDownloadURL().then(url => {
          console.log('File uploaded at ' + url)
          this.service.postProduct({
            name: this.productName,
            description: this.productDescription,
            price: this.productPrice,
            imageUrl: url
          })
        })
      })
    console.log("//TODO")
  }

}
