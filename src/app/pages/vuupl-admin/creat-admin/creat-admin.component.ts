import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { VuuplAdminService } from '../../../providers/vuuple-admin/vuupl-admin.service'

@Component({
  selector: 'app-creat-admin',
  templateUrl: './creat-admin.component.html',
  styleUrls: ['./creat-admin.component.scss']
})
export class CreatAdminComponent implements OnInit {
  addAdmin : FormGroup
  data: any;
  constructor( private router : Router,
               private formBuilder :FormBuilder,
               private ServerApiService : ServerApiService ,
               private VuuplAdminService : VuuplAdminService) {
    this.addAdmin = this.formBuilder.group({
      username : ['' ,Validators.required],
      email : ['' ,Validators.required],
      pwd : ['' ,Validators.required],
      enode : ['' ,Validators.required],
      eth : ['' ,Validators.required],
      ip : ['' ,Validators.required],
    })
   }

  ngOnInit() {
  }
  create(){
    this.data =({
      username : this.addAdmin.value.username ,
      email : this.addAdmin.value.email,
      pwd : this.addAdmin.value.pwd,
      ethAddress : this.addAdmin.value.eth,
      ip : this.addAdmin.value.ip,
      enode :this.addAdmin.value.enode
    });
    console.log(this.data);
    
     this.VuuplAdminService.addVuupleAdmin(this.addAdmin.value.eth).then( (res) => {
       console.log(res)
     })
  
    this.ServerApiService.registerAdmin(this.data).subscribe( (res) =>{
      console.log(res);
    } );
  }
  goBack(){
     this.router.navigate(['/pages/admin/admin']);
  }
}
