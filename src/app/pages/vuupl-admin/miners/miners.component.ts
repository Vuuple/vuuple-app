import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miners',
  templateUrl: './miners.component.html',
  styleUrls: ['./miners.component.css']
})
export class MinersComponent implements OnInit {
  Transaction=[];
  TokensRedeemed=[];
  constructor() { 
    this.Transaction=[
      {
        Name:"",
        transactionCompleted:"",
        DateOfPayment:"",
        tokensPaid:""
      },
      {
        Name:"",
        transactionCompleted:"",
        DateOfPayment:"",
        tokensPaid:""
      }
    ]
    this.TokensRedeemed=[
      {
        Name:"",
        DateOfRedemption:"",
        TokensRedeemed:"",
        TokensinEnviroment:"",
        Action:""
      },
      {
        Name:"",
        DateOfRedemption:"",
        TokensRedeemed:"",
        TokensinEnviroment:"",
        Action:""
      }
    ]
  }
  ngOnInit() {
  }

}
