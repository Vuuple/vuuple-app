import { TokenService } from './../../../providers/token/token.service';
import { Component, OnInit } from '@angular/core';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { AuthService } from '../../../auth/core/auth.service';

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
    private authservics: AuthService
  ) {}

  ngOnInit() {
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
      this.node.renewalDate = new Date(
        (await this.lenderService.getRenewalDate(this.lendercontract)) * 1000
      );
    }
  }
}
