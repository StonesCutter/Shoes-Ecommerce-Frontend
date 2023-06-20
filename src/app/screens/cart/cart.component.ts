import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { OrdersService } from "src/app/services/orders.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  itemId: any;
  products: any;
  totalPrice: any;
  couponId?: any;

  ngOnInit(): void {
    this.getAllCartProducts();
  }
  getCoupon(id: any) {
    this.couponId = id;
    console.log(this.couponId);
  }

  getAllCartProducts() {
    const products = this.cartService.getCartList();
    products.subscribe((data) => {
      this.products = data.items;
      console.log(this.products);
      const money = data.items.map((el: any) => {
        return el.sellingItemTotalPrice;
      });

      this.totalPrice = money.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );
      console.log("FUNZIONE CHIAMATA");
    });
  }

  deleteItem(newItem: number) {
    this.products.forEach((product: any) => {
      if (product.item_id === newItem) {
        this.cartService.deleteCartItem(product.item_id).subscribe(() => {
          this.getAllCartProducts();
        });
      }
    });
  }
}
