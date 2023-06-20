import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { PROPERTIES } from "src/assets/utils/properties";
import { AuthServices } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AddressesService {
  addresses: Subject<any> = new Subject();
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

  getAddressList(): Observable<any> {
    // return this.http
    //   .get(PROPERTIES.BASE_URL + "/user/addresses", this.authHttpOptions)
    //   .pipe(catchError(this.handleError<any>("getAddressList")));

    const result = new Subject();

    this.http
      .get(
        PROPERTIES.BASE_URL + "/user/addresses",
        this.authService.getHeaderOptions(true)
      )
      .subscribe((res) => {
        this.addresses.next(res);
        result.next(res);
      });
    return result.asObservable();
  }

  getAddress(id: number): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + "/user/address/" + id, this.authHttpOptions)
      .pipe(catchError(this.handleError<any>("getAddress")));
  }

  addAddress(newAddress: any): Observable<any> {
    return this.http
      .post<any>(
        `${PROPERTIES.BASE_URL}/user/address`,
        newAddress,
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("addAddress")));
  }

  deleteAddress(id: number): Observable<any> {
    return this.http
      .delete<any>(
        `${PROPERTIES.BASE_URL}/user/address/${id}`,
        this.authService.getHeaderOptions(true)
      )
      .pipe(catchError(this.handleError<any>("deleteAddress")));
  }

  modifyAddress(id: number, address: any): Observable<any> {
    return this.http
      .put(
        PROPERTIES.BASE_URL + "/user/address/" + id,
        address,
        this.authHttpOptions
      )
      .pipe(catchError(this.handleError<any>("modifyAddress")));
  }
}
