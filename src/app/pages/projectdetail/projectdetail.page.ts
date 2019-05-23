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
  logsprj = [];
  consultants = [];
  SwipedTabsIndicator :any= null;
  tabs:any=[];
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,public projectservice: ProjectService,private route: ActivatedRoute) {
     }

  ngOnInit() {
  }

  ionViewWillEnter (){
    this.assignProject();
  }
  assignProject(){
    this.projectservice.getFullproject((data)=>{
        this.consultants = data.usersOnTheProject;
        this.info = {companynaam:data.company.name,bill:data.billable,inprogress:data.inProgress,projnaam:data.name,over:data.overtime}
        if(data.logs.length == 0){
          this.logsprj = null;
        }else{
          this.logsprj = data.logs;
        }
    },this.route.snapshot.paramMap.get('id'))
  }
  segmentChanged(event){
    this.slider.slideTo(event.detail.value,400);
  }

  slideChanged(event){
    this.slider.getActiveIndex().then((data)=>{
      this.page = data;
    })
  }

  
  //navigate to add users to a project page
  goAddUsers() {
    this.navCtrl.navigateForward("/add-user-to-project");
    this.menuCtrl.close();
  }

  //navigate to remove users from a project page
  goRemoveUsers() {
    this.navCtrl.navigateForward("/remove-user-from-project");
    this.menuCtrl.close();
  }

}
