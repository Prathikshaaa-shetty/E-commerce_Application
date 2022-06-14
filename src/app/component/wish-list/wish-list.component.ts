import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  constructor(private wishListService: WishlistService) {}

  ngOnInit(): void {
    this.wishListService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.wishListService.getTotalPrice();
    });
  }
  removeItemFromWish(item: any) {
    this.wishListService.removeCartItem(item);
  }
  emptyCartFromWish() {
    this.wishListService.removeAllCart();
  }


}
