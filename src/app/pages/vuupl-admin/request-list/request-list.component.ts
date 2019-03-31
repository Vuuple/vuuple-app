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
        name:"renter",
        email:"renter",
        userName:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        del:"delete"
      },
      {
        name:"renter",
        email:"renter",
        userName:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        del:"delete"
      },
      {
        name:"renter",
        email:"renter",
        userName:"renter",
        EthWallet:"dadrt",
        staticIp:"sfduiweh3u25u295i",
        category:"renter",
        add:"add",
        del:"delete"
      }
    ]
  }

}
