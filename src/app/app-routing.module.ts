import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeModule } from './home/home.module';
import { AuthGuardService } from './services/gaurd/auth.gaurd.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeModule,
    canActivateChild: [AuthGuardService],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
