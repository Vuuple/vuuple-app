import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lender-register',
  templateUrl: './lender-register.component.html',
  styleUrls: ['./lender-register.component.scss']
})
export class LenderRegisterComponent implements OnInit {
  lenderRegisterForm : FormGroup;
  users: any[];
  constructor(private formBuilder : FormBuilder,
             private authService : AuthService,
             private router: Router) {
  }

  ngOnInit() {
    this.lenderRegisterForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      staticIP : ['', Validators.required],
      ethereumAddress : ['', Validators.required],
      storage : ['', Validators.required],
      termService : ['', Validators.required],
      privacyPolicy : ['', Validators.required]
    });

  }
    lenderRegister(){
     this.authService.registerClient(this.lenderRegisterForm.value.username,
                                     this.lenderRegisterForm.value.email,
                                     this.lenderRegisterForm.value.password,
                                     this.lenderRegisterForm.value.ethereumAddress,
                                     'lender',this.lenderRegisterForm.value.staticIP);
     this.router.navigate(['/auth/registerCompleted']);
    }
    returnToLogin(){
      this.router.navigate(['/auth/login']);

    }
}
