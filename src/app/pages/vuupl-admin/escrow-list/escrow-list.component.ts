import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escrow-list',
  templateUrl: './escrow-list.component.html',
  styleUrls: ['./escrow-list.component.scss']
})
export class EscrowListComponent implements OnInit {
  escrows=[]
  constructor() {
    this.escrows=[
      {
        address:'',
        renterLenderAddress:'',
        issueDate:'',
        endDate:'',
        accountAddress:''
      },
      {
        address:'',
        renterLenderAddress:'',
        issueDate:'',
        endDate:'',
        accountAddress:''
      },
      {
        address:'',
        renterLenderAddress:'',
        issueDate:'',
        endDate:'',
        accountAddress:''
      }
    ]
   }

  ngOnInit() {
  }

}
