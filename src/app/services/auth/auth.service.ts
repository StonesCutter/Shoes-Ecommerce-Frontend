import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { UserLoginInterface } from "../../interfaces/UserLoginInterface";
import { UserSignUpInterface } from "src/app/interfaces/UserSignUpInterface";
import { StorageService } from "../storage/storage.service";
import { catchError, finalize, tap } from "rxjs/operators";
import { PROPERTIES } from "src/assets/utils/properties";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServices {
  // isLogged: boolean = false;
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  token: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.storageService.getStorage("token")
  );
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  authHttpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYW9sbzFAZ21haWwuY29tIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTY4NDc2NjkwNCwiZXhwIjoxNjg0NzcwNTA0fQ.5OIUrN0DjS_y6LKQAlV36yiiRh1g33mk9x2Rc6sxFyE",
    }),
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  getHeaderOptions(isAuth: boolean = false): { headers: HttpHeaders } {
    if (isAuth) {
      // console.log("token.value:", this.token.value);
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Acces-Control-Allow-Origin": "*",
          Authorization: `Bearer ${this.token.value}`,
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Acces-Control-Allow-Origin": "*",
        }),
      };
    }
  }

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

  login(body: UserLoginInterface): Observable<any> {
    return this.http
      .post(PROPERTIES.BASE_URL + "/signin", body, this.getHeaderOptions())
      .pipe(
        tap((res: any) => {
          console.log("tap", res);
          // this.isLogged = true;
          this.isLogged.next(true);

          this.storageService.setStorage<string>("token", res.token);
          this.storageService.setStorage<string>(
            "refreshToken",
            res.refreshToken
          );
          this.token.next(res.token);
        })
      );
  }

  signUp(body: UserSignUpInterface): Observable<any> {
    return this.http
      .post(PROPERTIES.BASE_URL + "/signup", body, this.getHeaderOptions())
      .pipe(catchError(this.handleError<any>("signUp")));
  }

  refreshToken(): Observable<any> {
    console.log("inizio refresh token");
    const refreshToken = this.storageService.getStorage("refreshToken");
    return this.http.post<any>(
      PROPERTIES.BASE_URL + "/refresh_token",
      {
        refreshToken: refreshToken,
      },
      this.getHeaderOptions()
    );
  }

  getUser() {
    return this.http.get(
      PROPERTIES.BASE_URL + "/user",
      this.getHeaderOptions(true)
    );
  }

  logout(): Observable<any> {
    const refreshToken: string | null | undefined =
      this.storageService.getStorage("refreshToken");

    if (refreshToken) {
      return this.http
        .post<any>(
          PROPERTIES.BASE_URL + "/sign_out",
          {
            refreshToken: refreshToken,
          },
          this.getHeaderOptions(true)
        )
        .pipe(
          finalize(() => {
            console.log("finalizing logout");
            const currentLang: string =
              this.storageService.getStorage("language");
            this.storageService.clear();
            this.storageService.setStorage<string>("language", currentLang);
            this.token.next("");
            // this.isLogged = false;
            this.isLogged.next(false);
            this.router.navigate(["accedi"]);
          })
        );
    }

    return of("LOGGED OUT").pipe(
      finalize(() => {
        this.storageService.clear();
        this.token.next("");
      })
    );
  }
}
