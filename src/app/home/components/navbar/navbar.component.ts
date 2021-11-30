import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  totolItems: number = 0;

  constructor(
    private http: ProductService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.cartItemsCount$.subscribe((count) => {
      this.totolItems = count;
    });

    this.http.getCartItems(this.auth.getUserId()).subscribe((res: any) => {
      if (res) {
        const totalCount = res.length;
        this.http.setCartItemsCount(totalCount);
      }
    });
  }

  isLogin() {
    return this.auth.isLogin();
  }

  isAdmin() {
    const user = this.auth.getUsername();
    if (user == 'admin@gmail.com') {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
