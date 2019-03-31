import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() {
    this.items = this.adminItem;
   }
  renterItems = [
    { name: 'Dashboard',link:'/pages/renter'},
    { name: 'WALLET', link: '/pages/renter' },
    { name: 'PURCHASE', link:'/pages/renter'},
    { name: 'REDEEM', link:'/pages/renter'},
    { name: 'ACCOUNT', link:'/pages/renter'},
    { name: 'SETTING', link:'/pages/renter/setting'}
   ];

  LenderItem = [
    { name: 'Dashboard', link: '/pages/lender' },
    { name: 'WALLET', link: '/pages/lender' },
    { name: 'ALLOCATE', link: '/pages/lender' },
    { name: 'REDEEM', link: '/pages/lender' },
    { name: 'ACCOUNT', link: '/pages/lender' },
    { name: 'SETTING', link: '/pages/lender/setting' }, ];
adminItem = [
  { name: 'Dashboard', link: '/pages/admin' },
  { name: 'REQUEST', link: '/pages/admin/request' },
  { name: 'INDIVIDUAL RENTERS', link: '/pages/admin' },
  { name: 'COMAPNY RENTERS', link: '/pages/admin' },
  { name: 'LENDERS', link: '/pages/admin' },
  { name: 'MINERS', link: '/pages/admin' },
  { name: 'SETTING', link: '/pages/admin/setting' }];
items=[];
  ngOnInit() {
    
  }

}
