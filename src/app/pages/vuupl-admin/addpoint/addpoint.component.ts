import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.scss']
})
export class AddpointComponent implements OnInit {
  addnode=[];
  constructor() { 
    this.addnode=[
      {
        userName:'',
        email:'',
        EthWallet:'',
        staticIp:''
      }
    ]
  }

  ngOnInit() {
  }

}
