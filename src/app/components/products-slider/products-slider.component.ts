import { Component, Input, OnInit } from "@angular/core";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: "app-products-slider",
  templateUrl: "./products-slider.component.html",
  styleUrls: ["./products-slider.component.scss"],
})
export class ProductsSliderComponent implements OnInit {
  @Input() products?: any[] | undefined | null;
  @Input() sliderTitle?: string;
  constructor() {}
  ngOnInit(): void {
    console.log("PRODUCTS from product slider", this.products);
  }
}
