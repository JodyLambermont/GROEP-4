import { Component, OnInit } from '@angular/core';
import { Consultant } from './consultant';
import { MenuController } from "@ionic/angular";
import { NavController, NavParams  } from "@ionic/angular";


@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.page.html',
  styleUrls: ['./consultants.page.scss'],
})
export class ConsultantsPage implements OnInit {
  consultants = []
  constructor(    public navCtrl: NavController,
    public menuCtrl: MenuController,) {
    this.assignBreeds();
   }

  ngOnInit() {
  }
 
  assignBreeds() {
    this.consultants = [
      new Consultant("arne mergan","e2fds1zr"),new Consultant("ilja de rycke","e21zr"),new Consultant("jody lambroment","e21fdszr"),new Consultant("anthe boets","sfq"),new Consultant("mehdi","sdg")
    ];
  }

  itemSelected(consultant){
    this.navCtrl.navigateForward("/consultantdetail/"+consultant.id);
    this.menuCtrl.close();
  }

}
