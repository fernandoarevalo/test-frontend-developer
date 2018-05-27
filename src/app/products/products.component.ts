import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ProductService } from "../product.service";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public shoppingCart: any = [];
  private notification: number = 0;
  private categories: Array<Object>;
  private products: Array<Object>;
  private column: string = '';

  constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.getJSON();
    this.findProductsShoppingCart();
    this.findCatnProductsShoppingCart();
  }

  findProductsShoppingCart() {
    this.shoppingCart = this.storage.get('products')  ? this.storage.get('products') : [];
  }

  findCatnProductsShoppingCart() {
    this.notification = this.storage.get('products') ? this.storage.get('products').length : 0;
  }

  getJSON(): any {
    this.productService.getJSON().subscribe(data => {
      this.categories = data.categories;
      this.products = data.products;
    });
  }

  addShoppingCart(_pProduct: any) {
    this.shoppingCart.push(_pProduct);
    this.storage.set('products', this.shoppingCart);
    this.openSnackBar('Added product', _pProduct.name);
    this.findCatnProductsShoppingCart();
  }

  openSnackBar(_pMessage: string, _pAction: string) {
    this.snackBar.open(_pMessage, _pAction, {
      duration: 500,
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ShoppingCartComponent, {
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.findProductsShoppingCart();
      this.findCatnProductsShoppingCart();
    });
  }
}
