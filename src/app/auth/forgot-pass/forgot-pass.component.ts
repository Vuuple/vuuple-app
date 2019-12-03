import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  returnToLogin() {
    this.router.navigate(['/auth/login']);
  }

}
