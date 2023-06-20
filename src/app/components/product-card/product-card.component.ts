import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product?: any;
  @Input() image?: string;

  constructor() {}

  ngOnInit(): void {
    // console.log("PRODUCT from product card", this.product);
  }
}
