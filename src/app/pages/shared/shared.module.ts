import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RaftManageComponent } from './raft-manage/raft-manage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild([])],
  declarations: [
    NotFoundComponent,
    ProfileComponent,
    ReportIssueComponent,
    RaftManageComponent,
    SettingComponent,
    ActivateAccountComponent
  ],
  exports: [NotFoundComponent, RaftManageComponent, ActivateAccountComponent]
})
export class SharedModule {}
