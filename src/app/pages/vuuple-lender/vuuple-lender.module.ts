import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllocateComponent } from './allocate/allocate.component';
import { RedeemComponent } from './redeem/redeem.component';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
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
        path: 'allocate',
        component: AllocateComponent
      },
      {
        path: 'redeem',
        component: RedeemComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  declarations: [
    DashboardComponent,
    AllocateComponent,
    RedeemComponent,
    AccountComponent
  ]
})
export class VuupleLenderModule {}
