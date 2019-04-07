import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { ReportIssueComponent } from './shared/report-issue/report-issue.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'admin',
    loadChildren: './vuupl-admin/vuupl-admin.module#VuuplAdminModule'/*, canActivate: [AdminGuard]*/

  }, {
      path: 'renter',

      loadChildren: './vuuple-renter/vuuple-renter.module#VuupleRenterModule'/*, canActivate: [RenterGuard]*/
    },
    {
      path: 'lender',
      loadChildren: './vuuple-lender/vuuple-lender.module#VuupleLenderModule'/*, canActivate: [LenderGuard]*/ 
    },
    {
      path:'profile',
      component:ProfileComponent,
    },
    {
      path:'report',
      component:ReportIssueComponent,
    },
 {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  }, {
    path: '**',
   component: NotFoundComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
