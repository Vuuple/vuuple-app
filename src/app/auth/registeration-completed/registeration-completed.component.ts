import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registeration-completed',
  templateUrl: './registeration-completed.component.html',
  styleUrls: ['./registeration-completed.component.scss']
})
export class RegisterationCompletedComponent implements OnInit {

  constructor(private router : Router ) { }

  ngOnInit() {
  }
  returnToLogin(){
    this.router.navigate(['/auth/login']);

  }
}
