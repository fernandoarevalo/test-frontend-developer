import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private data: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getJSON();
  }

  getJSON(): any {
    this.productService.getJSON()
      .subscribe(data => this.data = data);
  }

}
