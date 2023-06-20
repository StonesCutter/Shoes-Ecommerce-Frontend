// import { Component, OnInit } from '@angular/core';

// // SERVICES
// import { ProductsService } from 'src/app/services/products.service';

// @Component({
//   selector: 'app-brands',
//   templateUrl: './brands.component.html',
//   styleUrls: ['./brands.component.scss']
// })
// export class BrandsComponent implements OnInit {
//   brands: any; // Define the 'brands' property
  
//   constructor(private productsService: ProductsService) {}

//   ngOnInit(): void {
//     const brands = this.productsService.getBrands();
//     brands.subscribe((data) => {
//       this.brands = data; // Assign the received data to 'brands'
//       console.log("BRANDS", this.brands);
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { GlobalStateService } from 'src/app/services/global-state.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: any;
  letters: string[] = [];
  currentLanguage: string | undefined;
  

  constructor(private productsService: ProductsService,
    private globalStateService: GlobalStateService) {}

  ngOnInit(): void {
    const brands = this.productsService.getBrands();
    brands.subscribe((data) => {
      this.brands = data;
      this.letters = this.getUniqueLetters(data);
      console.log("BRANDS", this.brands);
      console.log("LETTERS", this.letters);
    });

    this.globalStateService.lang$.subscribe((lang) => {
      this.currentLanguage = lang;
      console.log('Global state:', this.currentLanguage);
    });

  }

  getUniqueLetters(brands: any[]): string[] {
    const uniqueLetters: any[] = [];
    brands.forEach((brand) => {
      const letter = brand.code[0];
      if (!uniqueLetters.includes(letter)) {
        uniqueLetters.push(letter);
      }
    });
    return uniqueLetters;
  }

  getBrandsByLetter(letter: string): any[] {
    return this.brands.filter((brand: { brand: string[]; }) => brand.brand[0] === letter);
  }
}
