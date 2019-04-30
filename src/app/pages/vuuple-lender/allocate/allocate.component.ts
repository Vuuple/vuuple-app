import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.scss'],
  providers: [LendersRegistrationService, LendersFactoryService]
})
export class AllocateComponent implements OnInit {
  node;
  lendercontract: string;
  myForm: FormGroup;
  canRenew: boolean;
  constructor(
    private fb: FormBuilder,
    private lenderService: LendersRegistrationService,
    private lendersFactoryService: LendersFactoryService,
    private authservics: AuthService
  ) {
    this.myForm = this.fb.group({
      storage: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.node = this.authservics.currentUser;
    this.getContractDate();
  }

  async getContractDate() {
    this.lendercontract = await this.lendersFactoryService.getLenderContract(
      this.node.ethAddress
    );

    console.log(this.lendercontract, ' this.lendercontract');

    if (this.lendercontract != '0x0000000000000000000000000000000000000000') {
      this.node.reputationPoints = await this.lenderService.getLenderReputationPoints(
        this.lendercontract
      );

      this.node.rentedStorage = await this.lenderService.getRentedStorage(
        this.lendercontract
      );
      this.myForm.patchValue({ storage: this.node.rentedStorage });
      this.node.renewalDate = await this.lenderService.getRenewalDate(
        this.lendercontract
      );
      if (
        new Date(this.node.renewalDate).getTime() <
        new Date(Date.now()).getTime()
      ) {
        this.canRenew = true;
      }
    }
  }
  async renewAndReallocate() {
    await this.lenderService.renewSubscription(
      this.lendercontract,
      this.myForm.value.storage,
      this.authservics.currentUser.ethAddress
    );
  }
}
