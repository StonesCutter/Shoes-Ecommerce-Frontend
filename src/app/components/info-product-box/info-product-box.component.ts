import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-info-product-box",
  templateUrl: "./info-product-box.component.html",
  styleUrls: ["./info-product-box.component.scss"],
})
export class InfoProductBoxComponent {
  constructor(private translateService: TranslateService) {}
}
