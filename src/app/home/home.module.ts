import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CartComponent } from './components/cart/cart.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    ProductsComponent,
    AddEditProductComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HomeRoutingModule],
  exports: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    AddEditProductComponent,
    ProductsComponent,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
