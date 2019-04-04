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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AddpointComponent } from './addpoint/addpoint.component';
import { EscrowListComponent } from './escrow-list/escrow-list.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TokenComponent } from './token/token.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',

        component: DashboardComponent
      },
      {
        path: 'main',
        component: DashboardComponent
      },
      {
        path: 'request',
        component: RequestListComponent
      },
      {
        path: 'addpoint',
        component: AddpointComponent
      },
      {
        path: 'escrow',
        component: EscrowListComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  exports: [
    DashboardComponent,
    RequestListComponent,
    IndividualRenterComponent,
    MinersComponent,
    SettingComponent,
    TokenComponent,
    GeneralInfoComponent
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
    SettingComponent,
    AddpointComponent,
    EscrowListComponent,
    GeneralInfoComponent,
    TokenComponent
  ]
})
export class VuuplAdminModule {}
