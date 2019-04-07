import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-renter',
  templateUrl: './individual-renter.component.html',
  styleUrls: ['./individual-renter.component.scss']
})
export class IndividualRenterComponent implements OnInit {
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
