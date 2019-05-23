import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Platform,Events } from "@ionic/angular";
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
  }
  pages= [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private router: Router,
    private storage:Storage,
    private helper:JwtHelperService,
    public events:Events,
  ) {
    this.storage.get('access_token').then((token)=>{
      let data = this.helper.decodeToken(token);
      if(data["role"] == "Human Resources"){
        this.events.publish('user:hr');
      }else if(data["role"] == "Consultant"){
        this.events.publish('user:co');
      }else if(data["role"] == "Manager"){
        this.events.publish('user:mgr');
      }
    });
    events.subscribe("user:hr",()=>{
      this.pages = [{title:"Consultants",link:"/consultants"},{title:"Projects",link:"/projects"}];
      });
      events.subscribe("user:co",()=>{
        this.pages = [];
    });
    events.subscribe("user:mgr",()=>{
      this.pages = [{title:"Consultants",link:"/consultants"},{title:"Projects",link:"/projects"}];
  });
  }

  goPage(page){
    this.navCtrl.navigateForward(page);
    this.menuCtrl.close();
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
