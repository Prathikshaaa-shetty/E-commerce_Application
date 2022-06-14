import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  public products: any = [];
  public quantity!: any;
  public grandTotal!: number;
  public totalPrice!: number;
  public localData: any;
  email: string = '';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.localData = localStorage.getItem('grandTotal');
    this.cartService.getCartItems().subscribe((res) => {
      this.products = res;
      res.map((a: any) => {
        this.grandTotal += a.price * a.quantity;
      });
    });
  }

  priceChange() {
    // console.log(this.cartService.getTotalPrice());
    this.cartService.getCartItems().subscribe((cartItems) => {
      cartItems.map((a: any) => {
        this.grandTotal += a.price * a.quantity;
      });
    });
  }

  removeItem(cartItem: any) {
    this.cartService.deleteCart(cartItem.id).subscribe((x) => {
      this.cartService.getCartItems().subscribe((items) => {
        this.products = items;
        items.map((a: any) => {
          this.grandTotal += a.price * a.quantity;
        });
      });
    });
  }

  onSendMail() {
    if (!this.email) {
      alert('Please enter the email address');
    } else {
      console.log(this.email, 'email');

      let reqBody = {
        email: this.email,
        ItemsOrdered: this.products,
      };

      this.cartService.sendInvoiceData(reqBody).subscribe(
        (res) => {
          console.log('Invoice Sent Successfully');
        },
        (err) => {
          console.log(err, 'Error sending Invoice');
        }
      );
      alert('Email sent successfully');
    }
  }
}
