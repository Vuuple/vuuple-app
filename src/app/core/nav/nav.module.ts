import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild([]),
  ],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class NavModule {  }
