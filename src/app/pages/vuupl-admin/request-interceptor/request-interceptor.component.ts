import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-interceptor',
  templateUrl: './request-interceptor.component.html',
  styleUrls: ['./request-interceptor.component.scss']
})
export class RequestInterceptorComponent implements OnInit {
  show: boolean;

  constructor() {}
  ngOnInit() {}
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
