import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';
import { bufferToggle } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list-interceptor',
  templateUrl: './user-list-Interceptor.component.html',
  styleUrls: ['./user-list-Interceptor.component.scss'],
  providers: [ServerApiService]
})
export class UserlistInterceptorComponent implements OnInit {
  data;
  show: boolean = true;
  type: any;
  constructor(
    private apiService: ServerApiService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      console.log(this.type, ' this.type');

      if (this.type != undefined && this.type != null) {
        // comapny renter and indivudals aren't supported yet , so we are gonna get by renter category
        this.apiService.getUsersByCategory(this.type).subscribe(s => {
          this.data = s;
        });
      }
    });
  }
  toggle(value) {
    console.log(value);
    if (value == true) {
      this.show = true;
      console.log('1');
    } else if (value == false) {
      this.show = false;
      console.log('2');
    }
  }
}
