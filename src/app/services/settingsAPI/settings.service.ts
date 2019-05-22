import { Injectable } from "@angular/core";
import { Platform, AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

//auth key in local storage
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
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
  ) { }
    
  async getUsername(success){
    let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let id = this.helper.decodeToken(token)["nameid"];
      console.log(id);
      let request = this.http.post(`${this.url}/user/get`,JSON.stringify({"id":id}),{ headers: options }).subscribe((data)=>{
        success(data)
      });
}

  /*
  .subscribe(
+       data => {
+         // refresh the list
+         this.getFoods();
+         return true;
+       },
+       error => {
+         console.error("Error saving food!");
+         return Observable.throw(error);
+       }
+    );
  */

  async changeUsername(name, success){
    let token = await this.storage.get("access_token");
    name = JSON.stringify(name)
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIKey: this.APIKey
    });
    return this.
    http.post(`${this.url}/user/get`, name, { headers: options }).subscribe((data)=>{
      success(data),
      catchError(e => {
        this.showAlert(e.error.message);
          throw new Error(e);
      })
    });
  }

  async getWorkweek(success){
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIKey: this.APIKey
    });
    var body = '{"Id": ""}'
    return this.
    http.post(`${this.url}/user/getWorkweek`, body, { headers: options }).subscribe((data)=>{
      success(data)
    });
  }

  async changeWorkweek(success){
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIKey: this.APIKey
    });
    var body = '{"Id": ""}'
    return this.
    http.post(`${this.url}/user/changeWorkweek`, body, { headers: options }).subscribe((data)=>{
      success(data)
    });
  }
  
  async resetPassword(passwords, success){
    let token = await this.storage.get("access_token");
    delete passwords['RepeatPassword'];
    passwords = JSON.stringify(passwords);
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIKey: this.APIKey
    });
    return this.
    http.post(`${this.url}/Auth/NewPass`, passwords, { headers: options }).subscribe((data)=>{
      success(data)
    });
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }

  //https://stackoverflow.com/a/38552302
  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
  };
}
