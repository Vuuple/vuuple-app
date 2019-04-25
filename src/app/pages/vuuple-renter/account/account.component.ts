import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  renew : any ;
  number : any ; 
  constructor() {
    this.number = 15;
    this.renew = 5;
   }

  ngOnInit() {
  }

}
