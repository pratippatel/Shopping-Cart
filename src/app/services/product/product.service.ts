import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  cartItemsCount: number = 0;
  cartItemsCount$: EventEmitter<number> = new EventEmitter<number>();

  header = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('sc-token')}`
  );

  options = { headers: this.header };

  incrementCartItemsCountBy(count: number) {
    this.cartItemsCount += count;
    this.cartItemsCount$.emit(this.cartItemsCount);
  }

  setCartItemsCount(count: number) {
    this.cartItemsCount = count;
    this.cartItemsCount$.emit(this.cartItemsCount);
  }

  getAllProducts() {
    return this.http.get(`${environment.baseURL}/products`, this.options);
  }

  addProduct(payload: any) {
    return this.http.post(
      `${environment.baseURL}/products`,
      payload,
      this.options
    );
  }

  addToCart(payload: any) {
    return this.http.post(
      `${environment.baseURL}/orders`,
      payload,
      this.options
    );
  }

  getCartItems(userId: number) {
    return this.http.get(
      `${environment.baseURL}/orders/getUserOrders/${userId}`,
      this.options
    );
  }

  removeProductFromCart(id: number) {
    return this.http.delete(
      `${environment.baseURL}/orders/${id}`,
      this.options
    );
  }
}
