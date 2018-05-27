import { Component, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public productsShoppingCart: any = [];
  private categories: Array<Object>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    public snackBar: MatSnackBar,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.findProductsShoppingCart();
  }

  findProductsShoppingCart() {
    this.productsShoppingCart = this.storage.get('products');
  }

  removeShoppingCart(_pProduct, _pIndex) {
    this.productsShoppingCart.splice(_pIndex, 1);
    this.storage.set('products', this.productsShoppingCart);
    this.openSnackBar('Removed product', _pProduct.name);
    if (this.productsShoppingCart.length <= 0) this.dialogRef.close();;
  }

  openSnackBar(_pMessage: string, _pAction: string) {
    this.snackBar.open(_pMessage, _pAction, {
      duration: 500,
    });
  }
}
