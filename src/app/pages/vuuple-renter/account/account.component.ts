import { Web3Service } from './../../../providers/web3/web3.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../providers/token/token.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { AuthService } from '../../../auth/core/auth.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [
    TokenService,
    Web3Service,
    RenterFactoryService,
    RenterRegisterationService,
    RenterEscrowService
  ]
})
export class AccountComponent implements OnInit {
  statment = [];
  accountContract: any;
  cuurentUser: any;
  tokensInUse: any;
  tokensAmountInContract;
  rentedStorage: any;
  escrow: {
    escrowAddress: string;
    gb: number;
    issueDate: Date;
    endDate: Date;
    category: string;
    userid: string;
  };
  errorMessage: any;
  totalRedeem: number;
  tokensInContract;
  totalPurchase: number;
  currentDate = new Date();
  constructor(
    private apiService: ServerApiService,
    private rentersFactoryService: RenterFactoryService,
    private spinner: NgxSpinnerService,
    private renterEscrowService: RenterEscrowService,
    private rentersRegistrationService: RenterRegisterationService,

    private web3Service: Web3Service,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    this.spinner.show();
    this.getContractDate();
    this.getStatment();
  }
  async getContractDate() {
    // const account = await this.tokenService.getCurrentAccount();
    // const test = await this.web3Service.unLockAccount(
    //   this.cuurentUser.ethAddress,
    //   ''
    // );
    // console.log(test, 'test unlock');
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    this.cuurentUser.balance = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );

    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      console.log(this.accountContract, ' this.accountContract');

      this.cuurentUser.tokenAmount = await this.rentersRegistrationService.getTokenAmount(
        this.accountContract
      );
      // this.tokensInContract = await this.rentersRegistrationService.getBalance(
      //   this.accountContract
      // );
      this.tokensInContract = await this.tokenService.getBalanceOf(
        this.accountContract
      );
      this.rentedStorage = await this.rentersRegistrationService.getRenteredStorage(
        this.accountContract
      );
      console.log(this.tokensInContract, 'contractBalance');
      this.tokensAmountInContract = await this.rentersRegistrationService.getTokenAmount(
        this.accountContract
      );
      this.cuurentUser.renewalDate = await this.rentersRegistrationService.getRenewalDate(
        this.accountContract
      );
      // const x = new Date;
      // x.setMonth(x.getMonth()+1)
      // this.cuurentUser.renewalDate.setMonth(
      //   this.cuurentUser.renewalDate.getMonth() + 1
      // );
      if (this.cuurentUser.renewalDate != 0) {
        this.cuurentUser.renewalDate.setMonth(
          this.cuurentUser.renewalDate.getMonth() + 1
        );
      }
      this.cuurentUser.membershipType = await this.rentersRegistrationService.getMembershipType(
        this.accountContract
      );
      this.cuurentUser.status = await this.rentersRegistrationService.getCurrentStatus(
        this.accountContract
      );
      const owner = await this.rentersRegistrationService.getContractOwner(
        this.accountContract
      );
      this.spinner.hide();
      console.log(owner, 'this.cuurentUser.tokenAmount');

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
      gb: null,
      issueDate: null,
      endDate: null,
      category: 'renter',
      userid: null
    };
    this.escrow.category = 'renter';
    this.escrow.userid = this.cuurentUser['_id'];
    console.log(this.cuurentUser, 'this.cuurentUser');
    console.log(this.escrow, 'this.escrow');
    this.escrow.gb = this.rentedStorage;
    this.escrow.escrowAddress = await this.rentersRegistrationService.getEscrow(
      this.accountContract
    );
    console.log(this.escrow.escrowAddress, 'this.escrow.escrowAddress');
    // const issue = await this.rentersRegistrationService.registerDate(
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

  async renewSubscription() {
    try {
      const test = await this.web3Service.unLockAccount(
        this.cuurentUser.ethAddress,
        ''
      );
      console.log(test, 'test unlock');
      const tx = await this.rentersRegistrationService.renewSubscription(
        this.accountContract,
        this.cuurentUser.ethAddress,
        this.cuurentUser.ethAddress
      );
      console.log(tx, 'tx');
    } catch (error) {
      console.error(error);
    }
  }
  async completeSubscription() {
    try {
      const test = await this.web3Service.unLockAccount(
        this.cuurentUser.ethAddress,
        ''
      );
      console.log(test, 'test unlock');
      const tx = await this.rentersRegistrationService.completeSubscription(
        this.accountContract,
        this.cuurentUser.ethAddress
      );
      this.cuurentUser.status = 0;
      console.log(tx, 'tx');
    } catch (error) {
      console.error(error);
    }
    // save escrow to db
    this.addEscrowData();
  }
  async transferToContract() {
    try {
      console.log(this.cuurentUser.ethAddress, 'this.cuurentUser.ethAddress');

      const test = await this.web3Service.unLockAccount(
        this.cuurentUser.ethAddress,
        ''
      );
      console.log(test, 'test unlock');

      console.log(
        this.cuurentUser.ethAddress,
        this.accountContract,
        '   this.cuurentUser.ethAddress this.accountContract,'
      );

      // from, to, value
      const tx = await this.tokenService.transferFromAccount(
        this.cuurentUser.ethAddress,
        this.accountContract,
        this.tokensAmountInContract
      );
      console.log(tx, 'tx');
      this.tokensInContract = this.tokensAmountInContract;
    } catch (error) {
      console.error(error);
    }
  }

  async getBlance() {
    this.tokensInContract = await this.tokenService.getBalanceOf(
      this.accountContract
    );
    console.log(this.tokensInContract, 'this.avialableTokens');
  }
  getStatment() {
    this.apiService.getAllTokensUserTransaction().subscribe(data => {
      console.log(data[0], 'data');
      // this.spinner.hide();
      this.statment = data[0]['tokenTransactions'];
      // this.events = [].concat.apply([], this.allTransaction.filter(e => { return e.eventsEmitted.length > 0 })
      //   .map(m => m.eventsEmitted));
      if (this.statment.length > 0) {
        const test = this.statment
          .filter(s => {
            return s.type == 'in';
          })
          .map(s => s.tokenAmount)
          .reduce((item1, item2) => {
            return item1 + item2;
          });
        const redeem = this.statment
          .filter(s => {
            return s.status == 'approved' && s.type == 'out';
          })
          .map(s => s.tokenAmount);
        if (redeem.length > 0) {
          this.totalRedeem = redeem.reduce((item1, item2) => {
            return item1 + item2;
          });
        }

        const purchase = this.statment.filter(s => {
          return s.status == 'approved' && s.type == 'in';
        });
        if (purchase.length > 0) {
          this.totalPurchase = purchase
            .map(s => s.tokenAmount)
            .reduce((item1, item2) => {
              return item1 + item2;
            });
        }

        console.log(test, 'test');
      }

      console.log(this.totalRedeem, 'this.totalRedeem');
      console.log(this.totalPurchase, 'this.totalPurchase');
    });
  }
}
