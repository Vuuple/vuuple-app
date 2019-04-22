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

  constructor(public authService: AuthService, private router: Router) {
    this.srcImage = "../../../assets/img/networkDisconnected.png"
    const type = this.authService.getUserType();
    if (type === 1) {
      this.userTitle = 'ADMIN';
       this.isadmin = true;
    } else if (type === 2) {
      this.userTitle = 'COMPANY RENTER';
      this.isadmin = false;
    } else if (type === 3) {
      this.userTitle = 'COMPANY LENDER';
      this.isadmin = false;
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
      this.srcImage = "../../../assets/img/networkConnected.png"
    }
    else{
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
