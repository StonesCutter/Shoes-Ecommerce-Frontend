import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AuthServices } from "src/app/services/auth/auth.service";
import { StorageService } from "src/app/services/storage/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent implements OnInit {
  signUpForm!: FormGroup;
  passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;
  hide = true;
  first_name = new FormControl("", [Validators.required]);
  last_name = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  telephone = new FormControl("");
  password = new FormControl("", [
    Validators.required,
    Validators.pattern(this.passwordRegex),
  ]);
  birth_date = new FormControl("", [Validators.required]);
  acceptAgreement = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServices,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      telephone: this.telephone,
      password: this.password,
      birth_date: this.birth_date,
      acceptAgreement: this.acceptAgreement,
    });
  }

  handleResponse(resp: any): void {
    console.log("Registrato con successo");
    this.storageService.setStorage<string>("token", resp.token);
    this.storageService.setStorage<string>("refreshToken", resp.refreshToken);
    this.router.navigate(["/"]);
  }

  handleSignUpError(err: any): void {
    console.log(err);
  }

  save() {
    if (!this.birth_date.value) {
      return;
    }
    const birthDate = new Date(this.birth_date.value)
      .toISOString()
      .slice(0, 10);
    console.log(birthDate);
    console.log("Is signup valid:", this.signUpForm.valid);
    console.log("Form value:", this.signUpForm.value);
    if (this.signUpForm.valid) {
      this.birth_date.setValue(birthDate);
      const signUpData = { ...this.signUpForm.value };
      console.log("Form value 2:", signUpData);
      delete signUpData.acceptAgreement;

      this.authService.signUp(signUpData).subscribe({
        next: (resp) => this.handleResponse(resp),
        error: (err) => this.handleSignUpError(err),
      });
    }
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    console.log("Selected date", selectedDate);
  }

  getErrorMessageEmail() {
    if (this.email.hasError("required")) {
      return "You must enter an email";
    }
    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  getErrorMessagePassword() {
    if (this.password.hasError("required")) {
      return "You must enter a password";
    }
    return;
  }

  getErrorMessageName() {
    if (this.password.hasError("required")) {
      return "You must enter a name";
    }
    return;
  }
  getErrorMessageSurname() {
    if (this.password.hasError("required")) {
      return "You must enter a surname";
    }
    return;
  }

  getErrorMessageAccept() {
    if (this.password.hasError("required")) {
      return "You must accept the agreement";
    }
    return;
  }

  getErrorMessageBirthDate() {
    if (this.birth_date.hasError("required")) {
      return "You must insert a birth date";
    }
    return;
  }
}
