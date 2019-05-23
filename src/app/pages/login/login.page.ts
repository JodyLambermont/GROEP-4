import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  //reactive form
  credentialsForm: FormGroup;

  //form to pickup data and send with service which uses api call
  //injection for further use in class
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  //once initialised, will validate fields
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  //submit data from the form with api call to server
  onSubmit() {
    this.authenticationService.login(this.credentialsForm.value).subscribe();
  }

  //register service - not implemented, out of scope (people are made with csv file)
  /*
  register() {
    this.authenticationService.register(this.credentialsForm.value).subscribe();
  }
  */
}
