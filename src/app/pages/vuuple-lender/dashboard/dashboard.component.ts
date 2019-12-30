import { TokenService } from './../../../providers/token/token.service';
import { Component, OnInit } from '@angular/core';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { AuthService } from '../../../auth/core/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LendersRegistrationService, LendersFactoryService, TokenService]
})
export class DashboardComponent implements OnInit {
  node;
  lendercontract: string;
  constructor(
    private lenderService: LendersRegistrationService,
    private lendersFactoryService: LendersFactoryService,
    private tokenService: TokenService,
    private authservics: AuthService , 
    private spinner: NgxSpinnerService,
    private router : Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.node = this.authservics.currentUser;
    this.getContractDate();
  }
  async getContractDate() {
    this.lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );
    this.node.balance = await this.tokenService.getBalanceOf(
      this.node.ethAddress
    );

    console.log(this.lendercontract, ' this.lendercontract');

    if (this.lendercontract != '0x0000000000000000000000000000000000000000') {
      this.node.reputationPoints = await this.lenderService.getLenderReputationPoints(
        this.lendercontract
      );
      this.node.passingPercentage = await this.lenderService.getPassingPercentage(
        this.lendercontract
      );
      this.node.approved = await this.lenderService.getApproved(
        this.lendercontract
      );
      this.node.rentedStorage = await this.lenderService.getRentedStorage(
        this.lendercontract
      );
      this.node.renewalDate = await this.lenderService.getRenewalDate(
        this.lendercontract
      );
      this.node.currentMonthlyPoints = await this.lenderService.getLenderReputationPoints(this.lendercontract)
      this.node.renewalhours = new Date(this.node.renewalDate).getHours()
      this.spinner.hide();
      console.log(this.node, 'node');
    }
  }
  allocateStorage() {
    this.router.navigate(['/pages/lender/allocate'])
  }
}
