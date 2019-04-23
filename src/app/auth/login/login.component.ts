import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  cate: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  // tryFacebookLogin() {
  //   this.authService.doFacebookLogin()
  //     .then(res => {
  //       this.router.navigate(['/user']);
  //     })
  // }

  // tryTwitterLogin() {
  //   this.authService.doTwitterLogin()
  //     .then(res => {
  //       this.router.navigate(['/user']);
  //     })
  // }

  // tryGoogleLogin() {
  //   this.authService.doGoogleLogin()
  //     .then(res => {
  //       this.router.navigate(['/user']);
  //     })
  // }

  login() {
    this.authService
      .login(this.loginForm.get('email').value, this.loginForm.get('pwd').value)
      .then(isAuth => {
        if (isAuth == true) {
          const type = this.authService.getUserType();
          const isApproved = this.authService.isApproved();
          console.log(isApproved);

          if (type === 1 && isApproved === true) {
            this.router.navigate(['/pages/admin']);
          } else if (type === 2 && isApproved === true) {
            this.router.navigate(['/pages/renter']);
          } else if (type === 3 && isApproved === true) {
            this.router.navigate(['/pages/lender']);
          } else if (isApproved === false) {
            this.router.navigate(['/auth/registerCompleted']);
          } else {
            this.errorMessage =
              'Incorrect credentials, please use the correct one';
          }
        } else {
          this.errorMessage =
            'Incorrect credentials, please use the correct one';
        }
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });

    // this.authService.login(value)
  }
  createAccount() {
    //   this.router.navigate(['/auth/renterRegister']);
    // this.router.navigate(['/auth/lenderRegister']);
    this.router.navigate(['/auth/chooseCategory']);
  }
}
