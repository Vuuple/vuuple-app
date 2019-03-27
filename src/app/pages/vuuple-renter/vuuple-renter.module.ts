import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule.forChild([

      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'main',
            component: DashboardComponent,
          }
          , {
            path: '**',
            component: NotFoundComponent,
          }]
      }
    ])
  ],
  declarations: [DashboardComponent]
})
export class VuupleRenterModule { }
