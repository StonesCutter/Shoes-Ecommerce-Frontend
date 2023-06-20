import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthServices } from "./auth/auth.service";
import { PROPERTIES } from "src/assets/utils/properties";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  authHttpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQYW9sbzFAZ21haWwuY29tIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTY4NTAxOTg4MCwiZXhwIjoxNjg1MDIzNDgwfQ.vfFHyBbusYEObn1i95FPRhsxpW8XZjwmVZ3r5zkI00M",
    }),
    responseType: "text" as const,
    // accept: "application/json",
  };

  constructor(private http: HttpClient, private authService: AuthServices) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrderList(): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL + "/orders/order_list",
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("getOrderList")));
  }

  sendOrder(order: any): Observable<any> {
    return this.http
      .post(PROPERTIES.BASE_URL + "/orders/add_order", order, this.httpOptions)
      .pipe(catchError(this.handleError<any>("sendOrder")));
  }

  addOrder(order: any): Observable<any> {
    return this.http
      .post(
        PROPERTIES.BASE_URL + "/orders/add_order",
        order,
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("addOrder")));
  }

  deleteOrder(id: number): Observable<any> {
    return this.http
      .delete(
        PROPERTIES.BASE_URL + "/orders/delete_order/" + id,
        this.authHttpOptions
      )
      .pipe(catchError(this.handleError<any>("deleteOrder")));
  }

  modifyOrder(order: any): Observable<any> {
    return this.http
      .put(
        PROPERTIES.BASE_URL + "/orders/modify_order",
        order,
        this.authHttpOptions
      )
      .pipe(catchError(this.handleError<any>("modifyOrder")));
  }

  getCoupon(code: string): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL + "/coupons/search/code=" + code,
        this.authHttpOptions
      )
      .pipe(catchError(this.handleError<any>("getCoupon")));
  }
}
