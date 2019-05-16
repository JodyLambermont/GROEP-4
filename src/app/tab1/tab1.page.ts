import { Projects } from './../interfaces/projects';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { LogService } from "../services/log.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  logForm: FormGroup;
  projects : Promise<any>;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private logService: LogService
  ) {
    this.projects = this.logService.GetAllProjects().then((data)=> {console.log(data)});
    /*this.projects = this.logService.GetAllProjects().then((data)=>{
    for(var i =0;i < data.length;i++){
      let projectsCopy = {
        id:data[i]['id'],
        name:data[i]['name'],
        companyName:data[i]['companyName'],
        companyId:data[i]['companyId']
      }
      
    ))}*/
  }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      uur1: ["", [Validators.required]],
      uur2: ["", [Validators.required]],
      datum: ["", [Validators.required]],
      description: ["", [Validators.required]],
      project: ["", [Validators.required]],
      activiteit: [""]
    });
  }

  logSubmit() {
    console.log(this.logForm.value);
    this.logService.SubmitLog(this.logForm.value);
    this.presentToast();
  }

  //Makes a popup when sent, no button required to close popup, will automatically close after duration : x (2000 = 2 sec)
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Succesvol toegevoegd!",
      duration: 2000
    });
    toast.present();
  }
}
