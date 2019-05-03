import { SettingsService } from './../../services/settingsAPI/settings.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService) 
    {}

    ngOnInit() {
      this.passwordForm = this.formBuilder.group({
        previousPassword: ["", [Validators.required, Validators.email]],
        newPassword: ["", [Validators.required, Validators.minLength(3)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(3)]]
      });
    }

  goBack(){
    this.navCtrl.back();
  }
  onSubmit() {
    this.settingsService.resetPassword(this.passwordForm.value).subscribe();
  }
}


/*
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    this.authenticationService.login(this.credentialsForm.value).subscribe();
  }

  register() {
    this.authenticationService.register(this.credentialsForm.value).subscribe();
  }
}
 */