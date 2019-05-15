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
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIKey: this.APIKey
    });
    var body = '{"Id": ""}'
    return this.
    http.post(`${this.url}/user/get`, body, { headers: options }).subscribe((data)=>{
      success(data)
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
}
