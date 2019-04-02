import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.scss']
})
export class AddpointComponent implements OnInit {
   node={
      username:"node",
      email:"node@node.com",
      enode:"node",
      Ethwallwt:"GFHGJKHBKJNK",
      staticIP:"KJHKJNKLMKLMKLMKL"
   }
  constructor() { 
   this.node
  }

  ngOnInit() {
  }

}
