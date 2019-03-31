import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {
  TotalCompanyRenter="15";
  constructor() {
    this.TotalCompanyRenter;
   }
nodes=[];
  ngOnInit() {
    this.nodes=[
      {
      userName:"lender1",email:"lender1@test.com",  category:"Lender",address:"0xdfs454ef5we45wf4wef488",status:"active",action:"pan"
    },
      {
        userName:"Renter1",  email:"lender1@test.com",category:"Renter", address:"0xdfs454ef5we45wf4wef488",status:"deactivated",action:"pan"
    },
      {
        userName: "lender1",email: "lender1@test.com", category:"Renter", address: "0xdfs454ef5we45wf4wef488",status:"removed",action:"pan"
      }
  ]
  }

}
