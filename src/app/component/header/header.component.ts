import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public wishItem: number = 0;
  public searchTerm!: string;
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemRx.subscribe(
      (cartItems) => (this.totalItem = cartItems.length)
    );
    this.wishlistService.getProducts().subscribe((res) => {
      this.wishItem = res.length;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  logout()  {
    alert("Are you sure you want to logout?")
    localStorage.setItem('access','false');
    this.router.navigateByUrl('/login');
    

  }
}
