import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userTitle = ' COMPANY RENTER';
  admin = ['Nodes', 'vuuple Tokens'];
  user = ['following', 'followers'];
  items = [];
  constructor(public authService: AuthService, private router: Router) {
    const type = this.authService.getUserType();
    if (type === 1) {
      this.userTitle = 'ADMIN';
    } else if (type === 2) {
      this.userTitle = 'COMPANY RENTER';
    } else if (type === 3) {
      this.userTitle = 'COMPANY LENDER';
    } else {
      this.Logout();
    }
  }
  async Logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  ShowProfile() {
    this.router.navigate(['/pages/profile']);
  }
  ngOnInit() {}
}
