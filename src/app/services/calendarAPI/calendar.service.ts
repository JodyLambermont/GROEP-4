import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { Platform, AlertController } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url = environment.url;
  APIKey = environment.APIKey;
  constructor( 
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController) { }

  getLogs(){
    var options = new HttpHeaders({
      "Content-Type": "application/json",
      APIkey: this.APIKey,
      'Authorization':'Bearer ' + this.storage.get('access_token'),
    });
    return this.http.get(`${this.url}/Log/GetAll`, { headers: options })
    .pipe(
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
  /*   this.http.get('https://ehbpmagroup6.azurewebsites.net/log/test'
  ).subscribe((response) => {      
    console.log(response);
  let eventCopy = {
      title:'test',
      startTime:new Date(response[3]['start']),
      endTime:new Date(response[3]['stop']),
      desc: response[3]['description'],
      allDay:false
    }
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  });*/
}
