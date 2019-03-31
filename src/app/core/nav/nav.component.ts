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
renterItems = ['WALLET','PURCHASE','REDEEM','ACCOUNT', 'SETTING' ];
LenderItem = ['WALLET','ALLOCATE','REDEEM','ACCOUNT', 'SETTING' ];
adminItem = ['Requests','individual Renters','company Renters','Lenders','miners', 'SETTING' ];
items=[];
  ngOnInit() {

  }

}
