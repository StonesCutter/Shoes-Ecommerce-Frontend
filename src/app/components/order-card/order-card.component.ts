import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.scss"],
})
export class OrderCardComponent implements OnInit {
  @Input() product?: any;
  @Input() image?: string;
  @Output() newItemEvent = new EventEmitter<number>();

  ngOnInit(): void {}

  addNewItem(value: number) {
    this.newItemEvent.emit(value);
  }

  selectValue(value: any) {
    console.log("SELECT VALUE", value);
  }
}
