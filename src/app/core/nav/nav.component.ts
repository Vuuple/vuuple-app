import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() {
    this.items = this.LenderItem;
   }
renterItems = ['WALLET','PURCHASE','REDEEM','ACCOUNT', 'SETTING' ];
LenderItem = ['WALLET','ALLOCATE','REDEEM','ACCOUNT', 'SETTING' ];
adminItem = ['WALLET','PURCHASE','REDEEM','ACCOUNT', 'SETTING' ];
items=[];
  ngOnInit() {

  }

}
