import { Component, OnInit } from '@angular/core';
import { Consultant } from './../consultants/consultant';
import { NavController, NavParams  } from "@ionic/angular";

@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.page.html',
  styleUrls: ['./consultantdetail.page.scss'],
})
export class ConsultantdetailPage implements OnInit {

  item ="";
  constructor(public navParams: NavParams
  ) {
    this.item = this.navParams.get('consultant')
  }

  ngOnInit() {
  }

}
