import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escrow-details',
  templateUrl: './escrow-details.component.html',
  styleUrls: ['./escrow-details.component.scss']
})
export class EscrowDetailsComponent implements OnInit {
  sub: any;
  id: any;
  address: any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];
    });
    console.log(this.address);
  }
  gotToback() {
    this.router.navigate(['/pages/admin/escrow']);
  }
}
