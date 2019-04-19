import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-workweek',
  templateUrl: './change-workweek.page.html',
  styleUrls: ['./change-workweek.page.scss'],
})
export class ChangeWorkweekPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

}
