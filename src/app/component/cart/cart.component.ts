import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: CartItem[] = [];
  public quantity!: any;
  public grandTotal: number = 0;
  public totalPrice!: number;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res) => {
      this.products = res;
      res.map((a: any) => {
        this.grandTotal += a.price * a.quantity;
        localStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
      });
    });
  }

  removeItem(cartItem: any) {
    this.cartService.deleteCart(cartItem.id).subscribe((x) => {
      this.cartService.getCartItems().subscribe((items) => {
        this.products = items;
        items.map((a: any) => {
          this.grandTotal += a.price * a.quantity;
          localStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
        });
      });
    });
  }

  emptycart() {
    this.cartService.emptyCart().subscribe((x) => {
      this.products = [];
    });
  }

  onAdd(item: CartItem) {
    const cartItem: CartItem = JSON.parse(JSON.stringify(item));
    cartItem.quantity = (item.quantity || 0) + 1;
    this.cartService.addUpdateCart(cartItem).subscribe((x) => {
      item.quantity = (item.quantity || 0) + 1;
    });
  }

  onMinus(item: any) {
    if (item.quantity > 1) {
      const cartItem: CartItem = JSON.parse(JSON.stringify(item));
      cartItem.quantity = item.quantity - 1;
      this.cartService.addUpdateCart(cartItem).subscribe((x) => {
        item.quantity = item.quantity - 1;
      });
      // this.quantity = item.quantity
    } else {
      if (item.quantity <= 1) {
        this.removeItem(item);
      }
    }
  }

  priceChange() {
    console.log(this.cartService.getTotalPrice());
    this.cartService.getCartItems().subscribe((cartItems) => {
      cartItems.map((a: any) => {
        this.grandTotal += a.price * a.quantity;
        localStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
      });
    });
  }




}
