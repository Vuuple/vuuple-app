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
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { NetworkService } from '../../../providers/network-service/network.service';
const networkIP = require('electron').remote.getGlobal('networkIP');

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
  providers: [
    LendersFactoryService,
    LendersRegistrationService,
    NetworkService,
    LenderEscrowService
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

  id;
  node: IUser;
  escrow: {
    escrowAddress: string;
    issueDate: string;
    endDate: string;
    category: string;
  };
  lendercontract: any;
  errorMessage: any;
  constructor(
    private networkService: NetworkService,
    private serverApiService: ServerApiService,
    private route: ActivatedRoute,
    private lenderEscrowService: LenderEscrowService,
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

    const data = await this._addToNetwork();
    if (this.node.category == 'lender') {
      //TODO: need to update docker file to set storage value
      await this._approveOnContract();
    }
    await this._saveToDatabase(data);
    await this._emailUser();
  }

  async _approveOnContract() {
    this.lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );
    console.log(this.lendercontract, 'lendercontract');
    if (this.lendercontract != '0x') {
      await this.lendersRegistrationService.approve(this.lendercontract);
      //get escrow data and save it in db
      await this.getEscrowData();
    } else {
      this.errorMessage = 'no contract found';
    }
  }
  async _addToNetwork() {
    //   const raftId = await getRaftId(this.node.ip, networkIP, this.node.enode);
    const enode = `enode://${this.node.enode}@${
      this.node.ip
    }:22000?discport=0&raftport=50400`.trim();
    console.log(enode, 'enode in c');

    const raftId = await this.networkService.addRaftPeer(enode);
    console.log(raftId, 'raftId');

    return raftId;
  }
  async _saveToDatabase(data) {
    await this.serverApiService.approve(this.node.id, { raftId: data });
  }
  async _emailUser() {
    const mail = await sendConfirmationMail(this.node.email);
    console.log(mail, 'testmail');
  }
  async getEscrowData() {
    /**   --data "{
	\"escrowAddress\": \"asdasdg\",
	\"issueDate\": \"1999-06-02T00:00:00.000Z\",
	\"endDate\": \"1999-06-02T00:00:00.000Z\",
	\"category\": \"renter\"
}"*/
    this.escrow = {
      escrowAddress: '',
      issueDate: '',
      endDate: '',
      category: 'lender'
    };
    this.escrow.escrowAddress = await this.lendersRegistrationService.escrow(
      this.lendercontract
    );
    this.escrow.issueDate = await this.lendersRegistrationService.registerDate(
      this.lendercontract
    );
    this.escrow.endDate = await this.lenderEscrowService.closeTime(
      this.escrow.escrowAddress
    );
    this.addEscrowData();
  }
  async addEscrowData() {
    this.serverApiService
      .addEscrow(this.escrow)
      .toPromise()
      .then(s => {})
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }

  async reject() {
    await this.serverApiService.reject(this.node.id);
  }
}
