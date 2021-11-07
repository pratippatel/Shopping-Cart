import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/gaurd/auth.gaurd.service';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'product/new',
        component: AddEditProductComponent,
      },
      {
        path: 'product/new',
        component: AddEditProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
