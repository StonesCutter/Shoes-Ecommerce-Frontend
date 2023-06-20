import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

// SERVICES
import { ProductsService } from "src/app/services/products.service";
import { CartService } from "src/app/services/cart.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  productsMan: any = null;
  productsManCategory: any[] = [];
  productsWoman: any[] = [];
  isDataReady: boolean = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // PRODUTS APIS --------------------------------------
    // const products = this.productsService.getProducts(
    //   1,
    //   "it",
    //   "?type=m&orderBy=date",
    //   8
    // );
    // products.subscribe((data) => {
    //   // console.log("PRODUCTS", data);
    // });
    // const productsMan = this.productsService.getProducts(
    //   1,
    //   "it",
    //   "?type=m&orderBy=date",
    //   8
    // );
    // productsMan.subscribe((data) => {
    //   this.productsMan = data.products;
    //   this.isDataReady = true;
    //   //console.log("PRODUCTSMAN", this.productsMan);
    // });
    // const productsWoman = this.productsService.getProducts(
    //   1,
    //   "it",
    //   "?type=w&orderBy=date",
    //   8
    // );
    // productsWoman.subscribe((data) => {
    //   this.productsWoman = data.products;
    //   // this.isDataReady = true;
    // });
    this.getProductByCategory("m");
    this.getProductByCategory("w");
  }

  getProductByCategory(category: string) {
    const products = this.productsService.getProducts(
      1,
      "it",
      `?type=${category}&orderBy=date`,
      8
    );
    products.subscribe((data) => {
      console.log("PRODUCTS BY CATEGORY:", data);
      if (category === "m") {
        this.productsMan = data.products;
      }
      if (category === "w") {
        this.productsWoman = data.products;
      }
      this.isDataReady = true;
    });
  }
}
