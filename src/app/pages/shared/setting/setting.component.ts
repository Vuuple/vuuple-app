import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  EditForm: FormGroup;
  submitted = false;
  activeAccount : boolean = false; 
  currentUser : any;

  constructor(private fb: FormBuilder,private authservice : AuthService) {
    this.currentUser = this.authservice.getCuurentUser();
    console.log(this.currentUser)
    this.createForm();
    // this.EditForm.value.name = this.currentUser.username
    // this.EditForm.value.email = this.currentUser.email
    console.log(this.currentUser.username,this.currentUser.email)
    const type = this.authservice.getUserType();
    if(type == 1 ){
      this.activeAccount = false ;
    }else{
      this.activeAccount = true ;
    }
    console.log(this.activeAccount)
  }
  createForm() {
    this.EditForm = this.fb.group({
      name: this.currentUser.username,
      email: this.currentUser.email,
      password: ['', Validators.required] ,
      cpassword : ['',Validators.required]      
    });
  }
  ngOnInit() {
   
  }
  get f() {
    return this.EditForm.controls;
  }
  EditFunction() {
    this.submitted = true;

    if (this.EditForm.invalid) {
      return;
    }
  }
}
