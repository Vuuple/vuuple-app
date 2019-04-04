import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title =' COMPANY RENTER'
  admintitle='Admin'
  admin=['Nodes','vuuple Tokens']
  user=['following','followers']
  items=[]
  constructor(   public authService: AuthService,private router: Router,) {
   }
   async Logout(){
       this.authService.logout();
       this.router.navigate(['/auth']);
   }
   ShowProfile(){
    this.router.navigate(['/pages/profile']);
   }
  ngOnInit() {
  }

}
