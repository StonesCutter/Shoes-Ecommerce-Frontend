import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PROPERTIES } from "src/assets/utils/properties";
import { AuthServices } from "./auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class WhishlistService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  authHttpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYW9sbzFAZ21haWwuY29tIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTY4NDc1ODM3NCwiZXhwIjoxNjg0NzYxOTc0fQ.J6BkxdPIC-EAcVzWpMzM2Ib_dDXdeisi-9YGfBYHo5w",
    }),
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

  getWishList(): Observable<any> {
    return this.http.get(
      PROPERTIES.BASE_URL + "/wishlist",
      this.authService.getHeaderOptions(true)
    );
  }

  addWishList(obj: any): Observable<any> {
    return this.http
      .post(
        PROPERTIES.BASE_URL + "/wishlist/add",
        obj,
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("addWishList")));
  }

  deleteWishList(id: any): Observable<any> {
    return this.http
      .delete(
        PROPERTIES.BASE_URL + "/wishlist/delete/" + id,
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("deleteWishList")));
  }
}
