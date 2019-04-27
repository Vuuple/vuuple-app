import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RaftManageComponent } from './raft-manage/raft-manage/raft-manage.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    NotFoundComponent,
    ProfileComponent,
    ReportIssueComponent,
    RaftManageComponent
  ],
  exports: [NotFoundComponent, RaftManageComponent]
})
export class SharedModule {}
