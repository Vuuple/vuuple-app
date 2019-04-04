import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotFoundComponent, ProfileComponent],
  exports: [NotFoundComponent]
})
export class SharedModule { }
