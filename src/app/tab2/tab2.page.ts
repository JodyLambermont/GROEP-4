import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild,Inject,LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { testUserAgent } from '@ionic/core';
import { Tab2Service } from '../services/tab2API/tab2.service';
import {IonInfiniteScroll } from '@ionic/angular';
import { ProjectService } from '../services/projectAPI/project.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { text } from '@angular/core/src/render3';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';



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
  editForm: FormGroup;
  changed: any;
  changedDesc: any;
  changedSDate: any;
  changedEDate: any;
  changedStart: any;
  changedEnd: any;
  constructor(private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private tab2service: Tab2Service, private projectservice: ProjectService) {
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

  //  async openModal(){
  //    const myModal = await this.modal.create({
  //      component: Tab2Page,
  //      componentProps: {value: 1233}
  //    });
  //    myModal.present();
  //  }
  //  async presentModal() {
  //   const modal = await this.modal.create({
  //     component: Tab2Page,
  //     componentProps: { value: 123 }
  //   });
  //   return await modal.present();
  // }

 async openTodoAlert(){
   
   let addTodoAlert = await this.alertCtrl.create({
    message: "Enter your log changes:",
    inputs: [{
       type:"text", 
       name:'addDesc',
       placeholder:"Task Description"
       
     },
     {
      type:"date",
      name:"startDate",
      placeholder:"StartDate"
    },
    {
      type:"date",
      name:"endDate",
      placeholder:"EndDate"
    },{
      type:"time",
      name:'addStart',
      placeholder:"Start Time"
    },{
       type:"time",
       name:"addEnd",
       placeholder:"End Time"
     }],
     buttons: [
       {
         text:"Cancel"
       },{
         text:"Save Changes",
         handler: (alertData) =>{
          this.changedDesc = alertData.addDesc;
          console.log(this.changedDesc);
          this.changedSDate = alertData.startDate;
          this.changedEDate = alertData.endDate;
          this.changedStart = alertData.addStart;
          this.changedEnd = alertData.addEnd;
          let editedId = this.test[0].id;
          console.log(editedId);
          var changedArray = {
            Id: editedId,
            Start: this.changedSDate,
            Stop: this.changedEDate,
            Description: this.changedDesc
          }
          // changedArray[0] = editedId;
          // changedArray[1] = this.changedSDate;
          // changedArray[2] = this.changedEDate;
          // changedArray[3] = this.changedDesc;
          // changedArray.push(editedId);
          // changedArray.push(this.changedSDate);
          // changedArray.push(this.changedEDate);
          // changedArray.push(this.changedDesc);
          
          this.tab2service.UpdateLog(changedArray);
          console.log(changedArray);
        }
       }
     ]
   });
  addTodoAlert.present();
  console.log(this.changedDesc);
 }




  //  ngOnInit() {
  //   this.editForm = this.formBuilder.group({
  //     Id: ["", [Validators.required]],
  //     Start: ["", [Validators.required]],
  //     Stop: ["", [Validators.required]],
  //     Description: ["", [Validators.required]]

  //   });
  // }
  onSubmit() {
    this.tab2service.changeLog(this.editForm.value).subscribe();
  }

   edit(){
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
