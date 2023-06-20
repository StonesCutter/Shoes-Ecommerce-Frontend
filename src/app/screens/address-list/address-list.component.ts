import { Component, OnInit } from "@angular/core";
import { AddressesService } from "src/app/services/address/addresses.service";
import { MatDialog } from "@angular/material/dialog";
import { AddressDialogComponent } from "src/app/components/address-dialog/address-dialog.component";
@Component({
  selector: "app-address-list",
  templateUrl: "./address-list.component.html",
  styleUrls: ["./address-list.component.scss"],
})
export class AddressListComponent implements OnInit {
  addresses: any;

  constructor(
    private addressesService: AddressesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log("NGONINIT ADDRESS LIST");
    const addresses = this.addressesService.getAddressList();
    console.log("ADDRESSES!", addresses);

    this.addressesService.addresses.subscribe((res) => {
      console.log("RES!", res);
      this.addresses = [...res];
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteAddress(id: number): void {
    this.addressesService.deleteAddress(id).subscribe({
      next: () => {
        this.addressesService.getAddressList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
