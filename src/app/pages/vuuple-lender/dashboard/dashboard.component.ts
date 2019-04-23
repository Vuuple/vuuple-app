import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 nowPints : any;
 totalPoints :any;
  constructor() { 
    this.nowPints = 3;
    this.totalPoints = 300;
  }

  ngOnInit() {
  }

}
