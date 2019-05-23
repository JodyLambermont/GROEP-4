import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SettingsService } from './../../services/settingsAPI/settings.service';
import { Workweek } from 'src/app/interfaces/workweek';

@Component({
  selector: 'app-change-workweek',
  templateUrl: './change-workweek.page.html',
  styleUrls: ['./change-workweek.page.scss'],
})

export class ChangeWorkweekPage implements OnInit {
  protected workweek: Workweek;
  weekForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private alertController: AlertController,
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string
    ) {
      settingsService.getWorkweek(data => {
        let workweekCopy = {
          MaandagID:data['monday']['id'],
          MaandagBegin:data['monday']['start'].substring(11,16),
          MaandagEinde:data['monday']['start'].substring(11,16),
          DinsdagID:data['tuesday']['id'],
          DinsdagBegin:data['tuesday']['start'].substring(11,16),
          DinsdagEinde:data['tuesday']['start'].substring(11,16),
          WoensdagID:data['wednesday']['id'],
          WoensdagBegin:data['wednesday']['start'].substring(11,16),
          WoensdagEinde:data['wednesday']['start'].substring(11,16),
          DonderdagID:data['thursday']['id'],
          DonderdagBegin:data['thursday']['start'].substring(11,16),
          DonderdagEinde:data['thursday']['start'].substring(11,16),
          VrijdagID:data['friday']['id'],
          VrijdagBegin:data['friday']['start'].substring(11,16),
          VrijdagEinde:data['friday']['start'].substring(11,16),
          ZaterdagID:data['saturday']['id'],
          ZaterdagBegin:data['saturday']['start'].substring(11,16),
          ZaterdagEinde:data['saturday']['start'].substring(11,16),
          ZondagID:data['sunday']['id'],
          ZondagBegin:data['sunday']['start'].substring(11,16),
          ZondagEinde:data['sunday']['start'].substring(11,16)
        }
        this.workweek = workweekCopy;
        console.log(this.workweek)
      });
     }

  ngOnInit() {
    this.weekForm = this.formBuilder.group({
      MaandagBegin: ["", ],
      MaandagEinde: ["", ],
      DinsdagBegin: ["", ],
      DinsdagEinde: ["", ],
      WoensdagBegin: ["", ],
      WoensdagEinde: ["", ],
      DonderdagBegin: ["", ],
      DonderdagEinde: ["", ],
      VrijdagBegin: ["", ],
      VrijdagEinde: ["", ],
      ZaterdagBegin: ["", ],
      ZaterdagEinde: ["", ],
      ZondagBegin: ["", ],
      ZondagEinde: ["", ],
    });
  }

  goBack(){
    this.navCtrl.back();
  }

  ngOnSubmit(){
    //TODO changeWorkWeek
  }

}
