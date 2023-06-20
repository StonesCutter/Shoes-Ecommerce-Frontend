import { Component, Input } from "@angular/core";
@Component({
  selector: "app-box-image",
  templateUrl: "./box-image.component.html",
  styleUrls: ["./box-image.component.scss"],
})
export class BoxImageComponent {
  @Input() boxTitle?: string;
  @Input() image?: string;
}
