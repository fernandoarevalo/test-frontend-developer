import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private categories: Array<Object>;
  private products: Array<Object>;
  private column: string = '';
  private isDesc: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getJSON();
  }

  getJSON(): any {
    this.productService.getJSON().subscribe(data => {
      this.categories = data.categories;
      this.products = data.products;
    });
  }

  sort(property){
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.products.sort(function(a, b){
        if(a[property] < b[property]){
            return -1 * direction;
        }
        else if( a[property] > b[property]){
            return 1 * direction;
        }
        else{
            return 0;
        }
    });
};


}
