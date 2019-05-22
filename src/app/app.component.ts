import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { AuthenticationService } from "./services/authentication.service";
import { Router, NavigationEnd } from "@angular/router";
import { Storage } from "@ionic/storage";
import { JwtHelperService } from "@auth0/angular-jwt";
import { from } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.initializeApp();
    this.storage.get("access_token").then((token)=>{
      let decoded = this.helper.decodeToken(token);
      if(decoded["role"] == "Human Resources"){
        this.showHr = true;
      }else if(decoded["role"] == "Consultant"){
        this.showConsultant = true;
      }else if(decoded["role"] == "Manager"){
        this.showManager = true;
      }
    });
  }

  showHr : any=false;
  showConsultant: any=false;
  showManager: any=false;

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
  }

  goHome() {
    this.navCtrl.navigateForward("");
    this.menuCtrl.close();
  }
  goProfile() {
    this.navCtrl.navigateForward("/profile");
    this.menuCtrl.close();
  }

  goConsultants() {
    this.navCtrl.navigateForward("/consultants");
    this.menuCtrl.close();
  }
  goProjects() {
    this.navCtrl.navigateForward("/projects");
    this.menuCtrl.close();
  }
  goSettings() {
    this.navCtrl.navigateForward("/settings");
    this.menuCtrl.close();
  }

  logout(){
    this.menuCtrl.close();
    this.authService.logout();
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
