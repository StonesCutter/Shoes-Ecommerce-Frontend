import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { WhishlistService } from "src/app/services/wishlist.service";

@Component({
  selector: "app-wishlist-product-card",
  templateUrl: "./wishlist-product-card.component.html",
  styleUrls: ["./wishlist-product-card.component.scss"],
})
export class WishlistProductCardComponent {
  @Input() product: any;
  @Output() myEvent = new EventEmitter<any>();

  constructor(
    private router: Router,
    private wishListService: WhishlistService
  ) {}

  goToProductDetail() {
    this.router.navigate([`scarpa/${this.product.id}`]);
  }

  deleteItemFromWishlist(id: number, e: any): void {
    e.stopPropagation();
    this.wishListService.deleteWishList(id).subscribe({
      next: () => {
        this.myEvent.emit("DeleteFromWishlist");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
