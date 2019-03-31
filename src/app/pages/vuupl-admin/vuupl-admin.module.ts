import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NodeListComponent } from './node-list/node-list.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { TokensComponent } from './tokens/tokens.component';
import { IndividualRenterComponent } from './individual-renter/individual-renter.component';
import { CompanyRenterComponent } from './company-renter/company-renter.component';
import { LenderComponent } from './lender/lender.component';
import { MinersComponent } from './miners/miners.component';
import { SettingComponent } from './setting/setting.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,SharedModule, RouterModule.forChild([

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
  exports:[DashboardComponent,
           RequestListComponent,
           IndividualRenterComponent,
           MinersComponent,
           SettingComponent
          ],
  declarations: [
     DashboardComponent, 
     NodeListComponent, 
     ManageRequestComponent,
     RequestListComponent,
    TokensComponent,
    IndividualRenterComponent,
    CompanyRenterComponent,
    LenderComponent,
    MinersComponent,
    SettingComponent
  ]
})
export class VuuplAdminModule { }
