import { Component, OnInit } from "@angular/core";

import { WhishlistService } from "src/app/services/wishlist.service";
@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit {
  isLoading = true;
  wishlist: any;
  constructor(private wishlistService: WhishlistService) {}

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    const wishlist = this.wishlistService.getWishList();
    wishlist.subscribe((data) => {
      console.log("WISHLIST", data.items);
      this.wishlist = data.items;
      this.isLoading = false;
    });
  }

  deleteFromWishlist() {
    this.getWishlist();
  }
}
