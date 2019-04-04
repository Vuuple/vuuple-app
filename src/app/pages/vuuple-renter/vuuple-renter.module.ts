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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
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
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  exports: [WalletComponent],
  declarations: [DashboardComponent, WalletComponent, UploadFileComponent]
})
export class VuupleRenterModule {}
