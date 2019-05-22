import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { NavController, NavParams  } from "@ionic/angular";
import { ProjectService } from '../../services/projectAPI/project.service'
import { Router  } from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  projects = []

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,public projectservice: ProjectService,private route: Router) { 
        this.assignProjects();
    }

  ngOnInit() {
  }

  assignProjects(){
    this.projectservice.getProjects((data)=>{
      for(var i =0;i < data.length;i++){
     //   this.consultants.push(new Consultant(data[i].name,data[i].id))
    }
    });
  }

  itemSelected(item){
    
  }


}
