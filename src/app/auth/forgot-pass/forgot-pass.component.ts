import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerApiService } from '../../providers/server-api/server-api.service';
import { MustMatch } from '../../providers/helpers/MustMatch';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  forgotPass : FormGroup ;
  checkTokenValidation : FormGroup ;
  resetPass : FormGroup;
  checkToken = false ;
  newPass = false ;
  errors: any;

  constructor( private router : Router , 
               private fb : FormBuilder ,
               private ApiService : ServerApiService,
               private toastr: ToastrService ,
               private spinner: NgxSpinnerService,
               ) { 

    this.forgotPass = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.checkTokenValidation = this.fb.group({
      token : ['',Validators.required]
    })
    this.resetPass = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(7)]],
      cpass: ['', Validators.required],
    }, {
      validator: MustMatch('pass', 'cpass')
  })
}
  
  get f(){ return this.forgotPass.controls}
  get f1(){ return this.checkTokenValidation.controls}
  get f2(){ return this.resetPass.controls}

  ngOnInit() {
  }

  forgotPassword(){
    this.spinner.show();
    const data = {
      email : this.forgotPass.value.email
    }
    setTimeout(() => {
    this.ApiService.checkEmail(data).subscribe(
      res => {
        if(!res) {
          this.spinner.hide();
          this.toastr.error('please enter correct email')
        }
        else {
         this.ApiService.resetPassword(data).subscribe(
           res => {
            if (!res){
              this.spinner.hide();
              this.toastr.error('Something went wrong')
            }else {
              this.checkToken = true ;
              this.newPass = false ;
              this.spinner.hide();
              this.toastr.success('please check your email')
            }
            }
         )
        }
       })
     }, 2000);
  }

  checkTokenValidationSubmit(){
    this.spinner.show();
    const data = {
      resetToken : this.checkTokenValidation.value.token
    }
    setTimeout(() => {
    this.ApiService.validateToken(data).subscribe(
      res => {
        if (!res){
          this.spinner.hide();
          this.toastr.error('Something went wrong')
        }else {
          this.newPass = true ;
          this.checkToken = false ;
          this.spinner.hide();
          console.log(res)
        }
      }
    )
  }, 2000);
  }

  setNewPassword(){
    this.spinner.show();
    const data = {
      resetToken : this.checkTokenValidation.value.token ,
      newPassword : this.resetPass.value.pass
    }
    setTimeout(() => {
    this.ApiService.setNewPassword(data).subscribe(
      res => {
        if (!res){
          this.spinner.hide();
          this.toastr.error('Something went wrong')
        }else {
          this.spinner.hide();
          this.toastr.success('Password is reset successfuly') ;
          this.router.navigate(['/auth/login']);
        }
      }
    )
  }, 2000);
  }

  returnToLogin() {
    this.router.navigate(['/auth/login']);
  }

}
