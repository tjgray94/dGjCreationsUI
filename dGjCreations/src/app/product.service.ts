import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5002/api/products';
  private products = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      tap(data => this.products.next(data)),
      catchError(this.handleError)
    )
  }

  public getProduct(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public addProduct(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  public updateProduct(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public updateProductQuantity(id: any, newQuantity: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/updateQuantity`, { quantity: newQuantity });
  }

  public deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
