import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  number: any;
  renew;
  constructor() {
    this.number = '15';
  }

  ngOnInit() {}
}
