import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { AuthServices } from "src/app/services/auth/auth.service";
import { AddressesService } from "src/app/services/address/addresses.service";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
})
export class AddressFormComponent implements OnInit {
  addAddressForm!: FormGroup;
  label = new FormControl("", [Validators.required]);
  name_surname = new FormControl("", [Validators.required]);
  street_address = new FormControl("", [Validators.required]);
  zipcode = new FormControl("", [Validators.required]);
  telephone = new FormControl("", [Validators.required]);
  country = new FormControl("", [Validators.required]);
  instructions = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServices,
    private addressService: AddressesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAddressForm = new FormGroup({
      label: this.label,
      name_surname: this.name_surname,
      street_address: this.street_address,
      zipcode: this.zipcode,
      telephone: this.telephone,
      country: this.country,
      instructions: this.instructions,
    });
  }

  handleResponse(resp: any): void {
    console.log("Address aggiunto con successo: ", resp);
  }

  handleAddAddressError(err: any): void {
    console.log(err);
  }

  submitForm(): void {
    if (this.addAddressForm.valid) {
      this.addressService
        .addAddress(this.addAddressForm.value)

        .subscribe({
          next: (response) => {
            console.log(response);
            this.addressService.getAddressList();
            // this.notify("Address added successfully", true);
          },
          error: (err) => {
            console.log(err);
            // this.notify("Something went wrong", false);
          },
        });
    }
  }
}
