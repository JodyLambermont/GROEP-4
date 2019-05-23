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
  workweekid = null;
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
      let request = this.http.post(`${this.url}/user/get`,JSON.stringify({"id":id}),{ headers: options }).subscribe((data)=>{
        success(data)
      });
  }

  async changeUsername(name, success){
    let token = await this.storage.get("access_token");
    name = JSON.stringify(name)
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIKey: this.APIKey
    });
    let id = this.helper.decodeToken(token)["nameid"];
    return this.
    http.post(`${this.url}/user/update`, '{"id":"' + id+'",'+ name.substring(1), { headers: options }).subscribe((data)=>{
      success(data),
      catchError(e => {
        this.showAlert(e.error.message);
          throw new Error(e);
      })
    });
  }

  async getWorkweekID(success){
    let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let id = this.helper.decodeToken(token)["nameid"];
      let request = this.http.post(`${this.url}/user/get`,JSON.stringify({"id":id}),{ headers: options }).subscribe((data)=>{
        this.workweekid = data["defaultWorkweekId"]
        success(data)
      });
  }

  async getWorkweek(success){
    let token = await this.storage.get('access_token')
    this.getWorkweekID((data) => {
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let request = this.http.post(`${this.url}/user/GetDefaultWorkWeek?Id=` + this.workweekid,"{}",{ headers: options }).subscribe((data)=>{
        success(data)
      });
    })
  }

  async changeWorkweek(workweek, success){
    
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIKey: this.APIKey
    });
    var message = this.generateWeekBody(workweek, token)
    let id = this.helper.decodeToken(token)["nameid"];
    return this.
    http.post(`${this.url}/user/UpdateDefaultWorkWeek`, message, { headers: options }).subscribe((data)=>{
      success(data),
      catchError(e => {
        this.showAlert(e.error.message);
          throw new Error(e);
      })
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

  generateWeekBody(ww, token){
    //Het pijnigt me zoveel om het zo te schrijven, maar we zijn in enorm tijdtekort :(
    var message = '{"id":"' + this.helper.decodeToken(token)["nameid"] + '",'
    message +='"monday":{"id":"'+ww.MaandagId+'","start":"'+this.gd(ww.MaandagStart)+'","stop":"'+this.gd(ww.MaandagEinde)+'"},';
    message +='"tuesday":{"id":"'+ww.DinsdagId+'","start":"'+this.gd(ww.DinsdagStart)+'","stop":"'+this.gd(ww.DinsdagEinde)+'"},';
    message +='"wednesday":{"id":"'+ww.WoensdagId+'","start":"'+this.gd(ww.WoensdagStart)+'","stop":"'+this.gd(ww.WoensdagEinde)+'"},';
    message +='"thursday":{"id":"'+ww.DonderdagId+'","start":"'+this.gd(ww.DonderdagStart)+'","stop":"'+this.gd(ww.DonderdagEinde)+'"},';
    message +='"friday":{"id":"'+ww.VrijdagId+'","start":"'+this.gd(ww.VrijdagStart)+'","stop":"'+this.gd(ww.VrijdagEinde)+'"},';
    message +='"saturday":{"id":"'+ww.ZaterdagId+'","start":"'+this.gd(ww.ZaterdagStart)+'","stop":"'+this.gd(ww.ZaterdagEinde)+'"},';
    message +='"sunday":{"id":"'+ww.SundagId+'","start":"'+this.gd(ww.SundagStart)+'","stop":"'+this.gd(ww.SundagEinde)+'"}}';
    return message;
  }

  //GenerateDatetime from time
  gd(string){
    return "0001-01-01T" + string + ":00";
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
