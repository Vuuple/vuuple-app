import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { RentersEscrowService } from '../../../providers/renters-escrow/renters-escrow.service';

@Component({
  selector: 'app-escrow-details',
  templateUrl: './escrow-details.component.html',
  styleUrls: ['./escrow-details.component.scss'],
  providers: [LenderEscrowService, RentersEscrowService]
})
export class EscrowDetailsComponent implements OnInit {
  sub: any;
  id: any;
  address: any;
  constructor(
    private lenderEscrowService: LenderEscrowService,
    private renterEscrowService: RentersEscrowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
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
