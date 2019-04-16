import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  goProfile() {
    this.navCtrl.navigateForward("/profile");
    this.menuCtrl.close();
  }
  goAdmin() {
    this.navCtrl.navigateForward("/admin");
    this.menuCtrl.close();
  }
  goSettings() {
    this.navCtrl.navigateForward("/settings");
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate([""]);
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }
}
