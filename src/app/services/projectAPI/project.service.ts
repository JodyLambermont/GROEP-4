import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap, catchError } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = environment.url;
  APIKey = environment.APIKey;
  constructor(private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController) { }

  async getProjects(success){
    let token = await this.storage.get('access_token')
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
        success(data)
      });
  }

  async getFullproject(success,id){
    let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let request = this.http.post(`${this.url}/Project/GetFull`,JSON.stringify({"Id":id}) ,{ headers: options }).pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
      request.subscribe((data)=>{
        success(data)
      });
  }

  async editProject(success,prj){
    let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let request = this.http.post(`${this.url}/Project/GetFull`,JSON.stringify(  {
        "Id": prj.id,
        "Name": prj.Name,
        "CompanyId": "9c514f27-fe7a-4dd3-91fa-3bd5f4a1125c",
        "Overtime": prj.Overtime,
        "Billable": prj.Billable
      }) ,{ headers: options }).pipe(
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
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }
}
