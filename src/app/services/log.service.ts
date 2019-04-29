import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LogService {
  //let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo'));
  url = environment.url;
  APIKey = environment.APIKey;

  constructor(public http: HttpClient) {}
}
