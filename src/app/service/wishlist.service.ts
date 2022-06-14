import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  public wishItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.wishItemList.push(...product);
    this.productList.next(product);
  }
  wishlistCart(product : any){
    this.wishItemList.push(product);
    this.productList.next(this.wishItemList);
    this.getTotalPrice();
    console.log(this.wishItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.wishItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.wishItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.wishItemList.splice(index,1);
      }
    })
    this.productList.next(this.wishItemList);
  }
  removeAllCart(){
    this.wishItemList = []
    this.productList.next(this.wishItemList);
  }

  
}
