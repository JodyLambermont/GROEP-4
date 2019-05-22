import { Injectable } from "@angular/core";
import { Platform, AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { ToastController } from "@ionic/angular";

import { Router } from '@angular/router';


//auth key in local storage
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  url = environment.url;
  APIKey = environment.APIKey;
  user = null;
  authenticationState = new BehaviorSubject(false);
  //decodedToken: any;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,

    private toastController: ToastController

    private router:Router,

  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    credentials = JSON.stringify(credentials);
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIkey: this.APIKey
    });
    return this.http
      .post(`${this.url}/auth/register`, credentials, { headers: options })
      .pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
  }

  login(credentials) {
    credentials = JSON.stringify(credentials);
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIkey: this.APIKey
    });
    return this.http
      .post(`${this.url}/auth/login`, credentials, { headers: options })
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res["token"]);
          console.log(this.helper.decodeToken(res["token"]));
          this.user = this.helper.decodeToken(res["token"]);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.presentToast();
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
/*
  roleMatch(allowedRoles): Boolean{
    let isMatch = false;
/*
    const userRoles = this.storage.get("access_token").then((token)=>{
      let decoded = this.helper.decodeToken(token);
      if(decoded["role"] == "Human Resources" || "Manager"){
        isMatch = true;
      }
    }
    let token = this.storage.get("access_token");
    console.log("token: " + token);
    let decodedToken = this.helper.decodeToken();
    console.log("dtoken: " + decodedToken);
    const userRoles = decodedToken as Array<string>;
    console.log("hier123456");
    console.log(userRoles);
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)){
        isMatch = true;
        return;
      }
    });
    return isMatch;
}*/

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Login gefaald, probeer opnieuw!",
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

}
