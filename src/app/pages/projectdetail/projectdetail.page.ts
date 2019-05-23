import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/projectAPI/project.service'
import { MenuController } from "@ionic/angular";
import { NavController, NavParams ,IonSlides } from "@ionic/angular";
import { ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
})
export class ProjectdetailPage implements OnInit {
  @ViewChild('slides') slider: IonSlides;
  page = 0
  info;
  logs = [];
  consultants = [];
  SwipedTabsIndicator :any= null;
  tabs:any=[];
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,public projectservice: ProjectService,private route: ActivatedRoute) {
        this.assignProject();
     }

  ngOnInit() {
  }
  assignProject(){
    this.projectservice.getFullproject((data)=>{
        this.consultants = data.usersOnTheProject;
        this.info = {companynaam:data.company.name,bill:data.billable,inprogress:data.inProgress,projnaam:data.name,over:data.overtime}
        this.logs = data.logs;
    },this.route.snapshot.paramMap.get('id'))
  }

  totaaluren(){
    let totaal;
    for(let i = 0;i < this.logs.length; i++){
        totaal += this.logs[i].stop.getTime() - this.logs[i].start.getTime();
    }
    console.log(totaal);
    return totaal;
  }

  segmentChanged(event){
    this.slider.slideTo(event.detail.value,400);
  }

  slideChanged(event){
    this.slider.getActiveIndex().then((data)=>{
      this.page = data;
    })
  }
}
