import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.scss']
})
export class LenderComponent implements OnInit {
  GeneralInfo=[]
  constructor() {
    this.GeneralInfo=[
      {
        Email:"renter@gmail.com",
        username:"renter",
        ipAddress:"qGYUGHJGHJHGJ",
        EthWallet:"",
        gender:"male",
        Country:"syria",
        mobile:"587866989",
        OperatingSystem:"windows",
        status:"active",
        Action:""
      }
    ]
   }

  ngOnInit() {
  }

}
