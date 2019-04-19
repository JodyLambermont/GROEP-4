import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-notifications',
  templateUrl: './change-notifications.page.html',
  styleUrls: ['./change-notifications.page.scss'],
})
export class ChangeNotificationsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

}
