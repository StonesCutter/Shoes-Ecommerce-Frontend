import { Component, Input, OnInit } from "@angular/core";
import { AuthServices } from "src/app/services/auth/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-order-list-accordion",
  templateUrl: "./order-list-accordion.component.html",
  styleUrls: ["./order-list-accordion.component.scss"],
})
export class OrderListAccordionComponent {
  @Input() order: any;
  @Input() user: any;
  constructor(private authService: AuthServices) {}
}
