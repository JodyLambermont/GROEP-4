import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { NavController, NavParams  } from "@ionic/angular";
import { ProjectService } from '../../services/projectAPI/project.service'
import { Router  } from '@angular/router';
import { Projects } from '../../interfaces/projects'

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
        let projectsCopy = {
          id:data[i]['id'],
          name:data[i]['name'],
          companyId:data[i]['companyId'],
          overtime:data[i]['overtime'],
          billable:data[i]['billable']
        }
        this.projects.push(projectsCopy)
    }
    });
  }

  itemSelected(item){
    this.navCtrl.navigateForward("/projectdetail/"+item.id);
    this.menuCtrl.close();
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

  edit(item){
    this.navCtrl.navigateForward("/change-project/"+item.id);
    this.menuCtrl.close();
  }


}
