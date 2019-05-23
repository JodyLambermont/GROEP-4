import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class Tab2Service {
  url = environment.url;
  APIKey = environment.APIKey;
  constructor(
   // private HttpClient: HttpClient,
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController) { }

    changeLog(log){
    
      let token = this.storage.get("access_token");
      console.log(log);
      log = JSON.stringify(log);
      console.log(log);
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
        APIKey: this.APIKey
      });
      return this.http
      .post(`${this.url}/Log/Update`, log, { headers: options })
      .pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
    }
    async UpdateLog(logform) {
      logform = JSON.stringify(logform);
      console.log(logform);
      let token = await this.storage.get("access_token");
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        APIkey: this.APIKey
      });
      let request =  this.http
      .post(`${this.url}/Log/Update `, logform, { headers: options }).subscribe(res=>{console.log(res)},err =>{console.log(err)});
    }
    
    async getActivities(success){
      let token = await this.storage.get('access_token')
      console.log(token);
        var options = new HttpHeaders({
          "Content-Type": "application/json",
          APIkey: this.APIKey,
          "Authorization":"Bearer " + token,
        });
        let request = this.http.get(`${this.url}/Project/GetList`, { headers: options }).pipe(
          catchError(e => {
            this.showAlert(e.error.message);
            throw new Error(e);
          })
        );
        request.subscribe((data)=>{
          console.log(data);
          success(data)
        });
    }

    async getLogs(success){
      let token = await this.storage.get('access_token')
        var options = new HttpHeaders({
          "Content-Type": "application/json",
          APIkey: this.APIKey,
          "Authorization":"Bearer " + token,
        });
        this.http.get(`${this.url}/Log/GetAll`, { headers: options }).subscribe((data)=>{
          success(data)
        });
    }

    async getLog1(success){
      let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      this.http.get(`${this.url}/Log/get?Id=765c9ab7-eb10-4147-9314-00c9ef8f22a4`, { headers: options }).subscribe((data)=>{
        success(data)
      });
    }
    async getTest(success){
      let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      this.http.get(`${this.url}/Log/test`, { headers: options }).subscribe((data)=>{
        success(data)
      });
    }
    async getAllOfUser(success){
      let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      this.http.get(`${this.url}/Log/GetAllOfUser`, { headers: options }).subscribe((data)=>{
        success(data)
      });
    }
    async getList(success){
      let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      this.http.get(`${this.url}/Log/List`, { headers: options }).subscribe((data)=>{
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
