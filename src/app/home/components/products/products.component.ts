import { Component, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import 'notyf/notyf.min.css';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  notyf = new Notyf();

  constructor(private http: ProductService, private auth: AuthService) {}

  _getProducts(): void {
    this.http.getAllProducts().subscribe((data: any) => {
      console.log({ data });
      if (data) {
        this.products = data;
        console.log(this.products.length);
      }
    });
  }

  _addItemToCart(product: Product): void {
    console.log({ product });
    const payload = new FormData();
    payload.append('productId', product.id.toString());
    payload.append('userId', this.auth.getUserId());
    payload.append('quantity', '1');
    this.http.addToCart(payload).subscribe(() => {
      this._getProducts();
      this.http.incrementCartItemsCountBy(1);
      this.notyf.success('Product Added To Cart !!');
    });
  }

  isAdmin() {
    const user = this.auth.getUsername();
    if (user == 'admin') {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this._getProducts();
  }
}
