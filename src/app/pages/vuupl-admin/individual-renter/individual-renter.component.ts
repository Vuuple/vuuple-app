import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { bufferToggle } from 'rxjs/operators';

@Component({
  selector: 'app-individual-renter',
  templateUrl: './individual-renter.component.html',
  styleUrls: ['./individual-renter.component.scss']
})
export class IndividualRenterComponent implements OnInit {
  data;
  show :boolean = true ;
  constructor(private apiService: ServerApiService) {}
  ngOnInit() {
    this.apiService.getUsersByCategory('renter').subscribe(s => {
      this.data = s;
    });
  }
  toggle(value){
    console.log(value)
    if(value == true){
      this.show = true;
      console.log("1")
   }
   else if (value == false){
    this.show = false ;
    console.log("2")
   }
  }
}
