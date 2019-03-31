import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests=[];

  constructor() { }

  ngOnInit() {
    this.requests=[
      {
        userName:"renter",
        email:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        reject:"reject"
      },
      {
        userName:"renter",
        email:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        reject:"reject"
      },
      {
        userName:"renter",
        email:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        reject:"reject"
      }
    ]
  }

}
