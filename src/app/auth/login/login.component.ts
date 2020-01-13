import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServerApiService } from '../../providers/server-api/server-api.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  cate: any;
  Loading =  false ;

  constructor(
    public authService: AuthService ,
    private router: Router ,
    private toastr: ToastrService ,
    private fb: FormBuilder ,
    private api : ServerApiService
  ) {
    this.createForm();
    // this.toastr.success('Hello world!', 'Toastr fun!');
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
    this.Loading = true ;
    this.authService
      .login(this.loginForm.get('email').value, this.loginForm.get('pwd').value)
      .then(isAuth => {
        console.log('resolve');

        if (isAuth == true) {
          const type = this.authService.getUserType();
          const isApproved = this.authService.isApproved();
          console.log(isApproved);

          if (type === 1 && isApproved === true) {
            this.router.navigate(['/pages/admin']);
          } else if (type === 2 && isApproved === true) {
            this.router.navigate(['/pages/renter/main']);
          } else if (type === 3 && isApproved === true) {
            this.router.navigate(['/pages/lender/main']);
          } else if (isApproved === false) {
            // this.router.navigate(['/auth/registerCompleted']);
            this.router.navigate(['/pages']); //just now
          } else {
            this.errorMessage =
              'Incorrect credentials, please use the correct one';
            this.toastr.error('Incorrect credentials, please use the correct one', 'Error!');    
          }
          this.Loading = false ;      
        } 
      })
      .catch(err => {
        this.errorMessage = err; 
        if (this.errorMessage === "Bad Request"){
        this.toastr.error('Wrong email or password!', 'Error!')
        }else {
          this.toastr.error('something went wrong' , 'Error!')
        }
        // this.toastr.error('Wrong email or password!', 'Error!');       
        console.error(err);
        this.Loading = false ;      
      });

    // this.authService.login(value)
  }
  createAccount() {
//       this.router.navigate(['/auth/renterRegister']);
      // this.router.navigate(['/auth/registerCompleted'])
    this.router.navigate(['/auth/lenderRegister']);
    // this.router.navigate(['/auth/chooseCategory']);
  }
 forgotPassword(){
     this.router.navigate(['/auth/forgotPassword']);
  }
}
