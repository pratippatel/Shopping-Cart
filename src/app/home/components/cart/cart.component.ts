import { Component, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  notif = new Notyf();
  orders: Cart[] = [];

  constructor(private http: ProductService, private auth: AuthService) {}

  ngOnInit(): void {
    this._getCart();
  }

  _getCart(): void {
    const userId = this.auth.getUserId();
    this.http.getCartItems(userId).subscribe((data: any) => {
      console.log({ data });

      if (data) {
        this.orders = data;
        console.log(this.orders);
      }
    });
  }

  onRemoveProduct(id: number): void {
    this.http.removeProductFromCart(id).subscribe((res) => {
      console.log({ res });
      this._getCart();
      this.http.incrementCartItemsCountBy(-1);
      this.notif.success('Product Removed From Cart !!');
    });
  }

  onPlaceProduct(id: number): void {
    this.http.removeProductFromCart(id).subscribe((res) => {
      console.log({ res });
      this._getCart();
      this.http.incrementCartItemsCountBy(-1);
      this.notif.success('Order Placed !!');
    });
  }
}
