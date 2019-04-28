import { LendersRegistrationService } from './../../../providers/lenders-registration/lenders-registration.service';
import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.scss'],
  providers: [LendersRegistrationService, LendersFactoryService]
})
export class AddpointComponent implements OnInit {
  node;
  id: any;
  lendercontract: any;
  constructor(
    private serverApiService: ServerApiService,
    private router: Router,

    private lenderService: LendersRegistrationService,
    private lendersFactoryService: LendersFactoryService,

    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, ' this.id');

      if (this.id != undefined && this.id != null) {
        this.serverApiService.getUser(this.id).subscribe(data => {
          console.log(data);
          this.node = data;
          console.log(this.node, '  if this.node');
          this.getContractDate();
        });
      }
    });
    console.log(this.node, '   this.node');
  }
  async getContractDate() {
    this.lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );
    if (this.lendercontract != '0x0000000000000000000000000000000000000000') {
      // this.node.balance = await this.lenderService.getBalance(
      //   this.lendercontract
      // );
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
  ngOnInit() {}
  async addPoint() {
    await this.lenderService.addReputationalPoint(this.lendercontract);
    this.router.navigate(['/pages/admin/lender'], {
      queryParams: { type: 'lender' }
    });
  }
}
