import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Pagination, Thumbs } from "swiper";
import { TranslateService } from "@ngx-translate/core";

SwiperCore.use([Pagination, Thumbs]);

@Component({
  selector: "app-single-product-slider",
  templateUrl: "./single-product-slider.component.html",
  styleUrls: ["./single-product-slider.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductSliderComponent {
  thumbsSwiper: any;
  @Input() images: any;
}
