import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-renter',
  templateUrl: './company-renter.component.html',
  styleUrls: ['./company-renter.component.scss']
})
export class CompanyRenterComponent implements OnInit {
  GeneralInfo=[];
  constructor() { 
    this.GeneralInfo=[
      {
        Email:"renter@gmail.com",
        username:"renter",
        ipAddress:"qGYUGHJGHJHGJ",
        EthWallet:"",
        userAdd:"",
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
