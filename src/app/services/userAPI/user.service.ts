import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url;
  APIKey = environment.APIKey;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController    
  ) { }

  //api call to submit a form which contains people to add to a project
  //async for token storage, ionic storage is slow hence await (otherwise api call keeps rejecting with error: unauthorised)
  async SubmitAddPerson(personeelsform) {
    personeelsform = JSON.stringify(personeelsform);
    console.log(personeelsform);
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    let request =  this.http
    .post(`${this.url}/Project/AddUser`, personeelsform, { headers: options }).subscribe(res=>{console.log(res)},err =>{this.showAlert(err)});
  }

  //api call to submit a form which contains people to remove from a project
  //async for token storage, ionic storage is slow hence await (otherwise api call keeps rejecting with error: unauthorised)
  async SubmitRemovePerson(personeelsform) {
    personeelsform = JSON.stringify(personeelsform);
    console.log(personeelsform);
    let token = await this.storage.get("access_token");
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      APIkey: this.APIKey
    });
    let request =  this.http
    .post(`${this.url}/Project/RemoveUser`, personeelsform, { headers: options }).subscribe(res=>{console.log(res)},err =>{this.showAlert(err)});
  }  

  //function that will pick up error message and create an alert with the error type
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }
}
