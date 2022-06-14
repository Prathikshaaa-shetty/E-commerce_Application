import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { EmailjsComponent } from './component/emailjs/emailjs.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { CanActivateGuard } from './can-activate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, canActivate: [CanActivateGuard]},
  { path: 'cart', component: CartComponent, canActivate: [CanActivateGuard], },
  { path: 'wish-list', component: WishListComponent,canActivate: [CanActivateGuard], },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'checkout', component: CheckoutComponent,canActivate: [CanActivateGuard], },
  { path: 'invoice', component: InvoiceComponent,canActivate: [CanActivateGuard], },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
