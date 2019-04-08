import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escrow-list',
  templateUrl: './escrow-list.component.html',
  styleUrls: ['./escrow-list.component.scss']
})
export class EscrowListComponent implements OnInit {
  escrows=[] 
  id : any;
  saddress : any ;
  constructor(private router : Router) {
    this.escrows=[
      {
        address:'HJKKNKNKNKLNKNK',
        renterLenderAddress:'HKHKHKHJKBJBNMBN',
        issueDate:'1/2019',
        endDate:'2/2019',
        accountAddress:'HCVVJHBJKBIJKNK'
      },
      {
        address:'HJKKNKNKNKLNKNK',
        renterLenderAddress:'HKHKHKHJKBJBNMBN',
        issueDate:'1/2019',
        endDate:'2/2019',
        accountAddress:'HCVVJHBJKBIJKNK'
      },
      {
        address:'HJKKNKNKNKLNKNK',
        renterLenderAddress:'HKHKHKHJKBJBNMBN',
        issueDate:'1/2019',
        endDate:'2/2019',
        accountAddress:'HCVVJHBJKBIJKNK'
      },
    ]
   }
   goToDetails(selectedescrow){
    console.log(selectedescrow.address);
    this.saddress=selectedescrow.address;
      this.router.navigate(['/pages/admin/escrowDetails'],this.saddress);
  }
  ngOnInit() {
  }

}
