import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { GlobalStateService } from "src/app/services/global-state.service";
import { TranslateService } from "@ngx-translate/core";
import { formatCategoryCode } from "src/assets/utils/utils";
import { CartService } from "src/app/services/cart.service";
import { AuthServices } from "src/app/services/auth/auth.service";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: any = this.authService.isLogged;
  title: string = "Accordion Title";
  description: string = "Accordion Description";
  isVisible: boolean = false;
  inputFocused: boolean = false;
  categories: Observable<any>;
  currentLanguage: string | undefined;
  searchQuery: string = "";
  cartTotal: any;
  products: any;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private globalStateService: GlobalStateService,
    private translateService: TranslateService,
    private cartService: CartService,
    private authService: AuthServices,
    private storageService: StorageService
  ) {
    this.categories = this.productsService.getCategories();
    this.categories.subscribe((data) => {
      console.log("CATEGORIES AAAA", data);
    });
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe((isLogged: boolean) => {
      this.isUserLoggedIn = isLogged;
    });
    this.isUserLoggedIn =
      this.storageService.getStorage<boolean>("isUserLoggedIn");

    console.log("IS LOGGED", this.isUserLoggedIn);
    this.currentLanguage = this.translateService.currentLang;
    const products = this.cartService.getCartList();
    products.subscribe((data) => {
      this.products = data.items;
      console.log(this.products);
      const money = data.items.map((el: any) => {
        return el.sellingItemTotalPrice;
      });

      this.cartTotal = money.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );
    });
  }

  logOut() {
    console.log("Logging out...");
    this.authService.logout().subscribe((data) => {
      console.log("LOGOUT data:", data);
    });
    this.authService.isLogged.subscribe((isLogged: boolean) => {
      this.isUserLoggedIn = isLogged;
    });
    // this.storageService.clear();
    // this.router.navigate(["/accedi"]);
  }

  getCategoryLink(categoryCode: string, path: string): string {
    const formattedCode = formatCategoryCode(categoryCode);
    return `/scarpe/${path}/${formattedCode}/`;
  }

  toggleSideNav(): void {
    this.isVisible = !this.isVisible;
  }

  wideInput(): void {
    this.inputFocused = true;
  }

  smallInput(): void {
    this.inputFocused = false;
  }

  goToCart(): void {
    this.router.navigate(["cart"]);
  }

  updateCategory(category: string): void {
    this.globalStateService.setCategory(category);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARGH");
  }

  onSearch(query: string): void {
    if (query) {
      const encodedQuery = encodeURIComponent(query);
      this.router.navigate(["/ricerca"], { queryParams: { q: encodedQuery } });
    }
  }

  goToOrders() {
    this.router.navigate(["area-personale/lista-ordini"]);
  }
}

// import { Component, OnInit } from "@angular/core";
// import { ProductsService } from "src/app/services/products.service";
// import { Observable } from "rxjs";
// import { Router } from "@angular/router";
// import { GlobalStateService } from "src/app/services/global-state.service";
// import { TranslateService } from "@ngx-translate/core";
// import { formatCategoryCode } from "src/assets/utils/utils";

// @Component({
//   selector: "app-header",
//   templateUrl: "./header.component.html",
//   styleUrls: ["./header.component.scss"],
// })
// export class HeaderComponent implements OnInit {
//   isVisible: boolean = false;
//   inputFocused: boolean = false;
//   categories: Observable<any>;
//   currentLanguage: string | undefined;

//   constructor(private productsService: ProductsService,
//     private router: Router,
//     private globalStateService: GlobalStateService,
//     private translateService : TranslateService) {
//     this.categories = this.productsService.getCategories();
//     this.categories.subscribe((data) => {
//       console.log("CATEGORIES AAAA", data);
//     });
//   }

//     ngOnInit(): void {

//       this.currentLanguage = this.translateService.currentLang;

//   }

//   getCategoryLink(categoryCode: string, path: string): string {
//     const formattedCode = formatCategoryCode(categoryCode);
//     return `/scarpe/${path}/${formattedCode}/`;
//   }

//   toggleSideNav() {
//     this.isVisible = !this.isVisible;
//   }

//   wideInput() {
//     this.inputFocused = true;
//   }

//   smallInput() {
//     this.inputFocused = false;
//   }

//   goToCart() {
//     this.router.navigate(["cart"]);
//   }

//   updateCategory(category: string): void {
//     // this.translateService.use(newLang);
//     this.globalStateService.setCategory(category);
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARGH")
//   }

//   onSearch(query: string): void {
//     const encodedQuery = encodeURIComponent(query);
//     this.router.navigate(["/ricerca"], { queryParams: { q: encodedQuery } });
//   }
// }
