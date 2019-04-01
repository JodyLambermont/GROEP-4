import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

  goToName(){
    this.navCtrl.navigateForward("/change-name");
  }

  goToNotifications(){
    this.navCtrl.navigateForward("/change-notifications");
  }

  goToPassword(){
    this.navCtrl.navigateForward("/change-password");
  }

  goToWorkweek(){
    this.navCtrl.navigateForward("/change-workweek");
  }

}
