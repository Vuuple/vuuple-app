import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { WalletComponent } from './wallet/wallet.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { AccountComponent } from './account/account.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
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
        path: 'uploadFile',
        component: UploadFileComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'account',
        component : AccountComponent
      },
      {
        path: 'purchase',
        component : PurchaseComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  declarations: [DashboardComponent,WalletComponent, UploadFileComponent, AccountComponent, PurchaseComponent]
})
export class VuupleRenterModule {}
