import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userTitle = '';
  isadmin : any = [];
  isActive: boolean = false ;
  toolTip: string;
  srcImage : any ;
  isRenter: boolean;
  userImage: string;
  conn: boolean;

  constructor(public authService: AuthService, private router: Router) {
    this.srcImage = "../../../assets/img/networkDisconnected.png"
    const type = this.authService.getUserType();
    // console.log(type)
    if (type === 1) {
      this.userTitle = 'ADMIN';
      this.userImage = "assets/img/Admin.png" ;
       this.isadmin = true;
       this.isRenter = false; 
    } else if (type === 2) {
      this.userTitle = 'RENTER';
      this.userImage = "assets/img/renter3.png" ;
      this.isadmin = false;
      this.isRenter =  true ; 
    } else if (type === 3) {
      this.userTitle = 'LENDER';
      this.userImage = "assets/img/Lender1.png" ;
      this.isadmin = false;
      this.isRenter = false; 
    } else {
      this.Logout();
    }
  }
  async Logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  toggle(){
    this.isActive = !this.isActive;
    if(this.isActive == true){
      this.toolTip = "connected";
      this.conn =true ;
      this.srcImage = "../../../assets/img/networkConnected.png"
    }
    else{
      this.conn =false ;
      this.toolTip = "disconnected";
      this.srcImage = "../../../assets/img/networkDisconnected.png"
    }
    console.log(this.isActive);
  }
  goTowallet(){}
  ShowProfile() {
    this.router.navigate(['/pages/profile']);
  }
  goToNodes(){
    this.router.navigate(['/pages/admin/nodeList']);
  }
  goToTokens(){
    this.router.navigate(['/pages/admin/tokens']);
  }
  goToHome(){
    this.router.navigate(['/pages']);
  }
  ngOnInit() {}
}
