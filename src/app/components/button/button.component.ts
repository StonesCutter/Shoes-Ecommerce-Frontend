import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() buttonStyle?: string;
  @Input() label?: string;
  @Input() children?: any;
  @Input() handleClick!: Function;
}
