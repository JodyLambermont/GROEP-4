import { Injectable } from "@angular/core";
import { Platform, AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

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

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
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
          this.user = this.helper.decodeToken(res["token"]);
          this.authenticationState.next(true);
        }),
        catchError(e => {
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

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }
}
