import { Projects } from './../interfaces/projects';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { LogService } from "../services/log.service";
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  logForm: FormGroup;
  //projects : Promise<any>;
  protected projecten : Projects[] = []; 
  //private projectsObservable : Observable<Projects[]> ;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private logService: LogService
  ) {
    logService.GetAllProjects((data)=>{
      //console.log(data);
    for(var i =0;i < data.length;i++){
      let projectsCopy = {
        id:data[i]['id'],
        name:data[i]['name'],
        companyId:data[i]['companyId'],
        overtime:data[i]['overtime'],
        billable:data[i]['billable']
      }
      this.projecten.push(projectsCopy);
      /*
      console.log("De projecten array: " + projectsCopy.name);
      console.log("De projecten array: " + projectsCopy.id);
      console.log("De projecten array: " + projectsCopy.companyId);
      console.log("De projecten array: " + projectsCopy.overtime);
      console.log("De projecten array: " + projectsCopy.billable);
      */
    }}
    );
  }
  //validators from the form (html has button disabled until all valid)
  ngOnInit() {
    this.logForm = this.formBuilder.group({
      Start: ["", [Validators.required]],
      Stop: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      ProjectId: ["", [Validators.required]]
    });
  }

  //submit data from reactive form with api call
  logSubmit() {
    //console.log(this.logForm.value);
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
