import { Component, OnInit } from "@angular/core";
import { AuthServices } from "src/app/services/auth/auth.service";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  isLoading = true;
  orders: any[] = [];
  user: any;
  constructor(
    private ordersService: OrdersService,
    private authService: AuthServices
  ) {}

  ngOnInit(): void {
    const orders = this.ordersService.getOrderList();
    orders.subscribe((data) => {
      this.orders = data.orders;
      this.isLoading = false;
      console.log("ORDERS", this.orders);
    });

    const user = this.authService.getUser();
    user.subscribe((data) => {
      this.user = data;
      console.log("USER", this.user);
    });
  }
}
