import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NodeListComponent } from './node-list/node-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { TokensComponent } from './tokens/tokens.component';
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
import { UserlistInterceptorComponent } from './user-list-Interceptor/user-list-Interceptor.component';
import { CreatAdminComponent } from './creat-admin/creat-admin.component';
import { RequestInterceptorComponent } from './request-interceptor/request-interceptor.component';
import { TokenRequestListComponent } from './token-request-list/token-request-list.component';
import { TokenRequestDetailsComponent } from './token-request-details/token-request-details.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
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
        path: 'createAdmin',
        component: CreatAdminComponent
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
        component: RequestInterceptorComponent
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
        path: 'token-req',
        component: TokenRequestDetailsComponent
      },
      //{
      // path: 'setting',
      //  component: SettingComponent
      // },
      {
        path: 'individualRenter',
        component: UserlistInterceptorComponent
      },
      {
        path: 'companyRenter',
        component: UserlistInterceptorComponent
      },
      {
        path: 'lender',
        component: UserlistInterceptorComponent
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
    UserlistInterceptorComponent,
    AddpointComponent,
    EscrowListComponent,
    GeneralInfoComponent,
    TokenComponent,
    AdminComponent,
    WalletComponent,
    AddNodeComponent,
    EscrowDetailsComponent,
    CreatAdminComponent,
    RequestInterceptorComponent,
    TokenRequestListComponent,
    TokenRequestDetailsComponent
  ]
})
export class VuuplAdminModule {}
