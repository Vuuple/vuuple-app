import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [NotFoundComponent, ProfileComponent,ReportIssueComponent],
  exports: [NotFoundComponent]
})
export class SharedModule { }
