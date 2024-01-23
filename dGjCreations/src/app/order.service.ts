import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from './order';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5002/api/orders';
  private orders: Order[] = [];

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl).pipe(
      tap(data => this.orders = data),
      catchError(this.handleError)
    )
  }

  public getOrder(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public addOrder(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  public updateOrder(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteOrder(id: any): Observable<any> {
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
