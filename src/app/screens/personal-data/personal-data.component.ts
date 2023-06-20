import { Component, OnInit } from "@angular/core";
import { AuthServices } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-personal-data",
  templateUrl: "./personal-data.component.html",
  styleUrls: ["./personal-data.component.scss"],
})
export class PersonalDataComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthServices) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.authService.getUser().subscribe((data) => {
      console.log("USER DATA", data);
      this.userData = data;
    });
  }
}
