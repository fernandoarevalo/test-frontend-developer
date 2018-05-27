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
}
