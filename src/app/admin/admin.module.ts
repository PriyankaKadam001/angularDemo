import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminProductsComponent } from './products/products.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AdminAuthService } from '../auth/admin-auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const adminRoutes = [{
  path: '',
  redirectTo:'admin/products',
  pathMatch: 'full',
  children: [
    {
      path: 'admin/products',
      component: AdminProductsComponent,
      canActivate: [AuthGuardService, AdminAuthService]
    },
    {
      path: 'admin/products/new',
      component: ProductFormComponent,
      canActivate: [AuthGuardService, AdminAuthService]
    },
    {
      path: 'admin/products/:id',
      component: ProductFormComponent,
      canActivate: [AuthGuardService, AdminAuthService]
    },
    {
      path: 'admin/orders',
      component: OrdersComponent,
      canActivate: [AuthGuardService, AdminAuthService]
    }]
}

];

@NgModule({
  declarations: [
    OrdersComponent,
    ProductFormComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([...adminRoutes])
  ]
})
export class AdminModule { }
