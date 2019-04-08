import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NodeListComponent } from './node-list/node-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { TokensComponent } from './tokens/tokens.component';
import { IndividualRenterComponent } from './individual-renter/individual-renter.component';
import { CompanyRenterComponent } from './company-renter/company-renter.component';
import { LenderComponent } from './lender/lender.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AddpointComponent } from './addpoint/addpoint.component';
import { EscrowListComponent } from './escrow-list/escrow-list.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TokenComponent } from './token/token.component';
import { AdminComponent } from './admin/admin.component';
import { WalletComponent } from './wallet/wallet.component';
import { AddNodeComponent } from './add-node/add-node.component';
import { EscrowDetailsComponent } from './escrow-details/escrow-details.component';

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
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'main',
        component: DashboardComponent
      },
      {
        path: 'nodeList',
        component: NodeListComponent
      },
      {
        path: 'tokens',
        component: TokensComponent
      },
      {
        path: 'request',
        component: RequestListComponent
      },
      {
        path: 'addNode',
        component: AddNodeComponent
      },
      {
        path: 'addPoint',
        component: AddpointComponent
      },
      {
        path: 'escrow',
        component: EscrowListComponent
      },
      {
        path: 'escrowDetails',
        component: EscrowDetailsComponent
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
  declarations: [
    DashboardComponent,
    NodeListComponent,
    RequestListComponent,
    TokensComponent,
    IndividualRenterComponent,
    CompanyRenterComponent,
    LenderComponent,
    SettingComponent,
    AddpointComponent,
    EscrowListComponent,
    GeneralInfoComponent,
    TokenComponent,
    AdminComponent,
    WalletComponent,
    AddNodeComponent,
    EscrowDetailsComponent
  ]
})
export class VuuplAdminModule {}
