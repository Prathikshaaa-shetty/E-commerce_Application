import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../component/cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: CartItem[] = [];
  public cartItemRx = new BehaviorSubject<CartItem[]>([]);
  // public cartItemList: any[] = [];
  // public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor(public http: HttpClient) {
    this.loadCartItems();
  }

  loadCartItems() {
    this.getCartItems().subscribe((item) => (this.cartItems = item));
  }

  addtoCart(product: any) {
    this.addUpdateCart(product).subscribe((x) => {
      this.getCartItems().subscribe((item) => {
        this.cartItems = item;
        //this.getTotalPrice();
      });
    });
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItems.map((a: any) => {
      grandTotal += a.total * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.deleteCart(product.id).subscribe((x) => {
      this.getCartItems().subscribe((item) => {
        this.cartItems = item;
        //this.getTotalPrice();
      });
    });
  }

  onAdd(cartItem: any) {
    cartItem.quantity = cartItem.quantity - 1;
    this.addUpdateCart(cartItem).subscribe((x) => {
      this.getCartItems().subscribe((item) => (this.cartItems = item));
    });
  }

  onMinus(cartItem: any) {
    cartItem.quantity = cartItem.quantity - 1;
    this.addUpdateCart(cartItem).subscribe((x) => {
      this.getCartItems().subscribe((item) => (this.cartItems = item));
    });
  }

  public getCartItems(): Observable<CartItem[]> {
    const cartItemRx = this.http.get<any[]>('http://localhost:5000/cart');
    cartItemRx.subscribe((cartItems: CartItem[]) =>
      this.cartItemRx.next(cartItems)
    );
    return cartItemRx;
  }


  public addUpdateCart(cartItem: any) {
    return this.http.post<any[]>('http://localhost:5000/cart', cartItem);
  }

  public deleteCart(id: any) {
    return this.http.delete<any[]>('http://localhost:5000/cart/' + id);
  }

  public emptyCart() {
    return this.http.delete<any[]>('http://localhost:5000/cart/');
  }

  public getFilteredData(category: any) {
    return this.http.get<any>('http://localhost:5000/products/' + category);
  }
  public sendInvoiceData(invoice: any) {
    return this.http.post<any[]>('http://localhost:5000/sendInvoice', invoice);
  }

  public userList(user:any) {
    return this.http.post<any[]>('http://localhost:5000/userList',user);
  }

  public getUserList() {
    return this.http.get<any[]>('http://localhost:5000/userList');
  }

}
