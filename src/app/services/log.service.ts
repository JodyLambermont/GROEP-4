import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Storage } from "@ionic/storage";
import { AlertController, SelectValueAccessor } from "@ionic/angular";
import { catchError, tap, map } from "rxjs/operators";
import { Projects } from "../interfaces/projects";

@Injectable({
  providedIn: "root"
})
export class LogService {
  //let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo'));
  url = environment.url;
  APIKey = environment.APIKey;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  //   /Project/GetList ->API sends all projects ID, name and only those that are in progress // this is used to display in the frontend
    async GetAllProjects(success) {
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    let request = this.http
      .get<Projects[]>(`${this.url}/Project/GetList`, { headers: options })
      
      .pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
      request.subscribe((data=>{success(data)}));
  }
  //   /Log/Create -> API, submit the data to the api with the values fetched from the formgroup
  async SubmitLog(logform) {
    logform = JSON.stringify(logform);
    console.log(logform);
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    let request =  this.http
    .post(`${this.url}/Log/Create`, logform, { headers: options }).subscribe(res=>{console.log(res)},err =>{this.showAlert(err)});
  }

  
  async getLogonid(success,id){
    let token = await this.storage.get('access_token')
      var options = new HttpHeaders({
        "Content-Type": "application/json",
        APIkey: this.APIKey,
        "Authorization":"Bearer " + token,
      });
      let request = this.http.get(`${this.url}/Log/get?Id=${id}`, { headers: options }).pipe(
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
