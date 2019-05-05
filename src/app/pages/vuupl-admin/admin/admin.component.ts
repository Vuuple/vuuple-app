import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { VuuplAdminService } from '../../../providers/vuuple-admin/vuupl-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: any = [];
  adminID: any;

  constructor(private serverApiService: ServerApiService,
             private router : Router ,
             private VuuplAdminService : VuuplAdminService) {
    this.serverApiService.getAllAdmins().subscribe((data: {}) => {
      this.admins = data;
      console.log(data);
    });
  }
  ngOnInit() {}
  createAdmin(){
    this.router.navigate(['/pages/admin/createAdmin'])
  }
  ban(value , eth){
    this.adminID = value ;
    console.log(this.adminID);
    this.VuuplAdminService.renounceVuupleAdmin(eth).then( (res) => {
      console.log(res);
    })
    this.serverApiService.ban(this.adminID).subscribe((res) => {
      console.log(res);
    })
  }
}
