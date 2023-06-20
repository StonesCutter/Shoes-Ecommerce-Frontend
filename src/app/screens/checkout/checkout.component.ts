import { Component, OnInit } from "@angular/core";
import { AddressesService } from "src/app/services/address/addresses.service";
import { CartService } from "src/app/services/cart.service";
import { OrdersService } from "src/app/services/orders.service";
import { Router, ActivatedRoute } from "@angular/router";

interface Iobj {
  address_id: number;
  coupon_id?: number;
  products: number[];
  payment_status: string;
  status: string;
  transaction: string;
}

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  addresses: any;
  products: any;
  totalPrice: any;
  productsArr: number[] = [];
  paymentMethodSelected: string = "";
  paymentSelected: boolean = true;
  couponId: any;

  obj: Iobj = {
    address_id: 0,
    products: [],
    payment_status: "paid",
    status: "completed",
    transaction: "00" + (Math.random() * 1000).toString(),
  };
  constructor(
    private addressService: AddressesService,
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const allAddresses = this.addressService.getAddressList();
    this.couponId = history.state["coupon"];
    allAddresses.subscribe((data) => {
      this.addresses = data;
      console.log(data);
    });

    const products = this.cartService.getCartList();
    products.subscribe((data) => {
      this.products = data.items;
      console.log(this.products);
      data.items.forEach((el: any) => {
        for (let i = 0; i < el.quantity; i++) {
          this.obj.products.push(el.item_id);
        }
      });
      const money = data.items.map((el: any) => {
        return el.sellingItemTotalPrice;
      });

      this.totalPrice = money.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );
      console.log(this.obj.products);
    });
  }

  logValue(id: number) {
    this.obj.address_id = id;
  }

  handleClick() {
    console.log(this.obj);
    let response: any;
    if (this.couponId !== "") {
      this.obj.coupon_id = this.couponId;
    }
    if (this.paymentMethodSelected !== "" && this.obj.address_id !== 0) {
      response = this.orderService.addOrder(this.obj);
    } else {
      console.log("NEED TO ADD SOME DATA");
      return;
    }
    response.subscribe((data: any) => {
      if (data === "add") {
        this.obj.products.forEach((product_id) => {
          this.cartService.deleteCartItem(product_id).subscribe();
          console.log("deleted item", product_id);
        });
      }
    });

    setTimeout(() => {
      alert("ORDER CORRECT");
      this.router.navigate(["area-personale"]);
    }, 2000);
  }

  paymentMethod(value: any) {
    this.paymentMethodSelected = value;
    this.paymentSelected = false;
  }
}
