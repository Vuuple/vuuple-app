import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';
import { IcoService } from '../../../providers/ico/ico.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [IcoService]
})
export class PurchaseComponent implements OnInit {
  myForm: FormGroup;
  cuurentUser: any;
  rate = 0;
  constructor(
    private icoService: IcoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    this.getRate();
    this.myForm = this.fb.group({
      amount: [0, [Validators.required]]
    });
  }
  async buyToken() {
    await this.icoService.buyTokens(
      this.cuurentUser.ethAddress,
      this.myForm.value.amount
    );
  }
  async getRate() {
    this.rate = await this.icoService.getRate();
  }
}
