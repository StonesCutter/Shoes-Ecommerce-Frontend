import { IfStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { AuthServices } from "src/app/services/auth/auth.service";
import { LoginResponse } from "src/app/interfaces/LoginResponseInterface";
import { StorageService } from "src/app/services/storage/storage.service";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup; // Add the "!" to allow an uninitialized value
  passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;
  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [
    Validators.required,
    Validators.pattern(this.passwordRegex),
  ]);

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private authService: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  handleResponse(resp: LoginResponse): void {
    console.log("loggato con successo");
    this.storageService.setStorage<string>("token", resp.token);
    this.storageService.setStorage<string>("refreshToken", resp.refreshToken);
    this.router.navigate(["/"]);
  }

  handleLoginError(err: any): void {
    console.log(err);
  }

  save() {
    // Perform form submission logic here
    console.log("Is login valid:", this.loginForm.valid);
    if (this.loginForm.valid) {
      this.storageService.setStorage<boolean>("isUserLoggedIn", true);
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp) => {
          console.log("resp login", resp);
          this.handleResponse(resp);
        },
        error: (err) => this.handleLoginError(err),
      });
    } else {
    }
  }

  getErrorMessageEmail() {
    if (this.email.hasError("required")) {
      return "You must enter an email";
    }
    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  getErrorMessagePassword() {
    // console.log(this.password.errors);
    if (this.password.hasError("required")) {
      return "You must enter a password";
    }
    return this.password.hasError("pattern") ? "Not a valid password" : "";
  }
}
