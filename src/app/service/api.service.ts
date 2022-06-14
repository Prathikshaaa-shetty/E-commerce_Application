import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public products: Observable<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.products = this.fetchProducts();
  }

  fetchProducts() {
    return this.http.get<any>('http://localhost:5000/products/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProducts(): Observable<any[]> {
    return this.products;
  }
}
