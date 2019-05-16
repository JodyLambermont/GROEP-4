import { SettingsService } from './../../services/settingsAPI/settings.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Platform, AlertController } from "@ionic/angular";
import { getName } from 'ionicons/dist/types/icon/utils';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {
  nameForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    var UserName
    this.settingsService.getUsername((data)=>{
      if(data["name"] != ""){
        return data["name"]
      }
      else {
        this.showAlert("Could not retreive username.");
      }
    });
    this.nameForm = this.formBuilder.group({
      NameInput: [UserName, [Validators.required, Validators.minLength(3)]],
    });
  }

  goBack(){
    this.navCtrl.back();
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }

  showMessage(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Succes",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }

  onSubmit(){
    this.settingsService.changeUsername(this.nameForm.value, (data) => {
      
    })
  }
}