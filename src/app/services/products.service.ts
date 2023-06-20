import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PROPERTIES } from "src/assets/utils/properties";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) {}

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

  getProducts(
    page?: number,
    lang?: string,
    filter?: string,
    perPage?: number
  ): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL +
          `/products/page=${page}/perPage=${perPage}/${lang}${filter}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getNewProducts(
    page?: number,
    lang?: string,
    filter?: string,
    perPage?: number
  ): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL +
          `/products/new/page=${page}/perPage=${perPage}/${lang}${filter}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getSearchProduct(
    page?: number,
    lang?: string,
    term?: string,
    perPage = 12
  ): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL +
          `/products/search/page=${page}/perPage=${perPage}/${lang}?q=${term}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getProduct(id?: number, lang?: string): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + `/products/${id}/${lang}`, this.httpOptions)
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getBrands(): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + `/brands`, this.httpOptions)
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getCategories(lang?: string): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + `/categories/${lang}`, this.httpOptions)
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getCategory(lang: string, code: string): Observable<any> {
    return this.http
      .get(
        PROPERTIES.BASE_URL + `/categories/${code}/${lang}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>("getProducts")));
  }

  getColors(lang?: string): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + `/colors/${lang}`, this.httpOptions)
      .pipe(catchError(this.handleError<any>("getProducts")));
  }
  getSizes(): Observable<any> {
    return this.http
      .get(PROPERTIES.BASE_URL + `/sizes`, this.httpOptions)
      .pipe(catchError(this.handleError<any>("getProducts")));
  }
}
