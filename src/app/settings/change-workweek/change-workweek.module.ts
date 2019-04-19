import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeWorkweekPage } from './change-workweek.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeWorkweekPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeWorkweekPage]
})
export class ChangeWorkweekPageModule {}
