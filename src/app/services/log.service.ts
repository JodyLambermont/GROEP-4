import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Storage } from "@ionic/storage";
import { AlertController, SelectValueAccessor } from "@ionic/angular";
import { catchError, tap } from "rxjs/operators";
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
    async GetAllProjects() {
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    console.log(options);
    return this.http
      .get<Projects[]>(`${this.url}/Project/GetList`, { headers: options }).toPromise();/*
      .pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );*/
  }

  //   /Log/Create -> API, submit the data to the api with the values fetched from the formgroup
  async SubmitLog(logform) {
    logform = JSON.stringify(logform);
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    return this.http
    .post(`${this.url}/Log/Create`, logform, { headers: options })
    .pipe(
      tap (data => {
        console.log("POST Request is successful ", data);
      }),
      catchError(e => {
        this.showAlert(e.error.message);
        throw new Error(e);
      })
    );
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
