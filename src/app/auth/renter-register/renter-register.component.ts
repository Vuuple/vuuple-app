import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-renter-register',
  templateUrl: './renter-register.component.html',
  styleUrls: ['./renter-register.component.scss']
})
export class RenterRegisterComponent implements OnInit {
  renterRegisterForm : FormGroup;
  users: any[];
  srcImage : any ;
  category : any ;
  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private route: ActivatedRoute,
              private router : Router) {
                this.route.queryParams.subscribe(params  => {
                  this.category = params['val'];
                  console.log(this.category);
                  if(this.category == 'Individual'){
                    this.srcImage = "../../../assets/img/individualRenter.png"
                  }
                  else{
                   this.srcImage = "../../../assets/img/companyRenter.png";
                  }
                });
               // this.srcImage = "../../../assets/img/companyRenter.png";
               // this.srcImage = "../../../assets/img/individualRenter.png"
               }

  ngOnInit() {
    this.renterRegisterForm = this.formBuilder.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      staticIP : ['', Validators.required],
      ethereumAddress : ['', Validators.required],
      enode : ['' , Validators.required ],
      termService : ['', Validators.required],
      privacyPolicy : ['', Validators.required]
    });
  }
  renterRegister(){
    this.authService.registerClient(this.renterRegisterForm.value.username,
                                    this.renterRegisterForm.value.email,
                                    this.renterRegisterForm.value.password,
                                    this.renterRegisterForm.value.ethereumAddress,
                                    'renter',this.renterRegisterForm.value.staticIP,
                                    this.renterRegisterForm.value.enode);
     this.router.navigate(['/auth/registerCompleted']);

   }
   returnToLogin(){
    this.router.navigate(['/auth/login']);

  }
  
}
