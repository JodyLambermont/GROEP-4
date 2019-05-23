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
