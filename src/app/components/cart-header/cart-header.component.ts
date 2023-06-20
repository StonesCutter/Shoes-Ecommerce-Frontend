import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-header",
  templateUrl: "./cart-header.component.html",
  styleUrls: ["./cart-header.component.scss"],
})
export class CartHeaderComponent implements OnInit {
  constructor(private router: Router, private cartService: CartService) {}
  products: any;
  totalPrice: any;
  totalProducts: any;
  @Input() couponId: any;

  goToCheckout() {
    this.router.navigate(["checkout"], {
      state: { coupon: this.couponId.value },
    });
  }

  ngOnInit(): void {
    const products = this.cartService.getCartList();
    products.subscribe((data) => {
      this.products = data.items;
      const money = data.items.map((el: any) => {
        return el.sellingItemTotalPrice;
      });
      const quantity = data.items.map((el: any) => {
        return el.quantity;
      });

      this.totalPrice = money.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );

      this.totalProducts = quantity.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );

      console.log(this.totalPrice);
    });
  }
}
