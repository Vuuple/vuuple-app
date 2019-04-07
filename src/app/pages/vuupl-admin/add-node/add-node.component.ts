import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {
  node = {
    username: 'node',
    email: 'node@node.com',
    enode: 'node',
    Ethwallwt: 'GFHGJKHBKJNK',
    staticIP: 'KJHKJNKLMKLMKLMKL'
  };
  constructor() {
    this.node;
  }

  ngOnInit() {}
}
