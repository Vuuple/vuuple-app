import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../providers/token/token.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { AuthService } from '../../../auth/core/auth.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [
    TokenService,
    RenterFactoryService,
    RenterRegisterationService,
    RenterEscrowService
  ]
})
export class AccountComponent implements OnInit {
  renew: any;
  number: any;
  accountContract: any;
  cuurentUser: any;
  tokensInUse: any;
  escrow: {
    escrowAddress: string;
    issueDate: any;
    endDate: any;
    category: string;
    userid: any;
  };
  errorMessage: any;
  constructor(
    private apiService: ServerApiService,
    private rentersFactoryService: RenterFactoryService,

    private renterEscrowService: RenterEscrowService,
    private rentersRegistrationService: RenterRegisterationService,

    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.number = 15;
    this.renew = 5;
  }

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;

    this.getContractDate();
  }
  async getContractDate() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    this.cuurentUser.balance = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );

    console.log(this.accountContract, ' this.accountContract');

    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      this.cuurentUser.tokenAmount = await this.rentersRegistrationService.getTokenAmount(
        this.accountContract
      );
      this.cuurentUser.renewalDate = await this.rentersRegistrationService.getRenewalDate(
        this.accountContract
      );
      console.log(this.cuurentUser, 'node');
    }
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      const escrowAddress = await this.rentersRegistrationService.getEscrow(
        this.accountContract
      );
      await this.getRenterEscrow(escrowAddress);
    }
  }

  async getRenterEscrow(address) {
    this.tokensInUse += await this.renterEscrowService.getTokenAmount(address);
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
      category: 'renter',
      userid: null
    };
    this.escrow.category = 'lender';
    this.escrow.userid = this.cuurentUser['_id'];
    console.log(this.cuurentUser, 'this.cuurentUser');
    console.log(this.escrow, 'this.escrow');

    this.escrow.escrowAddress = await this.rentersRegistrationService.getEscrow(
      this.accountContract
    );
    console.log(this.escrow.escrowAddress, 'this.escrow.escrowAddress');
    // const issue = await this.lendersRegistrationService.registerDate(
    //   this.accountContract
    // );
    // console.log(issue, 'issue date');

    this.escrow.endDate = await this.renterEscrowService.getCloseTime(
      this.escrow.escrowAddress
    );
    let end = new Date(this.escrow.endDate);
    end.setMonth(this.escrow.endDate.getMonth() - 1);
    console.log(this.escrow.endDate, ' this.escrow.endDate');
    this.escrow.issueDate = end;
    console.log(this.escrow.issueDate, ' this.escrow.issueDate ');
  }
  async addEscrowData() {
    await this.getEscrowData();

    this.apiService
      .addEscrow(this.escrow)
      .toPromise()
      .then(async s => {})
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }

  async completeSubscription() {
    await this.rentersRegistrationService.completeSubscription(
      this.accountContract,
      this.cuurentUser.ethAddress
    );
  }
}
