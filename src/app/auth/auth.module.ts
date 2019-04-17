import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { RouterModule } from '@angular/router';
import { RenterRegisterComponent } from './renter-register/renter-register.component';
import { LenderRegisterComponent } from './lender-register/lender-register.component';
import { RegisterationCompletedComponent } from './registeration-completed/registeration-completed.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';

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
        },
        { path: 'renterRegister', component: RenterRegisterComponent },
        { path: 'lenderRegister', component: LenderRegisterComponent },
        { path: 'registerCompleted' , component :RegisterationCompletedComponent},
        { path: 'chooseCategory' , component :ChooseCategoryComponent},
      ])
  ],
  declarations: [LoginComponent, RenterRegisterComponent, LenderRegisterComponent, RegisterationCompletedComponent, ChooseCategoryComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
