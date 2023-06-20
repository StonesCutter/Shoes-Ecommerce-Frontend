import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  productsCategory: any[] = [];
  isDataReady: boolean = false;
  currentLanguage: string = "it";
  wordSearched: string = "";
  page: number = 1;
  perPage: number = 10;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private globalStateService: GlobalStateService
  ) {}

  ngOnInit(): void {
    this.getSearchFromUrl();

    this.globalStateService.lang$.subscribe((lang) => {
      this.currentLanguage = lang;
      console.log('Global state products-list:', this.currentLanguage);
      this.fetchProducts();
    });

    // Listen to the router events and trigger getSearchFromUrl() when the URL changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getSearchFromUrl();
        this.fetchProducts();
      });
  }

  getSearchFromUrl(): void {
    const url = window.location.href;
    const urlSearchParams = new URLSearchParams(url.split('?')[1]);
    const queryParamValue = urlSearchParams.get('q') ?? '';
    this.wordSearched = queryParamValue;
    console.log("Query Param Value:", queryParamValue);
  }

  fetchProducts(): void {
    //API for the products searched
    const productsCategory = this.productsService.getSearchProduct(
      this.page,
      this.currentLanguage,
      this.wordSearched,
      this.perPage
    );

    productsCategory.subscribe((data) => {
      this.productsCategory = data.products;
      this.isDataReady = true;
      console.log("Prodotti :", this.productsCategory);
    });
  }

  getProductLink(id: string): string {
    return `/scarpa/${id}/`;
  }

  onPaginationModified(event: { pageSize: number, pageIndex: number }): void {
    this.perPage = event.pageSize;
    this.page = event.pageIndex + 1;
    console.log('Selected page size:', event.pageSize);
    console.log('Current page index:', event.pageIndex);
    const productsCategory = this.productsService.getSearchProduct(this.page, this.currentLanguage, this.wordSearched, this.perPage);

    productsCategory.subscribe((data) => {
      this.productsCategory = data.products;
      this.isDataReady = true;
      console.log("Prodotti :", this.productsCategory);
    });
  } 

}


// import { Component, OnInit } from '@angular/core';
// import { ProductsService } from 'src/app/services/products.service';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { GlobalStateService } from 'src/app/services/global-state.service';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss']
// })
// export class SearchComponent implements OnInit {

//   productsCategory: any[] = [];
//   isDataReady: boolean = false;
//   currentLanguage: string = "it";
//   wordSearched: string = "";

//   constructor(
//     private productsService: ProductsService,
//     private globalStateService: GlobalStateService
//   ){

//   }
//   ngOnInit(): void {

//     this.getSearchFromUrl();

//     this.globalStateService.lang$.subscribe((lang) => {
//       this.currentLanguage = lang;
//       console.log('Global state products-list:', this.currentLanguage);

//       //API for the products searched
//       const productsCategory = this.productsService.getSearchProduct(
//         1,
//         `${this.currentLanguage}`,
//         `${this.wordSearched}`,
//         8
//       );
  
//       productsCategory.subscribe((data) => {
//         this.productsCategory = data.products;
//         this.isDataReady = true;
//         console.log("Prodotti :", this.productsCategory);
//       });

//     });

//   }

//   getSearchFromUrl(): void {
//     const url = window.location.href;
//     const urlSearchParams = new URLSearchParams(url.split('?')[1]);
//     const queryParamValue = urlSearchParams.get('q') ?? '';
//     this.wordSearched = queryParamValue;
//     console.log("Query Param Value:", queryParamValue);
//   }
  
//   getProductLink(id: string): string {
//     return `/scarpa/${id}/`;
//   }
// }
