import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogOutComponent } from './log-out/log-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './checkout/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AdminProductsComponent } from './admin/products/products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { NgxDataTableModule } from'angular-9-datatable';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppinCartSummaryComponent } from './shoppin-cart-summary/shoppin-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { SharedModule } from './shared/shared.module';

const appRoutes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'log-out',
    component: LogOutComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LogOutComponent,
    OrderSuccessComponent,
    ProductsComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrdersComponent,
    ProductFormComponent,
    AdminProductsComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    ShoppinCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot([...appRoutes]),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    CommonModule,
    NgxDataTableModule,
    SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
