import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {
  TotalCompanyRenter="15";
  nodes : any = [];
  constructor(private serverApiService : ServerApiService) {
    this.TotalCompanyRenter;
    this.serverApiService.getAllUsers().subscribe( (data : {}) => {
      console.log (data);
      this.nodes = data ;
    });
   }
  ngOnInit() {
  }

}
