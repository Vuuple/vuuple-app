import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.
      forChild(

        [{
          path: '',
          component: LoginComponent,
          children: [
            { path: 'login', component: LoginComponent },
            {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full',
            }]
        }])
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
