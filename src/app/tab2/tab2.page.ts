import { Component, OnInit, ViewChild,Inject,LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { testUserAgent } from '@ionic/core';
import { Tab2Service } from '../services/tab2API/tab2.service';
import {IonInfiniteScroll } from '@ionic/angular';
import { ProjectService } from '../services/projectAPI/project.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  event = {
    title: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  eventsources: any;
  test: any;
  items;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private tab2service: Tab2Service, private projectservice: ProjectService) {
     /* tab2service.getAllOfUser((data)=>{
        for(var i = 0;i < data.length;i++){
          let eventCopy = {
            title: data[i]['description'],
            startTime: new Date(data[i]['start']),
            endTime: new Date(data[i]['stop']),
            allDay: false
          }
          this.test.push(eventCopy);
        }
      }
      );*/

      tab2service.getAllOfUser((data)=>{
        this.test = data;
        });
      projectservice.getProjects((data)=>{
        this.projects = data;
      })
   } 

   projects: any;

   compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

   public form = [
    { val: 'Project 1', isChecked: true },
    { val: 'Project 2', isChecked: false },
    { val: 'Activity 4', isChecked: false }
  ];
   loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.test.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}




//https://ehbpmagroup6.azurewebsites.net/Log/get?Id=765c9ab7-eb10-4147-9314-00c9ef8f22a4
