import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addNode',
  templateUrl: './addNode.component.html',
  styleUrls: ['./addNode.component.scss']
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
