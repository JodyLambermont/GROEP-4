import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/projectAPI/project.service'
import { MenuController } from "@ionic/angular";
import { NavController, NavParams ,IonSlides } from "@ionic/angular";
import { ActivatedRoute  } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-project',
  templateUrl: './change-project.page.html',
  styleUrls: ['./change-project.page.scss'],
})
export class ChangeProjectPage implements OnInit {
  prjForm: FormGroup;

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,public projectservice: ProjectService,private route: ActivatedRoute,    private formBuilder: FormBuilder,) { }

  ngOnInit() {
      this.prjForm = this.formBuilder.group({
        Name: ["", [Validators.required]],
        Overtime: ["", [Validators.required]],
        Billable: ["", [Validators.required]],
       // ProjectId: [this.route.snapshot.paramMap.get("id"), [Validators.required]]
      });
    }
  formProject(){
      this.projectservice.editProject((data)=>{
        console.log(data);
      },this.prjForm.value);
  }

}
