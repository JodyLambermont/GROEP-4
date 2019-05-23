import { Component, OnInit } from '@angular/core';
import { Consultant } from './consultant';
import { MenuController } from "@ionic/angular";
import { NavController, NavParams  } from "@ionic/angular";
import { ConsultantService } from '../../services/consultantAPI/consultant.service'
import { DataserviceService } from '../../services/consultantAPI/dataservice.service'
import { Router  } from '@angular/router';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.page.html',
  styleUrls: ['./consultants.page.scss'],
})
export class ConsultantsPage implements OnInit {
  consultants = []
  items = []
  public searchq : string = "";
  constructor(    public navCtrl: NavController,
    public menuCtrl: MenuController,public consultantService: ConsultantService, private dataservice: DataserviceService,private route: Router) {
    this.assignConsultants();
   }

  ngOnInit() {
  }
 
  assignConsultants() {
    this.consultantService.getConsultants((data)=>{
      console.log(data);
      for(var i =0;i < data.length;i++){
          this.consultants.push(new Consultant(data[i].name,data[i].id,data[i].workMonth.salary,data[i].workMonth.accepted,data[i].workMonth.month,data[i].workMonth.totalHours))
      }
    });
    this.items = this.consultants;
  }

  itemSelected(consultant){
    //this.dataservice.setData(1,consultant);
    this.route.navigateByUrl("/consultantdetail/"+consultant.id)
  }

  filter(){
    this.items =  this.consultants.filter(item =>{ return(item.name.toLowerCase().indexOf(this.searchq.toLowerCase()) > -1) });
  }

}
