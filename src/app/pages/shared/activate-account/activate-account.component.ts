import { Component, OnInit } from '@angular/core';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { AuthService } from '../../../auth/core/auth.service';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { TokenService } from '../../../providers/token/token.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
  providers: [
    TokenService,
    LendersFactoryService,
    RenterFactoryService,
    LenderEscrowService,
    RenterRegisterationService,
    LendersRegistrationService,
    RenterEscrowService
  ]
})
export class ActivateAccountComponent implements OnInit {
  cuurentUser;
  accountContract: any;
  status: boolean;
  constructor(private apiService: ServerApiService,
    private lendersFactoryService: LendersFactoryService,
    private rentersFactoryService: RenterFactoryService,
    private lenderEscrowService: LenderEscrowService,
    private renterEscrowService: RenterEscrowService,
    private lendersRegistrationService: LendersRegistrationService,
    private rentersRegistrationService: RenterRegisterationService,

    private tokenService: TokenService,
    private authService: AuthService
    ) {    }

  ngOnInit() {
    this.cuurentUser = this.authService.getCuurentUser();
    if (this.cuurentUser.category == 'renter') {
      this.getRenterData();
    } else if (this.cuurentUser.category == 'lender') {
      this.getLenderData();
    }
  }
 
 async getLenderData() {
    this.accountContract = await this.lendersFactoryService.getLenderContract(
      this.cuurentUser.ethAddress
    );
     if (this.accountContract != '0x0000000000000000000000000000000000000000') {
         this.status = await this.lendersRegistrationService.isActive(
         this.accountContract
      );
      // await this.getLenderEscrow(escrowAddress);
      console.log(this.status);
      console.log("renter")
    }
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
     this.status = await this.rentersRegistrationService.isActive(
        this.accountContract
     );
    //  await this.getRenterEscrow(escrowAddress);
    console.log(this.status);
    console.log("lender")
    }
  }
  changeActiveStatus(){
    if(this.status==true){
        this.deactivate();
        console.log("deactivate")
    }else{
      this.activate();
     console.log("activate")
   }
  }
 async deactivate(){ 
    if(this.cuurentUser.category == 'renter'){
         await this.rentersRegistrationService.deactivateAccount(this.accountContract)
    }
    else if(this.cuurentUser.category == 'lender'){
         await this.lendersRegistrationService.deactivateAccount(this.accountContract)
     }
  }
  async activate(){
    if(this.cuurentUser.category == 'renter'){
       await this.rentersRegistrationService.activateAccount(this.accountContract)
  }
  else if(this.cuurentUser.category == 'lender'){
    await this.lendersRegistrationService.activateAccount(this.accountContract)
   }
  }
}
