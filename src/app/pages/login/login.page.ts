import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms"; //form validation in Angular (check docs, lots of information for forms)
import { LoadingController, AlertController } from "@ionic/angular"; //alert popup and loading compononent in page
//import { AuthService } from "../../services/user/auth.service"; //needed login service
import { Router } from "@angular/router"; // redirection to home page after successful login

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup; // global variable to handle the login form
  public loading: HTMLIonLoadingElement; // global variable  to handle the loading component

  constructor(
    // injecting all providers as parameters in constructor so its usable in the class
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    //private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    //formbuilder docs https://angular.io/api/forms/FormBuilder
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  ngOnInit() {}

  //delay in log in when comparing data in firebase which is where the loading component does it job so the user get notified its loading
  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value:", loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;

      /*this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("home");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );*/
    }
  }
}
