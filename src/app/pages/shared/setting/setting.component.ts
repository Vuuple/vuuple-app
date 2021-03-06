import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/core/auth.service';
import { MustMatch } from '../../../providers/helpers/MustMatch';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { ToastrService } from 'ngx-toastr';

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
  loading = false;

  constructor(private fb: FormBuilder,
              private authservice : AuthService ,
              private toastr: ToastrService ,
              private apiService : ServerApiService) {
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
    },{
      validator: MustMatch('password', 'cpassword')
    });
  }
  ngOnInit() {
   
  }
  get f() {
    return this.EditForm.controls;
  }
  async EditFunction() {
    this.loading = true
    this.submitted = true;
     
    if (this.EditForm.invalid) {
      return;
    }
    const data = {
       email : this.EditForm.value.email ,
       username : this.EditForm.value.name ,
       pwd : this.EditForm.value.password
     }
    await this.apiService.updateUserDate(data).subscribe(
      res => {
           this.loading = false ;
           this.toastr.success("The data was successfully updated,Please logout firstly ") ;
           console.log(res) ;
         },
      err => {
          this.loading = false ;
          this.toastr.error ("Something went wrong");
          console.log(err) ;
      })
  }

}

