import { User } from './../../interfaces/user';
import { SettingsService } from './../../services/settingsAPI/settings.service';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})

export class ChangeNamePage implements OnInit {
  protected users: User;
  nameForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private alertController: AlertController,
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string
    ) {
      settingsService.getUsername((data) => {
          let userCopy = {
            name:data['name']}
          this.users = userCopy;
      })
     }
    

  ngOnInit() {
    this.nameForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.minLength(3)]],
    });
  }


  
  /*
constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private calendarservice: CalendarService) {
    calendarservice.getLogs((data)=>{
      for(var i =0;i < data.length;i++){
        let eventCopy = {
          title:data[i]['description'],
          startTime:new Date(data[i]['start']),
          endTime:new Date(data[i]['stop']),
          allDay:false
        }
        this.eventSource.push(eventCopy);
      }
      this.myCal.loadEvents();
      this.resetEvent();
    });
 }
 */

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