import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renter-register',
  templateUrl: './renter-register.component.html',
  styleUrls: ['./renter-register.component.scss']
})
export class RenterRegisterComponent implements OnInit {
  renterRegisterForm : FormGroup;
  users: any[];
  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.renterRegisterForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      staticIP : ['', Validators.required],
      ethereumAddress : ['', Validators.required],
      termService : ['', Validators.required],
      privacyPolicy : ['', Validators.required]
    });
  }
  renterRegister(){
    this.authService.registerClient(this.renterRegisterForm.value.username,
                                    this.renterRegisterForm.value.email,
                                    this.renterRegisterForm.value.password,
                                    this.renterRegisterForm.value.ethereumAddress,
                                    'renter',this.renterRegisterForm.value.staticIP);
     this.router.navigate(['/auth/registerCompleted']);

   }

}
