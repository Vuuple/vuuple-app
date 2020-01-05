import { RenterRegisterationService } from './../../../providers/renter-registration/renter-registeration.service';
import { RenterEscrowService } from './../../../providers/renter-escrow/renter-escrow.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';
import { IcoService } from '../../../providers/ico/ico.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { TokenService } from '../../../providers/token/token.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { Router } from '@angular/router';
import { Web3Service } from '../../../providers/web3/web3.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [
    IcoService,
    Web3Service,
    ServerApiService,
    TokenService,
    RenterFactoryService,
    RenterEscrowService,
    RenterRegisterationService
  ]
})
export class PurchaseComponent implements OnInit {
  myForm: FormGroup;
  storForm: FormGroup;
  cuurentUser: any;
  rate = 0;
  renewalDate;
  avialableTokens = 0;
  renterContract;
  escrow: {
    escrowAddress: string;
    gb: number;
    issueDate: Date;
    endDate: Date;
    category: string;
    userid: string;
  };
  currentDate = new Date();
  sorageRate = 4; // 4 for inddividuals 3 for org   Todo:// store it in a varibale in contract and manage changing rate from the dapp
  errorMessage: any;
  constructor(
    private icoService: IcoService,
    private serverApiService: ServerApiService,
    private authService: AuthService,
    private tokenService: TokenService,
    private rentersFactoryService: RenterFactoryService,
    private renterEscrowService: RenterEscrowService,
    private renterRegistrationService: RenterRegisterationService,
    private router: Router,
    private fb: FormBuilder,
    private web3Service: Web3Service
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    this.getRate();
    this.getBlance();
    this.getRenterDate();
    this.myForm = this.fb.group({
      amount: [0, [Validators.required]],
      // bankTxId: [0, [Validators.required]] ,
      pwd : ['', [Validators.required]]
    });
    this.storForm = this.fb.group({
      amount: [0, [Validators.required]] ,
      pwd : ['', [Validators.required]]
    });
  }
  // async buyToken() {
  //   await this.icoService.buyTokens(
  //     this.cuurentUser.ethAddress,
  //     this.myForm.value.amount
  //   );
  // }

  async requestPurchase() {
    const body = {
      //   ethTxHash: ethTxHash,
      // bankTxId: this.myForm.value.bankTxId,
      tokenAmount: this.rate * this.myForm.value.amount,
      rate: this.rate,
      depositAmount: this.myForm.value.amount
    };
    // console.log(this.myForm.value.pwd, 'test unlock');
    const test = await this.web3Service.unLockAccount(
      this.cuurentUser.ethAddress,
      this.myForm.value.pwd
    );
    await this.serverApiService.purchase(body).subscribe(data => {
      console.log(data);
    });
  }
  
  async getRate() {
    this.rate = await this.icoService.getRate();
  }

  async getBlance() {
    this.avialableTokens = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );
    console.log(this.avialableTokens, 'this.avialableTokens');
  }
  // renew supscription
  // condition so that if he can renew  and he has enough token

  async getRenterDate() {
    this.renterContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    this.renewalDate = await this.renterRegistrationService.getRenewalDate(
      this.renterContract
    );
    if (this.renewalDate != 0) {
      this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
      console.log(this.renterContract, ' this.renterContract');
    }
  }

  async renew() {
    if (this.avialableTokens >= this.storForm.value.amount * 0.05) {
      // wen renew , add the released escrow contract to db
      const test = await this.web3Service.unLockAccount(
        this.cuurentUser.ethAddress,
        this.storForm.value.pwd
      );
      await this.renterRegistrationService
        .renewSubscription(
          this.renterContract,
          this.cuurentUser.ethAddress,
          this.storForm.value.amount
        )
        .then(async s => {
          await this.addEscrowData();
          this.goBack();
        });
    }
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
      gb: null,
      endDate: null,
      category: 'renter',
      userid: null
    };
    this.escrow.category = 'renter';
    this.escrow.gb = this.storForm.value.amount;
    this.escrow.userid = this.cuurentUser['_id'];
    console.log(this.cuurentUser, 'this.node');
    console.log(this.escrow, 'this.escrow');

    this.escrow.escrowAddress = await this.renterRegistrationService.getEscrow(
      this.renterContract
    );
    console.log(this.escrow.escrowAddress, 'this.escrow.escrowAddress');
    // const issue = await this.lendersRegistrationService.registerDate(
    //   this.lendercontract
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

    this.serverApiService
      .addEscrow(this.escrow)
      .toPromise()
      .then(s => {
        // await this._saveToDatabase(this.raftId);
        // await this._emailUser();
        // this.goBack();
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }
  goBack() {
    this.router.navigate(['/pages/admin/request']);
  }
}
