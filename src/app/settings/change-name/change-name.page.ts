import { SettingsService } from './../../services/settingsAPI/settings.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Platform, AlertController } from "@ionic/angular";
import { getName } from 'ionicons/dist/types/icon/utils';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { delay, share } from 'rxjs/operators';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {
  user: Observable<{}>;
  nameForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private alertController: AlertController
    ) { }
    

  ngOnInit() {
    this.user = this.getAsyncData().pipe(share());
    this.nameForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.minLength(3)]],
    });
    
  }

  getAsyncData() {
   return of({
     firstName: this.getUName(),
   }).pipe(
   );
 }


 async getUName(){
  await this.settingsService.getUsername((data)=>{
    console.log(data["name"])
    return data["name"]
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
      console.log(data)
    })
  }
}