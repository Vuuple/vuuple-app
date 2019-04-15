import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { RouterModule } from '@angular/router';
import { RenterRegisterComponent } from './renter-register/renter-register.component';
import { LenderRegisterComponent } from './lender-register/lender-register.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.
      forChild(

        [{
          path: '',
          component: RenterRegisterComponent,
          children: [
            { path: 'login', component: LoginComponent },
            {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full',
            }]
        }])
  ],
  declarations: [LoginComponent, RenterRegisterComponent, LenderRegisterComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
