import { Component, OnInit } from '@angular/core';
import { Consultant } from './../consultants/consultant';
import { ActivatedRoute } from '@angular/router';

"https://www.youtube.com/watch?v=mlGehHg4oSA"

@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.page.html',
  styleUrls: ['./consultantdetail.page.scss'],
})
export class ConsultantdetailPage implements OnInit {

  item ="";
  constructor(private route: ActivatedRoute
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
  }

  downloadPdf(){

  }

}
