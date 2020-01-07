import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { AuthService } from '../../../auth/core/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  EscrowStatus = ['Active', 'Completed', 'Closed'];
  ready = false;
  currentUser: any;
  lender = false;
  constructor(
    private lenderEscrowService: LenderEscrowService,
    private renterEscrowService: RenterEscrowService,
    private route: ActivatedRoute,
    private authservics: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.spinner.show();

    this.currentUser = this.authservics.currentUser;

    this.route.queryParams.subscribe(params => {
      console.log(params, 'params');

      this.address = params['address'];
      this.category = params['category'];
      console.log(this.category, 'category');
      console.log(this.address, 'address');
      

      if (this.address != null && this.address != undefined) {
        if (this.category == 'lender') {
          this.getLenderScrowDetails();
          this.lender = true;
        } else if (this.category == 'renter') {
          this.getRenterScrowDetails();
          this.lender = false
        }
      }
    });

    console.log(this.address);
  }
  gotToback() {
    this.router.navigate(['/pages/admin/escrow']);
  }
  async getLenderScrowDetails() {
    this.escrow = {};
    this.escrow.escrowStatus = await this.lenderEscrowService.getEscrowStatus(
      this.address
    );
    this.escrow.userAddress = await this.lenderEscrowService.getLender(
      this.address
    );
    this.escrow.account = await this.lenderEscrowService.getLenderAccountContract(
      this.address
    );
    this.escrow.tokenAmount = await this.lenderEscrowService.getTokenAmount(
      this.address
    );
    this.escrow.isActive = await this.lenderEscrowService.getIsActive(
      this.address
    );
    this.escrow.closeTime = await this.lenderEscrowService.getCloseTime(
      this.address
    );
    this.spinner.hide();
    let end = new Date(this.escrow.closeTime);
    end.setMonth(this.escrow.closeTime.getMonth() - 1);
    console.log(this.escrow.closeTime, ' this.escrow.closeTime');
    this.escrow.issueDate = end;
    console.log(this.escrow, '   this.escrow');
    if (
      this.escrow.isActive &&
      this.escrow.closeTime > Date.now() &&
      this.escrow.userAddress == this.currentUser.ethAddress
    ) {
      this.ready = true;
    }
  }
  async getRenterScrowDetails() {
    this.escrow = {};

    this.escrow.escrowStatus = await this.renterEscrowService.getEscrowStatus(
      this.address
    );
    this.escrow.userAddress = await this.renterEscrowService.getRenter(
      this.address
    );
    this.escrow.tokenAmount = await this.renterEscrowService.getVuupleToken(
      this.address
    );
    this.escrow.isActive = await this.renterEscrowService.isActive(
      this.address
    );
    this.escrow.account = await this.renterEscrowService.getRenterAccountContract(
      this.address
    );
    this.escrow.closeTime = await this.renterEscrowService.getCloseTime(
      this.address
    );
    this.spinner.hide();
    let end = new Date(this.escrow.closeTime);
    end.setMonth(this.escrow.closeTime.getMonth() - 1);
    console.log(this.escrow.closeTime, ' this.escrow.closeTime');
    this.escrow.issueDate = end;
    console.log(this.escrow, '   this.escrow');
    if (this.escrow.isActive && this.escrow.closeTime > Date.now()) {
      this.ready = true;
    }
  }
  async withdraw() {
    if (this.category == 'lender') {
      await this.lenderEscrowService.withdraw(this.address);
    } else if (this.category == 'renter') {
      await this.renterEscrowService.withdraw(this.address);
    }
  }
}
