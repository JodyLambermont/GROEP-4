import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }
}
