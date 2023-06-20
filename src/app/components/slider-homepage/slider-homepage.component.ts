import { Component, ViewEncapsulation } from "@angular/core";
// Libraries
import { SwiperSlideDirective } from "swiper/angular";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { TranslateService } from "@ngx-translate/core";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: "app-slider-homepage",
  templateUrl: "./slider-homepage.component.html",
  styleUrls: ["./slider-homepage.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SliderHomepageComponent {
  constructor() {}
}
