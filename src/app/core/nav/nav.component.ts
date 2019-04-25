import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService) {
    const type = this.authService.getUserType();

    if (type === 1) {
      this.items = this.adminItem;
    } else if (type === 2) {
      this.items = this.renterItems;
    } else if (type === 3) {
      this.items = this.LenderItem;
    } else {
      this.Logout();
    }
  }
  Logout() {
    this.authService.logout();
  }
  renterItems = [
    { name: 'Dashboard', link: '/pages/renter/main' },
    { name: 'WALLET', link: '/pages/renter/wallet' },
    { name: 'PURCHASE', link: '/pages/renter/purchase' },
    { name: 'REDEEM', link: '/pages/lender/redeem' },
    { name: 'ACCOUNT', link: '/pages/renter/account' },
    { name: 'SETTING', link: '/pages/admin/setting' }
  ];

  LenderItem = [
    { name: 'Dashboard', link: '/pages/lender/main' },
    { name: 'WALLET', link: '/pages/renter/wallet' },
    { name: 'ALLOCATE', link: '/pages/lender/allocate' },
    { name: 'REDEEM', link: '/pages/lender/redeem' },
    { name: 'ACCOUNT', link: '/pages/lender/account' },
    { name: 'SETTING', link: '/pages/admin/setting' }
  ];
  adminItem = [
    { name: 'Dashboard', link: '/pages/admin/main' },
    { name: 'wallet ', link: '/pages/admin/wallet' },
    { name: 'REQUEST', link: '/pages/admin/request' },
    { name: 'INDIVIDUAL ', link: '/pages/admin/client' },
    { name: 'COMAPNY', link: '/pages/admin/client' },
    { name: 'LENDERS', link: '/pages/admin/client' },
    { name: 'SETTING', link: '/pages/admin/setting' }
  ];
  items = [];
  ngOnInit() {}
}
