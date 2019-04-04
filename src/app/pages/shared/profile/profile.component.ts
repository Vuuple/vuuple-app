import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username:any;
  email:any;
  ethaddress:any;
  category:any;
  status:any;
  port:any;
  ip:any;
  enode:any;

  constructor(private authservics:AuthService) {
    this.username = this.authservics.currentUser.username;
    this.email = this.authservics.currentUser.email;
    this.ethaddress = this.authservics.currentUser.ethAddress;
    this.category = this.authservics.currentUser.category;
    this.status = this.authservics.currentUser.status;
    this.port = this.authservics.currentUser.port;
    this.ip = this.authservics.currentUser.ip;
    this.enode = this.authservics.currentUser.enode;
   }

  ngOnInit() {
  }

}
