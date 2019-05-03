import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { catchError } from "rxjs/operators";

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
      Authorization: "Bearer" + token,
      APIkey: this.APIKey
    });
    return this.http
      .get(`${this.url}/Project/GetList`, { headers: options })
      .pipe(
        catchError(e => {
          this.showAlert(e.error.message);
          throw new Error(e);
        })
      );
  }

  //   /Log/Create -> API, submit the data to the api with the values fetched from the formgroup
  async SubmitLog() {
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      Authorization: "Bearer" + token,
      APIkey: this.APIKey
    });
    //still to implement http post request with values
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
