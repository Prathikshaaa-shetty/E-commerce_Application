import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { LoginComponent } from './component/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { EmailjsComponent } from './component/emailjs/emailjs.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    WishListComponent,
    LoginComponent,
    SignUpComponent,
    EmailjsComponent,
    CheckoutComponent,
    InvoiceComponent
  
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // FormBuilder,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
