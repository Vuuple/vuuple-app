import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';

@Component({
  selector: 'app-escrow-details',
  templateUrl: './escrow-details.component.html',
  styleUrls: ['./escrow-details.component.scss'],
  providers: [LenderEscrowService, RenterEscrowService]
})
export class EscrowDetailsComponent implements OnInit {
  sub: any;
  id: any;
  address: any;
  category: any;
  escrow;
  constructor(
    private lenderEscrowService: LenderEscrowService,
    private renterEscrowService: RenterEscrowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];
      this.category = params['category'];
      if (this.address != null && this.address != undefined) {
        if (this.category == 'lender') {
        } else if (this.category == 'lender') {
        }
      }
    });

    console.log(this.address);
  }
  gotToback() {
    this.router.navigate(['/pages/admin/escrow']);
  }
  async getLenderScrowDetails() {
    this.escrow.escrowStatus = await this.lenderEscrowService.escrowStatus(
      this.address
    );
    this.escrow.tokenAmount = await this.lenderEscrowService.tokenAmount(
      this.address
    );
    this.escrow.isActive = await this.lenderEscrowService.isActive(
      this.address
    );
    this.escrow.closeTime = await this.lenderEscrowService.closeTime(
      this.address
    );
  }
  async getRenterScrowDetails() {
    this.escrow.escrowStatus = await this.renterEscrowService.getEscrowStatus(
      this.address
    );
    this.escrow.tokenAmount = await this.renterEscrowService.getVuupleToken(
      this.address
    );
    this.escrow.isActive = await this.renterEscrowService.isActive(
      this.address
    );
    this.escrow.closeTime = await this.renterEscrowService.getCloseTime(
      this.address
    );
  }
  withdraw() {}
}
