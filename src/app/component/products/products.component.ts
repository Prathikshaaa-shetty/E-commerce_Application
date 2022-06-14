import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { CartItem } from '../cart/cart.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //storing all the product from the api inside productlist
  buttonDisabled: boolean = false;
  public productList: any;
  public filterCategory: any[] = [];
  public cartItemIdList: number[] = [];
  searchKey: string = '';
  products: CartItem[] = [];
  public page: number = 1;
  public totalLength!: number;

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private wishListService: WishlistService
  ) {
    this.bindCartItems();
  }

  bindCartItems(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItemIdList = cartItems.map((item: any) => item.id);
    });
  }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.bindCartItemsToProducts();
    });
  }

  bindCartItemsToProducts(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.productList = this.productList.map((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }

        let cartItem = cartItems.find((item: any) => item.id == a.id);
        a.quantity = cartItem ? cartItem.quantity || 0 : 0;
        a.total = a.price;
        return a;
      });
    });
  }

  ngAfterViewInit() {
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.cartService.getCartItems().subscribe((res) => {
      this.products = res;
      console.log('Works');
      // this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  addtoCart(item: CartItem) {
    this.cartService.getCartItems().subscribe((cartItems) => {
      if (
        cartItems &&
        cartItems.find((prod: any) => prod.id === item.id)?.quantity ==
          item.quantity
      ) {
        alert('This product is already present in the cart!');
      } else {
        this.onAdd(item);
      }
    });
  }

  filter(category: string) {
    // this.filterCategory = this.productList.filter(
    //   (a: any) => a.category == category || category == ''
    // );
    this.cartService.getFilteredData(category).subscribe((res: any) => {
      this.filterCategory = this.productList.filter(
        (a: any) => a.category == category || category == ''
      );
    });
  }

  OnWishList(item: any) {
    this.wishListService.wishlistCart(item);
  }

  onAdd(item: any) {
    const cartItem: CartItem = JSON.parse(JSON.stringify(item));
    cartItem.quantity = (item.quantity || 0) + 1;
    this.cartService.addUpdateCart(cartItem).subscribe((x) => {
      item.quantity = (item.quantity || 0) + 1;
      this.bindCartItems();
      this.bindCartItemsToProducts();
    });
    //this.cartService.onAdd(item);
  }

  onMinus(item: any) {
    if (item.quantity > 1) {
      const cartItem: CartItem = JSON.parse(JSON.stringify(item));
      cartItem.quantity = item.quantity - 1;
      this.cartService.addUpdateCart(cartItem).subscribe((x) => {
        item.quantity = item.quantity - 1;
        this.bindCartItems();
        this.bindCartItemsToProducts();
      });
      // this.quantity = item.quantity
    } else {
      if (item.quantity <= 1) {
        this.cartService.removeCartItem(item);
        this.bindCartItems();
        this.bindCartItemsToProducts();
      }
    }
    //this.cartService.onMinus(item);
  }

  sortProductByPrice(option: any) {
    if (option.value == 'l2h') {
      this.filterCategory = this.productList.sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (option.value == 'h2l') {
      this.filterCategory = this.productList.sort(
        (a: any, b: any) => b.price - a.price
      );
    } else if (option.value == 'ol') {
      this.filterCategory = this.productList.filter(
        (a: any) => a.price >= 0 && a.price <= 100
      );
    } else if (option.value == 'br') {
      this.filterCategory = this.productList.filter(
        (a: any) => a.price > 100 && a.price <= 400
      );
    } else {
      this.filterCategory = this.productList.filter((a: any) => a.price > 400);
    }
  }
}
