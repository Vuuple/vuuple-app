import { RenterFactoryService } from './../../../providers/renter-factory/renter-factory.service';
import { LendersFactoryService } from './../../../providers/lenders-factory/lenders-factory.service';
// import { RentersFactoryService } from './../../../providers/renters-factory/renters-factory.service';
import { LendersRegistrationService } from './../../../providers/lenders-registration/lenders-registration.service';
// import { RentersRegistrationService } from './../../../providers/renters-registration/renters-registration.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { IUser } from '../../../auth/core/user';
import {
  // getRaftId,
  sendConfirmationMail
} from '../../../../assets/js/helpers/joinNetwork.js';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
// import { NetworkService } from '../../../providers/network-service/network.service';
// const networkIP = require('electron').remote.getGlobal('networkIP');
const request = require('../../../../assets/js/helpers/requests.js');
@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
  providers: [
    LendersFactoryService,
    LendersRegistrationService,
    // NetworkService,
    RenterFactoryService,
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
  raftId;
  node: IUser;
  escrow: {
    escrowAddress: string;
    issueDate: Date;
    endDate: Date;
    category: string;
  };
  lendercontract: any;
  errorMessage: any;
  constructor(
    // private networkService: NetworkService,
    private serverApiService: ServerApiService,
    private route: ActivatedRoute,
    private router: Router,
    private lenderEscrowService: LenderEscrowService,
    private lendersFactoryService: LendersFactoryService,
    private rentersFactoryService: RenterFactoryService,
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
          console.log(this.node, '  if this.node');
        });
      }
    });
    console.log(this.node, '   this.node');
  }
  // async test() {
  //   console.log(this.node.ethAddress, ' this.node.ethAddress');

  //   const lenderIndex = await this.lendersFactoryService.lenderIndex();
  //   console.log(lenderIndex, 'lenderIndex');

  //   this.lendercontract = await this.lendersFactoryService.getLenderContract(
  //     this.node.ethAddress
  //   );
  //   const isApproved = await this.lendersRegistrationService.approved(
  //     this.lendercontract
  //   );
  //   this.getEscrowData();
  //   console.log(isApproved, 'lendercontract');
  //   console.log(this.lendercontract, 'lendercontract');
  // }
  async approve() {
    // unloack his account
    const contract = await this.rentersFactoryService.getRenterContract(
      this.node.ethAddress
    );
    const index = await this.rentersFactoryService.getRenterIndex();
    console.log(index, 'index');
    console.log(contract, 'contract');

    const data = await this._addToNetwork();
    if (this.node.category == 'lender') {
      //TODO: need to update docker file to set storage value
      await this._approveOnContract();
    } else {
    }

    await this._saveToDatabase(data);
    await this._emailUser();
    this.goBack();
  }

  async _approveOnContract() {
    console.log(this.node.ethAddress, ' this.node.ethAddress');

    const lenderIndex = await this.lendersFactoryService.lenderIndex();
    console.log(lenderIndex, 'lenderIndex');

    this.lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );
    if (this.lendercontract != '0x0000000000000000000000000000000000000000') {
      console.log(this.lendercontract, 'lendercontract');

      //  get escrow data and save it in db
      const isApproved = await this.lendersRegistrationService.approved(
        this.lendercontract
      );
      console.log(isApproved, 'isApproved');

      await this.getEscrowData();
      await this.addEscrowData();
    } else {
      this.errorMessage = 'no contract found';
    }
  }
  async _addToNetwork() {
    //   const raftId = await getRaftId(this.node.ip, networkIP, this.node.enode);
    const enode =
      '"enode://' +
      this.node.enode.trim() +
      '@' +
      this.node.ip.trim() +
      ':22000?discport=0&raftport=50400"'.trim();
    console.log(enode, 'enode in c');

    // const raftId = await this.networkService.addRaftPeer(enode);
    const resObj = await request.curlRaftAddPeer(enode);
    console.log(resObj, 'resObj');
    if (resObj.result == undefined) {
      this.raftId = null;
      console.log(resObj);
    } else {
      this.raftId = resObj.result;
      console.log(this.raftId, 'raftIdd');
    }

    return this.raftId;
  }
  async _saveToDatabase(data) {
    await this.serverApiService
      .approve(this.node['_id'], { raftId: data })
      .subscribe(s => console.log(s, 'approved'));
  }
  async _emailUser() {
    const mail = await sendConfirmationMail(
      this.node.email,
      this.node.username,
      this.node.category,
      this.raftId
    );
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
      issueDate: null,
      endDate: null,
      category: 'lender'
    };
    this.escrow.category = 'lender';
    console.log(this.escrow.category, 'this.escrow.category');

    this.escrow.escrowAddress = await this.lendersRegistrationService.escrow(
      this.lendercontract
    );
    console.log(this.escrow.escrowAddress, 'this.escrow.escrowAddress');
    // const issue = await this.lendersRegistrationService.registerDate(
    //   this.lendercontract
    // );
    // console.log(issue, 'issue date');

    this.escrow.endDate = new Date(
      (await this.lenderEscrowService.getCloseTime(this.escrow.escrowAddress)) *
        1000
    );
    let end = new Date(this.escrow.endDate);
    end.setMonth(this.escrow.endDate.getMonth() - 1);
    console.log(this.escrow.endDate, ' this.escrow.endDate');
    this.escrow.issueDate = end;
    console.log(this.escrow.issueDate, ' this.escrow.issueDate ');
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
    await this.serverApiService
      .reject(this.node['_id'])
      .toPromise()
      .then(s => {
        console.log(s, 's');

        this.goBack();
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
    this.goBack();
  }
  goBack() {
    this.router.navigate(['/pages/admin/request']);
  }
}
