import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  options1: string[] = [];

  productsCategory: any[] = [];
  isDataReady: boolean = false;
  type: string = '';
  category: string = '';
  currentLanguage: string = "it";
  brands: any;
  brandsNames: any[] = [];
  colorsObj: any;
  colors: any[] = [];

  // variables to handle filter selection
  minPriceFilter: number = 0;
  maxPriceFilter: number  = 200;
  colorFilter: string = "";
  brandFilter: string = "";
  newFilterOn: boolean = false;
  currentCategoryCode: string | undefined;
  currentCategory: string | undefined;
  page: number = 1;
  perPage: number = 10;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private globalStateService: GlobalStateService,
    private translateService: TranslateService
  ) {

    console.log("PARTITO IL COSTRUTTORE DI NUOVO"); 
    //API to get the brands
    this.productsService.getBrands().subscribe((data) => {
      this.brands = data;
      const brandsFromData = this.brands.map((obj: { brand: any }) => obj.brand);
      const noneTranslation = this.translateService.instant('filters.none');
      this.brandsNames = [ noneTranslation, ...brandsFromData];
      console.log("Brands names:", this.brandsNames);
    });
    
    //New Filter content
    this.options1 = [this.translateService.instant('filters.none'), this.translateService.instant('header.new')]
  }

  ngOnInit(): void {
    // Initial execution
    this.updateCategoryAndType();

    // Subscribe to router navigation events
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCategoryAndType();
      });

      // subscribe to the global status language
      this.globalStateService.lang$.subscribe((lang) => {
      this.currentLanguage = lang;
      console.log('Global state products-list:', this.currentLanguage);
      this.setTitleFromCategory();

      //API for the colours
      this.productsService.getColors(this.currentLanguage).subscribe((data) => {
        this.colorsObj = data;
        const colorsFromData = this.colorsObj.map((obj: { color: string }) => obj.color);
        const noneTranslation = this.translateService.instant('filters.none');
        this.colors = [noneTranslation, ...colorsFromData];
        console.log("Colors:", this.colors);
      });

    });

  }
  
// update of the URL
  updateCategoryAndType(): void {
    const url = window.location.href;
    console.log("URL: ", url);
    const urlParts = url.split('/');
    console.log("URL-PARTS: ", urlParts);

    if (urlParts.length > 0) {
      const categoryParts = urlParts[5].split('-');
      console.log("CATEGORY :", categoryParts);
      const gender = urlParts[4];
      console.log("GENDER : ", gender);

      if (gender === 'donna') {
        this.type = 'w';
      } else if (gender === 'uomo') {
        this.type = 'm';
      }

      this.category = categoryParts.join(' ');
      console.log("FINAL CATEGORY", this.category);
    }

    console.log('Type:', this.type);
    console.log('Category:', this.category);
    this.setTitleFromCategory();

    // API to get products per category
    const productsCategory = this.productsService.getProducts(
      1,
      `${this.currentLanguage}`,
      `?type=${this.type}&category=${this.category}`,
      8
    );

    productsCategory.subscribe((data) => {
      this.productsCategory = data.products;
      this.isDataReady = true;

      console.log("PRODUCTSMAN-CATEGORY-LIST", this.productsCategory);
    });

  }

  setTitleFromCategory(): void {

    this.currentCategoryCode = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    console.log("currentCategoryCode :", this.currentCategoryCode)
    console.log("currentLanguage: ", this.currentLanguage)
      // API to get the specific category
      const categorySelected = this.productsService.getCategory(
        this.currentLanguage, this.currentCategoryCode
      );
  
      categorySelected.subscribe((data) => {
        this.currentCategory = data.category;
        this.isDataReady = true;
        console.log("Current category TITLE", this.currentCategory);
      });

  }


  getProductLink(id: string): string {
    return `/scarpa/${id}/`;
  }

  getProductsByBrand(brand: string): void {
    const productsCategory = this.productsService.getProducts(
      1,
      `${this.currentLanguage}`,
      `?type=${this.type}&category=${this.category}&brand=${brand}`,
      8
    );

    productsCategory.subscribe((data) => {
      this.productsCategory = data.products;
      this.isDataReady = true;
      console.log("PRODUCTSMAN-CATEGORY-LIST", this.productsCategory);
    });
  }

  getProductsByFilter(page: number, brand: string, color: string, maxPrice: number, minPrice: number, newOn: boolean, perPage: number): void {

    let query = `?minPrice=${minPrice}&maxPrice=${maxPrice}&type=${this.type}&category=${this.category}`;
    // part of the code to compone the query according to what parameters we have 
    if (brand !== "" && brand !== "Nessuno" && brand !== "None") {
      query = query + `&brand=${brand}`;
    }
    
    if (color !== "" && color !== "Nessuno" && color !== "None") {
      query = query + `&color=${color}`
    }

    console.log("Query :", query);
    console.log("newOn is:", newOn);

    let productsCategory = null;
    newOn === true ? 
     ( productsCategory = this.productsService.getNewProducts(
      page,
      `${this.currentLanguage}`,
       query,
      perPage
    ) )
     : (

      productsCategory = this.productsService.getProducts(
      page,
      `${this.currentLanguage}`,
       query,
      perPage
    ))

    productsCategory.subscribe((data) => {
      this.productsCategory = data.products;
      this.isDataReady = true;
      console.log("PRODUCTSMAN-CATEGORY-LIST", this.productsCategory);
    });
  }

  // function to catch selection of the filters
  onOptionSelected(option: string): void {
    console.log('Selected option:', option);
  }

  onNewFilterApplied(option: string): void {
    console.log('Selected option:', option);
    if(option ==="novità" || option==="header.new"){
      this.newFilterOn = true;
    }else{
      this.newFilterOn = false;
    }
   // option === "novità" ? this.newFilterOn = true : this.newFilterOn = false;
     this.getProductsByFilter(this.page, this.brandFilter, this.colorFilter, this.maxPriceFilter, 
      this.minPriceFilter, this.newFilterOn, this.perPage);
  }

  onColorFilterApplied(option: string): void {
    console.log('Filter color:', option);
    this.colorFilter = option;
    this.getProductsByFilter(this.page, this.brandFilter, this.colorFilter, this.maxPriceFilter, 
      this.minPriceFilter, false, this.perPage);
  }

  onBrandFilterApplied(option: string): void {
    console.log('Filter brand:', option);
    this.brandFilter = option;
    this.getProductsByFilter(this.page, this.brandFilter, this.colorFilter, 
      this.maxPriceFilter, this.minPriceFilter, false, this.perPage);
  }
  
  onPriceFilterApplied(priceRange: { minPrice: number, maxPrice: number }): void {
    console.log('Min Price:', priceRange.minPrice);
    console.log('Max Price:', priceRange.maxPrice);
    this.maxPriceFilter = priceRange.maxPrice;
    this.minPriceFilter = priceRange.minPrice;
    this.getProductsByFilter(this.page, this.brandFilter, this.colorFilter, this.maxPriceFilter, this.minPriceFilter, false, this.perPage);
  }

  onPaginationModified(event: { pageSize: number, pageIndex: number }): void {
    this.perPage = event.pageSize;
    this.page = event.pageIndex + 1;
    console.log('Selected page size:', event.pageSize);
    console.log('Current page index:', event.pageIndex);
    this.getProductsByFilter(this.page, this.brandFilter, this.colorFilter, this.maxPriceFilter, 
      this.minPriceFilter, this.newFilterOn, this.perPage);
    // Perform any desired actions with the selected page size and page index
  }  


}

