import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { NavModule } from '../core/nav/nav.module';
import { HeaderModule } from '../core/header/header.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  imports: [
    CommonModule, NavModule, HeaderModule, PagesRoutingModule, SharedModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
