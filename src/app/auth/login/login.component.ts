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

  async login() {
    const isAuth = await this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('pwd').value
    );
    if (isAuth) {
      this.router.navigate(['/pages']);
    } else {
      this.errorMessage = 'Incorrect credentials, please use the correct one';
    }
    // this.authService.login(value)
  }
}
