import { SettingsService } from './../../services/settingsAPI/settings.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Platform, AlertController } from "@ionic/angular";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private alertController: AlertController) 
    {}

    ngOnInit() {
      this.passwordForm = this.formBuilder.group({
        OldPassword: [""],
        NewPassword: ["", [Validators.required, Validators.minLength(3)]],
        RepeatPassword: ["", [Validators.required, Validators.minLength(3)]]
      });
    }

  goBack(){
    this.navCtrl.back();
  }

  onSubmit() {
    if(this.passwordForm.value.NewPassword == this.passwordForm.value.RepeatPassword){
      this.settingsService.resetPassword(this.passwordForm.value,(data)=>{
        if(data["succes"]){
          this.showMessage("Wachtwoord is succesvol veranderd.");
        }
        else {
          this.showAlert("Het oude wachtwoord is niet correct.");
        }
      });
    }
    else{
      this.showAlert("De wachtwoorden zijn niet gelijk!");
    }
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
}