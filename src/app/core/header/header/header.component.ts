import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title =' COMPANY RENTER'
  admintitle='Admin'
  admin=['Nodes','vuuple Tokens']
  user=['following','followers']
  items=[]
  constructor() {
   }

  ngOnInit() {
  }

}
