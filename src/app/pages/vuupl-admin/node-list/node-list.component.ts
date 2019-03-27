import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {

  constructor() { }
nodes=[];
  ngOnInit() {
    this.nodes=[
      {
      userName:"lender1", address:"0xdfs454ef5we45wf4wef488", email:"lender1@test.com", type:"Lender",
    },
      {
        userName:"Renter1", address:"0xdfs454ef5we45wf4wef488", email:"lender1@test.com", type:"Renter",
    },
      {
        userName: "lender1", address: "0xdfs454ef5we45wf4wef488", email: "lender1@test.com", type:"Renter",
    },
      {
        userName: "lender1", address: "0xdfs454ef5we45wf4wef488", email: "lender1@test.com", type:"Renter",
    },
      {
      userName:"lender1", address:"0xdfs454ef5we45wf4wef488", email:"lender1@test.com", type:"Lender",
    },
      {
      userName:"lender1", address:"0xdfs454ef5we45wf4wef488", email:"lender1@test.com", type:"Lender",
    },
      {
      userName:"lender1", address:"0xdfs454ef5we45wf4wef488", email:"lender1@test.com", type:"Lender",
    },
      {
        userName: "Renter3", address: "0xdfs454ef5we45wf4wef488", email: "Renter3@test.com", type:"Renter",
    },
  ]
  }

}
