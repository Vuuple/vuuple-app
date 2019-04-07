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
  items : any = [];

  constructor(public authService: AuthService, private router: Router) {
    const type = this.authService.getUserType();
    if (type === 1) {
      this.userTitle = 'ADMIN';
       this.items = true;
    } else if (type === 2) {
      this.userTitle = 'COMPANY RENTER';
      this.items = false;
    } else if (type === 3) {
      this.userTitle = 'COMPANY LENDER';
      this.items = false;
    } else {
      this.Logout();
    }
  }
  async Logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
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
