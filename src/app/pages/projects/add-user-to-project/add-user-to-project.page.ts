import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { LogService } from "../../../services/log.service";
import { ConsultantService} from '../../../services/consultantAPI/consultant.service';
import { UserService } from '../../../services/userAPI/user.service';
import { Projects } from "../../../interfaces/projects";
import { Consultant } from "../../consultants/consultant";

@Component({
  selector: 'app-add-user-to-project',
  templateUrl: './add-user-to-project.page.html',
  styleUrls: ['./add-user-to-project.page.scss'],
})
export class AddUserToProjectPage implements OnInit {

  personeelsForm: FormGroup;

  protected projecten : Projects[] = [];
  protected personeel : Consultant[] = [];

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private logService: LogService,
    private consultantService: ConsultantService,
    private userService: UserService
  ) {
    //get all projects in an array to use in html
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

    //get all consultants in an arrary to use in html
    consultantService.getConsultants((data)=>{
      for(var i =0;i < data.length;i++){
        this.personeel.push(new Consultant(data[i].name,data[i].id,data[i].workMonth.salary,data[i].workMonth.accepted,data[i].workMonth.month,data[i].workMonth.totalHours))
          }
          /*
          console.log("De projecten array: " + personeelsCopy.id);
          console.log("De projecten array: " + personeelsCopy.name);
          */
        });
      }

  ngOnInit() {
    //initialize the reactive form
    this.personeelsForm = this.formBuilder.group({
      ProjectId: ["", [Validators.required]],
      UserIds: ["", [Validators.required]]
    });
  }

  //submit all values (requires projectid and userid(s))
  personeelSubmit() {
    //console.log(this.personeelsForm.value);
    this.userService.SubmitAddPerson(this.personeelsForm.value);
    this.presentToast();
  }


  //Makes a popup when sent, no button required to close popup, will automatically close after duration : x (2000 = 2 sec)
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Succesvol toegevoegd aan het project!",
      duration: 2000
    });
    toast.present();
  }  
}
