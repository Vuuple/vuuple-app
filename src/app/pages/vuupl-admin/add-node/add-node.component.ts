import { LendersFactoryService } from './../../../providers/lenders-factory/lenders-factory.service';
// import { RentersFactoryService } from './../../../providers/renters-factory/renters-factory.service';
import { LendersRegistrationService } from './../../../providers/lenders-registration/lenders-registration.service';
// import { RentersRegistrationService } from './../../../providers/renters-registration/renters-registration.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { IUser } from '../../../auth/core/user';
import {
  getRaftId,
  sendConfirmationMail
} from '../../../../assets/js/helpers/joinNetwork.js';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
  providers: [
    LendersFactoryService,
    LendersRegistrationService
    // RentersFactoryService,
    // RentersRegistrationService
  ]
})
export class AddNodeComponent implements OnInit {
  // node = {
  //   username: 'node',
  //   email: 'node@node.com',
  //   enode: 'node',
  //   Ethwallwt: 'GFHGJKHBKJNK',
  //   staticIP: 'KJHKJNKLMKLMKLMKL'
  // };
  endpoint = '';
  attach;
  id;
  node: IUser;
  constructor(
    private serverApiService: ServerApiService,
    private route: ActivatedRoute,
    // private rentersFactoryService: RentersFactoryService,
    private lendersFactoryService: LendersFactoryService,
    // private rentersRegistrationService: RentersRegistrationService,
    private lendersRegistrationService: LendersRegistrationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, ' this.id');

      if (this.id != undefined && this.id != null) {
        this.serverApiService.getUser(this.id).subscribe(data => {
          console.log(data);
          this.node = data;
        });
      }
    });
  }

  async approve() {
    // unloack his account

    if (this.node.category == 'lender') {
      //TODO: need to update docker file to set storage value
      await this._approveOnContract();
    }

    const data = await this._addToNetwork();
    await this._saveToDatabase(data);
    await this._emailUser();
  }

  async _approveOnContract() {
    const lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );
    await this.lendersRegistrationService.approve(lendercontract);
  }
  async _addToNetwork() {
    const data = await getRaftId(
      this.node.ip,
      this.endpoint,
      this.node.category
    );
    return data;
  }
  async _saveToDatabase(data) {
    this.serverApiService.approve(this.node.id, data);
  }
  async _emailUser() {
    const mail = await sendConfirmationMail(this.attach, this.node.email);
    console.log(mail, 'testmail');
  }
}
