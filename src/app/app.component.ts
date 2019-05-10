import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { JwtHelperService } from "@auth0/angular-jwt";

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
    private router: Router,
    private storage:Storage,
    private helper:JwtHelperService
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
  goCalendar() {
    this.navCtrl.navigateForward("/calendar");
    this.menuCtrl.close();
  }
  goConsultants() {
    this.navCtrl.navigateForward("/consultants");
    this.menuCtrl.close();
  }
  goSettings() {
    this.navCtrl.navigateForward("/settings");
    this.menuCtrl.close();
  }

  async isHr(){
    let token = await this.storage.get("access_token").then((token)=>{
      let decoded = this.helper.decodeToken(token);
      if(decoded["role"] == "Hr"){
          return true;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //keeps sending user back to tab1 at refresh or navigation in url - how to solve?
      //original intention was so that app keeps an eye if authenticated, not to refresh app every page and redirect back to ""
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
