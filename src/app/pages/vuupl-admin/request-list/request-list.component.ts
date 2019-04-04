import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { Observable} from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests : any =[];
  requestss : any = [];
  constructor(private serverApiService:ServerApiService) { 
    
     this.requests=[];
      this.serverApiService.getAllUsers().subscribe((data : {} ) => {
        console.log(data);
        this.requests = data;    
      });
  }

  ngOnInit() {
  }

}
